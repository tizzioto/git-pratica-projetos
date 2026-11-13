
export default class Multa {
  static VALOR_POR_DIA = 1.00;

  constructor(emprestimo) {
    this.emprestimoId = emprestimo.id;
    this.diasAtraso = this.calcularDiasAtraso(
      emprestimo.dataPrevistaDevolucao,
      emprestimo.dataDevolucao
    );

    this.valor = this.diasAtraso * Multa.VALOR_POR_DIA;
  }

  calcularDiasAtraso(dataPrevista, dataDevolucao) {
    const prevista = new Date(dataPrevista);
    const devolucao = new Date(dataDevolucao);

    prevista.setUTCHours(0, 0, 0, 0);
    devolucao.setUTCHours(0, 0, 0, 0);

    const diferenca = devolucao - prevista;
    const dias = diferenca / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.floor(dias));
  }
}
