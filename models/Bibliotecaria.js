
import Funcionario from './Funcionario.js';

export default class Bibliotecaria extends Funcionario {
  constructor(nome, cpf, email, telefone, senha) {
    super(nome, cpf, email, telefone, 'Bibliotecária', senha);
  }
}
