import { ConstantModel } from './../models/outros/constant.model';

export const EVENT_MONITORAMENTO: ConstantModel[] = [
  {
    id: 1,
    descricao: 'INÍCIO AULA',
    enum: 'INICIO_AULA',
  },
  {
    id: 2,
    descricao: 'FALTA',
    enum: 'FALTA',
  },
  {
    id: 3,
    descricao: 'LOCALIZAÇÃO',
    enum: 'LOCALIZACAO',
  },
  {
    id: 4,
    descricao: 'FOTO',
    enum: 'FOTO',
  },
  {
    id: 5,
    descricao: 'ENCERRAMENTO AULA',
    enum: 'ENCERRAMENTO_AULA',
  }
];
