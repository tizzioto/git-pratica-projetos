
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
    const diferenca = dataDevolucao - dataPrevista;
    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));

    return Math.max(0, dias);
  }
}
