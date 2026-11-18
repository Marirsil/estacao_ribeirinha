
# 🌿 Estação Ribeirinha

**Energia, informação e segurança para comunidades que vivem do rio.**

A **Estação Ribeirinha** é uma proposta de solução integrada que combina energia solar, armazenamento em bateria, monitoramento do nível do rio e sinalização comunitária. O site apresenta a solução, seu impacto social e demonstrações interativas do monitoramento e da autonomia energética.

---

## 🔗 Links

**Site publicado na Vercel:**  
[Estação Ribeirinha — Acessar site](https://estacaoribeirinha.vercel.app/)

**Painel da Defesa Civil:**  
[Acessar painel demonstrativo](https://estacaoribeirinha.vercel.app/#painel)

**Repositório GitHub:**  
[Estação Ribeirinha — GitHub](https://github.com/Marirsil/estacao_ribeirinha)

---

## 📋 Ficha da CitizenTech

| Campo | Definição |
|---|---|
| **Nome da CitizenTech** | Estação Ribeirinha |
| **Cidade e bairro / território** | Comunidades ribeirinhas da Amazônia, com estrutura preparada para cadastrar estações de diferentes municípios e estados brasileiros. |
| **Cidadãos beneficiados** | Moradores de comunidades ribeirinhas amazônicas e agentes comunitários responsáveis pelo acompanhamento das condições locais. |
| **Problema** | Dificuldade de concentrar e acompanhar informações locais sobre o nível da água, a energia disponível na bateria da estação e os avisos comunitários. |
| **Como funciona** | Cada estação registra o nível da água e o percentual de carga da bateria que mantém o ponto de monitoramento em funcionamento. A arquitetura proposta prevê uma API que armazena os dados no Oracle, calcula a tendência do nível e disponibiliza as informações para o frontend. |
| **O que cada parte faz** | O backend Java aplica as regras e disponibiliza a API; o Oracle armazena os dados; o frontend permite consultar e gerenciar estações, leituras e avisos. |
| **Indicadores de impacto** | Quantidade de estações acompanhadas, leituras registradas, avisos comunitários cadastrados e continuidade do histórico de monitoramento. |
| **ODS relacionados** | ODS 7 - Energia Acessível e Limpa; ODS 10 - Redução das Desigualdades; ODS 11 - Cidades e Comunidades Sustentáveis; ODS 13 - Ação Contra a Mudança Global do Clima. |
| **Repositório** | [github.com/Marirsil/estacao_ribeirinha](https://github.com/Marirsil/estacao_ribeirinha) |

> **Observação:** Os dados utilizados no frontend são demonstrativos. As tendências e os avisos apresentados pela aplicação não substituem comunicados da Defesa Civil nem representam previsões oficiais de enchentes. A integração Java/Oracle faz parte da arquitetura descrita para a solução.

---

## 🎯 Objetivo

Apoiar comunidades ribeirinhas com **acesso a energia essencial, informação sobre a elevação dos rios e sinalização local**. A solução reúne infraestrutura física e uma interface digital para acompanhar medições e alertas em localidades atendidas.

### Impacto social

- **Saúde:** iluminação e recarga de lanternas para deslocamentos e emergências, especialmente à noite.
- **Educação:** energia de apoio para estudos e atividades educacionais.
- **Mobilidade:** possibilidade de apoio energético a equipamentos e embarcações que utilizem baterias, conforme a infraestrutura disponível.
- **Trabalho e renda:** apoio à rotina e às atividades produtivas das comunidades.
- **Segurança e comunicação:** informações claras sobre a elevação do rio e alertas locais.
- **Dignidade:** mais autonomia, iluminação e acesso a recursos essenciais.

---

## ⚙️ Tecnologias utilizadas

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="40" height="40" alt="HTML5" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" height="40" alt="CSS3" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="40" alt="TypeScript" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" height="40" alt="JavaScript" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="40" height="40" alt="Git" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="40" height="40" alt="GitHub" />
</div>

**Hospedagem:** Vercel. A interface é feita com HTML, CSS e JavaScript, com código-fonte TypeScript e sem dependência de frameworks para a execução do site.

### Arquitetura da solução

A arquitetura proposta da Estação Ribeirinha está organizada em três componentes principais:

- **Frontend:** interface web responsável pela apresentação das informações, simulações e visualização dos alertas.
- **Backend:** aplicação Java responsável pelas regras de negócio, processamento das leituras e disponibilização de endpoints REST.
- **Banco de dados:** Oracle Database, responsável pelo armazenamento estruturado das comunidades, estações, medições e alertas.

O frontend demonstrativo pode funcionar independentemente da integração com os demais componentes.

---

## 🌊 Como funciona a Estação Ribeirinha

1. **Captação:** o painel solar fornece energia ao sistema.
2. **Armazenamento:** a bateria mantém uma reserva energética.
3. **Monitoramento:** um sensor acompanha o nível do rio.
4. **Registro:** as leituras são organizadas em histórico.
5. **Sinalização:** indicadores visuais e aviso sonoro informam as condições locais.
6. **Comunicação:** quando existe conectividade, os registros e alertas podem ser encaminhados à central.
7. **Acompanhamento:** a Defesa Civil pode consultar as informações em seu painel.

---

## 🖥️ Funcionalidades do site

- Apresentação da solução e de seus componentes.
- Conteúdo resumido sobre desafios e impactos nas comunidades ribeirinhas.
- **Simulador do nível do rio** com atualização visual, histórico e sinalização por faixas.
- **Simulação de autonomia energética** durante quatro dias sem geração solar.
- **Painel demonstrativo da Defesa Civil** com registros e filtros de alertas.
- Demonstração de conectividade, fila de notificações e sincronização.
- Exportação de alertas em CSV.
- Layout responsivo e alternância entre temas claro e escuro.

### Simulação de energia — quatro dias

| Etapa | Energia restante |
|---|---:|
| Reserva inicial | 250 Wh |
| Dia 1 | 203 Wh |
| Dia 2 | 156 Wh |
| Dia 3 | 109 Wh |
| Dia 4 | **62 Wh** |

**Consumo adotado:** 47 Wh por dia. Os valores acima fazem parte do cenário interativo apresentado no site.

---

## 📁 Estrutura do projeto

```text
estacao-ribeirinha/
├── index.html
├── styles/
│   └── main.css
├── js/
│   ├── data.js
│   └── main.js
├── src/
│   ├── data.ts
│   └── main.ts
├── images/
│   └── *.webp
├── assets/
│   └── favicon.svg
├── README.md
└── FONTES.md
```

---

## 🚀 Como executar

1. Clone o repositório ou baixe o projeto como ZIP.
2. Extraia os arquivos, preservando a estrutura de pastas.
3. Abra o arquivo `index.html` no navegador.

Para executar com servidor local, na pasta do projeto:

```bash
python3 -m http.server 8080
```

Acesse [http://localhost:8080](http://localhost:8080).

Para modificar os arquivos TypeScript e gerar novamente o JavaScript, caso os scripts de compilação estejam configurados:

```bash
npm install
npm run build
```

---

## 📊 Dados e integração

Os painéis utilizam **dados demonstrativos** e reproduzem situações de monitoramento, alertas e autonomia energética.

A organização dos dados é compatível com as entidades planejadas:

| Entidade | Responsabilidade |
|---|---|
| `COMUNIDADE` | Cadastro das comunidades ribeirinhas atendidas. |
| `ESTACAO` | Identificação e localização das estações de monitoramento. |
| `LEITURA_RIO` | Registro das medições do nível do rio. |
| `LEITURA_ENERGIA` | Registro do estado de carga e da disponibilidade energética. |
| `ALERTA` | Histórico dos alertas e avisos registrados. |
| `DEFESA_CIVIL` | Informações dos responsáveis pelo acompanhamento dos alertas. |

### Integração prevista

A solução prevê a comunicação entre sensores físicos, backend Java, banco Oracle e frontend.

O fluxo de dados contempla:

1. Coleta das informações dos sensores da estação.
2. Envio das leituras para a API quando houver conectividade.
3. Processamento e armazenamento dos registros.
4. Análise das condições do rio e da disponibilidade energética.
5. Disponibilização dos dados para o painel de acompanhamento.
6. Apresentação de alertas para apoiar a atuação da Defesa Civil.

O site pode evoluir para integração direta com sensores físicos, serviço de API e banco de dados.

As fontes das pesquisas e indicadores sociais estão previstas na documentação `FONTES.md`.

---

## 🌎 Objetivos de Desenvolvimento Sustentável

A Estação Ribeirinha está alinhada aos seguintes Objetivos de Desenvolvimento Sustentável (ODS) da Organização das Nações Unidas:

- **ODS 7 — Energia Acessível e Limpa:** promoção do acesso à energia solar e ao armazenamento energético.
- **ODS 10 — Redução das Desigualdades:** ampliação do acesso à informação e a recursos essenciais em comunidades isoladas.
- **ODS 11 — Cidades e Comunidades Sustentáveis:** apoio à segurança, resiliência e infraestrutura comunitária.
- **ODS 13 — Ação Contra a Mudança Global do Clima:** apoio ao monitoramento de condições ambientais e à preparação diante de eventos de inundação.

---

## 👥 Autores

- **Augusto Valerio** — RM: 562185  
  GitHub: https://github.com/Augusto-Valerio

- **Jonas Esteves França** — RM: 564143  
  GitHub: https://github.com/Jonas-Franca

- **Mariana Silva Oliveira** — RM: 564241  
  GitHub: https://github.com/Marirsil

- **Pedro Marchese** — RM: 563339  
  GitHub: https://github.com/PedroMarchese01

- **Vitor Rodrigues Tigre** — RM: 561746  
  GitHub: https://github.com/VitorTigre

---

**🌿 Estação Ribeirinha — Tecnologia, energia e informação a serviço das comunidades ribeirinhas.**
