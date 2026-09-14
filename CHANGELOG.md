# Changelog

Formato: fecha, qué cambió, qué se verificó en esa sesión.

## 2026-09-14 (documentos propios de Anthropic, OpenAI y Google DeepMind)
Cierra el ítem del backlog "Añadir los documentos propios de los labs frontier".
Tres nodos `document` nuevos, con arista `authorship` desde cada laboratorio (ya
se mencionaban en el `desc` de los propios nodos de los labs, pero no existían
como ficha propia):

- **`anthropic-rsp`** (Responsible Scaling Policy) — publicada el 19 sept. 2023,
  niveles ASL-2/ASL-3/ASL-4+. SaferAI ha señalado retrocesos en alguna revisión
  posterior (v2.1, v2.2).
- **`openai-preparedness-framework`** — publicado en versión beta en dic. 2023,
  reescrito como v2 el 15 abr. 2025 (AI Lab Watch documentó los cambios).
- **`deepmind-frontier-safety-framework`** — publicado el 17 may. 2024, con
  «niveles de capacidad crítica» (CCL); actualizado feb. 2025 y de nuevo 17 abr.
  2026 (nuevos «niveles de capacidad rastreados», TCL).

No se añadieron documentos equivalentes de otros labs (p. ej. el paper en Nature
de DeepSeek-R1 o la model card de Kimi K2, ya mencionados en la arista
`concordia → deepseek`/`moonshot-ai`) — el ítem del backlog pedía específicamente
Anthropic/OpenAI/Google.

## 2026-09-14 (Meta y xAI como frontier-lab, con sus reorganizaciones de 2025-2026)
A petición explícita del usuario, se reabre e investiga el ítem de Meta/xAI que
había quedado cerrado sin investigar. Ambos han cambiado de forma sustancial desde
su fundación original — el nodo refleja el estado actual (sept. 2026), con la
genealogía en el `desc`, igual que ya se hizo con `google-deepmind`:

- **`meta-msl`** (Meta Superintelligence Labs) — Meta reorganizó toda su IA de
  frontera el 30 de junio de 2025: Zuckerberg invirtió 14.300 M$ en el 49% de
  Scale AI para traer a su CEO, Alexandr Wang, como primer chief AI officer.
  FAIR (el equipo que Meta tenía desde 2013, con Yann LeCun a la cabeza) pasó a
  ser una de las cuatro divisiones internas de MSL; LeCun dejó Meta el 20 de
  nov. de 2025 en desacuerdo con la nueva dirección.
- **`spacexai`** (antes xAI) — SpaceX adquirió xAI en feb. de 2026 (250.000 M$);
  en mayo de 2026 Musk anunció su disolución como empresa independiente, y en
  julio de 2026 se completó el rebranding a SpaceXAI. Todos los cofundadores
  originales de xAI se han ido.

Aristas nuevas: ambos ya estaban conectados al resto del mapa antes de que
existieran sus nombres actuales — `frontier-model-forum → meta-msl` (Meta se unió
en mayo de 2024, como compañía, un año antes de MSL) y `seoul-frontier-ai-commitments
→ meta-msl` / `→ spacexai` (ambos cofirmantes originales de Seúl, 2024). También
`fli → meta-msl` (D+) y `fli → spacexai` (F), las dos calificaciones que faltaban
del AI Safety Index de verano 2026 (las 9 empresas evaluadas quedan así todas
representadas en el mapa).

## 2026-09-14 (organismos de vigilancia en Latinoamérica, África y Arabia Saudí)
Continuación del equilibrio geográfico del mapa. Seis nodos nuevos, sin aristas
(no encontré relaciones documentadas entre ellos y el resto del mapa que pasaran
el listón de fuente puntual, más allá de coexistir en la misma región):

- **`sdaia`** (Saudi Data & AI Authority, `gov`) — creada por decreto real el 30
  de agosto de 2019, dependiente del primer ministro saudí; primera pieza de
  gobernanza del mundo árabe más allá de EAU. Su foco es estrategia/gobernanza
  nacional, no evaluación de riesgo catastrófico al estilo AISI — lo señalo en el
  propio `desc` para no insinuar una equivalencia que no existe.
- **`cenia`** (Centro Nacional de Inteligencia Artificial, Chile, `research`) —
  fundado nov. 2021 por 4 universidades, financiado por ANID; primera pieza
  chilena del mapa (hasta ahora solo Brasil/España-con-foco-LatAm).
- **`au-continental-ai-strategy`** (`document`) — estrategia aprobada por el
  Consejo Ejecutivo de la Unión Africana, 18-19 jul. 2024, Accra.
- **`africa-ai-council`** (`network`) — consejo de 15 miembros de Smart Africa,
  presentado el 17 de nov. de 2025 en Conakry.
- **`ai-safety-cape-town`** (`network`, Sudáfrica) y **`ilina-program`**
  (`research`, panafricano) — primeras piezas de base en África; ambos con
  `founded: null` porque no localicé fecha de fundación citable (mismo criterio
  que `ai-safety-bcn`/`lanas`, no se estimó ni se inventó).

Investigado y **no añadido** por prematuro: el bill PL 2338/2023 de Brasil (aún en
la Cámara de Diputados, sin ANPD operando como regulador de IA todavía), la
CONAIA de México (aún proyecto de ley) y el borrador de política de IA de
Sudáfrica — ninguno es una institución operativa hoy. También confirmado, citando
Brookings: "no dedicated AI safety research/policy centre has been established
[in Africa] yet" — un hueco real del ecosistema, no un error de búsqueda.

## 2026-09-14 (organismos de vigilancia en Asia, para equilibrar el mapa fuera del mundo anglosajón)
El usuario pidió explícitamente buscar organismos (no más labs) en Asia para que el
mapa no quede centrado solo en EE. UU./Reino Unido. Cuatro nodos nuevos:

- **`baai`** (Beijing Academy of Artificial Intelligence, `type: research`) —
  fundada en nov. de 2018 en Pekín, más antigua que `cnaisda` (2025) y una de sus
  instituciones miembro. Publicó los Beijing AI Principles (2019) y organizó
  IDAIS-Beijing (marzo 2024). Sancionada por EE. UU. en marzo de 2025 por su
  vinculación con tecnología de doble uso militar.
- **`idais-beijing-2024`** (`document`) — la declaración de consenso sobre líneas
  rojas en IA de IDAIS-Beijing (9-11 marzo 2024), firmada por los premios Turing
  Yoshua Bengio, Geoffrey Hinton y Andrew Yao junto a Fu Ying, Xue Lan y dirección
  de BAAI. Arista `→ baai` (organizador) y `→ cnaisda` (`weak`: Yao y Xue Lan
  firmaron esto un año antes de fundar CnAISDA — mismas personas, no alianza formal
  entre las dos iniciativas).
- **`india-aisi`** (IndiaAI Safety Institute, `type: gov`) — anunciado el 5 de
  marzo de 2025 bajo la IndiaAI Mission (MeitY), modelo "hub and spoke"; llena el
  hueco de India entre los AISI ya presentes (EE. UU., Reino Unido, Japón, Corea,
  Singapur).
- **`asean-ai-safe`** (ASEAN AI Safety Network, `type: network`) — declaración
  adoptada el 26 de oct. de 2025 por los 10 estados miembros de la ASEAN,
  secretaría en Kuala Lumpur (apertura prevista principios de 2026).

Descartado por prematuro: el AI Safety Institute de Malasia (todavía un
proyecto de ley/plan, no una institución operativa) — no se fabrica un nodo para
algo que aún no existe.

## 2026-09-14 (SenseTime, compromisos AIIA/CAICT y análisis de Concordia AI)
Cierre de los tres hilos abiertos al final de la sesión anterior:

- **`sensetime`** (nodo nuevo, `frontier-lab`): fundada el 15 de oct. de 2014 en
  Hong Kong por Tang Xiao'ou (†dic. 2023), Xu Li, Wang Xiaogang y Xu Bing. Pasa el
  mismo criterio de frontera que los demás labs chinos: SenseNova V6.5 se acerca a
  Gemini/GPT-5 en benchmarks (OpenCompass, SuperCLUE). A diferencia de los otros
  ocho, tiene un historial de sanciones directamente relevante para un mapa de
  vigilancia: Entity List de EE. UU. (2019) y sanciones del Tesoro (dic. 2021) por
  el uso de sus algoritmos en la represión de la minoría uigur en Xinjiang. Arista
  `sensetime → anthropic` (`extraction`, GTG-16012 del informe de sept. 2026: compra
  de transcripciones de usuarios a proveedores externos, sin generar tráfico propio).
- **`aiia-china-commitments`** (nodo nuevo, `document`): compromisos de seguridad de
  la Artificial Intelligence Industry Alliance (AIIA/CAICT, dic. 2024), firmados por
  DeepSeek, Alibaba y 15 empresas más — el equivalente chino, en paralelo, a los
  Seoul Commitments. Aristas `→ deepseek` y `→ alibaba-qwen`. Nota de la propia
  Carnegie Endowment recogida en el nodo: ninguna firmante los ha cumplido, y
  DeepSeek estuvo "notoriamente ausente" de una segunda ronda en la WAIC — mismo
  patrón de compromiso-sin-cumplimiento que ya vimos con MiniMax/01.AI en Seúl.
- **`concordia → deepseek`** y **`concordia → moonshot-ai`** (`eval`): el informe
  "State of AI Safety in China 2026" de Concordia AI (14 jul. 2026) destaca el paper
  en Nature de DeepSeek-R1 y la model card de Kimi K2 de Moonshot como las
  divulgaciones de seguridad más detalladas del sector — pero señala que los
  modelos siguientes de ambas (DeepSeek-V4, Kimi K2.5) se publicaron sin ningún
  resultado de evaluación de seguridad.

`cnaisda` en sí sigue sin arista directa a ningún lab del mapa — confirmado que no
tiene membresía de empresas, solo de think tanks (CCID); la entidad con relación
documentada a labs es la AIIA/CAICT, una organización distinta.

## 2026-09-14 (nuevo tipo de arista "extraction": campañas de distillation contra Anthropic)
Se añade un nodo (`xiaomi-mimo`, `frontier-lab`, investigado con el mismo criterio que
los otros siete labs chinos: MiMo-V2.5-Pro, 8º en el Artificial Analysis Intelligence
Index mundial, liderado por Luo Fuli, exinvestigadora de DeepSeek) y 9 aristas nuevas
de un tipo que no existía en el esquema: `extraction` (color `--extraction:#FF3366`
en `assets/style.css`, estilo propio en `EDGE_STYLE` de `app.js`, fila añadida a la
leyenda de `index.html`) — la primera categoría del mapa que describe una acción
hostil de un laboratorio contra otro, no vigilancia ni coordinación.

Verificado contra los dos informes oficiales de Anthropic (no solo prensa):

- **Informe del 23 feb. 2026** ("Detecting and preventing distillation attacks"):
  DeepSeek (150.000+ interacciones), Moonshot AI (3,4M, cientos de cuentas
  fraudulentas), MiniMax (13M) — combinadas, +16M interacciones vía ~24.000 cuentas.
- **Informe de sept. 2026** ("threat-intelligence-report-september-2026"), 7 campañas
  con código GTG: Alibaba/Qwen (GTG-16005, 151M interacciones may.-jul. 2026 — la
  mayor campaña de distillation que Anthropic ha documentado nunca), Moonshot AI
  (GTG-16002, 23M, 5.380 cuentas, enrutaba peticiones de Kimi a Claude sin avisar a
  sus usuarios), DeepSeek (GTG-16001, 12,1M en 14 días de jul. 2026), Zhipu/Z.ai
  (GTG-16006, 3,4M en 17 días jun.-jul. 2026, 273 cuentas rotativas), Xiaomi
  (GTG-16008, 400.000+ en 20 días mar.-abr. 2026, vía harnesses OpenClaw/OpenCode),
  MiniMax (GTG-16003, red de cuentas proxy vía empresa pantalla).

**SenseTime** (GTG-16012 en el informe de septiembre, compra de transcripciones a
proveedores de datos externos) queda **sin nodo ni arista** — no se investigó como
`frontier-lab` con el mismo criterio que los demás; anotado en `BACKLOG.md` como
candidato pendiente, no descartado.

## 2026-09-14 (FLI AI Safety Index y evaluación conjunta de Kimi K3)
4 aristas `eval` más, sin nodos nuevos:

- `fli → zhipu-ai` (D-), `fli → alibaba-qwen` (D-), `fli → deepseek` (F): las tres
  únicas empresas chinas entre las 9 evaluadas en el AI Safety Index de verano de
  2026 (fuente: futureoflife.org/ai-safety-index-summer-2026). Confirmado que
  moonshot-ai, minimax, bytedance-seed, tii y g42 **no** aparecen en ese informe —
  ausencia real, no hueco de búsqueda.
- `us-aisi → moonshot-ai`: evaluación conjunta UK AISI/CAISI de la capacidad
  cibernética de Kimi K3 (jul. 2026) — muy por debajo de la frontera en general,
  pero por delante de GLM-5.2 (Zhipu) en dos pruebas concretas, dato que matiza la
  jerarquía interna entre labs chinos que ya apuntaba la evaluación de DeepSeek V4.

## 2026-09-14 (evaluaciones de AISI sobre labs chinos)
Se añaden 4 aristas `eval` con fuente primaria directa (nist.gov, aisi.gov.uk), sin
nodos nuevos:

- `us-aisi → deepseek` ×2: evaluación de R1/R1-0528/V3.1 (sept. 2025 — hallazgos de
  seguridad relevantes: agentes 12× más propensos a seguir instrucciones maliciosas,
  94% de éxito de jailbreaking común frente al 8% de EE. UU., 4× más narrativas del
  PCCh inexactas) y evaluación de V4 Pro (may. 2026 — ~8 meses por detrás de la
  frontera, "el modelo de IA de la RPC más capaz evaluado por CAISI hasta la fecha").
- `uk-aisi → deepseek` y `uk-aisi → zhipu-ai`: evaluación conjunta de capacidad
  cibernética (jul. 2026) de DeepSeek V4-Pro y GLM-5.2 — brecha de 4-7 meses frente a
  modelos cerrados de frontera, más estrecha que los 6-10 meses medidos en 2025.

Búsqueda también en METR y Apollo Research: sin evidencia de evaluación específica
publicada sobre ningún laboratorio chino a fecha de esta sesión — no se añade nada
por ausencia de fuente, según la regla de no tratar un hueco como dato.

## 2026-09-14 (puentes entre laboratorios de frontera: Frontier Model Forum y Seoul Commitments)
Se añaden 2 nodos y 10 aristas para modelar las dos únicas relaciones documentadas
entre laboratorios de frontera occidentales y chinos (el usuario aportó el hallazgo
inicial con fuentes; se verificó cada dato contra la fuente primaria antes de escribir
la ficha, y se corrigió un matiz):

- **`frontier-model-forum`** (`type: network`) — organismo anunciado el 26 de julio
  de 2023 por Anthropic, Google, Microsoft y OpenAI; Amazon y Meta se unieron el 20
  de mayo de 2024. Ningún laboratorio chino es miembro. Aristas hacia `anthropic`,
  `openai` y `google-deepmind` (miembros fundadores; Amazon/Meta no son nodos en
  el mapa todavía).
- **`seoul-frontier-ai-commitments`** (`type: document`) — compromiso voluntario de
  la Cumbre de IA de Seúl, 21 de mayo de 2024, 16 firmantes. Aristas hacia
  `anthropic`, `openai`, `google-deepmind`, `g42` y `tii` (`network`, cofirmantes) y
  hacia `zhipu-ai` y `minimax` (`weak`, con matiz: Zhipu fue la única china en la
  lista *original*, no la norma del ecosistema chino — el resto de laboratorios
  chinos invitados no firmaron, según Carnegie Endowment).

**Corrección respecto al hallazgo aportado por el usuario:** la lista de firmantes no
se cerró en mayo de 2024. El documento oficial de gov.uk (actualizado feb. de 2025,
antes de la Cumbre de IA de París) muestra 4 firmantes añadidos después: Magic,
MiniMax, 01.AI y NVIDIA — es decir, **MiniMax y 01.AI son dos laboratorios chinos
adicionales que también se sumaron**, aunque más tarde y sin llegar a publicar el
marco de seguridad que el compromiso les exigía. Como `minimax` ya es un nodo del
mapa, se añadió esa arista con esa nota; `01.AI` no está en el mapa, no se creó nodo
para no hacerlo solo por esta relación.

## 2026-09-14 (laboratorios frontier de Asia y el mundo árabe)
Se añaden 8 nodos `frontier-lab`/`funding` y 1 arista, investigados y aprobados en
bloque desde `research/candidatos.md`:

- China: `deepseek`, `alibaba-qwen` (Alibaba Cloud — Qwen / Tongyi Lab),
  `moonshot-ai`, `zhipu-ai` (Z.ai), `minimax`, `bytedance-seed`. Los seis pasan el
  criterio de "frontera" por benchmarks públicos comparados directamente con
  GPT/Claude/Gemini o por estatus de "AI Tiger" chino.
- Emiratos Árabes Unidos: `tii` (Technology Innovation Institute, familia Falcon,
  `frontier-lab`) y `g42` (Group 42, holding de cómputo/inversión soberana,
  `type: "funding"` — no encaja perfectamente en ninguna categoría existente, ver
  nota en el commit). Arista `tii → g42` (`network`, joint venture AI71, marzo 2024).

Descartados por no cumplir el criterio de frontera (ambición/capital sin capacidad de
frontera construida de forma independiente, o modelo de escala regional pequeña):
Sakana AI (Japón), Naver/LG AI Research (Corea del Sur), HUMAIN (Arabia Saudí), Jais
(MBZUAI/Core42) y ALLaM (SDAIA) — ver `research/descartados.md`.

También se descarta definitivamente el candidato CEGIA (Ayuntamiento de València),
propuesto el 2026-09-13: el usuario decidió no añadirlo al mapa.

Nota de esquema: los 8 nodos nuevos **no** llevan campo `panel` — se confirmó que
`site/app.js` ya no usa ese campo para nada (el mapa es un grafo de fuerza D3 puro,
sin agrupación visual regional); los nodos antiguos que aún lo llevan son resto
muerto, sin limpiar en esta sesión para no mezclar ese cambio de esquema con la
adición de datos.

## 2026-09-14 (nueva página "Qué es la ASI")
Se añade `site/asi.html`, página divulgativa independiente enlazada desde el
mapa, que explica qué es la ASI, por qué se plantea como riesgo y qué hace
cada tipo de organización catalogada. Enfoque neutral: expone los argumentos
de quienes lo consideran un riesgo serio y de quienes lo cuestionan (por el
riesgo en sí o por el motivo de quien lo invoca), sin tomar partido.

Contenido con cita textual y fuente primaria para cada afirmación atribuida,
entre otros: Hinton, Bengio, Russell, Yudkowsky, Amodei (BNN Bloomberg,
Bulletin of the Atomic Scientists, TIME, ensayos propios), LeCun y Ng como
voces escépticas (TechCrunch/WSJ, comparecencia escrita de Ng ante el Senado
de EE. UU.), y cobertura completa del episodio "we must pace the frontier"
de septiembre de 2026 (Amodei, Altman, Musk, Hassabis, Jacob Coxon, David
Krueger, y el escepticismo sobre el motivo de David Sacks y Chamath
Palihapitiya), verificado contra BBC News y The Guardian directamente. El
research completo, incluidas las citas descartadas por falta de fuente
primaria verificable, queda en `research/asi-page-quotes.md`.

`site/index.html` lleva un enlace nuevo hacia la página nueva. No se
modifica `data.json`.

Ajustes posteriores en la misma sesión:
- El enlace se puso primero dentro de `#subtitle`, pero `app.js:90`
  sobrescribe ese elemento con `meta.subtitle` de `data.json` en cada carga
  (vía `textContent`), así que nunca llegaba a verse. Se movió a un `<p>`
  propio, fuera del elemento que gestiona `app.js`.
- Texto del enlace ajustado a "¿Quieres saber qué es la ASI y por qué se
  vigila? →".
- Las referencias inline a nodos del mapa (`.node-ref` en `assets/asi.css`)
  pasan de caja gris con borde apenas visible a chip con el acento teal del
  propio mapa, más legible.

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
