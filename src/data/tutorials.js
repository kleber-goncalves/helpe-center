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

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-2-a1.webp",

                        alt: "Planilha do Excel com a célula A1 selecionada.",
                    },

                    {
                        title: "B2",

                        description: "B2 é a célula localizada na coluna B e na linha 2.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-2-b2.webp",

                        alt: "Planilha do Excel com a célula B2 selecionada.",
                    },

                    {
                        title: "C5",

                        description: "C5 é a célula localizada na coluna C e na linha 5.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-2-c5.webp",

                        alt: "Planilha do Excel com a célula C5 selecionada.",
                    },

                    {
                        title: "Coluna B",

                        description: "A coluna B é identificada pela letra B no topo da planilha e contém as células dessa coluna.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-2-coluna-b.webp",

                        alt: "Planilha do Excel destacando a coluna B.",
                    },

                    {
                        title: "Linha 2",

                        description: "A linha 2 é identificada pelo número 2 no lado esquerdo da planilha.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-2-linha-2.webp",

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

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-3-nome.webp",

                        alt: "Planilha do Excel com um nome sendo digitado na célula A1.",
                    },

                    {
                        title: "Nota",

                        description: "Use outra célula para inserir um número, como a nota de um aluno.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-3-nota.webp",

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

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-4-nome.webp",

                        alt: "Planilha do Excel mostrando o título Nome na primeira linha.",
                    },

                    {
                        title: "Turma",

                        description: "Crie uma coluna específica para identificar a turma.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-4-turma.webp",

                        alt: "Planilha do Excel mostrando o título Turma na primeira linha.",
                    },

                    {
                        title: "Nota",

                        description: "Crie uma coluna para organizar as notas.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-4-nota.webp",

                        alt: "Planilha do Excel mostrando o título Nota na primeira linha.",
                    },

                    {
                        title: "Data",

                        description: "Crie uma coluna para registrar datas quando necessário.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-4-data.webp",

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

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-5-alunos.webp",

                        alt: "Planilha do Excel organizada com nomes, turmas e notas em colunas e alunos em linhas.",
                    },

                    {
                        title: "Uma informação por coluna",

                        description: "Mantenha nomes, turmas e notas em colunas separadas para facilitar a leitura.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-5-colunas.webp",

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

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-6-negrito.webp",

                        alt: "Excel mostrando o título de uma coluna selecionado com a opção de negrito.",
                    },

                    {
                        title: "Alinhamento",

                        description: "Use as opções de alinhamento para organizar visualmente o conteúdo das células.",

                        image: "/tutoriais/excel/como-comecar-usar-excel/passo-6-alinhamento.webp",

                        alt: "Excel mostrando opções de alinhamento aplicadas ao conteúdo da planilha.",
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
        keywords: ["word", "formatação", "trabalho", "fonte", "margens"],
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
        description: "Crie e atualize o sumário do seu trabalho automaticamente.",
        keywords: ["word", "sumário", "indice", "índice", "títulos", "sumário automático"],
        learning: ["Aplicar estilos de título", "Inserir o sumário automático", "Atualizar o sumário"],
        steps: [
            {
                title: "Organize os títulos do trabalho",
                description: "Revise seu documento e identifique os títulos e subtítulos que devem aparecer no sumário.",
            },
            {
                title: "Aplique o estilo aos títulos",
                description: "Selecione um título, abra a guia Página Inicial e escolha um estilo como Título 1. Para subtítulos, utilize Título 2 ou outro nível adequado.",
            },
            {
                title: "Repita o processo nos outros títulos",
                description: "Aplique os estilos correspondentes em todos os capítulos e subtítulos do trabalho. O Word utilizará esses estilos para montar o sumário.",
            },
            {
                title: "Insira o sumário automático",
                description: "Clique no local onde o sumário deve aparecer, abra a guia Referências, selecione Sumário e escolha um dos modelos automáticos.",
            },
            {
                title: "Atualize o sumário",
                description: "Depois de editar o trabalho, clique no sumário e escolha Atualizar Sumário. Você poderá atualizar somente os números das páginas ou toda a tabela.",
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
        description: "Confira a impressora e imprima seu documento com segurança.",
        keywords: ["imprimir", "impressão", "documento", "impressora", "papel"],
        learning: ["Escolher a impressora", "Selecionar as páginas", "Definir o número de cópias", "Iniciar a impressão"],
        steps: [
            {
                title: "Abra o documento que deseja imprimir",
                description: "Abra o arquivo no programa em que ele foi criado, como Word, PDF ou outro aplicativo compatível.",
            },
            {
                title: "Abra a tela de impressão",
                description: "Use o atalho Ctrl + P ou acesse a opção Arquivo > Imprimir para abrir as configurações de impressão.",
            },
            {
                title: "Escolha a impressora",
                description: "Na lista de impressoras disponíveis, selecione a impressora que deseja utilizar. Confira se ela está ligada e conectada ao computador.",
            },
            {
                title: "Defina as páginas e as cópias",
                description: "Escolha se deseja imprimir todas as páginas ou somente um intervalo específico. Depois, informe quantas cópias deseja imprimir.",
            },
            {
                title: "Confira as configurações",
                description: "Antes de imprimir, confira orientação da página, tamanho do papel e outras opções disponíveis. Use a visualização de impressão quando ela estiver disponível.",
            },
            {
                title: "Clique em Imprimir",
                description: "Depois de conferir todas as opções, clique em Imprimir e aguarde a conclusão do trabalho.",
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
        description: "Transforme um documento em papel em um arquivo digital.",
        keywords: ["digitalizar", "scanner", "documento", "pdf", "escaneamento"],
        learning: ["Posicionar o documento corretamente", "Abrir a ferramenta de digitalização", "Escolher o formato do arquivo", "Salvar o documento digitalizado"],
        steps: [
            {
                title: "Prepare o documento",
                description: "Coloque o documento sobre o vidro do scanner ou no alimentador automático, conforme o modelo da impressora ou scanner.",
            },
            {
                title: "Abra o aplicativo de digitalização",
                description: "No computador, abra o aplicativo fornecido pela impressora ou a ferramenta de digitalização disponível no sistema.",
            },
            {
                title: "Selecione o scanner",
                description: "Caso o computador tenha mais de um dispositivo disponível, escolha a impressora ou scanner que será utilizado.",
            },
            {
                title: "Escolha o formato do arquivo",
                description: "Selecione o formato desejado. Para documentos com várias páginas ou que serão compartilhados, o formato PDF costuma ser uma opção adequada.",
            },
            {
                title: "Inicie a digitalização",
                description: "Clique em Digitalizar ou em uma opção equivalente e aguarde o dispositivo concluir a leitura do documento.",
            },
            {
                title: "Confira e salve o arquivo",
                description: "Visualize o resultado para verificar se a página ficou completa e legível. Depois, escolha uma pasta e salve o arquivo com um nome fácil de identificar.",
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
        description: "Envie um arquivo ou libere o acesso para outras pessoas.",
        keywords: ["compartilhar", "arquivo", "link", "drive", "google drive", "permissão"],
        learning: ["Localizar o arquivo no Google Drive", "Abrir as opções de compartilhamento", "Escolher quem pode acessar", "Copiar e enviar o link"],
        steps: [
            {
                title: "Abra o Google Drive",
                description: "Acesse o Google Drive e faça login na conta que possui o arquivo que deseja compartilhar.",
            },
            {
                title: "Localize o arquivo",
                description: "Procure o documento ou arquivo desejado entre suas pastas. Você também pode utilizar a barra de pesquisa do Google Drive.",
            },
            {
                title: "Abra as opções de compartilhamento",
                description: "Clique com o botão direito sobre o arquivo e selecione Compartilhar.",
            },
            {
                title: "Escolha quem terá acesso",
                description: "Informe o e-mail das pessoas que devem receber acesso ou altere a opção de acesso geral para permitir que outras pessoas utilizem o link.",
            },
            {
                title: "Defina a permissão",
                description: "Escolha se a pessoa poderá apenas visualizar, comentar ou editar o arquivo. Dê somente a permissão necessária para a atividade.",
            },
            {
                title: "Copie ou envie o acesso",
                description: "Clique em Copiar link para enviar o endereço por outro meio ou use a opção de envio disponível na própria janela de compartilhamento.",
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
        description: "Salve uma cópia em PDF para compartilhar ou imprimir.",
        keywords: ["pdf", "converter", "documento", "salvar", "exportar"],
        learning: ["Abrir as opções de salvamento", "Selecionar o formato PDF", "Escolher o local do arquivo", "Conferir o documento convertido"],
        steps: [
            {
                title: "Abra o documento",
                description: "Abra no programa utilizado para criar ou editar o arquivo, como Microsoft Word, LibreOffice ou outro editor compatível.",
            },
            {
                title: "Abra a opção de salvar ou exportar",
                description: "Acesse o menu Arquivo e procure uma opção como Salvar Como, Exportar ou Baixar, dependendo do programa utilizado.",
            },
            {
                title: "Selecione PDF como formato",
                description: "Na lista de formatos disponíveis, escolha PDF. Alguns programas também apresentam a opção Exportar como PDF.",
            },
            {
                title: "Escolha onde salvar",
                description: "Selecione a pasta onde deseja guardar o arquivo e escolha um nome que permita identificar facilmente o documento.",
            },
            {
                title: "Confirme a conversão",
                description: "Confirme o salvamento ou a exportação e aguarde o programa criar o arquivo PDF.",
            },
            {
                title: "Abra o PDF para conferir",
                description: "Abra o arquivo recém-criado e confira se textos, imagens e páginas foram mantidos corretamente antes de enviá-lo ou imprimi-lo.",
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
        description: "Envie documentos e imagens junto com sua mensagem.",
        keywords: ["email", "e-mail", "anexo", "arquivo", "gmail", "enviar"],
        learning: ["Criar uma nova mensagem", "Adicionar um arquivo como anexo", "Conferir o arquivo anexado", "Enviar a mensagem"],
        steps: [
            {
                title: "Abra seu e-mail",
                description: "Acesse o serviço de e-mail que utiliza e faça login na sua conta.",
            },
            {
                title: "Crie uma nova mensagem",
                description: "Clique em Escrever, Nova mensagem ou em uma opção equivalente para abrir uma nova mensagem.",
            },
            {
                title: "Preencha o destinatário e o assunto",
                description: "Informe o endereço de e-mail da pessoa que receberá a mensagem e escreva um assunto que identifique o conteúdo do envio.",
            },
            {
                title: "Clique no ícone de anexo",
                description: "Na parte inferior da mensagem, procure o ícone de clipe de papel e clique nele para selecionar um arquivo do computador ou dispositivo.",
            },
            {
                title: "Escolha o arquivo",
                description: "Navegue até a pasta onde o arquivo está salvo, selecione-o e confirme. Aguarde até que o anexo termine de carregar.",
            },
            {
                title: "Confira e envie",
                description: "Verifique o destinatário, assunto, mensagem e nome do arquivo anexado. Depois, clique em Enviar.",
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
        description: "Guarde seus arquivos na nuvem para acessá-los depois.",
        keywords: ["google drive", "drive", "salvar", "arquivo", "nuvem", "upload"],
        learning: ["Abrir o Google Drive", "Escolher a pasta de destino", "Enviar um arquivo", "Localizar o arquivo depois"],
        steps: [
            {
                title: "Abra o Google Drive",
                description: "Acesse o Google Drive pelo navegador e faça login na conta Google que deseja utilizar para armazenar o arquivo.",
            },
            {
                title: "Escolha a pasta de destino",
                description: "Abra a pasta onde deseja guardar o arquivo. Organizar os documentos em pastas facilita encontrá-los posteriormente.",
            },
            {
                title: "Clique em Novo",
                description: "No Google Drive, clique no botão Novo e escolha a opção Upload de arquivo.",
            },
            {
                title: "Selecione o arquivo no computador",
                description: "Localize o documento que deseja guardar, selecione-o e confirme o envio. O Drive começará a fazer o upload automaticamente.",
            },
            {
                title: "Aguarde o envio terminar",
                description: "Espere até que o carregamento seja concluído. Não feche a página enquanto o arquivo ainda estiver sendo enviado.",
            },
            {
                title: "Confira o arquivo no Drive",
                description: "Depois do upload, confirme se o arquivo aparece dentro da pasta escolhida. Agora ele poderá ser acessado novamente pela sua conta.",
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
        description: "Monte uma apresentação clara usando modelos do Canva.",
        keywords: ["canva", "apresentação", "slides", "design", "apresentar"],
        learning: ["Criar uma apresentação", "Escolher um modelo", "Editar textos e elementos", "Adicionar novas páginas", "Baixar ou apresentar"],
        steps: [
            {
                title: "Acesse o Canva",
                description: "Entre no Canva pelo navegador e faça login na sua conta. Na página inicial, procure pela opção de criar uma apresentação.",
            },
            {
                title: "Escolha um modelo",
                description: "Pesquise por Apresentação e selecione um modelo que combine com o tema do trabalho. Também é possível começar com uma apresentação em branco.",
            },
            {
                title: "Edite o título e os textos",
                description: "Clique sobre os textos do modelo e substitua pelo conteúdo do seu trabalho. Mantenha frases curtas para facilitar a leitura durante a apresentação.",
            },
            {
                title: "Adicione ou remova páginas",
                description: "Utilize a opção de adicionar página para criar novos slides. Exclua páginas que não serão utilizadas e mantenha somente o conteúdo necessário.",
            },
            {
                title: "Insira imagens ou outros elementos",
                description: "Use o menu lateral do Canva para adicionar imagens, formas, ícones ou outros elementos que ajudem a explicar o conteúdo.",
            },
            {
                title: "Revise a apresentação",
                description: "Passe por todos os slides e verifique erros de escrita, tamanho dos textos, alinhamento e organização dos elementos.",
            },
            {
                title: "Apresente ou baixe o arquivo",
                description: "Quando terminar, utilize a opção Apresentar para exibir os slides ou selecione Compartilhar > Baixar para salvar a apresentação em um formato disponível.",
            },
        ],
    },
];

export function findTutorial(id) {
    return tutorials.find((tutorial) => tutorial.id === id);
}
