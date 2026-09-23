import { z } from "zod";

/* =========================================================
   OPÇÕES DO FORMULÁRIO
========================================================= */

export const categories = ["Excel", "Word", "PowerPoint", "Canva", "PDF", "E-mail", "Google Drive", "Impressão", "Digitalização", "Plataforma da escola", "Informática básica", "Outro"];

export const devices = ["Computador", "Celular", "Tablet", "Não sei informar"];

/* =========================================================
   DDDs BRASILEIROS
========================================================= */

const VALID_DDDS = new Set([
    11, 12, 13, 14, 15, 16, 17, 18, 19,

    21, 22, 24,

    27, 28,

    31, 32, 33, 34, 35, 37, 38,

    41, 42, 43, 44, 45, 46,

    47, 48, 49,

    51, 53, 54, 55,

    61,

    62, 63, 64,

    65, 66, 67, 68, 69,

    71, 73, 74, 75, 77, 79,

    81, 82, 83, 84, 85, 86, 87, 88, 89,

    91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

/* =========================================================
   NAME
========================================================= */

const NAME_PATTERN = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

function normalizeName(value) {
    return String(value).trim().replace(/\s+/g, " ");
}

function isValidName(value) {
    if (!value) {
        return true;
    }

    if (value.length < 2) {
        return false;
    }

    return NAME_PATTERN.test(value);
}

/* =========================================================
   EMAIL
========================================================= */

function isValidEmail(value) {
    if (!value) {
        return false;
    }

    /*
     * Não permitimos espaços.
     */
    if (/\s/.test(value)) {
        return false;
    }

    const atCount = (value.match(/@/g) || []).length;

    if (atCount !== 1) {
        return false;
    }

    const [localPart, domain] = value.split("@");

    if (!localPart || !domain) {
        return false;
    }

    /*
     * Limite clássico do local-part.
     */
    if (localPart.length > 64) {
        return false;
    }

    if (localPart.startsWith(".") || localPart.endsWith(".") || localPart.includes("..")) {
        return false;
    }

    /*
     * Caracteres comuns de e-mail.
     */
    const localPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/u;

    if (!localPattern.test(localPart)) {
        return false;
    }

    /*
     * Validação do domínio.
     */
    const labels = domain.split(".");

    if (labels.length < 2) {
        return false;
    }

    for (const label of labels) {
        if (!label || label.length > 63 || label.startsWith("-") || label.endsWith("-")) {
            return false;
        }

        if (!/^[A-Za-z0-9-]+$/u.test(label)) {
            return false;
        }
    }

    /*
     * TLD mínimo de duas letras.
     */
    const tld = labels[labels.length - 1];

    if (!/^[A-Za-z]{2,63}$/u.test(tld)) {
        return false;
    }

    return true;
}

/* =========================================================
   PHONE
========================================================= */

function isValidBrazilianPhone(value) {
    if (!value) {
        return false;
    }

    /*
     * Só permitimos caracteres usados
     * normalmente em números formatados.
     *
     * Isso impede:
     *
     * 33abc999999999
     * WhatsApp33
     * etc.
     */
    if (!/^\+?[\d\s().-]+$/u.test(value)) {
        return false;
    }

    /*
     * Se houver +, ele precisa ser
     * o DDI brasileiro.
     */
    if (value.includes("+") && !value.trim().startsWith("+55")) {
        return false;
    }

    const digits = value.replace(/\D/g, "");

    /*
     * Evita:
     *
     * 11111111111
     * 99999999999
     */
    if (/^(\d)\1+$/.test(digits)) {
        return false;
    }

    let nationalDigits = digits;

    /*
     * DDI 55.
     */
    if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) {
        nationalDigits = digits.slice(2);
    }

    /*
     * 10 = fixo
     * 11 = celular
     */
    if (nationalDigits.length !== 10 && nationalDigits.length !== 11) {
        return false;
    }

    const ddd = Number(nationalDigits.slice(0, 2));

    if (!VALID_DDDS.has(ddd)) {
        return false;
    }

    const subscriber = nationalDigits.slice(2);

    /*
     * Celular:
     * 9 dígitos iniciando em 9.
     */
    if (subscriber.length === 9) {
        return /^9\d{8}$/.test(subscriber);
    }

    /*
     * Fixo:
     * 8 dígitos iniciando de 2 a 5.
     */
    return /^[2-5]\d{7}$/.test(subscriber);
}

/* =========================================================
   CONTACT
========================================================= */

function isValidContact(value) {
    if (!value) {
        return true;
    }

    return isValidEmail(value) || isValidBrazilianPhone(value);
}

/* =========================================================
   MESSAGE
========================================================= */

function hasEnoughLetters(value) {
    const letters = value.match(/\p{L}/gu) || [];

    return letters.length >= 3;
}

function hasExcessiveRepeatedCharacters(value) {
    return /(.)\1{7,}/u.test(value);
}

/* =========================================================
   SCHEMA
========================================================= */

export const questionSchema = z.object({
    /* ===============================================
           CATEGORIA
        ============================================== */

    category: z
        .string()
        .trim()
        .min(1, "Escolha o assunto da sua dúvida.")
        .refine((value) => categories.includes(value), "Escolha uma categoria válida."),

    /* ===============================================
           DÚVIDA
        ============================================== */

    message: z
        .string()
        .trim()
        .min(10, "Explique um pouco mais sua dúvida.")
        .max(2000, "A dúvida pode ter no máximo 2000 caracteres.")
        .refine((value) => hasEnoughLetters(value), "Descreva sua dúvida usando pelo menos algumas palavras.")
        .refine((value) => !hasExcessiveRepeatedCharacters(value), "A dúvida parece conter caracteres repetidos em excesso."),

    /* ===============================================
           NOME
        ============================================== */

    name: z
        .string()
        .trim()
        .max(100, "O nome pode ter no máximo 100 caracteres.")
        .transform(normalizeName)
        .refine((value) => isValidName(value), "Digite um nome válido usando apenas letras, espaços, hífen ou apóstrofo."),

    /* ===============================================
           CONTATO
        ============================================== */

    contact: z
        .string()
        .trim()
        .max(200, "O contato pode ter no máximo 200 caracteres.")
        .refine((value) => isValidContact(value), "Informe um e-mail válido ou um número de WhatsApp válido."),

    /* ===============================================
           DISPOSITIVO
        ============================================== */

    device: z
        .string()
        .trim()
        .min(1, "Informe onde está tentando realizar a tarefa.")
        .refine((value) => devices.includes(value), "Escolha um dispositivo válido."),
});
