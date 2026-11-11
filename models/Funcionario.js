
import Pessoa from './Pessoa.js';
import bcrypt from 'bcryptjs';

export default class Funcionario extends Pessoa {
  constructor(nome, cpf, email, telefone, cargo, senha) {
    super(nome, cpf, email, telefone);

    this.cargo = cargo;
    this.senha = senha;
  }

  async autenticar(senhaInformada) {
    return await bcrypt.compare(senhaInformada, this.senha);
  }
}
