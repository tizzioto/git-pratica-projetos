
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

// Atualizar dados de um livro
router.put('/:id', (req, res) => {
  const livroId = Number(req.params.id);

  const livro = livros.find(l => l.id === livroId);

  if (!livro) {
    return res.status(404).json({
      mensagem: 'Livro não encontrado.'
    });
  }

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

  livro.titulo = titulo;
  livro.autor = autor;
  livro.isbn = isbn ?? livro.isbn;
  livro.editora = editora ?? livro.editora;
  livro.anoPublicacao = anoPublicacao ?? livro.anoPublicacao;
  livro.categoria = categoria ?? livro.categoria;
  livro.quantidadeDisponivel =
    quantidadeDisponivel ?? livro.quantidadeDisponivel;

  res.json({
    mensagem: 'Livro atualizado com sucesso!',
    livro
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
