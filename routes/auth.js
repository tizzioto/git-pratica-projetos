import express from 'express';
import { randomUUID } from 'node:crypto';
import { funcionarios, sessoes } from '../data/store.js';

const router = express.Router();

// Realizar login de funcionário
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

  const token = randomUUID();

  const perfil = funcionario.cargo.toLowerCase() === 'administrador'
    ? 'administrador'
    : 'bibliotecaria';

  sessoes.set(token, {
    cpf: funcionario.cpf,
    perfil,
    ultimaAtividade: Date.now()
  });

  const { senha: senhaOculta, ...funcionarioSemSenha } = funcionario;

  res.status(200).json({
    mensagem: 'Login realizado com sucesso!',
    funcionario: funcionarioSemSenha,
    perfil,
    token
  });
});

export default router;