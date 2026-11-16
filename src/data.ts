/**
 * Estação Ribeirinha • dados do demonstrador
 * Todos os níveis, alertas, comunidades e endereços deste módulo são FICTÍCIOS.
 * As entidades acompanham o Database Design Oracle de 6 tabelas:
 * COMUNIDADE, ESTACAO, LEITURA_RIO, LEITURA_ENERGIA, DEFESA_CIVIL, ALERTA.
 */
interface StationSeed {
  id: number; code: string; community: string; municipality: string; state: string;
  river: string; attention: number; critical: number; level: number;
  operationalStatus: 'ATIVA' | 'MANUTENCAO'; defense: string;
  history: number[];
}
interface AlertSeed {
  id: number; stationId: number; levelCm: number; type: 'ATENCAO' | 'CRITICO';
  status: 'PENDENTE' | 'ENVIADO' | 'RECEBIDO' | 'FALHA'; createdAt: string;
  sentAt: string | null; receivedAt: string | null;
}
interface SiteSeed {
  stations: StationSeed[];
  alerts: AlertSeed[];
  energy: { initialWh: number; dailyWh: number; durationDays: number };
  features: Record<string, { label: string; title: string; description: string }>;
}
const siteSeed: SiteSeed = {
  stations: [
    {id:101, code:'ER-001', community:'Comunidade Simulada A', municipality:'Coari', state:'AM', river:'Rio Solimões', attention:350, critical:420, level:365, operationalStatus:'ATIVA', defense:'Defesa Civil • Coari (simulada)', history:[285,298,308,317,330,340,365]},
    {id:102, code:'ER-002', community:'Comunidade Simulada B', municipality:'Manaus', state:'AM', river:'Rio Negro', attention:300, critical:390, level:405, operationalStatus:'ATIVA', defense:'Defesa Civil • Manaus (simulada)', history:[275,286,300,331,355,375,405]},
    {id:103, code:'ER-003', community:'Comunidade Simulada C', municipality:'Parintins', state:'AM', river:'Rio Amazonas', attention:400, critical:470, level:480, operationalStatus:'ATIVA', defense:'Defesa Civil • Parintins (simulada)', history:[390,399,402,420,443,457,480]},
    {id:104, code:'ER-004', community:'Comunidade Simulada D', municipality:'Tefé', state:'AM', river:'Rio Tefé', attention:250, critical:340, level:345, operationalStatus:'MANUTENCAO', defense:'Defesa Civil • Tefé (simulada)', history:[215,220,227,241,260,287,345]},
    {id:105, code:'ER-005', community:'Comunidade Simulada E', municipality:'Manacapuru', state:'AM', river:'Rio Purus', attention:360, critical:430, level:440, operationalStatus:'ATIVA', defense:'Defesa Civil • Manacapuru (simulada)', history:[315,321,337,351,370,397,440]}
  ],
  alerts: [
    {id:4001,stationId:101,levelCm:365,type:'ATENCAO',status:'PENDENTE',createdAt:'2026-11-04T09:31:00',sentAt:null,receivedAt:null},
    {id:4002,stationId:102,levelCm:375,type:'ATENCAO',status:'ENVIADO',createdAt:'2026-11-04T09:41:00',sentAt:'2026-11-04T09:42:00',receivedAt:null},
    {id:4003,stationId:102,levelCm:405,type:'CRITICO',status:'RECEBIDO',createdAt:'2026-11-04T10:06:00',sentAt:'2026-11-04T10:07:00',receivedAt:'2026-11-04T10:08:00'},
    {id:4004,stationId:103,levelCm:412,type:'ATENCAO',status:'RECEBIDO',createdAt:'2026-11-04T10:21:00',sentAt:'2026-11-04T10:22:00',receivedAt:'2026-11-04T10:25:00'},
    {id:4005,stationId:103,levelCm:480,type:'CRITICO',status:'PENDENTE',createdAt:'2026-11-04T11:01:00',sentAt:null,receivedAt:null},
    {id:4006,stationId:105,levelCm:370,type:'ATENCAO',status:'ENVIADO',createdAt:'2026-11-04T09:01:00',sentAt:'2026-11-04T09:02:00',receivedAt:null},
    {id:4007,stationId:105,levelCm:440,type:'CRITICO',status:'RECEBIDO',createdAt:'2026-11-04T12:01:00',sentAt:'2026-11-04T12:02:00',receivedAt:'2026-11-04T12:05:00'}
  ],
  energy:{initialWh:250,dailyWh:47,durationDays:4},
  features:{
    solar:{label:'ENERGIA RENOVÁVEL',title:'Painel solar',description:'Capta energia durante o dia e contribui para recarregar a reserva elétrica da estação. A geração depende da luz disponível.'},
    bateria:{label:'AUTONOMIA',title:'Bateria de apoio',description:'Armazena energia para manter medições, luz localizada e recargas pequenas por tempo limitado, inclusive em períodos sem geração solar.'},
    sensor:{label:'MONITORAMENTO',title:'Sensor de nível',description:'Registra mudanças da altura da água em um ponto de referência. Precisa de calibração e não prevê, sozinho, a ocorrência de uma enchente.'},
    alerta:{label:'INFORMAÇÃO LOCAL',title:'Sinalização visual e sonora',description:'LEDs indicam a condição local a partir de limites configurados; o aviso pode funcionar sem internet, enquanto houver energia.'},
    luz:{label:'ENERGIA ESSENCIAL',title:'Iluminação e recarga',description:'Fornece energia de apoio para iluminação, lanternas recarregáveis e pequenos dispositivos utilizados no cotidiano ribeirinho.'}
  }
};
(window as unknown as { RIBEIRINHA_DATA: SiteSeed }).RIBEIRINHA_DATA=siteSeed;
