import assert from "node:assert/strict";
import test from "node:test";

import { categories } from "../data/categories.js";
import { tutorials } from "../data/tutorials.js";
import {
    searchTutorials,
    searchTutorialsWithRelevance,
} from "./searchTutorials.js";

function resultIds(query) {
    return searchTutorials(query, tutorials, categories).map((tutorial) => tutorial.id);
}

test("ignora pesquisas compostas somente por stop words", () => {
    assert.deepEqual(resultIds("como"), []);
    assert.deepEqual(resultIds("com"), []);
    assert.deepEqual(resultIds("de para"), []);
    assert.deepEqual(resultIds("como fazer"), []);
});

test("encontra Excel com um prefixo incompleto", () => {
    assert.equal(resultIds("exce")[0], "comecar-usar-excel");
});

test("aceita um pequeno erro de digitação", () => {
    assert.equal(resultIds("exel")[0], "comecar-usar-excel");
});

test("aceita prefixos em palavras-chave", () => {
    assert.equal(resultIds("comp")[0], "compartilhar-arquivo");
    assert.equal(resultIds("sumar")[0], "sumario-automatico-word");
});

test("entende uma pergunta com palavras genéricas e termos úteis", () => {
    assert.ok(resultIds("como criar um sumário automático").includes("sumario-automatico-word"));
    assert.ok(resultIds("como formatar um trabalho no Word").includes("formatar-trabalho-word"));
});

test("mantém correspondência exata para buscas curtas e úteis", () => {
    assert.equal(resultIds("excel")[0], "comecar-usar-excel");
    assert.equal(resultIds("pdf")[0], "converter-documento-pdf");
});

test("encontra termos presentes nos passos e dicas, não apenas no título", () => {
    const fixtureTutorials = [{
        id: "recuo-de-paragrafo",
        title: "Organizar texto no Word",
        category: "word",
        description: "Orientações de edição de documentos.",
        keywords: ["documento", "texto"],
        learning: ["Ajustar a apresentação do parágrafo."],
        steps: [{
            title: "Ajuste o espaçamento",
            description: "Defina o recuo da primeira linha do parágrafo.",
            tip: "Confira o recuo antes de salvar o documento.",
            examples: [{
                title: "Exemplo de recuo",
                description: "O texto começa depois da margem.",
                alt: "Parágrafo com recuo aplicado.",
            }],
        }],
    }];

    const fixtureCategories = [{ id: "word", name: "Word" }];
    const ids = searchTutorials("recuo", fixtureTutorials, fixtureCategories)
        .map((tutorial) => tutorial.id);

    assert.deepEqual(ids, ["recuo-de-paragrafo"]);
});

test("não recomenda conteúdo sem relação com a pergunta", () => {
    assert.deepEqual(resultIds("biologia molecular"), []);
});

test("preserva os metadados de relevância para o assistente", () => {
    const results = searchTutorialsWithRelevance("exel", tutorials, categories);

    assert.equal(results[0]?.tutorial.id, "comecar-usar-excel");
    assert.equal(results[0]?.relevance.level, "relevant");
    assert.ok(results[0]?.relevance.score > 0);
});
