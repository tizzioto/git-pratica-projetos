
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.static('public'));

// Lista temporária de livros
let livros = [];
let emprestimos = [];

// Página inicial
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Cadastrar livro
app.post('/livros', (req, res) => {
  const { titulo, autor } = req.body;

  if (!titulo || !autor) {
    return res.status(400).json({
      mensagem: 'Título e autor são obrigatórios.'
    });
  }

  const novoLivro = {
    id: livros.length + 1,
    titulo,
    autor,
    disponivel: true
  };

  livros.push(novoLivro);

  res.status(201).json({
    mensagem: 'Livro cadastrado com sucesso!',
    livro: novoLivro
  });
});


// Consultar e pesquisar livros
app.get('/livros', (req, res) => {
  const { busca } = req.query;

  if (!busca) {
    return res.json(livros);
  }

  const resultado = livros.filter(livro =>
    livro.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    livro.autor.toLowerCase().includes(busca.toLowerCase())
  );

  res.json(resultado);
});

// Registrar empréstimo
app.post('/emprestimos', (req, res) => {
  const { livroId, leitor } = req.body;

  const livro = livros.find(l => l.id === Number(livroId));

  if (!livro) {
    return res.status(404).json({
      mensagem: 'Livro não encontrado.'
    });
  }

  if (!leitor) {
    return res.status(400).json({
      mensagem: 'Nome do leitor é obrigatório.'
    });
  }

  if (!livro.disponivel) {
    return res.status(400).json({
      mensagem: 'Este livro já está emprestado.'
    });
  }

  const novoEmprestimo = {
    id: emprestimos.length + 1,
    livroId: livro.id,
    tituloLivro: livro.titulo,
    leitor,
    dataEmprestimo: new Date().toLocaleDateString('pt-BR'),
    status: 'Ativo'
  };

  emprestimos.push(novoEmprestimo);
  livro.disponivel = false;

  res.status(201).json({
    mensagem: 'Empréstimo registrado com sucesso!',
    emprestimo: novoEmprestimo
  });
});

// Consultar todos os empréstimos
app.get('/emprestimos', (req, res) => {
  res.json(emprestimos);
});

// Registrar devolução
app.post('/devolucoes/:emprestimoId', (req, res) => {
  const emprestimoId = Number(req.params.emprestimoId);

  const emprestimo = emprestimos.find(
    e => e.id === emprestimoId
  );

  if (!emprestimo) {
    return res.status(404).json({
      mensagem: 'Empréstimo não encontrado.'
    });
  }

  if (emprestimo.status === 'Devolvido') {
    return res.status(400).json({
      mensagem: 'Este livro já foi devolvido.'
    });
  }

  const livro = livros.find(
    l => l.id === emprestimo.livroId
  );

  emprestimo.status = 'Devolvido';
  emprestimo.dataDevolucao = new Date().toLocaleDateString('pt-BR');

  livro.disponivel = true;

  res.json({
    mensagem: 'Devolução registrada com sucesso!',
    emprestimo
  });
});

export default app;