const STOP_WORDS = new Set([
    "a",
    "c",
    "ao",
    "aos",
    "as",
    "da",
    "das",
    "de",
    "do",
    "dos",
    "e",
    "em",
    "entre",
    "esta",
    "esse",
    "essa",
    "este",
    "eu",
    "fazer",
    "faco",
    "faz",
    "foi",
    "for",
    "me",
    "na",
    "nas",
    "no",
    "nos",
    "o",
    "os",
    "ou",
    "para",
    "por",
    "pra",
    "que",
    "se",
    "sem",
    "sobre",
    "um",
    "uma",
    "umas",
    "uns",
    "quero",
    "queria",
    "preciso",
    "pode",
    "podem",
    "poderia",
    "ajuda",
    "ajudar",
    "ajude",
    "saber",
    "gostaria",
]);

const MIN_PREFIX_LENGTH = 3;
const MIN_FUZZY_LENGTH = 4;
const searchIndexCache = new WeakMap();

const FIELD_CONFIG = {
    title: { phrase: 100, exact: 30, prefix: 22, fuzzy: 15, strong: true },
    keywords: { phrase: 70, exact: 23, prefix: 18, fuzzy: 13, strong: true },
    learning: { phrase: 35, exact: 18, prefix: 14, fuzzy: 10, strong: true },
    stepTitles: { phrase: 35, exact: 18, prefix: 14, fuzzy: 10, strong: true },
    description: { phrase: 40, exact: 12, prefix: 9, fuzzy: 6, strong: false },
    category: { phrase: 30, exact: 10, prefix: 8, fuzzy: 5, strong: false },
    stepDescriptions: { phrase: 20, exact: 10, prefix: 8, fuzzy: 6, strong: false },
    examples: { phrase: 15, exact: 8, prefix: 6, fuzzy: 4, strong: false },
    tips: { phrase: 12, exact: 7, prefix: 5, fuzzy: 4, strong: false },
    externalLearning: { phrase: 10, exact: 7, prefix: 5, fuzzy: 4, strong: false },
};

function normalizeText(text = "") {
    return String(text)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function getCategoryName(categoryId, categories) {
    return (
        categories.find((category) => category.id === categoryId)?.name ??
        categoryId
    );
}

function toTextArray(value) {
    if (typeof value === "string") {
        return [value];
    }

    if (!Array.isArray(value)) {
        return [];
    }

    return value.filter((item) => typeof item === "string");
}

function buildSearchFields(tutorial, categories) {
    const steps = Array.isArray(tutorial.steps) ? tutorial.steps : [];
    const examples = steps.flatMap((step) =>
        Array.isArray(step.examples) ? step.examples : [],
    );
    const externalLearning = Array.isArray(tutorial.externalLearning)
        ? tutorial.externalLearning
        : [];

    return {
        title: toTextArray(tutorial.title),
        keywords: toTextArray(tutorial.keywords),
        learning: toTextArray(tutorial.learning),
        stepTitles: steps.map((step) => step.title).filter(Boolean),
        description: toTextArray(tutorial.description),
        category: toTextArray(getCategoryName(tutorial.category, categories)),
        stepDescriptions: steps.map((step) => step.description).filter(Boolean),
        examples: examples.flatMap((example) => [
            example.title,
            example.description,
            example.alt,
        ]).filter(Boolean),
        tips: steps.map((step) => step.tip).filter(Boolean),
        externalLearning: externalLearning.flatMap((item) => [
            item.title,
            item.description,
            item.query,
        ]).filter(Boolean),
    };
}

function createSearchIndex(tutorials, categories) {
    return tutorials.map((tutorial) => {
        const rawFields = buildSearchFields(tutorial, categories);
        const fields = {};

        for (const [fieldName, values] of Object.entries(rawFields)) {
            const texts = values.map(normalizeText).filter(Boolean);

            fields[fieldName] = {
                texts,
                tokens: [...new Set(texts.flatMap((text) => text.split(/\s+/)))],
                config: FIELD_CONFIG[fieldName],
            };
        }

        return {
            tutorial,
            fields,
        };
    });
}

function getSearchIndex(tutorials, categories) {
    let categoryCache = searchIndexCache.get(tutorials);

    if (!categoryCache) {
        categoryCache = new WeakMap();
        searchIndexCache.set(tutorials, categoryCache);
    }

    let index = categoryCache.get(categories);

    if (!index) {
        index = createSearchIndex(tutorials, categories);
        categoryCache.set(categories, index);
    }

    return index;
}

function getSignificantWords(query, index) {
    const words = [...new Set(
        normalizeText(query)
            .split(/\s+/)
            .filter(Boolean),
    )];

    const strongVocabulary = index
        .flatMap(({ fields }) =>
            Object.values(fields)
                .filter((field) => field.config.strong)
                .flatMap((field) => field.tokens),
        )
        .filter((word) => !STOP_WORDS.has(word));

    return words.filter((word) => {
        if (!STOP_WORDS.has(word)) {
            return true;
        }

        /*
         * Uma stop word pode funcionar como prefixo apenas quando
         * aponta para um termo significativo de título, palavra-chave,
         * objetivo ou título de etapa. Isso permite "com" -> "compartilhar"
         * sem fazer "como" retornar todos os títulos que começam com "Como".
         */
        return (
            word.length >= MIN_PREFIX_LENGTH &&
            strongVocabulary.some(
                (candidate) =>
                    candidate.length > word.length &&
                    candidate.startsWith(word),
            )
        );
    });
}

function containsPhrase(text, phrase) {
    if (!text || !phrase) {
        return false;
    }

    return (
        text === phrase ||
        text.startsWith(phrase + " ") ||
        text.endsWith(" " + phrase) ||
        text.includes(" " + phrase + " ")
    );
}

function isOneEditApart(first, second) {
    if (first === second || Math.abs(first.length - second.length) > 1) {
        return false;
    }

    let firstIndex = 0;
    let secondIndex = 0;
    let edits = 0;

    while (firstIndex < first.length && secondIndex < second.length) {
        if (first[firstIndex] === second[secondIndex]) {
            firstIndex += 1;
            secondIndex += 1;
            continue;
        }

        edits += 1;

        if (edits > 1) {
            return false;
        }

        if (first.length === second.length) {
            firstIndex += 1;
            secondIndex += 1;
        } else if (first.length < second.length) {
            secondIndex += 1;
        } else {
            firstIndex += 1;
        }
    }

    if (firstIndex < first.length || secondIndex < second.length) {
        edits += 1;
    }

    return edits === 1;
}

function getTokenMatch(queryWord, candidateWord) {
    if (STOP_WORDS.has(queryWord)) {
        if (
            queryWord.length >= MIN_PREFIX_LENGTH &&
            candidateWord !== queryWord &&
            !STOP_WORDS.has(candidateWord) &&
            candidateWord.startsWith(queryWord)
        ) {
            return "prefix";
        }

        return null;
    }

    if (queryWord === candidateWord) {
        return "exact";
    }

    if (
        queryWord.length >= MIN_PREFIX_LENGTH &&
        candidateWord.startsWith(queryWord)
    ) {
        return "prefix";
    }

    if (
        queryWord.length >= MIN_FUZZY_LENGTH &&
        candidateWord.length >= MIN_FUZZY_LENGTH &&
        isOneEditApart(queryWord, candidateWord)
    ) {
        return "fuzzy";
    }

    return null;
}

function bestTokenMatch(queryWord, tokens) {
    let bestMatch = null;
    const priority = { exact: 3, prefix: 2, fuzzy: 1 };

    for (const candidateWord of tokens) {
        const match = getTokenMatch(queryWord, candidateWord);

        if (match && (!bestMatch || priority[match] > priority[bestMatch])) {
            bestMatch = match;
        }

        if (bestMatch === "exact") {
            break;
        }
    }

    return bestMatch;
}

function scoreIndexedTutorial(indexedTutorial, normalizedQuery, queryWords) {
    const { fields, tutorial } = indexedTutorial;
    let score = 0;
    let strongWordMatch = false;
    const matchedWords = new Set();
    let exactTitleMatch = false;
    let exactKeywordMatch = false;
    const isStopWordOnlyQuery = normalizedQuery
        .split(/\s+/)
        .every((word) => STOP_WORDS.has(word));

    for (const [fieldName, field] of Object.entries(fields)) {
        const phraseMatch = field.texts.some((text) =>
            containsPhrase(text, normalizedQuery),
        );

        if (
            phraseMatch &&
            queryWords.length > 0 &&
            !isStopWordOnlyQuery
        ) {
            score += field.config.phrase;

            if (fieldName === "title") {
                exactTitleMatch = true;
            }

            if (fieldName === "keywords") {
                exactKeywordMatch = true;
            }
        }
    }

    for (const word of queryWords) {
        let wordMatched = false;

        for (const field of Object.values(fields)) {
            if (STOP_WORDS.has(word) && !field.config.strong) {
                continue;
            }

            const match = bestTokenMatch(word, field.tokens);

            if (!match) {
                continue;
            }

            score += field.config[match];
            wordMatched = true;

            if (field.config.strong) {
                strongWordMatch = true;
            }
        }

        if (wordMatched) {
            matchedWords.add(word);
        }
    }

    return {
        tutorial,
        score,
        exactTitleMatch,
        exactKeywordMatch,
        significantWordCount: queryWords.length,
        matchedWordCount: matchedWords.size,
        coverage: queryWords.length > 0 ? matchedWords.size / queryWords.length : 0,
        strongWordMatch,
    };
}

function getRelevanceLevel(relevance) {
    if (relevance.significantWordCount === 0 || relevance.matchedWordCount === 0) {
        return "none";
    }

    if (relevance.exactTitleMatch || relevance.exactKeywordMatch) {
        return "relevant";
    }

    if (relevance.significantWordCount === 1) {
        return relevance.score >= 8 ? "relevant" : "none";
    }

    if (relevance.coverage >= 2 / 3 && relevance.score >= 24) {
        return "relevant";
    }

    if (relevance.coverage >= 0.5 && relevance.score >= 36) {
        return "relevant";
    }

    if (
        relevance.strongWordMatch &&
        relevance.score >= 10 &&
        relevance.coverage >= 1 / 3
    ) {
        return "related";
    }

    return "none";
}

export function searchTutorialsWithRelevance(query, tutorials, categories) {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
        return [];
    }

    const index = getSearchIndex(tutorials, categories);
    const queryWords = getSignificantWords(normalizedQuery, index);

    if (queryWords.length === 0) {
        return [];
    }

    return index
        .map((indexedTutorial) => {
            const relevance = scoreIndexedTutorial(
                indexedTutorial,
                normalizedQuery,
                queryWords,
            );

            return {
                tutorial: indexedTutorial.tutorial,
                relevance: {
                    score: relevance.score,
                    exactTitleMatch: relevance.exactTitleMatch,
                    exactKeywordMatch: relevance.exactKeywordMatch,
                    significantWordCount: relevance.significantWordCount,
                    matchedWordCount: relevance.matchedWordCount,
                    coverage: relevance.coverage,
                    strongWordMatch: relevance.strongWordMatch,
                    level: getRelevanceLevel(relevance),
                },
            };
        })
        .filter((result) => result.relevance.level !== "none")
        .sort((first, second) => second.relevance.score - first.relevance.score);
}

export function searchTutorials(query, tutorials, categories) {
    return searchTutorialsWithRelevance(query, tutorials, categories)
        .filter((result) => result.relevance.level === "relevant")
        .map((result) => result.tutorial);
}
