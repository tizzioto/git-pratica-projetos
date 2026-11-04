
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.static('public'));

// Lista temporária de livros
let livros = [];

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

// Consultar livros cadastrados
app.get('/livros', (req, res) => {
  res.json(livros);
});

export default app;
