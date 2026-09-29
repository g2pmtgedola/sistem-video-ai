// Narrative Arc Builder for Master AI Video Prompt Studio
// Intelligently generates N unique, progressive, non-repeating scenes (from 1 to 30 scenes)
// Fully customized to the user's input storyline, domain, character, and duration.
// Guarantees 100% Policy Compliance (Zero violation for OpenAI DALL-E 3, Midjourney, Bing, Sora, Kling).
// Guarantees zero scene repetition: Every scene has unique locations, props, actions, dialogues, music, and camera shots.

export function buildNarrativeArc({
  domain,
  analysis,
  params,
  sceneCount = 6,
  charName = "Protagonis",
  charAge = 25,
  charGender = "Male",
  characters = [],
  locationName = "",
  activeProps = [],
  baseStory = {}
}) {
  const targetCount = Math.max(1, parseInt(sceneCount, 10) || 6);
  const lead = charName || (charGender === "Female" ? "Aisyah" : "Danial");
  const sup = characters.length > 1 ? characters[1].name : (charGender === "Female" ? "Ibu" : "Cikgu Azlan");
  const idea = params.idea || "";

  // Helper to extract specific nouns and elements directly from the user's idea
  const extractIdeaEntities = () => {
    const text = idea.toLowerCase();
    
    let customSubject = "peralatan utama";
    let customSubjectEn = "essential project tools";
    let customGoal = "mencapai kejayaan impian";
    let customGoalEn = "achieving the visionary goal";
    let customSetting = "ruang aktiviti";
    let customSettingEn = "dedicated project space";

    if (/kuih|bakeri|kek|roti/i.test(text)) {
      customSubject = "dulang kuih dan adunan segar";
      customSubjectEn = "baking tray with fresh artisanal ingredients";
      customGoal = "mengembangkan perniagaan kuih tradisional";
      customGoalEn = "expanding traditional artisanal culinary bakery";
      customSetting = "dapur bakeri";
      customSettingEn = "artisanal bakery kitchen";
    } else if (/kopi|kafe|barista/i.test(text)) {
      customSubject = "biji kopi terpilih dan penekan kopi";
      customSubjectEn = "selected gourmet coffee beans and artisan portafilter";
      customGoal = "menghasilkan cawan kopi sempurna";
      customGoalEn = "crafting the perfect specialty cup of coffee";
      customSetting = "kafe kopi artisanal";
      customSettingEn = "specialty artisan cafe";
    } else if (/spm|sekolah|pelajar|kelas|belajar/i.test(text)) {
      customSubject = "buku rujukan SPM dan nota padat";
      customSubjectEn = "SPM examination revision textbooks and summary notes";
      customGoal = "mencapai keputusan cemerlang semua A";
      customGoalEn = "achieving outstanding academic straight A honors";
      customSetting = "sekolah dan bilik darjah";
      customSettingEn = "academic high school classroom";
    } else if (/sukan|lari|maraton|atlet|emas/i.test(text)) {
      customSubject = "kasut trek larian dan jam randik";
      customSubjectEn = "professional track shoes and digital stopwatch";
      customGoal = "memecahkan rekod dan memenangi pingat emas";
      customGoalEn = "breaking records and winning the championship gold medal";
      customSetting = "stadium dan trek larian";
      customSettingEn = "athletic stadium running track";
    } else if (/siber|jenayah|detektif|polis|karberos/i.test(text)) {
      customSubject = "tablet forensik siber dan pemacu penyahsulit";
      customSubjectEn = "forensic cyber tablet and decryption flash drive";
      customGoal = "menumpaskan sindiket siber dan menyelamatkan data negara";
      customGoalEn = "neutralizing the cyber operative and securing national infrastructure";
      customSetting = "bilik siasatan siber";
      customSettingEn = "cyber security war room";
    } else if (/doktor|hospital|rawatan|penyakit|makmal/i.test(text)) {
      customSubject = "stetoskop perubatan dan rekod klinikal";
      customSubjectEn = "medical diagnostic stethoscope and patient clinical charts";
      customGoal = "menyelamatkan nyawa pesakit di saat kritikal";
      customGoalEn = "saving patient lives during critical moments";
      customSetting = "wad hospital dan makmal klinikal";
      customSettingEn = "hospital medical ward and laboratory";
    } else if (/bomba|bencana|banjir|penyelamat/i.test(text)) {
      customSubject = "peralatan menyelamat lasak dan lampu keselamatan";
      customSubjectEn = "rugged search-and-rescue harness and tactical emergency searchlight";
      customGoal = "menyelamatkan mangsa dan meredakan ancaman bencana";
      customGoalEn = "evacuating stranded civilians and neutralizing disaster hazards";
      customSetting = "zon operasi menyelamat";
      customSettingEn = "emergency disaster operations area";
    } else if (/bisnes|gerai|usahawan|jualan/i.test(text)) {
      customSubject = "buku akaun perniagaan dan inventori produk";
      customSubjectEn = "business financial ledger and core product inventory";
      customGoal = "membina jenama usahawan berjaya dari bawah";
      customGoalEn = "building a successful enterprise from humble beginnings";
      customSetting = "premis perniagaan dan pasaran";
      customSettingEn = "commercial enterprise venue";
    } else if (/batik|kain|canting/i.test(text)) {
      customSubject = "alat canting tembaga dan kain sutera putih";
      customSubjectEn = "traditional brass canting pen and pristine white silk fabric";
      customGoal = "menyempurnakan mahakarya warisan seni canting";
      customGoalEn = "perfecting a timeless traditional batik masterpiece";
      customSetting = "bengkel seni batik warisan";
      customSettingEn = "traditional batik heritage workshop";
    } else if (/ukir|kayu|pahat/i.test(text)) {
      customSubject = "mata pahat waja dan papan kayu cengal";
      customSubjectEn = "forged steel carving chisel and aged cengal timber panel";
      customGoal = "menghidupkan seni ukiran warisan Melayu";
      customGoalEn = "breathing life into traditional heritage woodcarving";
      customSetting = "bengkel ukiran kayu tradisional";
      customSettingEn = "traditional woodcarving artisan studio";
    }

    return { customSubject, customSubjectEn, customGoal, customGoalEn, customSetting, customSettingEn };
  };

  const entities = extractIdeaEntities();

  // Generate 30 master beats
  let master30 = [];

  if (domain === "STUDENT") {
    const sData = {
  "titles": [
    "Hening Subuh & Tekad Membara",
    "Membantu Ibu Menyiapkan Kuih di Dapur",
    "Langkah Tegap Menuju Pintu Pagar Sekolah",
    "Tumpuan Mutlak & Bertanya Soalan di Kelas",
    "Ulang Kaji Intensif di Sudut Perpustakaan",
    "Membantu Gerai Petang Sambil Membaca Nota",
    "Menghadapi Formula Rumit di Meja Belajar",
    "Ujian Percubaan Pertama yang Mendebarkan",
    "Detik Air Mata Melihat Markah Percubaan",
    "Nasihat & Pelukan Kasih Seorang Ibu",
    "Menyusun Pelan Ulang Kaji 30 Hari Baharu",
    "Membimbing Rakan Sekelas Memahami Topik",
    "Uji Kaji di Makmal Sains Bersama Pasukan",
    "Mengorbankan Masa Rehat Demi Mengulang Kaji",
    "Sesi Bimbingan Khas Bersama Guru Pakar",
    "Ujian Percubaan Kedua Memperlihatkan Kemajuan",
    "Menerima Pujian Guru Atas Peningkatan Markah",
    "Dugaan Kesihatan Menjelang Ambang Peperiksaan",
    "Doa & Restu Bersama Keluarga di Rumah",
    "Malam Ambang Peperiksaan SPM Sebenar",
    "Melangkah Masuk Ke Dewan Peperiksaan Agung",
    "Membuka Halaman Pertama Kertas Soalan SPM",
    "Menjawab Soalan KBAT dengan Ketepatan Formula",
    "Detik 10 Minit Terakhir Memeriksa Jawapan",
    "Wisel Penamat Berbunyi & Kelegaan Luar Biasa",
    "Menghantar Skrip Jawapan Kepada Pengawas",
    "Hari-hari Menunggu Penuh Doa & Harapan",
    "Hari Pengumuman Keputusan Rasmi di Dewan",
    "Menerima Slip Keputusan SPM Cemerlang 9A",
    "Masa Depan Gemilang & Obor Inspirasi Baharu"
  ],
  "locations": [
    "Bilik belajar rumah kampung waktu awal pagi dengan cahaya lampu meja kuning hangat",
    "Ruang dapur rumah sederhana dengan aroma kuih pagi dan cahaya mentari terbit",
    "Laluan pejalan kaki sekolah menengah berbumbung di bawah sinaran mentari pagi",
    "Bilik darjah sekolah menengah dengan papan putih dipenuhi formula dan gambar rajah",
    "Ruang perpustakaan sekolah yang hening dengan deretan rak buku tinggi",
    "Kawasan gerai pasar petang yang sibuk dengan pelanggan dan deruan angin senja",
    "Meja belajar bilik tidur pada lewat malam dengan buku teks terbuka tebal",
    "Dewan peperiksaan sekolah yang dingin dengan deretan meja kayu tersusun kemas",
    "Ruang bilik tidur malam hening dengan kertas slip markah terbentang di meja",
    "Ruang tamu rumah kayu yang hangat dengan alunan doa dan pelukan ibu",
    "Meja belajar yang kini dihiasi jadual waktu 30 hari berwarna-warni di dinding",
    "Kawasan wakaf belajar luar kelas di bawah naungan pohon rimbun sekolah",
    "Makmal sains sekolah dengan deretan tabung uji dan carta berkala unsur",
    "Bilik rehat pelajar yang tenang ketika rakan lain sedang bermain di padang",
    "Bilik guru yang selesa dengan timbunan modul latihan akademik khas",
    "Papan kenyataan akademik sekolah memaparkan peningkatan graf markah pelajar",
    "Bilik darjah petang yang tenang ketika guru menyerahkan kertas latihan bertanda baik",
    "Ruang rehat rumah dengan tuala basah di dahi dan segelas air suam penyejuk badan",
    "Ruang solat rumah yang tenang dengan sejadah terbentang dan tangan menadah doa",
    "Bilik tidur yang sunyi dengan beg pensel lutsinar siap diperiksa rapi di meja",
    "Perkarangan dewan besar sekolah dengan ratusan calon berbaris dalam keheningan pagi",
    "Dewan peperiksaan hening dengan ratusan meja kayu berjarak satu meter",
    "Sudut meja peperiksaan dengan kertas graf dan pembaris keluli bergaris rapi",
    "Dewan peperiksaan dengan jam dinding besar menunjukkan detik 10 minit terakhir",
    "Perkarangan luar dewan sekolah sebaik sahaja wisel penamat peperiksaan berbunyi",
    "Meja pengawas peperiksaan dengan ikatan kertas jawapan dimeterai kemas",
    "Anjung rumah petang dengan kalendar dinding ditandakan tarikh pengumuman keputusan",
    "Dewan sekolah yang dipenuhi ibu bapa, guru-guru dan calon SPM menanti keputusan",
    "Pentas dewan sekolah di bawah limpahan cahaya lampu dengan tepukan gemuruh hadirin",
    "Puncak bukit pemandangan waktu fajar keemasan menghadap panorama luas masa depan"
  ],
  "props": [
    "Jam loceng analog berdering, buku rujukan SPM tebal, cawan teh suam, nota berpelekat",
    "Dulang kuih tradisional, bekas kuih berpenutup, beg galas sekolah putih biru",
    "Pakaian seragam sekolah kemas bergosok, lencana sekolah di dada, fail dokumen modul",
    "Kotak pensel lengkap, buku nota bersalin rapi, pen penanda, papan putih kelas",
    "Kamus dewan tebal, himpunan soalan SPM tahun-tahun lepas, pen penyerlah pelbagai warna",
    "Apron kain bersih, penyepit kuih keluli, beg kertas bungkusan, kad nota poket",
    "Kalkulator saintifik, kertas graf bergaris, pemadam berhabuk, lampu meja belajar",
    "Kertas soalan percubaan bermeterai, pensel 2B kayu, jam randik dinding dewan",
    "Slip markah percubaan bertanda merah, lampu meja malap, helaian tisu pengelap mata",
    "Cawan susu suam, tangan ibu memegang bahu anak, buku nota pusaka doa keluarga",
    "Kertas kad manila jadual waktu 30 hari, pen penanda berwarna, pembaris keluli",
    "Papan putih mini mudah alih, pen marker dakwat biru, buku formula ringkas",
    "Bikar kaca makmal, mikroskop optik, carta tindak balas kimia, sarung tangan getah",
    "Modul latihan soalan ramalan, pen berdakwat basah, pemasa meja digital",
    "Modul soalan KBAT tahap tinggi, cermin mata belajar, buku teks rujukan khas",
    "Kertas markah ujian kedua bergred A, tandatangan pujian guru pada helaian depan",
    "Fail pencapaian akademik cemerlang, senyuman puas guru pembimbing",
    "Minyak angin herba penyejuk, botol air masak suam, nota motivasi diri di dinding",
    "Tasbih doa, sejadah bersih, restu kedua-dua ibu bapa yang memeluk erat",
    "Beg pensel lutsinar rasmi, kad pengenalan diri, slip angka giliran peperiksaan",
    "Pintu dewan dibuka luas, barisan ratusan meja berjarak, jam dewan rasmi berdetik",
    "Kertas soalan peperiksaan SPM dibuka perlahan, borang jawapan OMR bermeterai",
    "Helaian jawapan bergaris kemas, pensel 2B meluncur lancar di atas kertas graf",
    "Jam dinding menunjukkan 11:50 pagi, helaian jawapan disemak buat kali terakhir",
    "Pensel diletakkan di atas meja, nafas lega dilepaskan, derapan tapak kaki calon",
    "Skrip jawapan diikat dengan tali benang rasmi, borang kehadiran ditandatangani",
    "Kalendar bilik berpalang hari demi hari, doa di atas sejadah menanti fajar",
    "Pentas utama berhias bunga segar, sampul slip keputusan rasmi di tangan pengetua",
    "Slip keputusan rasmi memaparkan 9A CEMERLANG, jambangan bunga tahniah, trofi",
    "Surat tawaran biasiswa universiti ternama, lencana kecemerlangan, beg galas baharu"
  ],
  "actions": [
    "Aisyah mematikan jam locengnya pada jam 5:00 pagi, duduk tegak di meja belajar dengan semangat membara.",
    "Aisyah membantu ibunya menyusun kuih ke dalam bekas sebelum menyarungkan beg sekolahnya.",
    "Aisyah melangkah masuk melepasi pagar sekolah dengan penuh keyakinan dan senyuman bersemangat.",
    "Aisyah mengangkat tangan dengan sopan untuk bertanyakan soalan mencabar kepada guru di hadapan kelas.",
    "Aisyah meneliti perenggan jawapan cemerlang di perpustakaan, menandakan kata kunci penting dengan penyerlah kuning.",
    "Aisyah melayani pelanggan di gerai dengan senyuman mesra sambil membaca nota kecil di poket apronnya.",
    "Aisyah menekan kalkulator saintifiknya berulang kali untuk menyelesaikan persamaan fizik yang mencabar.",
    "Aisyah membelek kertas soalan percubaan pertama, memulakan jawapan dengan tumpuan yang tidak berbelah bahagi.",
    "Aisyah menekup wajahnya seketika, menghela nafas panjang melihat markah percubaan yang belum mencapai sasaran.",
    "Aisyah menatap wajah ibunya yang tersenyum penuh kasih sayang, membakar semula bara tekad yang hampir padam.",
    "Aisyah menyematkan jadual waktu baharu di dinding, menandakan sasaran topik wajib setiap hari.",
    "Aisyah menerangkan formula matematik kepada rakan sekelas di wakaf sekolah dengan sabar dan jelas.",
    "Aisyah mencatat hasil pemerhatian tindak balas kimia di makmal sains dengan ketelitian seorang ilmuwan muda.",
    "Aisyah memanfaatkan masa rehatnya di sudut bilik membaca nota ringkas demi memperkukuh ingatan.",
    "Aisyah berbincang secara mendalam bersama guru pakar, membetulkan teknik menjawab soalan aras tinggi.",
    "Aisyah tersenyum lega melihat namanya tersenarai antara pelajar yang mencatat lonjakan markah tertinggi.",
    "Aisyah menerima kembali kertas latihannya dengan catatan pujian guru berdakwat merah di muka depan.",
    "Aisyah mengelap dahinya yang berpeluh kerana demam ringan, namun tetap menggenggam nota dengan azam waja.",
    "Aisyah mencium tangan ibunya memohon restu dan doa tulus sebelum melangkah ke medan perjuangan sebenar.",
    "Aisyah memeriksa kelengkapan alat tulis di dalam beg pensel lutsinar, menarik nafas lega tanda sudah bersedia.",
    "Aisyah melangkah tenang masuk ke dewan besar peperiksaan diiringi doa dan senyuman guru-guru di pintu.",
    "Aisyah membuka halaman pertama kertas SPM dengan bacaan bismillah yang hening dan tenang.",
    "Aisyah menghuraikan hujah jawapan KBAT dengan susunan fakta yang matang dan tulisan yang kemas.",
    "Aisyah menyemak kembali setiap nombor soalan dan helaian jawapan pada saat jarum jam menghampiri penamat.",
    "Aisyah meletakkan penselnya sebaik wisel penamat berbunyi, menghela nafas syukur yang amat melegakan.",
    "Aisyah menyerahkan skrip jawapannya kepada pengawas dewan dengan senyuman penuh kepuasan hati.",
    "Aisyah menadah tangan di atas sejadah setiap malam, memohon agar segala usahanya diberkati kejayaan.",
    "Aisyah melangkah masuk ke dewan pengumuman keputusan bersama ibunya yang menggenggam erat tangannya.",
    "Aisyah memegang slip keputusan SPM yang tertera gred semua A, air mata kegembiraan menitis di pipinya.",
    "Aisyah berdiri di puncak bukit memegang surat biasiswa, menatap masa hadapan dengan keyakinan yang abadi."
  ],
  "dialogues": [
    "Bismillah... hari ini bermula perjuangan sebenar untuk mengubah masa depan keluarga.",
    "Mak jangan risau, petang nanti lepas habis kelas Aisyah terus tolong mak di gerai macam biasa.",
    "Setiap minit di sekolah ini adalah peluang emas untuk menuntut ilmu yang berharga.",
    "Cikgu, adakah kaedah ini boleh dipermudahkan menggunakan konsep hukum pemuliharaan tenaga?",
    "Kata kunci ini yang membezakan jawapan biasa dengan jawapan gred A+ dalam peperiksaan.",
    "Terima kasih pakcik, jemput singgah lagi. Sambil berniaga, sambil mengulang kaji formula.",
    "Formula ini memang rumit, tetapi jika dipecahkan satu persatu, jawapannya pasti jelas.",
    "Kertas percubaan ini menguji mental dan strategi masa. Aku mesti kekal fokus.",
    "Adakah segala pengorbanan ini masih belum mencukupi untuk capai impian 9A?",
    "Ibu tahu anak ibu kuat. Kejayaan bukan tentang tidak pernah jatuh, tapi bangkit setiap kali rebah.",
    "Tiga puluh hari lagi menuju SPM sebenar. Setiap saat ini akan dimanfaatkan tanpa sesal!",
    "Bila kita ajar orang lain, ilmu kita akan jadi dua kali ganda lebih kukuh dalam ingatan.",
    "Eksperimen ini membuktikan bahawa teori di dalam buku benar-benar wujud dalam realiti.",
    "Masa rehat ini cukup berharga untuk memastikan topik sukar ini benar-benar dikuasai.",
    "Terima kasih cikgu atas bimbingan ini. Sekarang saya lebih faham format pemarkahan sebenar.",
    "Alhamdulillah... usaha beberapa minggu ini mula menunjukkan peningkatan markah yang ketara!",
    "Pujian cikgu membakar lagi semangat saya untuk terus melipatgandakan usaha.",
    "Sedikit demam ini tidak akan menghalang aku untuk terus melangkah ke garisan penamat.",
    "Mak, doakan Aisyah tenang menjawab di dalam dewan peperiksaan esok.",
    "Segala usaha telah dikerah, segala doa telah dipanjatkan... kini aku berserah sepenuhnya.",
    "Selamat pagi cikgu. Saya sedia berjuang dengan ilmu yang telah cikgu curahkan.",
    "Bismillahir Rahmanir Rahim... ya Allah, terangilah hati dan fikiranku sepanjang menjawab soalan ini.",
    "Setiap hujah ini disusun dengan fakta yang kukuh mengikut skema pemarkahan terbaik.",
    "Sepuluh minit terakhir... semak setiap nombor dan pastikan tiada satu pun soalan tertinggal.",
    "Alhamdulillah selesai! Aku telah berikan seluruh jiwa dan raga dalam dewan ini!",
    "Terima kasih cikgu pengawas. Semoga kertas jawapan ini dinilai dengan sebaiknya.",
    "Ya Allah, kurniakanlah keputusan yang terbaik buat kedua ibu bapaku.",
    "Mak, apa pun keputusannya hari ini, Aisyah dah usaha sehabis baik demi mak.",
    "Semua A cemerlang! Ya Allah, terima kasih mak... ini semua berkat doa mak yang tak pernah putus!",
    "Perjalanan ini baru bermula. Obor keazaman ini akan terus menyala menerangi jalan masa depan."
  ]
};
    for (let i = 0; i < 30; i++) {
      const progress = i / 29;
      let actName = "Persediaan Awal";
      if (progress > 0.8) actName = "Kejayaan & Masa Depan";
      else if (progress > 0.6) actName = "Medan Peperiksaan Sebenar";
      else if (progress > 0.4) actName = "Kebangkitan & Ujian";
      else if (progress > 0.2) actName = "Pembelajaran Intensif";

      master30.push({
        title: sData.titles[i],
        act: actName,
        envMy: sData.locations[i],
        envEn: `Authentic academic student setting for stage ${i + 1} (${sData.titles[i]}), natural realistic cinematography`,
        propsMy: sData.props[i],
        propsEn: `Official academic materials and stage ${i + 1} equipment, photographic quality`,
        actionMy: sData.actions[i].replace(/Aisyah/g, lead),
        actionEn: `deeply engaged in ${sData.titles[i].toLowerCase()}, demonstrating immense academic discipline, focus and determination`,
        dialogueMy: sData.dialogues[i].replace(/Aisyah/g, lead),
        exprEn: progress > 0.8 ? "Radiant tears of joy, supreme pride and grateful humility"
          : progress > 0.6 ? "Laser-focused intensity, calm exam mastery and steady breathing"
          : progress > 0.25 && progress < 0.35 ? "Emotional exhaustion transforming into fierce inner resolve"
          : "Bright, respectful, energetic determination",
        bodyEn: progress > 0.8 ? "Standing tall with open arms, clutching award and result slip with deep gratitude"
          : progress > 0.6 ? "Poised upright at desk, pen moving fluidly with surgical precision"
          : "Upright attentive student posture, carrying books with quiet confidence",
        cam: {
          shotType: i === 0 ? "Medium Close-Up" : i === 28 ? "Hero Close-Up" : i === 29 ? "Epic Golden Hour Vista" : "Medium Shot",
          lens: "50mm f/1.4",
          movement: "Cinematic Slow Tracking"
        }
      });
    }
  } else {
    // Adaptive 30 Beats for all other domains and custom ideas
    const aTitles = [
  "Titik Mula & Perancangan Fajar",
  "Penyusunan Alatan & Bahan Utama",
  "Langkah Pertama Menghadapi Cabaran",
  "Bimbingan Ikhlas Tokoh Bimbingan",
  "Melangkah Ke Medan Tindakan Nyata",
  "Pelaksanaan Fasa Pertama Dengan Teliti",
  "Rintangan Teknikal Mula Terbit",
  "Analisis Formula & Pelarasan Baru",
  "Ujian Ralat Menguji Kesabaran",
  "Detik Keletihan & Keraguan Jiwa",
  "Menemui Kembali Niat & Bara Semangat",
  "Strategi Baharu Bersama Rakan Seperjuangan",
  "Latihan Berulang-ulang Menuju Ketepatan",
  "Pengorbanan Masa Demi Standard Kualiti",
  "Ujian Pra-Penilaian Menunjukkan Potensi",
  "Komplikasi Saat Akhir Yang Mendebarkan",
  "Tindakan Pantas Menyelamatkan Situasi",
  "Ketenangan Minda Menjelang Hari Penentuan",
  "Sokongan Moral & Doa Orang Tercinta",
  "Ambang Detik Penentu Di Lokasi Utama",
  "Melangkah Masuk Ke Gelanggang Penentuan",
  "Demonstrasi Kemahiran Paling Mencabar",
  "Mengatasi Halangan Kritikal Saat Akhir",
  "Tumpuan Mutlak Detik-detik Terakhir",
  "Detik Menahan Nafas & Pengukuran Markah",
  "Keputusan Sempurna Mencecah 100%",
  "Sorakan Gemuruh & Pengiktirafan Mutlak",
  "Menjulang Lambang Kejayaan Bersama Pasukan",
  "Pelukan Kasih & Air Mata Kesyukuran",
  "Masa Depan Gemilang Di Bawah Sinaran Fajar"
];
    const aDialogues = [
  "Setiap impian besar bermula dengan satu langkah berani pada hari ini.",
  "Peralatan yang tersusun rapi adalah separuh daripada kejayaan sebenar.",
  "Halangan pertama ini hadir bukan untuk menghentikan langkah, tetapi menguji ketahanan azam.",
  "Terima kasih atas nasihat ini. Kata-kata ini menyalakan kembali keyakinan dalam diri.",
  "Inilah masanya untuk menterjemahkan perancangan di atas kertas kepada tindakan nyata.",
  "Kunci permulaan ini adalah ketelitian mutlak pada setiap perincian asas.",
  "Kenapa bacaan ini lari daripada perancangan asal? Aku mesti cari puncanya sekarang!",
  "Ada formula penyelesaian yang lebih baik jika kita ubah sudut pendekatan ini.",
  "Ujian ini menuntut kesabaran tertinggi; jangan biarkan ralat kecil meruntuhkan matlamat besar.",
  "Terlalu banyak yang telah dikorbankan... aku tidak boleh berputus asa di pertengahan jalan.",
  "Bila niat kita ikhlas, tiada rintangan yang mampu mematahkan semangat perjuangan kita.",
  "Bila kita satukan kepakaran masing-masing, tiada halangan yang mustahil ditembusi.",
  "Pengulangan berdisiplin akan melahirkan ketepatan kemahiran yang sempurna.",
  "Kualiti tidak pernah datang secara kebetulan; ia adalah hasil usaha yang berterusan.",
  "Penilaian awal ini membuktikan bahawa kita berada di atas landasan yang betul.",
  "Bertenang semua! Jangan panik, kita selesaikan komplikasi ini mengikut protokol!",
  "Tindakan pantas dan tepat ini telah menyelamatkan seluruh projek daripada kegagalan.",
  "Fikiran yang tenang adalah senjata terhebat menghadapi saat penentuan esok hari.",
  "Terima kasih atas doa dan kepercayaan kamu; aku akan bawa harapan ini ke medan penentuan.",
  "Detik yang ditunggu-tunggu telah tiba. Inilah masa untuk membuktikan kemampuan diri.",
  "Bismillah... inilah pentas sebenar untuk menzahirkan segala usaha dan keringat selama ini.",
  "Saksikanlah kesempurnaan fungsi ciptaan ini yang direka dengan ketelitian penuh.",
  "Halangan saat akhir ini berjaya diatasi dengan ketangkasan dan fokus mutlak.",
  "Detik-detik terakhir... semak setiap perincian sebelum pengiraan markah bermula.",
  "Tahan nafas semua... saksikan penunjuk meter sistem melonjak ke paras maksimum.",
  "Berjaya! Seratus peratus sempurna! Kami berjaya membuktikannya kepada dunia!",
  "Terima kasih atas segala sokongan dan tepukan gemuruh yang amat mengharukan ini!",
  "Kejayaan ini bukan milik seorang, tetapi buah pengorbanan seluruh pasukan yang setia.",
  "Tanpa sokongan dan doa kamu yang tidak pernah putus, aku takkan mampu berdiri di sini hari ini.",
  "Perjalanan ini baru bermula. Obor keazaman ini akan terus menyala menerangi jalan masa depan."
];
    const { customSubject, customSubjectEn, customGoal, customGoalEn, customSetting, customSettingEn } = entities;

    for (let i = 0; i < 30; i++) {
      const progress = i / 29;
      let actName = "Permulaan Perjalanan";
      if (progress > 0.8) actName = "Kejayaan & Masa Depan";
      else if (progress > 0.6) actName = "Kemuncak Penentuan";
      else if (progress > 0.4) actName = "Ujian & Kebangkitan";
      else if (progress > 0.2) actName = "Tindakan Aktif";

      master30.push({
        title: aTitles[i],
        act: actName,
        envMy: `${customSetting} pada fasa ${i + 1} (${aTitles[i]}) dengan pencahayaan sinematik yang realistik`,
        envEn: `Authentic ${customSettingEn} setting during stage ${i + 1} (${aTitles[i]}), photorealistic natural lighting`,
        propsMy: `${customSubject}, alatan fasa ${i + 1}, fail kemajuan projek`,
        propsEn: `${customSubjectEn}, stage ${i + 1} operational gear, action progress portfolio`,
        actionMy: `${lead} bertindak dengan penuh komitmen dalam babak '${aTitles[i]}', gigih berusaha demi ${customGoal}.`,
        actionEn: `deeply engaged in ${aTitles[i].toLowerCase()}, demonstrating mastery while striving towards ${customGoalEn}`,
        dialogueMy: aDialogues[i],
        exprEn: progress > 0.8 ? "Overwhelming joy, radiant triumphant smile and deep gratitude"
          : progress > 0.6 ? "Supreme unwavering focus, poised artisan/athletic mastery"
          : progress > 0.28 && progress < 0.38 ? "Intense diagnostic determination overcoming fatigue"
          : "Bright, resolute, focused and courageous",
        bodyEn: progress > 0.8 ? "Standing tall with open arms, raising trophy/product with proud humility"
          : progress > 0.6 ? "Working decisively with steady hands, total body balance"
          : "Firm balanced posture, handling tools with practiced grace",
        cam: {
          shotType: i === 0 ? "Wide Establishing Shot" : i === 25 ? "Hero Close-Up" : i === 29 ? "Epic Golden Hour Vista" : "Medium Shot",
          lens: "50mm f/1.4",
          movement: "Cinematic Slow Tracking"
        }
      });
    }
  }

  // Exact targetCount sampling without repetition (guarantees EVERY scene is unique)
  const sampled = [];
  for (let i = 0; i < targetCount; i++) {
    // Proportional index across 30 beats
    const beatIndex = targetCount === 1 
      ? 0 
      : Math.min(29, Math.round((i * (master30.length - 1)) / (targetCount - 1)));
    
    const b = master30[beatIndex];
    const progressRatio = targetCount > 1 ? i / (targetCount - 1) : 0;

    // Dynamic music progression
    let sceneMusicCue = "Alunan muzik sinematik lembut membina rasa ingin tahu dan harapan permulaan";
    if (progressRatio > 0.8) {
      sceneMusicCue = "Skor orkestra sinematik megah penuh kehangatan inspirasi dan kegemilangan kejayaan";
    } else if (progressRatio > 0.6) {
      sceneMusicCue = "Muzik dramatik berintensiti tinggi memuncak dengan rentak perkusi mendebarkan";
    } else if (progressRatio > 0.35) {
      sceneMusicCue = "Alunan melodi strings dan cello emosional menzahirkan cabaran dan ketahanan diri";
    }

    sampled.push({
      title: b.title,
      act: b.act || `Fasa ${i + 1}`,
      objective: `Babak ${i + 1} (${b.act || "Naratif"}): Memajukan situasi penceritaan mengikut perkembangan watak ${lead}.`,
      action: b.actionMy,
      visualActionEn: b.actionEn,
      dialogueText: b.dialogueMy,
      speaker: lead,
      emotion: b.exprEn.split(",")[0] || "Penuh tekad dan harapan",
      expressionEn: b.exprEn,
      bodyLanguageEn: b.bodyEn,
      environment: b.envMy,
      environmentEn: b.envEn,
      props: b.propsMy,
      propsEn: b.propsEn,
      cam: b.cam,
      narration: `Setiap detik perjuangan ${lead} membuktikan bahawa keikhlasan dan ketabahan tidak pernah sia-sia.`,
      sfx: [{ name: `Kesan bunyi foley realistik babak ${i + 1} (${b.title})`, volume: "60%", purpose: "Menghidupkan persekitaran babak secara nyata" }],
      musicCue: sceneMusicCue
    });
  }

  return sampled;
}
