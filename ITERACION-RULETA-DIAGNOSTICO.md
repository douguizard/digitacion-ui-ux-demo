# Digitación — Diagnóstico de desfase + plan de iteración (Ruleta de Sorteo)

> Fecha: 2026-06-12 · Autor: Claude (sesión de retoma)
> Repo canónico de trabajo: `naowee-tech/naowee-test-digitacion`
> Clon limpio local: `/Users/dvargas/Desktop/naowee-test-digitacion`
> Objetivo de la iteración: (1) llevar el shell/DS de Digitación a **paridad** con
> los módulos refinados (IVC, Project, sidebar-shell) y (2) preparar el terreno para
> el nuevo feature **Ruleta de Sorteo** (pendiente de video + mapa de flujo con HU/CA).

---

## 0. Aclaración de ubicación (importante)

Existen DOS clones del mismo remote `naowee-test-digitacion`:

| Ruta | Estado | Veredicto |
|---|---|---|
| `/Users/dvargas/Desktop/Claude-Doug/digitacion/` | Snapshot del 11-may, 19 archivos, sin CHANGELOG. El repo `Claude-Doug` está **105 adelante / 12 atrás** de `origin/main` (carpeta-escritorio personal, mezclada con demos-hub, eventos, suid…). | **Stale. No trabajar aquí.** |
| `/Users/dvargas/Desktop/naowee-test-digitacion/` | Clon limpio, rama `style/lista-digitadores-and-portal-cleanup` (**4 adelante / 0 atrás** de `origin/main`), con CHANGELOG/README/ACTA-MVP y los commits de refinamiento más recientes. | **Canónico. Trabajar aquí.** |

`origin/main` ya migró a archivos en raíz + **portales iframe** (`eventos-portal.html`, `mi-digitacion-portal.html`, `dashboard-portal.html`, `lista-portal.html`) para embeberse en `naowee-test-sidebar-shell`.

---

## 1. Qué es el módulo (recopilación)

Prototipo HTML/CSS/JS vanilla para **digitación de competencias deportivas**. Dos perfiles operativos:

- **Coordinador de Eventos** — dashboard, lista de competencias, wizard de creación (4 pasos), gestión de coordinadores/digitadores, eventos.
- **Digitador** — dashboard de asignadas + **modal de scoring** unificado (motor `SPORTS_DB`, 30+ deportes, 6 tipos de puntuación: acumulativa_tiempos, innings, sets, combate, marca, jueces), penalizaciones, descalificaciones, estadísticas, incidencias.

### Inventario de páginas

| Página | Propósito | Perfil |
|---|---|---|
| `index.html` | Redirect a `dashboard.html` | — |
| `dashboard.html` | Home Coordinador: stat cards + lista + asignar digitador | Coordinador |
| `lista.html` | Lista de competencias (pills de deporte, filtros estado, búsqueda) | Coordinador |
| `stepper.html` | Wizard crear competencia (4 pasos) | Coordinador |
| `detalle.html` | Detalle de competencia: tabs Info / Enfrentamientos / **Ranking·Resultados** / Timeline | Coordinador + Digitador |
| `digitador.html` | Home Digitador + lanzador del modal de scoring | Digitador |
| `eventos.html` | Lista de eventos (stat cards + segment de estado) — usa `shared/sidebar.js` | Coordinador |
| `evento-detalle.html` | Detalle de evento: tabs Competencias / Instituciones / Deportistas / Personal / Resultados(stub) — usa `shared/sidebar.js` | Coordinador |
| `coordinadores.html` / `digitadores.html` | Gestión de staff | Coordinador |
| `preview.html` | Mockup estático "Configuración del enfrentamiento" (embed-aware) | Coordinador |
| `playground.html` | Showcase del DS (herramienta dev) | Dev/QA |

### Ranking / Resultados / Promociones (lo que el usuario pidió rastrear)

- **Ranking/Resultados** → ✅ **existe**. En `detalle.html` hay una tab **"Resultados"** con lista rankeada oro/plata/bronce (`.ranking-row`, `.ranking-pos p1–p4`, `.ranking-mark`, medallas) sobre `c.ranking`. En `evento-detalle.html` la tab "Resultados" es un **stub** ("Contenido no disponible"). En ACTA-MVP, "Reportes y exportación de resultados" está en **Alcance excluido del MVP**.
- **Promociones** → ❌ **no existe** en este módulo. Cero hits de `promocion|ruleta|sorteo|premio` en el clon limpio, en el snapshot stale y en 200 commits de todas las ramas. (Único `incentivo` aparece en `project/` = Convocatorias, no relacionado.) → **Pregunta abierta:** ¿"Promociones" vive en otro módulo (Incentivos) o es net-new aquí?
- **Ruleta de sorteo** → ❌ no existe aún (es el feature nuevo de esta iteración).

---

## 2. Desfase vs. canónico (IVC / Project / sidebar-shell)

Contrato canónico de referencia, confirmado en IVC (`prototype/shared/*`) y el host `naowee-test-sidebar-shell`.

| # | Dimensión | Canónico (IVC/Project/shell) | Digitación hoy | Severidad |
|---|---|---|---|---|
| 1 | **Fuente del DS** | CDN `naowee-design-system@v1.8.0` (jsDelivr), primero en el `<head>` | **`design-system.css` LOCAL** (222 KB, copia embebida, sin versión) en 10 páginas; cero CDN | 🔴 Alta |
| 2 | **Shell unificado** | `shared/shell.css` + `shared/sidebar.js` (mount dinámico) | Solo `eventos.html` + `evento-detalle.html` usan `shared/`. Las otras 8 páginas **duplican el shell inline** en `<style>` | 🔴 Alta |
| 3 | **Repliegue (collapse) desktop** | `.sidebar.is-collapsed` → 72px, key `naowee-sidebar-collapsed`, tokens `--sidebar-w` / `--sidebar-w-collapsed` | Funciona, pero usa clase `.collapsed` (no `.is-collapsed`); misma key | 🟡 Media (renombrar) |
| 4 | **Drawer móvil (off-canvas)** | `<768px`: sidebar `fixed` translateX, `.is-mobile-open`, trigger hamburguesa flotante, backdrop `body.has-mobile-drawer-open::after`, labels visibles en drawer | **No existe.** Shell desktop-only (`height:100vh; overflow:hidden`), sin `@media` de sidebar | 🔴 Alta (mobile-first) |
| 5 | **Switcher de perfil/rol** | Header `user-chip` + `profile-dd` → navega a `perfil.html?role=CODE`; + pill demo flotante (14 usuarios) | Switcher inline 2 roles (Coordinador/Digitador) vía `fadeAndGo()`+`location.href`, **inconsistente**: eventos/evento-detalle usan el de `shared/sidebar.js`; preview/playground no tienen | 🟡 Media |
| 6 | **Footer pill de versión** | `naowee-footer.js` (`MODULE_NAME` + versión + scroll-hide capture phase) | **No existe.** Sin `naowee-footer.js`, sin `MODULE_NAME`, sin string de versión visible | 🔴 Alta (versionamiento) |
| 7 | **Vocabulario de componentes** | `.naowee-*` canónicos (btn, card, textfield, table, modal, stepper, tabs, dropdown, checkbox, badge, message, segment) | ~20% canónico (eventos/evento-detalle: `naowee-segment`/`naowee-tabs`), ~40% híbrido, ~40% legacy (`.btn`, `.step-*`, `.tab-btn`, `.modal-overlay`, `.float-dd-*`) en stepper/digitador/detalle/preview | 🔴 Alta |
| 8 | **Embed / portales** | Host embebe páginas de módulo vía `<iframe>` (p.ej. `/naowee-test-digitacion/eventos.html`); módulo detecta embed (`embed-mode.js` → `data-embed="1"`) y oculta su chrome (`embed-mode.css`) | Solo eventos/evento-detalle/preview son embed-ready. dashboard/lista/stepper/digitador/detalle **no**. Portales `*-portal.html` están en `origin/main` pero no en esta rama | 🟡 Media |
| 9 | **Infra de versionado** | Versión en footer + cache busters `?v=X.Y.Z` + commit `type(scope): desc vX.Y.Z` | CHANGELOG congelado en v2.0.0 (split), sin esquema de versión por release | 🟡 Media |

**Diagnóstico de una línea:** Digitación está ~1 generación de shell por detrás. Tiene una **cabeza de playa** correcta (eventos.html / evento-detalle.html ya viven sobre `shared/` + DS) pero el 80% restante sigue en shell inline + DS local + componentes legacy, sin drawer móvil ni footer de versión.

---

## 3. Plan de alineación a paridad (propuesto, por fases)

**Estrategia:** extender la cabeza de playa (`shared/shell.css` + `shared/sidebar.js` + DS por CDN) al resto de páginas, migrando componentes legacy → `.naowee-*`, en orden de menor a mayor riesgo. Mobile-first y solo `transform`/`opacity` en animaciones (regla DESIGN-PATTERNS §4).

- **Fase A — Cimientos (sin tocar markup de páginas)**
  - [ ] Migrar al **DS por CDN `@v1.8.0`** y retirar `design-system.css` local (dejar solo overrides reales en `shared/`).
  - [ ] Crear `shared/naowee-footer.{js,css}` con `MODULE_NAME='Digitación'` + versión; montar en todas las páginas (script defer + cache buster).
  - [ ] Consolidar `shared/shell.css` + `shared/tokens.css` como única fuente del shell; renombrar `.collapsed` → `.is-collapsed`.
- **Fase B — Drawer móvil + switcher unificado**
  - [ ] Portar el patrón **drawer off-canvas** (<768px) + trigger + backdrop desde `shared/shell.css` de IVC/shell.
  - [ ] Unificar el **switcher de perfil** al patrón canónico (`user-chip` + `profile-dd`), presente en TODAS las páginas operativas.
- **Fase C — Migración de componentes legacy → `.naowee-*`** (página por página)
  - [ ] `dashboard.html`, `lista.html`, `coordinadores.html`, `digitadores.html` (híbridos → canónico).
  - [ ] `stepper.html` (wizard → `.naowee-stepper`), `digitador.html` + `scoring-modal` (`.naowee-modal`/`.naowee-tabs`/`.naowee-btn`), `detalle.html` (`.tab-btn`→`.naowee-tab`).
- **Fase D — Embed readiness**
  - [ ] `embed-mode.js/css` en las 5 páginas core; (re)generar `*-portal.html` para el host sidebar-shell.

> El feature **Ruleta de Sorteo** se construye sobre estos cimientos (Fase A–B mínimo) una vez llegue el video + HU/CA.

---

## 4. Versionamiento de la iteración (propuesto)

- Base actual: **v2.0.0** (split del legacy).
- **v2.1.0** — Alineación de shell + DS CDN + footer pill + drawer móvil (Fases A–B, sin features nuevos).
- **v2.1.x** — Migración progresiva de componentes (Fase C) + embed (Fase D).
- **v2.2.0** — Feature **Ruleta de Sorteo** (HU/CA del video).
- Footer: `MODULE_NAME='Digitación'`; commit `feat(scope): desc v2.x.y`; cache busters `?v=2.x.y`.

---

## 5. Preguntas abiertas (para Doug)

1. **Promociones** no está en este repo. ¿Vive en **Incentivos** (otro módulo) o es net-new dentro de Digitación?
2. ¿Confirmas trabajar en el clon limpio `naowee-test-digitacion` y abrir rama nueva para la iteración (`feat/shell-parity-ruleta` o similar)?
3. ¿Arranco ejecutando la **Fase A** (cimientos: CDN + footer + shell) ya, o esperamos al video para alinear y construir en un solo barrido?
4. Número de versión de arranque: ¿**v2.1.0** para la alineación?

---

## 6. Decisiones tomadas + estado de ejecución (2026-06-12)

**Respuestas de Doug:** ejecutar Fase A · Promociones = **net-new** (no existe; backlog) · trabajar en el clon limpio + rama nueva.

**Hecho y verificado en navegador (localhost:4800):**
- ✅ Rama `feat/shell-parity-ruleta` creada desde HEAD (main + 4 commits de refinamiento de eventos/lista/digitadores, para no perderlos).
- ✅ Footer pill de versión `shared/naowee-footer.{js,css}` — `Digitación v2.1.0`, embed-aware, scroll-hide. Cableado y verificado en `eventos.html`.
- ✅ `dashboard.html` migrado al shell canónico (piloto) — sidebar+header+demo-switcher montados por `shared/sidebar.js` (rol DIGITIZER: Inicio + Mi digitación), footer pill, 0 errores de consola, contenido (stats + tabla 87 filas) intacto. **Sirve de plantilla** para el resto.

**Correcciones basadas en evidencia (protegen la demo):**
- **NO migrar a DS por CDN.** El `design-system.css` local va por delante de `@v1.8.0`; es el estándar del repo (lo usa `eventos.html`). Se mantiene local.
- **NO renombrar `.collapsed`→`.is-collapsed`.** `shared/sidebar.js` y el host usan `.collapsed`; renombrar rompería la paridad con el host.

**Pendiente (rollout Fase A, mismo patrón que dashboard.html):**
`lista.html` · `stepper.html` · `digitador.html` · `detalle.html` · `coordinadores.html` · `digitadores.html` · `preview.html`.
Roles sugeridos: lista/stepper/coordinadores/digitadores → `EVENT_COORDINATOR`; digitador → `DIGITIZER`; detalle → según contexto.

**Promociones (net-new):** backlog para una iteración futura de Digitación (post-ruleta). No se recopila porque no existe en ningún repo/rama.

**Sin commitear aún** — pendiente tu visto bueno del piloto.
