# Changelog

## v2.1.0 — 2026-06-12 _(en progreso · rama `feat/shell-parity-ruleta`)_

**Iteración shell-parity + cimientos para el feature Ruleta de Sorteo.**
Lleva el chrome de Digitación a paridad con los módulos refinados (IVC / Project / sidebar-shell).

### Añadido
- **Footer pill de versionamiento** (`shared/naowee-footer.{js,css}`): logo + © + `Digitación v2.1.0` con link al release. Embed-aware (oculto en iframe del host), scroll-hide en capture phase. Patrón IVC (DESIGN-PATTERNS §3.8).
- **`dashboard.html` migrado al shell canónico** (piloto): consume `shared/tokens.css` + `shared/shell.css` + `shared/sidebar.js` (mount de sidebar + header + demo role switcher), rol `DIGITIZER`. Mismo patrón que `eventos.html`.

### Decisiones (correcciones basadas en evidencia)
- **Se mantiene el DS local** `design-system.css` (NO se migra a CDN `@v1.8.0`): el DS local está por delante del CDN (trae refinaciones aún no promovidas) y es el estándar del repo (lo usa el beachhead `eventos.html`). Un swap regresaría la demo.
- **Se mantiene la clase `.collapsed`** (no `.is-collapsed`): es la que usan `shared/sidebar.js` y el host `naowee-test-sidebar-shell`. Renombrar rompería la alineación con el host.

### Pendiente (rollout)
- Migrar al shell canónico el resto de páginas: `lista.html`, `stepper.html`, `digitador.html`, `detalle.html`, `coordinadores.html`, `digitadores.html`, `preview.html`.
- Fase B: drawer móvil off-canvas + unificación del switcher en todas las páginas.

## v2.0.0 — 2026-04-15

**Re-fundación como repo independiente.** Extracción de la carpeta `digitacion/` desde el monorepo `naowee-tech/digitacion-ui-ux-demo` (archivado como `digitacion-ui-ux-demo-legacy`) a su propio repositorio en cuenta personal para:

- Activar GitHub Pages (el repo legacy estaba en naowee-tech privado, sin Pages funcionales)
- Separar prototipos UX de datos (`parametrizacion-deportes`) y handoff técnico (`handoff-engines`)
- Alineación con la convención de usar `douguizard/*-ux-ui-demo` para prototipos visuales

### Estado al momento del split
- 30+ deportes parametrizados con 6 tipos de puntuación
- Modal de scoring unificado con routing automático por tipo de deporte
- Flujo Coordinador de Eventos + Digitador completo
- Design System Naowee con tokens y componentes BEM

### Historial previo
Todo el historial git anterior a este punto vive en `naowee-tech/digitacion-ui-ux-demo-legacy` (archivado, read-only). Allí están los tags v1.0.0 a v1.24.1 con la evolución detallada.

### Documentación
- [`ACTA-MVP.md`](./ACTA-MVP.md) — acta completa con historias de usuario, criterios de aceptación y backlog para JIRA.
