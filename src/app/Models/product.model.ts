export interface Produto {
  id: number;
  nome: string;
  validade: Date;
  ingredientes: string;
  descricao: string;
  marca: string;
  peso: number;
  unidadeDeMedida: string;
  paisOrigem: string;
  categoria: string;
  // alergicos: string;
  // historiaProduto: string;
  // tabelaNutricional: string;
}
