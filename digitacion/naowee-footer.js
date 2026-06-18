/**
 * Naowee footer pill de versionamiento — Digitación.
 *
 * Pill flotante (esquina inferior derecha): © + "Digitación vX.Y.Z" con link
 * al release. Patrón portado de IVC (DESIGN-PATTERNS §3.8).
 *
 * Reglas clave:
 *  - Embed-aware: NO se monta si data-embed="1" (no flotar dentro del iframe del host).
 *  - FOOTER-AWARE: si un footer de flujo (.stage-footer / .wz-nav) está visible
 *    cerca del borde inferior, el pill se ELEVA justo por encima para no tapar
 *    los CTAs ("Conformar grupos", "Confirmar sorteo", "Siguiente"…).
 *  - Scroll-hide cuando no hay footer cerca: baja al hacer scroll hacia abajo.
 *  - Anima solo transform/opacity/bottom; honra prefers-reduced-motion (vía CSS).
 *
 * Versionar: cambia MODULE_VERSION (+ cache busters ?v= en los HTML).
 */
(function mountNaoweeFooter() {
  'use strict';

  var MODULE_NAME = 'Digitación';
  var MODULE_VERSION = 'v2.2.0';
  var REPO = 'naowee-tech/naowee-test-digitacion';
  var RELEASE_URL = 'https://github.com/' + REPO + '/releases/tag/' + MODULE_VERSION;

  if (document.documentElement.dataset.embed === '1') return;

  var pill, lastY = 0;

  function mount() {
    if (document.querySelector('.naowee-floating-footer')) return;
    pill = document.createElement('div');
    pill.className = 'naowee-floating-footer';
    pill.setAttribute('role', 'contentinfo');
    pill.innerHTML =
      '<span class="naowee-floating-footer__dot" aria-hidden="true"></span>' +
      '<span class="naowee-floating-footer__copy">© ' + new Date().getFullYear() +
        ' · Todos los derechos reservados</span>' +
      '<a class="naowee-floating-footer__ver" href="' + RELEASE_URL +
        '" target="_blank" rel="noopener noreferrer">' + MODULE_NAME + ' ' + MODULE_VERSION + '</a>';
    document.body.appendChild(pill);
    lastY = getScrollY();
    document.addEventListener('scroll', update, { passive: true, capture: true });
    window.addEventListener('resize', update, { passive: true });
    /* Las etapas se conmutan sin scroll (showStage) → revisión periódica barata. */
    setInterval(update, 280);
    update();
  }

  /* Top del footer de flujo más alto que esté pegado al borde inferior (o null). */
  function flowFooterTop() {
    var fs = document.querySelectorAll('.stage-footer, .wz-nav');
    var top = null, vh = window.innerHeight;
    for (var i = 0; i < fs.length; i++) {
      var f = fs[i];
      if (f.offsetParent === null) continue;            /* oculto (display:none) */
      var r = f.getBoundingClientRect();
      if (r.height < 10) continue;
      /* visible Y anclado al fondo del viewport */
      if (r.bottom > vh - 140 && r.top < vh) {
        if (top === null || r.top < top) top = r.top;
      }
    }
    return top;
  }

  function update() {
    if (!pill) return;
    var top = flowFooterTop();
    if (top !== null) {
      /* Eleva el pill justo por encima del footer (no lo tapa). */
      pill.style.bottom = Math.round(window.innerHeight - top + 12) + 'px';
      pill.classList.remove('is-hidden');
      lastY = getScrollY();
      return;
    }
    pill.style.bottom = '';
    /* Sin footer cerca → scroll-hide. */
    var y = getScrollY(), dy = y - lastY;
    if (Math.abs(dy) >= 4) {
      pill.classList.toggle('is-hidden', dy > 0 && y > 60);
      lastY = y;
    }
  }

  function getScrollY() {
    var page = document.querySelector('.page');
    if (page && page.scrollTop > 0) return page.scrollTop;
    return window.scrollY || document.documentElement.scrollTop || 0;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
