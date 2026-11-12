
import express from 'express';
import bcrypt from 'bcryptjs';
import Leitor from '../models/Leitor.js';
import { leitores } from '../data/store.js';
import { autenticar, autorizar } from '../middleware/auth.js';

const router = express.Router();

// Cadastrar leitor
router.post('/', autenticar, autorizar('bibliotecaria'), async (req, res) => {
  const { nome, cpf, email, telefone, senha } = req.body;

  if (!nome || !cpf || !email || !telefone || !senha) {
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

  const senhaHash = await bcrypt.hash(senha, 10);

  const novoLeitor = new Leitor(
    nome,
    cpf,
    email,
    telefone,
    senhaHash
  );

  novoLeitor.id = leitores.length + 1;
  leitores.push(novoLeitor);

  const { senha: senhaOculta, ...leitorSemSenha } = novoLeitor;

  res.status(201).json({
    mensagem: 'Leitor cadastrado com sucesso!',
    leitor: leitorSemSenha
  });
});

export default router;
