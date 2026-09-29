/**
 * BUANA ACADEMY - Central Data Store & Initial State
 * Handles persistence with LocalStorage, defaults, and data migrations.
 */

const DEFAULT_STORE = {
  settings: {
    schoolName: "BUANA ACADEMY",
    tagline: "Kursus Robotika & STEAM Anak di Bandung (Usia 5 - 18 Tahun)",
    subTagline: "Belajar seru merakit robot motor blocks 100 pcs, logika coding, & mekanika gerak untuk usia 5 tahun (TK) hingga SMA. Maksimal 10 anak per kelas dengan jadwal ramah waktu sholat.",
    heroBadge: "🚀 Pendaftaran Gelombang Baru Telah Dibuka!",
    monthlyFee: 150000,
    feeDescription: "Rp 150.000 / Bulan (1x Pertemuan / Pekan • 4x Sebulan • Durasi 2 Jam)",
    maxCapPerSession: 10,
    sessionDurationHours: 2,
    address: "Jl. Bunga Mas No 6, RT 7, RW 1, Kelurahan Mekar Mulya, Kecamatan Panyileukan, Kota Bandung 40614",
    email: "academy@buana.studio",
    websiteUrl: "http://academy.buana.studio/robotic",
    phone: "+6285720502217",
    whatsapp: "+6285117758517",
    paymentAccounts: [
      { bank: "BCA", number: "1234-5678-90", holder: "BUANA ACADEMY INDONESIA" },
      { bank: "Mandiri", number: "1300-0987-6543", holder: "BUANA ACADEMY" },
      { bank: "QRIS", number: "NMID: ID102030405060", holder: "BUANA ACADEMY (Semua E-Wallet/Bank)" }
    ],
    heroImage: "assets/hero-kids.jpg",
    posterImage: "assets/nusa-motorblocks-poster.png",
    realKitImage: "assets/real-robot-build.jpg",

    // Comprehensive SEO & Meta Settings for Google Indexing
    seo: {
      metaTitle: "Kursus Robotik Anak Bandung | Les STEAM & Robotika TK SD SMP SMA - Buana Academy",
      metaDescription: "Kursus Robotika & STEAM terbaik untuk anak usia 5 tahun (TK) hingga SMA di Bandung. Praktik rakit robot motor blocks 100 pcs, coding, logika mekanika. Maks 10 anak per kelas, biaya terjangkau Rp 150.000/bln.",
      metaKeywords: "kursus robotik bandung, les robotika anak bandung, kursus steam anak bandung, sekolah robotika bandung, les coding anak bandung, kursus robotik tk sd panyileukan, les robotik mekar mulya, buana academy, nusa motor blocks 100 pcs",
      ogTitle: "Kursus Robotika & STEAM Anak di Bandung (5 Thn - SMA) | Buana Academy",
      ogDescription: "Ubah waktu luang si kecil jadi karya nyata! Belajar mandiri merakit robot motor blocks 100 pcs, logika coding, dan kreativitas STEAM di Bandung. Eksklusif 10 anak/sesi, Rp 150rb/bulan.",
      ogImage: "assets/hero-kids.jpg",
      canonicalUrl: "http://academy.buana.studio/robotic/",
      robots: "index, follow",
      googleAnalyticsId: "G-XXXXXXXXXX",
      author: "BUANA ACADEMY (buana.studio)",
      geoRegion: "ID-JB",
      geoPlacename: "Bandung, Jawa Barat, Indonesia",
      geoPosition: "-6.9389;107.7122"
    }
  },

  prayerTimesPolicy: {
    title: "Jadwal Ramah Waktu Sholat (5 Waktu)",
    description: "Kegiatan belajar kami rancang secara tertib dan terjeda saat azan berkumandang. Sesi pagi tuntas sebelum Dzuhur, dan sesi siang memiliki jeda nyaman untuk Dzuhur & Ashar.",
    slots: [
      { name: "Dzuhur Buffer", time: "11.30 - 13.00 WIB", note: "Jeda Sholat Dzuhur & Istirahat Makan Siang" },
      { name: "Ashar Buffer", time: "15.00 - 15.30 WIB", note: "Jeda Sholat Ashar & Rehat Ringan" }
    ]
  },

  programs: [
    {
      id: "preschool",
      title: "Little Sparks (Usia 5 - 7 Thn / TK & SD Awal)",
      ageRange: "5 - 7 Tahun (TK A, TK B, SD Kelas 1-2)",
      badge: "Paling Populer untuk Pemula",
      image: "assets/kit-preschool.jpg",
      highlight: "Fokus Motorik, Logika Spasial & STEAM Motor Blocks",
      description: "Dirancang khusus untuk melatih motorik halus, penalaran sebab-akibat, dan kebiasaan eksplorasi aktif. Menggunakan Nusa Motor Blocks 100 pcs bertenaga motor yang aman & interaktif.",
      curriculum: [
        "Pekan 1: Pengenalan Motor Block, Roda Gerigi (Gears) & Merakit Mobil Penjelajah Cilik",
        "Pekan 2: Keseimbangan & Artikulasi — Merakit Hewan Robotik (Kepiting / Kelinci Berjalan)",
        "Pekan 3: Transmisi Roda Gigi Vertikal — Merakit Kincir Angin & Menara Pengintai",
        "Pekan 4: Creative Showcase Mini Challenge — Merakit kreasi mandiri & Presentasi ke Orang Tua"
      ],
      includes: ["Kit Nusa Motor Blocks dipinjamkan", "Buku panduan bergambar", "Sertifikat Level 1", "Rasio 1 Mentor : 5 Anak"]
    },
    {
      id: "primary",
      title: "Junior Builders (Usia 8 - 12 Thn / SD Kelas 3-6)",
      ageRange: "8 - 12 Tahun (SD Kelas 3 - 6)",
      badge: "Sensor & Smart Mechanics",
      image: "assets/kit-junior.jpg",
      highlight: "Otomasi Mekanika, Sensor Jarak & Logika Block Coding",
      description: "Meningkatkan kemampuan problem solving dengan sensor ultrasonik, sensor cahaya, motor servo, dan dasar pemrograman visual drag-and-drop yang ramah anak.",
      curriculum: [
        "Pekan 1: Smart Car Chassis & Prinsip Kerja Sensor Ultrasonik",
        "Pekan 2: Logika Percabangan (If-Else) dengan Block Coding",
        "Pekan 3: Robot Penghindar Rintangan (Obstacle Avoider Bot)",
        "Pekan 4: Mini Arena Challenge: Robot Penelusur Garis & Demo Proyek"
      ],
      includes: ["Smart Microcontroller Kit", "Software Visual Scratch/Blockly", "Sertifikat Junior Level", "Pendampingan Kompetisi"]
    },
    {
      id: "senior",
      title: "Tech Explorers (Usia 13 - 18 Thn / SMP & SMA)",
      ageRange: "13 - 18 Tahun (SMP & SMA)",
      badge: "Advanced IoT & Coding",
      image: "assets/hero-kids.jpg",
      highlight: "Microcontroller C++, Elektronika & Internet of Things (IoT)",
      description: "Untuk siswa remaja yang ingin mendalami robotika aplikatif, mikrokontroler (Arduino/ESP32), skema sirkuit elektronik riil, dan persiapan kompetisi sains nasional.",
      curriculum: [
        "Pekan 1: Sirkuit Elektronika, Komponen Aktif/Pasif & Microcontroller",
        "Pekan 2: Dasar Sintaks C++/Arduino IDE & Interfacing Aktuator",
        "Pekan 3: Proyek Robotik Berbasis IoT (Bluetooth/WiFi Controller)",
        "Pekan 4: Final Capstone Project & Persiapan Portfolio Portabel"
      ],
      includes: ["ESP32/Arduino Breadboard Lab Kit", "Akses Repositori Source Code", "Portofolio Sertifikasi", "Bimbingan Karya Ilmiah"]
    }
  ],

  sessions: [
    {
      id: "sesi-sabtu-pagi-1",
      day: "Sabtu",
      time: "08.30 - 10.30 WIB",
      type: "Pagi (Morning)",
      targetCategory: "preschool",
      targetName: "Little Sparks (Usia 5-7)",
      capacity: 10,
      enrolled: 7,
      status: "Tersedia (Sisa 3 Kursi)"
    },
    {
      id: "sesi-sabtu-pagi-2",
      day: "Sabtu",
      time: "09.30 - 11.30 WIB",
      type: "Pagi (Morning)",
      targetCategory: "primary",
      targetName: "Junior Builders (Usia 8-12)",
      capacity: 10,
      enrolled: 8,
      status: "Hampir Penuh (Sisa 2 Kursi)"
    },
    {
      id: "sesi-sabtu-siang",
      day: "Sabtu",
      time: "13.00 - 15.00 WIB",
      type: "Siang (Afternoon)",
      targetCategory: "preschool",
      targetName: "Little Sparks & Junior",
      capacity: 10,
      enrolled: 5,
      status: "Tersedia (Sisa 5 Kursi)"
    },
    {
      id: "sesi-sabtu-sore",
      day: "Sabtu",
      time: "15.30 - 17.00 WIB",
      type: "Sore (Late Afternoon)",
      targetCategory: "senior",
      targetName: "Tech Explorers (SMP-SMA)",
      capacity: 10,
      enrolled: 6,
      status: "Tersedia (Sisa 4 Kursi)"
    },
    {
      id: "sesi-minggu-pagi-1",
      day: "Minggu",
      time: "08.30 - 10.30 WIB",
      type: "Pagi (Morning)",
      targetCategory: "preschool",
      targetName: "Little Sparks (Usia 5-7)",
      capacity: 10,
      enrolled: 9,
      status: "Sisa 1 Kursi Terakhir!"
    },
    {
      id: "sesi-minggu-siang",
      day: "Minggu",
      time: "13.00 - 15.00 WIB",
      type: "Siang (Afternoon)",
      targetCategory: "primary",
      targetName: "Junior Builders (Usia 8-12)",
      capacity: 10,
      enrolled: 4,
      status: "Tersedia (Sisa 6 Kursi)"
    },
    {
      id: "sesi-minggu-sore",
      day: "Minggu",
      time: "15.30 - 17.00 WIB",
      type: "Sore (Late Afternoon)",
      targetCategory: "senior",
      targetName: "Tech Explorers (SMP-SMA)",
      capacity: 10,
      enrolled: 3,
      status: "Tersedia (Sisa 7 Kursi)"
    }
  ],

  registrations: [
    {
      id: "REG-2026-001",
      registeredAt: "2026-09-24 10:15",
      parentName: "Bunda Ayu Ratnasari",
      parentWhatsapp: "081223344551",
      parentEmail: "ayu.ratna@gmail.com",
      studentName: "Kenzo Aradhana",
      studentAge: 6,
      studentLevel: "TK B",
      programId: "preschool",
      programName: "Little Sparks (Usia 5-7 Thn)",
      sessionId: "sesi-sabtu-pagi-1",
      sessionLabel: "Sabtu • 08.30 - 10.30 WIB",
      paymentMethod: "BCA Transfer",
      amountPaid: 150000,
      paymentProofUrl: "assets/real-robot-build.jpg",
      status: "verified",
      notes: "Suka bongkar pasang mainan, siap mulai pekan pertama."
    },
    {
      id: "REG-2026-002",
      registeredAt: "2026-09-24 14:30",
      parentName: "Ayah Hendra Pratama",
      parentWhatsapp: "081399887766",
      parentEmail: "hendra.pratama@outlook.com",
      studentName: "Nafisha Putri",
      studentAge: 9,
      studentLevel: "SD Kelas 3",
      programId: "primary",
      programName: "Junior Builders (Usia 8-12 Thn)",
      sessionId: "sesi-sabtu-pagi-2",
      sessionLabel: "Sabtu • 09.30 - 11.30 WIB",
      paymentMethod: "QRIS",
      amountPaid: 150000,
      paymentProofUrl: "assets/real-robot-build.jpg",
      status: "verified",
      notes: "Tertarik dengan sensor robot."
    },
    {
      id: "REG-2026-003",
      registeredAt: "2026-09-25 09:20",
      parentName: "Bunda Citra Dewi",
      parentWhatsapp: "085712349876",
      parentEmail: "citra.dewi@yahoo.co.id",
      studentName: "Raffa Alfarizqi",
      studentAge: 5,
      studentLevel: "TK A",
      programId: "preschool",
      programName: "Little Sparks (Usia 5-7 Thn)",
      sessionId: "sesi-minggu-pagi-1",
      sessionLabel: "Minggu • 08.30 - 10.30 WIB",
      paymentMethod: "Mandiri Transfer",
      amountPaid: 150000,
      paymentProofUrl: "assets/real-robot-build.jpg",
      status: "pending",
      notes: "Mohon konfirmasi ketersediaan tempat duduk."
    }
  ],

  faqs: [
    {
      q: "Apakah anak usia 5 tahun (TK) benar-benar bisa mengikuti kursus ini?",
      a: "Sangat bisa! Program Little Sparks kami menggunakan kit modular Nusa Motor Blocks dengan sistem klip warna-warni yang aman tanpa solder atau komponen tajam. Anak diajak belajar motorik halus, bentuk, warna, dan dasar logika gerak dengan pendampingan intensif (1 mentor untuk 5 anak)."
    },
    {
      q: "Apakah kit robotik harus dibeli secara terpisah?",
      a: "Tidak perlu! Semua peralatan, 100 pcs motor blocks, baterai, motor penggerak, dan sensor telah kami sediakan dan dipinjamkan di kelas selama kegiatan belajar berlangsung. Orang tua cukup membayar biaya kursus Rp 150.000/bulan."
    },
    {
      q: "Bagaimana pengaturan waktu sholat saat jadwal kursus?",
      a: "Kami sangat menjunjung tinggi ibadah tepat waktu. Sesi pagi (08.30-10.30 atau 09.30-11.30) selesai sebelum waktu Dzuhur. Sesi siang dimulai pukul 13.00 (setelah Sholat Dzuhur), dan kami menjeda kegiatan saat azan Ashar berkumandang (15.00-15.30)."
    },
    {
      q: "Berapa kapasitas maksimal anak dalam satu kelas?",
      a: "Setiap sesi dibatasi ketat MAKSIMAL 10 ANAK saja. Hal ini kami terapkan agar setiap anak mendapatkan bimbingan personal dan interaksi langsung dengan mentor tanpa berdesakan."
    },
    {
      q: "Apakah ada sertifikat di akhir level kursus?",
      a: "Ya, setiap peserta yang menyelesaikan modul 4 pekan akan mendapatkan e-Sertifikat dan sertifikat fisik resmi kelulusan level dari BUANA ACADEMY saat sesi Final Showcase."
    }
  ]
};

class Store {
  constructor() {
    this.STORAGE_KEY = "BUANA_ACADEMY_STORE_V3";
    this.state = this.load();
  }

  load() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STORE,
          ...parsed,
          settings: {
            ...DEFAULT_STORE.settings,
            ...(parsed.settings || {}),
            seo: {
              ...DEFAULT_STORE.settings.seo,
              ...((parsed.settings && parsed.settings.seo) || {})
            }
          },
          prayerTimesPolicy: { ...DEFAULT_STORE.prayerTimesPolicy, ...(parsed.prayerTimesPolicy || {}) }
        };
      }
    } catch (e) {
      console.warn("Could not load stored data, fallback to defaults", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STORE));
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  }

  resetToDefault() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STORE));
    this.save();
    return this.state;
  }

  getSettings() {
    return this.state.settings;
  }

  getSeo() {
    return this.state.settings.seo || DEFAULT_STORE.settings.seo;
  }

  updateSeo(newSeo) {
    this.state.settings.seo = { ...this.getSeo(), ...newSeo };
    this.save();
    return this.state.settings.seo;
  }

  updateSettings(newSettings) {
    this.state.settings = { ...this.state.settings, ...newSettings };
    this.save();
    return this.state.settings;
  }

  getPrograms() {
    return this.state.programs;
  }

  updateProgram(programId, updatedData) {
    const idx = this.state.programs.findIndex(p => p.id === programId);
    if (idx !== -1) {
      this.state.programs[idx] = { ...this.state.programs[idx], ...updatedData };
      this.save();
    }
  }

  getSessions() {
    return this.state.sessions;
  }

  updateSession(sessionId, updatedData) {
    const idx = this.state.sessions.findIndex(s => s.id === sessionId);
    if (idx !== -1) {
      this.state.sessions[idx] = { ...this.state.sessions[idx], ...updatedData };
      this.save();
    }
  }

  addSession(newSession) {
    this.state.sessions.push({
      ...newSession,
      id: "sesi-" + Date.now(),
      enrolled: 0
    });
    this.save();
  }

  deleteSession(sessionId) {
    this.state.sessions = this.state.sessions.filter(s => s.id !== sessionId);
    this.save();
  }

  getRegistrations() {
    return this.state.registrations;
  }

  addRegistration(regData) {
    const newId = "REG-" + new Date().getFullYear() + "-" + String(this.state.registrations.length + 1).padStart(3, "0");
    const record = {
      id: newId,
      registeredAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "pending",
      ...regData
    };
    this.state.registrations.unshift(record);

    const session = this.state.sessions.find(s => s.id === regData.sessionId);
    if (session) {
      session.enrolled = Math.min((session.enrolled || 0) + 1, session.capacity || 10);
      if (session.enrolled >= session.capacity) {
        session.status = "Penuh (Full)";
      } else if (session.enrolled >= session.capacity - 2) {
        session.status = `Hampir Penuh (Sisa ${session.capacity - session.enrolled} Kursi)`;
      } else {
        session.status = `Tersedia (Sisa ${session.capacity - session.enrolled} Kursi)`;
      }
    }

    this.save();
    return record;
  }

  updateRegistrationStatus(regId, status) {
    const reg = this.state.registrations.find(r => r.id === regId);
    if (reg) {
      reg.status = status;
      this.save();
    }
  }

  deleteRegistration(regId) {
    const reg = this.state.registrations.find(r => r.id === regId);
    if (reg) {
      const session = this.state.sessions.find(s => s.id === reg.sessionId);
      if (session && session.enrolled > 0) {
        session.enrolled -= 1;
        session.status = `Tersedia (Sisa ${session.capacity - session.enrolled} Kursi)`;
      }
      this.state.registrations = this.state.registrations.filter(r => r.id !== regId);
      this.save();
    }
  }

  getFaqs() {
    return this.state.faqs;
  }

  updateFaqs(faqs) {
    this.state.faqs = faqs;
    this.save();
  }
}

window.buanaStore = new Store();
