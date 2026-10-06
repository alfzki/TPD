/**
 * app.js
 * Logika Interaktif Platform Pembelajaran & Simulasi Prediksi UAS TPD 2025/2026
 */

(function () {
  'use strict';

  // --- STATE MANAJEMEN APLIKASI ---
  const state = {
    currentTab: 'blueprint',
    // Quiz State
    currentSetId: 'set-1',
    quizMode: 'study', // 'study' | 'exam'
    currentQuestionIndex: 0,
    selectedTopicFilter: 'all',
    answers: {}, // { [questionId]: optionIndex }
    flaggedQuestions: new Set(),
    examTimerSeconds: 45 * 60, // 45 Menit untuk 30 Soal
    timerInterval: null,
    isExamSubmitted: false,
    // Lab MapReduce State
    activeMrStep: 0,
    activeMrCaseId: 'word-count',
    // SCD Simulator State
    activeScdType: 'type2',
    // Flashcard State
    currentFlashcardIndex: 0,
    isFlashcardFlipped: false,
    // Matrices State
    activeMatrixId: 'oltp-olap',
    // Theme
    isDarkMode: false
  };

  // --- INISIALISASI DOM SAAT READY ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initBlueprintView();
    initQuizEngine();
    initMapReduceLab();
    initPrediksiEsaiView();
    initFlashcardsAndScd();
    initArsipView();
  });

  // --- SISTEM TEMA DARK / LIGHT ---
  function initTheme() {
    const savedTheme = localStorage.getItem('tpd_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    state.isDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark;
    applyTheme();

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        state.isDarkMode = !state.isDarkMode;
        localStorage.setItem('tpd_theme', state.isDarkMode ? 'dark' : 'light');
        applyTheme();
      });
    }
  }

  function applyTheme() {
    const root = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    if (state.isDarkMode) {
      root.classList.add('dark');
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeText) themeText.textContent = 'Light Mode';
    } else {
      root.classList.remove('dark');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeText) themeText.textContent = 'Dark Mode';
    }
  }

  // --- NAVIGASI ANTAR TAB ---
  function initNavigation() {
    const navButtons = document.querySelectorAll('[data-tab-target]');
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTab = btn.getAttribute('data-tab-target');
        switchTab(targetTab);
      });
    });
  }

  function switchTab(tabId) {
    state.currentTab = tabId;

    // Update active nav button
    document.querySelectorAll('[data-tab-target]').forEach(btn => {
      const isCurrent = btn.getAttribute('data-tab-target') === tabId;
      btn.classList.toggle('bg-blue-600', isCurrent);
      btn.classList.toggle('text-white', isCurrent);
      btn.classList.toggle('font-semibold', isCurrent);
      btn.classList.toggle('text-slate-600', !isCurrent);
      btn.classList.toggle('dark:text-slate-300', !isCurrent);
      btn.classList.toggle('hover:bg-slate-100', !isCurrent);
      btn.classList.toggle('dark:hover:bg-slate-800', !isCurrent);
    });

    // Update visible section
    document.querySelectorAll('.tab-content-section').forEach(sec => {
      sec.classList.toggle('hidden', sec.id !== `section-${tabId}`);
    });

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- TAB 1: BLUEPRINT & ANALISIS MENTOR ---
  function initBlueprintView() {
    const container = document.getElementById('blueprint-container');
    if (!container || !window.TPD_CONCEPTS_DATA) return;

    const bp = window.TPD_CONCEPTS_DATA.blueprint;

    let weightsHtml = bp.weightDistribution.map(w => `
      <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-400 transition-all">
        <div class="flex items-center justify-between mb-2">
          <span class="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base">${w.topic}</span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">${w.pgCount} Soal (~${w.percentage}%)</span>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${w.keyFocus}</p>
      </div>
    `).join('');

    let shiftsHtml = bp.shiftAnalysis.map(s => `
      <tr class="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
        <td class="p-3 text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200">${s.aspect}</td>
        <td class="p-3 text-xs md:text-sm text-slate-600 dark:text-slate-400">${s.year2023}</td>
        <td class="p-3 text-xs md:text-sm font-medium text-emerald-600 dark:text-emerald-400">${s.year2026}</td>
        <td class="p-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">${s.mentorInsight}</td>
      </tr>
    `).join('');

    let trapsHtml = bp.trapAlerts.map(t => {
      const color = t.severity === 'CRITICAL' ? 'red' : (t.severity === 'HIGH' ? 'amber' : 'blue');
      return `
        <div class="p-4 rounded-xl border-l-4 border-${color}-500 bg-${color}-50/60 dark:bg-${color}-950/30 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div class="flex items-center justify-between mb-1.5">
            <h4 class="font-bold text-slate-900 dark:text-slate-100 text-sm md:text-base">${t.title}</h4>
            <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-${color}-200 text-${color}-900 dark:bg-${color}-900 dark:text-${color}-200">${t.severity}</span>
          </div>
          <p class="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-2">${t.description}</p>
          <div class="text-xs md:text-sm font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <strong>💡 Solusi Mentor:</strong> ${t.solution}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <!-- Welcome Hero Banner -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 p-6 md:p-8 text-white shadow-xl mb-8">
        <div class="relative z-10 max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
            <span>🎓 Bimbingan Tambahan Kursus Intensif</span>
            <span>•</span>
            <span>Dosen: Siti Mariyah, Ph.D</span>
          </div>
          <h2 class="text-2xl md:text-4xl font-extrabold tracking-tight mb-3">
            Blueprint & Prediksi UAS TPD 2025/2026
          </h2>
          <p class="text-sm md:text-base text-blue-100 leading-relaxed mb-6">
            Selamat datang di portal persiapan UAS Teknologi Pengolahan Data! Halaman ini membedah tren kisi-kisi terbaru, perbandingan komparatif naskah asli 2022/2023, serta educated guess mengenai pola soal dan jebakan ujian yang wajib Anda waspadai.
          </p>
          <div class="flex flex-wrap gap-3">
            <button onclick="window.tpdApp.startQuizDirectly('set-1')" class="px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-md hover:bg-blue-50 transition-transform active:scale-95 flex items-center gap-2">
              <span>🚀 Mulai Simulasi Prediksi Utama (Set 1)</span>
            </button>
            <button onclick="window.tpdApp.goToTab('lab-mr')" class="px-5 py-2.5 rounded-xl bg-blue-800/80 hover:bg-blue-800 text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2">
              <span>✍️ Buka Lab Esai MapReduce (Wajib)</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-center">
          <div class="text-3xl font-black text-blue-600 dark:text-blue-400">30</div>
          <div class="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Soal Pilihan Ganda</div>
        </div>
        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-center">
          <div class="text-3xl font-black text-indigo-600 dark:text-indigo-400">2 - 3</div>
          <div class="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Soal Esai Komprehensif</div>
        </div>
        <div class="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 shadow-sm text-center">
          <div class="text-lg md:text-xl font-black text-emerald-700 dark:text-emerald-300">100% PASTI</div>
          <div class="text-xs font-medium text-emerald-800 dark:text-emerald-400 mt-1">Esai Perancangan MapReduce</div>
        </div>
        <div class="p-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 shadow-sm text-center">
          <div class="text-lg md:text-xl font-black text-amber-700 dark:text-amber-400">TIDAK DIUJI</div>
          <div class="text-xs font-medium text-amber-800 dark:text-amber-400 mt-1">YARN Resource Manager</div>
        </div>
      </div>

      <!-- Distribusi Bobot Materi UAS 2026 -->
      <div class="mb-10">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
              📊 Estimasi Distribusi Bobot Soal (30 PG)
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Berdasarkan silabus dan kisi-kisi resmi Politeknik Statistika STIS</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${weightsHtml}
        </div>
      </div>

      <!-- Komparasi Pergeseran Tren: 2023 vs 2026 -->
      <div class="mb-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div class="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <h3 class="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">
            ⚖️ Analisis Pergeseran Tren Ujian: Naskah 2022/2023 vs Kisi-Kisi 2025/2026
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">Mengapa persiapan Anda tahun ini harus berbeda dari angkatan sebelumnya</p>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-100/70 dark:bg-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                <th class="p-3">Aspek Evaluasi</th>
                <th class="p-3">Karakteristik UAS 2022/2023</th>
                <th class="p-3">Prediksi Kisi-Kisi UAS 2025/2026</th>
                <th class="p-3">Catatan Mentor & Strategi</th>
              </tr>
            </thead>
            <tbody>
              ${shiftsHtml}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Trap Alerts: Waspada Jebakan Dosen -->
      <div class="mb-10">
        <div class="mb-4">
          <h3 class="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
            ⚠️ Trap Alert: 4 Jebakan Dosen Paling Sering Memakan Korban
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">Jangan sampai kehilangan poin berharga karena miskonsepsi fundamental berikut</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${trapsHtml}
        </div>
      </div>
    `;
  }

  // --- TAB 2: SIMULASI UJIAN INTERAKTIF (30 PG ENGINE) ---
  function initQuizEngine() {
    renderQuizControls();
    loadQuestion(state.currentQuestionIndex);
  }

  function getActiveSet() {
    return window.TPD_EXAM_DATA.sets.find(s => s.id === state.currentSetId) || window.TPD_EXAM_DATA.sets[0];
  }

  function getFilteredQuestions() {
    const currentSet = getActiveSet();
    if (state.selectedTopicFilter === 'all') {
      return currentSet.questions;
    }
    return currentSet.questions.filter(q => q.topic === state.selectedTopicFilter);
  }

  function renderQuizControls() {
    const container = document.getElementById('quiz-header-container');
    if (!container) return;

    const currentSet = getActiveSet();

    const setOptionsHtml = window.TPD_EXAM_DATA.sets.map(s => `
      <option value="${s.id}" ${s.id === state.currentSetId ? 'selected' : ''}>
        ${s.title} (${s.questionsCount} Soal PG)
      </option>
    `).join('');

    const topicOptionsHtml = `
      <option value="all">Semua Topik (${currentSet.questions.length})</option>
      ${(currentSet.topics || []).map(t => `<option value="${t.id}" ${state.selectedTopicFilter === t.id ? 'selected' : ''}>${t.name} (${t.count})</option>`).join('')}
    `;

    container.innerHTML = `
      <div class="p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm mb-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-bold uppercase tracking-wider text-white px-2.5 py-0.5 rounded-full ${currentSet.badgeColor || 'bg-blue-600'}">
                ${currentSet.badge}
              </span>
              <span class="text-xs text-slate-500 dark:text-slate-400">Total ${currentSet.questionsCount} Soal Pilihan Ganda</span>
            </div>
            <h2 class="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100">${currentSet.title}</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${currentSet.subtitle}</p>
          </div>

          <!-- Mode Selector & Timer -->
          <div class="flex items-center gap-3 self-start md:self-auto">
            <div class="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium">
              <button id="mode-study-btn" class="px-3 py-1.5 rounded-lg transition-all ${state.quizMode === 'study' ? 'bg-white dark:bg-slate-700 shadow font-bold text-blue-600 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400'}">
                💡 Mode Belajar
              </button>
              <button id="mode-exam-btn" class="px-3 py-1.5 rounded-lg transition-all ${state.quizMode === 'exam' ? 'bg-white dark:bg-slate-700 shadow font-bold text-red-600 dark:text-red-300' : 'text-slate-600 dark:text-slate-400'}">
                ⏱️ Mode Ujian
              </button>
            </div>

            <div id="quiz-timer-display" class="${state.quizMode === 'exam' ? 'flex' : 'hidden'} items-center gap-2 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 font-mono font-bold text-sm">
              <span class="animate-pulse">⏳</span>
              <span id="timer-countdown">45:00</span>
            </div>
          </div>
        </div>

        <!-- Filter Row -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-4 text-xs md:text-sm">
          <div class="flex flex-wrap items-center gap-2">
            <label class="font-semibold text-slate-600 dark:text-slate-400">Pilih Set:</label>
            <select id="select-exam-set" class="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-800 dark:text-slate-200">
              ${setOptionsHtml}
            </select>

            <label class="ml-2 font-semibold text-slate-600 dark:text-slate-400">Filter Topik:</label>
            <select id="select-exam-topic" class="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-800 dark:text-slate-200">
              ${topicOptionsHtml}
            </select>
          </div>

          <div class="flex items-center gap-2">
            <button id="reset-answers-btn" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-all">
              🔄 Reset Jawaban
            </button>
            ${state.quizMode === 'exam' ? `
              <button id="finish-exam-btn" class="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-sm">
                ✅ Selesaikan Ujian
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    // Event listeners
    document.getElementById('select-exam-set')?.addEventListener('change', (e) => {
      state.currentSetId = e.target.value;
      state.currentQuestionIndex = 0;
      state.selectedTopicFilter = 'all';
      state.answers = {};
      state.flaggedQuestions.clear();
      state.isExamSubmitted = false;
      renderQuizControls();
      loadQuestion(0);
    });

    document.getElementById('select-exam-topic')?.addEventListener('change', (e) => {
      state.selectedTopicFilter = e.target.value;
      state.currentQuestionIndex = 0;
      loadQuestion(0);
    });

    document.getElementById('mode-study-btn')?.addEventListener('click', () => {
      setQuizMode('study');
    });

    document.getElementById('mode-exam-btn')?.addEventListener('click', () => {
      setQuizMode('exam');
    });

    document.getElementById('reset-answers-btn')?.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin mereset seluruh jawaban pada set ini?')) {
        state.answers = {};
        state.flaggedQuestions.clear();
        state.isExamSubmitted = false;
        loadQuestion(state.currentQuestionIndex);
      }
    });

    document.getElementById('finish-exam-btn')?.addEventListener('click', () => {
      confirmSubmitExam();
    });
  }

  function setQuizMode(mode) {
    state.quizMode = mode;
    state.isExamSubmitted = false;
    clearInterval(state.timerInterval);

    if (mode === 'exam') {
      state.examTimerSeconds = 45 * 60;
      startTimer();
    }

    renderQuizControls();
    loadQuestion(state.currentQuestionIndex);
  }

  function startTimer() {
    clearInterval(state.timerInterval);
    updateTimerDisplay();

    state.timerInterval = setInterval(() => {
      state.examTimerSeconds--;
      updateTimerDisplay();

      if (state.examTimerSeconds <= 0) {
        clearInterval(state.timerInterval);
        alert('Waktu ujian telah habis! Jawaban Anda akan otomatis dikumpulkan.');
        submitExam();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const el = document.getElementById('timer-countdown');
    if (!el) return;
    const minutes = Math.floor(state.examTimerSeconds / 60);
    const seconds = state.examTimerSeconds % 60;
    el.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function loadQuestion(index) {
    const filteredQuestions = getFilteredQuestions();
    if (!filteredQuestions || filteredQuestions.length === 0) {
      document.getElementById('quiz-card-container').innerHTML = `
        <div class="p-8 text-center text-slate-500">Tidak ada soal yang sesuai dengan filter topik ini.</div>
      `;
      return;
    }

    if (index < 0) index = 0;
    if (index >= filteredQuestions.length) index = filteredQuestions.length - 1;
    state.currentQuestionIndex = index;

    const q = filteredQuestions[index];
    const isAnswered = state.answers[q.id] !== undefined;
    const selectedOpt = state.answers[q.id];
    const isFlagged = state.flaggedQuestions.has(q.id);
    const showExplanation = state.quizMode === 'study' ? isAnswered : state.isExamSubmitted;

    // Render Question Card
    const container = document.getElementById('quiz-card-container');
    if (!container) return;

    const optionsHtml = q.options.map((opt, i) => {
      let optionClass = "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400";
      let badge = `<span class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">${String.fromCharCode(65 + i)}</span>`;

      if (isAnswered) {
        if (selectedOpt === i) {
          if (showExplanation) {
            if (i === q.correct) {
              optionClass = "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200";
              badge = `<span class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs bg-emerald-500 text-white">✓</span>`;
            } else {
              optionClass = "border-2 border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200";
              badge = `<span class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs bg-red-500 text-white">✕</span>`;
            }
          } else {
            // Exam mode before submit
            optionClass = "border-2 border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100";
            badge = `<span class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs bg-blue-600 text-white">${String.fromCharCode(65 + i)}</span>`;
          }
        } else if (showExplanation && i === q.correct) {
          // Highlight correct answer if user answered wrong
          optionClass = "border-2 border-emerald-500/80 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200";
          badge = `<span class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs bg-emerald-500 text-white">✓</span>`;
        }
      }

      return `
        <button 
          onclick="window.tpdApp.selectOption(${q.id}, ${i})" 
          class="w-full text-left p-3.5 rounded-xl transition-all flex items-start gap-3 text-xs md:text-sm font-medium ${optionClass}"
          ${state.isExamSubmitted ? 'disabled' : ''}
        >
          ${badge}
          <span class="flex-1 pt-0.5 leading-relaxed">${opt}</span>
        </button>
      `;
    }).join('');

    let explanationHtml = '';
    if (showExplanation) {
      const isCorrect = selectedOpt === q.correct;
      explanationHtml = `
        <div class="mt-5 p-4 rounded-xl border ${isCorrect ? 'border-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/30' : 'border-amber-300 bg-amber-50/70 dark:bg-amber-950/30'}">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="font-bold text-sm ${isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-amber-800 dark:text-amber-300'}">
              ${isCorrect ? '🎉 Jawaban Anda Benar!' : '💡 Pembahasan & Kunci Jawaban:'}
            </span>
            <span class="text-xs px-2 py-0.5 rounded font-bold ${isCorrect ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200'}">
              Kunci: ${String.fromCharCode(65 + q.correct)}
            </span>
          </div>
          <p class="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            ${q.explanation}
          </p>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="p-5 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <!-- Question Header Meta -->
        <div class="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-md font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              Soal No. ${index + 1} dari ${filteredQuestions.length}
            </span>
            <span class="px-2.5 py-1 rounded-md font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              🏷️ ${q.topicName}
            </span>
          </div>

          <button 
            onclick="window.tpdApp.toggleFlag(${q.id})" 
            class="px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${isFlagged ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}"
          >
            <span>🚩</span>
            <span>${isFlagged ? 'Ditandai Ragu' : 'Tandai Ragu'}</span>
          </button>
        </div>

        <!-- Question Prompt -->
        <h3 class="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 mb-5 leading-relaxed">
          ${q.question}
        </h3>

        <!-- Options List -->
        <div class="space-y-2.5 mb-2">
          ${optionsHtml}
        </div>

        <!-- Explanation if shown -->
        ${explanationHtml}

        <!-- Navigation Buttons -->
        <div class="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button 
            onclick="window.tpdApp.prevQuestion()" 
            class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs md:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
            ${index === 0 ? 'disabled' : ''}
          >
            ← Soal Sebelumnya
          </button>

          <span class="text-xs text-slate-400">Gunakan Palet Nomor untuk Melompat</span>

          <button 
            onclick="window.tpdApp.nextQuestion()" 
            class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            ${index === filteredQuestions.length - 1 ? 'disabled' : ''}
          >
            Soal Selanjutnya →
          </button>
        </div>
      </div>
    `;

    renderQuestionPalette();
  }

  function renderQuestionPalette() {
    const container = document.getElementById('quiz-palette-container');
    if (!container) return;

    const filteredQuestions = getFilteredQuestions();

    const buttonsHtml = filteredQuestions.map((q, idx) => {
      const isCurrent = idx === state.currentQuestionIndex;
      const isAnswered = state.answers[q.id] !== undefined;
      const isFlagged = state.flaggedQuestions.has(q.id);
      const isSubmitted = state.isExamSubmitted;
      const isCorrect = isAnswered && state.answers[q.id] === q.correct;

      let btnClass = "border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300";

      if (isSubmitted) {
        if (isAnswered) {
          btnClass = isCorrect
            ? "bg-emerald-500 text-white font-bold border-emerald-600"
            : "bg-red-500 text-white font-bold border-red-600";
        }
      } else if (isFlagged) {
        btnClass = "bg-amber-400 text-slate-900 font-bold border-amber-500";
      } else if (isAnswered) {
        btnClass = "bg-blue-600 text-white font-bold border-blue-700";
      }

      if (isCurrent) {
        btnClass += " ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900 scale-105";
      }

      return `
        <button 
          onclick="window.tpdApp.jumpToQuestion(${idx})" 
          class="w-8 h-8 md:w-9 md:h-9 rounded-lg text-xs flex items-center justify-center transition-all ${btnClass}"
          title="Soal No. ${idx + 1}"
        >
          ${idx + 1}
        </button>
      `;
    }).join('');

    // Summary calculation
    const total = filteredQuestions.length;
    const answeredCount = filteredQuestions.filter(q => state.answers[q.id] !== undefined).length;
    const flaggedCount = filteredQuestions.filter(q => state.flaggedQuestions.has(q.id)).length;

    container.innerHTML = `
      <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
          <h4 class="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">Palet Navigasi Soal</h4>
          <span class="text-xs font-semibold text-blue-600 dark:text-blue-400">${answeredCount} / ${total} Terjawab</span>
        </div>

        <div class="grid grid-cols-5 md:grid-cols-6 gap-2 mb-4">
          ${buttonsHtml}
        </div>

        <div class="grid grid-cols-2 gap-2 text-[10px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-blue-600"></span> Terjawab</div>
          <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-400"></span> Ragu-ragu</div>
          <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700"></span> Belum Diisi</div>
          <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded ring-2 ring-blue-500"></span> Soal Aktif</div>
        </div>
      </div>
    `;
  }

  function selectOption(questionId, optionIdx) {
    if (state.isExamSubmitted) return;
    state.answers[questionId] = optionIdx;
    loadQuestion(state.currentQuestionIndex);
  }

  function toggleFlag(questionId) {
    if (state.flaggedQuestions.has(questionId)) {
      state.flaggedQuestions.delete(questionId);
    } else {
      state.flaggedQuestions.add(questionId);
    }
    loadQuestion(state.currentQuestionIndex);
  }

  function confirmSubmitExam() {
    const currentSet = getActiveSet();
    const answeredCount = Object.keys(state.answers).length;
    const unansweredCount = currentSet.questions.length - answeredCount;

    let message = `Apakah Anda yakin ingin menyelesaikan ujian?\n\n• Sudah dijawab: ${answeredCount}\n• Belum dijawab: ${unansweredCount}`;
    if (unansweredCount > 0) {
      message += `\n\n⚠️ Masih ada ${unansweredCount} soal yang belum Anda isi!`;
    }

    if (confirm(message)) {
      submitExam();
    }
  }

  function submitExam() {
    clearInterval(state.timerInterval);
    state.isExamSubmitted = true;

    const currentSet = getActiveSet();
    let correctCount = 0;

    currentSet.questions.forEach(q => {
      if (state.answers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const total = currentSet.questions.length;
    const score = Math.round((correctCount / total) * 100);
    const isPassed = score >= 70;

    // Show native dialog modal for score
    const modal = document.getElementById('exam-result-dialog');
    if (modal) {
      document.getElementById('result-score-val').textContent = `${score}`;
      document.getElementById('result-correct-count').textContent = `${correctCount} dari ${total}`;
      document.getElementById('result-status-badge').textContent = isPassed ? 'LULUS KOMPETENSI' : 'PERLU EVALUASI';
      document.getElementById('result-status-badge').className = `px-3 py-1 rounded-full text-xs font-bold ${isPassed ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'}`;
      modal.showModal();
    }

    renderQuizControls();
    loadQuestion(state.currentQuestionIndex);
  }

  // --- TAB 3: LABORATORIUM ESAI MAPREDUCE ---
  function initMapReduceLab() {
    renderMapReduceVisualizer();
    renderMapReduceCases();
  }

  function renderMapReduceVisualizer() {
    const container = document.getElementById('mr-pipeline-container');
    if (!container) return;

    const steps = [
      {
        id: "input-split",
        title: "1. InputSplit & RecordReader",
        badge: "HDFS Layer",
        detail: "Input data di HDFS (default 128 MB per blok) dipartisi secara logis menjadi InputSplit. RecordReader memecah blok biner menjadi pasangan kunci-nilai masukan: <k1, v1> = <ByteOffset (LongWritable), BarisTeks (Text)>."
      },
      {
        id: "mapper",
        title: "2. Map Function (Mapper)",
        badge: "User Code",
        detail: "Mapper mengeksekusi logika pengguna: parsing teks, tokenisasi kata, pemfilteran, dan proyeksi kolom. Menghasilkan pasangan data perantara (intermediate key-value): <k2, v2>."
      },
      {
        id: "buffer",
        title: "3. Circular Memory Buffer (100 MB)",
        badge: "RAM Buffer",
        detail: "Output Mapper TIDAK langsung ditulis ke HDFS! Output ditampung di memori RAM sirkular (default 100 MB). Ketika mencapai ambang batas 80% (spill threshold), thread latar belakang mulai mengurutkan data in-memory dan menumpahkannya ke disk lokal pekerja."
      },
      {
        id: "partitioner",
        title: "4. HashPartitioner",
        badge: "Routing",
        detail: "Partitioner menentukan Reducer target untuk kunci k2 menggunakan formula: (hash(k2) & Integer.MAX_VALUE) % numReducers. Menjamin semua k2 yang sama bermuara ke mesin Reducer yang sama."
      },
      {
        id: "combiner",
        title: "5. Combiner (Mini-Reducer Lokal)",
        badge: "Optimasi Jaringan",
        detail: "Jika fungsi agregasi bersifat komutatif & asosiatif (seperti SUM, MAX, MIN), Combiner mengeksekusi pra-agregasi lokal di node mapper sebelum spill ke disk, memangkas 90% lalu lintas transfer jaringan."
      },
      {
        id: "shuffle-sort",
        title: "6. Shuffle & External Merge Sort",
        badge: "The Heart of MR",
        detail: "Copier thread pada Reducer menarik partisi output mapper melintasi jaringan melalui HTTP (Shuffle). Framework kemudian menggabungkan dan mengurutkan seluruh data perantara berdasarkan kunci k2 (External Merge Sort), menghasilkan: <k2, Iterable<v2>>."
      },
      {
        id: "reducer",
        title: "7. Reduce Function (Reducer)",
        badge: "User Code",
        detail: "Reducer menerima satu kunci unik beserta daftar seluruh nilai yang terasosiasi dengannya. Reducer mengeksekusi agregasi akhir (SUM grand total, hitung rasio rata-rata komposit, dsb)."
      },
      {
        id: "output",
        title: "8. OutputFormat & HDFS Sink",
        badge: "HDFS Storage",
        detail: "RecordWriter menulis pasangan luaran akhir <k3, v3> secara permanen ke file part-r-00000 di direktori HDFS dengan faktor replikasi default 3."
      }
    ];

    const pipelineStepsHtml = steps.map((s, idx) => `
      <button 
        onclick="window.tpdApp.selectMrStep(${idx})" 
        class="p-3 text-left rounded-xl border transition-all ${idx === state.activeMrStep ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 ring-2 ring-blue-500' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300'}"
      >
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-bold text-slate-800 dark:text-slate-200">${s.title}</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">${s.badge}</span>
        </div>
        <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">${s.detail}</p>
      </button>
    `).join('');

    const activeStepData = steps[state.activeMrStep] || steps[0];

    container.innerHTML = `
      <div class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm mb-8">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
              ⚙️ Alur Kerja Mendalam MapReduce (Step-by-Step Architecture)
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Klik setiap tahapan untuk melihat alur data fisik dan memori internalnya</p>
          </div>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            Fase ${state.activeMrStep + 1} dari ${steps.length}
          </span>
        </div>

        <!-- Interactive Grid Buttons -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          ${pipelineStepsHtml}
        </div>

        <!-- Active Step Deep Dive Box -->
        <div class="p-5 rounded-xl border border-blue-200 dark:border-blue-900 bg-gradient-to-r from-blue-50/70 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/20">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-blue-600 dark:text-blue-400 text-lg">📌</span>
            <h4 class="font-extrabold text-sm md:text-base text-slate-900 dark:text-slate-100">${activeStepData.title}</h4>
            <span class="text-xs px-2 py-0.5 rounded bg-blue-200 text-blue-900 dark:bg-blue-900 dark:text-blue-200 font-bold">${activeStepData.badge}</span>
          </div>
          <p class="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            ${activeStepData.detail}
          </p>
        </div>
      </div>
    `;
  }

  function renderMapReduceCases() {
    const container = document.getElementById('mr-cases-container');
    if (!container || !window.TPD_CONCEPTS_DATA) return;

    const cases = window.TPD_CONCEPTS_DATA.mapReduceCases;

    const tabsHtml = cases.map(c => `
      <button 
        onclick="window.tpdApp.selectMrCase('${c.id}')" 
        class="px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${c.id === state.activeMrCaseId ? 'bg-blue-600 text-white shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'}"
      >
        ${c.title.split(':')[0]} (${c.badge})
      </button>
    `).join('');

    const activeCase = cases.find(c => c.id === state.activeMrCaseId) || cases[0];

    container.innerHTML = `
      <div class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm mb-8">
        <div class="mb-4">
          <h3 class="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
            ✍️ Bedah 6 Kasus Esai MapReduce Legendaris (Template Jawaban 100)
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">Pilih salah satu kasus untuk melihat penerapan Template 5 Komponen Bernilai Sempurna</p>
        </div>

        <!-- Case Tabs Carousel/Scroll -->
        <div class="flex overflow-x-auto gap-2 pb-3 mb-6 no-scrollbar">
          ${tabsHtml}
        </div>

        <!-- Active Case Card -->
        <div class="p-5 md:p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h4 class="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">${activeCase.title}</h4>
              <span class="text-xs text-slate-500 dark:text-slate-400">Tingkat Kesulitan: ${activeCase.difficulty}</span>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              ${activeCase.badge}
            </span>
          </div>

          <!-- Problem Scenario Box -->
          <div class="mb-6 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">📝 Skenario Soal Ujian:</span>
            <p class="text-xs md:text-sm text-slate-800 dark:text-slate-200 font-medium">${activeCase.problem}</p>
          </div>

          <!-- 5 Baku Components Grid -->
          <div class="space-y-4">
            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Komponen 1: Struktur Masukan (Input Data)</span>
              <div class="mt-1 font-mono text-xs md:text-sm text-blue-700 dark:text-blue-300 font-semibold bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700">
                ${activeCase.input}
              </div>
            </div>

            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Komponen 2: Logika Mapper (Mapping Phase)</span>
              <p class="mt-1 text-xs md:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                ${activeCase.mapper}
              </p>
            </div>

            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Komponen 3: Evaluasi & Logika Combiner (Mini-Reducer)</span>
              <p class="mt-1 text-xs md:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                ${activeCase.combinerEval}
              </p>
            </div>

            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Komponen 4: Fase Shuffle & Sort (Framework Otomatis)</span>
              <p class="mt-1 text-xs md:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                ${activeCase.shuffleSort}
              </p>
            </div>

            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Komponen 5: Logika Reducer & HDFS Sink (Reducing Phase)</span>
              <p class="mt-1 text-xs md:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                ${activeCase.reducer}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- TAB 4: PREDIKSI 3 SOAL ESAI UTAMA ---
  function initPrediksiEsaiView() {
    const container = document.getElementById('prediksi-esai-container');
    if (!container || !window.TPD_EXAM_DATA) return;

    const set1 = window.TPD_EXAM_DATA.sets[0];
    const essays = set1.essays || [];

    const essaysHtml = essays.map((essay, i) => {
      const componentsHtml = essay.components.map(c => `
        <div class="mb-3">
          <h5 class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">${c.step}</h5>
          <p class="text-xs md:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-mono bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">${c.content}</p>
        </div>
      `).join('');

      const rubricHtml = essay.rubric.map(r => `
        <li class="flex items-start gap-2 text-xs md:text-sm text-slate-600 dark:text-slate-400">
          <span class="text-emerald-500 font-bold">✓</span>
          <span>${r}</span>
        </li>
      `).join('');

      return `
        <div class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm mb-6">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <h4 class="text-base md:text-xl font-bold text-slate-900 dark:text-slate-100">${essay.title}</h4>
            <span class="text-xs px-3 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Prediksi Probabilitas Tinggi
            </span>
          </div>

          <div class="mb-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">Pertanyaan Soal:</span>
            <p class="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200">${essay.scenario}</p>
          </div>

          <div class="mb-6">
            <span class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 block mb-3">Pedoman Kunci Jawaban Lengkap:</span>
            ${componentsHtml}
          </div>

          <div class="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-2">📋 Rubrik Penilaian Dosen:</span>
            <ul class="space-y-1.5">
              ${rubricHtml}
            </ul>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="mb-8">
        <h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">
          🎯 Bedah 3 Soal Esai Prediksi Utama UAS 2025/2026
        </h3>
        <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400">
          Sesuai arahan kisi-kisi: 2-3 soal esai akan menguji pemahaman konsep dan arsitektur, di mana salah satunya PASTI merupakan soal perancangan MapReduce.
        </p>
      </div>
      ${essaysHtml}
    `;
  }

  // --- TAB 5: FLASHCARDS, SCD LAB & MATRIKS KOMPARASI ---
  function initFlashcardsAndScd() {
    renderFlashcard();
    renderScdSimulator();
    renderComparisonMatrices();
  }

  function renderFlashcard() {
    const container = document.getElementById('flashcard-viewer-container');
    if (!container || !window.TPD_CONCEPTS_DATA) return;

    const cards = window.TPD_CONCEPTS_DATA.flashcards;
    const current = cards[state.currentFlashcardIndex];

    container.innerHTML = `
      <div class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm mb-10">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h4 class="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">
              ⚡ Flashcards: Angka Sakti & Mekanisme Buku Teks Tom White
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400">Klik kartu untuk membalik (flip) dan melihat penjelasan detail</p>
          </div>
          <span class="text-xs font-semibold px-2.5 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            ${state.currentFlashcardIndex + 1} / ${cards.length}
          </span>
        </div>

        <!-- 3D Flip Card -->
        <div class="perspective-1000 w-full max-w-xl mx-auto h-64 mb-6 cursor-pointer" onclick="window.tpdApp.flipFlashcard()">
          <div class="relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${state.isFlashcardFlipped ? 'rotate-y-180' : ''}">
            
            <!-- Front Card -->
            <div class="absolute w-full h-full backface-hidden rounded-2xl border-2 border-blue-500/60 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 p-6 flex flex-col justify-between shadow-md">
              <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                ${current.category} • Klik untuk Balik
              </span>
              <p class="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 text-center leading-relaxed">
                ${current.front}
              </p>
              <div class="text-center text-xs text-slate-400">👆 Tap / Klik Kartu</div>
            </div>

            <!-- Back Card -->
            <div class="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl border-2 border-emerald-500/80 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-900 p-6 flex flex-col justify-between shadow-md">
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Kunci Konsep • Tom White
              </span>
              <p class="text-xs md:text-sm font-medium text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                ${current.back}
              </p>
              <div class="text-center text-xs text-slate-400">👆 Klik untuk Kembali</div>
            </div>

          </div>
        </div>

        <!-- Controls -->
        <div class="flex items-center justify-center gap-3">
          <button onclick="window.tpdApp.prevFlashcard()" class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800">
            ← Sebelumnya
          </button>
          <button onclick="window.tpdApp.flipFlashcard()" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm">
            🔄 Balik Kartu
          </button>
          <button onclick="window.tpdApp.nextFlashcard()" class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800">
            Selanjutnya →
          </button>
        </div>
      </div>
    `;
  }

  function renderScdSimulator() {
    const container = document.getElementById('scd-simulator-container');
    if (!container || !window.TPD_CONCEPTS_DATA) return;

    const scd = window.TPD_CONCEPTS_DATA.scdSimulator;
    const activeType = scd.types[state.activeScdType];

    const typeTabsHtml = Object.keys(scd.types).map(k => `
      <button 
        onclick="window.tpdApp.selectScdType('${k}')" 
        class="px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${k === state.activeScdType ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}"
      >
        ${scd.types[k].name}
      </button>
    `).join('');

    const headersHtml = activeType.columns.map(c => `
      <th class="p-3 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">${c}</th>
    `).join('');

    const rowsHtml = activeType.rows.map(r => {
      let rowBg = "hover:bg-slate-50 dark:hover:bg-slate-800/50";
      if (r.status === 'updated') rowBg = "bg-amber-50/50 dark:bg-amber-950/20";
      if (r.status === 'active') rowBg = "bg-emerald-50/50 dark:bg-emerald-950/20";
      if (r.status === 'closed') rowBg = "bg-slate-100/50 dark:bg-slate-800/30 opacity-70";

      return `
        <tr class="border-b border-slate-200 dark:border-slate-800 ${rowBg}">
          ${r.cells.map(c => `<td class="p-3 text-xs md:text-sm font-medium text-slate-800 dark:text-slate-200">${c}</td>`).join('')}
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm mb-10">
        <div class="mb-4">
          <h4 class="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">
            📊 Simulator Interaktif: Slowly Changing Dimensions (SCD Tipe 1, 2, 3)
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Skenario: Pelanggan Budi Santoso pindah dari "Jakarta" (Mahasiswa) ke "Surabaya" (PNS) pada 28 September 2026.
          </p>
        </div>

        <!-- Type Selector Tabs -->
        <div class="flex flex-wrap gap-2 mb-4">
          ${typeTabsHtml}
        </div>

        <!-- Subtitle & Description Box -->
        <div class="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 mb-5">
          <div class="flex items-center justify-between mb-1">
            <span class="font-bold text-xs md:text-sm text-blue-900 dark:text-blue-200">${activeType.name}</span>
            <span class="text-xs text-blue-700 dark:text-blue-300 font-semibold">${activeType.subtitle}</span>
          </div>
          <p class="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${activeType.explanation}</p>
        </div>

        <!-- Visual Table -->
        <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table class="w-full text-left border-collapse">
            <thead class="bg-slate-100 dark:bg-slate-800">
              <tr>
                ${headersHtml}
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderComparisonMatrices() {
    const container = document.getElementById('matrices-container');
    if (!container || !window.TPD_CONCEPTS_DATA) return;

    const matrices = window.TPD_CONCEPTS_DATA.comparisonMatrices;

    const tabsHtml = matrices.map(m => `
      <button 
        onclick="window.tpdApp.selectMatrix('${m.id}')" 
        class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${m.id === state.activeMatrixId ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}"
      >
        ${m.title}
      </button>
    `).join('');

    const activeMatrix = matrices.find(m => m.id === state.activeMatrixId) || matrices[0];

    const headersHtml = activeMatrix.headers.map((h, i) => `
      <th class="p-3 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 ${i === 0 ? 'text-slate-600 dark:text-slate-400' : 'text-blue-700 dark:text-blue-300'}">${h}</th>
    `).join('');

    const rowsHtml = activeMatrix.rows.map(r => `
      <tr class="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40">
        <td class="p-3 text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200">${r[0]}</td>
        <td class="p-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">${r[1]}</td>
        <td class="p-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">${r[2]}</td>
      </tr>
    `).join('');

    container.innerHTML = `
      <div class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div class="mb-4">
          <h4 class="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">
            🏛️ Matriks Komparasi Biner Terpopuler
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400">Paling sering keluar dalam bentuk soal pilihan ganda kontras</p>
        </div>

        <div class="flex overflow-x-auto gap-2 pb-3 mb-4 no-scrollbar">
          ${tabsHtml}
        </div>

        <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table class="w-full text-left border-collapse">
            <thead class="bg-slate-100 dark:bg-slate-800">
              <tr>
                ${headersHtml}
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- TAB 6: ARSIP ASLI UAS 2022/2023 ---
  function initArsipView() {
    const container = document.getElementById('arsip-container');
    if (!container || !window.TPD_EXAM_DATA) return;

    const set4 = window.TPD_EXAM_DATA.sets.find(s => s.id === 'set-4');
    if (!set4) return;

    container.innerHTML = `
      <div class="mb-6 p-6 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
        <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 mb-2 inline-block">
          Arsip Resmi Ujian Asli
        </span>
        <h3 class="text-xl md:text-2xl font-black mb-2">Naskah Asli UAS Semester Genap T.A. 2022/2023</h3>
        <p class="text-xs md:text-sm text-amber-100 max-w-3xl leading-relaxed mb-4">
          Naskah asli ini terdiri dari 25 Pilihan Ganda dan 5 Soal Esai. Anda dapat menjadikannya tolok ukur penguasaan materi ekosistem Big Data (Sqoop, Hive, HBase, Pig, Kafka, Spark) sebelum melangkah ke prediksi UAS 2025/2026.
        </p>
        <button onclick="window.tpdApp.startQuizDirectly('set-4')" class="px-5 py-2.5 rounded-xl bg-white text-amber-800 font-bold text-xs md:text-sm shadow hover:bg-amber-50 transition-all">
          🚀 Kerjakan 25 PG Asli 2022/2023 di Mode Simulasi
        </button>
      </div>

      <div class="space-y-4">
        ${set4.essays.map((essay, idx) => `
          <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <h4 class="font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 mb-2">${essay.title}</h4>
            <div class="mb-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300">
              ${essay.scenario}
            </div>
            <div class="space-y-2">
              ${essay.components.map(c => `
                <div class="text-xs md:text-sm text-slate-600 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <strong class="text-blue-600 dark:text-blue-400 block">${c.step}</strong>
                  <pre class="font-sans whitespace-pre-line mt-1">${c.content}</pre>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // --- GLOBAL EXPORTS / EVENT HANDLERS ---
  window.tpdApp = {
    goToTab: (tabId) => switchTab(tabId),
    startQuizDirectly: (setId) => {
      state.currentSetId = setId;
      state.currentQuestionIndex = 0;
      state.selectedTopicFilter = 'all';
      switchTab('quiz');
      renderQuizControls();
      loadQuestion(0);
    },
    selectOption: (qId, optIdx) => selectOption(qId, optIdx),
    toggleFlag: (qId) => toggleFlag(qId),
    jumpToQuestion: (idx) => loadQuestion(idx),
    prevQuestion: () => loadQuestion(state.currentQuestionIndex - 1),
    nextQuestion: () => loadQuestion(state.currentQuestionIndex + 1),
    selectMrStep: (stepIdx) => {
      state.activeMrStep = stepIdx;
      renderMapReduceVisualizer();
    },
    selectMrCase: (caseId) => {
      state.activeMrCaseId = caseId;
      renderMapReduceCases();
    },
    selectScdType: (typeKey) => {
      state.activeScdType = typeKey;
      renderScdSimulator();
    },
    selectMatrix: (matrixId) => {
      state.activeMatrixId = matrixId;
      renderComparisonMatrices();
    },
    flipFlashcard: () => {
      state.isFlashcardFlipped = !state.isFlashcardFlipped;
      renderFlashcard();
    },
    nextFlashcard: () => {
      const cards = window.TPD_CONCEPTS_DATA.flashcards;
      state.currentFlashcardIndex = (state.currentFlashcardIndex + 1) % cards.length;
      state.isFlashcardFlipped = false;
      renderFlashcard();
    },
    prevFlashcard: () => {
      const cards = window.TPD_CONCEPTS_DATA.flashcards;
      state.currentFlashcardIndex = (state.currentFlashcardIndex - 1 + cards.length) % cards.length;
      state.isFlashcardFlipped = false;
      renderFlashcard();
    }
  };

})();
