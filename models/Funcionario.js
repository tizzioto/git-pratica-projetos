
import Pessoa from './Pessoa.js';

export default class Funcionario extends Pessoa {
  constructor(nome, cpf, email, telefone, cargo, senha) {
    super(nome, cpf, email, telefone);

    this.cargo = cargo;
    this.senha = senha;
  }

  autenticar(senhaInformada) {
    return this.senha === senhaInformada;
  }
}
