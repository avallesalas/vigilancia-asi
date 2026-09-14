# Changelog

Formato: fecha, qué cambió, qué se verificó en esa sesión.

## 2026-09-15 (deep-linking a nodos del mapa + estandarización de los enlaces node-ref de asi.html)

Los enlaces "↗ Nombre" de `asi.html` hacia el mapa llevaban siempre a
`index.html` a secas — el lector tenía que buscar el nodo a mano entre los 71.
Ahora:

- **`site/app.js`**: `render()` lee `?node=<id>` de la URL y lo pasa a
  `buildForceGraph`. Al terminar la simulación, si hay un nodo objetivo, la
  vista hace zoom y centra sobre él (en vez del encuadre general de todo el
  grafo), lo resalta atenuando el resto (reutilizando `highlight()`, la misma
  lógica que ya se usaba en el hover) y abre su ficha automáticamente
  (`showPopupAt` + `nodeDetailHTML`).
- **`site/asi.html`**: los 22 enlaces `node-ref` pasan de `href="index.html"`
  a `href="index.html?node=<id>"`, con el id real de cada nodo en `data.json`.

Probado en local (`python3 -m http.server` + Claude in Chrome) con `?node=miri`
y `?node=frontier-ai-risk-mgmt-framework`: ambos casos centran, resaltan y
abren la ficha correctamente, incluido un nodo de documento en la banda
superior (más estrecha) del layout.

## 2026-09-15 (nueva sección "Y mientras tanto, en China..." en asi.html + Frontier AI Risk Management Framework en el mapa)

**`site/asi.html`:**
- Reescritos varios párrafos de "Qué es la ASI" y del argumento de "Objetivos
  mal especificados" y "Dificultad de verificación" a petición del usuario,
  con dos ejemplos nuevos verificados: el caso de CoastRunners (OpenAI,
  "Faulty Reward Functions in the Wild", dic. 2016) y el paper de
  "Alignment Faking in Large Language Models" (Anthropic/Redwood Research,
  dic. 2024).
- Añadido un contraargumento al episodio "slow down" de 2026: la crítica de
  que ralentizar de forma coordinada pidiendo supervisión gubernamental
  beneficia a quien ya lidera la carrera ("regulatory capture"), con cita de
  Simon Sharwood en The Register (14 de sept. de 2026) y el detalle de que
  las restricciones de exportación de chips a China que propone Amodei dan
  a la propuesta un efecto competitivo geográfico concreto.
- **Nueva sección "Y mientras tanto, en China..."**, entre "Quién lo
  cuestiona y por qué" y "Qué hace el resto del mapa" (con su entrada en los
  dos índices, de escritorio y móvil): cubre el giro de la comunidad técnica
  y política china hacia el vocabulario de riesgo catastrófico desde
  IDAIS-Beijing (marzo de 2024, con la exviceministra Fu Ying entre las
  firmantes), la institucionalización vía CnAISDA (feb. 2025) y el Frontier
  AI Risk Management Framework de Shanghai AI Lab/Concordia AI, y el diálogo
  bilateral EE. UU.-China sobre seguridad de IA previsto para mediados de
  sept. de 2026 tras dos años sin contacto oficial (Taipei Times/Bloomberg
  Opinion, 15 de sept. de 2026).
- Corregido un error propio: había escrito que CnAISDA se fundó en junio de
  2025, tomado de una síntesis de búsqueda no verificada; la fecha correcta,
  ya confirmada en `data.json`, es febrero de 2025 (Cumbre de Acción sobre
  IA de París).

**`site/data.json`:**
- Nuevo nodo `frontier-ai-risk-mgmt-framework` (documento): el marco de
  gestión de riesgo catastrófico de Shanghai AI Lab/Concordia AI, que ya se
  mencionaba de pasada en la ficha de `shanghai-ai-lab` pero no tenía nodo
  propio, a diferencia de compromisos equivalentes como
  `seoul-frontier-ai-commitments`. Se documentan sus tres versiones: v1.0
  (25 jul. 2025), v1.5 (25 feb. 2026) y v2.0 (19 jul. 2026, WAIC 2026).
- 2 aristas de coautoría (`frontier-ai-risk-mgmt-framework` → `shanghai-ai-lab`,
  `frontier-ai-risk-mgmt-framework` → `concordia`).
- 6 aristas `eval` (`shanghai-ai-lab` → `deepseek`, `meta-msl`,
  `alibaba-qwen`, `anthropic`, `google-deepmind`, `openai`), a partir de la
  Tabla 2 del informe técnico del framework (arXiv 2507.16534), que evalúa
  17 modelos de 7 desarrolladores. Mistral AI, el séptimo desarrollador
  evaluado, se queda fuera por no tener nodo en el mapa.
- Corregida una arista existente (`shanghai-ai-lab` → `concordia`) que
  databa la coautoría del framework en noviembre de 2025, mezclándolo con
  la Frontier AI Risk Monitoring Platform (que sí es de esa fecha); ahora
  la arista se refiere solo a la Monitoring Platform, y la coautoría del
  framework queda representada por las dos aristas nuevas del punto
  anterior.

Todo lo anterior se investigó y volcó primero en `research/candidatos.md`
para aprobación explícita del usuario antes de tocar `data.json`, siguiendo
el flujo de este proyecto; el archivo queda vacío de nuevo tras aprobarse.

## 2026-09-14 (rediseño de la disposición visual del grafo — sin cambios de datos)
Con el mapa ya en 70 nodos, el grafo de fuerza "libre" se había vuelto difícil de
leer (apelotonado en el centro, con algún nodo disparado lejos). Serie de ajustes
en `site/app.js`/`site/assets/style.css`, ninguno toca `data.json`:

- Etiquetas de nodo más grandes (9px → 12px) y más espacio entre nodos
  (distancia de enlace y repulsión al alza) para compensar.
- **Disposición en tres paneles fijos**, a petición del usuario (con boceto):
  documentos arriba, laboratorios de frontera en medio, el resto de
  organizaciones abajo — visualiza el eje documento → laboratorio → vigilancia.
  Cada nodo lleva un *clamp* duro de posición en cada tick (no solo una fuerza
  suave): no puede salir de su panel aunque un enlace tire hacia otra capa.
- Dentro de cada panel, reparto horizontal de punta a punta por región
  geográfica (derivada de `country`). Los documentos (sin país real en su
  mayoría) se reparten por orden de aparición; los laboratorios recalculan las
  fracciones de región solo entre las regiones que de verdad tienen algún
  laboratorio, para no apelotonarse en el tercio del panel que les
  correspondería con las fracciones fijas de la banda de abajo (que sí cubre
  las 8 regiones).
- Corregido un bug de la primera versión de esta disposición: documentos y
  laboratorios derivaban hacia la izquierda (arrastrados por sus aristas hacia
  el clúster EE. UU./Reino Unido) en vez de quedarse centrados/repartidos.

Detalle completo de la lógica en `CLAUDE.md`, sección "Disposición visual del
grafo". Cada paso se probó en local (`python3 -m http.server` + Claude in
Chrome) antes de publicar.

## 2026-09-14 (investigación profunda de las 18 aristas sin verificar: 11 pasan a verified)
El usuario pidió una investigación "profunda y cuidadosa" de las 18 aristas
`unverified` que quedaban en el backlog. Siguiendo la regla de no quedarse con la
primera fuente plausible, cada una se buscó con al menos dos formulaciones
distintas y se priorizó fuente primaria. Resultado: 11 confirmadas con cita
concreta (pasan a `confidence: "verified"`), 6 confirmadas como genuinamente sin
fuente (quedan `unverified`, detalle en `BACKLOG.md`), 1 sin cambios por falta de
evidencia nueva.

**Verificadas (11):**
- `sff → miri` (`funding`): 1.607.000$ recomendados en la ronda 2025 de SFF
  (46.000$ Main + 1.561.000$ Freedom), más 215.000$ de subvención especulativa
  previa y 1.392.000$ de compromiso de igualación — cifra exacta de
  survivalandflourishing.fund/2025/recommendations.
- `book-iabi → controlai` (`narrative`): ControlAI presenta el libro de forma
  destacada en la página de citas de su propia web (Buterin, Shear, Aaronson) y
  coorganizó con PauseAI UK una fiesta de lanzamiento no oficial en Londres el
  22 de sept. de 2025 — reemplaza la afirmación anterior sin fuente ("se le
  atribuye la recomendación a su personal") por lo que sí está documentado.
- `pauseai → controlai` (`weak` → `network`): el mismo evento conjunto de
  lanzamiento del libro (22 sept. 2025, Londres).
- `govai → cser` (`weak` → `network`): Allan Dafoe, fundador y presidente de
  GovAI, figura como Research Affiliate en la propia web de CSER.
- `cser → lcfi` (`weak` → `network`): LCFI se desarrolló dentro de CSER antes de
  independizarse, y ambos mantienen el programa conjunto AI:FAR.
- `govai → lcfi` (`weak` → `network`): coautoría de investigación entre Markus
  Anderljung (GovAI) y Haydn Belfield (LCFI/CSER) en "Computing Power and the
  Governance of Artificial Intelligence" (2024).
- `aesia → isms` (`weak` → `network`): reunión documentada el 15 de oct. de 2024
  entre el grupo de IA de ISMS Forum y el entonces director general de AESIA.
- `cnaisda → concordia` (`weak` → `network`): Concordia AI fue invitada a un
  seminario a puerta cerrada de CnAISDA en torno a la Cumbre de Acción sobre IA
  de París (feb. 2025) — confirmado con el propio informe de impacto de
  Concordia AI, no con un agregador.
- `pauseai → openai`, `pauseai → anthropic`, `pauseai → google-deepmind`
  (`protest`): fechas y ubicaciones concretas encontradas para cada uno —
  12 feb. 2024 (sede de OpenAI, SF), 6 dic. 2024 (sede de Anthropic, SF) y
  30 jun. 2025 (sede de Google DeepMind, Londres, la protesta más grande de
  PauseAI hasta la fecha) — todas con fuente primaria de la propia PauseAI.

**Confirmadas sin fuente tras búsqueda activa (6, detalle completo en
`BACKLOG.md`):** `book-iabi → stopai`, `controlai → uk-aisi`,
`controlai → us-aisi`, `orcg → lanas`, `lanas → ai-safety-brazil`,
`lanas → cegia`.

**Advertencia sobre `cesia → inesia`:** una búsqueda inicial produjo la frase
"CeSIA dialoga con el Senado, el Ministerio de Defensa e INESIA", que resultó
ser una síntesis de un resumen de búsqueda sin respaldo al rastrearla hasta sus
fuentes primarias (cesia.org, aiforhumanity.eu, manifund.org, y el propio post
que la mencionaba). Se descartó explícitamente en vez de escribirla en el mapa
— exactamente el tipo de error que la regla de "no quedarse con la primera
fuente" está pensada para atrapar.

## 2026-09-14 (la arista que sostiene la descripción de Concordia AI como "puente")
El usuario notó que el `desc` de `concordia` dice que "actúa de puente entre el
ecosistema chino y el internacional de seguridad de IA", pero las 6 aristas `eval`
añadidas poco antes (Frontier AI Risk Monitoring Platform) van hacia *laboratorios*
(openai, anthropic, deepseek...), no hacia el ecosistema *vigilante* internacional
— evaluar a un lab occidental no es lo mismo que ser puente con la comunidad de
seguridad de IA. Verificado con la propia web de GovAI: Brian Tse, fundador y CEO
de Concordia AI, es Policy Affiliate de GovAI desde 2019. Añadida
`concordia → govai` (`network`) — la conexión concreta que sostiene esa frase del
`desc`, que antes no tenía ninguna arista propia detrás.

## 2026-09-14 (Tencent y Shanghai AI Lab: los dos candidatos de la auditoría, aprobados)
El usuario aprobó añadir los dos candidatos que salieron de la auditoría de
consistencia (ver entrada anterior). Dos nodos y 11 aristas:

- **`tencent`** (Tencent — Hunyuan, `frontier-lab`): división de modelos de
  fundación presentada en sept. 2023; Hunyuan-3 (2026) es un MoE de 295.000M de
  parámetros. Aristas `funding` hacia `zhipu-ai` (1,58% tras salida a bolsa),
  `minimax` (2,58%) y `moonshot-ai` (uno de los primeros inversores) — todas
  `confidence: "verified"`. La arista `→ deepseek` se añade con
  **`confidence: "unverified"`**, tal y como se advirtió en `candidatos.md`: la
  ronda estaba en negociación en abril de 2026 (Alibaba se retiró, Tencent entró
  como minoritario) sin que se haya confirmado el cierre final ni el porcentaje.
- **`shanghai-ai-lab`** (`research`, fundado 2020): coautor junto a Concordia AI
  del Frontier AI Risk Management Framework y la Frontier AI Risk Monitoring
  Platform (nov. 2025). Arista `→ concordia` (coautoría) y las mismas 6 aristas
  `eval` que ya tiene Concordia hacia openai/anthropic/deepseek/alibaba-qwen/
  minimax/spacexai (Shanghai AI Lab es coautor del mismo trabajo, no una entidad
  separada que llegó por su cuenta a las mismas conclusiones).

El mapa queda en 70 nodos y 128 aristas.

## 2026-09-14 (auditoría completa de consistencia: 17 aristas nuevas)
El usuario pidió recorrer todo `data.json`, verificar con fuentes primarias que no
faltan aristas relevantes entre los nodos existentes, y anotar como candidatos
(sin añadirlos) cualquier organización nueva que apareciera en el proceso. Método:
un script comparó el texto de `desc`/`summary` de cada nodo contra los nombres de
todos los demás para detectar menciones sin arista correspondiente, más
investigación dirigida en la web para relaciones no mencionadas explícitamente en
ningún nodo. 17 aristas nuevas, todas entre nodos ya existentes:

- `anthropic → openai` (`split`): los 8 fundadores de Anthropic dejaron OpenAI en
  2021 por desacuerdo sobre el ritmo de comercialización frente a la seguridad.
- `controlai → conjecture`, `minimax → sensetime`, `xiaomi-mimo → deepseek`
  (`network`): linaje de fundadores/personal ya citado en el propio `desc` de
  cada nodo, sin arista hasta ahora.
- `baai → xiaomi-mimo`, `baai → bytedance-seed` (`network`): Xiaomi y ByteDance
  son instituciones fundadoras de BAAI (2018), ya mencionado en su `desc`.
- `baai → cnaisda` (`network`): BAAI es una de las instituciones integradas en la
  red de CnAISDA (Carnegie Endowment).
- `ilina-program → govai` (`network`): antiguos becarios de ILINA continúan en la
  fellowship de GovAI, ya citado en el `desc` de ILINA.
- `alibaba-qwen → moonshot-ai` (~36%, ~5.000M$), `→ zhipu-ai` (ronda 2023 + 140M$
  en 2025) y `→ minimax` (12,52%, segundo mayor accionista) (`funding`): Alibaba
  es inversor documentado en los tres, con cifras y fechas concretas.
- `g42 → openai` (`funding`): MGX (G42+Mubadala) coinvirtió en la Serie E de
  6.600M$ de OpenAI, oct. 2024.
- `concordia → openai/anthropic/deepseek/alibaba-qwen/minimax/spacexai` (`eval`):
  los seis modelos (GPT, Claude, DeepSeek, Qwen, MiniMax, Grok) que Concordia AI
  nombra explícitamente entre los que monitoriza en su Frontier AI Risk Monitoring
  Platform (nov. 2025).
- `metr → google-deepmind`, `metr → meta-msl` (`eval`): ambos participaron, junto
  a Anthropic y OpenAI (ya conectados), en el ejercicio piloto de METR sobre
  riesgos de desalineación en agentes internos (feb.-mar. 2026).
- `africa-ai-council → au-continental-ai-strategy` (`network`): el Africa AI
  Council está copresidido por la Comisión de la UA y la UIT para alinearse
  con la estrategia continental.
- `statement-2023 → openai/google-deepmind/anthropic` y `saferai →
  anthropic-rsp`: ver entrada de más abajo (esta misma sesión, encontradas por el
  usuario antes de pedir la auditoría completa).

Dos organizaciones nuevas surgieron repetidamente en la investigación y quedan en
`research/candidatos.md` sin añadir (Tencent —coinversor recurrente en Zhipu/
Moonshot/MiniMax/DeepSeek, con su propio modelo Hunyuan— y Shanghai AI Lab
—coautor junto a Concordia AI del trabajo que dio pie a las 6 aristas `eval`
nuevas—), a la espera de aprobación explícita para crear nodo.

Nodos sin ninguna arista que se investigaron pero para los que **no se encontró**
relación documentada con el resto del mapa (más allá de compartir región, ya
señalado en la sesión anterior): `india-aisi`, `asean-ai-safe`, `sdaia`, `cenia`,
`au-continental-ai-strategy` (ahora sí conectado, ver arriba), `ai-safety-cape-town`.
Comprobado explícitamente y descartado por falta de fuente: una relación directa
SDAIA↔G42/TII (la cooperación Golfo-EE. UU. en chips es bilateral con Washington,
no un acuerdo SDAIA-G42/TII en sí) y CENIA↔LANAIS/AI Safety Brazil (CENIA coordina
LatamGPT con otras instituciones, ninguna de ellas es un nodo del mapa).

## 2026-09-14 (aristas que faltaban entre documentos y los labs que mencionan)
El usuario notó que `statement-2023` describe en su propio `desc` que lo firmaron
los CEOs de OpenAI, Google DeepMind y Anthropic, pero no tenía ninguna arista hacia
esos tres nodos — solo la de autoría con `cais`. Añadidas las 3 aristas que
faltaban (`network`, "signatario (CEO, mayo 2023)", confirmado con TIME/TechCrunch
además de la fuente ya citada en el nodo).

Auditoría rápida del resto de nodos `document` para buscar el mismo patrón (un lab
mencionado en el texto sin arista): encontrada una más, `saferai → anthropic-rsp`
(`eval`, "SaferAI publicó un análisis titulado 'Anthropic's responsible scaling
policy update makes a step backwards'"), que ya estaba citada en el `desc` de
`anthropic-rsp` sin arista propia. El resto de coincidencias de la auditoría eran
falsos positivos (substrings como "metr" dentro de "parámetros").

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
