# Quién vigila a la superinteligencia

Mapa interactivo (HTML/SVG/JS estático, sin build) de las organizaciones que investigan,
vigilan, financian o hacen incidencia sobre el riesgo existencial de AGI/ASI, junto a los
laboratorios de frontera que son su objeto.

**Publicado en:** https://avallesalas.github.io/vigilancia-asi/

## Estructura

- `index.html` — maquetación, estilos y contenedores del mapa. No contiene datos.
- `app.js` — lee `data.json` y renderiza el SVG. No contiene datos.
- `data.json` — nodos y aristas. **Única fuente de datos del mapa.**
- `asi.html` — página divulgativa independiente ("¿Qué es la ASI?"), enlazada
  desde `index.html`. Contenido propio con cita y fuente primaria por
  afirmación; no lee `data.json`. Sus enlaces a nodos del mapa usan
  `index.html?node=<id>` (ver "Enlaces desde asi.html a nodos del mapa" en
  `CLAUDE.md`), que centra el zoom, resalta el nodo y abre su ficha.
- `assets/asi.css` — estilos de `asi.html`, separados de `assets/style.css`.
- `noticias.html` + `news.json` — página "Noticias": qué ha pasado en el mundo
  AGI en cada periodo, con fuente por noticia y enlaces a los nodos del mapa.
  Los datos están en `news.json`, no en el HTML.
- `changelog.html` + `releases.json` — página "Novedades del mapa": notas de
  versión en lenguaje llano, una por fecha. Los datos están en `releases.json`.
- `assets/pages.css` — estilos propios de Noticias y Novedades (reutilizan el
  esqueleto de `assets/asi.css`).
- `CHANGELOG.md` — registro técnico: qué cambió y qué se verificó en cada
  actualización. No lo enlaza ninguna página; las notas de versión públicas
  están en `releases.json`.

Esquema y reglas de `news.json` y `releases.json`: sección "Páginas de Noticias
y Novedades del mapa" de `CLAUDE.md` (repo de trabajo).

## Datos y verificación

Cada nodo y arista lleva `confidence: "verified" | "unverified"`. "Verified" exige una
fuente primaria citable en `source`. Cuando no existe fuente localizable, el campo dice
literalmente `"not found"`: preferimos un hueco explícito a un dato inventado.

Si encuentras un error, abre una issue con la fuente que lo contradice.

## Desarrollo local

```bash
python3 -m http.server 8000   # http://localhost:8000
```

Un servidor es necesario: `app.js`, `noticias.html` y `changelog.html` cargan
sus JSON con `fetch`, que no funciona abriendo el fichero con `file://`.
