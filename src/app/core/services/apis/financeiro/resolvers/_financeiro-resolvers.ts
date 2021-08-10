import { ComissionamentosPorIdResolver } from './comissionamento-por-id-resolver';
import { ComissionamentosResolver } from './comissionamento-resolver';
import { ContaCorrentePorIdIdResolver } from './conta-corrente-por-id.resolver';
import { ContasCorrenteResolver } from './contas-corrente.resolver';
import { GrupoLancamentoResolver } from './grupo-lancamento.resolver';
import { ProdutosPorIdResolver } from './produtos-por-id.resolver';
import { ProdutosResolver } from './produtos.resolver';

export const FinanceiroResolver = [
  ComissionamentosPorIdResolver,
  ComissionamentosResolver,
  ContaCorrentePorIdIdResolver,
  ContasCorrenteResolver,
  GrupoLancamentoResolver,
  ProdutosPorIdResolver,
  ProdutosResolver
]
