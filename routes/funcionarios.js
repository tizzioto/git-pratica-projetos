
import express from 'express';
import { funcionarios } from '../data/store.js';
import Funcionario from '../models/Funcionario.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Cadastrar funcionário
router.post('/', async (req, res) => {
  const { nome, cpf, email, telefone, cargo, senha } = req.body;

  if (!nome || !cpf || !email || !telefone || !cargo || !senha) {
    return res.status(400).json({
      mensagem: 'Todos os campos são obrigatórios.'
    });
  }

  const cpfExistente = funcionarios.find(
    funcionario => funcionario.cpf === cpf
  );

  if (cpfExistente) {
    return res.status(400).json({
      mensagem: 'CPF já cadastrado.'
    });
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const funcionario = new Funcionario(
    nome,
    cpf,
    email,
    telefone,
    cargo,
    senhaHash
  );

  funcionario.id = funcionarios.length + 1;
  funcionarios.push(funcionario);

  const { senha: senhaOculta, ...funcionarioSemSenha } = funcionario;

  res.status(201).json({
    mensagem: 'Funcionário cadastrado com sucesso!',
    funcionario: funcionarioSemSenha
  });
});

export default router;
