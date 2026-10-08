# Referência do Hauy Conecta para outro projeto

Este conjunto de arquivos serve para entregar a outro desenvolvedor o conteúdo e as regras dos tutoriais do Hauy Conecta sem precisar entregar o código React original.

## O que deve ser usado

- `DOCUMENTACAO_PRODUTO_HAUY_CONECTA.md`: explica o produto, páginas e funcionalidades.
- `TUTORIAIS_E_CATEGORIAS.json`: contém os dados atuais de categorias, tópicos prioritários e tutoriais.
- `REGRAS-DOS-TUTORIAIS.md`: explica como os tutoriais devem ser estruturados e escritos.
- `MANIFESTO-MIDIAS-CURSOR.json`: lista todas as imagens, vídeos e posters referenciados pelos tutoriais.
- `BAIXAR-MIDIAS-PARA-CURSOR.mjs`: baixa automaticamente as mídias para `public/tutoriais`.

## Como levar as mídias para o novo projeto

Na pasta raiz do novo projeto, coloque o arquivo `BAIXAR-MIDIAS-PARA-CURSOR.mjs` e execute:

```bash
node BAIXAR-MIDIAS-PARA-CURSOR.mjs
```

O script cria a estrutura:

```text
public/
└── tutoriais/
    ├── excel/
    ├── word/
    ├── email/
    ├── google-drive/
    └── canva/
```

As referências do JSON usam caminhos como:

```text
/tutoriais/excel/...
/tutoriais/word/...
```

Por isso, depois da execução, as mídias ficam no mesmo formato de caminho esperado pelos dados.

## Importante

O pacote de referência não precisa receber o código original do Hauy Conecta.

A pessoa deve usar:

```text
documentação
+
dados
+
regras
+
mídias
```

como referência para criar a própria implementação.

O código, componentes, identidade visual e arquitetura podem ser diferentes.

## Fonte das mídias

As mídias são baixadas da branch `feat/ferramentas` do repositório:

```text
kleber-goncalves/helpe-center
```

Se a branch ou o repositório forem alterados no futuro, atualize as constantes do script antes de executá-lo.
