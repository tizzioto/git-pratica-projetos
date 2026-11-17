# Sistema de Gerenciamento de Biblioteca (SGB)

## Integrantes

- Lucas Barbeiro Tizzioto
- Pedro Otávio Santos de Almeida

## Descrição

O Sistema de Gerenciamento de Biblioteca (SGB) é uma aplicação desenvolvida para facilitar o gerenciamento das principais atividades de uma biblioteca. O sistema permite o controle de leitores, funcionários e livros, além do registro e acompanhamento de empréstimos e devoluções.

A aplicação possui autenticação de usuários e controle de acesso de acordo com o perfil do funcionário, proporcionando maior organização e segurança durante a utilização do sistema. Também são realizadas verificações relacionadas à disponibilidade dos livros, limite de empréstimos e atrasos, incluindo o cálculo de multas quando necessário.

O projeto foi desenvolvido como atividade acadêmica da disciplina de Análise e Projeto de Sistemas, utilizando tecnologias web com Node.js e Express.

## Funcionalidades principais

- Cadastro de leitores
- Cadastro de funcionários
- Cadastro de livros
- Consulta de livros
- Atualização de dados de livros
- Registro de empréstimos
- Registro de devoluções
- Identificação de empréstimos em atraso
- Cálculo de multas por atraso
- Autenticação de usuários
- Controle de acesso por perfil

## Tecnologias utilizadas

- **Node.js** — ambiente de execução do JavaScript no servidor.
- **Express.js** — framework utilizado para criação do servidor e das rotas da aplicação.
- **JavaScript** — linguagem utilizada no desenvolvimento do sistema.
- **HTML5** — estruturação das páginas da aplicação.
- **CSS3** — estilização da interface.
- **Git** — controle de versão do projeto.
- **GitHub** — armazenamento e gerenciamento do repositório.
- **bcryptjs** — utilizado para hash das senhas.
- **crypto (randomUUID)** — módulo nativo do Node.js, utilizado para gerar os tokens de sessão.
- **dotenv** — utilizado para gerenciamento de variáveis de ambiente.

## Estrutura do projeto

```text
git-pratica-projetos/
├── models/
├── routes/
├── middleware/
├── public/
├── data/
├── .env              (não versionado; veja .env.example)
├── .env.example
├── index.js
├── server.js
├── package.json
└── README.md
```

## Como executar

### Pré-requisitos

- Node.js instalado
- Git instalado

### Instalação

Clone o repositório:

```bash
git clone https://github.com/tizzioto/git-pratica-projetos.git
```

Acesse a pasta do projeto:

```bash
cd git-pratica-projetos
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do exemplo e preencha os dados do primeiro administrador:

```bash
cp .env.example .env
```

Inicie a aplicação:

```bash
npm start
```

Após iniciar o servidor, acesse no navegador:

```text
http://localhost:3000
```

## Primeiro acesso

Ao iniciar o servidor sem nenhum funcionário cadastrado, o sistema cria o primeiro administrador com os dados do `.env` (`ADMIN_NOME`, `ADMIN_CPF`, `ADMIN_EMAIL`, `ADMIN_TELEFONE` e `ADMIN_SENHA`). Entre com o CPF e a senha informados; o administrador cadastra as bibliotecárias, que realizam as demais operações (livros, leitores, empréstimos e devoluções).

## Limitações

- Os dados são mantidos em memória: ao reiniciar o servidor, livros, leitores, empréstimos e funcionários cadastrados são perdidos (apenas o administrador inicial é recriado).