export interface Produto {
  produtoId?: string;
  nome: string;
  validade: Date;
  dataFabricacao: Date;
  lote: string;
  ingredientes: string;
  descricao: string;
  marca: string;
  peso: number;
  preco: number;
  unidadeMedida: string;
  paisOrigem: string;
  tags: string[];
  categorias: string[];
}
