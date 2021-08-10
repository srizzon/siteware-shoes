import { DateAndTimePipe } from './date-and-time.pipe';
import { CnpjPipe } from './cnpj.pipe';
import { CpfPipe } from './cpf.pipe';
import { DateToFront } from './date-to-front.pipe';
import { FormatName } from './format-name.pipe';
import { RemoveUnderscorePipe } from './remove-underscore.pipe';
import { SituationPipe } from './situation.pipe';
import { SituationRegistrationPipe } from './situation-registration.pipe';
import { TimeToFrontPipe } from './time-to-front.pipe';
import { TrueFalsePipe } from './truefalse.pipe';
import { TurnPipe } from './turn.pipe';
import { TypeReleasePipe } from './type-release.pipe';

export const Pipes = [
  CnpjPipe,
  CpfPipe,
  DateToFront,
  DateAndTimePipe,
  FormatName,
  SituationPipe,
  SituationRegistrationPipe,
  RemoveUnderscorePipe,
  TimeToFrontPipe,
  TrueFalsePipe,
  TypeReleasePipe,
  TurnPipe
];
