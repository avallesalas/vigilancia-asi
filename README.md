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
  afirmación; no lee `data.json`.
- `assets/asi.css` — estilos de `asi.html`, separados de `assets/style.css`.
- `CHANGELOG.md` — qué cambió y qué se verificó en cada actualización.

## Datos y verificación

Cada nodo y arista lleva `confidence: "verified" | "unverified"`. "Verified" exige una
fuente primaria citable en `source`. Cuando no existe fuente localizable, el campo dice
literalmente `"not found"`: preferimos un hueco explícito a un dato inventado.

Si encuentras un error, abre una issue con la fuente que lo contradice.

## Desarrollo local

```bash
python3 -m http.server 8000   # http://localhost:8000
```

Un servidor es necesario: `app.js` carga `data.json` con `fetch`, que no funciona
abriendo el fichero con `file://`.
