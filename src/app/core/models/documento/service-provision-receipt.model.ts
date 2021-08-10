export class ServiceProvisionReceipt {
  bairroAluno?: string;
  cepAluno?: string;
  cidadeAluno?: string;
  cidadeEmpresa?: string;
  cnpjEmpresa?: string;
  cpfAluno?: string;
  creditos?: Array<Credito>;
  dataAtualExtenso?: string;
  enderecoAluno?: string;
  enderecoComplementoAluno?: string;
  enderecoNumeroAluno?: string;
  estadoAluno?: string;
  estadoEmpresa?: string;
  nomeAluno?: string;
  numeroRecibo?: number;
  parcelas?: Array<Parcela>;
  quantidadeParcelas?: number;
  razaoSocialEmpresa?: string;
  rgAluno?: string;
  rgExpedidoEmAluno?: string;
  rgExpedidoPorAluno?: string;
  valorTotal?: number;
  valorTotalExtenso?: string;
  
    constructor(
      options: ServiceProvisionReceipt = { }
    ) {
      this.bairroAluno = options.bairroAluno || null;
      this.cepAluno = options.cepAluno || null;
      this.cidadeAluno = options.cidadeAluno || null;
      this.cidadeEmpresa = options.cidadeEmpresa || null;
      this.cnpjEmpresa = options.cnpjEmpresa || null;
      this.cpfAluno = options.cpfAluno || null;
      this.creditos = options.creditos || null;
      this.dataAtualExtenso = options.dataAtualExtenso || null;
      this.enderecoAluno = options.enderecoAluno || null;
      this.enderecoComplementoAluno = options.enderecoComplementoAluno || null;
      this.enderecoNumeroAluno = options.enderecoNumeroAluno || null;
      this.estadoAluno = options.estadoAluno || null;
      this.estadoEmpresa = options.estadoEmpresa || null;
      this.nomeAluno = options.nomeAluno || null;
      this.numeroRecibo = options.numeroRecibo || null;
      this.parcelas = options.parcelas || null;
      this.quantidadeParcelas = options.quantidadeParcelas || null;
      this.razaoSocialEmpresa = options.razaoSocialEmpresa || null;
      this.rgAluno = options.rgAluno || null;
      this.rgExpedidoEmAluno = options.rgExpedidoEmAluno || null;
      this.rgExpedidoPorAluno = options.rgExpedidoPorAluno || null;
      this.valorTotal = options.valorTotal || null;
      this.valorTotalExtenso = options.valorTotalExtenso || null;
    }
}

interface Parcela {
  dataPagamento: string;
  dataVencimento: string;
  formaPagamento: string;
  lancamento: number;
  numDocumento: string;
  numeroParcela: number;
  observacao: string;
  valor: number
};

interface Credito {
  credito: string;
  lancamento: number;
  quantidade: number;
  servico: string
}
  