/**
 * ANGGUN FEBBY - EDITORIAL STORE & WFA INTERACTION SCRIPT
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
  // 2. TRANSLATIONS (ID <-> EN) - PRESERVING HERO HEADLINE
  // ==========================================================================
  const translations = {
    id: {
      nav_tools: 'Produk Bundle',
      nav_bundle: 'Paket Hemat',
      nav_reviews: 'Testimoni',
      nav_destinations: 'Destinasi',
      nav_journal: 'Travel Journal',
      nav_story: 'Ceritaku',
      nav_socials: 'Media Sosial',
      nav_join: 'Join Komunitas WFA',
      drawer_start: 'Join Komunitas WFA →',

      hero_eyebrow: 'Digital Nomad · WFA Educator · Travel Creator',
      hero_title: 'Work Anywhere.<br><em class="travel-brush">Travel</em> Everywhere.',
      hero_sub: '<strong style="font-size:22px">Hai aku Anggun.</strong> Seorang digital nomad yang kerjanya sambil menjelajahi dunia, berbagi pengalaman dan membimbing orang lain untuk menemukan kebebasan bekerja dari mana saja.',
      hero_cta_primary: 'Jelajahi Peluang WFA',
      hero_cta_secondary: 'Start Coaching',
      hero_scroll: 'Scroll ke bawah',
      proof_1: 'pembeli & komunitas aktif',
      proof_2: 'rating rata-rata panduan',
      proof_3_title: 'Instan',
      proof_3: 'akses digital selamanya',
      ppb_buyer_title: 'Product Buyers',
      ppb_buyer_desc: 'Trusted by thousands of global dreamers.',
      ppb_comm_title: 'Community Members',
      ppb_comm_desc: 'A growing community of WFA enthusiasts.',
      ppb_mentees_title: 'Mentees Guided',
      ppb_mentees_desc: 'Let\'s grow your WFA journey together.',

      path_1_badge: 'Info Lowongan Tiap Minggu',
      path_1_heading: 'WFA Jobs & Peluang Kerja',
      path_1_desc: 'Kurasi lowongan kerja WFA dari berbagai perusahaan global buat kamu yang pengen mulai kerja fleksibel.',
      path_1_btn: 'Cari Info Lowongan',
      path_2_badge: 'Brand Collaboration & Rate Card',
      path_2_heading: 'Collaboration & Rate Card',
      path_2_desc: 'Tertarik kolaborasi campaign, review akomodasi/destinasi, konten kreatif, atau sponsorship? Yuk minta rate card-ku.',
      path_2_btn: 'Mulai Diskusi',
      path_3_badge: 'Belajar WFA',
      path_3_heading: 'Belajar di Sekolah WFA',
      path_3_desc: 'Buat kamu yang mau bimbingan intensif soal skill, mindset, dan langkah nyata transisi jadi pekerja WFA dari nol.',
      path_3_btn: 'Pelajari Sekolah WFA',

      tools_eyebrow: 'PRODUK BUNDLE WFA',
      tools_heading: 'Produk Bundle Pilihan',
      tools_desc: 'Paket lengkap panduan kerja remote, template kreator, AI assistant, dan tools WFA siap pakai untuk mulai berkarya dari mana aja.',
      filter_all: 'Semua Bundle',
      filter_creator: 'Creator',
      filter_wfa: 'Traveller',
      filter_income: 'AI & Manifesting',
      add_to_cart: 'Dapatkan Akses →',

      bundle_eyebrow: 'BIMBINGAN WFA',
      bundle_title: 'Program Bimbingan WFA',
      bundle_lead: 'Pilih kelas online paket terlengkap, mentoring private 1-on-1 via Zoom, atau kelas tatap muka eksklusif bersama tim Sekolah WFA.',
      coaching_btn: 'Daftar Bimbingan →',

      testi_eyebrow: 'KATA MEREKA',
      testi_title: 'Kata Mereka yang Sudah Mencoba',
      testi_sub: 'Cerita nyata dari teman-teman alumni Sekolah WFA yang sekarang bisa kerja dan berpenghasilan dari mana aja.',
      testi_more: 'Lihat Semua Testimoni',
      testi_less: 'Tampilkan Lebih Sedikit',

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
      stories_title: 'Dari Desa Kecil Sampai Bisa Kerja Sambil Keliling Dunia',
      stories_sub: '“Dulu bisa terus sekolah aja udah sebuah perjuangan besar. Sekarang, aku bisa kerja dari mana aja, berkarya jadi content creator, dan menjalani hidup yang dulu cuma berani aku impikan.”',
      stories_follow: 'Mampir ke IG @anggunfebby.s',

      connect_eyebrow: 'MEDIA SOSIAL & KONTEN',
      connect_title: 'Intip Keseharian & Konten Terbaruku',
      connect_sub: 'Di media sosial, aku rutin spill tips kerja WFA, review spot ngopi estetik di berbagai negara, behind the scenes, dan daily vlog perjalanan:',
      connect_ig_desc: 'Tips WFA, Rekomendasi & Dokumentasi Momen',
      connect_ig_btn: 'Follow di Instagram ↗',
      connect_tt_desc: 'Konten Santai, Behind The Scenes & Reality WFA',
      connect_tt_btn: 'Nonton di TikTok ↗',
      connect_yt_desc: 'Travel Vlog & Dokumentasi Keliling Dunia',
      connect_yt_btn: 'Subscribe di YouTube ↗',

      faq_eyebrow: 'FAQ & BANTUAN',
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
      nav_tools: 'Bundles',
      nav_bundle: 'Featured Offer',
      nav_reviews: 'Testimonials',
      nav_destinations: 'Destinations',
      nav_journal: 'Travel Journal',
      nav_story: 'My Story',
      nav_socials: 'Socials',
      nav_join: 'Join Community',
      drawer_start: 'Join WFA Community →',

      hero_eyebrow: 'Digital Nomad · WFA Educator · Travel Creator',
      hero_title: 'Work Anywhere.<br><em class="travel-brush">Travel</em> Everywhere.',
      hero_sub: `<strong style="font-size:22px">Hi i'm Anggun.</strong> A digital nomad building businesses, exploring the world, guiding others, and inspiring them to embrace the freedom of working from anywhere.`,
      hero_cta_primary: 'Explore WFA Opportunities',
      hero_cta_secondary: 'Start Coaching',
      hero_scroll: 'Scroll down',
      proof_1: 'active readers & buyers',
      proof_2: 'average guide rating',
      proof_3_title: 'Instant',
      proof_3: 'lifetime digital access',
      ppb_buyer_title: 'Product Buyers',
      ppb_buyer_desc: 'Trusted by thousands of global dreamers.',
      ppb_comm_title: 'Community Members',
      ppb_comm_desc: 'A growing community of WFA enthusiasts.',
      ppb_mentees_title: 'Mentees Guided',
      ppb_mentees_desc: 'Let\'s grow your WFA journey together.',

      path_1_badge: 'Weekly Global Openings',
      path_1_heading: 'WFA Jobs & Global Roles',
      path_1_desc: 'Handpicked global WFA and remote job openings updated every week for anyone looking to work flexibly.',
      path_1_btn: 'Browse Job Openings',
      path_2_badge: 'Brand Collaboration & Rate Card',
      path_2_heading: 'Collaboration & Rate Card',
      path_2_desc: 'Interested in brand partnerships, campaign content, destination reviews, or sponsorships? Let’s chat and request my rate card.',
      path_2_btn: 'Start Discussion',
      path_3_badge: 'Learn WFA',
      path_3_heading: 'Learn at Sekolah WFA',
      path_3_desc: 'Step-by-step guidance on skills, mindset, and practical transitions to becoming a location-independent worker from scratch.',
      path_3_btn: 'Explore Sekolah WFA',

      tools_eyebrow: 'WFA DIGITAL BUNDLES',
      tools_heading: 'Featured WFA Bundles',
      tools_desc: 'Complete digital product bundles featuring remote-work guides, creator templates, AI assistants, and WFA tools ready to launch your location-independent life.',
      filter_all: 'All Bundles',
      filter_creator: 'Creator',
      filter_wfa: 'Traveller',
      filter_income: 'AI & Manifesting',
      add_to_cart: 'Add to Cart →',

      bundle_eyebrow: 'WFA COACHING',
      bundle_title: 'WFA Coaching Programs',
      bundle_lead: 'Choose from our complete online bundle class, private 1-on-1 Zoom mentoring, or exclusive offline workshops with Sekolah WFA.',
      coaching_btn: 'Join Coaching →',

      testi_eyebrow: 'TESTIMONIALS',
      testi_title: 'What Readers & Nomads Say',
      testi_sub: 'Real stories from Sekolah WFA alumni who now work and earn from anywhere.',
      testi_more: 'See All Testimonials',
      testi_less: 'Show Less',

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
      stories_title: 'From a Small Village to Working While Traveling the World',
      stories_sub: '“Staying in school was once a daily challenge. Today, I can work from anywhere, create digital content, and live the life I once only dreamed about.”',
      stories_follow: 'Visit IG @anggunfebby.s',

      connect_eyebrow: 'SOCIALS & CONTENT',
      connect_title: 'See My Daily Life & Latest Content',
      connect_sub: 'On social media, I share practical WFA tips, aesthetic cafe finds worldwide, behind-the-scenes moments, and travel vlogs:',
      connect_ig_desc: 'WFA Tips, Recommendations & Story Moments',
      connect_ig_btn: 'Follow on Instagram ↗',
      connect_tt_desc: 'Casual Clips, Behind The Scenes & WFA Reality',
      connect_tt_btn: 'Watch on TikTok ↗',
      connect_yt_desc: 'Travel Vlogs & World Travel Documentaries',
      connect_yt_btn: 'Subscribe on YouTube ↗',

      faq_eyebrow: 'FAQ & HELP',
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
  // 3. BUNDLE PRODUCTS DATA (DIRECT REDIRECT TO LYNK.ID)
  // ==========================================================================
  const products = [
    {
      id: 'creator',
      category: 'creator',
      theme: 'c3',
      coverImg: 'assets/collab-done.webp',
      tag: { id: 'Terpopuler', en: 'Most Popular' },
      name: { id: 'Bundle Creator', en: 'Bundle Creator' },
      items: {
        id: [
          'Creator Portfolio Template (Canva)',
          '100+ Video Aesthetic HD (Boleh Dijual)',
          '3.000+ Footage Reels Travel (Boleh Dijual)',
          'Ratusan Ide Produk Digital',
          'Rahasia Ubah Konten Jadi Penghasilan',
          '90 Hari Ide Konten Sosmed',
          'Strategi Reels Viral'
        ],
        en: [
          'Creator Portfolio Template (Canva)',
          '100+ Aesthetic HD Videos (Resellable)',
          '3,000+ Travel Reels Footages (Resellable)',
          'Hundreds of Digital Product Ideas',
          'Secret to Monetizing Content',
          '90-Day Social Media Content Ideas',
          'Viral Reels Strategy'
        ]
      },
      price: 129000,
      oldPrice: 275000,
      url: LYNK_URL
    },
    {
      id: 'traveller',
      category: 'wfa',
      theme: 'c1',
      coverImg: 'assets/bali.webp',
      tag: { id: 'Terlaris', en: 'Best Seller' },
      name: { id: 'Bundle Traveller', en: 'Bundle Traveller' },
      items: {
        id: [
          'Rahasia WFA Keliling Dunia',
          '40+ List Travel Opportunities',
          'TOP 100+ Kerja WFA',
          'Travel & Work Database (111+ Program)'
        ],
        en: [
          'Secrets to Working While Traveling',
          '40+ List of Travel Opportunities',
          'TOP 100+ WFA Opportunities',
          'Travel & Work Database (111+ Programs)'
        ]
      },
      price: 59000,
      oldPrice: 94500,
      url: LYNK_URL
    },
    {
      id: 'ai-assistant',
      category: 'ai',
      theme: 'c2',
      coverImg: 'assets/travel-work-database.png',
      tag: { id: 'AI Tools', en: 'AI Tools' },
      name: { id: 'Bundle AI Assistant', en: 'Bundle AI Assistant' },
      items: {
        id: [
          'Content Auto Pilot (Asisten Ide Konten AI)',
          'F.I.N.A (Asisten Catat Keuangan via WA)'
        ],
        en: [
          'Content Auto Pilot (AI Content Idea Assistant)',
          'F.I.N.A (WhatsApp Finance Tracker Assistant)'
        ]
      },
      price: 99000,
      oldPrice: 134000,
      url: LYNK_URL
    },
    {
      id: 'manifesting',
      category: 'manifesting',
      theme: 'c5',
      coverImg: 'assets/coaching-done.webp',
      tag: { id: 'Favorit', en: 'Favorite' },
      name: { id: 'Manifesting Jalur Langit', en: 'Manifesting Jalur Langit' },
      items: {
        id: [
          'Proposal Rahasia Jalur Langit',
          'Habit Tracker Full Version (Mood, Tidur, Minum)',
          'Project Challenge 40 Hari Kerja WFA',
          'Habit Tracker Jalur Langit Full Version'
        ],
        en: [
          'Proposal Rahasia Jalur Langit',
          'Habit Tracker Full Version (Mood, Sleep, Hydration)',
          '40-Day WFA Work Challenge Project',
          'Habit Tracker Jalur Langit Full Version'
        ]
      },
      price: 89000,
      oldPrice: 158200,
      url: LYNK_URL
    }
  ];

  let activeProductFilter = 'all';
  const productsGrid = document.getElementById('products-grid');

  function renderProducts(filterKey) {
    if (!productsGrid) return;
    activeProductFilter = filterKey || activeProductFilter;
    const lang = currentLang === 'en' ? 'en' : 'id';
    const ctaLabel = translations[lang].add_to_cart;

    const visible = products.filter((item) => {
      if (activeProductFilter === 'all') return true;
      if (activeProductFilter === 'ai-manifesting') {
        return item.category === 'ai' || item.category === 'manifesting';
      }
      return item.category === activeProductFilter;
    });

    productsGrid.innerHTML = visible
      .map((item) => {
        const tag = item.tag[lang];
        const title = item.name[lang];
        const highlights = item.items[lang].slice(0, 3).map((line) => `<span class="prod-pill">✦ ${escapeHtml(line)}</span>`).join('');
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
            <div class="product-card-body">
              <h3 class="product-card-title">${title}</h3>
              <div class="product-highlights">${highlights}</div>
              <div class="product-price-row">
                <span class="price-current">${rp(item.price)}</span>
                <s class="price-old">${rp(item.oldPrice)}</s>
              </div>
              <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn btn-full btn-product-buy">
                <span>${ctaLabel}</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
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
  // 4. TESTIMONIALS (ALUMNI SEKOLAH WFA)
  // ==========================================================================
  const TESTIMONIALS = [
    {
      id: 1,
      name: 'Ibun Aif',
      handle: '@aifarifah',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-aif.webp',
      text: 'Duh gimana ya, seneng banget rasanya. Dulu tuh aku cuma bisa bikin konten, tapi gak ngerti gimana cara monetize dengan bener. Nah Sekolah WFA ini ngajarin semua hal itu, dari strategi, eksekusi, sampe cara dapetin penghasilan dari mana aja. Dan yang paling aku suka, mereka ngajarin dengan cara yang fun, gak boring. Mentor-mentornya juga asik, bisa diajak diskusi kapan aja. Pokoknya materinya daging semua deh!'
    },
    {
      id: 2,
      name: 'Kadafi Devayana',
      handle: '@kadafidevayana',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-kadafi.webp',
      text: 'Sebagai seseorang yang udah berkecimpung di dunia personal branding cukup lama, aku bisa bilang Sekolah WFA punya kurikulum yang terstruktur. Mereka ngerti betul ekosistem digital yang sebenarnya. Bukan janji-janji muluk yang ngga masuk akal. Approach-nya strategic, actionable, dan yang paling penting, proven! Aku personally recommend untuk profesional yang ingin serius di bidang digital.'
    },
    {
      id: 3,
      name: 'Asran Shady',
      handle: '@gashady',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-asran.webp',
      text: 'Sebagai orang yang pekerjaannya mobile, saya butuh skill yang bisa mendukung fleksibilitas itu. Sekolah WFA memberikan perspektif baru tentang bagaimana saya bisa diversifikasi pekerjaan tanpa meninggalkan passion saya di dunia jurnalistik. Kurikulumnya applicable, dan saya bisa langsung praktek. Kalau ditanya worth it atau tidak, jawabannya absolutely worth it.'
    },
    {
      id: 4,
      name: 'Clara',
      handle: '@ceritadigitalclara',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-clara.webp',
      text: 'Guys, jujur sebenernya aku tuh udah mulai nyemplung, tapi sempet stuck dan ragu banget buat lanjut karena ngerasa super newbie di dunia digital. Tapi untungnya setelah belajar di Sekolah WFA, akar permasalahanku bener-bener dibedah tuntas! Akhirnya aku bisa lepas dari mental block, dan sekarang malah jadi makin pede buat action. Ternyata kuncinya bukan cuma di skill, tapi di pola pikir yang bener. Thanks banget ilmunya!'
    },
    {
      id: 5,
      name: 'Amanda Mindiw',
      handle: '@amanddanf',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-mindiw.webp',
      text: 'Okay so. Aku kan udah kerja di beberapa agency, handle brand-brand gede juga. Kirain udah expert lah ya. Tapi pas ikut Sekolah WFA, Aku nyadar masih banyak yang bisa di-improve. Mereka tuh ngasih framework yang bikin kerjaan aku jauh lebih efisien. Plus, sekarang aku udah gak perlu stuck di kantor. Bisa kerja dari coffee shop, dari rumah, bahkan dari luar kota. Best decision ever sih ini.'
    },
    {
      id: 6,
      name: 'Dimas Ramadhan',
      handle: '@dimasramadhan',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-dimas.webp',
      text: 'Jadi ceritanya gue kan udah lama banget jadi travel creator ya. Kira-kira udah ngerti semua lah. Eh pas ikut Sekolah WFA, ternyata banyak banget yang masih missing. Especially soal sistemnya. Mereka ngajarin hal-hal yang gak pernah kepikiran sama gue sebelumnya. Dan yang gue suka, kak Anggun itu humble, gak sok tau. Pokoknya recommended deh kalau lo serius.'
    },
    {
      id: 7,
      name: 'Mia Aulia',
      handle: '@miaauliaa.p',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-mia.webp',
      text: 'Komunitasnya aktif banget. Gak cuma belajar materinya doang, tapi juga bisa networking sama temen-temen se-visi dari berbagai macam background berbeda-beda yang kerjanya WFA, jadi ngebuka peluang kolaborasi yang aku butuhin banget selama ini.'
    },
    {
      id: 8,
      name: 'Fuad Rizal',
      handle: '@fuadekspor',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-fuad.webp',
      text: 'Kak, saya jujur ya. Awalnya mikir, lah ini kok kayak kursus-kursus online pada umumnya. Tapi ternyata beda jauh. Mereka tuh detail banget ngajarinnya, dan bisa disesuaikan sama industri kita. Saya kan di bidang ekspor, tradisional banget. Eh mereka bisa breakdown gimana cara digitalisasinya. Mantap pokoknya. Sekarang kerjaan saya jauh lebih ringan, bisnis makin lancar.'
    },
    {
      id: 9,
      name: 'Hana Puji',
      handle: '@hana.ph',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-hana.webp',
      text: "Gue tuh dari dulu pengen banget bisa kerja sambil traveling gitu kan. Nah, Sekolah WFA ini jawaban banget sih buat mimpi gue. Mereka ngajarin everything you need to know dari nol sampai bisa profit. Dan gak cuma ngajarin doang, tapi juga kasih insight tentang lifestyle-nya gimana. Now I'm living in Istanbul, working with clients from Indonesia, dan hidup gue so much better. Literally living the dream!"
    },
    {
      id: 10,
      name: 'Raden Anggie',
      handle: '@radengie',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-anggie.webp',
      text: 'Awalnya sih agak ragu ya, namanya juga modal nekat, apalagi sebelumnya aku pernah ikut kelas gini zonkk banget! Tapi pas udah masuk, wahhh ternyata beneran berkualitas. Sistemnya rapi, step by step jelas. Dan yang bikin kaget, dalam waktu sebulan aja aku udah dapet 10 juta pertama ku! Gak nyangka secepatnya itu. Sekarang income aku lebih stabil, dan yang paling penting, aku happy karena bisa atur waktu sendiri. Thank God mempertemukan ku dengan Sekolah WFA!'
    },
    {
      id: 11,
      name: 'Sherly Fanny',
      handle: '@fannykondoh',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-fanny.webp',
      text: 'Pas gue lagi masa-masa berat dulu, gue sadar banget pentingnya punya kerjaan yang fleksibel. Dan WFA ini literally ngasih semua yang gue butuhin. Dari mulai skill sampai support system-nya. Gue nangis beberapa kali lho waktu belajar, bukan karena susah, tapi karena grateful aja akhirnya nemu tempat yang bener-bener understand our needs as digital workers.'
    },
    {
      id: 12,
      name: 'David Lo',
      handle: '@davidlo.fit',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-david.webp',
      text: "Gue udah coba berbagai course online, tapi Sekolah WFA beda level sih. Mereka tuh praktis banget, langsung to the point. Gak pake basa-basi teori yang bikin ngantuk. Sekarang gue bisa dapetin income dari mana aja, meanwhile gue lagi workout di gym manapun yang gue mau. Life's good, man."
    },
    {
      id: 13,
      name: 'Uci Afterhours',
      handle: '@digital.afterhours',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-suci.webp',
      text: 'Hai semuanya! Jadi aku tuh passionate banget soal empower perempuan di bidang digital. Dan Sekolah WFA ini align banget sama misi aku. Yang bikin seneng, mereka tuh gak elitist. Bahasa yang dipakai juga gampang dipahami, cocok banget buat pemula. Aku udah ajak temen-temen di komunitas aku, dan mereka pada excited semua. Thankful banget nemu tempat belajar yang supportive kayak gini!'
    },
    {
      id: 14,
      name: 'Yetti Oktarina',
      handle: '@rinaprana',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-yetti.webp',
      text: 'Permisi ya, mau sharing dikit. Aku dari Lubuklinggau, kadang suka insecure juga sih karena jauh dari kota besar. Tapi sejak ikut Sekolah WFA, mindset aku berubah total. Ternyata lokasi tuh bukan penghalang. Materinya lengkap, bisa diakses kapan aja, dan mentor-mentornya baik-baik banget mau jawab pertanyaan. Sekarang aku udah berani ambil project dari klien luar daerah. Alhamdulillah banget deh pokoknya!'
    }
  ];

  const TESTI_INITIAL_COUNT = 6;
  let testiExpanded = false;
  const testiGrid = document.getElementById('testi-grid');
  const testiToggle = document.getElementById('testi-toggle');

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  const TOP_TESTI_IDS = [3, 2, 1]; // 3 most convincing: Asran Shady (Journalist/Mobile), Kadafi Devayana (Strategist), Ibun Aif (Creator)
  
  function renderTestimonials() {
    if (!testiGrid) return;
    const topThree = TOP_TESTI_IDS.map((id) => TESTIMONIALS.find((t) => t.id === id)).filter(Boolean);
    testiGrid.innerHTML = topThree.map((t) => {
      const initial = escapeHtml(t.name.charAt(0).toUpperCase());
      return `
        <figure class="testi-card">
          <div class="testi-card-head">
            <div class="stars" aria-label="5 bintang">★★★★★</div>
            <span class="testi-verified-pill">Alumni Terverifikasi</span>
          </div>
          <p class="testi-quote">“${escapeHtml(t.text)}”</p>
          <figcaption class="testi-person">
            <img class="testi-avatar" src="${t.avatar}" alt="${escapeHtml(t.name)}" loading="lazy" width="48" height="48"
              data-initial="${initial}">
            <div class="testi-meta">
              <strong class="testi-name">${escapeHtml(t.name)}</strong>
              <span class="testi-handle">${escapeHtml(t.handle)}</span>
            </div>
          </figcaption>
        </figure>
      `;
    }).join('');

    // Fallback to an initial badge if an avatar fails to load
    testiGrid.querySelectorAll('.testi-avatar').forEach((img) => {
      img.addEventListener('error', function () {
        const badge = document.createElement('span');
        badge.className = 'testi-avatar-fallback';
        badge.textContent = img.dataset.initial || '';
        img.replaceWith(badge);
      }, { once: true });
    });

    if (testiToggle && testiToggle.parentElement) {
      testiToggle.parentElement.style.display = 'none'; // Unclutter homepage as requested
    }
  }

  testiToggle?.addEventListener('click', function () {
    testiExpanded = !testiExpanded;
    renderTestimonials();
    if (!testiExpanded) {
      document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // ==========================================================================
  // 5. APPLY LANGUAGE & BIND SWITCHER
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
    renderTestimonials();
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
  const siteHeader = document.querySelector('.site-header');

  function onScrollUpdate() {
    const scrollY = window.scrollY || 0;
    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', scrollY > 20);
    }
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
      cost: '$600 - $1,200 / mo',
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
      cost: '$1,200 - $2,000 / mo',
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
      cost: '$1,200 - $2,000 / mo',
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
