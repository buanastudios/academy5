/**
 * BUANA ACADEMY - Admin Control Panel, CMS & SEO Manager Engine
 * Provides complete control over landing page content, SEO keywords, cohort capacity, and student CRM.
 */

document.addEventListener("DOMContentLoaded", () => {
  initAdmin();
});

let currentAdminTab = "overview";
let activeFilterStatus = "all";
let activeFilterSession = "all";

function initAdmin() {
  // Tab Navigation
  document.querySelectorAll(".admin-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentAdminTab = btn.getAttribute("data-tab");
      renderAdminCurrentTab();
    });
  });

  // Render initial tab
  renderAdminCurrentTab();
}

/**
 * Render the active admin panel tab
 */
function renderAdminCurrentTab() {
  const container = document.getElementById("admin-tab-content");
  if (!container) return;

  switch (currentAdminTab) {
    case "overview":
      renderAdminDashboard();
      break;
    case "students":
      renderAdminStudentsTab();
      break;
    case "cms":
      renderAdminCmsTab();
      break;
    case "seo":
      renderAdminSeoTab();
      break;
    case "sessions":
      renderAdminSessionsTab();
      break;
    case "faqs":
      renderAdminFaqsTab();
      break;
    default:
      renderAdminDashboard();
  }
}

/**
 * TAB 1: OVERVIEW DASHBOARD
 */
function renderAdminDashboard() {
  const container = document.getElementById("admin-tab-content");
  if (!container) return;

  const regs = window.buanaStore.getRegistrations();
  const sessions = window.buanaStore.getSessions();
  const settings = window.buanaStore.getSettings();

  const totalStudents = regs.length;
  const verifiedCount = regs.filter(r => r.status === "verified").length;
  const pendingCount = regs.filter(r => r.status === "pending").length;
  const totalRevenue = verifiedCount * (settings.monthlyFee || 150000);

  const totalCapacity = sessions.reduce((sum, s) => sum + (s.capacity || 10), 0);
  const totalEnrolled = sessions.reduce((sum, s) => sum + (s.enrolled || 0), 0);
  const totalFillRate = Math.round((totalEnrolled / (totalCapacity || 1)) * 100);

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.75rem; flex-wrap:wrap; gap:1rem;">
      <div>
        <h2 style="color:#fff; font-size:1.6rem;">Dashboard Ringkasan Operasional</h2>
        <p style="color:#94a3b8; font-size:0.92rem;">Kelola calon siswa, verifikasi bukti pembayaran, dan sesuaikan materi kursus.</p>
      </div>
      <div style="display:flex; gap:0.75rem;">
        <button class="btn-lego btn-lego-yellow btn-sm" onclick="switchAdminTab('students')">
          🔍 ${pendingCount} Pendaftaran Menunggu
        </button>
        <button class="btn-lego btn-lego-blue btn-sm" onclick="switchAdminTab('seo')">
          🚀 Pengaturan SEO & Kata Kunci
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="admin-stats-grid">
      <div class="admin-stat-card">
        <div class="admin-stat-label">TOTAL PENDAFTAR</div>
        <div class="admin-stat-val">${totalStudents} Siswa</div>
        <div style="font-size:0.8rem; color:#94a3b8;">${verifiedCount} Terverifikasi • ${pendingCount} Menunggu</div>
      </div>

      <div class="admin-stat-card">
        <div class="admin-stat-label">TOTAL EST. PENDAPATAN BULANAN</div>
        <div class="admin-stat-val" style="color:#4ade80;">Rp ${totalRevenue.toLocaleString('id-ID')}</div>
        <div style="font-size:0.8rem; color:#94a3b8;">Tarif: Rp ${(settings.monthlyFee || 150000).toLocaleString('id-ID')} / anak / bln</div>
      </div>

      <div class="admin-stat-card">
        <div class="admin-stat-label">TINGKAT KETERISIAN KELAS</div>
        <div class="admin-stat-val" style="color:#fde047;">${totalFillRate}%</div>
        <div style="font-size:0.8rem; color:#94a3b8;">${totalEnrolled} dari ${totalCapacity} Kuota Maksimum</div>
      </div>

      <div class="admin-stat-card">
        <div class="admin-stat-label">JUMLAH KELAS COHORT</div>
        <div class="admin-stat-val" style="color:#c084fc;">${sessions.length} Sesi</div>
        <div style="font-size:0.8rem; color:#94a3b8;">Maks. 10 anak / sesi (2 Jam)</div>
      </div>
    </div>

    <!-- Cohort Capacity Visual Table -->
    <div class="admin-table-card">
      <div class="admin-table-header">
        <h3 style="color:#fff; font-size:1.15rem;">📊 Status Keterisian Sesi Belajar (Maks 10 Anak)</h3>
        <button class="btn-lego btn-lego-blue btn-sm" onclick="switchAdminTab('sessions')">
          + Atur Sesi & Jadwal
        </button>
      </div>
      <div style="padding:1.5rem; display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
        ${sessions.map(s => {
          const percent = Math.min(100, Math.round((s.enrolled / s.capacity) * 100));
          return `
            <div style="background:#0f172a; border:1px solid #334155; padding:1rem; border-radius:12px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
                <strong style="color:#fff;">${s.day} (${s.time})</strong>
                <span style="color:${s.enrolled >= s.capacity ? '#f87171' : '#38bdf8'}; font-weight:800;">
                  ${s.enrolled}/${s.capacity} Anak
                </span>
              </div>
              <div style="font-size:0.82rem; color:#94a3b8; margin-bottom:0.6rem;">${s.targetName}</div>
              <div class="capacity-bar-track">
                <div class="capacity-bar-fill ${s.enrolled >= s.capacity ? 'full' : s.enrolled >= s.capacity - 2 ? 'warning' : ''}" style="width:${percent}%;"></div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <!-- Quick Action / Quick Links -->
    <div style="display:flex; gap:1rem; flex-wrap:wrap; margin-top:1rem;">
      <button class="btn-lego btn-lego-red" onclick="switchAdminTab('cms')">
        ✏️ Edit Teks & Gambar Landing Page
      </button>
      <button class="btn-lego btn-lego-white" onclick="exportRegistrationsToCSV()">
        📥 Download Data Pendaftar (CSV)
      </button>
      <button class="btn-lego btn-lego-white" style="color:#f87171;" onclick="handleResetDefaultData()">
        🔄 Reset ke Data Default Demo
      </button>
    </div>
  `;
}

window.switchAdminTab = function(tabName) {
  const btn = document.querySelector(`.admin-tab-btn[data-tab="${tabName}"]`);
  if (btn) btn.click();
};

/**
 * TAB 2: STUDENTS & REGISTRATIONS CRM
 */
function renderAdminStudentsTab() {
  const container = document.getElementById("admin-tab-content");
  if (!container) return;

  const regs = window.buanaStore.getRegistrations();
  const sessions = window.buanaStore.getSessions();

  let filtered = regs.filter(r => {
    if (activeFilterStatus !== "all" && r.status !== activeFilterStatus) return false;
    if (activeFilterSession !== "all" && r.sessionId !== activeFilterSession) return false;
    return true;
  });

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
      <div>
        <h2 style="color:#fff; font-size:1.6rem;">Data Pendaftaran Siswa</h2>
        <p style="color:#94a3b8; font-size:0.9rem;">Verifikasi bukti pembayaran, periksa data orang tua, dan perbarui status.</p>
      </div>
      <div style="display:flex; gap:0.75rem;">
        <button class="btn-lego btn-lego-yellow btn-sm" onclick="showAddManualStudentModal()">
          + Tambah Siswa Manual
        </button>
        <button class="btn-lego btn-lego-white btn-sm" onclick="exportRegistrationsToCSV()">
          📥 Export CSV
        </button>
      </div>
    </div>

    <!-- Filter Bar -->
    <div style="background:#1e293b; border:1px solid #334155; padding:1.15rem 1.25rem; border-radius:14px; margin-bottom:1.5rem; display:flex; gap:1.5rem; flex-wrap:wrap; align-items:center;">
      <div>
        <label style="font-size:0.8rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:0.25rem;">Filter Status:</label>
        <select class="admin-select" style="width:190px;" onchange="handleFilterStatusChange(this.value)">
          <option value="all" ${activeFilterStatus === 'all' ? 'selected' : ''}>Semua Status</option>
          <option value="pending" ${activeFilterStatus === 'pending' ? 'selected' : ''}>⏳ Menunggu Verifikasi</option>
          <option value="verified" ${activeFilterStatus === 'verified' ? 'selected' : ''}>✅ Terverifikasi (Lunas)</option>
          <option value="rejected" ${activeFilterStatus === 'rejected' ? 'selected' : ''}>❌ Ditolak</option>
        </select>
      </div>

      <div>
        <label style="font-size:0.8rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:0.25rem;">Filter Sesi Belajar:</label>
        <select class="admin-select" style="width:250px;" onchange="handleFilterSessionChange(this.value)">
          <option value="all" ${activeFilterSession === 'all' ? 'selected' : ''}>Semua Sesi</option>
          ${sessions.map(s => `<option value="${s.id}" ${activeFilterSession === s.id ? 'selected' : ''}>${s.day} (${s.time}) - ${s.targetName}</option>`).join("")}
        </select>
      </div>

      <div style="margin-left:auto; color:#94a3b8; font-size:0.88rem;">
        Menampilkan <strong>${filtered.length}</strong> dari ${regs.length} siswa
      </div>
    </div>

    <!-- Registrations Table -->
    <div class="admin-table-card">
      <div style="overflow-x:auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>No. Reg & Tanggal</th>
              <th>Nama Siswa (Usia/Jenjang)</th>
              <th>Orang Tua & WhatsApp</th>
              <th>Program & Sesi</th>
              <th>Pembayaran</th>
              <th>Bukti Bayar</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? `
              <tr>
                <td colspan="8" style="text-align:center; padding:3rem; color:#94a3b8;">
                  Tidak ada data pendaftaran yang sesuai filter.
                </td>
              </tr>
            ` : filtered.map(r => `
              <tr>
                <td>
                  <strong>${r.id}</strong><br>
                  <span style="font-size:0.75rem; color:#94a3b8;">${r.registeredAt}</span>
                </td>
                <td>
                  <strong style="color:#38bdf8;">${r.studentName}</strong><br>
                  <span style="font-size:0.78rem; color:#94a3b8;">${r.studentAge} Thn • ${r.studentLevel}</span>
                </td>
                <td>
                  <strong>${r.parentName}</strong><br>
                  <a href="https://wa.me/${r.parentWhatsapp.replace(/[^0-9]/g, '')}" target="_blank" style="color:#4ade80; font-size:0.82rem; font-weight:700;">
                    📱 ${r.parentWhatsapp}
                  </a>
                </td>
                <td>
                  <div style="font-weight:700;">${r.programName}</div>
                  <span style="font-size:0.78rem; color:#cbd5e1;">${r.sessionLabel}</span>
                </td>
                <td>
                  <div style="font-weight:700;">Rp ${(r.amountPaid || 150000).toLocaleString('id-ID')}</div>
                  <span style="font-size:0.78rem; color:#94a3b8;">Via ${r.paymentMethod}</span>
                </td>
                <td>
                  <button class="btn-lego btn-lego-white btn-sm" onclick="previewPaymentProof('${r.id}')" style="padding:0.35rem 0.7rem; font-size:0.78rem;">
                    🖼️ Lihat Bukti
                  </button>
                </td>
                <td>
                  <span class="status-pill ${r.status}">
                    ${r.status === 'verified' ? 'Terverifikasi' : r.status === 'pending' ? 'Menunggu' : 'Ditolak'}
                  </span>
                </td>
                <td>
                  <div style="display:flex; gap:0.35rem;">
                    <button class="btn-lego btn-lego-green btn-sm" title="Verifikasi" onclick="changeRegStatus('${r.id}', 'verified')" style="padding:0.35rem 0.6rem;">
                      ✓
                    </button>
                    <button class="btn-lego btn-lego-red btn-sm" title="Tolak" onclick="changeRegStatus('${r.id}', 'rejected')" style="padding:0.35rem 0.6rem;">
                      ✕
                    </button>
                    <button class="btn-lego btn-lego-white btn-sm" title="Hapus" onclick="deleteReg('${r.id}')" style="padding:0.35rem 0.6rem; color:#f87171;">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

window.handleFilterStatusChange = function(val) {
  activeFilterStatus = val;
  renderAdminStudentsTab();
};

window.handleFilterSessionChange = function(val) {
  activeFilterSession = val;
  renderAdminStudentsTab();
};

window.changeRegStatus = function(regId, newStatus) {
  window.buanaStore.updateRegistrationStatus(regId, newStatus);
  renderAdminStudentsTab();
};

window.deleteReg = function(regId) {
  if (confirm(`Yakin ingin menghapus data registrasi ${regId}? Kuota sesi akan dikembalikan.`)) {
    window.buanaStore.deleteRegistration(regId);
    renderAdminStudentsTab();
  }
};

/**
 * Payment Proof Review Modal
 */
window.previewPaymentProof = function(regId) {
  const reg = window.buanaStore.getRegistrations().find(r => r.id === regId);
  if (!reg) return;

  const modalHtml = `
    <div id="proof-modal-overlay" class="modal-overlay active" style="z-index:3000;" onclick="closeProofModal(event)">
      <div class="modal-card" style="max-width:520px; background:#1e293b; color:#fff;" onclick="event.stopPropagation()">
        <button class="modal-close-btn" onclick="closeProofModal(null)">✕</button>
        <h3 style="color:#fff; margin-bottom:0.5rem;">Bukti Pembayaran: ${reg.id}</h3>
        <p style="color:#94a3b8; font-size:0.85rem; margin-bottom:1rem;">
          Pendaftar: <strong>${reg.parentName}</strong> (${reg.studentName}) • Rp ${(reg.amountPaid || 150000).toLocaleString('id-ID')} via ${reg.paymentMethod}
        </p>

        <div style="background:#0f172a; border:1px solid #334155; border-radius:12px; padding:0.5rem; text-align:center; max-height:380px; overflow:hidden;">
          <img src="${reg.paymentProofUrl}" alt="Bukti Transfer" style="max-height:360px; margin:0 auto; border-radius:8px; object-fit:contain;">
        </div>

        <div style="display:flex; justify-content:space-between; margin-top:1.5rem; gap:1rem;">
          <button class="btn-lego btn-lego-green" style="flex:1;" onclick="changeRegStatus('${reg.id}', 'verified'); closeProofModal(null);">
            ✅ Verifikasi & Terima
          </button>
          <button class="btn-lego btn-lego-red" onclick="changeRegStatus('${reg.id}', 'rejected'); closeProofModal(null);">
            ❌ Tolak
          </button>
        </div>
      </div>
    </div>
  `;

  const existing = document.getElementById("proof-modal-overlay");
  if (existing) existing.remove();

  const div = document.createElement("div");
  div.innerHTML = modalHtml;
  document.body.appendChild(div.firstElementChild);
};

window.closeProofModal = function(e) {
  const modal = document.getElementById("proof-modal-overlay");
  if (modal) modal.remove();
};

/**
 * TAB 3: CONTENT CMS EDITOR
 */
function renderAdminCmsTab() {
  const container = document.getElementById("admin-tab-content");
  if (!container) return;

  const s = window.buanaStore.getSettings();
  const prayer = window.buanaStore.state.prayerTimesPolicy;
  const programs = window.buanaStore.getPrograms();

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
      <div>
        <h2 style="color:#fff; font-size:1.6rem;">Content Management System (CMS)</h2>
        <p style="color:#94a3b8; font-size:0.9rem;">Ubah teks, judul, biaya, kontak, dan kurikulum landing page.</p>
      </div>
      <button class="btn-lego btn-lego-red" onclick="saveAdminCmsChanges()">
        💾 Simpan Perubahan Live
      </button>
    </div>

    <form id="admin-cms-form" onsubmit="event.preventDefault(); saveAdminCmsChanges();">
      <!-- Hero & Brand -->
      <div class="admin-card">
        <h3>🏠 Identitas Sekolah & Hero Banner</h3>
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label" style="color:#cbd5e1;">Nama Sekolah / Brand</label>
            <input type="text" id="cms-school-name" class="admin-input" value="${s.schoolName}">
          </div>
          <div class="form-group">
            <label class="form-label" style="color:#cbd5e1;">Hero Badge Text</label>
            <input type="text" id="cms-hero-badge" class="admin-input" value="${s.heroBadge}">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" style="color:#cbd5e1;">Tagline Utama (Hero Title)</label>
          <input type="text" id="cms-tagline" class="admin-input" value="${s.tagline}">
        </div>

        <div class="form-group">
          <label class="form-label" style="color:#cbd5e1;">Sub-Tagline / Penjelasan Singkat</label>
          <textarea id="cms-subtagline" class="admin-textarea" rows="2">${s.subTagline}</textarea>
        </div>

        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label" style="color:#cbd5e1;">Biaya Bulanan (Rp)</label>
            <input type="number" id="cms-monthly-fee" class="admin-input" value="${s.monthlyFee}">
          </div>
          <div class="form-group">
            <label class="form-label" style="color:#cbd5e1;">Keterangan Biaya</label>
            <input type="text" id="cms-fee-desc" class="admin-input" value="${s.feeDescription}">
          </div>
        </div>
      </div>

      <!-- Contact, Address, & Domain -->
      <div class="admin-card">
        <h3>📍 Alamat, Kontak & Domain Website</h3>
        <div class="form-group">
          <label class="form-label" style="color:#cbd5e1;">Alamat Lengkap</label>
          <textarea id="cms-address" class="admin-textarea" rows="2">${s.address}</textarea>
        </div>

        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label" style="color:#cbd5e1;">Email Sekolah</label>
            <input type="email" id="cms-email" class="admin-input" value="${s.email}">
          </div>
          <div class="form-group">
            <label class="form-label" style="color:#cbd5e1;">Website URL Host</label>
            <input type="text" id="cms-website-url" class="admin-input" value="${s.websiteUrl}">
          </div>
        </div>

        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label" style="color:#cbd5e1;">No. WhatsApp Admin (format: 628xxx)</label>
            <input type="text" id="cms-whatsapp" class="admin-input" value="${s.whatsapp}">
          </div>
          <div class="form-group">
            <label class="form-label" style="color:#cbd5e1;">No. Telepon Tampilan</label>
            <input type="text" id="cms-phone" class="admin-input" value="${s.phone}">
          </div>
        </div>
      </div>

      <!-- Programs & Curricula -->
      <div class="admin-card">
        <h3>📚 Program & Kurikulum Kursus</h3>
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          ${programs.map((p, idx) => `
            <div style="background:#0f172a; border:1px solid #334155; padding:1.25rem; border-radius:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                <strong style="color:#38bdf8; font-size:1.05rem;">Program ${idx+1}: ${p.id.toUpperCase()}</strong>
                <span class="status-pill verified">${p.badge}</span>
              </div>
              <div class="form-row-2">
                <div class="form-group">
                  <label class="form-label" style="color:#94a3b8; font-size:0.8rem;">Nama Program</label>
                  <input type="text" id="cms-prog-title-${p.id}" class="admin-input" value="${p.title}">
                </div>
                <div class="form-group">
                  <label class="form-label" style="color:#94a3b8; font-size:0.8rem;">Rentang Usia / Jenjang</label>
                  <input type="text" id="cms-prog-age-${p.id}" class="admin-input" value="${p.ageRange}">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" style="color:#94a3b8; font-size:0.8rem;">Deskripsi Singkat</label>
                <textarea id="cms-prog-desc-${p.id}" class="admin-textarea" rows="2">${p.description}</textarea>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Prayer Times Policy -->
      <div class="admin-card">
        <h3>🕌 Kebijakan Waktu Sholat (5 Waktu)</h3>
        <div class="form-group">
          <label class="form-label" style="color:#cbd5e1;">Judul Kebijakan Sholat</label>
          <input type="text" id="cms-prayer-title" class="admin-input" value="${prayer.title}">
        </div>
        <div class="form-group">
          <label class="form-label" style="color:#cbd5e1;">Deskripsi Transparansi Sholat</label>
          <textarea id="cms-prayer-desc" class="admin-textarea" rows="2">${prayer.description}</textarea>
        </div>
      </div>

      <div style="text-align:right; margin-top:1.5rem;">
        <button type="button" class="btn-lego btn-lego-red btn-lg" onclick="saveAdminCmsChanges()">
          💾 Simpan Semua Perubahan
        </button>
      </div>
    </form>
  `;
}

window.saveAdminCmsChanges = function() {
  const newSettings = {
    schoolName: document.getElementById("cms-school-name")?.value || "",
    heroBadge: document.getElementById("cms-hero-badge")?.value || "",
    tagline: document.getElementById("cms-tagline")?.value || "",
    subTagline: document.getElementById("cms-subtagline")?.value || "",
    monthlyFee: parseInt(document.getElementById("cms-monthly-fee")?.value, 10) || 150000,
    feeDescription: document.getElementById("cms-fee-desc")?.value || "",
    address: document.getElementById("cms-address")?.value || "",
    email: document.getElementById("cms-email")?.value || "",
    websiteUrl: document.getElementById("cms-website-url")?.value || "",
    whatsapp: document.getElementById("cms-whatsapp")?.value || "",
    phone: document.getElementById("cms-phone")?.value || ""
  };

  window.buanaStore.updateSettings(newSettings);

  const programs = window.buanaStore.getPrograms();
  programs.forEach(p => {
    const title = document.getElementById(`cms-prog-title-${p.id}`)?.value;
    const ageRange = document.getElementById(`cms-prog-age-${p.id}`)?.value;
    const description = document.getElementById(`cms-prog-desc-${p.id}`)?.value;
    if (title || ageRange || description) {
      window.buanaStore.updateProgram(p.id, {
        title: title || p.title,
        ageRange: ageRange || p.ageRange,
        description: description || p.description
      });
    }
  });

  const prayerTitle = document.getElementById("cms-prayer-title")?.value;
  const prayerDesc = document.getElementById("cms-prayer-desc")?.value;
  if (prayerTitle || prayerDesc) {
    window.buanaStore.state.prayerTimesPolicy.title = prayerTitle || window.buanaStore.state.prayerTimesPolicy.title;
    window.buanaStore.state.prayerTimesPolicy.description = prayerDesc || window.buanaStore.state.prayerTimesPolicy.description;
    window.buanaStore.save();
  }

  alert("✅ Perubahan konten berhasil disimpan!");
};

/**
 * TAB 4: COMPLETE SEO & META TAGS MANAGER
 */
function renderAdminSeoTab() {
  const container = document.getElementById("admin-tab-content");
  if (!container) return;

  const seo = window.buanaStore.getSeo();

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
      <div>
        <h2 style="color:#fff; font-size:1.6rem;">🔍 Pengaturan SEO & Kata Kunci Google</h2>
        <p style="color:#94a3b8; font-size:0.9rem;">Optimalkan visibilitas website di Google Search, WhatsApp share card, dan meta tags sosial media.</p>
      </div>
      <button class="btn-lego btn-lego-blue" onclick="saveAdminSeoChanges()">
        💾 Simpan Pengaturan SEO
      </button>
    </div>

    <!-- Live Google Snippet Preview -->
    <div class="admin-card" style="border-color:#0284c7;">
      <h3 style="color:#38bdf8;">🌐 Pratinjau Tampilan Google Search (SERP Preview)</h3>
      <div class="seo-preview-google">
        <div class="seo-preview-url" id="preview-serp-url">${seo.canonicalUrl || 'http://academy.buana.studio/robotic'}</div>
        <div class="seo-preview-title" id="preview-serp-title">${seo.metaTitle}</div>
        <div class="seo-preview-desc" id="preview-serp-desc">${seo.metaDescription}</div>
      </div>
    </div>

    <!-- SEO Form -->
    <form id="admin-seo-form" onsubmit="event.preventDefault(); saveAdminSeoChanges();">
      <div class="admin-card">
        <h3>🏷️ Meta Title & Description (Utama)</h3>
        
        <div class="form-group">
          <label class="form-label" style="color:#cbd5e1;">Meta Title Tag (&lt;title&gt;):</label>
          <input type="text" id="seo-meta-title" class="admin-input" value="${seo.metaTitle}" oninput="updateLiveSeoPreview()">
          <small style="color:#94a3b8; font-size:0.75rem;">Disarankan 50-60 karakter untuk hasil pencarian terbaik.</small>
        </div>

        <div class="form-group">
          <label class="form-label" style="color:#cbd5e1;">Meta Description Tag:</label>
          <textarea id="seo-meta-desc" class="admin-textarea" rows="3" oninput="updateLiveSeoPreview()">${seo.metaDescription}</textarea>
          <small style="color:#94a3b8; font-size:0.75rem;">Disarankan 120-160 karakter yang memikat calon pendaftar di Google.</small>
        </div>

        <div class="form-group">
          <label class="form-label" style="color:#cbd5e1;">Meta Keywords (Kata Kunci Pencarian):</label>
          <textarea id="seo-meta-keywords" class="admin-textarea" rows="2">${seo.metaKeywords}</textarea>
          <small style="color:#94a3b8; font-size:0.75rem;">Pisahkan dengan koma (Contoh: <em>kursus robotik bandung, les robotik anak 5 tahun, steam preschool bandung</em>).</small>
        </div>
      </div>

      <div class="admin-card">
        <h3>📱 OpenGraph & Media Sosial (WhatsApp / Facebook Preview)</h3>
        
        <div class="form-group">
          <label class="form-label" style="color:#cbd5e1;">OG Title (Judul saat dishare ke WA/FB):</label>
          <input type="text" id="seo-og-title" class="admin-input" value="${seo.ogTitle}">
        </div>

        <div class="form-group">
          <label class="form-label" style="color:#cbd5e1;">OG Description:</label>
          <textarea id="seo-og-desc" class="admin-textarea" rows="2">${seo.ogDescription}</textarea>
        </div>

        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label" style="color:#cbd5e1;">OG Image URL / Path:</label>
            <input type="text" id="seo-og-image" class="admin-input" value="${seo.ogImage}">
          </div>
          <div class="form-group">
            <label class="form-label" style="color:#cbd5e1;">Canonical URL:</label>
            <input type="text" id="seo-canonical" class="admin-input" value="${seo.canonicalUrl}">
          </div>
        </div>
      </div>

      <div class="admin-card">
        <h3>📍 Geo SEO & Tracking Analytics</h3>
        
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label" style="color:#cbd5e1;">Robots Directives:</label>
            <select id="seo-robots" class="admin-select">
              <option value="index, follow" ${seo.robots === 'index, follow' ? 'selected' : ''}>index, follow (Direkomendasikan)</option>
              <option value="noindex, nofollow" ${seo.robots === 'noindex, nofollow' ? 'selected' : ''}>noindex, nofollow (Sembunyikan)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" style="color:#cbd5e1;">Google Analytics ID (GA4):</label>
            <input type="text" id="seo-ga-id" class="admin-input" value="${seo.googleAnalyticsId}" placeholder="G-XXXXXXXXXX">
          </div>
        </div>

        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label" style="color:#cbd5e1;">Geo Placename (Kota):</label>
            <input type="text" id="seo-geo-place" class="admin-input" value="${seo.geoPlacename}">
          </div>
          <div class="form-group">
            <label class="form-label" style="color:#cbd5e1;">Geo Region:</label>
            <input type="text" id="seo-geo-region" class="admin-input" value="${seo.geoRegion}">
          </div>
        </div>
      </div>

      <div style="text-align:right; margin-top:1.5rem;">
        <button type="button" class="btn-lego btn-lego-blue btn-lg" onclick="saveAdminSeoChanges()">
          💾 Simpan Semua Pengaturan SEO
        </button>
      </div>
    </form>
  `;
}

window.updateLiveSeoPreview = function() {
  const title = document.getElementById("seo-meta-title")?.value;
  const desc = document.getElementById("seo-meta-desc")?.value;
  const url = document.getElementById("seo-canonical")?.value;

  const prevTitle = document.getElementById("preview-serp-title");
  const prevDesc = document.getElementById("preview-serp-desc");
  const prevUrl = document.getElementById("preview-serp-url");

  if (prevTitle && title) prevTitle.textContent = title;
  if (prevDesc && desc) prevDesc.textContent = desc;
  if (prevUrl && url) prevUrl.textContent = url;
};

window.saveAdminSeoChanges = function() {
  const updatedSeo = {
    metaTitle: document.getElementById("seo-meta-title")?.value || "",
    metaDescription: document.getElementById("seo-meta-desc")?.value || "",
    metaKeywords: document.getElementById("seo-meta-keywords")?.value || "",
    ogTitle: document.getElementById("seo-og-title")?.value || "",
    ogDescription: document.getElementById("seo-og-desc")?.value || "",
    ogImage: document.getElementById("seo-og-image")?.value || "",
    canonicalUrl: document.getElementById("seo-canonical")?.value || "",
    robots: document.getElementById("seo-robots")?.value || "index, follow",
    googleAnalyticsId: document.getElementById("seo-ga-id")?.value || "",
    geoPlacename: document.getElementById("seo-geo-place")?.value || "",
    geoRegion: document.getElementById("seo-geo-region")?.value || ""
  };

  window.buanaStore.updateSeo(updatedSeo);
  alert("✅ Pengaturan SEO dan Meta Tags berhasil disimpan! Siap terindeks optimal di Google.");
};

/**
 * TAB 5: SESSIONS & COHORT CAPACITY SCHEDULER
 */
function renderAdminSessionsTab() {
  const container = document.getElementById("admin-tab-content");
  if (!container) return;

  const sessions = window.buanaStore.getSessions();

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
      <div>
        <h2 style="color:#fff; font-size:1.6rem;">Pengaturan Jadwal Sesi & Kuota Kelas</h2>
        <p style="color:#94a3b8; font-size:0.9rem;">Batas maksimal 10 anak per pertemuan dengan jeda ramah waktu sholat.</p>
      </div>
      <button class="btn-lego btn-lego-yellow btn-sm" onclick="showAddSessionModal()">
        + Tambah Sesi Cohort Baru
      </button>
    </div>

    <div class="admin-table-card">
      <div style="overflow-x:auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Hari</th>
              <th>Waktu Pertemuan</th>
              <th>Tipe Sesi</th>
              <th>Target Usia / Kelompok</th>
              <th>Kapasitas & Keterisian</th>
              <th>Status Slot</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${sessions.map(s => `
              <tr>
                <td><strong>${s.day}</strong></td>
                <td><strong style="color:#38bdf8;">${s.time}</strong></td>
                <td><span class="status-pill verified">${s.type}</span></td>
                <td>${s.targetName}</td>
                <td>
                  <strong>${s.enrolled} / ${s.capacity} Anak</strong>
                  <div class="capacity-bar-track" style="margin-top:0.35rem; width:120px;">
                    <div class="capacity-bar-fill" style="width:${Math.min(100, Math.round((s.enrolled/s.capacity)*100))}%;"></div>
                  </div>
                </td>
                <td><span style="font-size:0.85rem; color:#cbd5e1;">${s.status}</span></td>
                <td>
                  <button class="btn-lego btn-lego-red btn-sm" onclick="deleteSession('${s.id}')" style="padding:0.3rem 0.6rem;">
                    🗑️ Hapus
                  </button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

window.deleteSession = function(sessId) {
  if (confirm("Hapus sesi cohort ini?")) {
    window.buanaStore.deleteSession(sessId);
    renderAdminSessionsTab();
  }
};

window.showAddSessionModal = function() {
  const day = prompt("Masukkan Hari Sesi (Contoh: Sabtu, Minggu, atau Rabu):", "Sabtu");
  if (!day) return;
  const time = prompt("Masukkan Waktu Pertemuan (Contoh: 08.30 - 10.30 WIB):", "08.30 - 10.30 WIB");
  if (!time) return;
  const target = prompt("Target Kelompok (Contoh: Little Sparks (Usia 5-7)):", "Little Sparks (Usia 5-7)");
  if (!target) return;

  window.buanaStore.addSession({
    day,
    time,
    type: "Pagi (Morning)",
    targetCategory: "preschool",
    targetName: target,
    capacity: 10,
    status: "Tersedia (Sisa 10 Kursi)"
  });

  renderAdminSessionsTab();
};

/**
 * TAB 6: FAQS
 */
function renderAdminFaqsTab() {
  const container = document.getElementById("admin-tab-content");
  if (!container) return;

  const faqs = window.buanaStore.getFaqs();

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
      <div>
        <h2 style="color:#fff; font-size:1.6rem;">Pertanyaan Umum (FAQ)</h2>
        <p style="color:#94a3b8; font-size:0.9rem;">Kelola jawaban seputar robot 5 tahun, sistem sewa kit, dan waktu sholat.</p>
      </div>
      <button class="btn-lego btn-lego-yellow btn-sm" onclick="addNewFaqItem()">
        + Tambah FAQ Baru
      </button>
    </div>

    <div style="display:flex; flex-direction:column; gap:1rem;">
      ${faqs.map((f, i) => `
        <div class="admin-card">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
            <strong style="color:#38bdf8;">Pertanyaan #${i+1}</strong>
            <button class="btn-lego btn-lego-red btn-sm" onclick="removeFaqItem(${i})" style="padding:0.2rem 0.5rem;">
              Hapus
            </button>
          </div>
          <div class="form-group">
            <input type="text" id="faq-q-${i}" class="admin-input" value="${f.q}" placeholder="Pertanyaan...">
          </div>
          <div class="form-group">
            <textarea id="faq-a-${i}" class="admin-textarea" rows="2" placeholder="Jawaban...">${f.a}</textarea>
          </div>
        </div>
      `).join("")}
    </div>

    <div style="text-align:right; margin-top:1.5rem;">
      <button class="btn-lego btn-lego-red btn-lg" onclick="saveFaqsFromAdmin()">
        💾 Simpan FAQ Live
      </button>
    </div>
  `;
}

window.addNewFaqItem = function() {
  const faqs = window.buanaStore.getFaqs();
  faqs.push({
    q: "Pertanyaan baru...",
    a: "Jawaban pertanyaan..."
  });
  window.buanaStore.updateFaqs(faqs);
  renderAdminFaqsTab();
};

window.removeFaqItem = function(idx) {
  const faqs = window.buanaStore.getFaqs();
  faqs.splice(idx, 1);
  window.buanaStore.updateFaqs(faqs);
  renderAdminFaqsTab();
};

window.saveFaqsFromAdmin = function() {
  const faqs = window.buanaStore.getFaqs();
  faqs.forEach((f, i) => {
    f.q = document.getElementById(`faq-q-${i}`)?.value || f.q;
    f.a = document.getElementById(`faq-a-${i}`)?.value || f.a;
  });
  window.buanaStore.updateFaqs(faqs);
  alert("✅ FAQ berhasil disimpan!");
};

/**
 * CSV EXPORT UTILITY
 */
window.exportRegistrationsToCSV = function() {
  const regs = window.buanaStore.getRegistrations();
  if (regs.length === 0) {
    alert("Belum ada data pendaftar untuk diexport.");
    return;
  }

  const headers = ["ID Reg", "Waktu Daftar", "Nama Orang Tua", "WhatsApp", "Email", "Nama Anak", "Usia", "Jenjang", "Program", "Sesi", "Metode Bayar", "Jumlah (Rp)", "Status"];
  const rows = regs.map(r => [
    r.id,
    r.registeredAt,
    `"${r.parentName}"`,
    `"${r.parentWhatsapp}"`,
    `"${r.parentEmail || '-'}"`,
    `"${r.studentName}"`,
    r.studentAge,
    `"${r.studentLevel}"`,
    `"${r.programName}"`,
    `"${r.sessionLabel}"`,
    `"${r.paymentMethod}"`,
    r.amountPaid,
    r.status
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Pendaftar_Buana_Academy_${new Date().toISOString().substring(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

/**
 * RESET TO DEFAULT DEMO DATA
 */
window.handleResetDefaultData = function() {
  if (confirm("Reset seluruh data kembali ke pengaturan awal demo?")) {
    window.buanaStore.resetToDefault();
    alert("Data telah di-reset ke default.");
    renderAdminDashboard();
  }
};

/**
 * MANUAL STUDENT REGISTRATION MODAL
 */
window.showAddManualStudentModal = function() {
  const parentName = prompt("Nama Orang Tua:", "Bunda Ratna");
  if (!parentName) return;
  const parentWa = prompt("No WhatsApp Orang Tua:", "081234567890");
  if (!parentWa) return;
  const studentName = prompt("Nama Anak:", "Bima");
  if (!studentName) return;
  const studentAge = parseInt(prompt("Usia Anak:", "6"), 10) || 6;

  const sessions = window.buanaStore.getSessions();
  const selectedSess = sessions[0];

  window.buanaStore.addRegistration({
    parentName,
    parentWhatsapp: parentWa,
    parentEmail: "-",
    studentName,
    studentAge,
    studentLevel: "TK B",
    programId: "preschool",
    programName: "Little Sparks (Usia 5-7 Thn)",
    sessionId: selectedSess.id,
    sessionLabel: `${selectedSess.day} • ${selectedSess.time}`,
    paymentMethod: "Tunai / Lokasi",
    amountPaid: 150000,
    paymentProofUrl: "assets/real-robot-build.jpg",
    status: "verified",
    notes: "Pendaftaran manual oleh admin."
  });

  alert("✅ Siswa berhasil didaftarkan secara manual!");
  renderAdminStudentsTab();
};
