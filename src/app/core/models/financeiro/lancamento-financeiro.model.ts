export class LancamentoFinanceiroModel {
    id?: number;
    contratoId?: number;
    tipoLancamentoId?: number;
    modoPagamentoContaId?: number;
    codigoAutorizacao?: number;
    valor?: number;
    valorTitulo?: number;
    valorPago?: number;
    dataEmissao?: any;
    dataPagamento?: any;
    dataBaixa?: any;
    dataVencimento?: any;
    descricao?: string;
    status?: string;
    statusIntegracao?: string;
    carneId?: string;
    boletoId?: string;
    parcela?: number;
    url?: string;
    usuarioCadastro?: string;
    dataCadastro?: any;
    usuarioAlteracao?: string;
    dataAlteracao?: any;
    tipoLancamento?: TipoLancamento

    constructor(options: LancamentoFinanceiroModel = {}) {
        this.id = options.id || null;
        this.contratoId = options.contratoId || null;
        this.tipoLancamentoId = options.tipoLancamentoId || null;
        this.modoPagamentoContaId = options.modoPagamentoContaId || null;
        this.codigoAutorizacao = options.codigoAutorizacao || null;
        this.valor = options.valor || null;
        this.valorTitulo = options.valorTitulo || null;
        this.valorPago = options.valorPago || null;
        this.dataEmissao = options.dataEmissao || null;
        this.dataPagamento = options.dataPagamento || null;
        this.dataBaixa = options.dataBaixa || null;
        this.dataVencimento = options.dataVencimento || null;
        this.descricao = options.descricao || null;
        this.status = options.status || null;
        this.statusIntegracao = options.statusIntegracao || null;
        this.carneId = options.carneId || null;
        this.boletoId = options.boletoId || null;
        this.parcela = options.parcela || null;
        this.url = options.url || null;
        this.usuarioCadastro = options.usuarioCadastro || null;
        this.dataCadastro = options.dataCadastro || null;
        this.usuarioAlteracao = options.usuarioAlteracao || null;
        this.dataAlteracao = options.dataAlteracao || null;
        this.tipoLancamento = options.tipoLancamento || null;
    }
}

interface TipoLancamento {
    id?: number;
    descricao?: string;
    tipo?: string;
    valorPadrão?: number;
    ativo?: true;
    grupoLancamentoId?: number;
    usuarioAlteracao?: string;
    dataAlteracao?: any;
    usuarioCadastro?: string;
    dataCadastro?: any;
}
  