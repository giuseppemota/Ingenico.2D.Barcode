export interface Produto {
  produtoId?: string;
  nome: string;
  validade: Date;
  ingredientes: string;
  descricao: string;
  marca: string;
  peso: number;
  preco: number;
  unidadeMedida: string;
  paisOrigem: string;
  categoria: string;
  // alergicos: string;
  // historiaProduto: string;
  // tabelaNutricional: string;
  //categorias: string[]; // Ajuste conforme a estrutura real
  //tags: string[]; // Ajuste conforme a estrutura real
}
