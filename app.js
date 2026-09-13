// Lee data.json y renderiza el mapa. No contiene datos: solo layout y render.
const SVGNS='http://www.w3.org/2000/svg', XHTMLNS='http://www.w3.org/1999/xhtml';
const TYPE_LABEL={research:'Investigación',policy:'Gobernanza / policy',funding:'Financiación',activism:'Activismo',gov:'Organismo gubernamental',compliance:'Cumplimiento normativo',network:'Red / comunidad',document:'Documento','frontier-lab':'Laboratorio de frontera'};
const TYPE_COLOR={research:'var(--research)',policy:'var(--policy)',funding:'var(--funding)',activism:'var(--activism)',gov:'var(--gov)',compliance:'var(--compliance)',network:'var(--network)',document:'var(--doc)','frontier-lab':'var(--frontier)'};
const EDGE_STYLE={
 funding:{color:'var(--funding)',dash:'2 4',w:1.6},
 authorship:{color:'var(--doc)',dash:'none',w:1.8},
 narrative:{color:'var(--activism)',dash:'3 4',w:1.4},
 split:{color:'var(--split)',dash:'5 4',w:2},
 advocacy:{color:'var(--policy)',dash:'2 4',w:1.4},
 cluster:{color:'var(--policy)',dash:'none',w:1.2},
 weak:{color:'var(--doc)',dash:'2 5',w:1.1},
 network:{color:'var(--gov)',dash:'2 4',w:1.3},
 capacity:{color:'var(--network)',dash:'none',w:1.4},
 eval:{color:'var(--policy)',dash:'1 3',w:1.2},
 protest:{color:'var(--activism)',dash:'3 4',w:1.4},
};

fetch('data.json')
  .then(r=>{ if(!r.ok) throw new Error('No se pudo cargar data.json: HTTP '+r.status); return r.json(); })
  .then(render)
  .catch(err=>{
    document.getElementById('detail').innerHTML =
      `<p class="placeholder">Error cargando los datos del mapa: ${err.message}</p>`;
    console.error(err);
  });

function render(DATA){
  const {meta, panels: PANELS, nodes: NODES, edges: EDGES} = DATA;

  if(meta){
    if(meta.title){ document.getElementById('title').textContent = meta.title; document.title = meta.title; }
    if(meta.subtitle) document.getElementById('subtitle').textContent = meta.subtitle;
    if(meta.footer) document.getElementById('footer').textContent = meta.footer;
  }

  // ---- layout ----
  const nodeW=195, nodeH=60, gapX=18, gapY=16, padTop=36, padBottom=16, padX=18;
  const colWidth=padX*2+nodeW*2+gapX, colGap=28, rowGap=28, marginX=36, marginY=36, macroCols=3;

  const byId={}; NODES.forEach(n=>byId[n.id]=n);
  const panelsById={}; PANELS.forEach(p=>panelsById[p.id]=p);

  const docPanel=panelsById['docs'];
  const countryPanels=PANELS.filter(p=>p.id!=='docs');

  countryPanels.forEach(p=>{
    const n=NODES.filter(nd=>nd.panel===p.id).length;
    const rows=Math.ceil(n/2);
    p.w=colWidth; p.h=padTop+rows*(nodeH+gapY)-gapY+padBottom;
  });
  if(docPanel){
    docPanel.w=colWidth*macroCols+colGap*(macroCols-1);
    docPanel.h=padTop+90;
    docPanel.x=marginX; docPanel.y=marginY;
  }

  let y=marginY+(docPanel?docPanel.h+rowGap:0), colIdx=0, rowMaxH=0;
  countryPanels.forEach(p=>{
    p.x=marginX+colIdx*(colWidth+colGap);
    p.y=y;
    rowMaxH=Math.max(rowMaxH,p.h);
    colIdx++;
    if(colIdx>=macroCols){colIdx=0;y+=rowMaxH+rowGap;rowMaxH=0;}
  });
  const contentBottom = colIdx!==0 ? y+rowMaxH : y-rowGap;
  const totalHeight=contentBottom+marginY;
  const totalWidth=marginX*2+colWidth*macroCols+colGap*(macroCols-1);

  function placeNodes(panel){
    const nds=NODES.filter(n=>n.panel===panel.id);
    if(panel.id==='docs'){
      const dw=(panel.w-padX*2-gapX*2)/3;
      nds.forEach((n,i)=>{
        n.x=panel.x+padX+i*(dw+gapX); n.y=panel.y+padTop; n.w=dw; n.h=90;
        n.cx=n.x+dw/2; n.cy=n.y+45;
      });
    } else {
      nds.forEach((n,i)=>{
        const row=Math.floor(i/2), col=i%2;
        n.x=panel.x+padX+col*(nodeW+gapX); n.y=panel.y+padTop+row*(nodeH+gapY);
        n.w=nodeW; n.h=nodeH; n.cx=n.x+nodeW/2; n.cy=n.y+nodeH/2;
      });
    }
  }
  if(docPanel) placeNodes(docPanel);
  countryPanels.forEach(placeNodes);

  // ---- render ----
  const svg=document.getElementById('svg');
  svg.setAttribute('viewBox',`0 0 ${totalWidth} ${totalHeight}`);
  svg.setAttribute('width',totalWidth); svg.setAttribute('height',totalHeight);

  function el(tag,attrs){
    const e=document.createElementNS(SVGNS,tag);
    for(const k in attrs) e.setAttribute(k,attrs[k]);
    return e;
  }

  // panels
  const allPanels = docPanel ? [docPanel,...countryPanels] : countryPanels;
  allPanels.forEach(p=>{
    svg.appendChild(el('rect',{x:p.x,y:p.y,width:p.w,height:p.h,rx:12,class:'panel-bg'+(p.id==='docs'?' docs':'')}));
    const t=el('text',{x:p.x+18,y:p.y+24,class:'panel-label'}); t.textContent=p.label;
    svg.appendChild(t);
  });

  // edges (under nodes)
  EDGES.forEach(e=>{
    const s=byId[e.source], t=byId[e.target];
    if(!s||!t) return;
    const mx=(s.cx+t.cx)/2, my=(s.cy+t.cy)/2 - 26;
    const d=`M${s.cx},${s.cy} Q${mx},${my} ${t.cx},${t.cy}`;
    const style=EDGE_STYLE[e.type]||EDGE_STYLE.weak;
    const hit=el('path',{d,class:'edge-hit'});
    const path=el('path',{d,class:'edge','stroke':style.color,'stroke-width':style.w,'stroke-dasharray':style.dash==='none'?'':style.dash});
    const g=el('g',{});
    g.appendChild(hit); g.appendChild(path);
    g.addEventListener('click',()=>selectEdge(e,g,style.color));
    svg.appendChild(g);
  });

  // nodes
  let selectedNode=null, selectedEdgeG=null;
  NODES.forEach(n=>{
    const g=el('g',{class:'node',color:TYPE_COLOR[n.type]});
    const isFrontier = n.type==='frontier-lab';
    const rect=el('rect',{x:n.x,y:n.y,width:n.w,height:n.h,rx:isFrontier?3:8,stroke:TYPE_COLOR[n.type],
      'stroke-width': isFrontier?3:2,
      'stroke-dasharray': n.type==='document' ? '4 3' : 'none'});
    g.appendChild(rect);
    const fo=el('foreignObject',{x:n.x,y:n.y,width:n.w,height:n.h});
    const div=document.createElementNS(XHTMLNS,'div');
    div.setAttribute('class','node-inner');
    div.innerHTML=`<div class="n-name">${n.name}</div><div class="n-meta">${TYPE_LABEL[n.type]||n.type} · ${n.country||''}</div>`;
    fo.appendChild(div);
    g.appendChild(fo);
    g.addEventListener('click',()=>selectNode(n,g));
    svg.appendChild(g);
    n._g=g;
  });

  const detail=document.getElementById('detail');

  function clearSelection(){
    if(selectedNode) selectedNode._g.classList.remove('selected');
    if(selectedEdgeG) selectedEdgeG.querySelector('.edge').classList.remove('selected');
    selectedNode=null; selectedEdgeG=null;
  }

  function confBadge(confidence){
    const cls = confidence==='verified' ? 'verified' : 'unverified';
    const label = confidence==='verified' ? 'verificado' : 'sin verificar';
    return `<span class="badge cbadge ${cls}">${label}</span>`;
  }

  function selectNode(n,g){
    clearSelection();
    g.classList.add('selected'); selectedNode=n;
    const summaryHtml = n.summary ? `<p style="margin-top:12px;padding-top:12px;border-top:1px solid var(--panel-border);color:var(--muted);">${n.summary}</p>` : '';
    const sourceHtml = (n.source && n.source!=='not found')
      ? `<a href="${n.source}" target="_blank" rel="noopener">fuente ↗</a>` : '';
    const urlHtml = (n.url && n.url!=='not found')
      ? `<a href="${n.url}" target="_blank" rel="noopener">${n.url.replace(/^https?:\/\//,'')} ↗</a>` : '';
    detail.innerHTML=`<h2>${n.name}</h2>
      <div class="badge">${TYPE_LABEL[n.type]||n.type} · ${n.country||''}</div>
      ${confBadge(n.confidence)}
      <p>${n.desc||''}</p>${summaryHtml}
      <div style="margin-top:8px;display:flex;gap:14px;">${urlHtml}${sourceHtml}</div>`;
  }

  function selectEdge(e,g,color){
    clearSelection();
    g.querySelector('.edge').classList.add('selected'); selectedEdgeG=g;
    const s=byId[e.source], t=byId[e.target];
    const sourceHtml = (e.source_ref && e.source_ref!=='not found')
      ? `<div style="margin-top:8px;"><a href="${e.source_ref}" target="_blank" rel="noopener">fuente ↗</a></div>` : '';
    detail.innerHTML=`<h2>${s.name} → ${t.name}</h2>
      <div class="badge" style="color:${color}">${e.label}</div>
      ${confBadge(e.confidence)}
      <p>${e.desc||''}</p>${sourceHtml}`;
  }
}
