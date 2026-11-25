export interface PolicySection {
  id: string;
  tabLabel: string;
  title: string;
  badge: string;
  items: { heading: string; body: string }[];
}

export const POLICY_SECTIONS: PolicySection[] = [
  {
    id: "privacidade",
    tabLabel: "Privacidade & LGPD",
    badge: "Lei nº 13.709/2018",
    title: "Política de Privacidade e Proteção de Dados",
    items: [
      {
        heading: "1. Controladora dos Dados",
        body: "Este site é mantido por Nayara Oliveira Studio (@nayara_designernail), responsável pelo tratamento dos dados pessoais coletados nesta página, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).",
      },
      {
        heading: "2. Dados Coletados e Finalidade",
        body: "Coletamos apenas os dados que você informa voluntariamente no formulário de pré-agendamento (nome, número de WhatsApp, serviço ou curso escolhido e data preferida), exclusivamente para responder sua solicitação, confirmar horários e prestar atendimento personalizado.",
      },
      {
        heading: "3. Base Legal e Não Comercialização",
        body: "O tratamento ocorre mediante seu consentimento e para execução de atendimento pré-contratual. Não vendemos, alugamos ou comercializamos seus dados pessoais com terceiros em nenhuma hipótese.",
      },
      {
        heading: "4. Armazenamento, Segurança e Seus Direitos",
        body: "Os dados são mantidos apenas pelo tempo necessário ao atendimento ou cumprimento de obrigação legal. A qualquer momento você pode solicitar acesso, correção, portabilidade ou exclusão dos seus dados diretamente pelo WhatsApp (+55 62 99211-8416) ou pelo Instagram @nayara_designernail.",
      },
    ],
  },
  {
    id: "meta",
    tabLabel: "Políticas da Meta",
    badge: "Meta, Instagram & WhatsApp",
    title: "Políticas de Dados, Anúncios e Integrações Meta",
    items: [
      {
        heading: "1. Independência da Marca",
        body: "Este site não faz parte, não é patrocinado nem administrado pela Meta Platforms, Inc. (Facebook, Instagram ou WhatsApp). Todas as marcas citadas pertencem aos seus respectivos proprietários.",
      },
      {
        heading: "2. Integração com WhatsApp e Instagram",
        body: "Ao clicar nos botões de agendamento, no ícone flutuante do WhatsApp ou no link do Instagram (@nayara_designernail), você é redirecionado voluntariamente para os aplicativos oficiais da Meta. A partir desse momento, o tráfego e as mensagens também passam a ser regidos pela Política de Privacidade e Termos de Serviço da Meta.",
      },
      {
        heading: "3. Mensuração e Anúncios (Meta Ads / Business Tools)",
        body: "Em campanhas divulgadas no Instagram ou Facebook, podemos utilizar ferramentas de mensuração agregada da Meta (como eventos de visualização ou clique para WhatsApp) para melhorar a relevância dos anúncios, em conformidade com os Termos das Ferramentas de Negócios da Meta e sem coleta de dados sensíveis.",
      },
      {
        heading: "4. Transparência sobre Resultados",
        body: "Em respeito às Diretrizes de Publicidade da Meta, a durabilidade dos procedimentos em fibra de vidro, molde F1, blindagem e esmaltação em gel varia conforme cuidados individuais e rotina de cada cliente; nos cursos, o desempenho profissional depende da prática e dedicação de cada aluna.",
      },
    ],
  },
  {
    id: "cookies",
    tabLabel: "Cookies",
    badge: "Navegação Segura",
    title: "Política de Cookies e Tecnologias Semelhantes",
    items: [
      {
        heading: "1. O que são Cookies",
        body: "Cookies são pequenos arquivos salvos no seu navegador para garantir o funcionamento técnico do site, lembrar preferências básicas e melhorar a velocidade de carregamento.",
      },
      {
        heading: "2. Tipos Utilizados",
        body: "Utilizamos apenas recursos técnicos essenciais de navegação e cache local. Caso ferramentas analíticas ou de mensuração da Meta sejam ativadas, elas operam de forma agregada e estatística.",
      },
      {
        heading: "3. Como Gerenciar ou Desativar",
        body: "Você pode bloquear, limpar ou gerenciar cookies a qualquer momento nas configurações do seu navegador (Chrome, Safari, Edge ou Firefox), sem prejuízo ao acesso informativo desta página.",
      },
    ],
  },
  {
    id: "termos",
    tabLabel: "Termos de Uso",
    badge: "Atendimento & Cursos",
    title: "Termos de Uso, Agendamentos e Propriedade Intelectual",
    items: [
      {
        heading: "1. Pré-Agendamento e Confirmação",
        body: "O envio de solicitação pelo formulário ou clique nos botões de serviço direciona para o WhatsApp oficial e não garante reserva automática até a confirmação de dia e horário pela equipe Nayara Oliveira Studio.",
      },
      {
        heading: "2. Cursos e Vagas",
        body: "Informações sobre turmas, cronogramas, valores e certificados dos cursos são confirmadas diretamente no atendimento individual via WhatsApp.",
      },
      {
        heading: "3. Propriedade Intelectual",
        body: "Todos os textos, identidade visual, fotografias e elementos gráficos deste site pertencem a Nayara Oliveira Studio, sendo vedada a reprodução comercial sem autorização prévia.",
      },
    ],
  },
];
