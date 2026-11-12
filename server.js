import 'dotenv/config';
import app from './index.js';
import { funcionarios } from './data/store.js';
import Funcionario from './models/Funcionario.js';
import bcrypt from 'bcryptjs';

const PORT = 3000;

async function iniciarServidor() {
  // Criar o primeiro administrador, caso não exista funcionário
  if (funcionarios.length === 0) {
    const { ADMIN_NOME, ADMIN_CPF, ADMIN_EMAIL, ADMIN_TELEFONE, ADMIN_SENHA } = process.env;

    if (!ADMIN_NOME || !ADMIN_CPF || !ADMIN_EMAIL || !ADMIN_TELEFONE || !ADMIN_SENHA) {
      console.log('Configure os dados do administrador inicial para realizar o primeiro acesso.');
    } else {
      const senhaHash = await bcrypt.hash(ADMIN_SENHA, 10);

      const administrador = new Funcionario(
        ADMIN_NOME,
        ADMIN_CPF,
        ADMIN_EMAIL,
        ADMIN_TELEFONE,
        'Administrador',
        senhaHash
      );

      administrador.id = 1;
      funcionarios.push(administrador);

      console.log('Administrador inicial criado com sucesso!');
    }
  }

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

iniciarServidor();
