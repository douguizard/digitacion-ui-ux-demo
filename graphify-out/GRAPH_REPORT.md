# Graph Report - .  (2026-07-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 292 nodes · 520 edges · 31 communities (21 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.81)
- Token cost: 55,268 input · 240 output

## Graph Freshness
- Built from commit: `c802856e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Scoring Modal Utilities
- Basketball Scoring UI
- Round Results & Tiebreakers
- Scoring Modal Builders
- Digitacion App Shell
- Athletics Field Input
- Judo Scoring UI
- Sports Digitacion Docs
- Incident Log Management
- Sets & Red Card Logic
- Disqualification Marks
- Combined Event Calculation
- Athletics Grid Builders
- Competition Wizard Flow
- Judge Scoring Panel
- Design System Tokens
- Node HTTP Server
- Penalty Registration
- Tiebreak Dropdown Toggle
- Tiebreak Resolution
- DQ Target Selection
- Sidebar Components
- Multi-Step Stepper UI
- Top Header Components
- Extra Innings Logic
- Counter & Penalty Log
- Sports Database
- Sports Database Compact
- Sports Database Final
- Icon Library
- Modality Pills Selection

## God Nodes (most connected - your core abstractions)
1. `openScoringModal()` - 25 edges
2. `checkSaveReady()` - 24 edges
3. `_resolveComp()` - 13 edges
4. `_judoRefreshUI()` - 12 edges
5. `updateAcumulado()` - 9 edges
6. `_updateTennisUI()` - 9 edges
7. `setScoreChange()` - 9 edges
8. `Design System CSS` - 9 edges
9. `undoInlinePenalty()` - 8 edges
10. `Scoring Type Routing Map` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Preview Sidebar Component` --semantically_similar_to--> `Stepper Sidebar Component`  [INFERRED] [semantically similar]
  preview.html → stepper.html
- `Preview Top Header` --semantically_similar_to--> `Stepper Top Header`  [INFERRED] [semantically similar]
  preview.html → stepper.html
- `Preview Stepper UI` --semantically_similar_to--> `Stepper Multi-Step UI`  [INFERRED] [semantically similar]
  preview.html → stepper.html
- `Handoff Engines Repo` --conceptually_related_to--> `Scoring Type Routing Map`  [INFERRED]
  README.md → ACTA-MVP.md
- `openScoringModal()` --references--> `GameTimer`  [EXTRACTED]
  scoring-modal.js → shared.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Scoring Type Routing System** — acta_mvp_scoring_routing, acta_mvp_basketball_grid, acta_mvp_sets_counter, acta_mvp_marca_scoring, acta_mvp_jueces_scoring, acta_mvp_combate_scoring, acta_mvp_sports_db [EXTRACTED 0.95]
- **Design System CSS Consumers** — dashboard, lista, digitador, detalle, coordinadores, digitadores, eventos, evento_detalle, playground, design_system_css [EXTRACTED 1.00]
- **Coordinador Workflow Pages** — dashboard, lista, detalle, eventos, evento_detalle, coordinadores, acta_mvp_coordinador_role [INFERRED 0.85]
- **Naowee App Shell (Sidebar + Header + Content)** — preview_sidebar, preview_top_header, stepper_sidebar, stepper_top_header [INFERRED 0.90]
- **Nueva Competencia 4-Step Wizard** — stepper_stepper_component, stepper_step2_sistema, stepper_step3_configuracion, stepper_step4_enfrentamiento, stepper_modality_pills [EXTRACTED 0.95]
- **Shared Naowee + Andes Design Tokens** — concept_naowee_design_tokens, concept_inter_font, stepper_design_system_css [INFERRED 0.85]

## Communities (31 total, 10 thin omitted)

### Community 0 - "Scoring Modal Utilities"
Cohesion: 0.05
Nodes (18): COMB_POINT_TABLES, _combDeducciones, COMBINADO_EVENTS, _dqLog, _incidentLog, _inlinePenaltyLog, _inningsState, LANE_COLORS (+10 more)

### Community 1 - "Basketball Scoring UI"
Cohesion: 0.11
Nodes (27): addBballPenales(), addBballProrroga(), applyInlinePenalty(), bballAddPoints(), buildBasketballGrid(), _buildBballPanelContent(), _buildBballSummary(), _buildBballTeamRow() (+19 more)

### Community 2 - "Round Results & Tiebreakers"
Cohesion: 0.13
Nodes (24): _applyDqScore(), buildRondaParticipantsSection(), buildRondaTable(), _checkRondaCompletion(), closeScoringModal(), getTiedParticipants(), ltRecalcRanks(), ltSegInput() (+16 more)

### Community 3 - "Scoring Modal Builders"
Cohesion: 0.11
Nodes (23): buildCategorizedPenalizaciones(), buildCombatGrid(), buildDescalificacionesTab(), buildEstadisticasTab(), buildIncidentLogTab(), buildInlinePenaltySection(), buildInningsGrid(), buildJudgesSection() (+15 more)

### Community 4 - "Digitacion App Shell"
Cohesion: 0.12
Nodes (18): Coordinador de Eventos Role, Digitador Role, Competition Creation Stepper, Component, Coordinadores Page, Dashboard Page (Coordinador), Design System CSS, Detalle Competencia Page (+10 more)

### Community 5 - "Athletics Field Input"
Cohesion: 0.13
Nodes (18): applyVictoriaDirecta(), atlFieldBlur(), atlFieldInput(), atlParseTime(), atlRecalcCarreras(), atlRecalcField(), atlSegInput(), atlTimeBlur() (+10 more)

### Community 6 - "Judo Scoring UI"
Cohesion: 0.17
Nodes (16): addJudoGoldenScore(), addJudoShido(), buildJudoGrid(), _buildJudoPanelContent(), _buildJudoSummary(), _buildJudoTeamRow(), _buildShidoDots(), _buildWazaDots() (+8 more)

### Community 7 - "Sports Digitacion Docs"
Cohesion: 0.14
Nodes (15): Basketball Grid Scoring, Combate Scoring, Competition State Machine, Digitacion Epic MVP Scope, Jueces Scoring, Marca Scoring, Scoring Type Routing Map, Sets Counter Scoring (+7 more)

### Community 8 - "Incident Log Management"
Cohesion: 0.18
Nodes (13): addIncident(), pickIncidentTarget(), pickIncidentType(), _positionIncidentMenu(), removeIncident(), _renderIncidentLog(), _resetIncidentMenuPos(), selectIncidentPairing() (+5 more)

### Community 9 - "Sets & Red Card Logic"
Cohesion: 0.27
Nodes (12): applyTarjetaRoja(), _getSetTarget(), _isSetWon(), onSetScoreInput(), _recalcSetsCounterTotals(), _renderTarjetaLog(), setScoreChange(), _showTarjetaToast() (+4 more)

### Community 10 - "Disqualification Marks"
Cohesion: 0.22
Nodes (10): addDqMarca(), registerDqDd(), removeDqDdEntry(), _renderDqDdLog(), selectDqMarcaTarget(), selectDqMarcaType(), syncDescalCrossItems(), syncDescalToWinner() (+2 more)

### Community 11 - "Combined Event Calculation"
Cohesion: 0.22
Nodes (9): combCalcPoints(), combDeduccion(), combMaskDistance(), combMaskMinSec(), combMaskSeconds(), combParseValue(), combRecalc(), combValueBlur() (+1 more)

### Community 12 - "Athletics Grid Builders"
Cohesion: 0.29
Nodes (7): buildAtletismoCampo(), buildAtletismoCarreras(), buildAtletismoCombinados(), buildAtletismoMarca(), buildLaneTimingGrid(), buildMarcaSection(), combEvent()

### Community 13 - "Competition Wizard Flow"
Cohesion: 0.33
Nodes (6): Nueva Competencia Wizard Flow, Bracket Tournament View, Groups Grid Layout, Step 2 – Sistema de competencia, Step 3 – Configuración, Step 4 – Enfrentamiento

### Community 14 - "Judge Scoring Panel"
Cohesion: 0.33
Nodes (6): adjustJudgeDeduction(), adjustJudgeScore(), applyJudgeDeduction(), onJudgeInput(), recalcJudges(), resetJudgeDeductions()

### Community 15 - "Design System Tokens"
Cohesion: 0.60
Nodes (5): Inter Typeface (Google Fonts), Naowee + Andes DS Design Tokens, Preview – Configuración del enfrentamiento, Stepper – Nueva competencia, design-system.css (external stylesheet)

### Community 16 - "Node HTTP Server"
Cohesion: 0.40
Nodes (4): fs, http, path, url

### Community 17 - "Penalty Registration"
Cohesion: 0.50
Nodes (4): addPenalty(), pickPenalTarget(), pickPenalType(), _updatePenalRegisterBtn()

### Community 18 - "Tiebreak Dropdown Toggle"
Cohesion: 0.67
Nodes (3): _closeAllDesempateDd(), toggleDesempateDd(), togglePodiumDesempate()

### Community 19 - "Tiebreak Resolution"
Cohesion: 0.67
Nodes (3): pickDesempateCrit(), pickDesempateWinner(), _syncDesempateNote()

### Community 20 - "DQ Target Selection"
Cohesion: 0.67
Nodes (3): pickDqTarget(), pickDqType(), _updateDqDdRegisterBtn()

## Knowledge Gaps
- **54 isolated node(s):** `Team`, `BracketMatch`, `http`, `fs`, `path` (+49 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `openScoringModal()` connect `Scoring Modal Builders` to `Scoring Modal Utilities`, `Basketball Scoring UI`, `Round Results & Tiebreakers`, `Judo Scoring UI`, `Athletics Grid Builders`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `Team`, `BracketMatch`, `http` to the rest of the system?**
  _54 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Scoring Modal Utilities` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `Basketball Scoring UI` be split into smaller, more focused modules?**
  _Cohesion score 0.10826210826210826 - nodes in this community are weakly interconnected._
- **Should `Round Results & Tiebreakers` be split into smaller, more focused modules?**
  _Cohesion score 0.13405797101449277 - nodes in this community are weakly interconnected._
- **Should `Scoring Modal Builders` be split into smaller, more focused modules?**
  _Cohesion score 0.10869565217391304 - nodes in this community are weakly interconnected._
- **Should `Digitacion App Shell` be split into smaller, more focused modules?**
  _Cohesion score 0.12105263157894737 - nodes in this community are weakly interconnected._