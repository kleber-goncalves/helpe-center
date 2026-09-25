import { SignalLow, SignalMedium } from "@sketchyicons/react";

export const tutorials = [
    {
        id: "comecar-usar-excel",

        title: "Como começar a usar o Excel",

        category: "excel",

        difficulty: "Fácil",

        icon: SignalLow,

        duration: "6 minutos",

        description: "Aprenda os primeiros passos para criar, preencher, organizar e salvar uma planilha no Excel.",

        keywords: ["excel", "planilha", "tabela", "dados", "célula", "linha", "coluna", "pasta de trabalho", "formatação", "salvar"],

        learning: ["Abrir o Excel e criar uma planilha", "Entender células, linhas e colunas", "Inserir informações na planilha", "Criar títulos para organizar os dados", "Aplicar uma formatação básica", "Salvar a planilha no computador"],

        steps: [
            {
                title: "Abra o Microsoft Excel",

                description: "Abra o Microsoft Excel no computador. Na tela inicial, escolha a opção de criar uma nova pasta de trabalho em branco.",

                examples: [
                    {
                        title: "Pasta de trabalho em branco",

                        description: "Escolha a opção de criar uma nova pasta de trabalho em branco para começar sua planilha.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-1.png",

                        alt: "Tela inicial do Microsoft Excel mostrando a opção de criar uma pasta de trabalho em branco.",
                    },
                ],

                tip: "Uma pasta de trabalho é o arquivo do Excel que você está criando. Dentro dela, você pode ter uma ou várias planilhas.",

                video: null,
            },

            {
                title: "Entenda as células da planilha",

                description: "A planilha é formada por linhas e colunas. O encontro de uma linha com uma coluna forma uma célula. Cada célula possui um endereço, como A1, B2 ou C5.",

                examples: [
                    {
                        title: "A1",

                        description: "A1 é a célula localizada na coluna A e na linha 1.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-2-a1.png",

                        alt: "Planilha do Excel com a célula A1 selecionada.",
                    },

                    {
                        title: "B2",

                        description: "B2 é a célula localizada na coluna B e na linha 2.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-2-b2.png",

                        alt: "Planilha do Excel com a célula B2 selecionada.",
                    },

                    {
                        title: "C5",

                        description: "C5 é a célula localizada na coluna C e na linha 5.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-2-c5.png",

                        alt: "Planilha do Excel com a célula C5 selecionada.",
                    },

                    {
                        title: "Coluna B",

                        description: "A coluna B é identificada pela letra B no topo da planilha e contém as células dessa coluna.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-2-coluna-b.png",

                        alt: "Planilha do Excel destacando a coluna B.",
                    },

                    {
                        title: "Linha 2",

                        description: "A linha 2 é identificada pelo número 2 no lado esquerdo da planilha.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-2-linha-2.png",

                        alt: "Planilha do Excel destacando a linha 2.",
                    },
                ],

                tip: "A letra indica a coluna e o número indica a linha. Por exemplo: A1 significa coluna A, linha 1.",

                video: null,
            },

            {
                title: "Digite os primeiros dados",

                description: "Clique em uma célula, como A1, e digite uma informação. Depois, pressione Enter para confirmar. Você pode utilizar outras células para inserir os próximos dados.",

                examples: [
                    {
                        title: "Nome",

                        description: "Clique em uma célula, como A1, digite um nome e pressione Enter para confirmar.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-3-nome.png",

                        alt: "Planilha do Excel com um nome sendo digitado na célula A1.",
                    },

                    {
                        title: "Nota",

                        description: "Use outra célula para inserir um número, como a nota de um aluno.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-3-nota.png",

                        alt: "Planilha do Excel com uma nota sendo inserida em uma célula.",
                    },
                ],

                tip: "Comece com informações simples, como nomes, números, datas ou notas.",

                video: null,
            },

            {
                title: "Crie títulos para as colunas",

                description: "Use a primeira linha para identificar o tipo de informação de cada coluna. Por exemplo: Nome, Turma, Nota e Data.",

                examples: [
                    {
                        title: "Nome",

                        description: "Na primeira linha, escreva o título que identifica os nomes.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-4-nome.png",

                        alt: "Planilha do Excel mostrando o título Nome na primeira linha.",
                    },

                    {
                        title: "Turma",

                        description: "Crie uma coluna específica para identificar a turma.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-4-turma.png",

                        alt: "Planilha do Excel mostrando o título Turma na primeira linha.",
                    },

                    {
                        title: "Nota",

                        description: "Crie uma coluna para organizar as notas.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-4-nota.png",

                        alt: "Planilha do Excel mostrando o título Nota na primeira linha.",
                    },

                    {
                        title: "Data",

                        description: "Crie uma coluna para registrar datas quando necessário.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-4-data.png",

                        alt: "Planilha do Excel mostrando o título Data na primeira linha.",
                    },
                ],

                tip: "Usar títulos ajuda a entender a planilha e facilita a organização das informações.",

                video: null,
            },

            {
                title: "Organize as informações",

                description: "Coloque informações do mesmo tipo na mesma coluna e cada registro em uma nova linha. Por exemplo, cada aluno pode ocupar uma linha com seu nome, turma e nota.",

                examples: [
                    {
                        title: "Um aluno por linha",

                        description: "Cada aluno ocupa uma linha, enquanto as colunas organizam os diferentes tipos de informação.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-5-alunos.png",

                        alt: "Planilha do Excel organizada com nomes, turmas e notas em colunas e alunos em linhas.",
                    },

                    {
                        title: "Uma informação por coluna",

                        description: "Mantenha nomes, turmas e notas em colunas separadas para facilitar a leitura.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-5-colunas.png",

                        alt: "Planilha do Excel mostrando diferentes tipos de informação organizados em colunas.",
                    },
                ],

                tip: "Manter uma informação por coluna deixa a planilha mais organizada e facilita o uso dos dados depois.",

                video: null,
            },

            {
                title: "Aplique uma formatação básica",

                description: "Selecione os títulos ou informações que deseja destacar. Na guia Página Inicial, você pode usar opções como negrito, tamanho da fonte, cor de preenchimento e alinhamento.",

                examples: [
                    {
                        title: "Negrito",

                        description: "Use o botão de negrito para destacar os títulos das colunas.",

                        image: null,

                        alt: "Excel mostrando o título de uma coluna selecionado com a opção de negrito.",

                        video: "/tutoriais/excel/como-comecar-usar-excel/passo-6-N.mp4",
                        poster: "/tutoriais/excel/como-comecar-usar-excel/passo-6-N-poster.png",
                    },

                    {
                        title: "Alinhamento",

                        description: "Use as opções de alinhamento para organizar visualmente o conteúdo das células.",

                        image: null,

                        alt: "Excel mostrando opções de alinhamento aplicadas ao conteúdo da planilha.",

                        video: "/tutoriais/excel/como-comecar-usar-excel/passo-6-A.mp4",
                        poster: "/tutoriais/excel/como-comecar-usar-excel/passo-6-A-poster.png",
                    },
                ],

                tip: "Evite usar muitas cores ou estilos diferentes. Use a formatação apenas para facilitar a leitura.",

                video: null,
            },

            {
                title: "Salve a planilha",

                description: "Quando terminar, clique em Arquivo > Salvar Como. Escolha a pasta onde deseja guardar o arquivo, informe um nome para a planilha e confirme o salvamento.",

                examples: [
                    {
                        title: "Salvar Como",

                        description: "Abra o menu Arquivo e escolha Salvar Como para definir onde o arquivo será guardado.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-7-salvar.webp",

                        alt: "Menu Arquivo do Excel mostrando a opção Salvar Como.",
                    },

                    {
                        title: "Nome do arquivo",

                        description: "Digite um nome fácil de reconhecer, como 'Notas da Turma 2026'.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-7-nome.webp",

                        alt: "Tela de salvamento do Excel com um nome de arquivo preenchido.",
                    },
                ],

                tip: "Escolha um nome que ajude você a identificar o arquivo depois, como 'Notas da Turma 2026' ou 'Lista de Alunos'.",

                video: null,
            },
        ],
    },

    {
        id: "formatar-trabalho-word",
        title: "Como formatar um trabalho no Word",
        category: "word",
        difficulty: "Fácil",
        icon: SignalLow,
        duration: "5 minutos",
        description: "Aprenda a organizar seu trabalho de forma simples.",
        keywords: ["word", "organizar", "trabalho", "Word", "formatação", "trabalho", "fonte", "margens"],
        learning: ["Ajustar fonte e tamanho", "Alinhar o texto", "Configurar espaçamento", "Organizar parágrafos"],
        steps: [
            {
                title: "Abra o Microsoft Word",
                description: "Abra o Word e crie um documento em branco ou abra o trabalho que deseja formatar.",
                image: "/tutoriais/word/formatar-trabalho/passo-1.png",
                imgAlt: "Abra o Microsoft Word e crie um documento em branco ou abra o trabalho que deseja formatar.",
            },
            {
                title: "Selecione o texto",
                description: "Clique no início do texto, segure o botão do mouse e arraste até selecionar a parte desejada.",
            },
            {
                title: "Escolha a fonte e o tamanho",
                description: "Na guia Página Inicial, escolha uma fonte legível, como Arial ou Times New Roman, e use o tamanho solicitado pelo professor.",
            },
            {
                title: "Ajuste o alinhamento e o espaçamento",
                description: "Use o alinhamento solicitado e, em Parágrafo, ajuste o espaçamento entre as linhas.",
            },
            {
                title: "Revise e salve o trabalho",
                description: "Confira se os títulos, parágrafos e margens estão organizados. Depois, salve o arquivo.",
            },
        ],
    },

    {
        id: "sumario-automatico-word",

        title: "Como criar um sumário automático no Word",

        category: "word",

        difficulty: "Intermediário",

        icon: SignalMedium,

        duration: "4 minutos",

        description: "Aprenda a organizar os títulos do documento, criar um sumário automático e atualizá-lo depois das alterações.",

        keywords: ["word", "sumário", "indice", "índice", "títulos", "subtítulos", "estilos", "referências", "sumário automático", "atualizar sumário"],

        learning: ["Organizar títulos e subtítulos", "Aplicar estilos de título no Word", "Inserir um sumário automático", "Atualizar o sumário após alterações"],

        steps: [
            {
                title: "Organize os títulos do trabalho",

                description: "Revise seu documento e identifique os títulos, capítulos e subtítulos que devem aparecer no sumário. Organize a estrutura do conteúdo antes de inserir o sumário.",

                examples: [
                    {
                        title: "Título principal",

                        description: "Identifique os títulos dos capítulos ou partes principais do trabalho, como Introdução, Desenvolvimento e Conclusão.",

                        image: "/tutoriais/word/sumario-automatico-word/passo-1-titulo.webp",

                        alt: "Documento do Word mostrando títulos principais organizados ao longo do trabalho.",
                    },

                    {
                        title: "Subtítulos",

                        description: "Identifique os subtítulos que fazem parte de cada capítulo, como 1.1 Introdução ao tema ou 2.1 Metodologia.",

                        image: "/tutoriais/word/sumario-automatico-word/passo-1-subtitulos.webp",

                        alt: "Documento do Word mostrando títulos e subtítulos organizados em diferentes níveis.",
                    },
                ],

                tip: "Antes de criar o sumário, organize a estrutura do documento. Isso ajuda a manter os títulos nos níveis corretos.",

                video: null,
            },

            {
                title: "Aplique o estilo aos títulos",

                description: "Selecione um título, abra a guia Página Inicial e escolha um estilo como Título 1. Para subtítulos, utilize Título 2 ou outro nível adequado.",

                examples: [
                    {
                        title: "Título 1",

                        description: "Selecione o título de um capítulo e aplique o estilo Título 1 para indicar que ele é um título principal.",

                        image: "/tutoriais/word/sumario-automatico-word/passo-2-titulo-1.webp",

                        alt: "Guia Página Inicial do Word mostrando o estilo Título 1 aplicado a um título.",
                    },

                    {
                        title: "Título 2",

                        description: "Selecione um subtítulo relacionado ao capítulo e aplique o estilo Título 2 para criar um segundo nível na estrutura do documento.",

                        image: "/tutoriais/word/sumario-automatico-word/passo-2-titulo-2.webp",

                        alt: "Documento do Word mostrando um subtítulo com o estilo Título 2 aplicado.",
                    },
                ],

                tip: "Use Título 1 para capítulos principais e Título 2 ou Título 3 para subtítulos, mantendo a hierarquia do documento.",

                video: null,
            },

            {
                title: "Repita o processo nos outros títulos",

                description: "Aplique os estilos correspondentes em todos os capítulos e subtítulos do trabalho. O Word utilizará esses estilos para identificar quais textos devem aparecer no sumário.",

                examples: [
                    {
                        title: "Capítulos",

                        description: "Aplique Título 1 em todos os capítulos principais do documento, mantendo o mesmo nível de hierarquia.",

                        image: "/tutoriais/word/sumario-automatico-word/passo-3-capitulos.webp",

                        alt: "Documento do Word com vários capítulos utilizando o estilo Título 1.",
                    },

                    {
                        title: "Subtítulos",

                        description: "Aplique Título 2 nos subtítulos de cada capítulo para que eles apareçam organizados abaixo dos títulos principais.",

                        image: "/tutoriais/word/sumario-automatico-word/passo-3-subtitulos.webp",

                        alt: "Documento do Word mostrando capítulos e subtítulos com diferentes níveis de título.",
                    },
                ],

                tip: "Não aplique os estilos de forma aleatória. O nível escolhido determina como cada título será organizado no sumário.",

                video: null,
            },

            {
                title: "Insira o sumário automático",

                description: "Clique no local onde o sumário deve aparecer, abra a guia Referências, selecione Sumário e escolha um dos modelos automáticos disponíveis.",

                examples: [
                    {
                        title: "Guia Referências",

                        description: "Coloque o cursor no local desejado, abra a guia Referências e procure a opção Sumário.",

                        image: "/tutoriais/word/sumario-automatico-word/passo-4-referencias.webp",

                        alt: "Guia Referências do Word mostrando a opção Sumário.",
                    },

                    {
                        title: "Modelo automático",

                        description: "Clique em Sumário e escolha um dos modelos automáticos oferecidos pelo Word para inserir a tabela no documento.",

                        image: "/tutoriais/word/sumario-automatico-word/passo-4-modelo.webp",

                        alt: "Menu de Sumário do Word mostrando modelos automáticos disponíveis.",
                    },
                ],

                tip: "Insira o sumário em um local próprio do documento, normalmente depois da capa e dos elementos iniciais do trabalho.",

                video: null,
            },

            {
                title: "Atualize o sumário",

                description: "Depois de editar o trabalho, clique no sumário e escolha Atualizar Sumário. Você poderá atualizar somente os números das páginas ou toda a tabela.",

                examples: [
                    {
                        title: "Atualizar números das páginas",

                        description: "Use essa opção quando os títulos permanecerem iguais, mas as páginas do documento tiverem mudado.",

                        image: "/tutoriais/word/sumario-automatico-word/passo-5-paginas.webp",

                        alt: "Word mostrando a opção de atualizar apenas os números das páginas do sumário.",
                    },

                    {
                        title: "Atualizar toda a tabela",

                        description: "Escolha a atualização completa quando novos títulos forem adicionados, removidos ou modificados no documento.",

                        image: "/tutoriais/word/sumario-automatico-word/passo-5-tabela.webp",

                        alt: "Word mostrando a opção de atualizar toda a tabela do sumário.",
                    },
                ],

                tip: "Sempre atualize o sumário depois de fazer alterações importantes no documento para manter títulos e números de páginas corretos.",

                video: null,
            },
        ],
    },

    {
        id: "imprimir-documento",

        title: "Como imprimir um documento",

        category: "informatica-basica",

        difficulty: "Intermediário",

        icon: SignalMedium,

        duration: "3 minutos",

        description: "Aprenda a escolher a impressora, selecionar as páginas, definir o número de cópias e imprimir um documento com segurança.",

        keywords: ["imprimir", "impressão", "documento", "impressora", "papel", "páginas", "cópias", "configurações de impressão", "visualização de impressão"],

        learning: ["Abrir um documento para impressão", "Abrir a tela de impressão", "Escolher a impressora", "Selecionar as páginas que serão impressas", "Definir o número de cópias", "Conferir as configurações de impressão", "Iniciar a impressão"],

        steps: [
            {
                title: "Abra o documento que deseja imprimir",

                description: "Abra o arquivo no programa em que ele foi criado, como Word, PDF ou outro aplicativo compatível.",

                examples: [
                    {
                        title: "Documento do Word",

                        description: "Abra o documento no Microsoft Word e confira se o conteúdo está pronto para ser impresso.",

                        image: "/tutoriais/informatica-basica/imprimir-documento/passo-1-word.webp",

                        alt: "Documento aberto no Microsoft Word antes de iniciar a impressão.",
                    },

                    {
                        title: "Arquivo PDF",

                        description: "Abra o arquivo PDF em um leitor compatível e confira o conteúdo antes de imprimir.",

                        image: "/tutoriais/informatica-basica/imprimir-documento/passo-1-pdf.webp",

                        alt: "Arquivo PDF aberto em um leitor de documentos antes da impressão.",
                    },
                ],

                tip: "Antes de imprimir, confira se o documento está completo e se não há páginas ou informações que precisam ser corrigidas.",

                video: null,
            },

            {
                title: "Abra a tela de impressão",

                description: "Use o atalho Ctrl + P ou acesse a opção Arquivo > Imprimir para abrir as configurações de impressão.",

                examples: [
                    {
                        title: "Atalho Ctrl + P",

                        description: "Pressione as teclas Ctrl e P ao mesmo tempo para abrir diretamente a tela de impressão.",

                        image: "/tutoriais/informatica-basica/imprimir-documento/passo-2-atalho.webp",

                        alt: "Tela do computador mostrando o uso do atalho Ctrl + P para abrir a impressão.",
                    },

                    {
                        title: "Arquivo > Imprimir",

                        description: "Abra o menu Arquivo e selecione a opção Imprimir para acessar as configurações.",

                        image: "/tutoriais/informatica-basica/imprimir-documento/passo-2-arquivo.webp",

                        alt: "Menu Arquivo mostrando a opção Imprimir.",
                    },
                ],

                tip: "O atalho Ctrl + P costuma ser a maneira mais rápida de abrir a tela de impressão na maioria dos programas.",

                video: null,
            },

            {
                title: "Escolha a impressora",

                description: "Na lista de impressoras disponíveis, selecione a impressora que deseja utilizar. Confira se ela está ligada e conectada ao computador.",

                examples: [
                    {
                        title: "Lista de impressoras",

                        description: "Verifique as opções disponíveis e selecione a impressora que será usada para imprimir o documento.",

                        image: "/tutoriais/informatica-basica/imprimir-documento/passo-3-impressora.webp",

                        alt: "Tela de impressão mostrando uma lista de impressoras disponíveis.",
                    },

                    {
                        title: "Impressora conectada",

                        description: "Confira se a impressora está ligada e se aparece como disponível ou pronta para imprimir.",

                        image: "/tutoriais/informatica-basica/imprimir-documento/passo-3-conectada.webp",

                        alt: "Tela de impressão mostrando uma impressora conectada e disponível.",
                    },
                ],

                tip: "Se a impressora não aparecer na lista, verifique se ela está ligada, conectada ao computador e configurada corretamente.",

                video: null,
            },

            {
                title: "Defina as páginas e as cópias",

                description: "Escolha se deseja imprimir todas as páginas ou somente um intervalo específico. Depois, informe quantas cópias deseja imprimir.",

                examples: [
                    {
                        title: "Todas as páginas",

                        description: "Selecione a opção de imprimir todas as páginas quando quiser imprimir o documento inteiro.",

                        image: "/tutoriais/informatica-basica/imprimir-documento/passo-4-todas-paginas.webp",

                        alt: "Tela de impressão mostrando a opção de imprimir todas as páginas.",
                    },

                    {
                        title: "Intervalo de páginas",

                        description: "Informe um intervalo, como 2-5, para imprimir somente as páginas desejadas.",

                        image: "/tutoriais/informatica-basica/imprimir-documento/passo-4-intervalo.webp",

                        alt: "Tela de impressão mostrando um intervalo específico de páginas.",
                    },

                    {
                        title: "Número de cópias",

                        description: "Informe a quantidade de cópias que deseja imprimir, como 1, 2 ou 3 exemplares.",

                        image: "/tutoriais/informatica-basica/imprimir-documento/passo-4-copias.webp",

                        alt: "Tela de impressão mostrando o campo para definir o número de cópias.",
                    },
                ],

                tip: "Antes de confirmar, confira se selecionou as páginas corretas e se o número de cópias está de acordo com o que você precisa.",

                video: null,
            },

            {
                title: "Confira as configurações",

                description: "Antes de imprimir, confira orientação da página, tamanho do papel e outras opções disponíveis. Use a visualização de impressão quando ela estiver disponível.",

                examples: [
                    {
                        title: "Orientação da página",

                        description: "Escolha entre orientação retrato ou paisagem de acordo com o formato do documento.",

                        image: "/tutoriais/informatica-basica/imprimir-documento/passo-5-orientacao.webp",

                        alt: "Tela de impressão mostrando as opções de orientação retrato e paisagem.",
                    },

                    {
                        title: "Tamanho do papel",

                        description: "Confira se o tamanho do papel está correto, como A4, antes de iniciar a impressão.",

                        image: "/tutoriais/informatica-basica/imprimir-documento/passo-5-papel.webp",

                        alt: "Tela de impressão mostrando a configuração do tamanho do papel A4.",
                    },

                    {
                        title: "Visualização de impressão",

                        description: "Observe a prévia do documento para conferir como as páginas serão impressas.",

                        image: "/tutoriais/informatica-basica/imprimir-documento/passo-5-visualizacao.webp",

                        alt: "Visualização de impressão mostrando como o documento ficará no papel.",
                    },
                ],

                tip: "A visualização de impressão ajuda a identificar problemas de formatação antes de gastar papel e tinta.",

                video: null,
            },

            {
                title: "Clique em Imprimir",

                description: "Depois de conferir todas as opções, clique em Imprimir e aguarde a conclusão do trabalho.",

                examples: [
                    {
                        title: "Botão Imprimir",

                        description: "Clique no botão Imprimir para enviar o documento para a impressora selecionada.",

                        image: "/tutoriais/informatica-basica/imprimir-documento/passo-6-imprimir.webp",

                        alt: "Tela de impressão mostrando o botão Imprimir.",
                    },

                    {
                        title: "Acompanhe a impressão",

                        description: "Depois de iniciar o trabalho, aguarde a impressora concluir a impressão. Evite desligá-la durante o processo.",

                        image: "/tutoriais/informatica-basica/imprimir-documento/passo-6-conclusao.webp",

                        alt: "Impressora realizando a impressão de um documento.",
                    },
                ],

                tip: "Se nada for impresso, verifique se há papel, tinta ou toner e se a impressora não apresenta nenhuma mensagem de erro.",

                video: null,
            },
        ],
    },

    {
        id: "digitalizar-documento",

        title: "Como digitalizar um documento",

        category: "informatica-basica",

        difficulty: "Intermediário",

        icon: SignalMedium,

        duration: "4 minutos",

        description: "Aprenda a posicionar um documento, escolher o scanner, definir o formato e salvar o arquivo digitalizado no computador.",

        keywords: ["digitalizar", "scanner", "documento", "pdf", "escaneamento", "digitalização", "arquivo digital", "impressora multifuncional"],

        learning: ["Preparar e posicionar o documento", "Abrir a ferramenta de digitalização", "Escolher o scanner", "Selecionar o formato do arquivo", "Iniciar a digitalização", "Conferir e salvar o documento digitalizado"],

        steps: [
            {
                title: "Prepare o documento",

                description: "Coloque o documento sobre o vidro do scanner ou no alimentador automático, conforme o modelo da impressora ou scanner. Verifique se a página está alinhada corretamente.",

                examples: [
                    {
                        title: "Vidro do scanner",

                        description: "Coloque a folha sobre o vidro do scanner, normalmente com o conteúdo voltado para baixo, e alinhe o documento conforme as marcações do equipamento.",

                        image: "/tutoriais/informatica-basica/digitalizar-documento/passo-1-vidro.webp",

                        alt: "Documento posicionado sobre o vidro de um scanner para digitalização.",
                    },

                    {
                        title: "Alimentador automático",

                        description: "Quando o equipamento possuir alimentador automático, coloque as folhas na bandeja seguindo a orientação indicada pelo próprio dispositivo.",

                        image: "/tutoriais/informatica-basica/digitalizar-documento/passo-1-alimentador.webp",

                        alt: "Documento colocado no alimentador automático de uma impressora multifuncional.",
                    },
                ],

                tip: "Retire grampos, clipes e outros objetos que possam atrapalhar a digitalização ou danificar o equipamento.",

                video: null,
            },

            {
                title: "Abra o aplicativo de digitalização",

                description: "No computador, abra o aplicativo fornecido pela impressora ou a ferramenta de digitalização disponível no sistema operacional.",

                examples: [
                    {
                        title: "Aplicativo do scanner",

                        description: "Abra o programa de digitalização instalado junto com a impressora ou scanner para acessar as opções do dispositivo.",

                        image: "/tutoriais/informatica-basica/digitalizar-documento/passo-2-aplicativo.webp",

                        alt: "Aplicativo de digitalização aberto no computador.",
                    },

                    {
                        title: "Ferramenta do sistema",

                        description: "Você também pode utilizar uma ferramenta de digitalização disponível no próprio sistema do computador, quando houver.",

                        image: "/tutoriais/informatica-basica/digitalizar-documento/passo-2-sistema.webp",

                        alt: "Ferramenta de digitalização do sistema operacional aberta no computador.",
                    },
                ],

                tip: "Se o scanner não aparecer no aplicativo, verifique se ele está ligado e conectado corretamente ao computador.",

                video: null,
            },

            {
                title: "Selecione o scanner",

                description: "Caso o computador tenha mais de um dispositivo disponível, escolha a impressora ou scanner que será utilizado para digitalizar o documento.",

                examples: [
                    {
                        title: "Lista de dispositivos",

                        description: "Abra a lista de dispositivos disponíveis e localize o scanner ou a impressora multifuncional que deseja utilizar.",

                        image: "/tutoriais/informatica-basica/digitalizar-documento/passo-3-lista.webp",

                        alt: "Lista de scanners e impressoras disponíveis para digitalização.",
                    },

                    {
                        title: "Scanner selecionado",

                        description: "Selecione o dispositivo correto antes de iniciar a digitalização para garantir que o documento seja enviado ao equipamento desejado.",

                        image: "/tutoriais/informatica-basica/digitalizar-documento/passo-3-selecao.webp",

                        alt: "Tela de digitalização mostrando um scanner selecionado.",
                    },
                ],

                tip: "Quando houver vários dispositivos na lista, confira o nome ou modelo da impressora para selecionar o equipamento correto.",

                video: null,
            },

            {
                title: "Escolha o formato do arquivo",

                description: "Selecione o formato desejado para o documento digitalizado. Para documentos com várias páginas ou que serão compartilhados, o formato PDF costuma ser uma opção adequada.",

                examples: [
                    {
                        title: "Formato PDF",

                        description: "Selecione PDF quando quiser criar um arquivo adequado para compartilhar, enviar por e-mail ou guardar documentos com várias páginas.",

                        image: "/tutoriais/informatica-basica/digitalizar-documento/passo-4-pdf.webp",

                        alt: "Tela de digitalização mostrando a opção de salvar o documento no formato PDF.",
                    },

                    {
                        title: "Formato de imagem",

                        description: "Escolha um formato de imagem, como JPG, quando o objetivo for digitalizar uma página como imagem.",

                        image: "/tutoriais/informatica-basica/digitalizar-documento/passo-4-imagem.webp",

                        alt: "Tela de digitalização mostrando opções de formatos de imagem.",
                    },
                ],

                tip: "Para documentos de texto, formulários e conjuntos de páginas, o PDF geralmente facilita o compartilhamento e a organização.",

                video: null,
            },

            {
                title: "Inicie a digitalização",

                description: "Clique em Digitalizar ou em uma opção equivalente e aguarde o dispositivo concluir a leitura do documento.",

                examples: [
                    {
                        title: "Botão Digitalizar",

                        description: "Clique no botão Digitalizar para iniciar a leitura da página colocada no scanner.",

                        image: "/tutoriais/informatica-basica/digitalizar-documento/passo-5-digitalizar.webp",

                        alt: "Aplicativo de digitalização mostrando o botão Digitalizar.",
                    },

                    {
                        title: "Processo de leitura",

                        description: "Aguarde enquanto o scanner movimenta o mecanismo e realiza a leitura do documento.",

                        image: "/tutoriais/informatica-basica/digitalizar-documento/passo-5-processo.webp",

                        alt: "Scanner realizando a leitura de um documento durante o processo de digitalização.",
                    },
                ],

                tip: "Não retire o documento do scanner enquanto a digitalização estiver em andamento.",

                video: null,
            },

            {
                title: "Confira e salve o arquivo",

                description: "Visualize o resultado para verificar se a página ficou completa e legível. Depois, escolha uma pasta e salve o arquivo com um nome fácil de identificar.",

                examples: [
                    {
                        title: "Confira a digitalização",

                        description: "Observe a prévia ou o arquivo gerado e verifique se todo o conteúdo da página está visível, sem cortes ou áreas ilegíveis.",

                        image: "/tutoriais/informatica-basica/digitalizar-documento/passo-6-conferir.webp",

                        alt: "Pré-visualização de um documento digitalizado no computador.",
                    },

                    {
                        title: "Nome do arquivo",

                        description: "Escolha uma pasta e informe um nome fácil de reconhecer, como 'Documento_Identidade.pdf' ou 'Contrato_2026.pdf'.",

                        image: "/tutoriais/informatica-basica/digitalizar-documento/passo-6-salvar.webp",

                        alt: "Tela de salvamento mostrando um arquivo digitalizado com nome definido.",
                    },
                ],

                tip: "Use nomes descritivos e mantenha os documentos digitalizados em pastas organizadas para encontrá-los com facilidade depois.",

                video: null,
            },
        ],
    },

    {
        id: "compartilhar-arquivo",

        title: "Como compartilhar um arquivo",

        category: "google-drive",

        difficulty: "Fácil",

        icon: SignalLow,

        duration: "3 minutos",

        description: "Aprenda a localizar um arquivo no Google Drive, escolher quem pode acessá-lo, definir permissões e compartilhar o acesso com segurança.",

        keywords: ["compartilhar", "arquivo", "link", "drive", "google drive", "permissão", "visualizar", "comentar", "editar", "acesso"],

        learning: ["Localizar um arquivo no Google Drive", "Abrir as opções de compartilhamento", "Escolher quem poderá acessar o arquivo", "Definir as permissões de acesso", "Copiar o link do arquivo", "Enviar o acesso para outras pessoas"],

        steps: [
            {
                title: "Abra o Google Drive",

                description: "Acesse o Google Drive e faça login na conta que possui o arquivo que deseja compartilhar.",

                examples: [
                    {
                        title: "Acesso ao Google Drive",

                        description: "Abra o Google Drive no navegador e entre na conta Google que contém o arquivo que será compartilhado.",

                        image: "/tutoriais/google-drive/compartilhar-arquivo/passo-1-acesso.webp",

                        alt: "Tela inicial do Google Drive aberta no navegador.",
                    },

                    {
                        title: "Conta conectada",

                        description: "Confira se você está conectado à conta Google correta antes de procurar o arquivo.",

                        image: "/tutoriais/google-drive/compartilhar-arquivo/passo-1-conta.webp",

                        alt: "Google Drive mostrando uma conta Google conectada.",
                    },
                ],

                tip: "Confira a conta conectada antes de começar. O arquivo precisa estar armazenado nessa conta ou em um local ao qual você tenha acesso.",

                video: null,
            },

            {
                title: "Localize o arquivo",

                description: "Procure o documento ou arquivo desejado entre suas pastas. Você também pode utilizar a barra de pesquisa do Google Drive.",

                examples: [
                    {
                        title: "Pelas pastas",

                        description: "Navegue pelas pastas do Google Drive até encontrar o arquivo que deseja compartilhar.",

                        image: "/tutoriais/google-drive/compartilhar-arquivo/passo-2-pastas.webp",

                        alt: "Google Drive mostrando pastas e arquivos armazenados.",
                    },

                    {
                        title: "Barra de pesquisa",

                        description: "Digite o nome do arquivo ou uma palavra relacionada na barra de pesquisa para encontrá-lo mais rapidamente.",

                        image: "/tutoriais/google-drive/compartilhar-arquivo/passo-2-pesquisa.webp",

                        alt: "Barra de pesquisa do Google Drive sendo usada para localizar um arquivo.",
                    },
                ],

                tip: "Quando você não souber em qual pasta o arquivo está, use a barra de pesquisa do Google Drive para encontrá-lo mais rapidamente.",

                video: null,
            },

            {
                title: "Abra as opções de compartilhamento",

                description: "Clique com o botão direito sobre o arquivo e selecione Compartilhar para abrir as configurações de acesso.",

                examples: [
                    {
                        title: "Menu do arquivo",

                        description: "Clique com o botão direito sobre o arquivo para abrir o menu com as opções disponíveis.",

                        image: "/tutoriais/google-drive/compartilhar-arquivo/passo-3-menu.webp",

                        alt: "Menu de contexto do Google Drive aberto sobre um arquivo.",
                    },

                    {
                        title: "Opção Compartilhar",

                        description: "No menu exibido, selecione Compartilhar para abrir a janela de permissões e acesso.",

                        image: "/tutoriais/google-drive/compartilhar-arquivo/passo-3-compartilhar.webp",

                        alt: "Menu do Google Drive mostrando a opção Compartilhar.",
                    },
                ],

                tip: "Você também pode abrir as opções do arquivo e procurar o botão ou ícone de compartilhamento, dependendo da versão do Google Drive.",

                video: null,
            },

            {
                title: "Escolha quem terá acesso",

                description: "Informe o e-mail das pessoas que devem receber acesso ou altere a opção de acesso geral para permitir que outras pessoas utilizem o link.",

                examples: [
                    {
                        title: "Compartilhar com pessoas específicas",

                        description: "Digite o endereço de e-mail das pessoas que devem receber acesso ao arquivo.",

                        image: "/tutoriais/google-drive/compartilhar-arquivo/passo-4-pessoas.webp",

                        alt: "Janela de compartilhamento do Google Drive com um endereço de e-mail sendo informado.",
                    },

                    {
                        title: "Acesso geral",

                        description: "Verifique a configuração de acesso geral quando quiser compartilhar o arquivo por meio de um link.",

                        image: "/tutoriais/google-drive/compartilhar-arquivo/passo-4-acesso-geral.webp",

                        alt: "Janela de compartilhamento do Google Drive mostrando as configurações de acesso geral.",
                    },
                ],

                tip: "Para arquivos que contêm informações pessoais ou importantes, prefira compartilhar somente com pessoas específicas.",

                video: null,
            },

            {
                title: "Defina a permissão",

                description: "Escolha se a pessoa poderá apenas visualizar, comentar ou editar o arquivo. Dê somente a permissão necessária para a atividade.",

                examples: [
                    {
                        title: "Visualizador",

                        description: "Use a permissão de visualização quando a pessoa precisar apenas abrir e consultar o conteúdo do arquivo.",

                        image: "/tutoriais/google-drive/compartilhar-arquivo/passo-5-visualizador.webp",

                        alt: "Configuração de compartilhamento do Google Drive mostrando a permissão de visualizador.",
                    },

                    {
                        title: "Comentarista",

                        description: "Escolha a opção de comentar quando a pessoa precisar fazer comentários ou sugestões sem alterar diretamente o conteúdo.",

                        image: "/tutoriais/google-drive/compartilhar-arquivo/passo-5-comentarista.webp",

                        alt: "Configuração de compartilhamento do Google Drive mostrando a permissão de comentarista.",
                    },

                    {
                        title: "Editor",

                        description: "Selecione a permissão de edição quando a pessoa precisar modificar o conteúdo do arquivo.",

                        image: "/tutoriais/google-drive/compartilhar-arquivo/passo-5-editor.webp",

                        alt: "Configuração de compartilhamento do Google Drive mostrando a permissão de editor.",
                    },
                ],

                tip: "Escolha sempre a menor permissão necessária. Se a pessoa só precisa ler o documento, não é necessário permitir edição.",

                video: null,
            },

            {
                title: "Copie ou envie o acesso",

                description: "Clique em Copiar link para enviar o endereço por outro meio ou use a opção de envio disponível na própria janela de compartilhamento.",

                examples: [
                    {
                        title: "Copiar link",

                        description: "Clique em Copiar link para copiar o endereço do arquivo e depois cole-o em uma mensagem, e-mail ou outro aplicativo.",

                        image: "/tutoriais/google-drive/compartilhar-arquivo/passo-6-copiar-link.webp",

                        alt: "Janela de compartilhamento do Google Drive mostrando o botão Copiar link.",
                    },

                    {
                        title: "Enviar acesso",

                        description: "Quando disponível, use a opção de envio da própria janela para compartilhar o arquivo diretamente com as pessoas selecionadas.",

                        image: "/tutoriais/google-drive/compartilhar-arquivo/passo-6-enviar.webp",

                        alt: "Janela de compartilhamento do Google Drive mostrando a opção de enviar o acesso.",
                    },
                ],

                tip: "Antes de enviar o link, confira novamente quem tem acesso e qual permissão foi definida para evitar compartilhar o arquivo com pessoas erradas.",

                video: null,
            },
        ],
    },

    {
        id: "converter-documento-pdf",

        title: "Como converter um documento para PDF",

        category: "arquivos-pdf",

        difficulty: "Fácil",

        icon: SignalLow,

        duration: "3 minutos",

        description: "Aprenda a salvar ou exportar um documento em PDF, escolher onde guardar o arquivo e conferir o resultado antes de compartilhar ou imprimir.",

        keywords: ["pdf", "converter", "documento", "salvar", "exportar", "formato pdf", "baixar", "arquivo digital"],

        learning: ["Abrir um documento para conversão", "Acessar as opções de salvar ou exportar", "Selecionar o formato PDF", "Escolher o local para salvar o arquivo", "Confirmar a conversão", "Conferir o PDF criado"],

        steps: [
            {
                title: "Abra o documento",

                description: "Abra o documento no programa utilizado para criar ou editar o arquivo, como Microsoft Word, LibreOffice ou outro editor compatível.",

                examples: [
                    {
                        title: "Microsoft Word",

                        description: "Abra o documento no Microsoft Word e confira se o conteúdo está pronto para ser convertido em PDF.",

                        image: "/tutoriais/arquivos-pdf/converter-documento-pdf/passo-1-word.webp",

                        alt: "Documento aberto no Microsoft Word antes de ser convertido para PDF.",
                    },

                    {
                        title: "LibreOffice",

                        description: "Abra o arquivo no LibreOffice e confira o conteúdo antes de iniciar a exportação para PDF.",

                        image: "/tutoriais/arquivos-pdf/converter-documento-pdf/passo-1-libreoffice.webp",

                        alt: "Documento aberto no LibreOffice antes de ser convertido para PDF.",
                    },
                ],

                tip: "Antes de converter, confira se o documento está completo e se não há alterações pendentes.",

                video: null,
            },

            {
                title: "Abra a opção de salvar ou exportar",

                description: "Acesse o menu Arquivo e procure uma opção como Salvar Como, Exportar ou Baixar, dependendo do programa utilizado.",

                examples: [
                    {
                        title: "Salvar Como",

                        description: "Abra o menu Arquivo e selecione Salvar Como quando o programa permitir escolher um novo formato para o documento.",

                        image: "/tutoriais/arquivos-pdf/converter-documento-pdf/passo-2-salvar-como.webp",

                        alt: "Menu Arquivo mostrando a opção Salvar Como.",
                    },

                    {
                        title: "Exportar",

                        description: "Em alguns programas, utilize a opção Exportar para escolher o formato PDF diretamente.",

                        image: "/tutoriais/arquivos-pdf/converter-documento-pdf/passo-2-exportar.webp",

                        alt: "Menu do programa mostrando a opção de exportar o documento.",
                    },

                    {
                        title: "Baixar",

                        description: "Em editores ou serviços online, procure a opção Baixar para escolher o formato em que o arquivo será salvo.",

                        image: "/tutoriais/arquivos-pdf/converter-documento-pdf/passo-2-baixar.webp",

                        alt: "Tela de um editor online mostrando a opção de baixar o documento.",
                    },
                ],

                tip: "O nome da opção pode mudar de acordo com o programa. Procure sempre por comandos relacionados a salvar, exportar ou baixar o arquivo.",

                video: null,
            },

            {
                title: "Selecione PDF como formato",

                description: "Na lista de formatos disponíveis, escolha PDF. Alguns programas também apresentam a opção Exportar como PDF.",

                examples: [
                    {
                        title: "Formato PDF",

                        description: "Abra a lista de formatos e selecione PDF como o tipo de arquivo que será criado.",

                        image: "/tutoriais/arquivos-pdf/converter-documento-pdf/passo-3-formato-pdf.webp",

                        alt: "Janela de salvamento mostrando PDF selecionado como formato do arquivo.",
                    },

                    {
                        title: "Exportar como PDF",

                        description: "Quando houver uma opção específica para exportação, selecione Exportar como PDF para gerar o arquivo diretamente.",

                        image: "/tutoriais/arquivos-pdf/converter-documento-pdf/passo-3-exportar-pdf.webp",

                        alt: "Programa mostrando a opção Exportar como PDF.",
                    },
                ],

                tip: "O PDF é útil quando você quer preservar a aparência do documento para compartilhar ou imprimir em outros computadores.",

                video: null,
            },

            {
                title: "Escolha onde salvar",

                description: "Selecione a pasta onde deseja guardar o arquivo e escolha um nome que permita identificar facilmente o documento.",

                examples: [
                    {
                        title: "Escolha a pasta",

                        description: "Navegue pelas pastas do computador e selecione o local onde o arquivo PDF deverá ser armazenado.",

                        image: "/tutoriais/arquivos-pdf/converter-documento-pdf/passo-4-pasta.webp",

                        alt: "Janela de salvamento mostrando a escolha da pasta para guardar o arquivo PDF.",
                    },

                    {
                        title: "Nome do arquivo",

                        description: "Digite um nome fácil de reconhecer, como 'Trabalho_Final.pdf' ou 'Curriculo_2026.pdf'.",

                        image: "/tutoriais/arquivos-pdf/converter-documento-pdf/passo-4-nome.webp",

                        alt: "Janela de salvamento mostrando o nome de um arquivo PDF.",
                    },
                ],

                tip: "Escolha um nome descritivo para facilitar a localização do arquivo depois, especialmente quando você tiver muitos documentos.",

                video: null,
            },

            {
                title: "Confirme a conversão",

                description: "Confirme o salvamento ou a exportação e aguarde o programa criar o arquivo PDF.",

                examples: [
                    {
                        title: "Confirmar salvamento",

                        description: "Depois de escolher o formato, local e nome do arquivo, confirme a operação para iniciar a criação do PDF.",

                        image: "/tutoriais/arquivos-pdf/converter-documento-pdf/passo-5-confirmar.webp",

                        alt: "Janela de salvamento mostrando a confirmação para criar o arquivo PDF.",
                    },

                    {
                        title: "Arquivo sendo criado",

                        description: "Aguarde alguns instantes enquanto o programa salva ou exporta o documento no formato PDF.",

                        image: "/tutoriais/arquivos-pdf/converter-documento-pdf/passo-5-processando.webp",

                        alt: "Programa concluindo a exportação de um documento para PDF.",
                    },
                ],

                tip: "Documentos maiores ou com muitas imagens podem levar alguns instantes para serem exportados.",

                video: null,
            },

            {
                title: "Abra o PDF para conferir",

                description: "Abra o arquivo recém-criado e confira se textos, imagens e páginas foram mantidos corretamente antes de enviá-lo ou imprimi-lo.",

                examples: [
                    {
                        title: "Confira o texto",

                        description: "Abra o PDF e verifique se os textos aparecem corretamente, sem cortes, espaços inesperados ou alterações de formatação.",

                        image: "/tutoriais/arquivos-pdf/converter-documento-pdf/passo-6-texto.webp",

                        alt: "Arquivo PDF aberto mostrando o texto do documento convertido.",
                    },

                    {
                        title: "Confira as imagens",

                        description: "Verifique se as imagens, tabelas e outros elementos visuais foram mantidos corretamente no arquivo PDF.",

                        image: "/tutoriais/arquivos-pdf/converter-documento-pdf/passo-6-imagens.webp",

                        alt: "Arquivo PDF aberto mostrando imagens e elementos visuais preservados.",
                    },

                    {
                        title: "Confira as páginas",

                        description: "Passe pelas páginas do documento para verificar se nenhuma página foi cortada, duplicada ou ficou fora da ordem.",

                        image: "/tutoriais/arquivos-pdf/converter-documento-pdf/passo-6-paginas.webp",

                        alt: "Documento PDF sendo revisado página por página após a conversão.",
                    },
                ],

                tip: "Sempre abra o PDF antes de compartilhar ou imprimir para confirmar que o resultado ficou como esperado.",

                video: null,
            },
        ],
    },

    {
        id: "anexar-arquivo-email",

        title: "Como anexar um arquivo no e-mail",

        category: "email",

        difficulty: "Fácil",

        icon: SignalLow,

        duration: "3 minutos",

        description: "Aprenda a criar uma mensagem, adicionar documentos ou imagens como anexo, conferir o arquivo e enviar o e-mail.",

        keywords: ["email", "e-mail", "anexo", "arquivo", "gmail", "enviar", "anexar", "documento", "imagem", "mensagem"],

        learning: ["Abrir o serviço de e-mail", "Criar uma nova mensagem", "Preencher destinatário e assunto", "Adicionar um arquivo como anexo", "Conferir o arquivo anexado", "Enviar a mensagem"],

        steps: [
            {
                title: "Abra seu e-mail",

                description: "Acesse o serviço de e-mail que utiliza, como Gmail ou outro serviço de correio eletrônico, e faça login na sua conta.",

                examples: [
                    {
                        title: "Acesso ao Gmail",

                        description: "Abra o Gmail no navegador e entre na conta de e-mail que será utilizada para enviar a mensagem.",

                        image: "/tutoriais/email/anexar-arquivo-email/passo-1-gmail.webp",

                        alt: "Tela inicial do Gmail aberta no navegador.",
                    },

                    {
                        title: "Conta conectada",

                        description: "Confira se você está conectado à conta de e-mail correta antes de criar a mensagem.",

                        image: "/tutoriais/email/anexar-arquivo-email/passo-1-conta.webp",

                        alt: "Serviço de e-mail mostrando uma conta conectada.",
                    },
                ],

                tip: "Confira a conta conectada antes de enviar a mensagem, especialmente quando você possui mais de um endereço de e-mail.",

                video: null,
            },

            {
                title: "Crie uma nova mensagem",

                description: "Clique em Escrever, Nova mensagem ou em uma opção equivalente para abrir uma nova mensagem.",

                examples: [
                    {
                        title: "Botão Escrever",

                        description: "No Gmail, clique em Escrever para abrir uma nova janela de mensagem.",

                        image: "/tutoriais/email/anexar-arquivo-email/passo-2-escrever.webp",

                        alt: "Gmail mostrando o botão Escrever para criar uma nova mensagem.",
                    },

                    {
                        title: "Nova mensagem",

                        description: "Uma janela será aberta para que você possa preencher os dados da mensagem e adicionar o arquivo.",

                        image: "/tutoriais/email/anexar-arquivo-email/passo-2-mensagem.webp",

                        alt: "Janela de nova mensagem aberta no serviço de e-mail.",
                    },
                ],

                tip: "Antes de anexar o arquivo, é uma boa ideia criar a mensagem e preencher os dados principais do envio.",

                video: null,
            },

            {
                title: "Preencha o destinatário e o assunto",

                description: "Informe o endereço de e-mail da pessoa que receberá a mensagem e escreva um assunto que identifique o conteúdo do envio.",

                examples: [
                    {
                        title: "Destinatário",

                        description: "No campo Para, digite o endereço de e-mail da pessoa que deverá receber a mensagem.",

                        image: "/tutoriais/email/anexar-arquivo-email/passo-3-destinatario.webp",

                        alt: "Nova mensagem mostrando um endereço de e-mail preenchido no campo Para.",
                    },

                    {
                        title: "Assunto",

                        description: "No campo Assunto, escreva uma frase curta que ajude o destinatário a entender o motivo da mensagem.",

                        image: "/tutoriais/email/anexar-arquivo-email/passo-3-assunto.webp",

                        alt: "Nova mensagem mostrando um assunto preenchido.",
                    },
                ],

                tip: "Confira se o endereço do destinatário está correto e use um assunto claro, como 'Documentos solicitados' ou 'Fotos do evento'.",

                video: null,
            },

            {
                title: "Clique no ícone de anexo",

                description: "Na parte inferior da mensagem, procure o ícone de clipe de papel e clique nele para selecionar um arquivo do computador ou dispositivo.",

                examples: [
                    {
                        title: "Ícone de clipe",

                        description: "Localize o ícone de clipe de papel na barra de ferramentas da mensagem e clique nele para abrir a seleção de arquivos.",

                        image: "/tutoriais/email/anexar-arquivo-email/passo-4-clipe.webp",

                        alt: "Janela de nova mensagem mostrando o ícone de clipe de papel para anexar arquivos.",
                    },

                    {
                        title: "Selecionar arquivo",

                        description: "Depois de clicar no clipe, uma janela do computador ou dispositivo será aberta para que você possa localizar o arquivo.",

                        image: "/tutoriais/email/anexar-arquivo-email/passo-4-selecionar.webp",

                        alt: "Janela de seleção de arquivos aberta para adicionar um anexo ao e-mail.",
                    },
                ],

                tip: "O ícone de clipe de papel é normalmente utilizado para indicar a opção de anexar arquivos.",

                video: null,
            },

            {
                title: "Escolha o arquivo",

                description: "Navegue até a pasta onde o arquivo está salvo, selecione-o e confirme. Aguarde até que o anexo termine de carregar.",

                examples: [
                    {
                        title: "Localizar o arquivo",

                        description: "Navegue pelas pastas do computador até encontrar o documento, imagem ou outro arquivo que deseja enviar.",

                        image: "/tutoriais/email/anexar-arquivo-email/passo-5-localizar.webp",

                        alt: "Janela de seleção mostrando pastas e arquivos disponíveis para anexar.",
                    },

                    {
                        title: "Arquivo selecionado",

                        description: "Selecione o arquivo desejado e confirme a escolha para começar o carregamento do anexo.",

                        image: "/tutoriais/email/anexar-arquivo-email/passo-5-selecionado.webp",

                        alt: "Arquivo selecionado em uma janela do computador para ser anexado ao e-mail.",
                    },

                    {
                        title: "Anexo carregado",

                        description: "Aguarde até que o carregamento termine e confira se o nome do arquivo aparece na mensagem.",

                        image: "/tutoriais/email/anexar-arquivo-email/passo-5-carregado.webp",

                        alt: "Mensagem de e-mail mostrando um arquivo anexado após o carregamento.",
                    },
                ],

                tip: "Não feche a janela ou envie a mensagem enquanto o arquivo ainda estiver carregando.",

                video: null,
            },

            {
                title: "Confira e envie",

                description: "Verifique o destinatário, assunto, mensagem e nome do arquivo anexado. Depois, clique em Enviar.",

                examples: [
                    {
                        title: "Confira os dados",

                        description: "Revise o endereço do destinatário, o assunto, o texto da mensagem e o nome do arquivo anexado antes de enviar.",

                        image: "/tutoriais/email/anexar-arquivo-email/passo-6-conferir.webp",

                        alt: "Mensagem de e-mail preenchida com destinatário, assunto, texto e arquivo anexado.",
                    },

                    {
                        title: "Botão Enviar",

                        description: "Depois de conferir todas as informações, clique no botão Enviar para encaminhar a mensagem.",

                        image: "/tutoriais/email/anexar-arquivo-email/passo-6-enviar.webp",

                        alt: "Janela de nova mensagem mostrando o botão Enviar.",
                    },
                ],

                tip: "Antes de clicar em Enviar, confira principalmente o destinatário e o arquivo anexado para evitar enviar informações para a pessoa errada.",

                video: null,
            },
        ],
    },

    {
        id: "salvar-google-drive",

        title: "Como salvar um arquivo no Google Drive",

        category: "google-drive",

        difficulty: "Fácil",

        icon: SignalLow,

        duration: "4 minutos",

        description: "Aprenda a enviar um arquivo para o Google Drive, escolher a pasta de destino, acompanhar o upload e localizar o arquivo depois.",

        keywords: ["google drive", "drive", "salvar", "arquivo", "nuvem", "upload", "enviar arquivo", "pasta", "armazenamento"],

        learning: ["Abrir o Google Drive", "Escolher a pasta de destino", "Iniciar o envio de um arquivo", "Selecionar um arquivo no computador", "Acompanhar o upload", "Localizar o arquivo depois no Google Drive"],

        steps: [
            {
                title: "Abra o Google Drive",

                description: "Acesse o Google Drive pelo navegador e faça login na conta Google que deseja utilizar para armazenar o arquivo.",

                examples: [
                    {
                        title: "Acesso ao Google Drive",

                        description: "Abra o Google Drive no navegador e entre na conta Google onde deseja guardar o arquivo.",

                        image: "/tutoriais/google-drive/salvar-google-drive/passo-1-acesso.webp",

                        alt: "Tela inicial do Google Drive aberta no navegador.",
                    },

                    {
                        title: "Conta conectada",

                        description: "Confira se você está conectado à conta Google correta antes de enviar o arquivo.",

                        image: "/tutoriais/google-drive/salvar-google-drive/passo-1-conta.webp",

                        alt: "Google Drive mostrando uma conta Google conectada.",
                    },
                ],

                tip: "Confirme a conta antes de fazer o upload para evitar salvar o arquivo em outro Google Drive.",

                video: null,
            },

            {
                title: "Escolha a pasta de destino",

                description: "Abra a pasta onde deseja guardar o arquivo. Organizar os documentos em pastas facilita encontrá-los posteriormente.",

                examples: [
                    {
                        title: "Pasta existente",

                        description: "Navegue pelas pastas do Google Drive e abra a pasta onde o arquivo deverá ser armazenado.",

                        image: "/tutoriais/google-drive/salvar-google-drive/passo-2-pasta.webp",

                        alt: "Google Drive mostrando pastas disponíveis para armazenar um arquivo.",
                    },

                    {
                        title: "Organização por pastas",

                        description: "Escolha uma pasta relacionada ao conteúdo, como Documentos, Fotos, Trabalhos ou Arquivos pessoais.",

                        image: "/tutoriais/google-drive/salvar-google-drive/passo-2-organizar.webp",

                        alt: "Google Drive mostrando arquivos organizados dentro de uma pasta.",
                    },
                ],

                tip: "Criar pastas por assunto, projeto ou tipo de documento ajuda a encontrar os arquivos mais rapidamente depois.",

                video: null,
            },

            {
                title: "Clique em Novo",

                description: "No Google Drive, clique no botão Novo e escolha a opção Upload de arquivo para iniciar o envio.",

                examples: [
                    {
                        title: "Botão Novo",

                        description: "No lado esquerdo do Google Drive, clique no botão Novo para abrir o menu de opções.",

                        image: "/tutoriais/google-drive/salvar-google-drive/passo-3-novo.webp",

                        alt: "Google Drive mostrando o botão Novo no menu lateral.",
                    },

                    {
                        title: "Upload de arquivo",

                        description: "No menu que será exibido, selecione Upload de arquivo para escolher um arquivo armazenado no computador.",

                        image: "/tutoriais/google-drive/salvar-google-drive/passo-3-upload.webp",

                        alt: "Menu Novo do Google Drive mostrando a opção Upload de arquivo.",
                    },
                ],

                tip: "Use Upload de arquivo quando quiser enviar um arquivo que já está salvo no computador ou dispositivo.",

                video: null,
            },

            {
                title: "Selecione o arquivo no computador",

                description: "Localize o documento que deseja guardar, selecione-o e confirme o envio. O Drive começará a fazer o upload automaticamente.",

                examples: [
                    {
                        title: "Localizar o arquivo",

                        description: "Navegue pelas pastas do computador até encontrar o documento, imagem ou outro arquivo que deseja enviar.",

                        image: "/tutoriais/google-drive/salvar-google-drive/passo-4-localizar.webp",

                        alt: "Janela de seleção mostrando arquivos disponíveis para upload no Google Drive.",
                    },

                    {
                        title: "Arquivo selecionado",

                        description: "Clique no arquivo desejado e confirme a seleção para iniciar o envio para o Google Drive.",

                        image: "/tutoriais/google-drive/salvar-google-drive/passo-4-selecionar.webp",

                        alt: "Arquivo selecionado em uma janela do computador para ser enviado ao Google Drive.",
                    },
                ],

                tip: "Confira o nome do arquivo antes de confirmar para garantir que você está enviando o documento correto.",

                video: null,
            },

            {
                title: "Aguarde o envio terminar",

                description: "Espere até que o carregamento seja concluído. Não feche a página enquanto o arquivo ainda estiver sendo enviado.",

                examples: [
                    {
                        title: "Progresso do upload",

                        description: "Observe o indicador de carregamento para acompanhar o progresso do envio do arquivo.",

                        image: "/tutoriais/google-drive/salvar-google-drive/passo-5-progresso.webp",

                        alt: "Google Drive mostrando o progresso do upload de um arquivo.",
                    },

                    {
                        title: "Upload concluído",

                        description: "Aguarde até que o Drive informe que o arquivo foi enviado ou até que ele apareça dentro da pasta escolhida.",

                        image: "/tutoriais/google-drive/salvar-google-drive/passo-5-concluido.webp",

                        alt: "Google Drive mostrando um arquivo após a conclusão do upload.",
                    },
                ],

                tip: "Arquivos maiores podem levar mais tempo para serem enviados. Aguarde a conclusão antes de fechar a página ou desligar o computador.",

                video: null,
            },

            {
                title: "Confira o arquivo no Drive",

                description: "Depois do upload, confirme se o arquivo aparece dentro da pasta escolhida. Agora ele poderá ser acessado novamente pela sua conta.",

                examples: [
                    {
                        title: "Arquivo na pasta",

                        description: "Verifique se o arquivo aparece na pasta de destino e confira se o nome está correto.",

                        image: "/tutoriais/google-drive/salvar-google-drive/passo-6-arquivo.webp",

                        alt: "Google Drive mostrando o arquivo armazenado dentro da pasta escolhida.",
                    },

                    {
                        title: "Abrir o arquivo",

                        description: "Clique duas vezes no arquivo para confirmar que ele está disponível e pode ser aberto normalmente.",

                        image: "/tutoriais/google-drive/salvar-google-drive/passo-6-abrir.webp",

                        alt: "Arquivo armazenado no Google Drive sendo aberto para conferência.",
                    },

                    {
                        title: "Pesquisar depois",

                        description: "Quando precisar encontrar o arquivo novamente, use as pastas do Drive ou a barra de pesquisa para localizá-lo.",

                        image: "/tutoriais/google-drive/salvar-google-drive/passo-6-pesquisa.webp",

                        alt: "Barra de pesquisa do Google Drive sendo usada para localizar um arquivo armazenado.",
                    },
                ],

                tip: "Depois de salvar o arquivo no Drive, você poderá acessá-lo novamente pela sua conta em dispositivos conectados à internet.",

                video: null,
            },
        ],
    },

    {
        id: "apresentacao-canva",

        title: "Como criar uma apresentação no Canva",

        category: "canva",

        difficulty: "Intermediário",

        icon: SignalMedium,

        duration: "7 minutos",

        description: "Aprenda a criar uma apresentação no Canva, escolher um modelo, editar conteúdos, adicionar páginas, inserir elementos e apresentar ou baixar o arquivo.",

        keywords: ["canva", "apresentação", "slides", "design", "apresentar", "modelo", "páginas", "imagens", "elementos", "baixar"],

        learning: ["Acessar o Canva e criar uma apresentação", "Escolher um modelo de apresentação", "Editar títulos e textos", "Adicionar e remover páginas", "Inserir imagens e elementos", "Revisar os slides", "Apresentar ou baixar a apresentação"],

        steps: [
            {
                title: "Acesse o Canva",

                description: "Entre no Canva pelo navegador e faça login na sua conta. Na página inicial, procure pela opção de criar uma apresentação.",

                examples: [
                    {
                        title: "Página inicial",

                        description: "Acesse o Canva pelo navegador e faça login na conta que será utilizada para criar a apresentação.",

                        image: "/tutoriais/canva/apresentacao-canva/passo-1-inicio.png",

                        alt: "Página inicial do Canva aberta no navegador.",
                    },

                    {
                        title: "Criar apresentação",

                        description: "Na página inicial, procure por Apresentação ou utilize a busca para encontrar o formato de apresentação.",

                        image: "/tutoriais/canva/apresentacao-canva/passo-1-apresentacao.png",

                        alt: "Canva mostrando a opção de criar uma apresentação.",
                    },
                ],

                tip: "Verifique se você está conectado à conta correta antes de começar para garantir que a apresentação fique salva no seu espaço do Canva.",

                video: null,
            },

            {
                title: "Escolha um modelo",

                description: "Pesquise por Apresentação e selecione um modelo que combine com o tema do trabalho. Também é possível começar com uma apresentação em branco.",

                examples: [
                    {
                        title: "Pesquisar apresentação",

                        description: "Use a busca do Canva para procurar modelos de apresentação relacionados ao tipo de trabalho que você deseja criar.",

                        image: null,

                        alt: "Canva mostrando modelos de apresentação disponíveis para escolha.",

                        video: "/tutoriais/canva/apresentacao-canva/passo-2-pesquisa.mp4",
                        poster: "/tutoriais/canva/apresentacao-canva/passo-2-pesquisa-poster.png",
                    },

                    {
                        title: "Escolher um modelo",

                        description: "Observe os modelos disponíveis e selecione um design que combine com o tema e o objetivo da apresentação.",

                        image: null,

                        alt: "Galeria de modelos de apresentação do Canva com um modelo selecionado.",

                        video: "/tutoriais/canva/apresentacao-canva/passo-2-modelo.mp4",
                        poster: "/tutoriais/canva/apresentacao-canva/passo-2-modelo-poster.png",
                    },

                    {
                        title: "Apresentação em branco",

                        description: "Quando quiser criar o design do zero, escolha uma apresentação em branco e adicione os elementos manualmente.",

                        image: null,

                        alt: "Canva mostrando a opção de iniciar uma apresentação em branco.",

                        video: "/tutoriais/canva/apresentacao-canva/passo-2-branco.mp4",
                        poster: "/tutoriais/canva/apresentacao-canva/passo-2-branco-poster.png",
                    },
                ],

                tip: "Escolha um modelo simples e com boa leitura. O design deve ajudar a apresentar o conteúdo, sem deixar os slides visualmente carregados.",

                video: null,
            },

            {
                title: "Edite o título e os textos",

                description: "Clique sobre os textos do modelo e substitua pelo conteúdo do seu trabalho. Mantenha frases curtas para facilitar a leitura durante a apresentação.",

                examples: [
                    {
                        title: "Título principal",

                        description: "Clique no título do slide e substitua pelo título do seu trabalho ou do assunto que será apresentado.",

                        image: null,

                        alt: "Slide do Canva mostrando um título sendo editado.",

                        video: "/tutoriais/canva/apresentacao-canva/passo-3-titulo.mp4",
                        poster: "/tutoriais/canva/apresentacao-canva/passo-3-titulo-poster.png",
                    },

                    {
                        title: "Texto do slide",

                        description: "Selecione as caixas de texto e substitua o conteúdo pelo texto que deseja apresentar, mantendo as informações objetivas.",

                        image: null,

                        alt: "Slide do Canva com uma caixa de texto sendo editada.",

                        video: "/tutoriais/canva/apresentacao-canva/passo-3-texto.mp4",
                        poster: "/tutoriais/canva/apresentacao-canva/passo-3-texto-poster.png",
                    },
                ],

                tip: "Evite colocar textos muito longos nos slides. Use o slide como apoio visual e deixe as explicações mais detalhadas para a apresentação oral.",

                video: null,
            },

            {
                title: "Adicione ou remova páginas",

                description: "Utilize a opção de adicionar página para criar novos slides. Exclua páginas que não serão utilizadas e mantenha somente o conteúdo necessário.",

                examples: [
                    {
                        title: "Adicionar página",

                        description: "Clique na opção de adicionar página para criar um novo slide e continuar desenvolvendo o conteúdo da apresentação.",

                        image: null,

                        alt: "Editor do Canva mostrando a opção de adicionar uma nova página.",

                        video: "/tutoriais/canva/apresentacao-canva/passo-4-adicionar.mp4",
                        poster: "/tutoriais/canva/apresentacao-canva/passo-4-adicionar-poster.png",
                    },

                    {
                        title: "Duplicar página",

                        description: "Quando quiser manter o mesmo estilo visual, duplique uma página existente e altere somente os textos e elementos necessários.",

                        image: null,

                        alt: "Canva mostrando uma página da apresentação sendo duplicada.",

                        video: "/tutoriais/canva/apresentacao-canva/passo-4-duplicar.mp4",
                        poster: "/tutoriais/canva/apresentacao-canva/passo-4-duplicar-poster.png",
                    },

                    {
                        title: "Excluir página",

                        description: "Selecione uma página que não será utilizada e use a opção de excluir para removê-la da apresentação.",

                        image: null,

                        alt: "Canva mostrando a opção de excluir uma página da apresentação.",

                        video: "/tutoriais/canva/apresentacao-canva/passo-4-excluir.mp4",
                        poster: "/tutoriais/canva/apresentacao-canva/passo-4-excluir-poster.png",
                    },
                ],

                tip: "Organize os slides em uma sequência lógica, com começo, desenvolvimento e conclusão, para facilitar o acompanhamento do conteúdo.",

                video: null,
            },

            {
                title: "Insira imagens ou outros elementos",

                description: "Use o menu lateral do Canva para adicionar imagens, formas, ícones ou outros elementos que ajudem a explicar o conteúdo.",

                examples: [
                    {
                        title: "Adicionar imagens",

                        description: "Abra a opção de imagens ou carregue um arquivo do computador para inserir uma imagem relacionada ao conteúdo do slide.",

                        image: "/tutoriais/canva/apresentacao-canva/passo-5-imagens.webp",

                        alt: "Menu do Canva mostrando opções para adicionar imagens à apresentação.",
                    },

                    {
                        title: "Formas e ícones",

                        description: "Utilize formas, ícones e outros elementos visuais para destacar informações ou organizar melhor o conteúdo.",

                        image: "/tutoriais/canva/apresentacao-canva/passo-5-elementos.webp",

                        alt: "Editor do Canva mostrando formas e elementos visuais sendo adicionados ao slide.",
                    },

                    {
                        title: "Posicionamento dos elementos",

                        description: "Arraste os elementos para ajustar sua posição e mantenha espaços suficientes entre textos, imagens e outros objetos.",

                        image: "/tutoriais/canva/apresentacao-canva/passo-5-posicionamento.webp",

                        alt: "Slide do Canva mostrando textos e elementos visuais organizados na página.",
                    },
                ],

                tip: "Use elementos visuais que tenham relação com o conteúdo. Evite adicionar imagens ou ícones apenas para preencher espaço.",

                video: null,
            },

            {
                title: "Revise a apresentação",

                description: "Passe por todos os slides e verifique erros de escrita, tamanho dos textos, alinhamento e organização dos elementos.",

                examples: [
                    {
                        title: "Revisão do texto",

                        description: "Leia todos os títulos e textos para identificar erros de digitação, informações repetidas ou trechos que precisam ser corrigidos.",

                        image: "/tutoriais/canva/apresentacao-canva/passo-6-texto.webp",

                        alt: "Slide do Canva sendo revisado para verificar os textos da apresentação.",
                    },

                    {
                        title: "Alinhamento",

                        description: "Confira se os textos, imagens e outros elementos estão alinhados e distribuídos de forma organizada.",

                        image: "/tutoriais/canva/apresentacao-canva/passo-6-alinhamento.webp",

                        alt: "Slide do Canva mostrando elementos alinhados e organizados.",
                    },

                    {
                        title: "Tamanho dos textos",

                        description: "Verifique se os textos possuem tamanho suficiente para serem lidos com facilidade durante a apresentação.",

                        image: "/tutoriais/canva/apresentacao-canva/passo-6-tamanho.webp",

                        alt: "Slide do Canva mostrando textos com tamanho adequado para apresentação.",
                    },
                ],

                tip: "Revise a apresentação do começo ao fim antes de apresentar. Uma revisão final ajuda a encontrar erros que podem passar despercebidos durante a edição.",

                video: null,
            },

            {
                title: "Apresente ou baixe o arquivo",

                description: "Quando terminar, utilize a opção Apresentar para exibir os slides ou selecione Compartilhar > Baixar para salvar a apresentação em um formato disponível.",

                examples: [
                    {
                        title: "Apresentar",

                        description: "Clique em Apresentar para abrir a apresentação em modo de exibição e mostrar os slides ao público.",

                        image: "/tutoriais/canva/apresentacao-canva/passo-7-apresentar.webp",

                        alt: "Canva mostrando a opção Apresentar para exibir os slides.",
                    },

                    {
                        title: "Compartilhar",

                        description: "Use a opção Compartilhar quando quiser enviar a apresentação ou disponibilizá-la para outras pessoas.",

                        image: "/tutoriais/canva/apresentacao-canva/passo-7-compartilhar.webp",

                        alt: "Canva mostrando a janela de compartilhamento da apresentação.",
                    },

                    {
                        title: "Baixar arquivo",

                        description: "Selecione Compartilhar > Baixar e escolha um dos formatos disponíveis para salvar uma cópia da apresentação.",

                        image: "/tutoriais/canva/apresentacao-canva/passo-7-baixar.webp",

                        alt: "Canva mostrando a opção de baixar a apresentação em um formato de arquivo.",
                    },
                ],

                tip: "Antes de apresentar ou baixar, confira novamente os slides e, quando possível, faça uma apresentação de teste para verificar a sequência das páginas.",

                video: null,
            },
        ],
    },
];

export function findTutorial(id) {
    return tutorials.find((tutorial) => tutorial.id === id);
}
