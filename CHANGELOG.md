# Changelog

Formato: fecha, qué cambió, qué se verificó en esa sesión.

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
- Pendiente: los campos `url` de los nodos `unverified` usan dominios oficiales
  conocidos pero no verificados con búsqueda en esta sesión — no son URLs inventadas,
  pero tampoco cumplen el estándar de "verified". Confirmar en una próxima sesión de
  investigación.
