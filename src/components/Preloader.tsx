/* ═══════════════════════════════════════════
   PRELOADER — Bulletproof inline-styled, zero CSS dependency
   - Server Component (no "use client")
   - ALL styles are inline — no CSS class dependencies
   - Single clean animation timeline — no conflicting keyframes
   - JS failsafe: force-remove after 3s no matter what
   ═══════════════════════════════════════════ */

export default function Preloader() {
  const LOGO_PATH = "M371.78 10.1247C380.857 9.21221 403.507 9.787 412.781 10.3472C469.399 13.316 524.67 28.6973 574.687 55.4016C666.687 104.465 735.392 188.13 765.628 287.934C795.568 387.315 785.023 494.5 736.296 586.137C687.454 677.292 604.418 745.318 505.445 775.252C405.865 805.161 298.507 794.538 206.718 745.691C115.366 696.711 47.0846 613.579 16.77 514.437C-13.3549 414.796 -2.59914 307.254 46.6623 215.552C95.2568 125.039 177.578 57.3479 275.76 27.1683L276.56 293.401L276.52 364.092C276.502 379.444 275.768 400.606 278.579 415.245C282.745 437.148 293.215 457.357 308.704 473.393C329.838 495.183 358.748 507.697 389.094 508.19C456.237 509.189 505.053 458.021 505.755 391.646C505.47 334.267 458.816 284.244 401.921 279.633C389.018 278.588 379.251 279.409 366.536 281.646C365.61 258.742 366.37 229.341 366.332 206.129C374.613 205.376 382.677 204.678 391.003 204.668C441.393 204.537 489.729 224.644 525.169 260.48C560.906 296.41 580.75 345.168 580.263 395.845C579.763 445.678 559.509 493.273 523.955 528.178C488.041 563.778 439.314 583.405 388.759 582.633C338.588 582.153 290.697 561.602 255.765 525.579C228.175 497.472 210.166 461.36 204.308 422.409C201.725 404.489 201.839 386.752 201.83 368.718L201.823 318.66L202.1 191.322C196.143 196.313 188.605 204.079 183.292 209.834C132.48 265.24 105.82 338.606 109.205 413.714C112.519 488.12 145.165 558.175 199.999 608.559C313.966 713.025 493.807 707.227 598.318 592.422C649.916 536.708 676.846 462.517 673.015 386.67C669.311 312.139 636.223 242.114 581.009 191.931C532.395 147.656 469.816 121.797 404.133 118.837C391.49 118.245 379.131 118.801 366.501 119.45C365.777 96.1581 366.743 71.481 366.363 48.0439C366.276 42.5901 366.001 14.9544 366.772 11.3153C368.101 10.1911 369.936 10.3011 371.78 10.1247Z";
  const DOT_PATH = "M732.149 0.0833511C758.011 -1.44181 780.282 18.1444 782.078 43.9964C783.879 69.8483 764.535 92.3293 738.711 94.4015C721.756 95.7616 705.383 87.9088 695.83 73.8376C686.278 59.7665 685.014 41.646 692.53 26.3874C700.047 11.1288 715.175 1.08369 732.149 0.0833511Z";

  return (
    <>
      {/* Inline keyframes — single clean timeline, no conflicting animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes plEntrance {
          0% { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes plRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes plFillUp {
          0% { clip-path: inset(100% 0 0 0); }
          100% { clip-path: inset(0% 0 0 0); }
        }
        @keyframes plDotFade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes plTextIn {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        /* Single exit animation — no conflict with failsafe */
        @keyframes plExit {
          0% { opacity: 1; visibility: visible; }
          100% { opacity: 0; visibility: hidden; }
        }
      ` }} />

      {/* The overlay — single exit animation at 1.4s, no second animation to conflict */}
      <div
        id="preloader-overlay"
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#101010',
          pointerEvents: 'auto',
          opacity: 1,
          visibility: 'visible',
          /* Single exit animation — clean, no conflicts */
          animation: 'plExit 500ms cubic-bezier(0.4,0,0.2,1) 1.4s forwards',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            willChange: 'transform, opacity',
            animation: 'plEntrance 600ms cubic-bezier(0.16,1,0.3,1) forwards',
          }}
        >
          {/* Rotating logo container */}
          <div style={{
            willChange: 'transform',
            animation: 'plRotate 2.4s linear infinite',
          }}>
            <svg
              viewBox="0 0 783 792"
              style={{ width: 96, height: 96 }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background outline */}
              <path d={LOGO_PATH} fill="rgba(200,255,0,0.08)" />
              {/* Fill-up accent path */}
              <path
                d={LOGO_PATH}
                fill="#C8FF00"
                style={{
                  clipPath: 'inset(100% 0 0 0)',
                  animation: 'plFillUp 1.2s cubic-bezier(0.25,0.46,0.45,0.94) 200ms forwards',
                }}
              />
              {/* Dot background */}
              <path d={DOT_PATH} fill="rgba(200,255,0,0.08)" />
              {/* Dot fill */}
              <path
                d={DOT_PATH}
                fill="#C8FF00"
                style={{
                  opacity: 0,
                  animation: 'plDotFade 300ms ease 1s forwards',
                }}
              />
            </svg>
          </div>

          {/* Brand name */}
          <span style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: '#C8FF00',
            marginTop: 20,
            opacity: 0,
            animation: 'plTextIn 500ms cubic-bezier(0.16,1,0.3,1) 500ms forwards',
          }}>
            bappy360
          </span>
        </div>
      </div>

      {/* JS Failsafe: force-remove preloader after 3s no matter what */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          function killPreloader() {
            var p = document.getElementById('preloader-overlay');
            if (p) {
              p.style.cssText = 'position:fixed;inset:0;z-index:-1;opacity:0;visibility:hidden;pointer-events:none;display:none;';
            }
          }
          setTimeout(killPreloader, 3000);
          /* Also kill on any chunk error — don't reload, just dismiss */
          window.addEventListener('error', function(e) {
            if (e.message && (e.message.indexOf('ChunkLoadError') !== -1 || e.message.indexOf('Loading chunk') !== -1)) {
              killPreloader();
            }
          });
        })();
      ` }} />
    </>
  );
}
