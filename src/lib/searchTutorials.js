const STOP_WORDS = new Set([
    "a",
    "ao",
    "aos",
    "as",
    "com",
    "como",
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
    "gostaria",
]);

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

function getSignificantWords(query) {
    return [...new Set(
        normalizeText(query)
            .split(/\s+/)
            .filter(
                (word) =>
                    word &&
                    !STOP_WORDS.has(word),
            ),
    )];
}

function containsPhrase(text, phrase) {
    const normalizedText = normalizeText(text);
    const normalizedPhrase = normalizeText(phrase);

    if (!normalizedText || !normalizedPhrase) {
        return false;
    }

    return (
        normalizedText === normalizedPhrase ||
        normalizedText.startsWith(normalizedPhrase + " ") ||
        normalizedText.endsWith(" " + normalizedPhrase) ||
        normalizedText.includes(" " + normalizedPhrase + " ")
    );
}

function containsWord(text, word) {
    return containsPhrase(text, word);
}

function scoreTutorial(tutorial, query, categories) {
    const normalizedQuery = normalizeText(query);
    const queryWords = normalizedQuery
        .split(/\s+/)
        .filter(Boolean);

    const title = normalizeText(tutorial.title);
    const description = normalizeText(tutorial.description);
    const category = normalizeText(
        getCategoryName(tutorial.category, categories),
    );

    const keywords = (tutorial.keywords ?? []).map(normalizeText);

    let score = 0;

    /*
     * ==================================================
     * FRASE COMPLETA
     * ==================================================
     */

    if (containsPhrase(title, normalizedQuery)) {
        score += 100;
    }

    if (
        keywords.some((keyword) =>
            containsPhrase(keyword, normalizedQuery),
        )
    ) {
        score += 70;
    }

    if (containsPhrase(description, normalizedQuery)) {
        score += 40;
    }

    if (containsPhrase(category, normalizedQuery)) {
        score += 30;
    }

    /*
     * ==================================================
     * PALAVRAS INDIVIDUAIS
     * ==================================================
     */

    for (const word of queryWords) {
        if (containsWord(title, word)) {
            score += 25;
        }

        if (
            keywords.some((keyword) =>
                containsWord(keyword, word),
            )
        ) {
            score += 18;
        }

        if (containsWord(description, word)) {
            score += 8;
        }

        if (containsWord(category, word)) {
            score += 6;
        }
    }

    return score;
}

function getRelevanceInfo(tutorial, query, categories) {
    const normalizedQuery = normalizeText(query);

    const title = normalizeText(tutorial.title);
    const description = normalizeText(tutorial.description);
    const category = normalizeText(
        getCategoryName(tutorial.category, categories),
    );
    const keywords = (tutorial.keywords ?? []).map(normalizeText);

    const significantWords = getSignificantWords(normalizedQuery);

    const exactTitleMatch = containsPhrase(title, normalizedQuery);

    const exactKeywordMatch = keywords.some((keyword) =>
        containsPhrase(keyword, normalizedQuery),
    );

    const matchedWords = significantWords.filter(
        (word) =>
            containsWord(title, word) ||
            keywords.some((keyword) => containsWord(keyword, word)) ||
            containsWord(description, word) ||
            containsWord(category, word),
    );

    const coverage =
        significantWords.length > 0
            ? matchedWords.length / significantWords.length
            : 0;

    const score = scoreTutorial(
        tutorial,
        normalizedQuery,
        categories,
    );

    const strongWordMatch =
        significantWords.some(
            (word) =>
                containsWord(title, word) ||
                keywords.some((keyword) =>
                    containsWord(keyword, word),
                ),
        );

    return {
        score,
        exactTitleMatch,
        exactKeywordMatch,
        significantWordCount: significantWords.length,
        matchedWordCount: matchedWords.length,
        coverage,
        strongWordMatch,
    };
}

function isRelevantTutorial(relevance) {
    /*
     * Uma correspondência exata no título ou em uma palavra-chave
     * é forte o suficiente para considerar o tutorial relevante.
     */

    if (
        relevance.exactTitleMatch ||
        relevance.exactKeywordMatch
    ) {
        return true;
    }

    /*
     * Para buscas de uma única palavra, exigimos uma correspondência
     * forte no título, palavra-chave ou categoria. Isso evita que uma
     * palavra genérica encontrada apenas na descrição provoque um
     * falso positivo.
     */

    if (relevance.significantWordCount === 1) {
        return (
            relevance.matchedWordCount === 1 &&
            relevance.strongWordMatch &&
            relevance.score >= 18
        );
    }

    /*
     * Para perguntas maiores, exigimos que pelo menos metade dos termos
     * relevantes apareça no conteúdo e que haja uma pontuação mínima.
     *
     * Quando dois terços ou mais dos termos estão presentes, aceitamos
     * uma pontuação um pouco menor porque a cobertura já indica boa
     * correspondência semântica.
     */

    if (
        relevance.significantWordCount >= 2 &&
        relevance.coverage >= 2 / 3 &&
        relevance.score >= 30
    ) {
        return true;
    }

    if (
        relevance.significantWordCount >= 2 &&
        relevance.coverage >= 0.5 &&
        relevance.score >= 45
    ) {
        return true;
    }

    return false;
}

function getRelevanceLevel(relevance) {
    if (isRelevantTutorial(relevance)) {
        return "relevant";
    }

    if (!relevance.strongWordMatch || relevance.score < 18) {
        return "none";
    }

    /*
     * Uma correspondência parcial pode ser útil para sugerir
     * um tutorial relacionado, mas não é suficiente para
     * enviar o conteúdo para o Gemini como resposta principal.
     */

    if (relevance.significantWordCount === 1) {
        return "related";
    }

    if (relevance.coverage >= 1 / 3) {
        return "related";
    }

    if (
        relevance.matchedWordCount >= 1 &&
        relevance.score >= 25
    ) {
        return "related";
    }

    return "none";
}

export function searchTutorialsWithRelevance(
    query,
    tutorials,
    categories,
) {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
        return [];
    }

    return tutorials
        .map((tutorial) => {
            const relevance = getRelevanceInfo(
                tutorial,
                normalizedQuery,
                categories,
            );

            return {
                tutorial,
                relevance: {
                    ...relevance,
                    level: getRelevanceLevel(relevance),
                },
            };
        })
        .filter((result) => result.relevance.level !== "none")
        .sort(
            (a, b) =>
                b.relevance.score - a.relevance.score,
        );
}

export function searchTutorials(query, tutorials, categories) {
    return searchTutorialsWithRelevance(
        query,
        tutorials,
        categories,
    )
        .filter(
            (result) =>
                result.relevance.level === "relevant",
        )
        .map((result) => result.tutorial);
}
