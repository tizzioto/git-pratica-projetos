import express from 'express';
import { funcionarios } from '../data/store.js';

const router = express.Router();

// Realizar login
router.post('/login', async (req, res) => {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
    return res.status(400).json({
      mensagem: 'CPF e senha são obrigatórios.'
    });
  }

  const funcionario = funcionarios.find(
    funcionario => funcionario.cpf === cpf
  );

  if (!funcionario || !(await funcionario.autenticar(senha))) {
    return res.status(401).json({
      mensagem: 'CPF ou senha inválidos.'
    });
  }

  const { senha: senhaOculta, ...funcionarioSemSenha } = funcionario;

  res.status(200).json({
    mensagem: 'Login realizado com sucesso!',
    funcionario: funcionarioSemSenha
  });
});

export default router;