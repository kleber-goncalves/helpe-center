# Regras dos Tutoriais — Hauy Conecta

Este documento descreve como os tutoriais do Hauy Conecta são estruturados e quais regras devem ser seguidas ao criar ou adaptar novos conteúdos.

O objetivo é preservar a lógica editorial do projeto: o tutorial deve ensinar uma tarefa prática de forma simples, progressiva e fácil de acompanhar.

---

## 1. Objetivo de um tutorial

Cada tutorial deve ensinar **uma tarefa ou objetivo claro**.

A pessoa deve conseguir entender rapidamente:

- o que vai aprender;
- qual ferramenta ou assunto será utilizado;
- qual o nível de dificuldade;
- quanto tempo aproximadamente levará;
- quais etapas deverá seguir.

Evite transformar um tutorial em um texto teórico longo.

A lógica principal é:

```text
DÚVIDA
  ↓
OBJETIVO
  ↓
PASSOS
  ↓
RESULTADO
```

O conteúdo deve ajudar o usuário a realizar a tarefa, não apenas explicar conceitos.

---

## 2. Estrutura obrigatória de um tutorial

Um tutorial do Hauy Conecta possui esta estrutura de referência:

```text
Tutorial
│
├── id
├── title
├── category
├── difficulty
├── duration
├── description
├── keywords
├── learning
├── steps
└── externalLearning
```

### Campos

| Campo | Função |
|---|---|
| `id` | Identificador único do tutorial |
| `title` | Título apresentado ao usuário |
| `category` | ID da categoria à qual o tutorial pertence |
| `difficulty` | Nível de dificuldade |
| `duration` | Duração aproximada |
| `description` | Resumo do que o tutorial ensina |
| `keywords` | Termos que ajudam o usuário a encontrar o tutorial |
| `learning` | Lista do que o usuário aprenderá |
| `steps` | Passo a passo principal |
| `externalLearning` | Conteúdo externo opcional para continuar estudando |

---

## 3. Identificador

O `id` deve ser:

- único;
- estável;
- curto;
- baseado no assunto do tutorial;
- adequado para URL.

Exemplo:

```text
comecar-usar-excel
sumario-automatico-word
salvar-google-drive
```

Evite alterar o `id` depois que o tutorial estiver publicado, porque ele também é utilizado para identificar a página do tutorial.

---

## 4. Título

O título deve deixar claro **qual tarefa o usuário aprenderá**.

O projeto utiliza títulos no formato:

```text
Como + ação + objetivo
```

Exemplos reais:

- Como começar a usar o Excel
- Como formatar um trabalho no Word
- Como criar um sumário automático no Word
- Como compartilhar um arquivo
- Como converter um documento para PDF
- Como anexar um arquivo em um e-mail
- Como salvar um arquivo no Google Drive
- Como criar uma apresentação no Canva

Prefira títulos específicos a títulos genéricos.

Evite algo como:

```text
Excel
Word
PDF
Canva
```

O usuário precisa saber imediatamente o que será aprendido.

---

## 5. Categoria

Todo tutorial deve pertencer a uma categoria existente.

Categorias atuais:

```text
word
excel
email
arquivos-pdf
google-drive
canva
plataformas-escola
informatica-basica
```

O valor de `category` deve utilizar o **ID da categoria**, e não necessariamente o nome exibido.

Exemplo:

```json
{
  "category": "excel"
}
```

Isso permite que o tutorial seja associado corretamente à categoria correspondente.

---

## 6. Dificuldade

A dificuldade ajuda o usuário a entender o nível de conhecimento necessário.

O projeto utiliza níveis como:

```text
Fácil
Intermediário
```

A classificação deve refletir a tarefa real.

Use **Fácil** quando a pessoa provavelmente conseguirá acompanhar com pouca experiência.

Use **Intermediário** quando o tutorial exigir mais etapas, ferramentas ou conhecimentos prévios.

Não aumente a dificuldade apenas porque o tutorial possui muitas imagens.

---

## 7. Duração

A duração é uma estimativa de leitura e execução do tutorial.

Exemplos do projeto:

```text
3 minutos
4 minutos
5 minutos
6 minutos
7 minutos
```

A duração deve representar aproximadamente o tempo necessário para acompanhar o tutorial com calma.

Não use uma duração artificialmente curta apenas para deixar o tutorial mais atraente.

---

## 8. Descrição

A descrição deve explicar, em uma ou duas frases, **o que o usuário conseguirá fazer ao terminar**.

Ela deve ser:

- objetiva;
- prática;
- compreensível;
- específica.

Exemplo de padrão:

```text
Aprenda + tarefa + principais ações envolvidas.
```

Evite transformar a descrição em uma introdução técnica extensa.

---

## 9. Palavras-chave

As `keywords` são especialmente importantes porque participam diretamente da busca do Hauy Conecta.

A busca compara a consulta do usuário com:

- título;
- palavras-chave;
- descrição;
- categoria.

A pesquisa dá bastante peso para correspondências no título e nas palavras-chave.

Em termos de prioridade, o mecanismo atual considera:

```text
frase no título        → muito forte
frase em keyword      → forte
frase na descrição    → média
frase na categoria    → média

palavra no título     → forte
palavra em keyword    → forte
palavra na descrição  → menor
palavra na categoria  → menor
```

Por isso, as palavras-chave devem representar **formas reais de como um usuário poderia pesquisar aquela tarefa**.

### Exemplos

Para um tutorial de Excel:

```text
excel
planilha
tabela
dados
célula
linha
coluna
salvar
```

Não coloque palavras que não tenham relação direta com o tutorial.

Evite excesso de palavras-chave genéricas.

---

## 10. O que você vai aprender

O campo `learning` representa os principais resultados de aprendizagem do tutorial.

Cada item deve ser uma ação ou conhecimento concreto.

Exemplo:

```text
Abrir o Excel e criar uma planilha
Entender células, linhas e colunas
Inserir informações na planilha
Salvar a planilha no computador
```

Os itens devem corresponder ao conteúdo realmente apresentado nos passos.

Não coloque no `learning` algo que o tutorial não ensine.

---

# 11. Passos

Os passos são a parte principal do tutorial.

Cada passo deve possuir:

```text
step
├── title
├── description
├── examples
├── tip
├── video      (opcional)
└── poster     (opcional)
```

### Título do passo

O título deve representar uma ação ou etapa específica.

Exemplos:

- Abra o Microsoft Excel
- Entenda as células da planilha
- Digite os primeiros dados
- Crie títulos para as colunas
- Salve a planilha

Evite juntar muitas ações diferentes em um único título quando isso dificultar o acompanhamento.

---

## 12. Descrição do passo

A descrição explica **como executar a ação daquela etapa**.

Ela deve ser:

- direta;
- sequencial;
- acessível para iniciantes;
- suficiente para que a pessoa saiba o que fazer.

Prefira:

```text
Clique em...
Selecione...
Digite...
Abra...
Escolha...
```

a explicações abstratas ou excessivamente técnicas.

---

## 13. Exemplos dentro do passo

Um passo pode possuir um ou vários `examples`.

Um exemplo possui a estrutura:

```text
example
├── title
├── description
├── image      (opcional)
├── video      (opcional)
├── poster     (opcional)
└── alt
```

Os exemplos existem para mostrar uma ação ou resultado específico.

Exemplo:

```text
Passo: Entenda as células da planilha

Exemplos:
- A1
- B2
- C5
- Coluna B
- Linha 2
```

Isso permite dividir uma explicação complexa em partes menores.

---

## 14. Imagens

Quando uma ação puder ser entendida melhor visualmente, utilize uma imagem.

A imagem deve:

- mostrar exatamente a ação ou resultado relevante;
- estar relacionada ao texto do exemplo;
- possuir `alt` descritivo;
- não existir apenas como decoração.

A estrutura esperada é:

```json
{
  "image": "/caminho/da-imagem.webp",
  "alt": "Descrição do que aparece na imagem."
}
```

Quando não houver imagem:

```json
{
  "image": null
}
```

Não invente caminhos para imagens que não existem.

---

## 15. Vídeos

Vídeos podem ser utilizados quando uma ação for melhor compreendida em movimento.

Um exemplo pode utilizar:

```json
{
  "video": "/caminho/video.mp4",
  "poster": "/caminho/poster.webp"
}
```

O `poster` funciona como imagem de apresentação do vídeo.

Quando não houver vídeo:

```json
{
  "video": null,
  "poster": null
}
```

Não adicione vídeo apenas para aumentar o conteúdo.

O vídeo deve complementar a explicação.

---

## 16. Vídeo diretamente no passo

Além de vídeos dentro de um `example`, um passo também pode possuir:

```text
step.video
step.poster
```

Esse formato deve ser utilizado quando o vídeo pertence ao passo como um todo, e não a um exemplo específico.

Não é necessário duplicar o mesmo vídeo em vários níveis.

---

## 17. Texto alternativo

Toda imagem deve possuir `alt`.

O texto alternativo deve explicar o que é visualmente importante na imagem.

Prefira:

```text
Tela inicial do Microsoft Excel mostrando a opção de criar uma pasta de trabalho em branco.
```

a algo genérico como:

```text
Imagem do Excel
```

O `alt` deve ajudar alguém que não consegue visualizar a imagem a compreender sua função no tutorial.

---

## 18. Dicas

Um passo pode possuir uma dica:

```text
tip
```

A dica deve acrescentar uma informação útil que não seja apenas uma repetição da descrição.

Exemplos do projeto incluem:

- alertas para conferir a conta correta;
- orientações para evitar erros;
- recomendações de organização;
- explicações curtas sobre conceitos importantes;
- lembretes para seguir orientações do professor.

Evite usar a dica para adicionar uma nova etapa inteira.

---

# 19. Ordem dos passos

Os passos devem seguir a ordem natural da tarefa.

A sequência ideal é:

```text
abrir
  ↓
configurar
  ↓
executar
  ↓
conferir
  ↓
finalizar
```

Nem todo tutorial precisa seguir exatamente esse modelo, mas a ordem deve fazer sentido para quem está realizando a tarefa pela primeira vez.

Não pule uma ação necessária apenas para deixar o tutorial menor.

---

# 20. Um passo deve ensinar uma coisa principal

Evite criar passos que misturem muitas tarefas independentes.

Ruim:

```text
Abra o programa, escolha a pasta,
adicione o arquivo, edite o documento
e envie para outra pessoa.
```

Melhor:

```text
Passo 1 — Abra o programa
Passo 2 — Escolha a pasta
Passo 3 — Adicione o arquivo
Passo 4 — Edite o documento
Passo 5 — Envie o arquivo
```

Isso facilita a navegação e a compreensão.

---

# 21. Evite etapas desnecessárias

O tutorial não deve continuar depois que o objetivo principal já foi atingido.

Um exemplo importante do projeto é:

**Como criar um sumário automático no Word**

Esse tutorial foi planejado para terminar depois de:

1. apresentar a opção de inserir o sumário;
2. mostrar como o sumário fica no documento.

Não adicione etapas extras apenas para aumentar a quantidade de conteúdo.

A regra é:

**termine quando a tarefa ensinada estiver resolvida.**

---

# 22. Conteúdo complementar

No final do tutorial pode existir:

```text
externalLearning
```

Ele serve para indicar conteúdo externo que permita aprofundar o assunto.

Cada item pode ter:

```text
type
title
description
url
```

Os formatos utilizados pela interface são:

```text
video
playlist
```

O conteúdo complementar não substitui o tutorial principal.

Ele é uma opção para quem deseja continuar aprendendo.

---

# 23. Tutoriais relacionados

A página do tutorial também apresenta conteúdos relacionados da mesma categoria.

Por isso, um tutorial deve estar corretamente associado à sua categoria.

Exemplo:

```text
Tutorial de Word
   ↓
outros tutoriais da categoria Word
```

Não utilize uma categoria apenas porque ela parece próxima do assunto.

Escolha a categoria que melhor representa o conteúdo principal.

---

# 24. Relação entre título, keywords e descrição

Esses três elementos devem trabalhar juntos.

Exemplo:

```text
Título:
Como criar um sumário automático no Word

Keywords:
word
sumário
sumario automático
índice
documento

Descrição:
Aprenda a criar um sumário automaticamente no Word.
```

A pessoa pode pesquisar:

```text
sumário
sumario
sumário automático
word sumário
índice no word
```

As informações do tutorial devem fornecer boas possibilidades para que essas pesquisas encontrem o conteúdo.

---

# 25. Linguagem

Use linguagem:

- simples;
- direta;
- educacional;
- acolhedora;
- sem excesso de termos técnicos.

Prefira frases que expliquem exatamente o que o usuário deve fazer.

Evite presumir que a pessoa já conhece o programa.

Quando um termo técnico for necessário, explique-o de maneira curta.

---

# 26. Exemplos reais são melhores que explicações abstratas

Sempre que possível, mostre a ação através de um exemplo concreto.

Exemplo no Excel:

```text
A1
B2
C5
```

Isso é melhor para iniciantes do que explicar apenas que:

```text
"uma célula possui uma referência formada por coluna e linha."
```

A explicação pode existir, mas o exemplo ajuda o usuário a visualizar o conceito.

---

# 27. Acessibilidade do conteúdo

O conteúdo deve ser compreensível mesmo para usuários com pouca familiaridade digital.

Também deve preservar os recursos de acessibilidade da aplicação:

- textos claros;
- imagens com `alt`;
- vídeos com informações descritivas quando disponíveis;
- ausência de dependência exclusiva de cor;
- etapas bem separadas;
- instruções objetivas.

A acessibilidade deve fazer parte do conteúdo, e não ser tratada apenas como uma função visual do site.

---

# 28. Consistência

Novos tutoriais devem manter um padrão semelhante aos atuais.

Procure manter:

```text
título claro
↓
descrição objetiva
↓
o que você vai aprender
↓
passos numerados
↓
exemplos
↓
dicas quando necessário
↓
resultado final
↓
conteúdo complementar
```

Isso faz com que o usuário reconheça rapidamente como os tutoriais funcionam.

---

# 29. Checklist para criar um novo tutorial

Antes de publicar um tutorial, confira:

- [ ] O título explica claramente a tarefa?
- [ ] O `id` é único e estável?
- [ ] A categoria está correta?
- [ ] A dificuldade faz sentido?
- [ ] A duração é realista?
- [ ] A descrição explica o objetivo?
- [ ] As `keywords` representam pesquisas reais?
- [ ] O `learning` corresponde aos passos?
- [ ] Os passos estão em ordem lógica?
- [ ] Cada passo possui uma ação principal clara?
- [ ] As imagens realmente ajudam?
- [ ] Todas as imagens possuem `alt`?
- [ ] Os vídeos possuem `poster` quando aplicável?
- [ ] As dicas acrescentam valor?
- [ ] O tutorial termina quando a tarefa está resolvida?
- [ ] O conteúdo externo realmente complementa o assunto?
- [ ] Não existem informações inventadas ou etapas desnecessárias?

---

# 30. Regra principal

A regra mais importante é:

> **Um tutorial deve ser simples o suficiente para um iniciante acompanhar e completo o suficiente para resolver a tarefa proposta.**

Não tente tornar o tutorial maior.

Tente torná-lo **mais útil**.

O objetivo do Hauy Conecta é:

```text
PESQUISAR
   ↓
ENCONTRAR
   ↓
APRENDER
   ↓
RESOLVER
```

Cada novo tutorial deve contribuir para essa jornada.
