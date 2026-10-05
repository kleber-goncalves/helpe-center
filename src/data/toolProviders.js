import { FileText, Images } from "lucide-react";

export const toolProviders = [
    {
        id: "ilovepdf",
        name: "iLovePDF",
        icon: FileText,
        description:
            "O processamento dos PDFs acontece no site do iLovePDF, que informa medidas de segurança e privacidade para os arquivos enviados.",
        retentionNote:
            "O iLovePDF informa que os arquivos processados são excluídos automaticamente em até 2 horas. Ferramentas de assinatura podem seguir regras específicas de retenção.",
        privacyUrl: "https://www.ilovepdf.com/pt/ajuda/privacidade",
        securityUrl: "https://www.ilovepdf.com/pt/ajuda/security",
    },
    {
        id: "iloveimg",
        name: "iLoveIMG",
        icon: Images,
        description:
            "O processamento das imagens acontece no site do iLoveIMG, que informa medidas de segurança e privacidade para os arquivos enviados.",
        retentionNote:
            "O iLoveIMG informa que os arquivos processados são excluídos automaticamente em até 2 horas. Serviços de assinatura podem seguir regras específicas de retenção.",
        privacyUrl: "https://www.iloveimg.com/pt/ajuda/privacidade",
        securityUrl: "https://www.iloveimg.com/pt/ajuda/security",
    },
];
