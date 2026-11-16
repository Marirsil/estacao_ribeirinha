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
`[INSERIR_LINK_DO_REPOSITORIO](https://github.com/Marirsil/estacao_ribeirinha/tree/main)`

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

Para modificar os arquivos TypeScript e gerar novamente o JavaScript:

```bash
npm install
npm run build
```

---

## 📊 Dados e integração

Os painéis utilizam **dados demonstrativos** e reproduzem situações de monitoramento, alertas e autonomia energética. A organização dos dados é compatível com as entidades planejadas: `COMUNIDADE`, `ESTACAO`, `LEITURA_RIO`, `LEITURA_ENERGIA`, `ALERTA` e `DEFESA_CIVIL`.

O site pode evoluir para integração com sensores físicos, serviço de API e banco de dados. As fontes das pesquisas e indicadores sociais estão reunidas em `FONTES.md`.

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
