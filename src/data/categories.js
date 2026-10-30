import {  GraduationCap, Palette, Printer, Table2, FileType, HardDrive } from "@sketchyicons/react";
import { MicrosoftWord, MicrosoftExcel, Gmail2026, Pdf, GoogleDrive2026, Canva   } from "@thesvg/react";

export const categories = [
    { id: "word", name: "Word", description: "Formatação, documentos e trabalhos escolares.", icon: MicrosoftWord },
    { id: "excel", name: "Excel", description: "Planilhas, fórmulas e organização de dados.", icon: MicrosoftExcel },
    { id: "email", name: "E-mail", description: "Mensagens, anexos e compartilhamento.", icon: Gmail2026 },
    { id: "arquivos-pdf", name: "Arquivos e PDF", description: "Conversão, organização e documentos.", icon: Pdf },
    { id: "google-drive", name: "Google Drive", description: "Salvar, organizar e compartilhar arquivos.", icon: GoogleDrive2026 },
    { id: "canva", name: "Canva", description: "Apresentações e materiais visuais.", icon: Canva },
    { id: "plataformas-escola", name: "Plataformas da Escola", description: "Sistemas utilizados pela escola.", icon: GraduationCap },
    { id: "informatica-basica", name: "Informática Básica", description: "Computador, digitação, impressão e digitalização.", icon: Printer },
];

export const priorityTopics = [
    { title: "Excel", icon: Table2, description: "Aprenda os principais recursos de planilhas.", category: "excel" },
    { title: "Formatação de trabalhos", icon: FileType, description: "Organize seus trabalhos no Word.", category: "word" },
    { title: "Impressão e digitalização", icon: Printer, description: "Aprenda a imprimir e digitalizar documentos.", category: "informatica-basica" },
    { title: "Sumário automático", icon: FileType, description: "Crie um sumário automaticamente no Word.", category: "word" },
    { title: "Compartilhamento de arquivos", icon: HardDrive, description: "Envie seus arquivos com segurança.", category: "google-drive" },
    { title: "Canva", icon: Palette, description: "Crie apresentações e materiais visuais.", category: "canva" },
];
