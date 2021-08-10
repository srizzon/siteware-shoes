export class ServiceProvisionContract {
    agencia?: string;
    bairroAluno?: string;
    bairroEmpresa?: string;
    cidadeAluno?: string;
    cidadeEmpresa?: string;
    cnpjEmpresa?: string;
    conta?: string;
    cpfAluno?: string;
    dataAtualExtenso?: string;
    dataParcela?: string;
    enderecoAluno?: string;
    enderecoComplementoAluno?: string;
    enderecoComplementoEmpresa?: string;
    enderecoEmpresa?: string;
    enderecoNumeroAluno?: string;
    enderecoNumeroEmpresa?: string;
    estadoAluno?: string;
    estadoCivilAluno?: string;
    estadoEmpresa?: string;
    nomeAluno?: string;
    profissaoAluno?: string;
    razaoSocialEmpresa?: string;
    rgAluno?: string;
    rgExpedidoEmAluno?: string;
    rgExpedidoPorAluno?: string;
    valorDemaisParcelas?: number;
    valorDemaisParcelasExtenso?: string;
    valorPrimeiraParcela?: number;
    valorPrimeiraParcelaExtenso?: string;
    valorTaxaExamePratico?: number;
    valorTaxaReprovacao?: number;
    valorTaxaUsoCarro?: number;
    valorTotal?: number;
    valorTotalExtenso?: string;
  
    constructor(
      options: ServiceProvisionContract = { }
    ) {
        this.agencia = options.agencia || null
        this.bairroAluno = options.bairroAluno || null
        this.bairroEmpresa = options.bairroEmpresa || null
        this.cidadeAluno = options.cidadeAluno || null
        this.cidadeEmpresa = options.cidadeEmpresa || null
        this.cnpjEmpresa = options.cnpjEmpresa || null
        this.conta = options.conta || null
        this.cpfAluno = options.cpfAluno || null
        this.dataAtualExtenso = options.dataAtualExtenso || null
        this.dataParcela = options.dataParcela || null
        this.enderecoAluno = options.enderecoAluno || null
        this.enderecoComplementoAluno = options.enderecoComplementoAluno || null
        this.enderecoComplementoEmpresa = options.enderecoComplementoEmpresa || null
        this.enderecoEmpresa = options.enderecoEmpresa || null
        this.enderecoNumeroAluno = options.enderecoNumeroAluno || null
        this.enderecoNumeroEmpresa = options.enderecoNumeroEmpresa || null
        this.estadoAluno = options.estadoAluno || null
        this.estadoCivilAluno = options.estadoCivilAluno || null
        this.estadoEmpresa = options.estadoEmpresa || null
        this.nomeAluno = options.nomeAluno || null
        this.profissaoAluno = options.profissaoAluno || null
        this.razaoSocialEmpresa = options.razaoSocialEmpresa || null
        this.rgAluno = options.rgAluno || null
        this.rgExpedidoEmAluno = options.rgExpedidoEmAluno || null
        this.rgExpedidoPorAluno = options.rgExpedidoPorAluno || null
        this.valorDemaisParcelas = options.valorDemaisParcelas || null
        this.valorDemaisParcelasExtenso = options.valorDemaisParcelasExtenso || null
        this.valorPrimeiraParcela = options.valorPrimeiraParcela || null
        this.valorPrimeiraParcelaExtenso = options.valorPrimeiraParcelaExtenso || null
        this.valorTaxaExamePratico = options.valorTaxaExamePratico || null
        this.valorTaxaReprovacao = options.valorTaxaReprovacao || null
        this.valorTaxaUsoCarro = options.valorTaxaUsoCarro || null
        this.valorTotal = options.valorTotal || null
        this.valorTotalExtenso = options.valorTotalExtenso || null
    }
}
  