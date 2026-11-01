import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTER_PATH = path.join(ROOT, "docs", "REGISTRO_DE_OCORRENCIAS.md");

const VALID_STATUSES = new Set([
    "ABERTO",
    "EM INVESTIGAÇÃO",
    "EM CORREÇÃO",
    "MITIGADO",
    "RESOLVIDO",
    "ACEITO (RISCO)",
    "NÃO REPRODUZIDO",
    "DUPLICADO",
]);

const REQUIRED_SECTIONS = [
    "Resumo",
    "Impacto",
    "Investigação e causa raiz",
    "Correção ou mitigação",
    "Validação",
    "Prevenção",
    "Referências",
];

function reportError(message) {
    console.error("[occurrence-register] " + message);
}

function getField(block, label) {
    const pattern = new RegExp(
        "^- \\*\\*" + label + ":\\*\\*\\s*(.+)$",
        "mi",
    );

    return block.match(pattern)?.[1]?.trim() ?? null;
}

async function main() {
    let document;

    try {
        document = await readFile(REGISTER_PATH, "utf8");
    } catch (error) {
        reportError("Não foi possível ler docs/REGISTRO_DE_OCORRENCIAS.md.");
        throw error;
    }

    const headingPattern = /^### (BUG|ERR|VULN|INC)-(\d{4}) — (.+)$/gm;
    const entries = [...document.matchAll(headingPattern)];
    const errors = [];
    const seenIds = new Set();
    const sequences = new Map();

    if (entries.length === 0) {
        errors.push("Nenhuma ocorrência foi encontrada.");
    }

    for (let index = 0; index < entries.length; index += 1) {
        const entry = entries[index];
        const [, prefix, number, title] = entry;
        const id = prefix + "-" + number;
        const start = entry.index + entry[0].length;
        const end = entries[index + 1]?.index ?? document.length;
        const block = document.slice(start, end);

        if (seenIds.has(id)) {
            errors.push(id + ": identificador duplicado.");
        }

        seenIds.add(id);

        const categorySequences = sequences.get(prefix) ?? [];
        categorySequences.push(Number(number));
        sequences.set(prefix, categorySequences);

        if (!title.trim()) {
            errors.push(id + ": título vazio.");
        }

        const requiredFields = [
            "Status",
            "Data de registro",
            "Data de descoberta",
            "Data de resolução",
            "Componente",
            "Prioridade",
            "Severidade",
            "Divulgação",
        ];

        for (const field of requiredFields) {
            if (!getField(block, field)) {
                errors.push(id + ": campo obrigatório ausente: " + field + ".");
            }
        }

        const status = getField(block, "Status");

        if (status && !VALID_STATUSES.has(status)) {
            errors.push(id + ": status inválido: " + status + ".");
        }

        const registrationDate = getField(block, "Data de registro");

        if (registrationDate && !/^\d{4}-\d{2}-\d{2}$/.test(registrationDate)) {
            errors.push(id + ": Data de registro deve usar YYYY-MM-DD.");
        }

        const resolutionDate = getField(block, "Data de resolução");

        if (status === "RESOLVIDO" && (!resolutionDate || resolutionDate === "—")) {
            errors.push(id + ": ocorrência resolvida precisa de Data de resolução.");
        }

        if (
            status !== "RESOLVIDO" &&
            resolutionDate &&
            resolutionDate !== "—" &&
            !/^\d{4}-\d{2}-\d{2}$/.test(resolutionDate)
        ) {
            errors.push(id + ": Data de resolução deve usar YYYY-MM-DD ou —.");
        }

        if (prefix === "VULN") {
            const disclosure = getField(block, "Divulgação")?.toUpperCase() ?? "";
            const severity = getField(block, "Severidade")?.toUpperCase() ?? "";

            if (!disclosure.startsWith("RESTRITA") && !disclosure.startsWith("PÚBLICA")) {
                errors.push(id + ": Divulgação deve indicar RESTRITA ou PÚBLICA.");
            }

            if (!["CRÍTICA", "ALTA", "MÉDIA", "BAIXA", "INFORMATIVA"].includes(severity)) {
                errors.push(id + ": vulnerabilidade precisa de severidade justificada.");
            }
        }

        for (const section of REQUIRED_SECTIONS) {
            const sectionPattern = new RegExp("^#### " + section + "\\s*$", "m");

            if (!sectionPattern.test(block)) {
                errors.push(id + ": seção obrigatória ausente: " + section + ".");
            }
        }

        if (!/https?:\/\//.test(block)) {
            errors.push(id + ": inclua ao menos uma referência verificável.");
        }
    }

    for (const [prefix, values] of sequences) {
        values.sort((a, b) => a - b);

        values.forEach((value, index) => {
            if (value !== index + 1) {
                errors.push(
                    prefix +
                        ": sequência esperada " +
                        String(index + 1).padStart(4, "0") +
                        ", encontrado " +
                        String(value).padStart(4, "0") +
                        ". Não reutilize nem pule IDs públicos.",
                );
            }
        });
    }

    if (errors.length > 0) {
        reportError(errors.length + " problema(s) encontrado(s):");
        errors.forEach((error) => reportError("- " + error));
        globalThis.process.exitCode = 1;
        return;
    }

    const summary = [...sequences.entries()]
        .map(([prefix, values]) => prefix + ": " + values.length)
        .join("; ");

    console.log(
        "[occurrence-register] " + entries.length + " ocorrência(s) válida(s). " + summary,
    );
    console.log(
        "[occurrence-register] Validação estrutural concluída; a revisão de segurança continua humana.",
    );
}

main().catch((error) => {
    reportError(error instanceof Error ? error.message : String(error));
    globalThis.process.exitCode = 1;
});
