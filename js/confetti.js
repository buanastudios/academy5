/**
 * BUANA ACADEMY - Lego Confetti & Animated Flying Lego Plane System
 * Features a cute modular Lego Airplane passing by with a trailing ribbon banner,
 * plus 3D Lego brick particle explosions.
 */

class ConfettiEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animating = false;
    this.colors = [
      "#ea1d24", // Lego Red
      "#006cb7", // Lego Blue
      "#ffd500", // Lego Yellow
      "#009639", // Lego Green
      "#fe8a18", // Lego Orange
      "#8b5cf6", // Lego Purple
      "#38bdf8", // Sky Blue
      "#ec4899"  // Bubble Pink
    ];
  }

  init() {
    if (this.canvas) return;
    this.canvas = document.createElement("canvas");
    this.canvas.id = "lego-confetti-canvas";
    this.canvas.style.position = "fixed";
    this.canvas.style.inset = "0";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.zIndex = "9999";
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * Launch a burst of 3D Lego bricks & confetti
   */
  burst(x, y, count = 55) {
    this.init();
    const originX = x !== undefined ? x : window.innerWidth / 2;
    const originY = y !== undefined ? y : window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 11 + 4;
      const type = Math.random() > 0.35 ? "lego-brick" : (Math.random() > 0.5 ? "circle" : "star");
      
      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 4,
        size: Math.random() * 11 + 9,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.35,
        friction: 0.98,
        life: 1.0,
        decay: Math.random() * 0.015 + 0.008,
        type: type
      });
    }

    if (!this.animating) {
      this.animating = true;
      this.loop();
    }
  }

  loop() {
    if (this.particles.length === 0) {
      this.animating = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.friction;
      p.rotation += p.rotSpeed;
      p.life -= p.decay;

      if (p.life <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.life);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.type === "lego-brick") {
        // Draw 2x1 Lego Brick Shape with 2 Studs
        const w = p.size * 1.6;
        const h = p.size * 0.9;
        
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-w / 2, -h / 2, w, h);
        
        this.ctx.fillStyle = "rgba(0,0,0,0.25)";
        this.ctx.fillRect(-w / 2, h / 2 - 3, w, 3);

        this.ctx.fillStyle = "rgba(255,255,255,0.4)";
        this.ctx.fillRect(-w / 2, -h / 2, w, 2);

        const studR = p.size * 0.22;
        this.ctx.fillStyle = p.color;
        
        // Stud 1
        this.ctx.beginPath();
        this.ctx.arc(-w / 4, -h / 2 - 2, studR, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = "rgba(255,255,255,0.5)";
        this.ctx.beginPath();
        this.ctx.arc(-w / 4, -h / 2 - 3, studR * 0.5, 0, Math.PI * 2);
        this.ctx.fill();

        // Stud 2
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(w / 4, -h / 2 - 2, studR, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = "rgba(255,255,255,0.5)";
        this.ctx.beginPath();
        this.ctx.arc(w / 4, -h / 2 - 3, studR * 0.5, 0, Math.PI * 2);
        this.ctx.fill();

      } else if (p.type === "circle") {
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = "rgba(255,255,255,0.5)";
        this.ctx.beginPath();
        this.ctx.arc(-p.size * 0.15, -p.size * 0.15, p.size * 0.18, 0, Math.PI * 2);
        this.ctx.fill();

      } else {
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size * 0.3, -p.size * 0.3, p.size * 0.6, p.size * 0.6);
      }

      this.ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }
}

window.buanaConfetti = new ConfettiEngine();

/**
 * Animated Flying Lego Plane with Trailing Banner
 */
function initFlyingLegoPlane() {
  const container = document.getElementById("flying-plane-container");
  if (!container) return;

  const planeEl = document.createElement("div");
  planeEl.className = "flying-lego-plane";
  planeEl.setAttribute("title", "Klik pesawat Lego untuk meletupkan konfeti & turbo!");

  // Detailed Modular Lego Plane SVG with spinning propeller & studs
  planeEl.innerHTML = `
    <div class="lego-plane-body">
      <svg viewBox="0 0 160 90" width="130" height="75" class="plane-svg">
        <defs>
          <filter id="brick-shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="1" flood-opacity="0.25"/>
          </filter>
        </defs>

        <!-- Propeller Spinner -->
        <g class="propeller-blade">
          <ellipse cx="148" cy="45" rx="3" ry="24" fill="#ffd500" stroke="#c9a300" stroke-width="1.5" />
          <circle cx="148" cy="45" r="5" fill="#ea1d24" />
        </g>

        <!-- Main Fuselage Lego Bricks (Red & White) -->
        <rect x="50" y="32" width="90" height="26" rx="4" fill="#ea1d24" stroke="#a80e14" stroke-width="2" filter="url(#brick-shadow)" />
        <rect x="70" y="44" width="70" height="14" rx="2" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        
        <!-- Lego Studs on Fuselage -->
        <circle cx="65" cy="30" r="4.5" fill="#ea1d24" stroke="#a80e14" stroke-width="1" />
        <circle cx="85" cy="30" r="4.5" fill="#ea1d24" stroke="#a80e14" stroke-width="1" />
        <circle cx="105" cy="30" r="4.5" fill="#ea1d24" stroke="#a80e14" stroke-width="1" />
        <circle cx="125" cy="30" r="4.5" fill="#ea1d24" stroke="#a80e14" stroke-width="1" />

        <!-- Cockpit Canopy (Yellow Translucent Lego Slope) -->
        <path d="M 85,32 L 115,32 L 105,16 L 90,16 Z" fill="#ffd500" stroke="#c9a300" stroke-width="2" opacity="0.9" />
        <circle cx="97" cy="24" r="5" fill="#0f172a" /> <!-- Pilot mini helmet -->

        <!-- Lego Main Wing (Blue 2x6 plate with studs) -->
        <rect x="72" y="48" width="55" height="14" rx="3" fill="#006cb7" stroke="#004677" stroke-width="2" />
        <circle cx="82" cy="48" r="3.5" fill="#006cb7" stroke="#004677" stroke-width="1" />
        <circle cx="98" cy="48" r="3.5" fill="#006cb7" stroke="#004677" stroke-width="1" />
        <circle cx="114" cy="48" r="3.5" fill="#006cb7" stroke="#004677" stroke-width="1" />

        <!-- Tail Fin / Rudder (Green Lego Brick) -->
        <path d="M 52,32 L 35,8 L 48,8 L 62,32 Z" fill="#009639" stroke="#006325" stroke-width="2" />
        <circle cx="42" cy="8" r="3" fill="#009639" stroke="#006325" stroke-width="1" />

        <!-- Rear Tail Wing (Yellow) -->
        <rect x="30" y="38" width="24" height="6" rx="2" fill="#ffd500" stroke="#c9a300" stroke-width="1.5" />
      </svg>

      <!-- Trailing Tow Rope & Lego Ribbon Banner -->
      <div class="trailing-banner">
        <div class="tow-rope"></div>
        <div class="banner-brick">
          <span class="banner-brick-stud"></span>
          <span class="banner-brick-stud"></span>
          <span class="banner-text">🚀 BUANA ACADEMY • KURSUS ROBOTIK RP 150RB/BLN • DAFTAR SEKARANG!</span>
        </div>
      </div>
    </div>
  `;

  // Plane Click Interaction
  planeEl.addEventListener("click", (e) => {
    e.stopPropagation();
    const rect = planeEl.getBoundingClientRect();
    window.buanaSound.playPlaneWhoosh();
    window.buanaConfetti.burst(rect.left + 50, rect.top + 30, 65);

    // Turbo spin boost animation
    planeEl.classList.add("turbo-boost");
    setTimeout(() => planeEl.classList.remove("turbo-boost"), 1500);
  });

  container.appendChild(planeEl);
}

document.addEventListener("DOMContentLoaded", () => {
  initFlyingLegoPlane();

  // Confetti on CTA button clicks
  document.querySelectorAll(".btn-lego-red, .btn-lego-yellow").forEach(btn => {
    btn.addEventListener("click", () => {
      const rect = btn.getBoundingClientRect();
      window.buanaConfetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
    });
  });
});
