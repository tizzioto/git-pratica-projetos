import express from 'express';
import Emprestimo from '../models/Emprestimo.js';
import { livros, leitores, emprestimos } from '../data/store.js';

const router = express.Router();

// Registrar empréstimo
router.post('/', (req, res) => {
  const { livroId, leitorCpf } = req.body;

  const livro = livros.find(l => l.id === Number(livroId));

  if (!livro) {
    return res.status(404).json({
      mensagem: 'Livro não encontrado.'
    });
  }

  const leitor = leitores.find(l => l.cpf === leitorCpf);

  if (!leitor) {
    return res.status(404).json({
      mensagem: 'Leitor não encontrado. Cadastre o leitor primeiro.'
    });
  }

  if (!leitor.podeEmprestar()) {
    return res.status(400).json({
      mensagem: 'O leitor já atingiu o limite de 3 empréstimos ativos.'
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
    leitor.id,
    leitor.nome,
    livro.id,
    livro.titulo
  );

  emprestimos.push(novoEmprestimo);
  leitor.emprestimos.push(novoEmprestimo);

  res.status(201).json({
    mensagem: 'Empréstimo registrado com sucesso!',
    emprestimo: novoEmprestimo
  });
});

// Consultar todos os empréstimos
router.get('/', (req, res) => {
  res.json(emprestimos);
});
// Identificar livros em atraso
router.get('/atrasados', (req, res) => {
  const emprestimosAtrasados = emprestimos.filter(
    emprestimo => emprestimo.estaAtrasado()
  );

  res.json(emprestimosAtrasados);
});

export default router;
