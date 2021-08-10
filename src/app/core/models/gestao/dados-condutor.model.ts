export class DadosCondutor {
    operacao?: string;
    retorno?: string;
    renach?: string;
    cpfAluno?: string;
    rgAluno?: string;
    orgaoEmissorRg?: string;
    estadoRgAluno?: string;
    codigoCFC?: string;
    codigoFilialCFC?: string;
    nomeAluno?: string;
    nomeMae?: string;
    nomePai?: string;
    dataNascimento?: string;
    sexo?: string;
    naturalidade?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    municipio?: string;
    estado?: string;
    cep?: string;
    servico?: string;
    bancaEspecial?: string;
    tipoRequerimento?: string;
    dataRequerimento?: string;
    etapaAtual?: string;
    categoriaPretend?: string;
    categoriaAproMed?: string;
    categoriaAproPsi?: string;
    validadeExames?: string;
    validadeLADV?: string;
    numeroLADV?: string;
    qtdeAulaNotSim?: string;
    qtdeAulaDiaSim?: string;
    telefone?: string;
    codigoSituacao?: string;
    descricaoSituac?: string;
    stAutoDig?: string;
    statusMessages?: string[]

    constructor(
      options: DadosCondutor = {}
    ) {
      this.operacao = options.operacao || null;
      this.retorno = options.retorno || null;
      this.renach = options.renach || null;
      this.cpfAluno = options.cpfAluno || null;
      this.rgAluno = options.rgAluno || null;
      this.orgaoEmissorRg = options.orgaoEmissorRg || null;
      this.estadoRgAluno = options.estadoRgAluno || null;
      this.codigoCFC = options.codigoCFC || null;
      this.codigoFilialCFC = options.codigoFilialCFC || null;
      this.nomeAluno = options.nomeAluno || null;
      this.nomeMae = options.nomeMae || null;
      this.nomePai = options.nomePai || null;
      this.dataNascimento = options.dataNascimento || null;
      this.sexo = options.sexo || null;
      this.naturalidade = options.naturalidade || null;
      this.logradouro = options.logradouro || null;
      this.numero = options.numero || null;
      this.complemento = options.complemento || null;
      this.bairro = options.bairro || null;
      this.municipio = options.municipio || null;
      this.estado = options.estado || null;
      this.cep = options.cep || null;
      this.servico = options.servico || null;
      this.bancaEspecial = options.bancaEspecial || null;
      this.tipoRequerimento = options.tipoRequerimento || null;
      this.dataRequerimento = options.dataRequerimento || null;
      this.etapaAtual = options.etapaAtual || null;
      this.categoriaPretend = options.categoriaPretend || null;
      this.categoriaAproMed = options.categoriaAproMed || null;
      this.categoriaAproPsi = options.categoriaAproPsi || null;
      this.validadeExames = options.validadeExames || null;
      this.validadeLADV = options.validadeLADV || null;
      this.numeroLADV = options.numeroLADV || null;
      this.qtdeAulaNotSim = options.qtdeAulaNotSim || null;
      this.qtdeAulaDiaSim = options.qtdeAulaDiaSim || null;
      this.telefone = options.telefone || null;
      this.codigoSituacao = options.codigoSituacao || null;
      this.descricaoSituac = options.descricaoSituac || null;
      this.stAutoDig = options.stAutoDig || null;
      this.statusMessages = options.statusMessages || null;
    }
}
