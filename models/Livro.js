
export default class Livro {
  constructor(
    titulo,
    autor,
    isbn = null,
    editora = null,
    anoPublicacao = null,
    categoria = null,
    quantidadeDisponivel = 1
  ) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.editora = editora;
    this.anoPublicacao = anoPublicacao;
    this.categoria = categoria;
    this.quantidadeDisponivel = quantidadeDisponivel;
  }

  get disponivel() {
    return this.estaDisponivel();
  }

  estaDisponivel() {
    return this.quantidadeDisponivel > 0;
  }

  baixarExemplar() {
    if (!this.estaDisponivel()) {
      throw new Error('Livro indisponível.');
    }

    this.quantidadeDisponivel--;
  }

  devolverExemplar() {
    this.quantidadeDisponivel++;
  }
}
