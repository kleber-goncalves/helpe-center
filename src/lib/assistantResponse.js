const INSUFFICIENT_ANSWER_PATTERNS = [
    "central ainda nao possui conteudo suficiente",
    "nao possui conteudo suficiente",
    "nao ha conteudo suficiente",
    "nao temos conteudo suficiente",
    "nao encontrei conteudo suficiente",
    "nao encontrei um tutorial que responda",
    "nao encontrei informacoes suficientes",
    "nao tenho informacoes suficientes",
    "nao ha informacoes suficientes",
    "nao ha informacao suficiente",
    "nao consigo responder com as informacoes",
    "os conteudos fornecidos nao sao suficientes",
    "os conteudos nao sao suficientes",
];

export function isInsufficientAssistantAnswer(answer) {
    const normalizedAnswer = String(answer ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    return INSUFFICIENT_ANSWER_PATTERNS.some((pattern) =>
        normalizedAnswer.includes(pattern),
    );
}
