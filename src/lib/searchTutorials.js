function normalizeText(text = "") {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function getCategoryName(categoryId, categories) {
    return categories.find((category) => category.id === categoryId)?.name ?? categoryId;
}

function scoreTutorial(tutorial, query, categories) {
    const normalizedQuery = normalizeText(query);
    const queryWords = normalizedQuery.split(/\s+/).filter(Boolean);

    const title = normalizeText(tutorial.title);
    const description = normalizeText(tutorial.description);
    const category = normalizeText(getCategoryName(tutorial.category, categories));

    const keywords = (tutorial.keywords ?? []).map(normalizeText);

    let score = 0;

    /*
     * ==================================================
     * FRASE COMPLETA
     * ==================================================
     */

    if (title.includes(normalizedQuery)) {
        score += 100;
    }

    if (keywords.some((keyword) => keyword.includes(normalizedQuery))) {
        score += 70;
    }

    if (description.includes(normalizedQuery)) {
        score += 40;
    }

    if (category.includes(normalizedQuery)) {
        score += 30;
    }

    /*
     * ==================================================
     * PALAVRAS INDIVIDUAIS
     * ==================================================
     */

    for (const word of queryWords) {
        if (title.includes(word)) {
            score += 25;
        }

        if (keywords.some((keyword) => keyword.includes(word))) {
            score += 18;
        }

        if (description.includes(word)) {
            score += 8;
        }

        if (category.includes(word)) {
            score += 6;
        }
    }

    return score;
}

export function searchTutorials(query, tutorials, categories) {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
        return [];
    }

    return tutorials
        .map((tutorial) => ({
            tutorial,
            score: scoreTutorial(tutorial, normalizedQuery, categories),
        }))
        .filter((result) => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((result) => result.tutorial);
}
