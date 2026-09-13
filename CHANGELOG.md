# Changelog

Formato: fecha, qué cambió, qué se verificó en esa sesión.

## 2026-09-13 (CEGIA verificado — 0 nodos sin verificar)
El usuario compartió https://cegia.org.br/#sobre, la web oficial del CEGIA
(Brasil) que ya estaba en el mapa como único nodo `unverified`. Se confirma con
fuente primaria: misión, sede en Brasília, equipo (Luis Urtubey, director de
estrategia — corroborado por una fuente externa independiente, USP) y una
colaboración pública concreta (webinar con el Instituto de Estudos Avançados de
la USP y The Future Society, septiembre 2026). Sigue sin aparecer una fecha de
fundación en ninguna fuente — `founded` queda honestamente en `null`.

De paso, el usuario compartió antes un enlace que resultó ser un CEGIA
*distinto* (el Comité de Ética y Gobernanza de la IA del Ayuntamiento de
València, España) — coincidencia de siglas sin relación con el brasileño. Esa
ficha queda propuesta en `research/candidatos.md`, pendiente de aprobación.

Resultado: **0/40 nodos unverified** (antes 1). Aristas sin cambios (18/49).

## 2026-09-13 (verificación de las 8 aristas de evaluación vigilante→laboratorio)
Sesión de investigación dirigida a las 8 aristas de tipo `eval` que conectan METR,
Apollo Research, US AISI/CAISI y UK AI Security Institute con Anthropic, OpenAI y
Google DeepMind — el eje central del mapa. Las 8 pasan a `confidence: "verified"`
con fuente primaria (system cards, informes técnicos conjuntos alojados en
nist.gov, blogs oficiales de los propios laboratorios y de Apollo Research).

- **METR → Anthropic** se etiquetaba "evalúa capacidades", pero lo que hay
  documentado es METR revisando el propio informe de riesgo de sabotaje de
  Anthropic para Claude Opus 4.6 (no una evaluación de capacidades independiente).
  Se ajustó también el `label` a "revisión externa de riesgo (sabotaje)" para no
  afirmar más de lo que la fuente sostiene.
- **METR → OpenAI**: evaluación de gpt-5-thinking documentada en el system card de
  GPT-5.
- **Apollo → Anthropic**: evaluó una versión preliminar de Claude Opus 4, encontró
  la tasa de "scheming" más alta de cualquier modelo de frontera hasta entonces;
  Anthropic documenta esto en su propio system card e incorporó mitigaciones antes
  de la versión final.
- **Apollo → OpenAI**: colaboración documentada en la publicación conjunta
  "Detecting and reducing scheming in AI models" (o1, o3, o4-mini).
- **Apollo → Google DeepMind**: Gemini 1.5 Pro incluido en el estudio propio de
  Apollo "More Capable Models Are Better At In-Context Scheming".
- **US AISI → Anthropic** y **US AISI → OpenAI**: informes técnicos conjuntos
  US AISI + UK AISI, alojados directamente en nist.gov (Claude 3.5 Sonnet
  actualizado, octubre 2024; o1 de OpenAI, diciembre 2024).
- **UK AISI → Google DeepMind**: documentado en el blog oficial de Google
  DeepMind sobre su colaboración con el UK AISI, que tuvo acceso previo al
  despliegue de Gemini Ultra.
- De paso, se añade "Apollo Research" a la lista de quien evalúa a Google
  DeepMind en la ficha del propio nodo, para que quede consistente con la nueva
  arista verificada.

Resultado: nodos unverified 1/40 (sin cambios, sigue siendo CEGIA); aristas
unverified 26/49 → **18/49**. Auditoría de integridad tras el cambio: 0 aristas
huérfanas, 0 nodos/aristas `verified` sin fuente citable, 0 coincidencias de
lenguaje de bitácora.

Candidatos nuevos encontrados: 0 (sesión de verificación, no de descubrimiento).
Descartes: 0. Detalle completo de fuentes en
`research/verificaciones/2026-09-13-eval-labs.md`.

## 2026-09-13 (auditoría de redactado — todo el data.json)
A petición del usuario, revisión completa de los 40 nodos y 49 aristas para
comprobar que el texto es correcto y de tono objetivo/formal, más allá del barrido
puntual de la sesión anterior (que solo buscó frases con "sesión"/"corrección").

- **7 `label` de arista llevaban comentario de verificación entre paréntesis**
  ("(caracterización general)", "(sin verificación puntual)") o, en un caso,
  un resto literal del proceso de edición: `cesia→saferai` decía
  "vínculo vía EffiSciences **(relación corregida)**". El estado de verificación ya
  lo muestra el badge junto al label — no hace falta repetirlo en el texto.
- **`compendium→controlai` afirmaba como hecho verificado** ("guía de acción
  explícita") algo que su propio `desc` decía no tener fuente puntual. Se cambia el
  label a "vínculo de personal (ex-Conjecture)", que es lo que sí está confirmado.
- **3 nodos afirmaban como hecho plano lo que sus propias aristas relacionadas
  marcan `unverified`**: `book-iabi` y `compendium` sobre su influencia/uso por
  ControlAI y Stop AI, y `controlai` sobre el mismo vínculo. Reescritos para que el
  nodo y la arista comuniquen el mismo grado de certeza.
- **2 superlativos sin fuente propia**, heredados sin cambios del prototipo
  original: "el mayor financiador" (Coefficient Giving) → "uno de los mayores
  financiadores"; "el think tank más visible" (FLI) → "uno de los think tanks más
  visibles". El resto del nodo estaba verificado, pero esa frase concreta no lo
  estaba — exactamente el caso que ya cubre la regla 6 de CLAUDE.md.
- **`ai-safety-brazil` era un fragmento**, no una ficha: "Enfoque 'full-spectrum':
  desde sesgo algorítmico hasta riesgo catastrófico" sin decir siquiera qué es la
  organización. Reescrito como descripción completa.
- Verificado tras los cambios: 0 coincidencias de lenguaje de bitácora en todo el
  archivo, 0 aristas huérfanas, 0 nodos `verified` sin `source` citable, 0 fichas
  con `desc` menor a 60 caracteres.
- Se añaden 3 reglas nuevas a `CLAUDE.md` (no negociables #7 y #8, más una en el
  esquema de ficha) para que este tipo de fallo no se repita: el texto de proceso
  nunca va en `desc`/`summary`/`label`; un cambio de confidence en una arista debe
  revisar si el nodo en sus extremos sigue el mismo grado de certeza; y el texto
  heredado de versiones anteriores no está exento del mismo escrutinio.

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
