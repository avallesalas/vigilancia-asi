# Changelog

Formato: fecha, qué cambió, qué se verificó en esa sesión.

## 2026-09-13 (cambio de presentación — grafo de fuerza dirigida)
- Se reemplaza el layout de paneles fijos por país por un grafo de fuerza dirigida
  (D3 v7), explorado primero como prototipo en Claude Design (3 direcciones
  comparadas: grafo de fuerza, paneles mejorados, vista de tabla — se eligió la
  primera). Cambio puramente de presentación/interacción: `data.json` conserva
  exactamente el mismo esquema, campos de `confidence`/`source`/`source_ref` y
  lógica de verificación (fuente citada o "not found", nunca oculto ni relleno).
- Nuevo: buscador por nombre/tipo/país, zoom/pan, arrastre de nodos, resaltado de
  vecinos al pasar el ratón, popup flotante al clic (nodo o arista) en vez del
  panel fijo bajo el mapa.
- El popup ahora muestra `founded`/`founded_precision`/`leadership` cuando existen
  — campos que ya estaban verificados en el dataset pero que la vista anterior no
  llegaba a mostrar.
- `meta.subtitle` en `data.json` actualizado para describir la interacción real
  (buscar/arrastrar/hover/clic) en vez del texto antiguo ("clic... para ver el
  detalle abajo", que ya no aplica). Es texto de presentación, no dato del esquema.
- Añadida dependencia externa: d3@7.9.0 vía CDN (jsdelivr), cargada antes de
  `app.js` en `index.html`.
- Probado en navegador: carga sin errores de consola, popup de nodo y de arista,
  búsqueda, zoom, reset, arrastre — todo verificado con Chrome antes de publicar.

## 2026-09-13
- Se separa el prototipo de un solo fichero (`archive/prototipo-2026-09-13.html`) en
  `index.html` + `app.js` + `data.json`, siguiendo el esquema de `CLAUDE.md`.
- 40 nodos, 49 aristas, 11 paneles migrados sin pérdida (0 aristas huérfanas).
- Se aplica la corrección ya documentada en `research/verificaciones/2026-09-13.md`:
  la "Statement on AI Risk" (2023) es autoría exclusiva de CAIS, no coimpulsada por FLI.
- 9 nodos marcados `confidence: "verified"` porque esa sesión de investigación ya
  encontró fuente primaria citable: CeSIA, SaferAI, Conjecture, ORCG, Concordia AI,
  UK AI Security Institute, US AISI/CAISI, Japan AI Safety Institute, Singapore AI
  Safety Institute. El resto queda `unverified`.
- Se añade el tipo `compliance` (antes `corporate`) para separar cumplimiento normativo
  corporativo (ISMS Forum) del resto del ecosistema de seguridad de IA, según CLAUDE.md.
- Pendiente (resuelto más abajo, misma fecha): los campos `url` de los nodos
  `unverified` usaban dominios oficiales conocidos pero no verificados con búsqueda.

## 2026-09-13 (sesión de investigación — verificación exhaustiva)
Segunda pasada sobre el mismo dataset: se hizo búsqueda web real para cada nodo/arista
que quedó `unverified` en la migración anterior o que `research/verificaciones/2026-09-13.md`
marcaba como pendiente. Resultado: **39/40 nodos verificados** (antes 9) y **23/49 aristas
verificadas** (antes 0), todas con fuente primaria citable en `source`/`source_ref`.

**Único nodo que sigue `unverified`:** CEGIA (Brasil) — se confirmó su dominio real
(cegia.org.br) pero no una fuente primaria que sustente fecha de fundación, dirección,
o la afirmación de que "ha sido clave" en los debates de gobernanza brasileños.

**Correcciones a datos existentes (inconsistencias encontradas esta sesión):**
- **CnAISDA se fundó en febrero de 2025, no en junio de 2025.** La fecha de junio
  venía de `research/verificaciones/2026-09-13.md` y del HTML original; fuentes
  primarias (Stanford DigiChina, Carnegie Endowment) confirman que se lanzó en
  febrero de 2025, al margen de la Cumbre de Acción sobre IA de París.
- **La arista CeSIA↔SaferAI estaba sobreespecificada.** El documento de verificación
  decía que Segerie (CeSIA) y Campos (SaferAI) "cofundaron EffiSciences juntos". La
  biografía oficial de Segerie (crsegerie.com/bio.html) dice explícitamente que fue
  "Head of AI Safety" en EffiSciences, no cofundador — Campos sí fue cofundador de
  EffiSciences, Segerie no. Se corrigió la descripción de la arista para reflejar la
  asimetría real, sin quitarle verificación (ahora con fuente primaria citada).
- **La arista ERO→PauseAI estaba mal caracterizada.** No fue una "co-organización de
  uno de los primeros eventos públicos" como decía el documento de verificación, sino
  que Existential Risk Observatory invitó a Joep Meindertsma como ponente en la 2ª
  edición de su propio AI Safety Meetup (18 de marzo de 2024, Ámsterdam). Se
  encontró la página del evento y se corrigió la etiqueta y descripción.
- **El nombre correcto de la red latinoamericana es LANAIS, no "LANAS".** El id del
  nodo (`lanas`) se mantiene por estabilidad de las aristas, pero `name` y `url` se
  corrigen a "Latin American Network for AI Safety (LANAIS)" / lanais.org.
- **ControlAI cambió de dominio:** controlai.com → controlai.org (verificado; el
  antiguo dominio ya no es el oficial según Wikipedia y el propio sitio).
- **Google DeepMind: la ficha describía a Demis Hassabis como CEO**, cargo que dejó
  en agosto de 2026 al pasar a presidente de DeepMind y chief scientist de Alphabet;
  las operaciones diarias las lleva ahora Koray Kavukcuoglu (SVP, sin título de CEO
  propio), reportando a Sundar Pichai. Actualizado a la situación vigente.

**Nodos que pasaron de "not found" a URL real verificada esta sesión:** INESIA,
Existential Risk Observatory, LANAIS, AI Safety Brazil, CEGIA (solo URL, sigue
`unverified` en el resto de campos), el libro "If Anyone Builds It, Everyone Dies"
(ifanyonebuildsit.com) y la "Statement on AI Risk" (safe.ai/statement-on-ai-risk).

**Se añadió `founded`/`founded_precision`/`leadership` donde se pudo verificar**, para
prácticamente todos los nodos: fechas de fundación de labs de frontera, institutos
AISI, think tanks británicos, financiadores y documentos, más nombres de
fundadores/directivos donde aportan al mapa (se omitieron en nodos donde no aclaraban
nada, como aristas de red pura).

**Fuentes clave de esta sesión (no exhaustivo):** Wikipedia, Stanford DigiChina,
Carnegie Endowment, NIST, gov.uk/Hansard, economie.gouv.fr, La Moncloa,
openphilanthropy.org/grants, goodventures.org, 80,000 Hours, futureoflife.org
(AI Safety Index verano 2026), forum.effectivealtruism.org, alignmentforum.org,
lanais.org, aisafetybrazil.org, meti.go.jp, aisi.re.kr, imda.gov.sg.

## 2026-09-13 (corrección posterior — aviso del usuario)
- **El nodo CeSIA decía "15 premios Nobel" sin cruzar fuentes.** El usuario señaló
  que la biografía de Segerie (ya citada como fuente esta misma sesión) dice 12, no
  15 — la misma discrepancia que él ya había detectado entre la web de CeSIA y la
  bio de Segerie. Verificado directamente: `cesia.org` dice 10 premios Nobel;
  `red-lines.ai` (sitio oficial de la campaña) dice "15 Nobel Prize and Turing Award
  recipients" — una cifra combinada de Nobel *y* Turing, no 15 Nobel puros; la bio
  de Segerie dice 12 Nobel. Las tres son fuentes primarias legítimas que
  probablemente reflejan firmas añadidas en distintos momentos y conteos distintos
  (Nobel solo vs. Nobel+Turing). Se corrigió la descripción para citar las tres
  cifras con su fuente en vez de quedarse con una sola sin contrastar.
