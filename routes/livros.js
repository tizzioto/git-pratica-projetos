
import express from 'express';
import Livro from '../models/Livro.js';
import { livros } from '../data/store.js';

const router = express.Router();

// Cadastrar livro
router.post('/', (req, res) => {
  const {
    titulo,
    autor,
    isbn,
    editora,
    anoPublicacao,
    categoria,
    quantidadeDisponivel
  } = req.body;

  if (!titulo || !autor) {
    return res.status(400).json({
      mensagem: 'Título e autor são obrigatórios.'
    });
  }

  const novoLivro = new Livro(
    titulo,
    autor,
    isbn,
    editora,
    anoPublicacao,
    categoria,
    quantidadeDisponivel ?? 1
  );

  novoLivro.id = livros.length + 1;
  livros.push(novoLivro);

  res.status(201).json({
    mensagem: 'Livro cadastrado com sucesso!',
    livro: novoLivro
  });
});

// Consultar e pesquisar livros
router.get('/', (req, res) => {
  const { busca } = req.query;

  const livrosComDisponibilidade = livros.map(livro => ({
    ...livro,
    disponivel: livro.estaDisponivel()
  }));

  if (!busca) {
    return res.json(livrosComDisponibilidade);
  }

  const resultado = livrosComDisponibilidade.filter(livro =>
    livro.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    livro.autor.toLowerCase().includes(busca.toLowerCase())
  );

  res.json(resultado);
});

export default router;
