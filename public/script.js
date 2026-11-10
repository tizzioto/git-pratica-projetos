
    const listaLivros = document.getElementById('listaLivros');
    const busca = document.getElementById('busca');

    async function carregarLivros() {
        try {
            const resposta = await fetch('/livros');
            const livros = await resposta.json();

            document.getElementById('totalLivros').textContent = livros.length;
            document.getElementById('disponiveis').textContent =
                livros.filter(livro => livro.disponivel).length;
            document.getElementById('emprestados').textContent =
                livros.filter(livro => !livro.disponivel).length;

            renderizarLivros(livros);
        } catch (erro) {
            listaLivros.textContent = 'Erro ao carregar os livros.';
        }
    }

        async function carregarEmprestimos() {
    const lista = document.getElementById('listaEmprestimos');

    try {
        const resposta = await fetch('/emprestimos');
        const emprestimos = await resposta.json();

        lista.innerHTML = '';

        if (emprestimos.length === 0) {
            lista.textContent = 'Nenhum empréstimo registrado.';
            return;
        }

        emprestimos.forEach(emprestimo => {
            const card = document.createElement('div');
            card.className = 'book';

            const titulo = document.createElement('h3');
            titulo.textContent = emprestimo.tituloLivro;

            const leitor = document.createElement('p');
            leitor.textContent = 'Leitor: ' + emprestimo.leitorNome;

            const data = document.createElement('p');
            const dataFormatada = new Date(
                emprestimo.dataEmprestimo
            ).toLocaleDateString('pt-BR');

            data.textContent = 'Data do empréstimo: ' + dataFormatada;

            const status = document.createElement('span');
            status.className = 'status ' +
                (emprestimo.status === 'Ativo' ? 'unavailable' : 'available');
            status.textContent = emprestimo.status;

            card.append(titulo, leitor, data, status);

            if (emprestimo.status === 'Ativo') {
                const botao = document.createElement('button');
                botao.textContent = 'Registrar devolução';

                botao.addEventListener('click', async () => {
                    botao.disabled = true;
                    botao.textContent = 'Registrando...';

                    try {
                        const resposta = await fetch(
                            `/devolucoes/${emprestimo.id}`,
                            { method: 'POST' }
                        );

                        const resultado = await resposta.json();

                        if (!resposta.ok) {
                            alert(resultado.mensagem);
                            botao.disabled = false;
                            botao.textContent = 'Registrar devolução';
                            return;
                        }

                        alert(resultado.mensagem);
                        carregarEmprestimos();
                        carregarLivros();

                    } catch (erro) {
                        alert('Erro ao registrar devolução.');
                        botao.disabled = false;
                        botao.textContent = 'Registrar devolução';
                    }
                });

                card.appendChild(botao);
            }

            lista.appendChild(card);
        });

    } catch (erro) {
        lista.textContent = 'Erro ao carregar os empréstimos.';
    }
}   

async function carregarAtrasados() {
    const lista = document.getElementById('listaAtrasados');

    try {
        const resposta = await fetch('/emprestimos/atrasados');
        const emprestimos = await resposta.json();

        lista.innerHTML = '';

        if (emprestimos.length === 0) {
            lista.textContent = 'Nenhum livro em atraso.';
            return;
        }

        emprestimos.forEach(emprestimo => {
            const card = document.createElement('div');
            card.className = 'book';

            const titulo = document.createElement('h3');
            titulo.textContent = emprestimo.tituloLivro;

            const leitor = document.createElement('p');
            leitor.textContent = 'Leitor: ' + emprestimo.leitorNome;

            const data = document.createElement('p');
            data.textContent = 'Data prevista para devolução: ' +
                new Date(emprestimo.dataPrevistaDevolucao)
                    .toLocaleDateString('pt-BR');

            const status = document.createElement('span');
            status.className = 'status unavailable';
            status.textContent = 'Atrasado';

            card.append(titulo, leitor, data, status);
            lista.appendChild(card);
        });

    } catch (erro) {
        lista.textContent = 'Erro ao carregar livros em atraso.';
    }
}


function renderizarLivros(livros) {
    listaLivros.innerHTML = '';

    if (livros.length === 0) {
        listaLivros.textContent = 'Nenhum livro encontrado.';
        return;
    }

    livros.forEach(livro => {
        const card = document.createElement('div');
        card.className = 'book';

        const titulo = document.createElement('h3');
        titulo.textContent = livro.titulo;

        const autor = document.createElement('p');
        autor.textContent = 'Autor: ' + livro.autor;

        const id = document.createElement('p');
        id.textContent = 'Código: ' + livro.id;

        const status = document.createElement('span');
        status.className = 'status ' +
            (livro.disponivel ? 'available' : 'unavailable');
        status.textContent = livro.disponivel
            ? 'Disponível'
            : 'Emprestado';

        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';

        botaoEditar.addEventListener('click', async () => {
            const novoTitulo = prompt('Novo título:', livro.titulo);

            if (novoTitulo === null) return;

            const novoAutor = prompt('Novo autor:', livro.autor);

            if (novoAutor === null) return;

            if (!novoTitulo.trim() || !novoAutor.trim()) {
                alert('Título e autor são obrigatórios.');
                return;
            }

            try {
                const resposta = await fetch(`/livros/${livro.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        titulo: novoTitulo.trim(),
                        autor: novoAutor.trim()
                    })
                });

                const resultado = await resposta.json();
                alert(resultado.mensagem);

                if (resposta.ok) {
                    carregarLivros();
                }
            } catch (erro) {
                alert('Erro ao atualizar o livro.');
            }
        });

        card.append(titulo, autor, id, status, botaoEditar);
        listaLivros.appendChild(card);
    });
}


    document.getElementById('formLivro').addEventListener('submit', async (e) => {
        e.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;

        const resposta = await fetch('/livros', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, autor })
        });

        const resultado = await resposta.json();

        document.getElementById('mensagemLivro').textContent =
            resultado.mensagem;

        if (resposta.ok) {
            e.target.reset();
            carregarLivros();
            carregarEmprestimos();
        }
    });
        // CADASTRO DE LEITOR 
    document.getElementById('formLeitor').addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('nomeLeitor').value;
        const cpf = document.getElementById('cpfLeitor').value;
        const email = document.getElementById('emailLeitor').value;
        const telefone = document.getElementById('telefoneLeitor').value;

        const resposta = await fetch('/leitores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, cpf, email, telefone })
        });

        const resultado = await resposta.json();

        document.getElementById('mensagemLeitor').textContent =
            resultado.mensagem;

        if (resposta.ok) {
            e.target.reset();
        }
    });
    // REGISTRO DE EMPRÉSTIMO
    document.getElementById('formEmprestimo').addEventListener('submit', async (e) => {
        e.preventDefault();

        const livroId = document.getElementById('livroId').value;
        const leitorCpf = document.getElementById('leitorCpf').value;
        const resposta = await fetch('/emprestimos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ livroId, leitorCpf })
        });

        const resultado = await resposta.json();

        document.getElementById('mensagemEmprestimo').textContent =
            resultado.mensagem;

        if (resposta.ok) {
            e.target.reset();
            carregarLivros();
            carregarEmprestimos();
        }
    });

    busca.addEventListener('input', async () => {
        const resposta = await fetch(
            '/livros?busca=' + encodeURIComponent(busca.value)
        );

        const livros = await resposta.json();
        renderizarLivros(livros);
    });

    carregarLivros();
    carregarEmprestimos();
    carregarAtrasados();