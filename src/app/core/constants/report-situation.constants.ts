import { ConstantModel } from './../models/outros/constant.model';

export const REPORT_SITUATION: ConstantModel[] = [
  {
    id: 1,
    descricao: 'AGENDADO',
    enum: 'AGENDADO',
  },
  {
    id: 2,
    descricao: 'ENVIADO',
    enum: 'ENVIADO',
  },
  {
    id: 3,
    descricao: 'CONFIRMADO',
    enum: 'CONFIRMADO',
  },
  {
    id: 4,
    descricao: 'CANCELADO',
    enum: 'CANCELADO',
  },
  {
    id: 99,
    descricao: 'ERRO',
    enum: 'ERRO',
  },
];
