# Estação Ribeirinha — Site completo

**Plataforma de apresentação e demonstração da Estação Ribeirinha.** Site responsivo que explica o problema, mostra a solução, oferece dois simuladores interativos e um painel demonstrativo de alertas à Defesa Civil.

## Abrir e testar (sem instalar nada)

1. Extraia o ZIP inteiro, mantendo a estrutura de pastas.
2. Abra `index.html` com Chrome, Edge, Firefox ou Safari. **Funciona sem internet** (o site e as imagens são locais).
3. Clique em **Simulações** para ajustar o nível do rio e usar os quatro dias de energia.
4. Clique em **Painel demonstrativo** para acompanhar os alertas e visualizar as notificações fictícias.

Opcionalmente, execute um servidor local na pasta do projeto:

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080` no navegador. Também funciona ao arrastar a pasta para um serviço de hospedagem estática.

## Código-fonte e stack

- **HTML5 semântico**: `index.html`
- **CSS puro responsivo**: `styles/main.css`
- **TypeScript**: `src/data.ts` (dados) e `src/main.ts` (lógica dos simuladores)
- **JavaScript compilado**: `js/data.js` e `js/main.js`, incluídos para rodar imediatamente
- **Imagens otimizadas**: `images/*.webp` (conceitos visuais gerados por IA; nenhuma foto é de instalação real)
- **Logo simples**: `assets/favicon.svg`

A escolha por TypeScript + DOM nativo, sem React ou bibliotecas externas, foi intencional para permitir **execução offline sem instalação e hospedagem estática sem custo**. Não há dependência de CDN, framework, API ou serviços de terceiros para a demonstração.

Para modificar o código TypeScript e recompilar:

```bash
npm install
npm run build
```

Ou, se já possui `tsc` global: `tsc --project tsconfig.json`.

## Testes de funcionalidades

| O que testar | Resultado esperado |
|---|---|
| Mover controle deslizante de nível | Indicador em metros e semáforo local atualizam na hora |
| Registrar leitura acima de limiar | Novo alerta fictício aparece no painel |
| Desligar conexão e registrar alerta | Alerta criado como `PENDENTE` |
| Tentar sincronizar desconectado | Site informa que não há conexão |
| Religar e sincronizar | Alertas pendentes passam para `ENVIADO` (simulado) |
| Confirmar recebimento no painel | Alerta passa a `RECEBIDO` (simulado) |
| Filtrar alertas por comunidade, status e período | Tabela exibe apenas os resultados correspondentes |
| Exportar CSV | Arquivo com alertas simulados é baixado |
| Escolher Dia 4 | Mostra 62 Wh restantes e 188 Wh consumidos |
| Trocar tema | Alterna entre claro e escuro |
| Reiniciar demo | Restaura níveis, alertas, conectividade e energia de exemplo |

O JavaScript é compilado e a interface foi testada em navegador Chromium em desktop e tamanho de celular. As medições não são recebidas de sensores reais.

## Regras de segurança e fidelidade ao projeto

1. Os números e limites de nível do rio do simulador **são fictícios**, sem validade hidrológica.
2. O semáforo local é uma **representação visual**, não um equipamento físico conectado.
3. A central da Defesa Civil é **demonstrativa**, sem login real e sem envio de mensagens a órgãos públicos.
4. A alternância de conectividade reproduz estados locais. Ao ficar offline, as notificações permanecem pendentes até sincronização simulada.
5. Os 4 dias de energia são uma **simulação matemática**: 250 Wh úteis iniciais − 47 Wh/dia × 4 dias = **62 Wh**. Não foi feito teste real com bateria.
6. O saneamento aparece como contexto dos riscos sanitários em enchentes, com fonte oficial.
7. O morador não precisa de celular para perceber um aviso físico. O painel web destina-se a operadores de uma eventual central com conectividade.

## Organização dos dados

Os dados fictícios são inspirados nas 6 tabelas de Database Design acordadas:

`COMUNIDADE` → `ESTACAO` → `LEITURA_RIO` / `LEITURA_ENERGIA` → `ALERTA` → `DEFESA_CIVIL`

O site funciona independentemente do Oracle e da API Java. O arquivo `src/data.ts` pode futuramente ser substituído por chamadas à API Spring Boot, com controle de autenticação e autorização no servidor.

## Publicação gratuita

### Netlify

Extraia o ZIP e arraste a **pasta do site** (ou seu conteúdo) para um novo projeto em https://app.netlify.com/drop. Não há etapa de build obrigatória: `index.html` está pronto.

### Vercel

Crie um projeto estático e faça upload/repositório com o conteúdo desta pasta. Como não há framework, configure o diretório raiz do projeto como saída estática e **sem comando de build**.

### GitHub Pages

Publique o conteúdo desta pasta em um repositório e ative *Settings → Pages*. As rotas são por âncora `#`, sem necessidade de regras de rewrite.

## Fontes e créditos

Os links das referências originais aparecem no bloco **Fontes e transparência** do próprio site e são resumidos em `FONTES.md`.

Imagens geradas por IA são identificadas como representações conceituais. O site é um protótipo acadêmico e não deve ser usado como sistema operacional de alerta de enchentes.
