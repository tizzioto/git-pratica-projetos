
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

export default app;