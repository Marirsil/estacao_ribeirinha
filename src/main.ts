/**
 * Estação Ribeirinha • demonstração web sem dependências externas.
 * O JS é compilado a partir deste TypeScript e pode ser executado offline.
 * Atenção: nenhuma notificação vai para órgãos públicos; todo estado é local.
 */
interface DemoState {
  stationId: number;
  levels: Record<number,number>;
  histories: Record<number,number[]>;
  alerts: AlertSeed[];
  connected: boolean;
  energyDay: number;
  selectedFeature: string;
  theme: 'dark'|'light';
}
const SEED: SiteSeed = (window as any).RIBEIRINHA_DATA;
const STORE_KEY = 'estacao-ribeirinha-site-v3';
const $ = (id: string): HTMLElement => { const el=document.getElementById(id); if(!el) throw new Error('Elemento não encontrado: '+id); return el; };
const stationById=(id:number):StationSeed=>SEED.stations.find(s=>s.id===id) || SEED.stations[0];
const moneyFreeText=(str:string):string=>String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));
const asMeters=(cm:number)=> (cm/100).toFixed(2).replace('.',',')+' m';
const fmtDate=(iso:string)=> new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(iso));
const calcCondition=(cm:number,s:StationSeed):'NORMAL'|'ATENCAO'|'CRITICO'=>cm>=s.critical?'CRITICO':cm>=s.attention?'ATENCAO':'NORMAL';
const conditionLabel=(s:string)=>({NORMAL:'Normal',ATENCAO:'Atenção',CRITICO:'Crítico'} as Record<string,string>)[s]||s;
const freshDemo=():DemoState=>({stationId:101,levels:Object.fromEntries(SEED.stations.map(s=>[s.id,s.level])),histories:Object.fromEntries(SEED.stations.map(s=>[s.id,[...s.history]])),alerts:SEED.alerts.map(a=>({...a})),connected:true,energyDay:0,selectedFeature:'solar',theme:'dark'});
let state:DemoState=freshDemo();
try{
  const item=localStorage.getItem(STORE_KEY);
  if(item){const saved=JSON.parse(item) as Partial<DemoState>; const fresh=freshDemo();
    state={...fresh,...saved,
      levels:{...fresh.levels,...saved.levels},
      histories:{...fresh.histories,...saved.histories},
      alerts:Array.isArray(saved.alerts)?saved.alerts:fresh.alerts,
      theme:saved.theme==='light'?'light':'dark'
    };
  }
}catch(error){console.warn('Não foi possível restaurar a demo; usando dados iniciais.',error);}
function save(){try{localStorage.setItem(STORE_KEY,JSON.stringify(state));}catch(e){console.warn('Armazenamento local indisponível',e)}}
let toastTimer:number|undefined;
function toast(message:string){const t=$('toast');t.textContent=message;t.classList.add('show');if(toastTimer!==undefined)clearTimeout(toastTimer);toastTimer=window.setTimeout(()=>t.classList.remove('show'),4200)}

function setTheme(mode:'dark'|'light'){
  state.theme=mode;
  document.body.setAttribute('data-theme',mode);
  const button=$('theme-toggle');
  const use=button.querySelector('use');if(use)use.setAttribute('href',mode==='dark'?'#icon-sun':'#icon-moon');
  button.setAttribute('aria-label',mode==='dark'?'Ativar tema claro':'Ativar tema escuro');
  save();
}
function setupNav(){
  const menu=$('menu-toggle') as HTMLButtonElement;
  const nav=$('mobile-nav') as HTMLElement;
  menu.addEventListener('click',()=>{const isOpen=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!isOpen));menu.setAttribute('aria-label',isOpen?'Abrir menu':'Fechar menu');nav.hidden=isOpen;});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');nav.hidden=true;}));
  window.addEventListener('resize',()=>{if(window.innerWidth>970){nav.hidden=true;menu.setAttribute('aria-expanded','false');}});
  const header=$('topo');
  function scrollState(){header.classList.toggle('scrolled',scrollY>40)}
  window.addEventListener('scroll',scrollState,{passive:true});scrollState();
  const sections=document.querySelectorAll('main section[id]');
  const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.desktop-nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}})},{threshold:0,rootMargin:'-29% 0px -63% 0px'});
  sections.forEach(s=>observer.observe(s));
  $('theme-toggle').addEventListener('click',()=>setTheme(state.theme==='dark'?'light':'dark'));
  setTheme(state.theme);
}
function renderFeature(){
  document.querySelectorAll<HTMLButtonElement>('[data-feature]').forEach(btn=>{
    const current=btn.dataset.feature===state.selectedFeature;
    btn.classList.toggle('selected',current);btn.setAttribute('aria-pressed',String(current));
  });
  const info=SEED.features[state.selectedFeature]||SEED.features.solar;
  $('feature-detail-label').textContent=info.label;
  $('feature-detail-title').textContent=info.title;
  $('feature-detail-copy').textContent=info.description;
}
function renderSelectors(){
  const select=$('station-select') as HTMLSelectElement;
  select.innerHTML=SEED.stations.map(s=>`<option value="${s.id}">${moneyFreeText(s.code+' · '+s.municipality+' / '+s.river)}</option>`).join('');
  select.value=String(state.stationId);
  const filter=$('filter-station') as HTMLSelectElement;
  filter.innerHTML='<option value="TODAS">Todas as comunidades</option>'+SEED.stations.map(s=>`<option value="${s.id}">${moneyFreeText(s.municipality)} · ${moneyFreeText(s.code)}</option>`).join('');
}
function updateRiverControls(){
  const station=stationById(state.stationId);
  const slider=$('river-slider') as HTMLInputElement;
  const lower=Math.max(0,Math.floor((station.attention-160)/10)*10);
  const upper=Math.ceil((station.critical+120)/10)*10;
  slider.min=String(lower);slider.max=String(upper);slider.value=String(Math.max(lower,Math.min(upper,state.levels[station.id])));
  $('slider-min').textContent=asMeters(lower);$('slider-max').textContent=asMeters(upper);
  renderRiver();
}
function renderRiver(){
  const st=stationById(state.stationId);
  const slider=$('river-slider') as HTMLInputElement;
  const level=Number(slider.value);
  const cond=calcCondition(level,st);
  $('river-level-value').textContent=(level/100).toFixed(2).replace('.',',');
  $('river-slider-label').textContent=asMeters(level);
  slider.setAttribute('aria-valuetext',asMeters(level));
  $('river-state').textContent=conditionLabel(cond);
  $('river-state').className='state-'+cond;
  $('river-state-helper').textContent=({NORMAL:'Abaixo da faixa de atenção',ATENCAO:'Acompanhe as condições locais',CRITICO:'Siga orientações oficiais'} as Record<string,string>)[cond];
  ['NORMAL','ATENCAO','CRITICO'].forEach((name,i)=>{$(['light-green','light-yellow','light-red'][i]).classList.toggle('active',cond===name)});
  renderChart('river-chart',state.histories[st.id]||st.history,st.attention,st.critical);
}
function chartSVG(values:number[],gradientId:string,attention:number,critical:number):string{
  const data=(values||[]).slice(-12);
  if(data.length<2) return '<p class="note">Ainda não há leituras suficientes para formar um histórico.</p>';
  const width=520,height=190,left=37,right=12,top=13,bottom=30;
  const max=Math.max(...data,critical)+40;const min=Math.max(0,Math.min(...data,attention)-40);
  const X=(i:number)=>left+(width-left-right)*i/(data.length-1);
  const Y=(v:number)=>top+(height-top-bottom)*(max-v)/(max-min);
  const points=data.map((v,i)=>[X(i),Y(v)]);
  const d=points.map((p,i)=>(i?'L':'M')+p[0].toFixed(2)+','+p[1].toFixed(2)).join(' ');
  const fill=d+` L ${points[points.length-1][0].toFixed(2)},${height-bottom} L ${left},${height-bottom} Z`;
  const gs=Array.from({length:4},(_,i)=>{const v=min+(max-min)*i/3;const y=Y(v);return `<line class="chart-grid-line" x1="${left}" y1="${y}" x2="${width-right}" y2="${y}"/><text class="chart-axis-label" x="${left-6}" y="${y+3}" text-anchor="end">${(v/100).toFixed(1).replace('.',',')}</text>`;}).join('');
  const threshold=(v:number,c:string)=>`<line x1="${left}" y1="${Y(v)}" x2="${width-right}" y2="${Y(v)}" stroke="${c}" stroke-width="1" stroke-dasharray="4 5" opacity=".6"/>`;
  const dots=points.map(p=>`<circle class="chart-point" cx="${p[0]}" cy="${p[1]}" r="4"/>`).join('');
  const labels=points.map((p,i)=>`<text class="chart-axis-label" x="${p[0]}" y="${height-8}" text-anchor="middle">${i+1}</text>`).join('');
  return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs><linearGradient id="${gradientId}" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#b6ed64" stop-opacity=".24"/><stop offset="100%" stop-color="#b6ed64" stop-opacity="0"/></linearGradient></defs>${gs}${threshold(attention,'#eabb56')}${threshold(critical,'#f47a66')}<path d="${fill}" fill="url(#${gradientId})"/><path class="chart-line" d="${d}"/>${dots}${labels}</svg>`;
}
function renderChart(target:string,values:number[],attention:number,critical:number){
  const id=target==='river-chart'?'riverGradient':'dashboardGradient';
  $(target).innerHTML=chartSVG(values,id,attention,critical);
  $(target).setAttribute('aria-label',`Histórico de ${values.length} medições simuladas, última leitura ${asMeters(values[values.length-1]||0)}. Referências fictícias de atenção ${asMeters(attention)} e crítico ${asMeters(critical)}.`);
}
function applyReading(){
  const st=stationById(state.stationId);
  const value=Number(($('river-slider') as HTMLInputElement).value);
  state.levels[st.id]=value;
  state.histories[st.id]=[...(state.histories[st.id]||[]),value].slice(-18);
  const severity=calcCondition(value,st);
  const now=new Date().toISOString();
  let message='Leitura simulada registrada: situação abaixo da faixa de atenção. Nenhum alerta foi criado.';
  if(severity!=='NORMAL'){
    const status=state.connected?'ENVIADO':'PENDENTE';
    const alert:AlertSeed={id:Math.max(4000,...state.alerts.map(a=>a.id))+1,stationId:st.id,levelCm:value,type:severity,status,createdAt:now,sentAt:state.connected?now:null,receivedAt:null};
    state.alerts=[alert,...state.alerts];
    message=`Leitura ${asMeters(value)}: alerta de ${severity==='CRITICO'?'nível crítico':'atenção'} criado. ${state.connected?'Envio simulado registrado':'Sem conexão: envio pendente na fila local'}.`;
  }
  $('river-feedback').textContent=message;
  save();renderRiver();renderDashboard();toast(message);
}
function renderConnectivity(){
  const toggle=$('connection-toggle') as HTMLInputElement;
  toggle.checked=state.connected;
  $('connection-label').textContent=state.connected?'Conexão disponível (demo)':'Sem internet na estação';
  const ico=$('connection-icon').querySelector('use');if(ico)ico.setAttribute('href',state.connected?'#icon-wifi':'#icon-cloud-off');
}
function renderEnergy(){
  const {initialWh,dailyWh,durationDays}=SEED.energy;
  const day=Math.max(0,Math.min(durationDays,state.energyDay));
  const remain=Math.max(0,initialWh-(dailyWh*day));
  const remainingPct=Math.round(remain/initialWh*100);
  $('energy-remaining').textContent=remain+' Wh';
  $('energy-percent').textContent=remainingPct+'% da reserva inicial';
  ($('battery-visual-fill') as HTMLElement).style.height=`calc(${remainingPct}% - 8px)`;
  $('energy-consumed').textContent=(initialWh-remain)+' Wh';
  $('energy-days').textContent=`${day} de ${durationDays}`;
  const mode=day>=4?'Reserva limitada':day>=3?'Atenção ao consumo':'Normal';
  $('energy-mode').textContent=mode;
  document.querySelectorAll<HTMLButtonElement>('[data-day]').forEach(btn=>{const active=Number(btn.dataset.day)===day;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));});
  $('energy-bars').innerHTML=Array.from({length:durationDays+1},(_,d)=>{const wh=initialWh-d*dailyWh;return `<div class="energy-bar-slot ${day===d?'active':''}" data-bar-day="${d}" role="button" tabindex="0" aria-label="Ver ${d===0?'início':`dia ${d}`}, ${wh} Wh restantes"><strong>${wh} Wh</strong><div class="energy-bar-container"><div class="energy-bar" style="height:${wh/initialWh*100}%"></div></div><span>${d===0?'Início':'Dia '+d}</span></div>`}).join('');
  const messages=[
    'No início do cenário, a reserva está completa. Sem sol, a bateria passa a sustentar o consumo previsto.',
    'Depois de um dia sem geração solar, a estação ainda mantém os serviços de baixo consumo do exemplo.',
    'No segundo dia, o consumo acumula 94 Wh. O monitoramento e a luz de apoio seguem dentro da hipótese apresentada.',
    'No terceiro dia, a reserva já é mais limitada. Na operação real, seria prudente revisar recargas e iluminação não essencial.',
    'No quarto dia, restam 62 Wh úteis no cálculo ilustrativo. Uma chuva prolongada exigiria economia adicional ou outra recarga.'
  ];
  $('energy-message').innerHTML=`<svg class="icon"><use href="#icon-${day===0?'sun':day===4?'alert':'battery'}"></use></svg><p>${messages[day]}</p>`;
}
function statusDuration(when:string,period:string){
  if(period==='TODOS')return true;
  const delta=Date.now()-new Date(when).getTime();
  if(period==='HOJE')return new Date(when).toDateString()===new Date().toDateString();
  if(period==='7DIAS')return delta<=7*24*3600000&&delta>=0;
  return true;
}
function filteredAlerts():AlertSeed[]{
  const status=($('filter-status') as HTMLSelectElement).value;
  const period=($('filter-period') as HTMLSelectElement).value;
  const stId=($('filter-station') as HTMLSelectElement).value;
  return state.alerts.filter(a=>(status==='TODOS'||a.status===status)&&(stId==='TODAS'||String(a.stationId)===stId)&&statusDuration(a.createdAt,period)).sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime());
}
function renderDashboard(){
  $('dash-count-communities').textContent=String(SEED.stations.length);
  $('dash-count-stations').textContent=String(SEED.stations.length);
  $('dash-count-alerts').textContent=String(state.alerts.length);
  $('dash-count-pending').textContent=String(state.alerts.filter(a=>a.status==='PENDENTE').length);
  $('station-list').innerHTML=SEED.stations.map(s=>{const value=state.levels[s.id];const cond=calcCondition(value,s);return `<button type="button" class="station-row ${s.id===state.stationId?'selected':''}" data-select-station="${s.id}" aria-pressed="${s.id===state.stationId}"><span><span class="station-name">${moneyFreeText(s.code)} · ${moneyFreeText(s.municipality)}</span><span class="station-desc">${moneyFreeText(s.community)} • ${moneyFreeText(s.river)}</span></span><span class="station-level">${asMeters(value)}<small class="state-${cond}">${conditionLabel(cond)}${s.operationalStatus==='MANUTENCAO'?' · manutenção':''}</small></span></button>`}).join('');
  const st=stationById(state.stationId);
  $('selected-station-name').textContent=st.code+' • '+st.municipality+' (dados simulados)';
  $('dash-attention').textContent=st.attention+' cm';$('dash-critical').textContent=st.critical+' cm';
  renderChart('dashboard-chart',state.histories[st.id]||st.history,st.attention,st.critical);
  const filtered=filteredAlerts();
  $('alerts-result-count').textContent=`${filtered.length} ${filtered.length===1?'ocorrência':'ocorrências'} na lista`;
  $('alerts-table-body').innerHTML=filtered.length?filtered.map(a=>{
    const st=stationById(a.stationId);
    const stateButton=a.status==='ENVIADO'?`<button type="button" class="mini-action" data-ack="${a.id}">Confirmar</button>`:'';
    return `<tr><td><strong>${moneyFreeText(st.code)} · ${moneyFreeText(st.municipality)}</strong><small>${moneyFreeText(st.community)}</small></td><td><strong>${asMeters(a.levelCm)}</strong></td><td><span class="alert-pill ${a.type}">${conditionLabel(a.type)}</span></td><td><span class="alert-pill ${a.status}">${moneyFreeText(a.status)}</span></td><td><small>${fmtDate(a.createdAt)}</small></td><td><button type="button" class="mini-action" data-details="${a.id}">Detalhes</button> ${stateButton}</td></tr>`
  }).join(''):'<tr><td colspan="6" class="empty-table">Nenhuma ocorrência corresponde aos filtros selecionados.</td></tr>';
}
function showAlertDetails(alertId:number){
  const alert=state.alerts.find(a=>a.id===alertId);if(!alert)return;
  const st=stationById(alert.stationId);
  const rows:[string,string][]=[
    ['Protocolo demonstrativo','#'+alert.id],['Comunidade',st.community],['Município',st.municipality+' / '+st.state],
    ['Rio',st.river],['Estação',st.code],['Nível registrado',asMeters(alert.levelCm)],
    ['Classificação',conditionLabel(alert.type)],['Notificação',alert.status],
    ['Órgão (fictício)',st.defense],['Data do alerta',fmtDate(alert.createdAt)],
    ['Data de envio',alert.sentAt?fmtDate(alert.sentAt):'Não enviada'],
    ['Confirmação',alert.receivedAt?fmtDate(alert.receivedAt):'Não confirmada']
  ];
  $('alert-dialog-content').innerHTML='<div class="dialog-details">'+rows.map(([title,value])=>`<div><span>${moneyFreeText(title)}</span><strong>${moneyFreeText(value)}</strong></div>`).join('')+'</div>';
  const dialog=$('alert-dialog') as HTMLDialogElement;
  if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');
}
function acknowledgeAlert(alertId:number){
  const row=state.alerts.find(a=>a.id===alertId);
  if(!row||row.status!=='ENVIADO')return;
  row.status='RECEBIDO';row.receivedAt=new Date().toISOString();save();renderDashboard();toast('Recebimento confirmado somente na demonstração local.');
}
function synchronize(){
  if(!state.connected){toast('Sem conexão simulada. Ative a chave de conectividade antes de sincronizar.');return;}
  const rows=state.alerts.filter(a=>a.status==='PENDENTE');
  if(!rows.length){toast('Não há alertas pendentes na fila demonstrativa.');return;}
  const now=new Date().toISOString();
  rows.forEach(a=>{a.status='ENVIADO';a.sentAt=now;});
  save();renderDashboard();toast(`${rows.length} ${rows.length===1?'alerta marcado como enviado':'alertas marcados como enviados'} (simulação).`);
}
function downloadCSV(){
  const rows=filteredAlerts();
  const quote=(v:string|number)=>'"'+String(v??'').replace(/"/g,'""')+'"';
  const cols=['ID','Estacao','Comunidade','Municipio','Rio','Nivel_cm','Classificacao','Status','Criado_em','Enviado_em','Recebido_em'];
  const lines=[cols.join(';'),...rows.map(a=>{const s=stationById(a.stationId);return [a.id,s.code,s.community,s.municipality,s.river,a.levelCm,a.type,a.status,a.createdAt,a.sentAt||'',a.receivedAt||''].map(quote).join(';')})];
  const blob=new Blob(['\ufeff'+lines.join('\r\n')],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='alertas_estacao_ribeirinha_SIMULACAO.csv';document.body.appendChild(a);a.click();a.remove();window.setTimeout(()=>URL.revokeObjectURL(url),4000);toast('CSV demonstrativo exportado. Nenhum dado real foi utilizado.');
}
function wireEvents(){
  document.querySelectorAll<HTMLButtonElement>('[data-feature]').forEach(btn=>btn.addEventListener('click',()=>{state.selectedFeature=btn.dataset.feature||'solar';save();renderFeature();}));
  $('station-select').addEventListener('change',()=>{state.stationId=Number(($('station-select') as HTMLSelectElement).value);save();updateRiverControls();renderDashboard();});
  $('river-slider').addEventListener('input',renderRiver);
  $('apply-reading').addEventListener('click',applyReading);
  $('connection-toggle').addEventListener('change',()=>{state.connected=($('connection-toggle') as HTMLInputElement).checked;save();renderConnectivity();toast(state.connected?'Conexão demonstrativa disponível. Alertas pendentes continuam aguardando sincronização.':'Conexão desligada: novos alertas ficam pendentes; sinalização local permanece.');});
  document.querySelectorAll<HTMLButtonElement>('[data-day]').forEach(btn=>btn.addEventListener('click',()=>{state.energyDay=Number(btn.dataset.day);save();renderEnergy();}));
  $('energy-bars').addEventListener('click',event=>{const target=(event.target as HTMLElement).closest('[data-bar-day]') as HTMLElement|null;if(target){state.energyDay=Number(target.dataset.barDay);save();renderEnergy();}});
  $('energy-bars').addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){const target=(event.target as HTMLElement).closest('[data-bar-day]') as HTMLElement|null;if(target){event.preventDefault();state.energyDay=Number(target.dataset.barDay);save();renderEnergy();}}});
  $('station-list').addEventListener('click',event=>{const row=(event.target as HTMLElement).closest('[data-select-station]') as HTMLElement|null;if(!row)return;state.stationId=Number(row.dataset.selectStation);($('station-select') as HTMLSelectElement).value=String(state.stationId);save();updateRiverControls();renderDashboard();});
  ['filter-status','filter-period','filter-station'].forEach(id=>$(id).addEventListener('change',renderDashboard));
  $('alerts-table-body').addEventListener('click',event=>{const target=event.target as HTMLElement;const more=target.closest('[data-details]') as HTMLElement|null;const ack=target.closest('[data-ack]') as HTMLElement|null;if(more){showAlertDetails(Number(more.dataset.details));}else if(ack){acknowledgeAlert(Number(ack.dataset.ack));}});
  $('sync-pending').addEventListener('click',synchronize);
  $('export-csv').addEventListener('click',downloadCSV);
  $('close-alert-dialog').addEventListener('click',()=>($('alert-dialog') as HTMLDialogElement).close());
  $('alert-dialog').addEventListener('click',e=>{if(e.target===$('alert-dialog'))($('alert-dialog') as HTMLDialogElement).close();});
  $('reset-demo').addEventListener('click',()=>{if(!window.confirm('Reiniciar os níveis do rio, alertas, energia e conectividade?'))return;const preservedTheme=state.theme;state=freshDemo();state.theme=preservedTheme;save();($('filter-status') as HTMLSelectElement).value='TODOS';($('filter-period') as HTMLSelectElement).value='TODOS';($('filter-station') as HTMLSelectElement).value='TODAS';($('station-select') as HTMLSelectElement).value=String(state.stationId);renderEverything();toast('Demonstração reiniciada.');});
}
function renderEverything(){renderSelectors();renderFeature();updateRiverControls();renderConnectivity();renderEnergy();renderDashboard();setTheme(state.theme);}
function boot(){if(!SEED){document.body.innerHTML='<p>Dados da demonstração não disponíveis. Recarregue a página.</p>';return;}setupNav();renderEverything();wireEvents();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
