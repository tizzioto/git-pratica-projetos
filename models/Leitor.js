
import Pessoa from './Pessoa.js';

export default class Leitor extends Pessoa {
  static LIMITE_EMPRESTIMOS = 3;

  constructor(nome, cpf, email, telefone) {
    super(nome, cpf, email, telefone);
    this.emprestimos = [];
  }

  podeEmprestar() {
    const ativos = this.emprestimos.filter(
      emprestimo => emprestimo.status === 'Ativo'
    );

    return ativos.length < Leitor.LIMITE_EMPRESTIMOS;
  }
}
