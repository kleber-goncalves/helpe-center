import { z } from "zod";

export const categories = ["Excel", "Word", "PowerPoint", "Canva", "PDF", "E-mail", "Google Drive", "Impressão", "Digitalização", "Plataforma da escola", "Informática básica", "Outro"];

export const devices = ["Computador", "Celular", "Tablet", "Não sei informar"];

export const questionSchema = z.object({
    category: z
        .string()
        .trim()
        .min(1, "Escolha o assunto da sua dúvida.")
        .refine((value) => categories.includes(value), "Escolha uma categoria válida."),

    message: z.string().trim().min(10, "Explique um pouco mais sua dúvida.").max(2000, "A dúvida pode ter no máximo 2000 caracteres."),

    name: z.string().trim().max(100, "O nome pode ter no máximo 100 caracteres."),

    contact: z.string().trim().max(200, "O contato pode ter no máximo 200 caracteres."),

    device: z
        .string()
        .trim()
        .min(1, "Informe onde está tentando realizar a tarefa.")
        .refine((value) => devices.includes(value), "Escolha um dispositivo válido."),
});
