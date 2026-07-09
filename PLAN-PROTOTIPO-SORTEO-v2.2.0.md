# Plan de construcción — Prototipo Sorteo / Ruleta · v2.2.0

> **Base:** acta de alcance v1.1 (cerrada) · módulo Digitación · rama `feat/shell-parity-ruleta`.
> **Stack:** HTML/CSS/JS vanilla, sin build, shell canónico ya desplegado (`shared/`).
> **Insumo técnico:** mapa de reuso (4 lectores sobre `stepper.html`, `shared.js`/`SPORTS_DB`, `detalle.html`, `evento-detalle.html`).

---

## 0. Idea rectora de la arquitectura

El módulo **ya sabe MOSTRAR** competiciones: `detalle.html` tiene renderers funcionales (`renderGruposView`, `renderRobinView`, `renderBracketView`, `renderMedalleria`, `_drawBracketLines`) que pintan un objeto `comp` con forma conocida. **Lo que NO existe es GENERAR** ese objeto (motor de sorteo) ni la **ruleta**, ni poblar la **vista pública** (la pestaña "Resultados" del evento es un stub).

> **Estrategia:** construir un **motor de sorteo** que produzca exactamente las *data-shapes* que los renderers existentes ya consumen. Así reutilizamos el grueso de la capa visual y concentramos el trabajo nuevo en la **lógica + la ruleta + la publicación**.

---

## 1. Archivos — nuevos y a tocar

| Archivo | Acción | Rol |
|---|---|---|
| `sorteo.html` | **NUEVO** | Workspace del Coordinador: wizard → clasificados → ruleta → resultado → confirmar/publicar + modo transcripción. Shell canónico (sidebar+header+footer). |
| `shared/sorteo-engine.js` | **NUEVO** | Lógica pura: asignar a grupos, round-robin (círculo + BYE), fase final de medallas, recalcular tabla. Produce el objeto `comp`. |
| `shared/competition-render.js` | **NUEVO (extracción)** | Extraer de `detalle.html` los renderers (`renderGruposView`, `renderBracketView`, `renderMedalleria`, `teamColor`, `teamInit`, `_drawBracketLines`) para reusarlos en `sorteo.html` y en la vista pública sin duplicar. |
| `sorteo-publico.html` | **NUEVO** | Vista pública reducida (sin chrome operativo) enlazada desde "Resultados" del evento; consume `competition-render.js`. |
| `evento-detalle.html` | **TOCAR** | Poblar la pestaña **"Resultados"** (hoy stub) con el listado de pruebas sorteadas + link a la vista pública. |
| `detalle.html` | **TOCAR (ligero)** | Extender el schema de `partido` con `{fecha,hora,escenario}` + modal de edición; importar `competition-render.js` (deja de tener los renderers inline). |
| `shared/menu-data.js` | **TOCAR** | Agregar item de nav **"Sorteo"** al menú del Coordinador (EVENT_COORDINATOR) y ROOT, en la sección COMPETENCIAS. |

---

## 2. Mapa de reuso (qué se reaprovecha vs. qué se construye)

| Funcionalidad (acta) | ✅ Reusa | 🔨 Construye nuevo |
|---|---|---|
| **Wizard parametrización (3 pasos)** | Stepper de `stepper.html` (`.step-item/.step-badge/.step-line/.step-panel`, `goStep(n)`); paso 1 cascada deporte→modalidad→prueba→categoría→sexo (`selectModality`, `.custom-select`); `SPORTS_DB.tipo` (conjunto/individual) | Paso 2 (config: n.º grupos/equipos + sistema), paso 3 (confirmar/resumen), objeto de estado único `sorteoWizard` |
| **Carga de clasificados** | `.table-card`, pills, table patterns | Lista **editable** (agregar/quitar/editar) + entrada 100 % manual (no hay datos de clasificados en el repo) |
| **Ejecución ruleta** | — | Componente **ruleta** ágil: animación breve + **modo rápido/saltar** |
| **Generación enfrentamientos** | `renderGruposView`, `renderRobinView` + data-shape `comp.grupos[]`/`jornadas` | Motor **round-robin** (método del círculo, N-1 fechas) + **asignación a grupos** (1-4→A, 5-8→B) |
| **By / Descanso** | — | Detección de impar → equipo fantasma "Descansa" + marcado visual del bye |
| **Fase final (medallas)** | `renderBracketView`, `renderMedalleria`, `.medal-grid/.bracket-node` | Emparejamiento **cross-group** (1ºA-1ºB oro/plata, 2ºA-2ºB bronce/4º) + `recalcStandings` |
| **Publicación inmediata** | Clases bracket/grupos, `.naowee-tabs` | Poblar pestaña "Resultados" (stub) en `evento-detalle.html` + `sorteo-publico.html` + capa de **persistencia** (localStorage por evento+prueba) |
| **Transcripción externa** | Data-model bracket `{round,matches[{t1,t2,...}]}`, `renderBracketView` | Modo de **entrada manual** de grupos o de bracket ronda a ronda |
| **fecha/hora/escenario** | Patrón de modal | Extender schema `partido` + modal de edición ("por definir") |
| **Export PDF** | Print-to-PDF / `@media print` | Botón "Exportar" + vista imprimible del sorteo |
| **Trazabilidad** | — | Historial (ejecutados, re-sorteos, anulaciones) en localStorage |

---

## 3. Modelo de datos del sorteo

```js
sorteo = {
  id, eventoId,
  prueba: { deporteKey, deporteLabel, emoji, tipo:'conjunto'|'individual', categoria, sexo },
  config: { nGrupos, equiposPorGrupo, sistema },        // RN-09
  origen: 'ruleta' | 'transcripcion',                   // metadata, no entidades separadas
  estado: 'BORRADOR'|'PARAMETRIZADO'|'EN_EJECUCION'|'GENERADO'|'PUBLICADO'|'ANULADO',
  participantes: [{ id, nombre, delegacion, regional }], // clasificados + 'Descansa' si impar
  resultado: comp,                                       // ← forma que ya consumen los renderers
  infoAdicional: { /* por partido: fecha,hora,escenario | 'por definir' */ },
  auditoria: [{ usuario, fecha, accion, motivo? }],
}
```
`resultado` (=`comp`) reusa la forma existente: `comp.grupos[{nombre,equipos[],partidos[{id,t1,t2,s1,s2,status,jornada,fecha,hora,escenario}],tabla[]}]` y `comp.bracket[{round,matches[]}]`.

---

## 4. Motor de sorteo (`shared/sorteo-engine.js`) — el núcleo nuevo

| Función | Qué hace |
|---|---|
| `asignarGrupos(participantes, nGrupos)` | Reparte N participantes en M grupos (regla: posiciones de salida 1-4→A, 5-8→B). Inserta "Descansa" si N no llena uniformemente. |
| `roundRobin(equipos)` | Método del círculo → N-1 fechas, cada par una vez; rota el bye si N impar. |
| `faseFinal(grupos)` | Tras standings: 1ºA vs 1ºB (oro/plata) y 2ºA vs 2ºB (bronce/4º) → `comp.bracket`. |
| `recalcStandings(grupo)` | Recalcula pj/pg/pp/pts desde `partidos` (no existe hoy). |
| `toComp(sorteo)` | Ensambla el objeto `comp` final que los renderers pintan. |

Funciones puras y testeables → mismas para ruleta y transcripción (la transcripción salta `asignarGrupos`/`roundRobin` y puebla `comp` a mano).

---

## 5. Flujo por journey

**Journey A — Sorteo interno (conjunto):** `sorteo.html` → wizard 3 pasos → lista de clasificados editable → **ruleta** (anima la asignación; botón saltar) → motor genera `comp` (grupos + fechas + bye + fase final) → preview con renderers reusados → **confirmar** → persistir + publicar en "Resultados" → vista pública.

**Journey B — Transcripción externa (individuales/llaves):** `sorteo.html` modo transcripción → elegir formato (grupos | bracket) → capturar manual (bracket ronda a ronda usando el data-model existente) → publicar. Progresión: el digitador marca ganador → avanza (reusa `renderBracketView`).

**Journey C — Consulta pública:** `sorteo-publico.html` (sin shell operativo) navegable por prueba, enlazado desde la pestaña "Resultados" del evento.

---

## 6. Estados + reglas

`BORRADOR → PARAMETRIZADO → EN_EJECUCION → GENERADO → PUBLICADO` (+ `ANULADO`). Re-sorteo solo en `GENERADO` (antes de publicar): registra motivo+usuario y deja el anterior `ANULADO`. Post-`PUBLICADO`, correcciones con trazabilidad.

---

## 7. Fases de construcción (orden propuesto)

| Fase | Entregable | Prioridad |
|---|---|---|
| **F1 — Cimientos** | Nav "Sorteo" + `sorteo.html` con shell + wizard de parametrización (3 pasos, reuso stepper) + modelo `sorteo` | 🔴 primero |
| **F2 — Motor + Ruleta (conjunto)** | `sorteo-engine.js` (grupos+round-robin+bye+fase final+standings) + ruleta ágil + preview con renderers reusados | 🔴 |
| **F3 — Clasificados + Publicación** | Lista editable de clasificados + confirmar + persistencia + pestaña "Resultados" poblada + `sorteo-publico.html` | 🟠 |
| **F4 — Transcripción externa** | Modo grupos/bracket manual + progresión de bracket | 🟡 |
| **F5 — Pulido** | fecha/hora/escenario editables + export PDF + historial/trazabilidad + re-sorteo/anulación | 🟢 |

> **Para la validación con Danna/Daniel** basta el **Journey A end-to-end (F1→F3)**: parametrizar → ruleta → grupos+enfrentamientos+medallas → publicar. Es la "simulación" acordada. F4–F5 después.

---

## 8. Decisiones / riesgos técnicos

- **Persistencia demo:** localStorage (clave `evento+prueba`) para que el sorteo publicado aparezca en "Resultados" sin backend. (No hay capa compartida hoy entre `detalle.html` y `evento-detalle.html`.)
- **Extracción de renderers:** mover los renderers de `detalle.html` a `shared/competition-render.js` es la mayor refactor; bajo riesgo (mismas funciones, mismo `comp`), alto retorno (3 superficies los reusan). Alternativa rápida si urge: navegar a `detalle.html?comp=X` y dejar la vista pública para después.
- **Conectores SVG del bracket** solo soportan emparejamiento par→uno; para byes en llaves hay que extender `_drawBracketLines`.
- **Ruleta** mobile-first y `prefers-reduced-motion` (anima solo transform/opacity).

---

## 9. Próximo paso

Con tu OK, arranco **F1** (nav "Sorteo" + `sorteo.html` + wizard de parametrización reusando el stepper) y lo verifico en el navegador antes de seguir con el motor (F2).
