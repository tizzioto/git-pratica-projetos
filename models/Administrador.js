
import Funcionario from './Funcionario.js';

export default class Administrador extends Funcionario {
  constructor(nome, cpf, email, telefone, senha) {
    super(nome, cpf, email, telefone, 'Administrador', senha);
  }
}
