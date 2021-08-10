import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { ApplicationModules } from '../enums/application-modules.enum';

export interface MenuConfig {
  id: string;
  icon: string;
  name: string;
  onlyAssociated: boolean;
  submenus: SubMenu[];
  profilesToShowItems?: string[];
  disabled?: boolean;
}

interface SubMenu {
  name: string;
  route: string;
  type?: string;
  onlyAssociated: boolean;
  profilesToShowItems?: string[];
  disabled?: boolean;
}

export const menuConfig: MenuConfig[] = [
  {
    disabled: false,
    id: ApplicationModules.REGISTER,
    icon: 'list_alt',
    name: 'Cadastro',
    onlyAssociated: true,
    profilesToShowItems: ['ADMINISTRADOR', 'OPERADOR_N1', 'INSTRUTOR'],
    submenus: [
      {
        disabled: false,
        name: 'CFC',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.cfc}`,
      },
      {
        disabled: false,
        name: 'Instrutores',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.instructor}`,
      },
      {
        disabled: false,
        name: 'Locais',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.local}`,
      },
      {
        disabled: false,
        name: 'Matricula',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR', 'OPERADOR_N1', 'INSTRUTOR'],
        route: `/${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.enrollment}`,
      },
      {
        disabled: false,
        name: 'Usuários',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.user}`,
      },
      {
        disabled: false,
        name: 'Veículos',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.vehicle}`,
      },
    ],
  },
  {
    disabled: false,
    id: ApplicationModules.MANAGEMENT,
    icon: 'desktop_windows',
    name: 'Marcação De Exames',
    onlyAssociated: false,
    profilesToShowItems: ['ADMINISTRADOR', 'OPERADOR_N1', 'INSTRUTOR'],
    submenus: [
      {
        disabled: false,
        name: 'Marcação',
        onlyAssociated: false,
        profilesToShowItems: ['ADMINISTRADOR', 'OPERADOR_N1', 'INSTRUTOR'],
        route: `/${ROUTES_APLICATION.management.path}/${ROUTES_APLICATION.management.schedulingExams}/${ROUTES_APLICATION.add}`,
      },
      {
        disabled: false,
        name: 'Relatório',
        onlyAssociated: false,
        profilesToShowItems: ['ADMINISTRADOR', 'OPERADOR_N1', 'INSTRUTOR'],
        route: `/${ROUTES_APLICATION.management.path}/${ROUTES_APLICATION.management.schedulingExams}/${ROUTES_APLICATION.management.report}`,
      },
      {
        disabled: false,
        name: 'Disponibilidade',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.management.path}/${ROUTES_APLICATION.management.availability}`,
      },
      {
        disabled: false,
        name: 'Bloqueio de Disponibilidade',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.management.path}/${ROUTES_APLICATION.management.block}`,
      },
    ],
  },
  {
    disabled: false,
    id: ApplicationModules.SCHEDULING,
    icon: 'event_note',
    name: 'Agendamento',
    onlyAssociated: true,
    profilesToShowItems: ['ADMINISTRADOR', 'OPERADOR_N1', 'INSTRUTOR'],
    submenus: [
      {
        disabled: false,
        name: 'Prático',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR', 'INSTRUTOR'],
        route: `/${ROUTES_APLICATION.schedule.path}/${ROUTES_APLICATION.schedule.practical}`,
      },
      {
        disabled: false,
        name: 'Teórico',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR', 'OPERADOR_N1', 'INSTRUTOR'],
        route: `/${ROUTES_APLICATION.schedule.path}/${ROUTES_APLICATION.schedule.theory}`,
      },
      {
        disabled: false,
        name: 'Consulta Disponibilidade',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR', 'OPERADOR_N1', 'INSTRUTOR'],
        route: `/${ROUTES_APLICATION.schedule.path}/${ROUTES_APLICATION.schedule.availableClasses}`,
      },
      {
        disabled: false,
        name: 'Grade',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR', 'OPERADOR_N1', 'INSTRUTOR'],
        route: `/${ROUTES_APLICATION.schedule.path}/${ROUTES_APLICATION.schedule.grid}`,
      },
      {
        disabled: false,
        name: 'Grade Serviço',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR', 'OPERADOR_N1', 'INSTRUTOR'],
        route: `/${ROUTES_APLICATION.schedule.path}/${ROUTES_APLICATION.schedule.serviceGrid}`,
      },
    ],
  },
  {
    disabled: false,
    id: ApplicationModules.FINANCIAL,
    icon: 'attach_money',
    name: 'Financeiro',
    onlyAssociated: true,
    profilesToShowItems: ['ADMINISTRADOR'],
    submenus: [
      {
        name: 'Auditoria Parceria',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.financial.path}/${ROUTES_APLICATION.financial.audit}`,
      },
      {
        name: 'Comissionamento',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.financial.path}/${ROUTES_APLICATION.financial.commissioning}`,
      },
      {
        name: 'Conta Corrente',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.financial.path}/${ROUTES_APLICATION.financial.bankAccount}`,
      },
      {
        name: 'Contratos',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.financial.path}/${ROUTES_APLICATION.financial.contracts}`,
      },
      {
        name: 'Fluxo de Caixa',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.financial.path}/${ROUTES_APLICATION.financial.cashFlow}`,
      },
      {
        name: 'Grupo de Lançamento',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.financial.path}/${ROUTES_APLICATION.financial.releaseGroup}`,
      },
      {
        name: 'Tipos de Lançamento',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.financial.path}/${ROUTES_APLICATION.financial.releaseGroupTypes}`,
      },
      {
        name: 'Produtos',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.financial.path}/${ROUTES_APLICATION.financial.products}`,
      },
      {
        name: 'Crédito de Matrículas',
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        route: `/${ROUTES_APLICATION.financial.path}/${ROUTES_APLICATION.financial.enrollmentCredit}`,
      },
    ],
  },
  {
    disabled: false,
    id: ApplicationModules.ONLINE_CLASS,
    icon: 'video_call',
    name: 'Parcerias',
    onlyAssociated: true,
    profilesToShowItems: ['ADMINISTRADOR', 'OPERADOR_N1', 'INSTRUTOR'],
    submenus: [
      {
        disabled: false,
        name: 'Ambiente de Tele Aula',
        route: `${ROUTES_APLICATION.virtual.path}`,
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR', 'OPERADOR_N1', 'INSTRUTOR'],
        type: 'external',
      },
      {
        disabled: false,
        name: 'Ambiente de Monitoramento Prático',
        route: `${ROUTES_APLICATION.ambienteMonitoramento.path}`,
        onlyAssociated: true,
        profilesToShowItems: ['ADMINISTRADOR'],
        type: 'external',
      },
    ],
  },
];
