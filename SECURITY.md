# Política de Segurança — Hauy Conecta

O Hauy Conecta é um projeto escolar e educacional com repositório público. O propósito de estudo não elimina a responsabilidade de proteger usuários, dados e infraestrutura.

Esta política explica como reportar suspeitas de vulnerabilidade e quais limites devem ser respeitados durante estudos e testes.

## 1. Reporte responsável

**Não publique detalhes técnicos de uma possível vulnerabilidade em Issues, Pull Requests, comentários, Discussions ou no registro público antes de combinar a divulgação com o responsável pelo projeto.**

Quando o recurso estiver habilitado no GitHub:

1. Abra a página do repositório.
2. Acesse **Security and quality → Advisories**.
3. Utilize **Report a vulnerability** para enviar o relato de forma privada.

O recurso de relatório privado precisa estar habilitado nas configurações do repositório. A existência deste arquivo `SECURITY.md` não habilita o recurso automaticamente.

Se a opção de reporte privado não estiver disponível, abra uma Issue pública **sem detalhes técnicos**, informando apenas que deseja comunicar um assunto de segurança e solicitando ao mantenedor um canal privado. Não inclua evidências, URLs sensíveis, payloads ou passos de reprodução na Issue.

Referências oficiais:
- [Relatar uma vulnerabilidade de modo privado](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/report-privately)
- [Configurar relatórios privados de vulnerabilidade](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/configure-for-a-repository)
- [Avisos de segurança do repositório](https://docs.github.com/en/code-security/concepts/vulnerability-reporting-and-management/repository-security-advisories)

## 2. Limites para testes e estudos

O projeto pode ser utilizado para aprendizado, análise de código e testes de segurança em ambientes autorizados. Isso não concede autorização automática para testar a infraestrutura real da escola, contas de usuários ou serviços de terceiros.

- Teste apenas sistemas, contas, dispositivos e ambientes que você controla ou para os quais recebeu autorização explícita do responsável.
- Não execute varreduras agressivas, força bruta, negação de serviço, exploração de falhas ou testes que possam interromper serviços em produção sem autorização específica.
- Prefira ambiente local, dados sintéticos e Preview autorizado.
- Não use contas reais de alunos, professores ou funcionários como dados de teste.
- Respeite a disponibilidade dos serviços escolares e interrompa o teste ao perceber impacto inesperado.

## 3. Dados que nunca devem ser publicados

Não inclua em Issues, Pull Requests, commits, documentação, logs ou capturas de tela:

- senhas, tokens, chaves de API, cookies, segredos ou conteúdo de arquivos `.env`;
- nomes, e-mails, matrículas, contatos, imagens identificáveis ou outros dados pessoais da comunidade escolar;
- dados de autenticação, sessões ou identificadores privados;
- endereços internos, configurações de infraestrutura ou evidências que aumentem desnecessariamente a superfície de ataque;
- provas de conceito, payloads ou instruções operacionais de exploração de vulnerabilidades ainda não corrigidas.

Se um segredo for exposto, trate-o como comprometido: notifique o responsável e revogue ou rotacione a credencial. Remover o segredo do histórico do Git, por si só, não o torna seguro novamente.

## 4. Divulgação coordenada

A divulgação pública de uma vulnerabilidade deve ocorrer somente depois de:

1. o relato ter sido analisado pelo responsável;
2. o impacto e o escopo terem sido compreendidos;
3. a correção ou mitigação ter sido disponibilizada, quando possível;
4. a correção ter sido validada;
5. os detalhes publicados terem sido revisados para não expor usuários, dados ou caminhos de exploração desnecessários.

O registro público em [docs/REGISTRO_DE_OCORRENCIAS.md](docs/REGISTRO_DE_OCORRENCIAS.md) deve conter um resumo sanitizado, status, impacto em alto nível, correção e validação. Detalhes técnicos restritos permanecem no fluxo privado de segurança.

## 5. Como documentamos vulnerabilidades

- Vulnerabilidades recebem IDs `VULN-####` quando houver um registro público sanitizado aprovado.
- Enquanto o assunto estiver restrito, utilize o identificador do aviso privado do GitHub e não replique seu conteúdo no repositório.
- A severidade deve ser justificada. CVSS só deve ser informado quando houver avaliação fundamentada.
- Um registro público não substitui auditoria, teste de segurança ou garantia de ausência de vulnerabilidades.

## 6. Contato e escopo

O canal preferencial é o reporte privado de vulnerabilidade do GitHub, quando habilitado no repositório. Caso não esteja disponível, solicite ao mantenedor um meio privado de comunicação sem publicar detalhes técnicos.

Esta política cobre o código e os ambientes do Hauy Conecta sob responsabilidade do mantenedor. Serviços de terceiros seguem os canais e regras de seus respectivos responsáveis.
