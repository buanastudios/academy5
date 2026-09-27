/**
 * BUANA ACADEMY - Main Client Application Logic & Mobile-First UX Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  applyDynamicSeoTags();
  renderLandingContent();
  renderPrograms();
  renderSessions();
  renderFaqs();
  initRegistrationForm();
  initMobileStickyBar();
}

/**
 * Mobile Navigation Drawer Toggle
 */
window.toggleMobileMenu = function() {
  const drawer = document.getElementById("mobile-nav-drawer");
  const btn = document.getElementById("btn-mobile-menu");
  if (!drawer) return;
  const isOpen = drawer.classList.contains("open");
  if (isOpen) {
    drawer.classList.remove("open");
    if (btn) btn.innerHTML = "☰";
  } else {
    drawer.classList.add("open");
    if (btn) btn.innerHTML = "✕";
  }
};

/**
 * Hide Sticky Mobile Bottom Bar when looking at Registration Form
 */
function initMobileStickyBar() {
  const stickyBar = document.getElementById("mobile-sticky-bar");
  const regSection = document.getElementById("registration-section");
  if (!stickyBar || !regSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stickyBar.style.transform = "translateY(100%)";
        stickyBar.style.transition = "transform 0.25s ease";
      } else {
        stickyBar.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.15 });

  observer.observe(regSection);
}

/**
 * Apply Dynamic SEO & Meta Tags from Store
 */
function applyDynamicSeoTags() {
  const seo = window.buanaStore.getSeo();
  if (!seo) return;

  if (seo.metaTitle) document.title = seo.metaTitle;

  const setMeta = (attr, key, content) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  if (seo.metaDescription) {
    setMeta("name", "description", seo.metaDescription);
    setMeta("property", "og:description", seo.ogDescription || seo.metaDescription);
    setMeta("name", "twitter:description", seo.ogDescription || seo.metaDescription);
  }

  if (seo.metaKeywords) setMeta("name", "keywords", seo.metaKeywords);
  if (seo.ogTitle) {
    setMeta("property", "og:title", seo.ogTitle);
    setMeta("name", "twitter:title", seo.ogTitle);
  }
  if (seo.ogImage) {
    setMeta("property", "og:image", seo.ogImage);
    setMeta("name", "twitter:image", seo.ogImage);
  }
  if (seo.robots) setMeta("name", "robots", seo.robots);

  if (seo.canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", seo.canonicalUrl);
  }
}

/**
 * Render dynamic contents from store to landing page
 */
function renderLandingContent() {
  const settings = window.buanaStore.getSettings();
  const prayer = window.buanaStore.state.prayerTimesPolicy;

  document.querySelectorAll(".dyn-school-name").forEach(el => el.textContent = settings.schoolName);
  document.querySelectorAll(".dyn-tagline").forEach(el => el.textContent = settings.tagline);
  document.querySelectorAll(".dyn-subtagline").forEach(el => el.textContent = settings.subTagline);
  document.querySelectorAll(".dyn-hero-badge").forEach(el => el.textContent = settings.heroBadge);
  document.querySelectorAll(".dyn-fee-desc").forEach(el => el.textContent = settings.feeDescription);
  document.querySelectorAll(".dyn-address").forEach(el => el.textContent = settings.address);
  document.querySelectorAll(".dyn-email").forEach(el => {
    el.textContent = settings.email;
    if (el.tagName === 'A') el.href = `mailto:${settings.email}`;
  });
  document.querySelectorAll(".dyn-website-url").forEach(el => {
    el.textContent = settings.websiteUrl;
    if (el.tagName === 'A') el.href = settings.websiteUrl;
  });
  document.querySelectorAll(".dyn-phone").forEach(el => el.textContent = settings.phone);

  const heroImg = document.getElementById("hero-main-img");
  if (heroImg && settings.heroImage) heroImg.src = settings.heroImage;

  const posterImg = document.getElementById("poster-kit-img");
  if (posterImg && settings.posterImage) posterImg.src = settings.posterImage;

  const realBuildImg = document.getElementById("real-kit-img");
  if (realBuildImg && settings.realKitImage) realBuildImg.src = settings.realKitImage;

  const prayerTitle = document.getElementById("prayer-policy-title");
  if (prayerTitle) prayerTitle.textContent = prayer.title;

  const prayerDesc = document.getElementById("prayer-policy-desc");
  if (prayerDesc) prayerDesc.textContent = prayer.description;

  const prayerPills = document.getElementById("prayer-pills-container");
  if (prayerPills && prayer.slots) {
    prayerPills.innerHTML = prayer.slots.map(slot => `
      <div class="prayer-pill">
        <div class="prayer-pill-title">${slot.name}</div>
        <div class="prayer-pill-time">${slot.time}</div>
      </div>
    `).join("");
  }

  renderPaymentOptions();
}

/**
 * Render Program Cards
 */
function renderPrograms() {
  const container = document.getElementById("programs-list");
  if (!container) return;

  const programs = window.buanaStore.getPrograms();
  container.innerHTML = programs.map((prog) => `
    <div class="program-card ${prog.id === 'preschool' ? 'featured' : ''}" data-prog-id="${prog.id}">
      <div class="program-img-wrapper">
        <img src="${prog.image}" alt="${prog.title}" loading="lazy">
        <span class="program-pill-tag ${prog.id === 'preschool' ? 'popular' : ''}">${prog.badge}</span>
      </div>
      <div class="program-body">
        <div class="program-age">🎯 ${prog.ageRange}</div>
        <h3 class="program-title">${prog.title}</h3>
        <p class="program-desc">${prog.description}</p>
        
        <div style="font-weight:800; font-size:0.88rem; color:#0f172a; margin-top:0.25rem;">
          💡 Materi 4 Pertemuan (Bulan Pertama):
        </div>
        <ul class="program-feature-list">
          ${prog.curriculum ? prog.curriculum.map(c => `<li>${c}</li>`).join("") : ""}
        </ul>

        <div class="program-footer">
          <div>
            <div style="font-size:0.75rem; color:#64748b; font-weight:800;">BIAYA KURSUS</div>
            <div style="font-size:1.25rem; font-weight:800; color:var(--lego-red); font-family:var(--font-lego);">Rp 150.000<span style="font-size:0.75rem; color:#64748b; font-weight:600;">/bln</span></div>
          </div>
          <button class="btn-lego btn-lego-blue btn-sm" onclick="selectProgramForRegister('${prog.id}')">
            Pilih Kelas ➔
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

/**
 * Render Sessions & Real-time Cohort Capacities
 */
function renderSessions() {
  const container = document.getElementById("sessions-grid");
  const selectDropdown = document.getElementById("reg-session-select");
  if (!container) return;

  const sessions = window.buanaStore.getSessions();
  
  container.innerHTML = sessions.map(sess => {
    const fillPercent = Math.min(100, Math.round((sess.enrolled / sess.capacity) * 100));
    const isFull = sess.enrolled >= sess.capacity;
    const isWarning = sess.enrolled >= sess.capacity - 2 && !isFull;
    
    let statusClass = "";
    if (isFull) statusClass = "full";
    else if (isWarning) statusClass = "almost-full";

    return `
      <div class="session-card ${statusClass}">
        <div class="session-header-row">
          <div>
            <div class="session-day-badge">📅 Hari ${sess.day}</div>
            <div class="session-time">⏰ ${sess.time}</div>
          </div>
          <span class="status-pill ${isFull ? 'rejected' : isWarning ? 'pending' : 'verified'}">
            ${sess.type}
          </span>
        </div>

        <div class="session-target">
          🎯 <strong>Target:</strong> ${sess.targetName}
        </div>

        <div class="capacity-tracker">
          <div class="capacity-meta">
            <span>Kapasitas (Maks 10 Anak):</span>
            <span style="color:${isFull ? '#ef4444' : isWarning ? '#d97706' : '#009639'}; font-weight:800;">
              ${sess.enrolled} / ${sess.capacity} Terisi
            </span>
          </div>
          <div class="capacity-bar-track">
            <div class="capacity-bar-fill ${isFull ? 'full' : isWarning ? 'warning' : ''}" style="width: ${fillPercent}%;"></div>
          </div>
          <div style="font-size:0.78rem; font-weight:800; color:${isFull ? '#ef4444' : '#64748b'}; margin-top:0.2rem;">
            ${sess.status}
          </div>
        </div>

        <button class="btn-lego ${isFull ? 'btn-lego-white' : 'btn-lego-blue'} btn-sm" 
          ${isFull ? 'disabled' : ''} 
          onclick="selectSessionForRegister('${sess.id}')"
          style="margin-top:auto; width:100%;">
          ${isFull ? '🔒 Kuota Penuh' : 'Daftar di Sesi Ini'}
        </button>
      </div>
    `;
  }).join("");

  // Populate Dropdown in Registration Form
  if (selectDropdown) {
    selectDropdown.innerHTML = `<option value="">-- Pilih Hari & Sesi Belajar --</option>` + 
      sessions.map(s => {
        const isFull = s.enrolled >= s.capacity;
        return `<option value="${s.id}" ${isFull ? 'disabled' : ''}>
          ${s.day} (${s.time}) - ${s.targetName} [${s.enrolled}/${s.capacity} Anak ${isFull ? '- PENUH' : ''}]
        </option>`;
      }).join("");
  }
}

/**
 * Render Payment Options
 */
function renderPaymentOptions() {
  const container = document.getElementById("bank-accounts-container");
  if (!container) return;

  const accounts = window.buanaStore.getSettings().paymentAccounts || [];
  container.innerHTML = accounts.map((acc, idx) => `
    <div class="bank-card-item ${idx === 0 ? 'selected' : ''}" onclick="selectPaymentMethod('${acc.bank}', this)">
      <div class="bank-card-name">${acc.bank}</div>
      <div class="bank-card-num">${acc.number}</div>
      <div style="font-size:0.75rem; color:#64748b;">a.n ${acc.holder}</div>
    </div>
  `).join("");
}

let selectedPaymentBank = "BCA";
window.selectPaymentMethod = function(bankName, el) {
  selectedPaymentBank = bankName;
  document.querySelectorAll(".bank-card-item").forEach(card => card.classList.remove("selected"));
  if (el) el.classList.add("selected");
};

/**
 * Render FAQs
 */
function renderFaqs() {
  const container = document.getElementById("faq-accordion");
  if (!container) return;

  const faqs = window.buanaStore.getFaqs();
  container.innerHTML = faqs.map((f, i) => `
    <div class="feature-card" style="cursor:pointer; padding:1.25rem 1.5rem;" onclick="toggleFaq(${i})">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h4 style="font-size:1.05rem; color:#0f172a;">❓ ${f.q}</h4>
        <span id="faq-icon-${i}" style="font-size:1.35rem; font-weight:800; color:var(--lego-blue); transition:0.2s;">+</span>
      </div>
      <p id="faq-ans-${i}" style="display:none; margin-top:0.85rem; color:var(--ios-text-secondary); font-size:0.92rem; border-top:2px solid var(--ios-border); padding-top:0.85rem;">
        ${f.a}
      </p>
    </div>
  `).join("");
}

window.toggleFaq = function(idx) {
  const ans = document.getElementById(`faq-ans-${idx}`);
  const icon = document.getElementById(`faq-icon-${idx}`);
  if (!ans) return;
  if (ans.style.display === "none" || ans.style.display === "") {
    ans.style.display = "block";
    if (icon) icon.textContent = "−";
  } else {
    ans.style.display = "none";
    if (icon) icon.textContent = "+";
  }
};

window.selectProgramForRegister = function(progId) {
  const progSelect = document.getElementById("reg-program-select");
  if (progSelect) progSelect.value = progId;
  scrollToRegistration();
};

window.selectSessionForRegister = function(sessionId) {
  const sessSelect = document.getElementById("reg-session-select");
  if (sessSelect) sessSelect.value = sessionId;
  scrollToRegistration();
};

window.scrollToRegistration = function() {
  const section = document.getElementById("registration-section");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

/**
 * Registration Multi-Step Form Logic
 */
let currentStep = 1;
let uploadedProofDataUrl = "";

function initRegistrationForm() {
  const form = document.getElementById("registration-form");
  const dropzone = document.getElementById("proof-dropzone");
  const fileInput = document.getElementById("proof-file-input");
  const previewImg = document.getElementById("proof-preview-img");
  const previewContainer = document.getElementById("proof-preview-container");
  const removeProofBtn = document.getElementById("btn-remove-proof");

  if (dropzone && fileInput) {
    dropzone.addEventListener("click", () => fileInput.click());
    
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });

    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("dragover");
    });

    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageUpload(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        handleImageUpload(e.target.files[0]);
      }
    });
  }

  function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedProofDataUrl = e.target.result;
      if (previewImg) previewImg.src = uploadedProofDataUrl;
      if (previewContainer) previewContainer.style.display = "block";
      if (dropzone) dropzone.style.display = "none";
    };
    reader.readAsDataURL(file);
  }

  if (removeProofBtn) {
    removeProofBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      uploadedProofDataUrl = "";
      if (previewImg) previewImg.src = "";
      if (previewContainer) previewContainer.style.display = "none";
      if (dropzone) dropzone.style.display = "block";
      if (fileInput) fileInput.value = "";
    });
  }

  window.goToStep = function(stepNum) {
    if (stepNum === 2) {
      const parentName = document.getElementById("reg-parent-name")?.value.trim();
      const parentWa = document.getElementById("reg-parent-wa")?.value.trim();
      const studentName = document.getElementById("reg-student-name")?.value.trim();
      const studentAge = document.getElementById("reg-student-age")?.value;

      if (!parentName || !parentWa || !studentName || !studentAge) {
        alert("Mohon lengkapi Nama Orang Tua, No WhatsApp, Nama Anak, dan Usia Anak terlebih dahulu.");
        return;
      }
    } else if (stepNum === 3) {
      const sessionId = document.getElementById("reg-session-select")?.value;
      if (!sessionId) {
        alert("Silakan pilih Hari & Sesi Belajar yang diinginkan.");
        return;
      }
    }

    currentStep = stepNum;
    updateStepUI();
  };

  function updateStepUI() {
    document.querySelectorAll(".form-step-pane").forEach(pane => {
      pane.style.display = "none";
    });
    const targetPane = document.getElementById(`step-pane-${currentStep}`);
    if (targetPane) targetPane.style.display = "block";

    for (let i = 1; i <= 3; i++) {
      const el = document.getElementById(`step-badge-${i}`);
      if (el) {
        el.classList.remove("active", "completed");
        if (i < currentStep) el.classList.add("completed");
        if (i === currentStep) el.classList.add("active");
      }
    }
  }

  // Submit Registration Form
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const parentName = document.getElementById("reg-parent-name").value.trim();
      const parentWa = document.getElementById("reg-parent-wa").value.trim();
      const parentEmail = document.getElementById("reg-parent-email").value.trim() || "-";
      const studentName = document.getElementById("reg-student-name").value.trim();
      const studentAge = parseInt(document.getElementById("reg-student-age").value, 10);
      const studentLevel = document.getElementById("reg-student-level").value;
      const programId = document.getElementById("reg-program-select").value;
      const sessionId = document.getElementById("reg-session-select").value;
      const notes = document.getElementById("reg-notes").value.trim();

      const programs = window.buanaStore.getPrograms();
      const matchedProg = programs.find(p => p.id === programId) || programs[0];
      const sessions = window.buanaStore.getSessions();
      const matchedSess = sessions.find(s => s.id === sessionId);

      if (!uploadedProofDataUrl) {
        const proceedWithout = confirm("Anda belum mengunggah foto bukti pembayaran. Tetap ingin melanjutkan dan mengirim bukti via WhatsApp admin?");
        if (!proceedWithout) return;
      }

      const regRecord = window.buanaStore.addRegistration({
        parentName,
        parentWhatsapp: parentWa,
        parentEmail,
        studentName,
        studentAge,
        studentLevel,
        programId: matchedProg.id,
        programName: matchedProg.title,
        sessionId: matchedSess ? matchedSess.id : sessionId,
        sessionLabel: matchedSess ? `${matchedSess.day} • ${matchedSess.time}` : "-",
        paymentMethod: selectedPaymentBank,
        amountPaid: window.buanaStore.getSettings().monthlyFee || 150000,
        paymentProofUrl: uploadedProofDataUrl || "assets/real-robot-build.jpg",
        notes
      });

      renderSessions();

      window.buanaSound.playSuccessFanfare();
      window.buanaConfetti.burst(window.innerWidth / 2, window.innerHeight / 2, 85);

      showSuccessTicket(regRecord);

      form.reset();
      uploadedProofDataUrl = "";
      if (previewContainer) previewContainer.style.display = "none";
      if (dropzone) dropzone.style.display = "block";
      currentStep = 1;
      updateStepUI();
    });
  }
}

/**
 * Show Success Ticket Modal & Generate WhatsApp URL
 */
function showSuccessTicket(reg) {
  const modal = document.getElementById("ticket-modal");
  if (!modal) return;

  document.getElementById("tkt-reg-id").textContent = reg.id;
  document.getElementById("tkt-parent-name").textContent = reg.parentName;
  document.getElementById("tkt-student-name").textContent = `${reg.studentName} (${reg.studentAge} thn / ${reg.studentLevel})`;
  document.getElementById("tkt-program-name").textContent = reg.programName;
  document.getElementById("tkt-session").textContent = reg.sessionLabel;
  document.getElementById("tkt-amount").textContent = `Rp ${reg.amountPaid.toLocaleString('id-ID')}`;
  document.getElementById("tkt-payment-method").textContent = `${reg.paymentMethod} (Menunggu Verifikasi)`;

  const settings = window.buanaStore.getSettings();
  const waPhone = settings.whatsapp || "6281234567890";
  const messageText = `Halo Admin BUANA ACADEMY,\n\nSaya telah mendaftarkan anak saya untuk Kursus Robotika:\n\n` +
    `📋 *No Registrasi:* ${reg.id}\n` +
    `👤 *Nama Orang Tua:* ${reg.parentName}\n` +
    `🤖 *Nama Anak:* ${reg.studentName} (${reg.studentAge} Tahun - ${reg.studentLevel})\n` +
    `📚 *Program:* ${reg.programName}\n` +
    `📅 *Sesi Pilihan:* ${reg.sessionLabel}\n` +
    `💳 *Metode Bayar:* ${reg.paymentMethod} (Rp ${reg.amountPaid.toLocaleString('id-ID')})\n\n` +
    `Mohon konfirmasi status pendaftaran kami. Terima kasih!`;

  const waBtn = document.getElementById("tkt-btn-wa");
  if (waBtn) {
    waBtn.href = `https://wa.me/${waPhone}?text=${encodeURIComponent(messageText)}`;
  }

  modal.classList.add("active");
}

window.closeTicketModal = function() {
  const modal = document.getElementById("ticket-modal");
  if (modal) modal.classList.remove("active");
};
