
import express from 'express';
import { livros, emprestimos } from '../data/store.js';
import Multa from '../models/Multa.js';
import { autenticar, autorizar } from '../middleware/auth.js';

const router = express.Router();

// Registrar devolução
router.post('/:emprestimoId', autenticar, autorizar('bibliotecaria'), (req, res) => {
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

  // Calcular multa pela devolução em atraso
  const multa = new Multa(emprestimo);
  emprestimo.multa = multa;

  res.json({
    mensagem: 'Devolução registrada com sucesso!',
    emprestimo,
    multa
  });
});

export default router;
