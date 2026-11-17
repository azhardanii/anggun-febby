/**
 * ANGGUN FEBBY — EDITORIAL STORE & WFA INTERACTION SCRIPT
 * - Bilingual Switcher (ID <-> EN)
 * - Responsive Hero Video
 * - Product Grid & Bundle Grid (Direct Redirect to Lynk.id)
 * - Destination Filter, Search & Quick Guide Modal
 * - Video Reels Player, Mobile Drawer & Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rp = (num) => 'Rp' + Number(num || 0).toLocaleString('id-ID');
  const LYNK_URL = 'https://lynk.id/febbyanggun';

  // ==========================================================================
  // 1. RESPONSIVE HERO VIDEO
  // ==========================================================================
  const heroVideo = document.getElementById('hero-video');
  function updateHeroVideo() {
    if (!heroVideo) return;
    const isMobile = window.innerWidth <= 768;
    const targetSrc = isMobile
      ? 'assets/videos/video-hero-mobile.webm'
      : 'assets/videos/video-hero.webm';

    if (heroVideo.dataset.activeSrc !== targetSrc) {
      heroVideo.dataset.activeSrc = targetSrc;
      heroVideo.src = targetSrc;
      heroVideo.load();
      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(function () {});
      }
    }
  }

  updateHeroVideo();
  let videoResizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(videoResizeTimer);
    videoResizeTimer = setTimeout(updateHeroVideo, 200);
  });

  // ==========================================================================
  // 2. TRANSLATIONS (ID <-> EN) — PRESERVING HERO HEADLINE
  // ==========================================================================
  const translations = {
    id: {
      nav_tools: 'Produk',
      nav_bundle: 'Paket Hemat',
      nav_reviews: 'Testimoni',
      nav_destinations: 'Destinasi',
      nav_story: 'Ceritaku',
      nav_socials: 'Media Sosial',
      nav_join: 'Gabung Komunitas',
      drawer_start: 'Gabung Komunitas WFA →',

      hero_eyebrow: 'Pekerja WFA · Traveller & Content Creator',
      hero_title: 'Work Anywhere.<br><i>Travel Everywhere.</i>',
      hero_sub: 'Hai, aku Anggun! Seorang pekerja WFA dan content creator yang kerjanya dari mana aja sambil keliling dunia. Di sini aku berbagi panduan kerja remote, tools digital praktis, rekomendasi destinasi nomad, serta peluang kolaborasi biar kamu juga bisa membangun hidup yang lebih bebas dan fleksibel.',
      hero_cta_primary: 'Lihat Produk WFA',
      hero_cta_secondary: 'Cek Paket Hemat',
      hero_scroll: 'Scroll ke bawah',
      proof_1: 'pembeli & komunitas aktif',
      proof_2: 'rating rata-rata panduan',
      proof_3_title: 'Instan',
      proof_3: 'akses digital selamanya',

      path_1_badge: 'Info Lowongan Tiap Minggu',
      path_1_heading: 'WFA Jobs & Peluang Kerja',
      path_1_desc: 'Kurasi lowongan kerja WFA dari berbagai perusahaan global buat kamu yang pengen mulai kerja fleksibel.',
      path_1_btn: 'Cari Info Lowongan',
      path_2_badge: 'Brand Collaboration & Rate Card',
      path_2_heading: 'Collaboration & Rate Card',
      path_2_desc: 'Tertarik kolaborasi campaign, review akomodasi/destinasi, konten kreatif, atau sponsorship? Yuk minta rate card-ku.',
      path_2_btn: 'Tanya Rate Card di WhatsApp',
      path_3_badge: 'Belajar WFA',
      path_3_heading: 'Belajar di Sekolah WFA',
      path_3_desc: 'Buat kamu yang mau bimbingan intensif soal skill, mindset, dan langkah nyata transisi jadi pekerja WFA dari nol.',
      path_3_btn: 'Pelajari Sekolah WFA',

      tools_eyebrow: 'PERLENGKAPAN KERJA & TEMPLATE',
      tools_heading: 'Produk Populer & WFA Tools',
      tools_desc: 'Kumpulan panduan monetisasi produk digital, automation tools konten, dan database tempat kerja yang aku pakai sendiri sehari-hari biar bisa kerja produktif sambil traveling tanpa ribet.',
      filter_all: 'Semua Produk',
      filter_wfa: 'Karier WFA',
      filter_income: 'Produk Digital',
      filter_creator: 'Kreator Konten',
      add_to_cart: 'Tambah ke Keranjang →',
      add_bundle: 'Tambah Paket →',

      bundle_eyebrow: 'PAKET HEMAT',
      bundle_title: 'Paket Hemat WFA',
      bundle_lead: 'Beli beberapa sekaligus atau mulai dengan bimbingan lengkap, bayar jauh lebih hemat.',

      testi_eyebrow: 'KATA MEREKA',
      testi_title: 'Kata Mereka yang Sudah Mencoba',
      testi_sub: 'Cerita nyata dari pembaca dan teman-teman komunitas yang sudah mempraktikkan panduan dan tools WFA ini.',
      quote_1_text: '“Panduannya lengkap dan mudah dipahami. Sekarang aku sudah mulai kerja remote dari Bali!”',
      quote_2_text: '“Database & template-nya rapi, nggak perlu pusing riset dari nol dan langsung kebayang langkah lamarannya.”',
      quote_3_text: '“Content Auto Pilot bikin jadwal konten sebulan selesai dalam satu sore, sisa waktunya bisa dipakai eksplor kota.”',

      comm_eyebrow: 'KOMUNITAS PEKERJA WFA',
      comm_title: 'Kerja dari mana aja lebih seru kalau barengan.',
      comm_sub: 'Nggak perlu ngerasa sendirian. Di sini kita saling kenal, sharing tips hidup WFA, saling semangatin, sampai janjian coworking bareng.',

      dest_eyebrow: 'CATATAN PERJALANAN',
      dest_title: 'Mau Buka Laptop di<br><em>Mana Hari Ini?</em>',
      dest_sub: 'Kumpulan kota dan negara yang pernah aku singgahi buat kerja remote. Ada info WiFi kafe, kisaran biaya hidup, sampai urusan visa.',
      dest_search_placeholder: 'Cari negara, kota, atau kafe ramah nomad...',
      dest_popular_label: 'Populer:',
      dest_chip_all: 'Semua Destinasi',
      dest_bridge_title: 'Mau rekomendasi kafe atau kota lainnya?',
      dest_bridge_desc: 'Aku sering sharing spot kerja tersembunyi, update visa nomad, dan suasana kafe baru di grup WhatsApp.',
      dest_bridge_btn: 'Ngobrol di Komunitas →',

      stories_eyebrow: 'CERITA DI BALIK LAYAR',
      stories_title: 'Dari Desa Kecil Sampai Bisa Bawa Kerja Keliling Dunia',
      stories_sub: '“Dulu bisa terus sekolah aja udah sebuah perjuangan besar. Sekarang, aku bisa kerja dari mana aja, berkarya jadi content creator, dan menjalani hidup yang dulu cuma berani aku impikan.”',
      stories_follow: 'Lihat Keseharianku @anggunfebby.s',

      connect_eyebrow: 'MEDIA SOSIAL & KONTEN',
      connect_title: 'Intip Keseharian & Konten Terbaruku',
      connect_sub: 'Di media sosial, aku rutin spill tips kerja WFA, review spot ngopi estetik di berbagai negara, behind the scenes, dan daily vlog perjalanan:',
      connect_ig_desc: 'Tips WFA, Rekomendasi & Dokumentasi Momen',
      connect_ig_btn: 'Follow di Instagram ↗',
      connect_tt_desc: 'Konten Santai, Behind The Scenes & Reality WFA',
      connect_tt_btn: 'Nonton di TikTok ↗',
      connect_yt_desc: 'Travel Vlog & Dokumentasi Keliling Dunia',
      connect_yt_btn: 'Subscribe di YouTube ↗',

      faq_title: 'Pertanyaan Umum',
      faq_1_q: 'Produknya dikirim dalam bentuk apa?',
      faq_1_a: 'Semua panduan dan WFA tools tersedia dalam format digital (PDF, Notion template, spreadsheet) di Lynk.id. Link akses langsung aktif setelah pembayaran.',
      faq_2_q: 'Apakah akses materinya berlaku selamanya?',
      faq_2_a: 'Ya! Sekali akses, kamu bisa membuka dan mengunduh ulang kapan pun serta mendapat pembaruan materi gratis.',
      faq_3_q: 'Bagaimana cara berkolaborasi atau meminta rate card?',
      faq_3_a: 'Kamu bisa chat langsung via WhatsApp atau DM Instagram @anggunfebby.s untuk campaign brand, review destinasi, atau sponsorship.',
      faq_4_q: 'Bagaimana kalau aku masih bingung mulai dari mana?',
      faq_4_a: 'Kamu bisa gabung komunitas WFA gratis terlebih dulu atau langsung chat tim lewat WhatsApp untuk arahan produk yang paling sesuai.',

      news_title: 'Tips WFA & Kolaborasi Langsung ke Emailmu',
      news_sub: 'Gabung komunitas dan dapatkan info lowongan kerja remote serta checklist WFA gratis.',
      newsletter_placeholder: 'Alamat email kamu',
      newsletter_btn: 'Gabung Gratis',
      back_to_top: 'Kembali ke atas ↑',

      floating_full: 'Komunitas WFA 💬',
      floating_short: 'Join',
      modal_btn: 'Lihat WFA Tools Buat Traveling'
    },
    en: {
      nav_tools: 'Products',
      nav_bundle: 'Bundles',
      nav_reviews: 'Testimonials',
      nav_destinations: 'Destinations',
      nav_story: 'My Story',
      nav_socials: 'Socials',
      nav_join: 'Join Community',
      drawer_start: 'Join WFA Community →',

      hero_eyebrow: 'WFA Worker · Traveller & Content Creator',
      hero_title: 'Work Anywhere.<br><i>Travel Everywhere.</i>',
      hero_sub: 'Hi, I’m Anggun! A remote WFA worker and content creator working from anywhere while traveling the world. Here I share practical remote-work guides, digital toolkits, nomad destination logs, and brand collaborations so you can build a freer life too.',
      hero_cta_primary: 'Explore WFA Products',
      hero_cta_secondary: 'See Value Bundles',
      hero_scroll: 'Scroll down',
      proof_1: 'active readers & buyers',
      proof_2: 'average guide rating',
      proof_3_title: 'Instant',
      proof_3: 'lifetime digital access',

      path_1_badge: 'Weekly Global Openings',
      path_1_heading: 'WFA Jobs & Global Roles',
      path_1_desc: 'Handpicked global WFA and remote job openings updated every week for anyone looking to work flexibly.',
      path_1_btn: 'Browse Job Openings',
      path_2_badge: 'Brand Collaboration & Rate Card',
      path_2_heading: 'Collaboration & Rate Card',
      path_2_desc: 'Interested in brand partnerships, campaign content, destination reviews, or sponsorships? Let’s chat and request my rate card.',
      path_2_btn: 'Request Rate Card on WhatsApp',
      path_3_badge: 'Learn WFA',
      path_3_heading: 'Learn at Sekolah WFA',
      path_3_desc: 'Step-by-step guidance on skills, mindset, and practical transitions to becoming a location-independent worker from scratch.',
      path_3_btn: 'Explore Sekolah WFA',

      tools_eyebrow: 'WORK GEAR & DIGITAL TEMPLATES',
      tools_heading: 'Popular WFA Products & Tools',
      tools_desc: 'The exact digital product guides, content automation systems, and work-travel databases I use daily to earn and stay productive while traveling.',
      filter_all: 'All Products',
      filter_wfa: 'WFA Career',
      filter_income: 'Digital Products',
      filter_creator: 'Content Creator',
      add_to_cart: 'Add to Cart →',
      add_bundle: 'Add Bundle →',

      bundle_eyebrow: 'VALUE BUNDLES',
      bundle_title: 'WFA Value Bundles',
      bundle_lead: 'Combine guides together or start with structured mentorship and save more.',

      testi_eyebrow: 'TESTIMONIALS',
      testi_title: 'What Readers & Nomads Say',
      testi_sub: 'Real stories from buyers and community members using these WFA tools.',
      quote_1_text: '“Super clear and comprehensive guide. Now I’m actually working remotely from Bali!”',
      quote_2_text: '“The database and templates saved me weeks of research and gave me confidence to apply right away.”',
      quote_3_text: '“Content Auto Pilot helped me map out a full month of content in just one relaxed afternoon.”',

      comm_eyebrow: 'GLOBAL WFA COMMUNITY',
      comm_title: 'Working from anywhere is better together.',
      comm_sub: 'You don’t have to build your WFA journey alone. Connect with fellow travelers, share WFA lifestyle tips, and co-work together.',

      dest_eyebrow: 'TRAVEL LOGS',
      dest_title: 'Where Do You Want<br><em>to Work Today?</em>',
      dest_sub: 'Notes from cities and countries I’ve worked from around the world. Cafe Wi-Fi speeds, living costs, work vibes, and visa tips.',
      dest_search_placeholder: 'Search country, city, or nomad cafe...',
      dest_popular_label: 'Popular:',
      dest_chip_all: 'All Destinations',
      dest_bridge_title: 'Looking for recommendations in other cities?',
      dest_bridge_desc: 'I regularly share hidden work spots, cafe reviews, and visa tips in our WhatsApp group.',
      dest_bridge_btn: 'Chat in the Community →',

      stories_eyebrow: 'BEHIND THE SCENES',
      stories_title: 'From a Small Village to Working Around the World',
      stories_sub: '“Staying in school was once a daily challenge. Today, I can work from anywhere, create digital content, and live the life I once only dreamed about.”',
      stories_follow: 'Follow My Daily Life @anggunfebby.s',

      connect_eyebrow: 'SOCIALS & CONTENT',
      connect_title: 'See My Daily Life & Latest Content',
      connect_sub: 'On social media, I share practical WFA tips, aesthetic cafe finds worldwide, behind-the-scenes moments, and travel vlogs:',
      connect_ig_desc: 'WFA Tips, Recommendations & Story Moments',
      connect_ig_btn: 'Follow on Instagram ↗',
      connect_tt_desc: 'Casual Clips, Behind The Scenes & WFA Reality',
      connect_tt_btn: 'Watch on TikTok ↗',
      connect_yt_desc: 'Travel Vlogs & World Travel Documentaries',
      connect_yt_btn: 'Subscribe on YouTube ↗',

      faq_title: 'Frequently Asked Questions',
      faq_1_q: 'How are the digital products delivered?',
      faq_1_a: 'All guides and tools are digital files (PDFs, Notion templates, spreadsheets) via Lynk.id with instant download access right after checkout.',
      faq_2_q: 'Do I get lifetime access?',
      faq_2_a: 'Yes! Once unlocked, you can re-download anytime and receive free ongoing material updates.',
      faq_3_q: 'How can brands collaborate or request a rate card?',
      faq_3_a: 'You can reach out directly via WhatsApp or Instagram DM @anggunfebby.s for campaigns, destination reviews, or sponsorships.',
      faq_4_q: 'What if I’m unsure where to begin?',
      faq_4_a: 'Join the free WFA community first or chat via WhatsApp for recommendations on the best starting kit.',

      news_title: 'WFA Tips & Updates Straight to Your Inbox',
      news_sub: 'Join the community and get weekly remote opportunities plus a free WFA starter checklist.',
      newsletter_placeholder: 'Your email address',
      newsletter_btn: 'Join Free',
      back_to_top: 'Back to top ↑',

      floating_full: 'WFA Community 💬',
      floating_short: 'Join',
      modal_btn: 'Explore WFA Tools For Traveling'
    }
  };

  let currentLang = localStorage.getItem('anggun_lang') || 'id';

  // ==========================================================================
  // 3. PRODUCTS & BUNDLES DATA (ALL ACTION BUTTONS DIRECTLY LINK TO LYNK.ID)
  // ==========================================================================
  const products = [
    {
      id: 'database',
      category: 'wfa',
      theme: 'c1',
      coverImg: 'assets/bali.webp',
      tag: { id: 'Terlaris', en: 'Best Seller' },
      name: { id: 'Travel & Work Database™', en: 'Travel & Work Database™' },
      desc: {
        id: 'Paid travel program dan kurasi lowongan WFA global siap lamar.',
        en: 'Paid travel programs and curated global WFA job openings.'
      },
      price: 49000,
      oldPrice: 99000,
      rating: '4,9 (2,1 rb)',
      url: LYNK_URL
    },
    {
      id: 'blueprint',
      category: 'income',
      theme: 'c2',
      coverImg: 'assets/travel-work-database.png',
      tag: { id: 'Terpopuler', en: 'Most Popular' },
      name: {
        id: 'Mengenal WFA & Produk Digital',
        en: 'WFA Blueprint & Digital Products'
      },
      desc: {
        id: 'Panduan memulai dan menghasilkan income dari produk digital bareng Lynk.id.',
        en: 'Starter blueprint to earning from digital products with Lynk.id.'
      },
      price: 199000,
      oldPrice: 299000,
      rating: '4,9 (1 rb)',
      url: LYNK_URL
    },
    {
      id: 'autopilot',
      category: 'creator',
      theme: 'c3',
      coverImg: 'assets/collab-done.webp',
      tag: { id: 'Favorit', en: 'Favorite' },
      name: {
        id: 'Assistant Content "Auto Pilot"',
        en: 'Content Assistant "Auto Pilot"'
      },
      desc: {
        id: 'Tools pintar bikin ide, script otomatis, dan kelola konten dalam 1 menit.',
        en: 'Smart toolkit to generate content ideas & scripts in 1 minute.'
      },
      price: 99000,
      oldPrice: 149000,
      rating: '4,8 (850)',
      url: LYNK_URL
    },
    {
      id: 'portfolio',
      category: 'wfa',
      theme: 'c5',
      coverImg: 'assets/coaching-done.webp',
      tag: { id: 'Template', en: 'Template' },
      name: {
        id: 'Creator Portfolio & Career Kit',
        en: 'Creator Portfolio & Career Kit'
      },
      desc: {
        id: 'Template portofolio profesional, CV remote, dan checklist transisi WFA.',
        en: 'Modern portfolio template, remote CV, and WFA transition checklist.'
      },
      price: 79000,
      oldPrice: 129000,
      rating: '4,8 (730)',
      url: LYNK_URL
    }
  ];

  const bundles = [
    {
      id: 'starter-kit',
      name: { id: 'WFA Starter Kit', en: 'WFA Starter Kit' },
      tag: null,
      items: {
        id: ['Travel & Work Database™', 'Checklist Transisi WFA', 'Daftar Situs Lowongan Global'],
        en: ['Travel & Work Database™', 'WFA Transition Checklist', 'Global Remote Job Sites']
      },
      price: 79000,
      oldPrice: 98000,
      best: false,
      url: LYNK_URL
    },
    {
      id: 'blueprint-bundle',
      name: { id: 'Work From Anywhere Blueprint', en: 'Work From Anywhere Blueprint' },
      tag: { id: 'Paling Hemat', en: 'Best Value' },
      items: {
        id: ['Semua isi Starter Kit', 'Panduan Produk Digital Lynk.id', 'Content Assistant Auto Pilot'],
        en: ['Everything in Starter Kit', 'Lynk.id Digital Product Guide', 'Content Assistant Auto Pilot']
      },
      price: 199000,
      oldPrice: 299000,
      best: true,
      url: LYNK_URL
    },
    {
      id: 'accelerator',
      name: { id: 'WFA Accelerator & Sekolah WFA', en: 'WFA Accelerator & Mentorship' },
      tag: null,
      items: {
        id: ['Semua Koleksi Tools Toko', 'Update Database Selamanya', 'Akses Bimbingan Sekolah WFA'],
        en: ['Full Resource Collection', 'Lifetime Database Updates', 'Sekolah WFA Guidance Access']
      },
      price: 499000,
      oldPrice: 799000,
      best: false,
      url: LYNK_URL
    }
  ];

  let activeProductFilter = 'all';
  const productsGrid = document.getElementById('products-grid');
  const bundleGrid = document.getElementById('bundle-grid');

  function renderProducts(filterKey) {
    if (!productsGrid) return;
    activeProductFilter = filterKey || activeProductFilter;
    const lang = currentLang === 'en' ? 'en' : 'id';
    const ctaLabel = translations[lang].add_to_cart;

    const visible = products.filter((item) => activeProductFilter === 'all' || item.category === activeProductFilter);

    productsGrid.innerHTML = visible
      .map((item) => {
        const tag = item.tag[lang];
        const title = item.name[lang];
        const desc = item.desc[lang];
        return `
          <article class="product-card">
            <div class="book-stage">
              <span class="book-badge">${tag}</span>
              <div class="book-3d ${item.theme}">
                <img src="${item.coverImg}" alt="" class="book-3d-img" loading="lazy">
                <span class="book-spine-tag">Anggun Febby</span>
                <strong class="book-cover-title">${title}</strong>
                <div class="book-cover-foot">
                  <span>WFA Edition</span>
                  <span>✦</span>
                </div>
              </div>
            </div>
            <h3>${title}</h3>
            <p class="product-desc">${desc}</p>
            <div class="product-rate"><span class="stars">★★★★★</span> <b>${item.rating}</b></div>
            <div class="product-price-row">
              <span>${rp(item.price)}</span>
              <s class="price-old">${rp(item.oldPrice)}</s>
            </div>
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn btn-dark btn-full">${ctaLabel}</a>
          </article>
        `;
      })
      .join('');
  }

  function renderBundles() {
    if (!bundleGrid) return;
    const lang = currentLang === 'en' ? 'en' : 'id';
    const btnLabel = translations[lang].add_bundle;

    bundleGrid.innerHTML = bundles
      .map((b) => {
        const name = b.name[lang];
        const tagHtml = b.tag ? `<span class="bundle-tag">${b.tag[lang]}</span>` : '';
        const listHtml = b.items[lang].map((li) => `<li>${li}</li>`).join('');
        const btnClass = b.best ? 'btn btn-dark btn-full' : 'btn btn-full';
        return `
          <div class="bundle ${b.best ? 'best' : ''}">
            ${tagHtml}
            <h3>${name}</h3>
            <ul>${listHtml}</ul>
            <div class="bundle-price"><span>${rp(b.price)}</span><s>${rp(b.oldPrice)}</s></div>
            <a href="${b.url}" target="_blank" rel="noopener noreferrer" class="${btnClass}">${btnLabel}</a>
          </div>
        `;
      })
      .join('');
  }

  document.querySelectorAll('#product-filters .filter-pill').forEach(function (pill) {
    pill.addEventListener('click', function () {
      document.querySelectorAll('#product-filters .filter-pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      renderProducts(pill.getAttribute('data-filter') || 'all');
    });
  });

  // ==========================================================================
  // 4. APPLY LANGUAGE & BIND SWITCHER
  // ==========================================================================
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('anggun_lang', lang);
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('.lang-switch').forEach(function (sw) {
      sw.setAttribute('data-active', lang);
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      const isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-checked', isActive ? 'true' : 'false');
    });

    const dict = translations[lang] || translations.id;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (dict[key].includes('<') && dict[key].includes('>')) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });

    renderProducts(activeProductFilter);
    renderBundles();
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang && targetLang !== currentLang) {
        applyLanguage(targetLang);
      }
    });
  });

  applyLanguage(currentLang);

  // ==========================================================================
  // 5. SCROLL PROGRESS, FLOATING BUTTON & MOBILE DRAWER
  // ==========================================================================
  const progressBar = document.getElementById('reading-progress');
  const floatingBtn = document.getElementById('floating-join-wfa');
  const heroSection = document.getElementById('hero');

  function onScrollUpdate() {
    const scrollY = window.scrollY || 0;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      progressBar.style.width = `${(scrollY / totalHeight) * 100}%`;
    }
    if (floatingBtn && heroSection) {
      const rect = heroSection.getBoundingClientRect();
      floatingBtn.classList.toggle('is-visible', rect.bottom <= 80 || scrollY > 340);
    }
  }

  window.addEventListener('scroll', onScrollUpdate, { passive: true });
  onScrollUpdate();

  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', function () {
      mobileDrawer.classList.toggle('active');
    });
    mobileDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  document.getElementById('back-to-top')?.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================================================
  // 6. DESTINATION SEARCH, CHIPS & MODAL
  // ==========================================================================
  const destSearchInput = document.getElementById('dest-search-box');
  const destSearchClear = document.getElementById('dest-search-clear');
  const destChips = document.querySelectorAll('.dest-chip');
  const destCards = document.querySelectorAll('.dest-card');

  function filterDestCards() {
    const activeChip = document.querySelector('.dest-chip.active')?.getAttribute('data-filter') || 'all';
    const query = (destSearchInput?.value || '').toLowerCase().trim();

    if (destSearchClear) {
      destSearchClear.style.display = query.length > 0 ? 'block' : 'none';
    }

    destCards.forEach(function (card) {
      const city = (card.getAttribute('data-city') || '').toLowerCase();
      const text = card.textContent.toLowerCase();
      const matchesChip = activeChip === 'all' || city.includes(activeChip);
      const matchesQuery = !query || text.includes(query);
      card.style.display = matchesChip && matchesQuery ? 'flex' : 'none';
    });
  }

  destChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      destChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      filterDestCards();
    });
  });

  destSearchInput?.addEventListener('input', filterDestCards);
  destSearchClear?.addEventListener('click', function () {
    if (destSearchInput) {
      destSearchInput.value = '';
      destSearchInput.focus();
      filterDestCards();
    }
  });

  const destinationData = {
    bali: {
      title: 'Bali',
      country: { id: 'Indonesia', en: 'Indonesia' },
      flag: 'https://flagcdn.com/w40/id.png',
      photo: 'assets/bali.webp',
      score: { id: '★ 8.5 / 10 Skor Nomad', en: '★ 8.5 / 10 Nomad Score' },
      cost: '$600 – $1,200 / mo',
      wifi: {
        id: '85+ Mbps · Cepat & stabil di kafe serta coworking Canggu & Ubud',
        en: '85+ Mbps · Super fast in Canggu & Ubud coworking spaces'
      },
      visa: {
        id: 'Mudah (B211A Visit Visa / Remote Worker E33G)',
        en: 'Easy (B211A Visit Visa / Remote Worker E33G)'
      },
      spots: {
        id: 'Kafe spesialis di Canggu, Ubud, Pererenan & Uluwatu',
        en: 'Canggu, Ubud, Pererenan & Uluwatu specialty cafes'
      },
      tip: {
        id: 'Pilih tempat tinggal dekat Batu Bolong biar gampang cafe hopping, dan pastikan vila punya genset cadangan!',
        en: 'Stay near Batu Bolong for easy cafe hops, and choose a villa with verified generator backup for rainy days!'
      }
    },
    tokyo: {
      title: 'Tokyo',
      country: { id: 'Jepang', en: 'Japan' },
      flag: 'https://flagcdn.com/w40/jp.png',
      photo: 'assets/tokyo.webp',
      score: { id: '★ 9.0 / 10 Skor Nomad', en: '★ 9.0 / 10 Nomad Score' },
      cost: '$1,200 – $2,000 / mo',
      wifi: {
        id: '150+ Mbps · Fiber optic super cepat di mana aja',
        en: '150+ Mbps · Ultra high-speed fiber everywhere'
      },
      visa: {
        id: 'Digital Nomad Visa (6 Bulan) atau Bebas Visa / Turis 90 Hari',
        en: 'Digital Nomad Visa (6 Months) or 90-day Tourist'
      },
      spots: {
        id: 'Coworking space di Shibuya, kafe Daikanyama & Kichijoji',
        en: 'Shibuya coworking spaces, Daikanyama & Kichijoji'
      },
      tip: {
        id: 'Kota paling aman dan transportasinya super tenang. Sewa Pocket Wi-Fi dan coba sensasi kerja di kissaten tradisional!',
        en: 'Tokyo’s safety and quiet transport are unmatched. Rent a Pocket Wi-Fi and explore work-friendly kissaten cafes!'
      }
    },
    'new york': {
      title: 'New York',
      country: { id: 'Amerika Serikat', en: 'United States' },
      flag: 'https://flagcdn.com/w40/us.png',
      photo: 'assets/new_york.webp',
      score: { id: '★ 8.5 / 10 Skor Nomad', en: '★ 8.5 / 10 Nomad Score' },
      cost: '$2,500+ / mo',
      wifi: {
        id: '120+ Mbps · Tersedia gratis di coffee shop & perpustakaan kota',
        en: '120+ Mbps · Readily available in coffee shops & libraries'
      },
      visa: {
        id: 'ESTA Visa Waiver atau Visa Turis B1/B2',
        en: 'ESTA Visa Waiver or B1/B2 Visitor Visa'
      },
      spots: {
        id: 'Brooklyn Public Library, kafe di DUMBO & Flatiron',
        en: 'Brooklyn Public Library, DUMBO & Flatiron cafes'
      },
      tip: {
        id: 'Energi kreatifnya luar biasa! Kerja dari kafe di Williamsburg atau DUMBO sambil nikmatin pemandangan skyline Manhattan.',
        en: 'Endless creative energy! Work from coffee shops in Williamsburg or DUMBO for inspiring skyline views.'
      }
    },
    'new zealand': {
      title: 'New Zealand',
      country: { id: 'Selandia Baru', en: 'New Zealand' },
      flag: 'https://flagcdn.com/w40/nz.png',
      photo: 'assets/new_zealand.webp',
      score: { id: '★ 9.0 / 10 Skor Nomad', en: '★ 9.0 / 10 Nomad Score' },
      cost: '$1,200 – $2,000 / mo',
      wifi: {
        id: '100+ Mbps · Jaringan fiber optic cepat nasional',
        en: '100+ Mbps · Fast nationwide fiber network'
      },
      visa: {
        id: 'Working Holiday Visa atau NZeTA Visitor Visa',
        en: 'Working Holiday Visa or NZeTA Visitor Visa'
      },
      spots: {
        id: 'Kafe pinggir Danau Wakatipu di Queenstown & ruang kerja bersama di Auckland',
        en: 'Queenstown lakefront cafes & Auckland shared spaces'
      },
      tip: {
        id: 'Buat pecinta alam: kerja pagi sambil mandang Danau Wakatipu, lalu sorenya hiking santai atau main ski!',
        en: 'If you love nature, work early morning overlooking Lake Wakatipu, then spend afternoons hiking or skiing!'
      }
    }
  };

  const destModalBackdrop = document.getElementById('dest-modal-backdrop');
  function openDestModal(cityKey) {
    const data = destinationData[cityKey];
    if (!data || !destModalBackdrop) return;
    const lang = currentLang === 'en' ? 'en' : 'id';

    document.getElementById('dest-modal-img').src = data.photo;
    document.getElementById('dest-modal-score').textContent = data.score[lang];
    document.getElementById('dest-modal-title').textContent = data.title;
    document.getElementById('dest-modal-flag').src = data.flag;
    document.getElementById('dest-modal-country-name').textContent = data.country[lang];
    document.getElementById('dest-modal-cost').textContent = data.cost;
    document.getElementById('dest-modal-wifi').textContent = data.wifi[lang];
    document.getElementById('dest-modal-visa').textContent = data.visa[lang];
    document.getElementById('dest-modal-spots').textContent = data.spots[lang];
    document.getElementById('dest-modal-tip').textContent = data.tip[lang];

    destModalBackdrop.classList.add('active');
    destModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDestModal() {
    if (!destModalBackdrop) return;
    destModalBackdrop.classList.remove('active');
    destModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  destCards.forEach(function (card) {
    card.addEventListener('click', function () {
      const cityKey = card.getAttribute('data-city');
      if (cityKey) openDestModal(cityKey);
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const cityKey = card.getAttribute('data-city');
        if (cityKey) openDestModal(cityKey);
      }
    });
  });

  document.getElementById('dest-modal-close')?.addEventListener('click', closeDestModal);
  document.getElementById('dest-modal-action-btn')?.addEventListener('click', closeDestModal);
  destModalBackdrop?.addEventListener('click', function (e) {
    if (e.target === destModalBackdrop) closeDestModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && destModalBackdrop?.classList.contains('active')) {
      closeDestModal();
    }
  });

  // ==========================================================================
  // 7. VIDEO REELS PLAYER
  // ==========================================================================
  document.querySelectorAll('.story-card').forEach(function (card) {
    const video = card.querySelector('.story-video');
    const soundHint = card.querySelector('.story-sound-hint');
    if (!video) return;

    card.addEventListener('click', function (e) {
      if (e.target.closest('.ig-badge')) return;
      if (video.paused) {
        document.querySelectorAll('.story-video').forEach(function (other) {
          if (other !== video) {
            other.pause();
            other.muted = true;
            other.closest('.story-card')?.classList.remove('is-playing');
          }
        });

        video.muted = false;
        video
          .play()
          .then(function () {
            card.classList.add('is-playing');
            if (soundHint) soundHint.textContent = '❚❚ Klik untuk jeda';
          })
          .catch(function () {
            video.muted = true;
            video.play();
            card.classList.add('is-playing');
          });
      } else {
        video.pause();
        video.muted = true;
        card.classList.remove('is-playing');
        if (soundHint) soundHint.textContent = '▶ Klik untuk putar dengan suara';
      }
    });

    video.addEventListener('ended', function () {
      video.muted = true;
      card.classList.remove('is-playing');
      if (soundHint) soundHint.textContent = '▶ Klik untuk putar dengan suara';
    });
  });

  // ==========================================================================
  // 8. NEWSLETTER FORM & SCROLL REVEAL
  // ==========================================================================
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMsg = document.getElementById('newsletter-msg');
  newsletterForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    if (newsletterMsg) {
      newsletterMsg.textContent =
        currentLang === 'en'
          ? 'Thank you! Check your inbox for WFA updates & checklist.'
          : 'Terima kasih! Cek emailmu untuk update & checklist WFA terbaru.';
    }
    newsletterForm.reset();
  });

  const cycleFrames = [
    'assets/foto-anggun (1).webp',
    'assets/foto-anggun (2).webp',
    'assets/foto-anggun (3).webp'
  ];
  const cycleImgs = document.querySelectorAll('img[data-sm-cycle]');
  if (cycleImgs.length > 0 && !prefersReducedMotion) {
    let idx = 0;
    setInterval(function () {
      idx = (idx + 1) % cycleFrames.length;
      cycleImgs.forEach((img) => {
        img.src = cycleFrames[idx];
      });
    }, 3200);
  }

  const revealEls = document.querySelectorAll('.reveal-up');
  if (revealEls.length > 0) {
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
      const revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
      );
      revealEls.forEach((el) => revealObserver.observe(el));
    }
  }
});
