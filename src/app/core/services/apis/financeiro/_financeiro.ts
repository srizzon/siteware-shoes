import { VendaService } from './vendas.service';
import { GrupoLancamentoService } from './grupo-lancamento.service';
import { FinanceiroResolver } from './resolvers/_financeiro-resolvers';
import { BancoService } from '@services/apis/financeiro/banco.service';
import { ComissionamentoService } from '@services/apis/financeiro/comissionamento.service';
import { ContaCorrenteService } from '@services/apis/financeiro/conta-corrente.service';
import { ContratoFinanceiroService } from '@services/apis/financeiro/contrato-financeiro.service';
import { FinancialService } from '@services/apis/financeiro/financial.service';
import { GerenciaNetService } from '@services/apis/financeiro/gerencianet.service';
import { ProdutoService } from '@services/apis/financeiro/produto.service';

export const FinanceiroServices = [
  BancoService,
  ComissionamentoService,
  ContaCorrenteService,
  ContratoFinanceiroService,
  FinancialService,
  GerenciaNetService,
  GrupoLancamentoService,
  ProdutoService,
  VendaService,
  FinanceiroResolver
]
