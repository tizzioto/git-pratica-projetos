
export default class Emprestimo {
  constructor(id, leitorId, leitorNome, livroId, tituloLivro) {
    this.id = id;
    this.leitorId = leitorId;
    this.leitorNome = leitorNome;
    this.livroId = livroId;
    this.tituloLivro = tituloLivro;

    this.dataEmprestimo = new Date();
    this.dataPrevistaDevolucao = new Date();
    this.dataPrevistaDevolucao.setDate(
      this.dataPrevistaDevolucao.getDate() + 14
    );

    this.dataDevolucao = null;
    this.status = 'Ativo';
  }

  registrarDevolucao() {
    if (this.status === 'Devolvido') {
      throw new Error('Este empréstimo já foi devolvido.');
    }

    this.dataDevolucao = new Date();
    this.status = 'Devolvido';
  }

  estaAtrasado() {
    return (
      this.status === 'Ativo' &&
      new Date() > this.dataPrevistaDevolucao
    );
  }
}
