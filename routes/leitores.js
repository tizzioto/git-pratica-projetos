import express from 'express';
import Leitor from '../models/Leitor.js';
import { leitores } from '../data/store.js';
import { autenticar, autorizar } from '../middleware/auth.js';

const router = express.Router();

// Cadastrar leitor
router.post('/', autenticar, autorizar('bibliotecaria'), (req, res) => {
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

export default router;