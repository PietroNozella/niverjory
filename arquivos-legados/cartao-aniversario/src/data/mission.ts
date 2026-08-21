export type TextChallenge = {
  type: "text";
  question: string;
  acceptedAnswers: string[];
  successMessage: string;
  hint?: string;
  encryptedMessage?: string;
};

export type TreatiesChallenge = {
  type: "treaties";
  treaties: string[];
};

export type VoteChallenge = {
  type: "vote";
  resolution: string;
  options: string[];
  result: string;
};

export type FinalChallenge = {
  type: "final";
};

export type MissionChallenge =
  | TextChallenge
  | TreatiesChallenge
  | VoteChallenge
  | FinalChallenge;

export type MissionFolder = {
  id: string;
  code: string;
  title: string;
  description: string;
  content?: string;
  challenge: MissionChallenge;
};

export const missionConfig = {
  friendName: "Ana Sara",
  title: "Operação Borahae: Missão Aniversário",
  subtitle: "Dossiê confidencial preparado para Ana Sara",
  intro:
    "Agente, você foi convocada para uma missão especial. O equilíbrio emocional do mundo depende da abertura deste dossiê de aniversário.",
  folders: [
    {
      id: "agent-identity",
      code: "Pasta 01",
      title: "Identidade da Agente",
      description: "Confirme suas credenciais diplomáticas antes de prosseguir.",
      content:
        "Antes de qualquer negociação internacional, este dossiê registra uma verdade oficial: você é uma pessoa rara, inteligente, querida e absurdamente digna de celebração.",
      challenge: {
        type: "text",
        question:
          "Qual organização internacional foi criada para promover paz e segurança entre as nações?",
        acceptedAnswers: ["ONU"],
        successMessage: "Identidade confirmada. A missão reconhece sua autoridade.",
      },
    },
    {
      id: "bts-security-council",
      code: "Pasta 02",
      title: "Conselho de Segurança do BTS",
      description: "Ative o protocolo roxo de cooperação emocional.",
      content:
        "O conselho se reúne em sessão extraordinária para reconhecer uma aliança estratégica entre carinho, música boa e aniversários memoráveis.",
      challenge: {
        type: "text",
        question:
          "Sou uma cor, uma promessa e uma forma de dizer 'eu te amo' no universo BTS. Quem sou?",
        acceptedAnswers: ["borahae", "purple", "roxo", "i purple you"],
        successMessage: "Amor roxo reconhecido. Protocolo Borahae ativado.",
      },
    },
    {
      id: "diplomatic-cipher",
      code: "Pasta 03",
      title: "Cifra Diplomática",
      description: "Decifre a mensagem que viajou por canais confidenciais.",
      challenge: {
        type: "text",
        encryptedMessage: "Iholc Dqlyhuvdulr",
        hint:
          "Às vezes, na diplomacia, é preciso recuar 3 posições para entender a mensagem.",
        question: "Qual é a mensagem decifrada?",
        acceptedAnswers: ["Feliz Aniversario", "Feliz Aniversário"],
        successMessage: "Cifra decodificada. A diplomacia sorriu discretamente.",
      },
    },
    {
      id: "friendship-treaties",
      code: "Pasta 04",
      title: "Tratados Internacionais da Amizade",
      description: "Ratificar alianças essenciais para o novo ciclo.",
      content:
        "Nenhuma missão segue adiante sem acordos sólidos, assinados com lealdade, memes e apoio em dias intensos.",
      challenge: {
        type: "treaties",
        treaties: [
          "Tratado de Apoio em Dias Difíceis",
          "Acordo Bilateral de Mandar Memes",
          "Pacto de Ouvir Surtos Acadêmicos",
          "Convenção Internacional do Bolo Obrigatório",
          "Protocolo Borahae Permanente",
        ],
      },
    },
    {
      id: "birthday-general-assembly",
      code: "Pasta 05",
      title: "Assembleia Geral dos Parabéns",
      description: "Vote a resolução comemorativa do dia.",
      challenge: {
        type: "vote",
        resolution:
          "A Assembleia Geral vota a seguinte resolução: hoje é oficialmente proibido ficar triste.",
        options: ["Aprovar", "Aprovar com entusiasmo", "Aprovar ouvindo BTS"],
        result: "Resolução aprovada por unanimidade.",
      },
    },
    {
      id: "official-communique",
      code: "Pasta Final",
      title: "Comunicado Oficial",
      description: "Mensagem final liberada apenas para agentes especiais.",
      challenge: {
        type: "final",
      },
    },
  ] satisfies MissionFolder[],
  finalMessage: [
    "Após análise cuidadosa do Conselho Internacional das Pessoas Incríveis, foi decidido por unanimidade que hoje o mundo deve celebrar você.",
    "Que seu novo ciclo venha com descobertas, coragem, viagens, sonhos realizados, músicas boas, muito BTS, muitos motivos para sorrir e pessoas que reconheçam o quanto você é especial.",
    "Feliz aniversário. Que sua vida seja sempre uma diplomacia bonita entre quem você é, quem você ama e tudo aquilo que ainda vai conquistar.",
  ],
  easterEggs: {
    army: "Código ARMY reconhecido. OT7 aprovaria esta missão.",
    ot7: "Protocolo OT7 desbloqueado.",
  },
};
