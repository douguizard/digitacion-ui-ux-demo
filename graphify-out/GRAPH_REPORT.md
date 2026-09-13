# Graph Report - .  (2026-07-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 403 nodes · 811 edges · 35 communities (26 shown, 9 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.84)
- Token cost: 55,875 input · 327 output

## Graph Freshness
- Built from commit: `4383512b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Digitación Module Pages & Config
- Scoring Modal Core Functions
- Sidebar Navigation & Roles
- Basketball Scoring Engine
- Ronda Competition & Ranking
- Scoring UI Tab Builders
- Score Validation & Athletics
- Ruleta Wheel Component
- Judo Scoring Engine
- Sorteo Tournament Engine
- Competition Bracket Renderer
- Footer & Role Switcher
- Descalificación Marca Management
- Incident Logging System
- Sets Counter & Tarjetas
- Combinado Score Calculation
- Sorteo Persistent Store
- Athletics Event Builders
- Angular Digitación Component
- Judge Scoring Panel
- Dev Server Entry
- Penalty Registration
- Footer Scroll Behavior
- Desempate Dropdown Toggle
- Desempate Winner Selection
- Ministerio Logo Asset
- SUID Logo Asset
- Naowee Logo Asset
- Extra Innings Management
- Counter & Penalty Log
- Sports Database (Original)
- Sports Database (Compact)
- Sports Database (Final)
- Colombia Flag Asset

## God Nodes (most connected - your core abstractions)
1. `openScoringModal()` - 25 edges
2. `checkSaveReady()` - 24 edges
3. `Design System CSS (local)` - 15 edges
4. `Dashboard Page` - 14 edges
5. `_resolveComp()` - 13 edges
6. `Eventos Page` - 13 edges
7. `_judoRefreshUI()` - 12 edges
8. `mountSidebar()` - 12 edges
9. `Lista de Competencias Page` - 12 edges
10. `Digitadores Page` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Auditoría Page` --calls--> `mountSidebar()`  [EXTRACTED]
  auditoria.html → shared/sidebar.js
- `Coordinadores Page` --calls--> `mountSidebar()`  [EXTRACTED]
  coordinadores.html → shared/sidebar.js
- `Dashboard Page` --calls--> `mountSidebar()`  [EXTRACTED]
  dashboard.html → shared/sidebar.js
- `Digitadores Page` --calls--> `mountSidebar()`  [EXTRACTED]
  digitadores.html → shared/sidebar.js
- `Eventos Page` --calls--> `mountSidebar()`  [EXTRACTED]
  eventos.html → shared/sidebar.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Pages Using Canonical Shell (sidebar.js + shell.css + tokens.css)** — dashboard, eventos, coordinadores, digitadores, auditoria [EXTRACTED 1.00]
- **Sorteo Feature Pipeline (planned)** — sorteo_html, sorteo_engine_js, competition_render_js, sorteo_publico_html, detalle_renderers [INFERRED 0.85]
- **Pages Consuming Local Design System CSS** — dashboard, eventos, digitador, detalle, coordinadores, digitadores, auditoria, evento_detalle [EXTRACTED 1.00]
- **Pages Using Naowee Shell Pattern (sidebar + header + page)** — lista, preview, sorteo, stepper, concept_naowee_shell [INFERRED 0.90]
- **All Pages Consuming design-system.css** — lista, playground, preview, sorteo_publico, sorteo, stepper, design_system_css [EXTRACTED 1.00]
- **Sorteo Data Rendering Pipeline (store → render → public view)** — sorteo_store_js, competition_render_js, competition_render_css, sorteo_publico, sorteo [INFERRED 0.85]

## Communities (35 total, 9 thin omitted)

### Community 0 - "Digitación Module Pages & Config"
Cohesion: 0.11
Nodes (49): ACTA-MVP (Scope Document), Coordinador de Eventos Role, Digitador Role, Scoring Type Routing Map, SPORTS_DB Parametrization Schema, Auditoría Page, Canonicalización Digitación Learnings, CHANGELOG (+41 more)

### Community 1 - "Scoring Modal Core Functions"
Cohesion: 0.05
Nodes (18): COMB_POINT_TABLES, _combDeducciones, COMBINADO_EVENTS, _dqLog, _incidentLog, _inlinePenaltyLog, _inningsState, LANE_COLORS (+10 more)

### Community 2 - "Sidebar Navigation & Roles"
Cohesion: 0.11
Nodes (29): findParentOfChild(), getIcon(), getMenuForRole(), ICONS, ITEMS, MENU_BY_ROLE, ROLES, bindDemoRoleSwitcherEvents() (+21 more)

### Community 3 - "Basketball Scoring Engine"
Cohesion: 0.11
Nodes (27): addBballPenales(), addBballProrroga(), applyInlinePenalty(), bballAddPoints(), buildBasketballGrid(), _buildBballPanelContent(), _buildBballSummary(), _buildBballTeamRow() (+19 more)

### Community 4 - "Ronda Competition & Ranking"
Cohesion: 0.13
Nodes (24): _applyDqScore(), buildRondaParticipantsSection(), buildRondaTable(), _checkRondaCompletion(), closeScoringModal(), getTiedParticipants(), ltRecalcRanks(), ltSegInput() (+16 more)

### Community 5 - "Scoring UI Tab Builders"
Cohesion: 0.11
Nodes (23): buildCategorizedPenalizaciones(), buildCombatGrid(), buildDescalificacionesTab(), buildEstadisticasTab(), buildIncidentLogTab(), buildInlinePenaltySection(), buildInningsGrid(), buildJudgesSection() (+15 more)

### Community 6 - "Score Validation & Athletics"
Cohesion: 0.13
Nodes (18): applyVictoriaDirecta(), atlFieldBlur(), atlFieldInput(), atlParseTime(), atlRecalcCarreras(), atlRecalcField(), atlSegInput(), atlTimeBlur() (+10 more)

### Community 7 - "Ruleta Wheel Component"
Cohesion: 0.24
Nodes (14): computeTargetRotation(), el(), lighten(), markUsedAndGlow(), mount(), normalizeHex(), pickRandomUnused(), polar() (+6 more)

### Community 8 - "Judo Scoring Engine"
Cohesion: 0.17
Nodes (16): addJudoGoldenScore(), addJudoShido(), buildJudoGrid(), _buildJudoPanelContent(), _buildJudoSummary(), _buildJudoTeamRow(), _buildShidoDots(), _buildWazaDots() (+8 more)

### Community 9 - "Sorteo Tournament Engine"
Cohesion: 0.26
Nodes (13): advanceWinner(), asignarGrupos(), buildBracketFromSeeds(), faseFinal(), _findMatch(), fixedGroupIndex(), recalcStandings(), _roundNames() (+5 more)

### Community 10 - "Competition Bracket Renderer"
Cohesion: 0.46
Nodes (12): esc(), isPlaceholder(), _matchCard(), renderBracket(), _renderBracketNode(), renderComp(), renderGrupos(), renderMedalleria() (+4 more)

### Community 11 - "Footer & Role Switcher"
Cohesion: 0.35
Nodes (12): bindSwitcher(), currentRoleCode(), getMode(), getScrollY(), mount(), mountFooter(), mountSwitcher(), neutralizeTopSwitchers() (+4 more)

### Community 12 - "Descalificación Marca Management"
Cohesion: 0.17
Nodes (13): addDqMarca(), pickDqTarget(), pickDqType(), registerDqDd(), removeDqDdEntry(), _renderDqDdLog(), selectDqMarcaTarget(), selectDqMarcaType() (+5 more)

### Community 13 - "Incident Logging System"
Cohesion: 0.18
Nodes (13): addIncident(), pickIncidentTarget(), pickIncidentType(), _positionIncidentMenu(), removeIncident(), _renderIncidentLog(), _resetIncidentMenuPos(), selectIncidentPairing() (+5 more)

### Community 14 - "Sets Counter & Tarjetas"
Cohesion: 0.27
Nodes (12): applyTarjetaRoja(), _getSetTarget(), _isSetWon(), onSetScoreInput(), _recalcSetsCounterTotals(), _renderTarjetaLog(), setScoreChange(), _showTarjetaToast() (+4 more)

### Community 15 - "Combinado Score Calculation"
Cohesion: 0.22
Nodes (9): combCalcPoints(), combDeduccion(), combMaskDistance(), combMaskMinSec(), combMaskSeconds(), combParseValue(), combRecalc(), combValueBlur() (+1 more)

### Community 16 - "Sorteo Persistent Store"
Cohesion: 0.42
Nodes (7): anular(), get(), key(), list(), remove(), resetAll(), save()

### Community 17 - "Athletics Event Builders"
Cohesion: 0.29
Nodes (7): buildAtletismoCampo(), buildAtletismoCarreras(), buildAtletismoCombinados(), buildAtletismoMarca(), buildLaneTimingGrid(), buildMarcaSection(), combEvent()

### Community 18 - "Angular Digitación Component"
Cohesion: 0.33
Nodes (4): Component, BracketMatch, DigitacionComponent, Team

### Community 19 - "Judge Scoring Panel"
Cohesion: 0.33
Nodes (6): adjustJudgeDeduction(), adjustJudgeScore(), applyJudgeDeduction(), onJudgeInput(), recalcJudges(), resetJudgeDeductions()

### Community 20 - "Dev Server Entry"
Cohesion: 0.40
Nodes (4): fs, http, path, url

### Community 21 - "Penalty Registration"
Cohesion: 0.50
Nodes (4): addPenalty(), pickPenalTarget(), pickPenalType(), _updatePenalRegisterBtn()

### Community 22 - "Footer Scroll Behavior"
Cohesion: 0.83
Nodes (3): getScrollY(), mount(), setupScrollHide()

### Community 23 - "Desempate Dropdown Toggle"
Cohesion: 0.67
Nodes (3): _closeAllDesempateDd(), toggleDesempateDd(), togglePodiumDesempate()

### Community 24 - "Desempate Winner Selection"
Cohesion: 0.67
Nodes (3): pickDesempateCrit(), pickDesempateWinner(), _syncDesempateNote()

## Knowledge Gaps
- **53 isolated node(s):** `Team`, `BracketMatch`, `http`, `fs`, `path` (+48 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `openScoringModal()` connect `Scoring UI Tab Builders` to `Scoring Modal Core Functions`, `Basketball Scoring Engine`, `Ronda Competition & Ranking`, `Judo Scoring Engine`, `Athletics Event Builders`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `Dashboard Page` connect `Digitación Module Pages & Config` to `Sidebar Navigation & Roles`, `Dev Server Entry`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `Team`, `BracketMatch`, `http` to the rest of the system?**
  _53 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Digitación Module Pages & Config` be split into smaller, more focused modules?**
  _Cohesion score 0.1054421768707483 - nodes in this community are weakly interconnected._
- **Should `Scoring Modal Core Functions` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `Sidebar Navigation & Roles` be split into smaller, more focused modules?**
  _Cohesion score 0.11491935483870967 - nodes in this community are weakly interconnected._
- **Should `Basketball Scoring Engine` be split into smaller, more focused modules?**
  _Cohesion score 0.10826210826210826 - nodes in this community are weakly interconnected._