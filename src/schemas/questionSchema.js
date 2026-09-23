import { z } from "zod";

/* =========================================================
   OPÇÕES DO FORMULÁRIO
========================================================= */

export const categories = ["Excel", "Word", "PowerPoint", "Canva", "PDF", "E-mail", "Google Drive", "Impressão", "Digitalização", "Plataforma da escola", "Informática básica", "Outro"];

export const devices = ["Computador", "Celular", "Tablet", "Não sei informar"];

/* =========================================================
   REGEX / HELPERS
========================================================= */

/*
 * Nome:
 *
 * Permite:
 * - letras
 * - letras acentuadas
 * - espaços
 * - hífen
 * - apóstrofo
 *
 * Exemplos válidos:
 * João
 * João Silva
 * Maria Clara
 * Ana-Maria
 * O'Connor
 */
const NAME_PATTERN = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

/*
 * E-mail:
 *
 * Mantemos uma validação de formato realista,
 * sem tentar reproduzir toda a especificação RFC.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

/*
 * Remove espaços repetidos somente de textos
 * em que isso faz sentido, como nomes.
 */
function normalizeName(value) {
    return value.trim().replace(/\s+/g, " ");
}

/*
 * Verifica telefone/WhatsApp brasileiro.
 *
 * Aceita, por exemplo:
 *
 * (33) 99999-9999
 * 33 99999-9999
 * +55 33 99999-9999
 * 5533999999999
 * (33) 3333-3333
 */
function isValidBrazilianPhone(value) {
    const digits = value.replace(/\D/g, "");

    /*
     * Evita números compostos pela mesma
     * sequência de dígitos.
     *
     * Ex:
     * 11111111111
     * 99999999999
     */
    if (/^(\d)\1+$/.test(digits)) {
        return false;
    }

    let nationalDigits = digits;

    /*
     * Se veio com código do Brasil (55),
     * removemos o DDI antes de validar.
     */
    if (digits.length === 12 || digits.length === 13) {
        if (!digits.startsWith("55")) {
            return false;
        }

        nationalDigits = digits.slice(2);
    }

    /*
     * Brasil:
     *
     * 10 dígitos → fixo
     * 11 dígitos → celular
     */
    if (nationalDigits.length !== 10 && nationalDigits.length !== 11) {
        return false;
    }

    /*
     * Dois primeiros dígitos = DDD.
     */
    const ddd = Number(nationalDigits.slice(0, 2));

    if (!Number.isInteger(ddd) || ddd < 11 || ddd > 99) {
        return false;
    }

    const number = nationalDigits.slice(2);

    /*
     * Celular brasileiro:
     * 9 dígitos começando com 9.
     */
    if (number.length === 9) {
        return /^9\d{8}$/.test(number);
    }

    /*
     * Telefone fixo:
     * normalmente começa entre 2 e 5.
     */
    return /^[2-5]\d{7}$/.test(number);
}

/*
 * Validação de contato.
 *
 * Aceita:
 * - e-mail
 * - telefone
 * - WhatsApp
 */
function isValidContact(value) {
    if (!value) {
        return true;
    }

    const emailValid = EMAIL_PATTERN.test(value);

    const phoneValid = isValidBrazilianPhone(value);

    return emailValid || phoneValid;
}

/* =========================================================
   SCHEMA
========================================================= */

export const questionSchema = z.object({
    /* =====================================================
       CATEGORIA
    ====================================================== */

    category: z
        .string()
        .trim()
        .min(1, "Escolha o assunto da sua dúvida.")
        .refine((value) => categories.includes(value), "Escolha uma categoria válida."),

    /* =====================================================
       DÚVIDA
    ====================================================== */

    message: z
        .string()
        .trim()
        .min(10, "Explique um pouco mais sua dúvida.")
        .max(2000, "A dúvida pode ter no máximo 2000 caracteres.")
        .refine((value) => {
            /*
             * A dúvida precisa possuir
             * pelo menos 3 letras.
             */
            const letters = value.match(/\p{L}/gu) || [];

            return letters.length >= 3;
        }, "Descreva sua dúvida usando pelo menos algumas palavras.")
        .refine((value) => {
            /*
             * Evita entradas como:
             *
             * aaaaaaaaaaaaa
             * !!!!!!!!!!!!!
             * 1111111111111
             */
            return !/(.)\1{7,}/u.test(value);
        }, "A dúvida parece conter caracteres repetidos em excesso."),

    /* =====================================================
       NOME
    ====================================================== */

    name: z
        .string()
        .trim()
        .max(100, "O nome pode ter no máximo 100 caracteres.")
        .transform(normalizeName)
        .refine((value) => value === "" || value.length >= 2, "Digite um nome válido.")
        .refine((value) => value === "" || NAME_PATTERN.test(value), "Digite um nome válido usando apenas letras, espaços, hífen ou apóstrofo."),

    /* =====================================================
       CONTATO
    ====================================================== */

    contact: z
        .string()
        .trim()
        .max(200, "O contato pode ter no máximo 200 caracteres.")
        .refine((value) => isValidContact(value), "Informe um e-mail válido ou um número de WhatsApp válido."),

    /* =====================================================
       DISPOSITIVO
    ====================================================== */

    device: z
        .string()
        .trim()
        .min(1, "Informe onde está tentando realizar a tarefa.")
        .refine((value) => devices.includes(value), "Escolha um dispositivo válido."),
});
