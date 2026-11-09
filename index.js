import express from 'express';
import Livro from './models/Livro.js';
import Emprestimo from './models/Emprestimo.js';
import Leitor from './models/Leitor.js';

const app = express();

app.use(express.json());
app.use(express.static('public'));

// Listas temporárias de dados
let livros = [];
let emprestimos = [];
let leitores = [];

// Página inicial
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});
// Cadastrar leitor
app.post('/leitores', (req, res) => {
  const { nome, cpf, email, telefone } = req.body;

  if (!nome || !cpf || !email || !telefone) {
    return res.status(400).json({
      mensagem: 'Todos os campos são obrigatórios.'
    });
  }

  const leitorExistente = leitores.find(
    leitor => leitor.cpf === cpf
  );

  if (leitorExistente) {
    return res.status(409).json({
      mensagem: 'Já existe um leitor cadastrado com este CPF.'
    });
  }

  const novoLeitor = new Leitor(
    nome,
    cpf,
    email,
    telefone
  );

  novoLeitor.id = leitores.length + 1;

  leitores.push(novoLeitor);

  res.status(201).json({
    mensagem: 'Leitor cadastrado com sucesso!',
    leitor: novoLeitor
  });
});

app.post('/livros', (req, res) => {
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
app.get('/livros', (req, res) => {
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

  if (!livro.estaDisponivel()) {
    return res.status(400).json({
      mensagem: 'Este livro está indisponível.'
    });
  }

  livro.baixarExemplar();

  const novoEmprestimo = new Emprestimo(
    emprestimos.length + 1,
    null,
    leitor,
    livro.id,
    livro.titulo
  );

  emprestimos.push(novoEmprestimo);

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

  if (!livro) {
    return res.status(404).json({
      mensagem: 'Livro associado ao empréstimo não encontrado.'
    });
  }

  emprestimo.registrarDevolucao();
  livro.devolverExemplar();

  res.json({
    mensagem: 'Devolução registrada com sucesso!',
    emprestimo
  });
});

export default app;