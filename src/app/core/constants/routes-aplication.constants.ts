export const ROUTES_APLICATION = {

  home: 'home',
  notAllowed: 'nao-permitido',
  add: 'adicionar',
  detail: 'detalhes',

  financial: {
    path: 'financeiro',

    audit: 'auditoria',
    bankAccount: 'conta-corrente',
    cashFlow: 'fluxocaixa',
    contracts: 'contratos',
    enrollmentCredit: 'creditos-matricula',
    payments: 'pagamentos',
    products: 'produtos',
    releaseGroup: 'grupo-lancamento',
    releaseGroupTypes: 'tipos-lancamento',
    commissioning: 'comissionamento',
  },

  register: {
    path: 'cadastro',

    candidate: 'candidato',
    cfc: 'cfc',
    course: 'curso',
    enrollment: 'matricula',
    enrollmentData: 'dados-do-candidato',
    instructor: 'instrutor',
    local: 'local',
    user: 'usuarios',
    vehicle: 'veiculo'
  },

  schedule: {
    path: 'agendamento',

    addCandidateToClass: 'adicionar-candidato-a-aula',
    availableClasses: 'aulas-disponiveis',
    availableClassesCandidates: 'gerenciar-alunos-aula',
    availableClassesDetail: 'detalhes-da-aula',
    grid: 'grade',
    manageSchedule: 'gerenciar-agendamento',
    practical: 'pratico',
    serviceGrid: 'grade-de-servicos',
    theory: 'teorico',
  },

  management: {
    path: 'gestao',

    availability: 'disponiblidade-marcacao-exame',
    block: 'bloqueio-marcacao-exame',
    calendario: 'calendario',
    report: 'relatorio',
    schedulingExams: 'marcacao-de-exames',
  },

  virtual: {
    path: 'https://cfcvirtual.startbio.com.br/',
    environment: 'ambiente',
  },

  ambienteMonitoramento: {
    path: 'https://teleaula-dev.startbio.com.br/',
    environment: 'ambiente'
  },

  monitoring: {
    path: 'monitoramento',
    classReport: 'relatorio-aula-pratica',
    classInProgress: 'aulas-em-andamento',
    course: 'curso',
    device: 'dispositivo',
    lessonPlan: 'plano-de-aulas',
    programContent: 'conteudo-programatico'
  },
};
