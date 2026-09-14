// Lee data.json y renderiza el mapa como grafo de fuerza dirigida (D3). No contiene
// datos: solo layout, interacción y render. El esquema de data.json (confidence,
// source, source_ref, "not found") no se toca aquí — solo se lee y se muestra.
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
 extraction:{color:'var(--extraction)',dash:'none',w:2},
};

fetch('data.json', {cache: 'no-cache'})
  .then(r=>{ if(!r.ok) throw new Error('No se pudo cargar data.json: HTTP '+r.status); return r.json(); })
  .then(render)
  .catch(err=>{
    document.getElementById('graph-wrap').innerHTML =
      `<p class="placeholder" style="padding:18px;">Error cargando los datos del mapa: ${err.message}</p>`;
    console.error(err);
  });

// ---- helpers de presentación de una ficha (nodo o arista) — comparten la misma
// lógica de verificación que el resto del sitio: badge de confidence, "not found"
// se muestra como tal, nunca se oculta ni se rellena. ----
function confBadge(confidence){
  const cls = confidence==='verified' ? 'verified' : 'unverified';
  const label = confidence==='verified' ? 'verificado' : 'sin verificar';
  return `<span class="badge cbadge ${cls}">${label}</span>`;
}

function foundedLabel(n){
  if(!n.founded) return null;
  if(n.founded_precision==='month'){
    const [y,m]=String(n.founded).split('-');
    const meses=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
    return `${meses[parseInt(m,10)-1]||m} ${y}`;
  }
  return String(n.founded);
}

function nodeDetailHTML(n){
  const summaryHtml = n.summary ? `<p class="popup-summary">${n.summary}</p>` : '';
  const sourceHtml = (n.source && n.source!=='not found')
    ? `<a href="${n.source}" target="_blank" rel="noopener">fuente ↗</a>`
    : `<span class="not-found">fuente: not found</span>`;
  const urlHtml = (n.url && n.url!=='not found')
    ? `<a href="${n.url}" target="_blank" rel="noopener">${n.url.replace(/^https?:\/\//,'')} ↗</a>` : '';
  const founded = foundedLabel(n);
  const foundedHtml = founded ? `<div><span class="meta-k">Fundación:</span> ${founded}</div>` : '';
  const leadershipHtml = (n.leadership && n.leadership.length)
    ? `<div class="popup-leadership"><span class="meta-k">Liderazgo:</span><ul>${n.leadership.map(l=>`<li>${l}</li>`).join('')}</ul></div>` : '';
  const metaHtml = (foundedHtml||leadershipHtml) ? `<div class="popup-meta">${foundedHtml}${leadershipHtml}</div>` : '';
  const lastChecked = n.last_checked ? `<div class="popup-footnote">id: ${n.id} · verificado por última vez: ${n.last_checked}</div>` : '';
  return `<h2>${n.name}</h2>
    <div class="popup-badges">
      <span class="badge" style="color:${TYPE_COLOR[n.type]};border-color:${TYPE_COLOR[n.type]}">${TYPE_LABEL[n.type]||n.type}</span>
      <span class="badge">${n.country||''}</span>
      ${confBadge(n.confidence)}
    </div>
    <p>${n.desc||''}</p>${summaryHtml}${metaHtml}
    <div class="popup-links">${urlHtml}${sourceHtml}</div>${lastChecked}`;
}

function edgeDetailHTML(e, byId){
  const s=byId[e.source], t=byId[e.target];
  const style = EDGE_STYLE[e.type]||EDGE_STYLE.weak;
  const sourceHtml = (e.source_ref && e.source_ref!=='not found')
    ? `<div class="popup-links"><a href="${e.source_ref}" target="_blank" rel="noopener">fuente ↗</a></div>`
    : `<div class="popup-links"><span class="not-found">fuente: not found</span></div>`;
  return `<h2>${s?s.name:e.source} → ${t?t.name:e.target}</h2>
    <div class="popup-badges">
      <span class="badge" style="color:${style.color};border-color:${style.color}">${e.label}</span>
      ${confBadge(e.confidence)}
    </div>
    <p>${e.desc||''}</p>${sourceHtml}`;
}

function render(DATA){
  const {meta, nodes: NODES, edges: EDGES} = DATA;

  if(meta){
    if(meta.title){ document.getElementById('title').textContent = meta.title; document.title = meta.title; }
    if(meta.subtitle) document.getElementById('subtitle').textContent = meta.subtitle;
    if(meta.footer) document.getElementById('footer').textContent = meta.footer;
  }

  buildForceGraph(document.getElementById('graph-wrap'), NODES, EDGES);
}

function buildForceGraph(container, nodesIn, edgesIn){
  const nodes = nodesIn.map(n=>Object.assign({},n));
  const links = edgesIn.map(e=>Object.assign({},e));
  const byId = {}; nodes.forEach(n=>byId[n.id]=n);
  // El espacio de simulación crece con el número de nodos (referencia: 1200x760
  // para ~40) para que el grafo tenga sitio para respirar y no se apelotone en
  // el centro; el ajuste de zoom al final del layout encuadra el resultado.
  const scale = Math.sqrt(nodes.length/40);
  const width = Math.round(1200*scale), height = Math.round(760*scale);

  container.innerHTML = `
    <div class="fg-toolbar">
      <input id="fg-search" class="fg-search" placeholder="Buscar por nombre, tipo o país…">
      <div class="fg-zoomctl">
        <button id="fg-zoomin" class="fg-btn" title="Acercar">+</button>
        <button id="fg-zoomout" class="fg-btn" title="Alejar">–</button>
        <button id="fg-reset" class="fg-btn fg-btn-wide" title="Restablecer vista">reset</button>
      </div>
    </div>
    <div id="fg-stage" class="fg-stage">
      <svg id="fg-svg" class="fg-svg" viewBox="0 0 ${width} ${height}"></svg>
      <div id="fg-popup" class="fg-popup" hidden>
        <button id="fg-popup-close" class="fg-popup-close" aria-label="Cerrar">✕</button>
        <div id="fg-popup-body"></div>
      </div>
    </div>`;

  const svg = d3.select(container.querySelector('#fg-svg'));
  const g = svg.append('g');
  const zoom = d3.zoom().scaleExtent([0.35,3]).on('zoom', ev=>g.attr('transform', ev.transform));
  svg.call(zoom);

  // Grado de cada nodo (nº de aristas): los nodos sin ninguna arista no tienen
  // nada que los frene frente a la repulsión y salen despedidos lejos del
  // resto — se anclan al centro con más fuerza que los que sí están conectados,
  // cuya posición ya gobierna la estructura de enlaces.
  const degree = {}; nodes.forEach(n=>degree[n.id]=0);
  links.forEach(l=>{ degree[l.source]=(degree[l.source]||0)+1; degree[l.target]=(degree[l.target]||0)+1; });

  const sim = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d=>d.id).distance(110).strength(0.45))
    .force('charge', d3.forceManyBody().strength(-380))
    .force('center', d3.forceCenter(width/2, height/2))
    // Un par de nodos con un solo enlace entre sí (p. ej. dos organismos con una
    // única relación documentada, sin más conexiones al resto del mapa) se
    // comporta como un mini-clúster que la repulsión aleja igual que a un nodo
    // aislado — no basta con distinguir grado 0 de "conectado"; el anclaje debe
    // debilitarse gradualmente cuantas más aristas tenga cada nodo.
    .force('x', d3.forceX(width/2).strength(d=>Math.max(0.02, 0.3/(1+degree[d.id]))))
    .force('y', d3.forceY(height/2).strength(d=>Math.max(0.02, 0.3/(1+degree[d.id]))))
    .force('collide', d3.forceCollide(d=>d.type==='frontier-lab'?34:d.type==='document'?32:26).iterations(2));

  const linkGroup = g.append('g').selectAll('g').data(links).join('g');
  const linkHit = linkGroup.append('line')
    .attr('stroke', 'transparent')
    .attr('stroke-width', 14)
    .style('cursor','pointer');
  const linkSel = linkGroup.append('line')
    .attr('stroke', d=>(EDGE_STYLE[d.type]||EDGE_STYLE.weak).color)
    .attr('stroke-width', d=>(EDGE_STYLE[d.type]||EDGE_STYLE.weak).w)
    .attr('stroke-dasharray', d=>{const s=EDGE_STYLE[d.type]||EDGE_STYLE.weak; return s.dash==='none'?null:s.dash;})
    .attr('opacity', 0.5)
    .style('cursor','pointer')
    .style('pointer-events','none');
  linkGroup.on('click',(ev,d)=>{ev.stopPropagation();selectEdge(d,ev);})
    .on('mouseenter',(ev,d)=>highlightEdge(d))
    .on('mouseleave',()=>clearHighlight());

  const nodeSel = g.append('g').selectAll('g').data(nodes).join('g')
    .attr('class','fg-node')
    .call(d3.drag()
      .on('start',(ev,d)=>{if(!ev.active) sim.alphaTarget(0.25).restart(); d.fx=d.x; d.fy=d.y;})
      .on('drag',(ev,d)=>{d.fx=ev.x; d.fy=ev.y;})
      .on('end',(ev,d)=>{if(!ev.active) sim.alphaTarget(0); d.fx=null; d.fy=null;}));

  function octagonPoints(r){
    const pts=[];
    for(let i=0;i<8;i++){ const a = Math.PI/8 + i*Math.PI/4; pts.push((r*Math.cos(a)).toFixed(2)+','+(r*Math.sin(a)).toFixed(2)); }
    return pts.join(' ');
  }
  nodeSel.each(function(d){
    const sel = d3.select(this);
    if(d.type==='frontier-lab'){
      sel.append('polygon')
        .attr('points', octagonPoints(24))
        .attr('fill', '#161C24')
        .attr('stroke', TYPE_COLOR[d.type])
        .attr('stroke-width', 3.5);
    } else if(d.type==='document'){
      // "página con esquina doblada": mismo lenguaje que un icono de documento,
      // con borde sólido (el punteado se leía como placeholder sin renderizar).
      const w=44,h=26,x=-w/2,y=-h/2,fold=9;
      sel.append('path')
        .attr('d', `M${x},${y} H${x+w-fold} L${x+w},${y+fold} V${y+h} H${x} Z`)
        .attr('fill', '#161C24')
        .attr('stroke', TYPE_COLOR[d.type])
        .attr('stroke-width', 2)
        .attr('stroke-linejoin', 'round');
      sel.append('path')
        .attr('d', `M${x+w-fold},${y} V${y+fold} H${x+w}`)
        .attr('fill', 'none')
        .attr('stroke', TYPE_COLOR[d.type])
        .attr('stroke-width', 1.4)
        .attr('opacity', 0.7);
    } else {
      sel.append('circle')
        .attr('r', 16)
        .attr('fill', '#161C24')
        .attr('stroke', TYPE_COLOR[d.type])
        .attr('stroke-width', 2);
    }
  });

  nodeSel.append('text')
    .text(d=>d.name.length>18? d.name.slice(0,17)+'…' : d.name)
    .attr('text-anchor','middle')
    .attr('y', d=>(d.type==='frontier-lab'?24:d.type==='document'?13:16)+13)
    .attr('class','fg-node-label');

  nodeSel.on('click',(ev,d)=>{ev.stopPropagation();selectNode(d,ev);})
    .on('mouseenter',(ev,d)=>highlight(d))
    .on('mouseleave',()=>clearHighlight());
  svg.on('click', ()=>{clearHighlight();hidePopup();});

  sim.on('tick', ()=>{
    linkHit.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
    linkSel.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
    nodeSel.attr('transform',d=>`translate(${d.x},${d.y})`);
  });

  // Al enfriarse la simulación, encuadra el resultado real (que puede ser más
  // ancho/alto que el viewBox base) en vez de dejar la vista inicial recortada
  // o con espacio vacío — el zoom/pan interactivo sigue disponible después.
  let fitted = false;
  sim.on('end', ()=>{
    if(fitted) return;
    fitted = true;
    const pad = 40;
    const xs = nodes.map(d=>d.x), ys = nodes.map(d=>d.y);
    const x0 = Math.min(...xs)-pad, x1 = Math.max(...xs)+pad;
    const y0 = Math.min(...ys)-pad, y1 = Math.max(...ys)+pad;
    const k = Math.max(0.35, Math.min(3, 0.95*Math.min(width/(x1-x0), height/(y1-y0))));
    const tx = width/2 - k*(x0+x1)/2, ty = height/2 - k*(y0+y1)/2;
    svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity.translate(tx,ty).scale(k));
  });

  // Búsqueda activa: al salir de un hover, clearHighlight debe volver al
  // filtrado de la búsqueda (si lo hay), no siempre a opacidad plena — si no,
  // basta pasar el ratón por un nodo para "reencender" todo el mapa y perder
  // el resultado de la búsqueda.
  let currentQuery = '';
  function highlight(d){
    const connIds = new Set([d.id]);
    links.forEach(l=>{ if(l.source.id===d.id) connIds.add(l.target.id); if(l.target.id===d.id) connIds.add(l.source.id); });
    nodeSel.style('opacity', n=>connIds.has(n.id)?1:0.15);
    linkSel.style('opacity', l=>(l.source.id===d.id||l.target.id===d.id)?1:0.04);
  }
  function clearHighlight(){
    if(currentQuery){ applySearch(currentQuery); return; }
    nodeSel.style('opacity',1); linkSel.style('opacity',0.5);
  }
  function highlightEdge(d){
    nodeSel.style('opacity', n=>(n.id===d.source.id||n.id===d.target.id)?1:0.15);
    linkSel.style('opacity', l=>l===d?1:0.04);
  }

  const stageEl = container.querySelector('#fg-stage');
  const popupEl = container.querySelector('#fg-popup');
  const popupBody = container.querySelector('#fg-popup-body');
  container.querySelector('#fg-popup-close').addEventListener('click', (ev)=>{ev.stopPropagation();hidePopup();});
  function hidePopup(){ popupEl.hidden = true; }
  function showPopupAt(x,y,html){
    popupBody.innerHTML = html;
    popupEl.hidden = false;
    const stageRect = stageEl.getBoundingClientRect();
    const pw = 380, margin=12;
    let left = x, top = y + 14;
    if(left + pw + margin > stageRect.width) left = stageRect.width - pw - margin;
    if(left < margin) left = margin;
    if(top + 320 > stageRect.height) top = Math.max(margin, y - 320);
    popupEl.style.left = left+'px';
    popupEl.style.top = top+'px';
  }
  function selectNode(n, ev){
    const [x,y] = d3.pointer(ev, stageEl);
    showPopupAt(x,y,nodeDetailHTML(n));
  }
  function selectEdge(e, ev){
    const [x,y] = d3.pointer(ev, stageEl);
    const norm = Object.assign({}, e, {source: e.source.id||e.source, target: e.target.id||e.target});
    showPopupAt(x,y,edgeDetailHTML(norm, byId));
  }

  function matchesQuery(d,q){
    return d.name.toLowerCase().includes(q)
      || (d.country||'').toLowerCase().includes(q)
      || (TYPE_LABEL[d.type]||d.type).toLowerCase().includes(q);
  }
  function applySearch(q){
    currentQuery = q;
    if(!q){ nodeSel.style('opacity',1); linkSel.style('opacity',0.5); return; }
    nodeSel.style('opacity', d=>matchesQuery(d,q)?1:0.1);
    linkSel.style('opacity', 0.04);
  }
  container.querySelector('#fg-search').addEventListener('input', ev=>{
    applySearch(ev.target.value.trim().toLowerCase());
  });
  container.querySelector('#fg-zoomin').addEventListener('click', ()=>svg.transition().duration(200).call(zoom.scaleBy,1.3));
  container.querySelector('#fg-zoomout').addEventListener('click', ()=>svg.transition().duration(200).call(zoom.scaleBy,0.75));
  container.querySelector('#fg-reset').addEventListener('click', ()=>svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity));
}
