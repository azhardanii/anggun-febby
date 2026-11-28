/**
 * ANGGUN FEBBY - EDITORIAL STORE dan WFA INTERACTION SCRIPT
 * - Bilingual Switcher (ID <-> EN)
 * - Responsive Hero Video
 * - Product Grid dan Bundle Grid (Direct Redirect to Lynk.id)
 * - Destination Filter, Search dan Quick Guide Modal
 * - Video Reels Player, Mobile Drawer dan Scroll Reveal
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
      nav_tools: 'WFA Tools',
      nav_bundle: 'Coaching',
      nav_reviews: 'Cerita Nyata Dari Mereka',
      nav_destinations: 'Trip',
      nav_journal: 'Travel Journal',
      nav_story: 'Ceritaku',
      nav_socials: 'Media Sosial',
      nav_faq: 'FAQ dan Bantuan',
      nav_join: 'Join Komunitas WFA',
      drawer_start: 'Join Komunitas WFA →',
      story_play: '▶ Putar',

      pathways_title: 'Mulai dari Sini',
      pathways_sub: 'Pilih langkah pertama yang paling sesuai dengan tujuanmu untuk mulai kerja fleksibel dan keliling dunia.',
      free_badge: '🎁 Gratis · Bayar Suka-Suka',
      free_title: 'Mengenal WFA dari <span>Product Digital</span> with Lynk',
      free_desc: 'Baru mau mulai membangun penghasilan dari produk digital agar bisa kerja fleksibel dari mana saja? Mulai langkah pertamamu lewat panduan pengantar ini dengan sistem <strong>bayar suka-suka (mulai dari Rp 0)</strong>.',
      free_pt_1: 'Pengenalan ekosistem WFA dan peluang product digital',
      free_pt_2: 'Cara kerja praktis membangun aset digital di Lynk',
      free_pt_3: 'Akses langsung tanpa minimum harga, bayar seikhlasnya',
      free_btn: 'Dapatkan Aksesnya',
      free_price: 'Rp 0 / Suka-Suka',
      free_note: 'Akses instan via Lynk.id',

      remote_pill: 'Remote Work dan Opportunities',
      remote_title: 'Temukan Peluang Kerja di Seluruh Dunia',
      remote_desc: 'Akses database lowongan, program, dan tools untuk bekerja dari mana saja.',
      remote_card_4: 'Work dan Travel Dashboard',

      toolkit_eyebrow: 'DIGITAL TOOLKIT dan TEMPLATES',
      toolkit_title: 'WFA Tools dan Template Siap Pakai',
      toolkit_desc: 'Pilih template, database, asisten AI, hingga habit tracker pilihan yang paling kamu butuhkan untuk mempercepat langkah kerja remote-mu.',

      hero_eyebrow: 'Digital Nomad · WFA Educator · Travel Creator',
      hero_title: 'Work Anywhere.<br><em class="travel-brush">Travel</em> Everywhere.',
      hero_sub: '<strong style="font-size:22px">Hai aku Anggun.</strong> Digital nomad yang <strong>kerjanya sambil keliling dunia</strong>. Aku bantu kamu membangun <strong>penghasilan</strong> dari dunia digital dan menemukan opportunity dari luar negeri, supaya kamu bebas traveling dan <strong>kerja dari mana saja</strong>.',
      hero_cta_primary: 'Jelajahi Peluang WFA',
      hero_cta_secondary: 'Mulai Coaching',
      hero_scroll: 'Scroll ke bawah',
      proof_1: 'pembeli dan komunitas aktif',
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
      path_1_heading: 'Cari Kerja Remote Lokal',
      path_1_desc: 'Kurasi info lowongan kerja remote dan WFA dari berbagai perusahaan lokal untuk kamu yang ingin kerja fleksibel.',
      path_1_btn: 'Cari Info Lowongan',
      path_2_badge: 'TOP 100+ Kerja WFA',
      path_2_heading: 'Cari Kerja Remote Internasional',
      path_2_desc: 'Daftar kurasi TOP 100+ peluang kerja remote dan bisnis global di berbagai negara buat kamu yang siap go-international.',
      path_2_btn: 'Dapatkan Daftar Kerja',
      path_3_badge: 'Travel dan Work Database',
      path_3_heading: 'Peluang Kerja Remote Sambil Travelling',
      path_3_desc: 'Database 111+ program di 35 negara: paid trip, free hotel stay, UGC, hingga remote work untuk kerja sambil keliling dunia.',
      path_3_btn: 'Lihat Database Peluang',

      tools_eyebrow: 'PRODUK BUNDLE WFA',
      tools_heading: 'Produk Bundle Pilihan',
      tools_desc: 'Paket lengkap panduan kerja remote, template kreator, AI assistant, dan tools WFA siap pakai untuk mulai berkarya dari mana aja.',
      filter_all: 'Semua Bundle',
      filter_creator: 'Creator',
      filter_wfa: 'Traveller',
      filter_income: 'AI dan Manifesting',
      add_to_cart: 'Dapatkan Akses →',

      bundle_eyebrow: 'COACHING WFA',
      bundle_title: 'Program Coaching WFA',
      bundle_lead: 'Pilih kelas online paket terlengkap, mentoring private 1-on-1 via Zoom, atau kelas tatap muka eksklusif bersama tim Sekolah WFA.',
      coaching_btn: 'Daftar Coaching →',

      testi_eyebrow: 'KATA MEREKA',
      testi_stat: '★ 4.9/5 dari 1.000+ Alumni',
      testi_title: 'Cerita Nyata Dari Mereka',
      testi_sub: 'Cerita nyata dari teman-teman alumni Sekolah WFA yang sekarang bisa kerja dan berpenghasilan dari mana aja.',
      testi_filter_all: 'Semua Cerita (14)',
      testi_filter_nomad: '✈️ Nomad dan Traveling (5)',
      testi_filter_creator: '💼 Creator dan Bisnis (4)',
      testi_filter_beginner: '🌱 Pemula dan Transisi (5)',
      testi_more: 'Lihat Semua Testimoni',
      testi_less: 'Tampilkan Lebih Sedikit',

      travel_lead: 'Jelajahi dunia, temukan pengalaman baru, dan ciptakan cerita seru <strong>bersama komunitas travelers</strong> yang punya visi yang sama.',
      trips_title: 'Trip Selanjutnya',
      trips_sub: 'Siap untuk petualangan berikutnya? Yuk, jalan bareng!',
      travel_banner_desc: 'Bergabung dengan komunitas kami untuk mendapatkan update trip, tips traveling, dan inspirasi perjalanan lainnya.',

      comm_eyebrow: 'KOMUNITAS PEKERJA WFA',
      comm_title: 'Kerja Dari Mana Aja Lebih Seru Kalau Barengan.',
      comm_sub: 'Nggak perlu ngerasa sendirian. Di sini kita saling kenal, sharing tips hidup WFA, saling semangatin, sampai janjian coworking bareng.',

      collab_badge: '💼 BRAND COLLABORATION dan RATE CARD',
      collab_title: 'Open Collaboration dan Rate Card',
      collab_desc: 'Tertarik kolaborasi campaign, review akomodasi/destinasi, konten kreatif, atau sponsorship? Yuk minta rate card-ku.',
      collab_btn: 'Mulai Diskusi',

      dest_eyebrow: 'CATATAN PERJALANAN',
      dest_title: 'Mau Buka Laptop di<br><em>Mana Hari Ini?</em>',
      dest_sub: 'Kumpulan kota dan negara yang pernah aku singgahi buat kerja remote. Ada info WiFi kafe, kisaran biaya hidup, sampai urusan visa.',
      dest_search_placeholder: 'Cari negara, kota, atau kafe ramah nomad...',
      dest_popular_label: 'Populer:',
      dest_chip_all: 'Semua Destinasi',
      dest_wifi_label: 'Wi-Fi dan Karakter',
      dest_bali_blurb: 'Surga tropis kreator. Kafe di antara persawahan Ubud hingga beach club Canggu, perpaduan seimbang antara ritme kerja dan alam.',
      dest_bali_cost: '$600 - $1.200 / bln',
      dest_bali_btn: 'Buka Field Guide Bali',
      dest_tokyo_blurb: 'Megacity paling efisien di dunia. Internet fiber 150+ Mbps di setiap sudut, kafe ramah laptop hingga larut malam di Shibuya dan Daikanyama.',
      dest_tokyo_cost: '$1.200 - $2.000 / bln',
      dest_tokyo_wifi: '150+ Mbps · Safe dan Focused',
      dest_tokyo_btn: 'Buka Field Guide Tokyo',
      dest_ny_blurb: 'Ritme cepat dan denyut energi global. Ruang kerja kreatif industrial di Brooklyn dan akses networking brand internasional tanpa batas.',
      dest_ny_cost: '$2.500+ / bln',
      dest_ny_btn: 'Buka Field Guide NYC',
      dest_nz_blurb: 'Bekerja dikelilingi pegunungan salju dan danau alpine Queenstown. Destinasi impian untuk deep work dan mindful remote living sejati.',
      dest_nz_cost: '$1.200 - $2.000 / bln',
      dest_nz_btn: 'Buka Field Guide NZ',
      dest_bridge_title: 'Mau rekomendasi kafe atau kota lainnya?',
      dest_bridge_desc: 'Aku sering sharing spot kerja tersembunyi, update visa nomad, dan suasana kafe baru di grup WhatsApp.',
      dest_bridge_btn: 'Ngobrol di Komunitas →',

      stories_eyebrow: 'CERITA DI BALIK LAYAR',
      stories_title: 'Dari Desa<br>Bisa Kerja Sambil<br>Keliling Dunia',
      stories_sub: 'Dulu, aku hanyalah anak desa yang harus berjuang lewat beasiswa demi bisa sekolah. Kini, aku bisa berkarya sebagai content creator, mendapat passive income dari produk digital, bekerja dengan klien lokal hingga internasional, dan bebas kerja dari mana saja sambil keliling dunia.',
      stories_follow: 'Cerita Selengkapnya',

      connect_eyebrow: 'MEDIA SOSIAL dan KONTEN',
      connect_title: 'Intip Keseharian dan Konten Terbaruku',
      connect_sub: 'Di media sosial, aku rutin spill tips kerja WFA, review spot ngopi estetik di berbagai negara, behind the scenes, dan daily vlog perjalanan:',
      connect_ig_desc: 'Tips WFA, Rekomendasi dan Dokumentasi Momen',
      connect_ig_btn: 'Follow di Instagram ↗',
      connect_tt_desc: 'Konten Santai, Behind The Scenes dan Reality WFA',
      connect_tt_btn: 'Nonton di TikTok ↗',
      connect_yt_desc: 'Travel Vlog dan Dokumentasi Keliling Dunia',
      connect_yt_btn: 'Subscribe di YouTube ↗',

      faq_eyebrow: 'FAQ dan BANTUAN',
      faq_title: 'Pertanyaan Umum',
      faq_sub: 'Semua hal penting seputar akses produk, bimbingan, dan cara kolaborasi bersama Anggun.',
      faq_1_q: 'Produknya dikirim dalam bentuk apa?',
      faq_1_a: 'Semua panduan dan WFA tools tersedia dalam format digital (PDF, Notion template, spreadsheet) di Lynk.id. Link akses langsung aktif setelah pembayaran.',
      faq_2_q: 'Apakah akses materinya berlaku selamanya?',
      faq_2_a: 'Ya! Sekali akses, kamu bisa membuka dan mengunduh ulang kapan pun serta mendapat pembaruan materi gratis.',
      faq_3_q: 'Bagaimana cara berkolaborasi atau meminta rate card?',
      faq_3_a: 'Kamu bisa chat langsung via WhatsApp atau DM Instagram @anggunfebby.s untuk campaign brand, review destinasi, atau sponsorship.',
      faq_4_q: 'Bagaimana kalau aku masih bingung mulai dari mana?',
      faq_4_a: 'Kamu bisa gabung komunitas WFA gratis terlebih dulu atau langsung chat tim lewat WhatsApp untuk arahan produk yang paling sesuai.',

      news_badge: '✦ KOMUNITAS dan TIPS EKSKLUSIF',
      news_title: 'Tips WFA dan Kolaborasi Langsung ke Emailmu',
      news_sub: 'Gabung komunitas dan dapatkan info lowongan kerja remote serta checklist WFA gratis.',
      newsletter_placeholder: 'Alamat email kamu',
      newsletter_btn: 'Gabung Gratis',
      back_to_top: 'Kembali ke atas ↑',

      floating_full: 'Komunitas WFA 💬',
      floating_short: 'Join',
      modal_btn: 'Lihat WFA Tools Buat Traveling'
    },
    en: {
      nav_tools: 'WFA Tools',
      nav_bundle: 'Coaching',
      nav_reviews: 'Testimonials',
      nav_destinations: 'Trip',
      nav_journal: 'Travel Journal',
      nav_story: 'My Story',
      nav_socials: 'Socials',
      nav_faq: 'FAQ and Help',
      nav_join: 'Join Community',
      drawer_start: 'Join WFA Community →',

      hero_eyebrow: 'Digital Nomad · WFA Educator · Travel Creator',
      hero_title: 'Work Anywhere.<br><em class="travel-brush">Travel</em> Everywhere.',
      hero_sub: `<strong style="font-size:22px">Hi I'm Anggun.</strong> A digital nomad <strong>working from anywhere</strong>. I help you build <strong>income</strong> in the digital space and discover overseas opportunities, so you are free to travel and <strong>work from anywhere</strong>.`,
      hero_cta_primary: 'Explore WFA Opportunities',
      hero_cta_secondary: 'Start Coaching',
      hero_scroll: 'Scroll down',
      proof_1: 'active readers and buyers',
      proof_2: 'average guide rating',
      proof_3_title: 'Instant',
      proof_3: 'lifetime digital access',
      ppb_buyer_title: 'Product Buyers',
      ppb_buyer_desc: 'Trusted by thousands of global dreamers.',
      ppb_comm_title: 'Community Members',
      ppb_comm_desc: 'A growing community of WFA enthusiasts.',
      ppb_mentees_title: 'Mentees Guided',
      ppb_mentees_desc: 'Let\'s grow your WFA journey together.',
      story_play: '▶ Play',

      pathways_title: 'Start Here',
      pathways_sub: 'Choose the first step that best fits your goal to start working flexibly and traveling the world.',
      path_1_badge: 'Weekly Local Openings',
      path_1_heading: 'Find Local Remote Jobs',
      path_1_desc: 'Curated local remote and WFA job openings updated weekly for anyone starting a flexible career.',
      path_1_btn: 'Browse Job Openings',
      path_2_badge: 'TOP 100+ Global WFA',
      path_2_heading: 'Find International Remote Jobs',
      path_2_desc: 'Curated list of TOP 100+ global remote work and business opportunities across countries.',
      path_2_btn: 'Get Job List',
      path_3_badge: 'Travel and Work Database',
      path_3_heading: 'Remote Work While Traveling',
      path_3_desc: 'Database of 111+ programs across 35 countries: paid trips, free hotel stays, UGC, and remote work.',
      path_3_btn: 'Explore Database',

      free_badge: '🎁 Free · Pay What You Want',
      free_title: 'Getting Started with WFA via <span>Digital Products</span> on Lynk',
      free_desc: 'Ready to start building digital product income so you can work flexibly from anywhere? Take your first step with this starter guide on a <strong>pay-what-you-want basis (starting from Rp 0)</strong>.',
      free_pt_1: 'Introduction to the WFA ecosystem and digital product opportunities',
      free_pt_2: 'Practical workflow to build your digital assets on Lynk',
      free_pt_3: 'Instant access with no minimum price, pay what feels right',
      free_btn: 'Get Instant Access',
      free_price: 'Rp 0 / Pay What You Want',
      free_note: 'Instant access via Lynk.id',

      remote_pill: 'Remote Work and Opportunities',
      remote_title: 'Discover Work Opportunities Worldwide',
      remote_desc: 'Access a curated database of remote jobs, global programs, and tools to work from anywhere.',
      remote_card_4: 'Work and Travel Dashboard',

      toolkit_eyebrow: 'DIGITAL TOOLKIT and TEMPLATES',
      toolkit_title: 'Ready-to-Use WFA Tools and Templates',
      toolkit_desc: 'Pick the templates, databases, AI assistants, or habit trackers you need most to accelerate your remote work journey.',

      tools_eyebrow: 'WFA DIGITAL BUNDLES',
      tools_heading: 'Featured WFA Bundles',
      tools_desc: 'Complete digital product bundles featuring remote-work guides, creator templates, AI assistants, and WFA tools ready to launch your location-independent life.',
      filter_all: 'All Bundles',
      filter_creator: 'Creator',
      filter_wfa: 'Traveller',
      filter_income: 'AI and Manifesting',
      add_to_cart: 'Get Access →',

      bundle_eyebrow: 'WFA COACHING',
      bundle_title: 'WFA Coaching Programs',
      bundle_lead: 'Choose from our complete online bundle class, private 1-on-1 Zoom mentoring, or exclusive offline workshops with Sekolah WFA.',
      coaching_btn: 'Join Coaching →',

      testi_eyebrow: 'TESTIMONIALS',
      testi_stat: '★ 4.9/5 from 1,000+ Alumni',
      testi_title: 'Real Stories From Them',
      testi_sub: 'Real stories from Sekolah WFA alumni who now work and earn from anywhere.',
      testi_filter_all: 'All Stories (14)',
      testi_filter_nomad: '✈️ Nomad and Traveling (5)',
      testi_filter_creator: '💼 Creator and Business (4)',
      testi_filter_beginner: '🌱 Beginners and Transitions (5)',
      testi_more: 'See More Testimonials (+11 Stories)',
      testi_less: 'Show Top 3 Featured Stories',

      travel_lead: 'Explore the world, discover new experiences, and create unforgettable stories <strong>with a community of like-minded travelers</strong>.',
      trips_title: 'Upcoming Trips',
      trips_sub: 'Ready for your next adventure? Let\'s travel together!',
      travel_banner_desc: 'Join our community to get trip updates, travel tips, and inspiration for your next journey.',

      comm_eyebrow: 'GLOBAL WFA COMMUNITY',
      comm_title: 'Working From Anywhere Is Better Together.',
      comm_sub: 'You don’t have to build your WFA journey alone. Connect with fellow travelers, share WFA lifestyle tips, and co-work together.',

      collab_badge: '💼 BRAND COLLABORATION and RATE CARD',
      collab_title: 'Open Collaboration and Rate Card',
      collab_desc: 'Interested in brand campaigns, accommodation or destination reviews, creative content, or sponsorships? Request my rate card.',
      collab_btn: 'Start a Conversation',

      dest_eyebrow: 'TRAVEL LOGS',
      dest_title: 'Where Do You Want<br><em>to Work Today?</em>',
      dest_sub: 'Notes from cities and countries I’ve worked from around the world. Cafe Wi-Fi speeds, living costs, work vibes, and visa tips.',
      dest_search_placeholder: 'Search country, city, or nomad cafe...',
      dest_popular_label: 'Popular:',
      dest_chip_all: 'All Destinations',
      dest_wifi_label: 'Wi-Fi and Vibe',
      dest_bali_blurb: 'A creator’s tropical paradise. From rice-field cafes in Ubud to beach clubs in Canggu, balancing focused work with island nature.',
      dest_bali_cost: '$600 - $1,200 / mo',
      dest_bali_btn: 'Open Bali Field Guide',
      dest_tokyo_blurb: 'The world’s most efficient megacity. 150+ Mbps fiber internet everywhere and laptop-friendly cafes in Shibuya and Daikanyama.',
      dest_tokyo_cost: '$1,200 - $2,000 / mo',
      dest_tokyo_wifi: '150+ Mbps · Safe and Focused',
      dest_tokyo_btn: 'Open Tokyo Field Guide',
      dest_ny_blurb: 'Fast-paced global energy. Industrial creative workspaces in Brooklyn and limitless international brand networking.',
      dest_ny_cost: '$2,500+ / mo',
      dest_ny_btn: 'Open NYC Field Guide',
      dest_nz_blurb: 'Work surrounded by snow-capped peaks and Queenstown’s alpine lakes. A dream destination for deep work and mindful remote living.',
      dest_nz_cost: '$1,200 - $2,000 / mo',
      dest_nz_btn: 'Open NZ Field Guide',
      dest_bridge_title: 'Looking for recommendations in other cities?',
      dest_bridge_desc: 'I regularly share hidden work spots, cafe reviews, and visa tips in our WhatsApp group.',
      dest_bridge_btn: 'Chat in the Community →',

      stories_eyebrow: 'BEHIND THE SCENES',
      stories_title: 'From a Village<br>Working While<br>Traveling the World',
      stories_sub: 'I used to be a village kid fighting through scholarships just to stay in school. Today, I create content, earn passive income from digital products, work with local and international clients, and enjoy the freedom to work from anywhere while traveling the world.',
      stories_follow: 'Read Full Story',

      connect_eyebrow: 'SOCIALS and CONTENT',
      connect_title: 'See My Daily Life and Latest Content',
      connect_sub: 'On social media, I share practical WFA tips, aesthetic cafe finds worldwide, behind-the-scenes moments, and travel vlogs:',
      connect_ig_desc: 'WFA Tips, Recommendations and Story Moments',
      connect_ig_btn: 'Follow on Instagram ↗',
      connect_tt_desc: 'Casual Clips, Behind The Scenes and WFA Reality',
      connect_tt_btn: 'Watch on TikTok ↗',
      connect_yt_desc: 'Travel Vlogs and World Travel Documentaries',
      connect_yt_btn: 'Subscribe on YouTube ↗',

      faq_eyebrow: 'FAQ and HELP',
      faq_title: 'Frequently Asked Questions',
      faq_sub: 'Everything you need to know about product access, coaching, and collaborating with Anggun.',
      faq_1_q: 'How are the digital products delivered?',
      faq_1_a: 'All guides and tools are digital files (PDFs, Notion templates, spreadsheets) via Lynk.id with instant download access right after checkout.',
      faq_2_q: 'Do I get lifetime access?',
      faq_2_a: 'Yes! Once unlocked, you can re-download anytime and receive free ongoing material updates.',
      faq_3_q: 'How can brands collaborate or request a rate card?',
      faq_3_a: 'You can reach out directly via WhatsApp or Instagram DM @anggunfebby.s for campaigns, destination reviews, or sponsorships.',
      faq_4_q: 'What if I’m unsure where to begin?',
      faq_4_a: 'Join the free WFA community first or chat via WhatsApp for recommendations on the best starting kit.',

      news_badge: '✦ EXCLUSIVE COMMUNITY and TIPS',
      news_title: 'WFA Tips and Updates Straight to Your Inbox',
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
      coverImg: 'assets/bundle-creator.png',
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
      coverImg: 'assets/bundle-traveller.png',
      tag: { id: 'Terlaris', en: 'Best Seller' },
      name: { id: 'Bundle Traveller', en: 'Bundle Traveller' },
      items: {
        id: [
          'Rahasia WFA Keliling Dunia',
          '40+ List Travel Opportunities',
          'TOP 100+ Kerja WFA',
          'Travel dan Work Database (111+ Program)'
        ],
        en: [
          'Secrets to Working While Traveling',
          '40+ List of Travel Opportunities',
          'TOP 100+ WFA Opportunities',
          'Travel and Work Database (111+ Programs)'
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
      coverImg: 'assets/bundle-ai.png',
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
      coverImg: 'assets/bundle-jalur-langit.png',
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

  const TOOLKIT_ITEMS = [
    {
      title: '✈️ Creator Portfolio Template',
      subtitle: {
        id: 'Template portofolio profesional siap pakai untuk kreator dan freelancer.',
        en: 'Ready-to-use professional portfolio template for creators and freelancers.'
      },
      badge: 'Personal Use',
      oldPrice: 150000,
      price: 39000,
      thumb: 'https://cdn.lynkid.my.id/products/06-10-2026/1791290014128_4374374.webp',
      url: 'https://lynk.id/febbyanggun/9qmm13mwxk8d'
    },
    {
      title: '3000+ Footage Reels Exclusive Travel',
      subtitle: {
        id: 'Koleksi ribuan footage travel estetik siap edit dan boleh dijual kembali.',
        en: 'Curated collection of aesthetic travel footage ready to edit and resell.'
      },
      badge: 'PLR License',
      oldPrice: 250000,
      price: 29000,
      thumb: 'https://cdn.lynkid.my.id/products/25-04-2026/1777108635382_4428003.webp',
      url: 'https://lynk.id/febbyanggun/o6ndleq3rorv/checkout'
    },
    {
      title: 'F.I.N.A - Finansial Assistant Sekolah WFA',
      subtitle: {
        id: 'FINA Personal Version, asisten pintar pencatat keuangan harian via WA.',
        en: 'FINA Personal Version, your smart daily expense tracker assistant via WhatsApp.'
      },
      badge: 'Personal Version',
      oldPrice: 800000,
      price: 79000,
      thumb: 'https://cdn.lynkid.my.id/products/31-01-2026/1769843490766_7935448.webp',
      url: 'https://lynk.id/febbyanggun/6qn2d0pmpp38'
    },
    {
      title: 'CONTENT AUTO PILOT by Sekolah WFA',
      subtitle: {
        id: 'Bantu merencanakan dan menyusun ide konten sosial media lebih efisien.',
        en: 'Plan and organize your social media content ideas way more efficiently.'
      },
      badge: 'Personal Use',
      oldPrice: 500000,
      price: 55000,
      thumb: 'https://cdn.lynkid.my.id/products/21-12-2025/1766313946270_2543009.webp',
      url: 'https://lynk.id/febbyanggun/Gxz5rZb'
    }
  ];

  const toolkitGrid = document.getElementById('toolkit-grid');
  function renderToolkit() {
    if (!toolkitGrid) return;
    const lang = currentLang === 'en' ? 'en' : 'id';
    const ctaLabel = (translations[lang] && translations[lang].add_to_cart) || 'Dapatkan Akses →';
    toolkitGrid.innerHTML = TOOLKIT_ITEMS.map((t) => `
      <article class="toolkit-card reveal-up">
        <div class="toolkit-thumb">
          <img src="${t.thumb}" alt="${t.title}" loading="lazy">
          <span class="toolkit-license-badge">${t.badge}</span>
        </div>
        <div class="toolkit-body">
          <h3 class="toolkit-title">${t.title}</h3>
          <p class="toolkit-subtitle">${t.subtitle[lang]}</p>
          <div class="toolkit-foot">
            <div class="toolkit-prices">
              <s class="price-old">${rp(t.oldPrice)}</s>
              <span class="price-current">${rp(t.price)}</span>
            </div>
            <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="btn btn-toolkit-buy">
              <span>${ctaLabel}</span>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

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
        const highlights = item.items[lang].map((line) => `<span class="prod-pill"><span class="prod-icon">✦</span><span>${escapeHtml(line)}</span></span>`).join('');
        return `
          <article class="product-card">
            <div class="book-stage">
              <span class="book-badge">${tag}</span>
              <img src="${item.coverImg}" alt="${title}" class="bundle-mockup-img" loading="lazy">
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
  // 4. TESTIMONIALS (ALUMNI SEKOLAH WFA - 14 CERITA LENGKAP dan FILTERABLE)
  // ==========================================================================
  const TESTIMONIALS = [
    {
      id: 1,
      name: 'Ibun Aif',
      handle: '@aifarifah',
      category: 'creator',
      role: 'Content Creator',
      badge: 'Monetisasi Konten',
      badgeEn: 'Content Monetization',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-aif.webp',
      text: 'Duh gimana ya, seneng banget rasanya. Dulu tuh aku cuma bisa bikin konten, tapi gak ngerti gimana cara monetize dengan bener. Nah Sekolah WFA ini ngajarin semua hal itu, dari strategi, eksekusi, sampe cara dapetin penghasilan dari mana aja. Dan yang paling aku suka, mereka ngajarin dengan cara yang fun, gak boring. Mentor-mentornya juga asik, bisa diajak diskusi kapan aja. Pokoknya materinya daging semua deh!',
      textEn: 'I feel so grateful! I used to only know how to make content without knowing how to properly monetize it. Sekolah WFA taught me everything from strategy and execution to earning income from anywhere. Best of all, the lessons are super fun, never boring, and the mentors are always approachable!'
    },
    {
      id: 2,
      name: 'Kadafi Devayana',
      handle: '@kadafidevayana',
      category: 'creator',
      role: 'Personal Branding Strategist',
      badge: 'Strategic dan Proven',
      badgeEn: 'Strategic and Proven',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-kadafi.webp',
      text: 'Sebagai seseorang yang udah berkecimpung di dunia personal branding cukup lama, aku bisa bilang Sekolah WFA punya kurikulum yang terstruktur. Mereka ngerti betul ekosistem digital yang sebenarnya. Bukan janji-janji muluk yang ngga masuk akal. Approach-nya strategic, actionable, dan yang paling penting, proven! Aku personally recommend untuk profesional yang ingin serius di bidang digital.',
      textEn: 'Having worked in personal branding for quite a while, I can say Sekolah WFA has a genuinely structured curriculum. They truly understand the digital ecosystem without empty hype. The approach is strategic, actionable, and proven. I personally recommend it for professionals serious about building in the digital space.'
    },
    {
      id: 3,
      name: 'Asran Shady',
      handle: '@gashady',
      category: 'nomad',
      role: 'Jurnalis dan Mobile Worker',
      roleEn: 'Journalist and Mobile Worker',
      badge: 'Fleksibilitas Kerja',
      badgeEn: 'Work Flexibility',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-asran.webp',
      text: 'Sebagai orang yang pekerjaannya mobile, saya butuh skill yang bisa mendukung fleksibilitas itu. Sekolah WFA memberikan perspektif baru tentang bagaimana saya bisa diversifikasi pekerjaan tanpa meninggalkan passion saya di dunia jurnalistik. Kurikulumnya applicable, dan saya bisa langsung praktek. Kalau ditanya worth it atau tidak, jawabannya absolutely worth it.',
      textEn: 'Working on the move means I need skills that support true flexibility. Sekolah WFA gave me a fresh perspective on diversifying my income without leaving my passion for journalism. Everything is practical and immediately actionable, absolutely worth it.'
    },
    {
      id: 4,
      name: 'Clara',
      handle: '@ceritadigitalclara',
      category: 'beginner',
      role: 'Digital Newbie to Action',
      badge: 'Lepas Mental Block',
      badgeEn: 'Broke Mental Block',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-clara.webp',
      text: 'Guys, jujur sebenernya aku tuh udah mulai nyemplung, tapi sempet stuck dan ragu banget buat lanjut karena ngerasa super newbie di dunia digital. Tapi untungnya setelah belajar di Sekolah WFA, akar permasalahanku bener-bener dibedah tuntas! Akhirnya aku bisa lepas dari mental block, dan sekarang malah jadi makin pede buat action. Ternyata kuncinya bukan cuma di skill, tapi di pola pikir yang bener. Thanks banget ilmunya!',
      textEn: 'Honestly, I had tried jumping in before but felt stuck and full of doubt as a total beginner. After learning at Sekolah WFA, every root issue was unpacked clearly. I finally broke through my mental block and feel confident taking action now!'
    },
    {
      id: 5,
      name: 'Amanda Mindiw',
      handle: '@amanddanf',
      category: 'nomad',
      role: 'Ex-Agency Nomad',
      badge: 'Bebas dari Kantor',
      badgeEn: 'Location Free',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-mindiw.webp',
      text: 'Okay so. Aku kan udah kerja di beberapa agency, handle brand-brand gede juga. Kirain udah expert lah ya. Tapi pas ikut Sekolah WFA, Aku nyadar masih banyak yang bisa di-improve. Mereka tuh ngasih framework yang bikin kerjaan aku jauh lebih efisien. Plus, sekarang aku udah gak perlu stuck di kantor. Bisa kerja dari coffee shop, dari rumah, bahkan dari luar kota. Best decision ever sih ini.',
      textEn: 'After working at several agencies handling big brands, I thought I already knew it all. Joining Sekolah WFA showed me how much more efficient my workflow could be. Now I am no longer stuck in an office, and I can work from cafes, home, or out of town. Best decision ever!'
    },
    {
      id: 6,
      name: 'Dimas Ramadhan',
      handle: '@dimasramadhan',
      category: 'nomad',
      role: 'Travel Creator',
      badge: 'Travel Creator Sistem',
      badgeEn: 'Creator Systems',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-dimas.webp',
      text: 'Jadi ceritanya gue kan udah lama banget jadi travel creator ya. Kira-kira udah ngerti semua lah. Eh pas ikut Sekolah WFA, ternyata banyak banget yang masih missing. Especially soal sistemnya. Mereka ngajarin hal-hal yang gak pernah kepikiran sama gue sebelumnya. Dan yang gue suka, kak Anggun itu humble, gak sok tau. Pokoknya recommended deh kalau lo serius.',
      textEn: 'Even after years as a travel creator, joining Sekolah WFA revealed how many systems I was still missing. They teach frameworks I had never thought of before, and Anggun is genuinely humble and down to earth. Highly recommended if you are serious.'
    },
    {
      id: 7,
      name: 'Mia Aulia',
      handle: '@miaauliaa.p',
      category: 'nomad',
      role: 'WFA Enthusiast',
      badge: 'Networking Komunitas',
      badgeEn: 'Community Network',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-mia.webp',
      text: 'Komunitasnya aktif banget. Gak cuma belajar materinya doang, tapi juga bisa networking sama temen-temen se-visi dari berbagai macam background berbeda-beda yang kerjanya WFA, jadi ngebuka peluang kolaborasi yang aku butuhin banget selama ini.',
      textEn: 'The community is super active! Beyond the learning materials, you get to network with like-minded remote workers from all kinds of backgrounds, opening up real collaboration opportunities.'
    },
    {
      id: 8,
      name: 'Fuad Rizal',
      handle: '@fuadekspor',
      category: 'creator',
      role: 'Praktisi Bisnis Ekspor',
      roleEn: 'Export Business Practitioner',
      badge: 'Digitalisasi Bisnis',
      badgeEn: 'Business Digitalization',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-fuad.webp',
      text: 'Kak, saya jujur ya. Awalnya mikir, lah ini kok kayak kursus-kursus online pada umumnya. Tapi ternyata beda jauh. Mereka tuh detail banget ngajarinnya, dan bisa disesuaikan sama industri kita. Saya kan di bidang ekspor, tradisional banget. Eh mereka bisa breakdown gimana cara digitalisasinya. Mantap pokoknya. Sekarang kerjaan saya jauh lebih ringan, bisnis makin lancar.',
      textEn: 'To be honest, I first thought it would be like any typical online course, but it was completely different. Coming from the traditional export industry, they broke down exactly how to digitalize my business. Now my workflow is lighter and smoother.'
    },
    {
      id: 9,
      name: 'Hana Puji',
      handle: '@hana.ph',
      category: 'nomad',
      role: 'Nomad in Istanbul',
      badge: 'Living in Istanbul',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-hana.webp',
      text: "Gue tuh dari dulu pengen banget bisa kerja sambil traveling gitu kan. Nah, Sekolah WFA ini jawaban banget sih buat mimpi gue. Mereka ngajarin everything you need to know dari nol sampai bisa profit. Dan gak cuma ngajarin doang, tapi juga kasih insight tentang lifestyle-nya gimana. Now I'm living in Istanbul, working with clients from Indonesia, dan hidup gue so much better. Literally living the dream!",
      textEn: 'I always dreamed of working while traveling, and Sekolah WFA made that possible, teaching everything from zero to profitable plus the real nomad lifestyle. Now I live in Istanbul working with clients remotely. Literally living the dream!'
    },
    {
      id: 10,
      name: 'Raden Anggie',
      handle: '@radengie',
      category: 'beginner',
      role: 'WFA Freelancer',
      badge: '10 Juta Pertama/Bulan',
      badgeEn: 'First 10M IDR/Month',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-anggie.webp',
      text: 'Awalnya sih agak ragu ya, namanya juga modal nekat, apalagi sebelumnya aku pernah ikut kelas gini zonkk banget! Tapi pas udah masuk, wahhh ternyata beneran berkualitas. Sistemnya rapi, step by step jelas. Dan yang bikin kaget, dalam waktu sebulan aja aku udah dapet 10 juta pertama ku! Gak nyangka secepatnya itu. Sekarang income aku lebih stabil, dan yang paling penting, aku happy karena bisa atur waktu sendiri. Thank God mempertemukan ku dengan Sekolah WFA!',
      textEn: 'I was skeptical at first after disappointing classes elsewhere, but the step-by-step system here was genuinely high quality. To my surprise, within just one month I hit my first 10 million IDR milestone and now have flexible control over my own schedule!'
    },
    {
      id: 11,
      name: 'Sherly Fanny',
      handle: '@fannykondoh',
      category: 'beginner',
      role: 'Flexible Digital Worker',
      badge: 'Support System Juara',
      badgeEn: 'Amazing Support System',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-fanny.webp',
      text: 'Pas gue lagi masa-masa berat dulu, gue sadar banget pentingnya punya kerjaan yang fleksibel. Dan WFA ini literally ngasih semua yang gue butuhin. Dari mulai skill sampai support system-nya. Gue nangis beberapa kali lho waktu belajar, bukan karena susah, tapi karena grateful aja akhirnya nemu tempat yang bener-bener understand our needs as digital workers.',
      textEn: 'During a tough season in my life, having flexible remote work meant everything. Sekolah WFA gave me both the practical skills and an incredible support system that truly understands digital workers.'
    },
    {
      id: 12,
      name: 'David Lo',
      handle: '@davidlo.fit',
      category: 'nomad',
      role: 'Fitness Coach dan Remote Worker',
      roleEn: 'Fitness Coach and Remote Worker',
      badge: 'Praktis dan To The Point',
      badgeEn: 'Practical and Direct',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-david.webp',
      text: "Gue udah coba berbagai course online, tapi Sekolah WFA beda level sih. Mereka tuh praktis banget, langsung to the point. Gak pake basa-basi teori yang bikin ngantuk. Sekarang gue bisa dapetin income dari mana aja, meanwhile gue lagi workout di gym manapun yang gue mau. Life's good, man.",
      textEn: 'I have tried many online courses, and Sekolah WFA is on another level, straight to the point without dry theory. Now I earn income from anywhere while keeping my training routine wherever I go.'
    },
    {
      id: 13,
      name: 'Uci Afterhours',
      handle: '@digital.afterhours',
      category: 'creator',
      role: 'Educator dan Community Builder',
      roleEn: 'Educator and Community Builder',
      badge: 'Ramah Pemula',
      badgeEn: 'Beginner Friendly',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-suci.webp',
      text: 'Hai semuanya! Jadi aku tuh passionate banget soal empower perempuan di bidang digital. Dan Sekolah WFA ini align banget sama misi aku. Yang bikin seneng, mereka tuh gak elitist. Bahasa yang dipakai juga gampang dipahami, cocok banget buat pemula. Aku udah ajak temen-temen di komunitas aku, dan mereka pada excited semua. Thankful banget nemu tempat belajar yang supportive kayak gini!',
      textEn: 'I am passionate about empowering women in the digital space, and Sekolah WFA aligns so closely with that mission. Zero elitism, easy-to-follow language for beginners, and such a supportive community!'
    },
    {
      id: 14,
      name: 'Yetti Oktarina',
      handle: '@rinaprana',
      category: 'beginner',
      role: 'Lubuklinggau to Global',
      badge: 'Klien Luar Daerah',
      badgeEn: 'Out-of-Town Clients',
      avatar: 'https://sekolahwfa.com/img/testi/avatar-yetti.webp',
      text: 'Permisi ya, mau sharing dikit. Aku dari Lubuklinggau, kadang suka insecure juga sih karena jauh dari kota besar. Tapi sejak ikut Sekolah WFA, mindset aku berubah total. Ternyata lokasi tuh bukan penghalang. Materinya lengkap, bisa diakses kapan aja, dan mentor-mentornya baik-baik banget mau jawab pertanyaan. Sekarang aku udah berani ambil project dari klien luar daerah. Alhamdulillah banget deh pokoknya!',
      textEn: 'Living far from major cities used to make me feel insecure, but Sekolah WFA completely shifted my mindset. Location is never a barrier, and I now confidently take on projects from clients across different regions!'
    }
  ];

  const FEATURED_TESTI_IDS = [2, 6, 5]; // Kadafi, Dimas, Mindiw
  let activeTestiFilter = 'all';
  let testiExpanded = false;
  const testiGrid = document.getElementById('testi-grid');
  const testiMoreWrap = document.getElementById('testi-more-wrap');
  const testiMoreBtn = document.getElementById('testi-more-btn');

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  function buildTestiCardHtml(t, animIndex) {
    const lang = currentLang === 'en' ? 'en' : 'id';
    const initial = escapeHtml(t.name.charAt(0).toUpperCase());
    const cleanHandle = escapeHtml(t.handle);
    const igUser = cleanHandle.replace('@', '');
    const isAnimated = typeof animIndex === 'number' && animIndex >= 0;
    const animClass = isAnimated ? ' is-immersive-enter' : '';
    const animStyle = isAnimated ? ` style="--reveal-delay:${animIndex * 45}ms"` : '';
    const badgeText = lang === 'en' && t.badgeEn ? t.badgeEn : (t.badge || (lang === 'en' ? 'Verified Alumni' : 'Alumni Terverifikasi'));
    const roleText = lang === 'en' && t.roleEn ? t.roleEn : (t.role || 'Alumni Sekolah WFA');
    const quoteText = lang === 'en' && t.textEn ? t.textEn : t.text;
    return `
      <figure class="testi-card${animClass}" data-category="${t.category}" data-testi-id="${t.id}"${animStyle}>
        <div class="testi-card-head">
          <div class="stars" aria-label="5 bintang">★★★★★</div>
          <span class="testi-verified-pill">${escapeHtml(badgeText)}</span>
        </div>
        <p class="testi-quote">“${escapeHtml(quoteText)}”</p>
        <figcaption class="testi-person">
          <img class="testi-avatar" src="${t.avatar}" alt="${escapeHtml(t.name)}" loading="lazy" width="48" height="48"
            data-initial="${initial}">
          <div class="testi-meta">
            <strong class="testi-name">${escapeHtml(t.name)}</strong>
            <span class="testi-role">${escapeHtml(roleText)}</span>
            <a href="https://instagram.com/${igUser}" target="_blank" rel="noopener noreferrer" class="testi-handle">${cleanHandle} ↗</a>
          </div>
        </figcaption>
      </figure>
    `;
  }

  function bindAvatarFallbacks(scope) {
    const root = scope || testiGrid;
    if (!root) return;
    root.querySelectorAll('.testi-avatar').forEach((img) => {
      if (img.dataset.boundFallback) return;
      img.dataset.boundFallback = '1';
      img.addEventListener('error', function () {
        const badge = document.createElement('span');
        badge.className = 'testi-avatar-fallback';
        badge.textContent = img.dataset.initial || '✦';
        img.replaceWith(badge);
      }, { once: true });
    });
  }

  function updateMoreButton() {
    if (!testiMoreWrap || !testiMoreBtn) return;
    const lang = currentLang === 'en' ? 'en' : 'id';
    const showBtn = activeTestiFilter === 'all';
    testiMoreWrap.style.display = showBtn ? 'flex' : 'none';
    const label = testiMoreBtn.querySelector('.testi-more-label');
    const icon = testiMoreBtn.querySelector('.testi-more-icon');
    testiMoreBtn.setAttribute('aria-expanded', testiExpanded ? 'true' : 'false');
    if (label) {
      label.textContent = testiExpanded
        ? (lang === 'en' ? 'Show Top 3 Featured Stories' : 'Tampilkan 3 Cerita Utama')
        : (lang === 'en' ? 'See More Testimonials (+11 Stories)' : 'Lihat Lebih Banyak Testimoni (+11 Cerita)');
    }
    if (icon) {
      icon.textContent = testiExpanded ? '↑' : '✦';
    }
  }

  function renderTestimonials(filterKey, animateNew) {
    if (!testiGrid) return;
    activeTestiFilter = filterKey || activeTestiFilter;

    let visible;
    const isCollapsedAll = activeTestiFilter === 'all' && !testiExpanded;

    if (isCollapsedAll) {
      visible = FEATURED_TESTI_IDS
        .map((id) => TESTIMONIALS.find((t) => t.id === id))
        .filter(Boolean);
    } else if (activeTestiFilter === 'all') {
      const featured = FEATURED_TESTI_IDS
        .map((id) => TESTIMONIALS.find((t) => t.id === id))
        .filter(Boolean);
      const others = TESTIMONIALS.filter((t) => !FEATURED_TESTI_IDS.includes(t.id));
      visible = featured.concat(others);
    } else {
      visible = TESTIMONIALS.filter((t) => t.category === activeTestiFilter);
    }

    testiGrid.classList.toggle('is-collapsed', isCollapsedAll);

    // When expanding from the initial 3 featured cards, keep them intact at the top and append the rest smoothly
    if (animateNew && activeTestiFilter === 'all' && testiExpanded && testiGrid.children.length === FEATURED_TESTI_IDS.length) {
      const others = TESTIMONIALS.filter((t) => !FEATURED_TESTI_IDS.includes(t.id));
      const frag = document.createElement('div');
      frag.innerHTML = others.map((t, idx) => buildTestiCardHtml(t, idx)).join('');
      const newCards = Array.from(frag.children);
      requestAnimationFrame(() => {
        newCards.forEach((card) => {
          card.addEventListener('animationend', () => {
            card.classList.remove('is-immersive-enter');
            card.style.willChange = 'auto';
          }, { once: true });
          testiGrid.appendChild(card);
        });
        bindAvatarFallbacks(testiGrid);
      });
      updateMoreButton();
      return;
    }

    testiGrid.innerHTML = visible.map((t, idx) => {
      if (animateNew) {
        const isFeatured = activeTestiFilter === 'all' && FEATURED_TESTI_IDS.includes(t.id);
        const animIdx = isFeatured ? -1 : (activeTestiFilter === 'all' ? idx - FEATURED_TESTI_IDS.length : idx);
        return buildTestiCardHtml(t, animIdx >= 0 ? animIdx : -1);
      }
      return buildTestiCardHtml(t, -1);
    }).join('');

    bindAvatarFallbacks(testiGrid);
    updateMoreButton();
  }

  if (testiMoreBtn) {
    testiMoreBtn.addEventListener('click', function () {
      testiExpanded = !testiExpanded;
      renderTestimonials('all', testiExpanded);
      if (!testiExpanded) {
        document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  document.querySelectorAll('#testi-filter-bar .testi-filter-pill').forEach(function (pill) {
    pill.addEventListener('click', function () {
      document.querySelectorAll('#testi-filter-bar .testi-filter-pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const key = pill.getAttribute('data-testi-filter') || 'all';
      renderTestimonials(key, key !== 'all' || testiExpanded);
    });
  });

  // ==========================================================================
  // 5. APPLY LANGUAGE dan BIND SWITCHER
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

    renderToolkit();
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
  // 5. SCROLL PROGRESS, FLOATING BUTTON dan MOBILE DRAWER
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
  // 6. DESTINATION SEARCH, CHIPS dan MODAL
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
        id: '85+ Mbps · Cepat dan stabil di kafe serta coworking Canggu dan Ubud',
        en: '85+ Mbps · Super fast in Canggu and Ubud coworking spaces'
      },
      visa: {
        id: 'Mudah (B211A Visit Visa / Remote Worker E33G)',
        en: 'Easy (B211A Visit Visa / Remote Worker E33G)'
      },
      spots: {
        id: 'Kafe spesialis di Canggu, Ubud, Pererenan dan Uluwatu',
        en: 'Canggu, Ubud, Pererenan and Uluwatu specialty cafes'
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
        id: 'Coworking space di Shibuya, kafe Daikanyama dan Kichijoji',
        en: 'Shibuya coworking spaces, Daikanyama and Kichijoji'
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
        id: '120+ Mbps · Tersedia gratis di coffee shop dan perpustakaan kota',
        en: '120+ Mbps · Readily available in coffee shops and libraries'
      },
      visa: {
        id: 'ESTA Visa Waiver atau Visa Turis B1/B2',
        en: 'ESTA Visa Waiver or B1/B2 Visitor Visa'
      },
      spots: {
        id: 'Brooklyn Public Library, kafe di DUMBO dan Flatiron',
        en: 'Brooklyn Public Library, DUMBO and Flatiron cafes'
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
        id: 'Kafe pinggir Danau Wakatipu di Queenstown dan ruang kerja bersama di Auckland',
        en: 'Queenstown lakefront cafes and Auckland shared spaces'
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
  // 7. STORY REEL VIDEO PLAYER
  // ==========================================================================
  document.querySelectorAll('.story-video-card').forEach(function (card) {
    const video = card.querySelector('.story-video');
    const soundHint = card.querySelector('.story-sound-hint');
    if (!video) return;

    card.addEventListener('click', function (e) {
      if (e.target.closest('.ig-badge')) return;
      if (video.paused) {
        video.muted = false;
        video
          .play()
          .then(function () {
            card.classList.add('is-playing');
            if (soundHint) soundHint.textContent = '❚❚ Jeda';
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
        if (soundHint) soundHint.textContent = '▶ Putar';
      }
    });

    video.addEventListener('ended', function () {
      video.muted = true;
      card.classList.remove('is-playing');
      if (soundHint) soundHint.textContent = '▶ Putar';
    });
  });

  // ==========================================================================
  // 8. NEWSLETTER FORM dan SCROLL REVEAL
  // ==========================================================================
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMsg = document.getElementById('newsletter-msg');
  newsletterForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    if (newsletterMsg) {
      newsletterMsg.textContent =
        currentLang === 'en'
          ? 'Thank you! Check your inbox for WFA updates dan checklist.'
          : 'Terima kasih! Cek emailmu untuk update dan checklist WFA terbaru.';
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
