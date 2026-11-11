import express from 'express';
import { funcionarios } from '../data/store.js';
import Funcionario from '../models/Funcionario.js';
import bcrypt from 'bcryptjs';
import { autenticar, autorizar } from '../middleware/auth.js';

const router = express.Router();

// Cadastrar funcionário
router.post('/', autenticar, autorizar('administrador'), async (req, res) => {
  const { nome, cpf, email, telefone, cargo, senha } = req.body;

  if (!nome || !cpf || !email || !telefone || !cargo || !senha) {
    return res.status(400).json({
      mensagem: 'Todos os campos são obrigatórios.'
    });
  }

  const cargoNormalizado = cargo.trim().toLowerCase();

  const cargosPermitidos = ['bibliotecária', 'administrador'];

  if (!cargosPermitidos.includes(cargoNormalizado)) {
    return res.status(400).json({
      mensagem: 'Cargo inválido. Informe Bibliotecária ou Administrador.'
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
  const cargoFinal = cargoNormalizado === 'administrador'
    ? 'Administrador'
    : 'Bibliotecária';

  const funcionario = new Funcionario(
    nome,
    cpf,
    email,
    telefone,
    cargoFinal,
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
