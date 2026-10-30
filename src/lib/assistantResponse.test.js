import assert from "node:assert/strict";
import test from "node:test";

import { isInsufficientAssistantAnswer } from "./assistantResponse.js";

test("detecta quando a IA diz que a Central não possui conteúdo suficiente", () => {
    assert.equal(
        isInsufficientAssistantAnswer(
            "A Central ainda não possui conteúdo suficiente sobre essa dúvida.",
        ),
        true,
    );
});

test("detecta variações de respostas insuficientes sem depender de acentos", () => {
    assert.equal(
        isInsufficientAssistantAnswer(
            "Não há informações suficientes para responder com segurança.",
        ),
        true,
    );
    assert.equal(
        isInsufficientAssistantAnswer(
            "Os conteúdos fornecidos não são suficientes para explicar esse procedimento.",
        ),
        true,
    );
});

test("não confunde uma resposta prática com falta de conteúdo", () => {
    assert.equal(
        isInsufficientAssistantAnswer(
            "Para colocar um vídeo no Canva, abra o editor e use a opção de carregamento.",
        ),
        false,
    );
});
