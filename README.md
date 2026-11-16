# 📚 Sistema de Gerenciamento de Biblioteca

## Integrantes

- Lucas Barbeiro Tizzioto
- Pedro Otávio Santos de Almeida

## Sobre o projeto

O Sistema de Gerenciamento de Biblioteca é uma aplicação web desenvolvida como projeto acadêmico, com o objetivo de facilitar o gerenciamento de livros, leitores, funcionários e empréstimos de uma biblioteca.

O projeto utiliza JavaScript, Node.js e Express, aplicando conceitos de programação orientada a objetos, organização de código em módulos, desenvolvimento de aplicações web, autenticação e controle de acesso.

## Funcionalidades implementadas

- Cadastro de leitores.
- Cadastro de funcionários.
- Cadastro de livros.
- Consulta e pesquisa de livros por título ou autor.
- Identificação da disponibilidade dos livros.
- Controle da quantidade de exemplares disponíveis.
- Edição dos dados dos livros.
- Registro de empréstimos.
- Controle do prazo de empréstimo.
- Consulta do histórico de empréstimos.
- Registro de devoluções.
- Atualização automática da disponibilidade dos livros após devolução.
- Identificação de empréstimos ativos e devolvidos.
- Identificação de livros em atraso.
- Cálculo de multas por atraso.
- Autenticação de usuários.
- Controle de acesso de acordo com o perfil do usuário.
- Logout do sistema.

## Regras de negócio implementadas

- Cada leitor pode possuir no máximo 3 empréstimos simultâneos.
- O prazo padrão de empréstimo é de 14 dias corridos.
- Livros indisponíveis não podem ser emprestados.
- A devolução atualiza a quantidade disponível do livro.
- A multa é calculada considerando os dias completos de atraso.
- O valor da multa é de R$ 1,00 por dia de atraso para cada livro.
- Operações restritas exigem autenticação e autorização.
- O perfil de Administrador possui permissões administrativas, incluindo o cadastro de funcionários.
- O perfil de Bibliotecária realiza operações relacionadas a leitores, livros, empréstimos e devoluções.

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
├── data/
├── middleware/
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
│   ├── index.html
│   ├── script.js
│   └── style.css
├── routes/
├── index.js
├── server.js
├── package.json
├── package-lock.json
└── README.md