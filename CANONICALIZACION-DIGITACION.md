# Canonicalización Digitación — aprendizajes (jun-2026)

Registro consolidado del trabajo de canonicalización del módulo Digitación (sorteo, stepper,
lista, evento-detalle, detalle, coordinadores, digitadores, dashboard) a componentes del
Naowee Design System. **Cada regla ya fue inyectada en los SKILL.md** que se cargan al iniciar
una demo — este doc es el índice/registro narrativo.

## Dónde vive cada aprendizaje (skills auto-cargados)

| Skill (`~/.claude/skills/<x>/SKILL.md`) | Qué se agregó |
|---|---|
| `naowee-design-system` | Recetas custom→DS: **gotcha hover loud** (no oscurece), mapa semántico de badges, dropdown→`.naowee-dropdown`, input→`.naowee-textfield`, tabs→`.naowee-tabs`, y "verificar dropdowns por screenshot". |
| `naowee-patterns-ux` | §28-31: demo switcher + footer pill, scroll-hide (no lift), top-switcher neutralizado, sidebar active-bar. Decisiones aprobadas / "dejar como está". Pipeline de deploy. |
| `naowee-sidebar-shell` | Active-bar `absolute`, inset hover (incl. Cerrar sesión), chrome compartido. |
| `naowee-escenarios-deportivos` | SPORTS_DB dedup por label, buscador de deporte, badges unificados, estado del feature Sorteo. |
| `naowee-wizards` | Stepper step 1: tipo `.wz-pill`, deporte `.naowee-dropdown`, botones del wizard, clases reutilizadas. |

## Reglas clave (resumen)

1. **Botón loud — el hover NO oscurece.** El DS por defecto va a orange-800 en hover; Doug quiere
   el naranja idle FIJO + glow. Override central en `naowee-footer.css` con `!important`.
2. **Badges de estado unificados** en todas las páginas: activa=`caution`, finalizada=`positive`,
   asignada=`informative`, pausa/creada/sistema=`neutral` (todos `--quiet --small`).
3. **Dropdowns custom → `.naowee-dropdown`** (toggle `--open` sobre el wrapper). Verificar por
   **screenshot**, nunca por medición `eval` de `max-height` (da falsos).
4. **Buscadores/inputs → `.naowee-textfield`** (ícono inline en el input-wrap; altura override;
   `:not(.naowee-textfield__input)` para no doble-bordear reglas padre).
5. **Tabs → `.naowee-tabs/.naowee-tab`** (`--selected`; `--proportional` para todo el ancho).
6. **SPORTS_DB: dedup por label** (modalidades comparten label → "Cricket" ×6).
7. **Catálogo de deporte = mismo patrón en sorteo y stepper** (naowee-dropdown + buscador
   acento-insensible + cascada).

## Decisiones deliberadas de NO convertir
- **`<select>` nativos** (≈16 en stepper que manejan el motor de sorteo + cascada): se quedan
  nativos — accesibilidad teclado/móvil; convertirlos arriesga la lógica core.
- **Botones-ícono diminutos** (paginación, cerrar-X, editar): se quedan — riesgo de regresión de
  tamaño por beneficio nulo; su hover ya es sutil/correcto.

## Deploy / entorno
- Worktree `/tmp/sorteo-stable` (rama `sorteo-stable-build`) → `git push origin
  sorteo-stable-build:project/refinements-suite-orphan` (fuente de GitHub Pages; sirve bajo
  `https://naowee-tech.github.io/naowee-test-digitacion/digitacion/...`).
- Clean-clone `~/Desktop/naowee-test-digitacion` (rama `feat/shell-parity-ruleta`) = variante embed.
- `/tmp` se borra en reinicios → recrear: `git worktree add /tmp/sorteo-stable sorteo-stable-build`
  (los commits viven en `.git`, no se pierden).
