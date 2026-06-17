/* ═══════════════════════════════════════════════════════════════
   SORTEO ENGINE — lógica pura del sorteo (F2)
   ───────────────────────────────────────────────────────────────
   Produce EXACTAMENTE la data-shape `comp` que ya consumen los
   renderers de detalle.html / competition-render.js:

     comp.grupos = [{ nombre, equipos[], partidos[{id,jornada,t1,t2,
                      s1,s2,status}], tabla[{equipo,pj,pg,pp,pts}] }]
     comp.bracket = [{ round, matches[{id,t1,t2,s1,s2,status,medal}] }]
     comp.sisCls = 'grupos' | 'robin' | 'elim' | 'final'
     comp.medal  = bool

   Funciones puras → mismas para ruleta y transcripción. Sin DOM.
   Expone window.SorteoEngine.
   ═══════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  const BYE = 'Descansa';

  /** Reparte N participantes en M grupos por bloques secuenciales
   *  (posiciones 1-4 → A, 5-8 → B, …). Distribuye el resto de forma
   *  equilibrada. Devuelve [[...gA],[...gB], …] (solo equipos reales). */
  function asignarGrupos(participantes, nGrupos) {
    const list = participantes.map((p) => (typeof p === 'string' ? p : p.nombre));
    const n = list.length;
    const m = Math.max(1, nGrupos | 0);
    const base = Math.floor(n / m);
    const extra = n % m; // primeros `extra` grupos reciben uno más
    const groups = [];
    let idx = 0;
    for (let g = 0; g < m; g++) {
      const size = base + (g < extra ? 1 : 0);
      groups.push(list.slice(idx, idx + size));
      idx += size;
    }
    return groups;
  }

  /** Round-robin método del círculo: N-1 jornadas, cada par una vez.
   *  Si N impar agrega un equipo fantasma `Descansa` y rota el bye.
   *  Devuelve partidos[{jornada,t1,t2,s1,s2,status}] (status 'bye'
   *  cuando el rival es Descansa). */
  function roundRobin(equipos) {
    const teams = equipos.slice();
    if (teams.length % 2 !== 0) teams.push(BYE);
    const n = teams.length;
    const rounds = n - 1;
    const half = n / 2;
    const partidos = [];
    let arr = teams.slice();
    for (let r = 0; r < rounds; r++) {
      for (let i = 0; i < half; i++) {
        const t1 = arr[i];
        const t2 = arr[n - 1 - i];
        const isBye = t1 === BYE || t2 === BYE;
        partidos.push({
          jornada: r + 1,
          t1: isBye && t1 === BYE ? t2 : t1,
          t2: isBye && t1 === BYE ? t1 : t2,
          s1: null,
          s2: null,
          status: isBye ? 'bye' : 'pending',
        });
      }
      // rotación del círculo: fijo arr[0], los demás giran una posición
      arr = [arr[0], arr[n - 1]].concat(arr.slice(1, n - 1));
    }
    return partidos;
  }

  /** Recalcula la tabla desde los partidos jugados (status 'done').
   *  Victoria 3 pts, empate 1, derrota 0. Ordena por pts, luego pg.
   *  En un sorteo recién generado todos los partidos están pending →
   *  tabla en 0 con el orden de siembra del grupo. */
  function recalcStandings(grupo) {
    const stats = {};
    grupo.equipos.forEach((e) => {
      if (e !== BYE) stats[e] = { equipo: e, pj: 0, pg: 0, pp: 0, pts: 0 };
    });
    grupo.partidos.forEach((m) => {
      if (m.status !== 'done' || m.t1 === BYE || m.t2 === BYE) return;
      if (!stats[m.t1] || !stats[m.t2]) return;
      stats[m.t1].pj++;
      stats[m.t2].pj++;
      if (m.s1 > m.s2) {
        stats[m.t1].pg++; stats[m.t1].pts += 3; stats[m.t2].pp++;
      } else if (m.s2 > m.s1) {
        stats[m.t2].pg++; stats[m.t2].pts += 3; stats[m.t1].pp++;
      } else {
        stats[m.t1].pts++; stats[m.t2].pts++;
      }
    });
    return Object.values(stats).sort((a, b) => b.pts - a.pts || b.pg - a.pg);
  }

  /** Fase final cruzada (medallas) para 2 grupos:
   *   Final         → 1ºA vs 1ºB  (oro / plata)
   *   Tercer puesto → 2ºA vs 2ºB  (bronce / 4º)
   *  En el sorteo los clasificados aún no están decididos → usa
   *  semillas placeholder ("1° Grupo A"). Devuelve comp.bracket. */
  function faseFinal(grupos) {
    if (!grupos || grupos.length < 2) return null;
    const A = grupos[0];
    const B = grupos[1];
    const seed = (grupo, pos) => `${pos + 1}° ${grupo.nombre}`;
    return [
      {
        round: 'Final',
        matches: [
          { id: 'FIN', t1: seed(A, 0), t2: seed(B, 0), s1: null, s2: null, status: 'pending', medal: 'oro', seeded: true },
        ],
      },
      {
        round: 'Tercer puesto',
        matches: [
          { id: 'TER', t1: seed(A, 1), t2: seed(B, 1), s1: null, s2: null, status: 'pending', medal: 'bronce', seeded: true },
        ],
      },
    ];
  }

  /** Ensambla el objeto `comp` final a partir del estado del sorteo.
   *  sorteo = { prueba:{deporteLabel,emoji,categoria,sexo,tipo},
   *             config:{nGrupos}, participantes:[{nombre,...}] } */
  function toComp(sorteo) {
    const cfg = sorteo.config || {};
    const nGrupos = Math.max(1, (cfg.nGrupos | 0) || 1);
    const reparto = asignarGrupos(sorteo.participantes || [], nGrupos);

    const grupos = reparto.map((teams, i) => {
      const grupo = {
        nombre: 'Grupo ' + String.fromCharCode(65 + i),
        equipos: teams.slice(),
        partidos: roundRobin(teams).map((p, j) => ({ ...p, id: i * 100 + j })),
      };
      grupo.tabla = recalcStandings(grupo);
      return grupo;
    });

    const bracket = nGrupos >= 2 ? faseFinal(grupos) : null;
    const pr = sorteo.prueba || {};

    return {
      sisCls: 'grupos',
      sistema: nGrupos >= 2 ? 'Fase de Grupos + Final' : 'Round Robin',
      nombre: [pr.deporteLabel, pr.categoria, pr.sexo].filter(Boolean).join(' '),
      deporte: pr.deporteLabel || '',
      emoji: pr.emoji || '🏆',
      categoria: pr.categoria || '',
      genero: pr.sexo || '',
      grupos,
      bracket,
      medal: !!bracket,
      jornadasCount: grupos.length ? Math.max(...grupos.map((g) => g.partidos.reduce((mx, p) => Math.max(mx, p.jornada), 0))) : 0,
    };
  }

  global.SorteoEngine = { BYE, asignarGrupos, roundRobin, recalcStandings, faseFinal, toComp };
})(typeof window !== 'undefined' ? window : globalThis);
