# 📚 Sistema de Gerenciamento de Biblioteca

## Sobre o projeto

O Sistema de Gerenciamento de Biblioteca é uma aplicação web desenvolvida como projeto acadêmico, com o objetivo de facilitar o gerenciamento de livros, leitores e empréstimos de uma biblioteca.

O projeto utiliza JavaScript, Node.js e Express, aplicando conceitos de programação orientada a objetos, organização de código em módulos e desenvolvimento de aplicações web.

## Funcionalidades implementadas

- Cadastro de livros com título, autor e outras informações.
- Consulta e pesquisa de livros por título ou autor.
- Identificação da disponibilidade dos livros.
- Controle da quantidade de exemplares disponíveis.
- Registro de empréstimos.
- Consulta do histórico de empréstimos.
- Registro de devoluções.
- Atualização automática da disponibilidade dos livros.
- Identificação do status dos empréstimos (ativo ou devolvido).

## Tecnologias utilizadas

- **Node.js:** ambiente de execução JavaScript.
- **Express:** framework utilizado para criação do servidor e das rotas HTTP.
- **JavaScript:** linguagem utilizada na implementação da aplicação.
- **HTML:** estrutura da interface do sistema.
- **CSS:** estilização da interface.
- **Git:** controle de versão do código-fonte.
- **GitHub:** hospedagem e gerenciamento do repositório.

## Programação Orientada a Objetos

O projeto utiliza classes para representar as principais entidades do sistema, aplicando conceitos de herança, encapsulamento e reutilização de código.

As classes desenvolvidas são:

- **Pessoa:** classe base para representar pessoas cadastradas no sistema.
- **Leitor:** representa os leitores da biblioteca.
- **Funcionario:** representa os funcionários.
- **Bibliotecaria:** especialização da classe Funcionário.
- **Administrador:** especialização da classe Funcionário.
- **Livro:** representa os livros e controla sua disponibilidade.
- **Emprestimo:** representa os empréstimos e suas devoluções.
- **Multa:** realiza o cálculo de multas por atraso.

## Estrutura do projeto

```text
git-pratica-projetos/
├── models/
│   ├── Administrador.js
│   ├── Bibliotecaria.js
│   ├── Emprestimo.js
│   ├── Funcionario.js
│   ├── Leitor.js
│   ├── Livro.js
│   ├── Multa.js
│   └── Pessoa.js
├── public/
│   └── index.html
├── index.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Requisitos para execução

Antes de executar o projeto, é necessário ter instalado:

- [Node.js](https://nodejs.org/)
- npm (instalado junto com o Node.js).
- [Git](https://git-scm.com/) (opcional, para clonar o repositório).

## Como executar o projeto

**1. Clone o repositório:**

```bash
git clone https://github.com/tizzioto/git-pratica-projetos.git
```

**2. Acesse a pasta do projeto:**

```bash
cd git-pratica-projetos
```

**3. Instale as dependências:**

```bash
npm install
```

**4. Inicie o servidor:**

```bash
npm start
```

**5. Acesse a aplicação pelo navegador:**

```text
http://localhost:3000
```

## Observações

Atualmente, os dados de livros e empréstimos são armazenados temporariamente em memória, por meio de estruturas de dados no servidor. Portanto, as informações são perdidas quando o servidor é encerrado ou reiniciado.

O projeto está em desenvolvimento e poderá receber novas funcionalidades e melhorias ao longo de sua implementação.

## Objetivo acadêmico

Projeto desenvolvido para fins acadêmicos, com o propósito de aplicar conhecimentos de desenvolvimento web, JavaScript, Node.js, Express, programação orientada a objetos e controle de versão utilizando Git e GitHub.