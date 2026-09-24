// Domain Package Builder for AI Video Suite
// Intelligently generates characters, story concepts, narrative arcs, and per-scene scripts
// for any user-provided situation, completely free of hardcoded craft/heritage biases.

export function buildDomainPackage(analysis, params) {
  const {
    domain,
    isMalay,
    isFemale,
    extractedAge,
    studentGrade,
    extractedName,
    hasLetter
  } = analysis;

  const idea = params.idea || "";
  const vStyle = params.videoStyle ? `${params.videoStyle} ` : "Sinematik ";

  // 1. Determine Lead Character Name
  let charName = extractedName;
  if (!charName) {
    if (domain === "BATIK") {
      charName = isFemale ? "Suraya" : "Amir";
    } else if (domain === "UKIRAN") {
      charName = "Amir";
    } else if (domain === "STUDENT") {
      charName = isFemale ? "Aisyah" : "Danial";
    } else if (domain === "BUSINESS") {
      charName = isFemale ? "Aina" : "Faris";
    } else if (domain === "HEALTHCARE") {
      charName = isFemale ? "Dr. Aisyah" : "Dr. Danial";
    } else if (domain === "RESCUE") {
      charName = isFemale ? "Pegawai Suraya" : "Pegawai Danial";
    } else if (domain === "SPORTS") {
      charName = isFemale ? "Nurul" : "Hafiz";
    } else if (domain === "CULINARY") {
      charName = isFemale ? "Mak Som" : "Chef Danial";
    } else if (domain === "FAMILY") {
      charName = isFemale ? "Siti" : "Amir";
    } else if (domain === "SILAT") {
      charName = isFemale ? "Melati" : "Pendekar Danial";
    } else if (domain === "FISHERMAN") {
      charName = "Pak Ali";
    } else {
      charName = isFemale ? "Aisyah" : "Danial";
    }
  }

  const charGender = isFemale ? "Female" : "Male";
  let charAge = extractedAge || (isFemale ? 22 : 25);
  if (domain === "STUDENT" && !extractedAge) charAge = 15;

  let characters = [];
  let locationName = "";
  let activeProps = [];
  let soundDesign = {};
  let story = {};
  let craftSceneActions = [];

  // =========================================================================
  // DOMAIN 1: BATIK (Seni Batik Tradisional & Wasiat Ayah)
  // =========================================================================
  if (domain === "BATIK") {
    locationName = isMalay ? "Bengkel Batik Tradisional Warisan Ayah, Terengganu" : "Traditional Batik Heritage Workshop";
    activeProps = [
      "Sekeping surat tulisan tangan arwah ayah dalam sampul antik",
      "Canting tembaga berhulu kayu jati",
      "Periuk lilin batik panas di atas dapur kecil",
      "Kain sutera putih dibentang pada pemidang kayu",
      "Pewarna batik asli tona indigo dan merah manggis"
    ];

    characters.push({
      id: "CHAR_001",
      name: charName,
      role: isMalay ? "Gadis Kampung & Pewaris Perniagaan Batik" : "Young Heir to Batik Heritage",
      age: charAge,
      gender: charGender,
      nationality: "Malaysian",
      ethnicity: "Malay",
      faceDescription: isFemale
        ? "Youthful warm honey-tan complexion, gentle expressive dark brown eyes holding a mix of vulnerability and emerging resolve, delicate features with natural grace."
        : "Youthful olive complexion with earnest dark brown eyes.",
      skinTone: "Warm honey-tan Asian skin tone with smooth natural texture",
      hair: "Long natural black hair neatly gathered under a modest shawl",
      hairStyle: "Modest, graceful arrangement with a few wisps framing the face",
      eyeColor: "Deep warm dark brown, thoughtful and emotionally resonant",
      bodyType: "Slender, graceful build with artisan poise",
      height: "163 cm",
      clothing: "A modest dusty-rose cotton Baju Kurung with sleeves rolled up to the mid-forearms for batik working, dark navy sarong skirt, and a soft matching chiffon shawl",
      shoes: "Simple brown leather traditional slip-on flat sandals",
      accessories: "A delicate silver ring gifted by her late father, small vintage leather pouch holding the father's letter",
      personality: "Sensitive, introspective, initially doubtful of traditional crafts, deeply loving daughter who discovers profound passion and resilience",
      emotionalTraits: "Filial devotion, yearning for connection with her late father, transformative determination",
      voiceCharacteristics: "Gentle, heartfelt Malaysian Malay young female voice, emotional warmth, 0.92x speed",
      speakingStyle: "Soft-spoken, humble yet articulates newfound conviction with quiet strength",
      typicalFacialExpressions: "Soft wistful smile, tears of realization drying into focused determination",
      typicalGestures: "Gently traces the ink on her father's letter, blows softly on hot wax in the canting tip",
      movementStyle: "Graceful, deliberate, mindful of the delicate silk fabric",
      backstory: "Seorang gadis kampung yang mulanya ragu-ragu akan masa depan perniagaan batik peninggalan arwah ayahnya di era moden. Namun sekeping surat tulisan tangan arwah ayahnya yang ditemui di bengkel telah membuka mata hatinya tentang makna sebenar seni batik sebagai doa dan warisan pusaka.",
      isLocked: true,
      lockedDescription: `A ${charAge}-year-old Malay Malaysian village woman named ${charName}, slender graceful build, warm honey-tan complexion with gentle expressive dark brown eyes, wearing a modest dusty-rose cotton Baju Kurung with rolled sleeves, dark navy sarong skirt, and a soft matching shawl, holding an aged handwritten letter and a traditional brass canting.`
    });

    characters.push({
      id: "CHAR_002",
      name: isMalay ? "Arwah Ayah (Pak Hassan)" : "Late Father (Pak Hassan)",
      role: isMalay ? "Tokoh Pembuat Batik & Bapa (Dalam Memori / Wasiat)" : "Master Batik Artisan & Father (In Memory / Letter)",
      age: 55,
      gender: "Male",
      nationality: "Malaysian",
      ethnicity: "Malay",
      faceDescription: "Wise weathered face with kind paternal wrinkles around eyes, warm affectionate smile.",
      skinTone: "Sun-kissed bronze tan",
      hair: "Short salt-and-pepper hair",
      hairStyle: "Classic neat style",
      eyeColor: "Warm brown",
      bodyType: "Medium build with skilled craftsman hands",
      height: "172 cm",
      clothing: "Traditional indigo blue cotton batik shirt, dark trousers",
      shoes: "Leather sandals",
      accessories: "Vintage fountain pen used to write the letter",
      personality: "Wise, loving, deeply spiritual, devoted craftsman",
      emotionalTraits: "Endless love and faith in his daughter's potential",
      voiceCharacteristics: "Deep, warm fatherly Malaysian Malay baritone, pacing 0.88x",
      speakingStyle: "Poetic, loving, filled with paternal wisdom",
      typicalFacialExpressions: "Loving paternal gaze of confidence",
      typicalGestures: "Gently rests hand on daughter's shoulder",
      movementStyle: "Calm, steady",
      backstory: "Pengasas bengkel batik kampung yang mendedikasikan hidupnya melakar doa pada setiap helai kain. Sebelum menghembuskan nafas terakhir, beliau menitipkan surat rahsia agar anaknya faham bahawa batik bukan sekadar kain, tetapi roh warisan.",
      isLocked: true,
      lockedDescription: "A 55-year-old Malay Malaysian master batik artisan Pak Hassan, warm weathered tan face with kind paternal wrinkles, salt-and-pepper hair, wearing a traditional indigo blue batik shirt, wise and loving fatherly presence."
    });

    soundDesign = {
      overallMusicTheme: "Tradisi Akustik Melayu Moden (Acoustic Seruling, Gambus, Cello & Piano)",
      instruments: ["Seruling Buluh", "Gambus", "Piano Akustik Lembut", "Warm String Ensemble (Cello & Viola)"],
      bpmRange: "65 - 72 BPM",
      mixNotes: "Muzik bermula lembut dan melankolik di babak awal, kemudian berkembang megah penuh inspirasi dan kebanggaan.",
      ambientFoleyTrack: "Desiran angin kampung, gemeresik kain sutera, hembusan lembut canting, titisan lilin, kicauan burung pagi."
    };

    story = {
      title: params.name || "Warkah Lilin: Jiwa Di Sebalik Batik",
      logline: params.idea,
      genre: `${params.videoStyle} Drama Kebudayaan & Warisan Seni`,
      theme: "Penyambung warisan, kasih sayang ayah, dan keunikan seni batik tradisional.",
      setting: locationName,
      timePeriod: "Era kontemporari dengan suasana warisan klasik yang hangat.",
      storyTone: "Menyentuh kalbu, puitis, bersemangat dan penuh inspirasi.",
      mainConflict: `${charName} pada mulanya tidak yakin batik mampu menjadi sesuatu yang bernilai tinggi, sehinggalah wasiat arwah ayahnya membuka matanya.`,
      beginning: `${charName} berdiri di tengah bengkel batik yang sunyi, memandang pemidang kain putih dengan perasaan ragu-ragu dan sebak.`,
      middle: "Penemuan dan pembacaan surat wasiat arwah ayah menyedarkan watak bahawa setiap titisan lilin adalah doa dan amanah pusaka.",
      climax: `${charName} menumpahkan seluruh jiwa dan tenaganya menghasilkan karya batik teragung mengikut pesan arwah ayahnya.`,
      ending: "Kain batik sutera yang siap berkilauan di bawah cahaya matahari pagi, membuktikan bahawa seni warisan adalah anugerah abadi yang tak ternilai.",
      moralMessage: "Warisan yang diiringi dengan doa dan keikhlasan hati orang tua tidak akan pernah lupus, malah menjadi obor penyuluh masa depan."
    };

    craftSceneActions = [
      {
        title: "Di Ruang Bengkel Yang Sunyi",
        objective: "Menyerlahkan konflik keraguan dalam diri pewaris warisan.",
        action: `${charName} berdiri di tengah bengkel batik arwah ayahnya yang sunyi, memandang pemidang kain putih dengan perasaan ragu-ragu dan sebak.`,
        dialogueText: "Bolehkah aku teruskan perniagaan ini, Ayah? Dunia moden sudah tidak memandang batik...",
        speaker: charName,
        emotion: "Ragu-ragu, sayu dan bimbang",
        cam: { shotType: "Medium Wide Shot", lens: "35mm f/2.0", movement: "Slow Dolly In capturing empty workshop" },
        narration: "Di ruang yang pernah dipenuhi gelak tawa dan aroma lilin panas, kini hanya sunyi yang menemani sekeping hati yang mencari arah.",
        sfx: [{ name: "Deruan angin luar bengkel & geseran kerusi kayu", volume: "50%", purpose: "Menonjolkan suasana bengkel yang sunyi dan kesepian" }],
        musicCue: "Melodi seruling perlahan dan sayu menggambarkan kerinduan"
      },
      {
        title: "Surat Yang Mengubah Segalanya",
        objective: "Menemui amanah rahsia yang mencetuskan titik perubahan batin.",
        action: `${charName} membuka laci meja kayu arwah ayahnya dan menemui sekeping surat usang. Jemarinya membuka lipatan kertas dengan perlahan sambil membaca bait tulisan tangan ayahnya.`,
        dialogueText: "Setiap titisan lilin bukan sekadar corak, anakku... ia adalah doa ayah agar kamu kuat menempuh badai kehidupan.",
        speaker: "Pak Hassan",
        emotion: "Terharu, tersentuh jiwa dan insaf",
        cam: { shotType: "Close-Up", lens: "85mm f/1.4", movement: "Slow Pan from handwritten ink to tear rolling down cheek" },
        narration: "Warkah usang itu tidak sekadar mengandungi tulisan, tetapi hembusan doa seorang ayah yang merentasi batas masa.",
        sfx: [{ name: "Laci kayu ditarik & helaian kertas surat dibuka perlahan", volume: "65%", purpose: "Memberi impak emosi detik membaca wasiat ayah" }],
        musicCue: "Petikan gambus lembut dan hangat menyentuh jiwa"
      },
      {
        title: "Menyalakan Kembali Api Warisan",
        objective: "Membangkitkan azam baharu dengan menyalakan dapur lilin.",
        action: `${charName} menyapu air matanya, menarik nafas dengan azam baharu, lalu menyalakan api kecil di bawah periuk lilin batik dan mengambil canting tembaga arwah ayahnya.`,
        dialogueText: "Ayah tak pernah tinggalkan aku keseorangan. Jiwa ayah ada dalam setiap canting ini.",
        speaker: charName,
        emotion: "Tekad, berani dan penuh pengharapan",
        cam: { shotType: "Medium Close-Up", lens: "50mm f/1.8", movement: "Smooth tracking following the canting into molten wax" },
        narration: "Api kecil dinyalakan, dan bersama percikan itu, menyala kembali obor keberanian yang sekian lama malap.",
        sfx: [{ name: "Percikan api pemetik lilin & celupan canting tembaga", volume: "60%", purpose: "Menandakan kebangkitan azam dan permulaan karya" }],
        musicCue: "Rentak rebab dan piano beransur yakin dan bertenaga"
      },
      {
        title: "Tarian Canting Di Atas Sutera",
        objective: "Memperlihatkan ketelitian melakar motif dengan canting panas.",
        action: `${charName} mula melakar motif flora Melayu di atas kain sutera putih dengan canting panas. Aliran lilin mengalir sempurna dan yakin tanpa sebarang getaran di tangannya.`,
        dialogueText: "Lihatlah, Ayah... tangan ini mula merasai apa yang Ayah rasakan selama ini.",
        speaker: charName,
        emotion: "Fokus mutlak, keindahan dan kelegaan",
        cam: { shotType: "Extreme Close-Up", lens: "100mm Macro f/2.8", movement: "Macro glide following glowing amber wax onto white silk fibers" },
        narration: "Jari-jemari menari di atas kanvas sutera; bukan lilin yang mencorak kain, tetapi ketulusan hati yang melakar doa abadi.",
        sfx: [{ name: "Hembusan lembut canting & desiran lilin panas cair pada sutera", volume: "70%", purpose: "Foley intim memfokuskan ketelitian seni melakar batik" }],
        musicCue: "Alunan seruling dan strings harmoni menggambarkan ketenangan dan fokus"
      },
      {
        title: "Percikan Warna Jiwa",
        objective: "Menyuntik warna-warna asli ke dalam corak batik.",
        action: `${charName} menyapukan warna-warna asli pada motif batik; warna biru indigo dan merah manggis meresap hidup ke dalam kain sutera membentuk mahakarya unik.`,
        dialogueText: "Batik ini bukan sekadar kain hiasan... ia adalah identiti dan martabat kita.",
        speaker: charName,
        emotion: "Penuh kekaguman dan bangga",
        cam: { shotType: "Medium Shot", lens: "50mm f/1.4", movement: "Arc shot rotating around the vibrant colored batik frame" },
        narration: "Warna-warna tradisi meresap masuk, menghidupkan setiap urat kain menjadi lambang jati diri yang memukau mata.",
        sfx: [{ name: "Kocokan berus pewarna & titisan air warna pada kain sutera", volume: "60%", purpose: "Menghidupkan proses mewarna batik tradisional yang meriah" }],
        musicCue: "Kombinasi gambus dan perkusi halus bernada ceria dan megah"
      },
      {
        title: "Cahaya Warisan Abadi",
        objective: "Membentangkan karya siap berkilauan di bawah matahari pagi.",
        action: `${charName} membentangkan kain batik sutera yang telah siap di halaman bengkel di bawah biasan matahari pagi. Angin mengibarkan kain batik itu dengan megah, membuktikan keunikan yang tiada tandingan.`,
        dialogueText: "Terima kasih, Ayah. Surat ayah telah menghidupkan kembali impian kita.",
        speaker: charName,
        emotion: "Kejayaan, kesyukuran yang mendalam dan damai",
        cam: { shotType: "Wide Shot", lens: "24mm f/2.8", movement: "Majestic slow crane rise revealing the fluttering batik against blue sky" },
        narration: "Maka bergemalah keindahan warisan dalam hembusan angin pagi, sebuah bukti bahawa kasih dan doa ibu bapa tidak akan pernah pudar.",
        sfx: [{ name: "Kibaran kain batik sutera ditiup bayu pagi & kicauan burung kampung", volume: "60%", purpose: "Suasana kemenangan, kelegaan dan keindahan karya siap" }],
        musicCue: "Orkestra melodi tradisi Melayu penuh kemegahan, harapan dan kesyukuran"
      }
    ];
  }

  // =========================================================================
  // DOMAIN 2: UKIRAN (Seni Ukiran Kayu Melayu & Hubungan Guru-Murid)
  // =========================================================================
  else if (domain === "UKIRAN") {
    locationName = isMalay ? "Bengkel Ukiran Kayu Tradisional, Terengganu" : "Traditional Woodcarving Workshop";
    activeProps = ["Pahat kuku", "Tukul kayu", "Papan cengal", "Minyak pengilat linsid"];

    characters.push({
      id: "CHAR_001",
      name: "Pak Rahman",
      role: isMalay ? "Tukang Ukir Mahaguru" : "Master Woodcarver",
      age: 48,
      gender: "Male",
      nationality: "Malaysian",
      ethnicity: "Malay",
      faceDescription: "Warm weathered tan face with fine laugh lines, distinguished sharp cheekbones, neatly trimmed salt-and-pepper beard, serene expressive dark brown eyes.",
      skinTone: "Warm weathered tan Asian skin texture",
      hair: "Short black hair with subtle silver streaks at temples",
      hairStyle: "Traditional neat side-parting",
      eyeColor: "Deep warm brown",
      bodyType: "Medium wiry lean build, strong artisan hands",
      height: "172 cm",
      clothing: "Traditional dark brown teluk belanga cotton Baju Melayu with rolled-up sleeves, dark charcoal trousers",
      shoes: "Simple brown leather sandals",
      accessories: "Silver ring on right ring finger",
      personality: "Calm, philosophical, deeply patient",
      emotionalTraits: "Protective of cultural heritage, paternal",
      voiceCharacteristics: "Deep, resonant Malaysian Malay male voice, 0.9x speed",
      speakingStyle: "Uses poetic Malay metaphors, reflective pauses",
      typicalFacialExpressions: "Soft knowing smile, gentle brow furrow when focusing",
      typicalGestures: "Caresses wood surface with fingertips to feel grain",
      movementStyle: "Deliberate, grounded posture",
      backstory: "Mewarisi seni ukiran kayu daripada leluhurnya dan berikrar mendidik generasi baharu.",
      isLocked: true,
      lockedDescription: "A 48-year-old Malay Malaysian master woodcarver, medium lean build with strong artisan hands, warm weathered tan face with fine laugh lines, short black hair with subtle silver-grey at temples, neatly trimmed salt-and-pepper beard, wearing a dark brown cotton Baju Melayu with sleeves rolled up to mid-forearm, charcoal trousers, and leather sandals."
    });

    characters.push({
      id: "CHAR_002",
      name: "Amir",
      role: isMalay ? "Perantis / Anak Murid Muda" : "Young Apprentice",
      age: 19,
      gender: "Male",
      nationality: "Malaysian",
      ethnicity: "Malay",
      faceDescription: "Youthful olive complexion, sharp inquisitive dark brown eyes, earnest and determined expression.",
      skinTone: "Sun-kissed olive tan",
      hair: "Thick natural black hair with casual side-swept fringe",
      hairStyle: "Modern casual crop",
      eyeColor: "Bright dark brown",
      bodyType: "Slim athletic build",
      height: "175 cm",
      clothing: "Muted indigo blue cotton kurta shirt with rolled sleeves, beige work trousers",
      shoes: "Worn tan canvas shoes",
      accessories: "Wooden pencil behind right ear",
      personality: "Eager to learn, talented, slightly impatient",
      emotionalTraits: "Respectful, strives to overcome haste",
      voiceCharacteristics: "Young, clear Malaysian Malay tenor voice, speed 1.05x",
      speakingStyle: "Polite student diction using 'Pak'",
      typicalFacialExpressions: "Intense concentration biting lip slightly",
      typicalGestures: "Fidgets with mallet, wipes brow",
      movementStyle: "Dynamic, quick",
      backstory: "Pemuda yang kembali ke desa demi mendalami rahsia ukiran pusaka tulen.",
      isLocked: true,
      lockedDescription: "A 19-year-old Malay Malaysian apprentice carver, slim athletic build, youthful sun-kissed olive face with sharp earnest dark brown eyes, thick textured black hair with casual side-swept fringe, wearing a muted indigo blue cotton kurta with rolled sleeves, beige work trousers, and a wooden pencil behind his right ear."
    });

    soundDesign = {
      overallMusicTheme: "Tradisi Melayu Kontemporari (Seruling, Gambus & Cello)",
      instruments: ["Seruling Buluh", "Gambus", "Gendang Halus", "Rebab", "Cello"],
      bpmRange: "60 - 80 BPM",
      mixNotes: "Muzik dikawal di bawah vokal untuk kejelasan sebutan bahasa Melayu.",
      ambientFoleyTrack: "Bunyi pahat kayu, desiran angin jerjak, burung berkicau."
    };

    story = {
      title: params.name || "Warisan Ukiran: Jiwa Dalam Kayu",
      logline: params.idea,
      genre: `${params.videoStyle} Drama Kebudayaan & Falsafah Melayu`,
      theme: "Kesabaran, ketekunan, dan nilai falsafah ketuhanan dalam seni ukiran kayu Melayu.",
      setting: locationName,
      timePeriod: "Era kontemporari dengan suasana warisan klasik yang tenang.",
      storyTone: "Nostalgik, tenang, berwibawa, penuh emosi dan falsafah mendalam.",
      mainConflict: "Amir terlalu tergopoh-gopoh mengejar hasil cepat tanpa memahami roh di sebalik setiap liuk motif ukiran Awan Larat.",
      beginning: "Pak Rahman memerhatikan Amir yang memukul pemegang pahat dengan tergesa-gesa hingga matanya hilang ketelitian.",
      middle: "Pak Rahman memegang lembut tangan Amir dan mengajarkan falsafah Awan Larat yang merendah diri dan tunduk ke bawah.",
      climax: "Amir bernafas tenang dan mengukir setiap kelopak motif dengan penuh keinsafan hati dan keikhlasan jiwa.",
      ending: "Sebuah panel ukiran kayu cengal yang indah selesai dipahat; sinaran matahari petang menyinari corak ukiran, menandakan ilmu warisan berjaya diwariskan.",
      moralMessage: "Ukiran Melayu bukan sekadar hiasan fizikal, tetapi doa dan falsafah hidup yang tunduk kepada kebesaran Ilahi."
    };

    craftSceneActions = [
      {
        title: "Hembusan Di Bengkel Tua",
        objective: "Merasai tekstur kayu dan ketenangan bengkel sebelum bermula.",
        action: "Pak Rahman menyentuh permukaan papan kayu cengal yang belum diukir, merasai ira kayu dengan hujung jemarinya dalam keheningan.",
        dialogueText: "Kayu ini hidup, Amir. Jangan dipaksa, ikutlah rentak iranya.",
        speaker: "Pak Rahman",
        emotion: "Merenung, khusyuk dan tenang",
        cam: { shotType: "Medium Shot", lens: "50mm f/1.8", movement: "Slow Dolly In" },
        narration: "Sebelum mata pahat membelah ira, seorang tukang perlu belajar mendengar degup nafas alam yang tersimpan di dalam kayu.",
        sfx: [{ name: "Sentuhan jemari pada permukaan ira kayu cengal kasar", volume: "55%", purpose: "Menghayati tekstur kayu dan ketenangan bengkel" }],
        musicCue: "Alunan seruling buluh solo bernada falsafah dan hening"
      },
      {
        title: "Kegusaran Sang Perantis",
        objective: "Menyerlahkan kegopohan perantis yang mengejar masa.",
        action: "Amir memukul pemegang pahat dengan tergesa-gesa hingga matanya hilang ketelitian.",
        dialogueText: "Saya mahu selesaikan bahagian kelopak ini sebelum maghrib, Pak. Tapi kenapa garisan ini nampak kaku?",
        speaker: "Amir",
        emotion: "Kecewa, resah dan buntu",
        cam: { shotType: "Medium Close-Up", lens: "85mm f/2.0", movement: "Handheld Tracking" },
        narration: "Bila hati dikejar masa, mata hilang ketelitian dan jiwa menjauh daripada kesabaran yang dituntut.",
        sfx: [{ name: "Ketukan tukul kayu bertubi-tubi & desiran serpihan kayu jatuh", volume: "75%", purpose: "Menonjolkan kegopohan dan keresahan emosi perantis" }],
        musicCue: "Rentak gendang dan petikan gambus bertempo laju dramatik"
      },
      {
        title: "Genggaman Sang Guru",
        objective: "Meredakan ketegangan melalui bimbingan kasih seorang guru.",
        action: "Pak Rahman memegang lembut tangan Amir yang sedang menggenggam pahat, meredakan ketegangan.",
        dialogueText: "Tahan sebentar, Amir. Bila hati kamu mengejar masa, kamu lupa kayu ini sedang bernafas bersama kamu.",
        speaker: "Pak Rahman",
        emotion: "Penyayang, membimbing dan menenangkan",
        cam: { shotType: "Close-Up", lens: "85mm f/1.4", movement: "Slow Pan from hands to eyes" },
        narration: "Sentuhan seorang guru bukan untuk menghukum, tetapi menenangkan gelora hati murid yang tersasar arah.",
        sfx: [{ name: "Hentian serta-merta ketukan kayu & hembusan nafas lega", volume: "50%", purpose: "Meredakan ketegangan melalui kehadiran tenang sang guru" }],
        musicCue: "Alunan cello dan gambus yang hangat dan menenangkan hati"
      },
      {
        title: "Falsafah Awan Larat",
        objective: "Menerangkan falsafah kerendahan hati dalam motif tradisi Melayu.",
        action: "Pak Rahman menyusuri garis motif Awan Larat menerangkan kerendahan hati dalam budaya Melayu.",
        dialogueText: "Tengok corak Awan Larat ini. Daunnya meliuk, bunganya mekar, tapi puncaknya selalu tunduk ke bawah. Tiada yang meninggi diri.",
        speaker: "Pak Rahman",
        emotion: "Mengagumi dan berfalsafah",
        cam: { shotType: "Over-the-Shoulder", lens: "35mm f/2.0", movement: "Slow orbit" },
        narration: "Awan Larat bukan sekadar bunga ukiran, ia adalah cermin pekerti orang Melayu yang semakin berisi semakin tunduk merendah diri.",
        sfx: [{ name: "Ukiran pahat licin menyusuri urat kayu motif Awan Larat", volume: "65%", purpose: "Foley ketelitian ukiran halus penuh penghayatan" }],
        musicCue: "Harmoni seruling dan rebab puitis menggambarkan nilai kerendahan hati"
      },
      {
        title: "Pencerahan Di Mata Perantis",
        objective: "Mengukir dengan keinsafan dan rentak nafas yang tenang.",
        action: "Amir meletakkan kedua tapak tangannya di atas kayu dengan niat baru.",
        dialogueText: "Jadi, setiap garisan yang kita ukir... sebenarnya adalah doa dan tanda syukur kita, Pak?",
        speaker: "Amir",
        emotion: "Insaf dan tenang",
        cam: { shotType: "Close-Up", lens: "85mm f/1.8", movement: "Slow Tilt Up" },
        narration: "Kefahaman membuka pintu hati; kini bukan lagi tangan yang memahat, tetapi jiwa yang berzikir dalam kesyukuran.",
        sfx: [{ name: "Habuk kayu ditiup lembut & ketukan tukul berirama santai", volume: "60%", purpose: "Menandakan perantis kini mengukir dengan keikhlasan jiwa" }],
        musicCue: "Melodi gambus dan piano lembut penuh kesedaran rohani"
      },
      {
        title: "Obor Warisan Terus Menyala",
        objective: "Menatap panel ukiran siap berkilauan di bawah mentari senja.",
        action: "Pak Rahman dan Amir berdiri bersama memandang panel ukiran kayu yang siap berkilauan di bawah matahari senja.",
        dialogueText: "Esok kita mula ukir pintu masjid, anakku. Jiwa kamu sudah bersedia.",
        speaker: "Pak Rahman",
        emotion: "Harapan masa depan dan keyakinan teguh",
        cam: { shotType: "Wide Shot", lens: "24mm f/2.8", movement: "Slow pull out" },
        narration: "Selagi ada jiwa yang ikhlas mewarisi, selagi itulah seni ukiran bangsa tidak akan pernah hilang ditelan zaman.",
        sfx: [{ name: "Kain minyak linsid menyapu panel ukiran & desiran angin senja", volume: "55%", purpose: "Klimaks penyudah karya agung yang siap berkilau" }],
        musicCue: "Skor sinematik tradisional megah menyambut kesinambungan warisan"
      }
    ];
  }

  // =========================================================================
  // DOMAIN 3: STUDENT (Sekolah / Pelajar / Peperiksaan)
  // =========================================================================
  else if (domain === "STUDENT") {
    const roleLabel = studentGrade ? `Pelajar Sekolah (${studentGrade})` : `Pelajar Sekolah Menengah (${charAge} Tahun)`;
    locationName = isMalay ? "Sekolah Menengah Kebangsaan & Bilik Darjah, Malaysia" : "Malaysian Secondary School & Classroom";
    activeProps = [
      "Buku teks & buku latihan sekolah",
      "Beg galas sekolah berzip",
      "Kotak pensel & alat tulis",
      "Meja dan kerusi kayu bilik darjah"
    ];

    const schoolClothing = isFemale
      ? "Baju kurung seragam sekolah warna putih bersih dengan kain sarung biru tua (pakaian seragam sekolah menengah kebangsaan Malaysia) berserta tudung putih kemas"
      : "Kemeja sekolah putih lengan pendek kemas dengan seluar panjang warna hijau zaitun (pakaian seragam sekolah menengah kebangsaan Malaysia) dan lencana sekolah di poket dada";

    const schoolShoes = isFemale
      ? "Kasut kanvas putih sekolah dengan stoking putih kemas"
      : "Kasut sekolah kanvas hitam/putih dengan stoking kemas";

    characters.push({
      id: "CHAR_001",
      name: charName,
      role: roleLabel,
      age: charAge,
      gender: charGender,
      nationality: "Malaysian",
      ethnicity: "Malay",
      faceDescription: isFemale
        ? "Wajah remaja polos yang ceria, mata gelap bersinar penuh rasa ingin tahu dan keazaman untuk belajar, senyuman manis dan bersopan."
        : "Wajah remaja cerdas dengan tatapan mata gelap yang fokus, ekspresi bersemangat dan berdisiplin.",
      skinTone: "Warm natural Asian tan skin",
      hair: isFemale ? "Neat black hair tucked neatly under a white school tudung" : "Neat short school-regulation dark black hair",
      hairStyle: isFemale ? "Neat school headscarf" : "Short regulation school haircut",
      eyeColor: "Deep expressive dark brown",
      bodyType: "Youthful slender teenage build",
      height: isFemale ? "154 cm" : "165 cm",
      clothing: schoolClothing,
      shoes: schoolShoes,
      accessories: "Lencana sekolah rasmi di dada, jam tangan digital ringkas, dan beg galas",
      personality: "Rajin, bersemangat untuk menimba ilmu, menghormati guru dan rakan sekelas, tabah menghadapi peperiksaan",
      emotionalTraits: "Rasa ingin tahu yang tinggi, azam untuk berjaya, setia kawan",
      voiceCharacteristics: isFemale
        ? `Suara remaja perempuan Malaysia yang ceria, santun dan bertenaga (${charAge} tahun)`
        : `Suara remaja lelaki Malaysia yang bersemangat dan jelas (${charAge} tahun)`,
      speakingStyle: "Bahasa Melayu standard percakapan harian murid sekolah yang sopan",
      typicalFacialExpressions: "Senyuman mesra, kening berkerut sedikit bila berfikir tekun, mata berbinar teruja",
      typicalGestures: "Memegang pemegang beg galas, membuka helaian buku dengan teliti, mengangkat tangan bertanya soalan",
      movementStyle: "Cekap, cergas dan penuh tenaga remaja",
      backstory: `Watak utama ${roleLabel} berumur ${charAge} tahun yang mengharungi cabaran hidup dan persekolahan berpandukan idea: "${idea}".`,
      isLocked: true,
      lockedDescription: `A ${charAge}-year-old Malaysian ${charGender === "Female" ? "female student" : "male student"} named ${charName}, ${charGender === "Female" ? "wearing a neat Malaysian national secondary school uniform (clean white Baju Kurung with deep navy blue skirt and white headscarf)" : "wearing a neat Malaysian national secondary school uniform (clean white short-sleeved collared shirt and olive green trousers)"}, carrying a school backpack and holding study books, youthful Asian facial features with earnest dark brown eyes.`
    });

    characters.push({
      id: "CHAR_002",
      name: "Cikgu Rohani",
      role: "Guru Pembimbing Sekolah",
      age: 42,
      gender: "Female",
      nationality: "Malaysian",
      ethnicity: "Malay",
      faceDescription: "Wajah tenang, penyayang dan berwibawa dengan cermin mata berbingkai nipis.",
      skinTone: "Natural tan",
      hair: "Bertudung bawal kemas",
      hairStyle: "Tudung bawal",
      eyeColor: "Coklat gelap",
      bodyType: "Sederhana",
      height: "158 cm",
      clothing: "Baju kurung moden corak batik lembut dan kasut tumit rendah",
      shoes: "Kasut kerja hitam",
      accessories: "Pen merah guru dan buku rekod mengajar",
      personality: "Penyayang, berdedikasi tinggi, sentiasa memberi semangat kepada murid",
      emotionalTraits: "Empati dan bersabar",
      voiceCharacteristics: "Suara guru wanita matang yang mesra dan memberi inspirasi",
      speakingStyle: "Bahasa Melayu formal yang lembut dan membina",
      typicalFacialExpressions: "Senyuman dorongan dan anggukan tanda bangga",
      typicalGestures: "Menepuk lembut bahu murid tanda sokongan",
      movementStyle: "Anggun dan tenang",
      backstory: "Guru berpengalaman yang sentiasa percaya bahawa setiap murid mempunyai potensi untuk berjaya.",
      isLocked: true,
      lockedDescription: "A 42-year-old Malaysian Malay female teacher Cikgu Rohani, gentle and inspiring presence, wearing a modest modern Baju Kurung and glasses, holding teaching notes."
    });

    soundDesign = {
      overallMusicTheme: "Akustik Inspirasi Sekolah & Belia (Acoustic Guitar, Warm Piano & Inspiring Strings)",
      instruments: ["Gitar Akustik", "Piano Hangat", "Violin Lembut", "Loceng Sekolah (Foley)"],
      bpmRange: "72 - 88 BPM",
      mixNotes: "Muzik segar bertenaga belia, mengekalkan kejelasan vokal dialog murid sekolah.",
      ambientFoleyTrack: "Suasana bilik darjah, helaian buku diselak, loceng sekolah, desiran angin pagi."
    };

    story = {
      title: params.name || "Menara Impian: Titian Kejayaan",
      logline: params.idea,
      genre: `${params.videoStyle} Drama Inspirasi Remaja & Pendidikan`,
      theme: "Ketekunan menuntut ilmu, kecekalan menghadapi peperiksaan, dan membalas jasa ibu bapa.",
      setting: locationName,
      timePeriod: "Era persekolahan moden yang segar dan penuh harapan.",
      storyTone: "Bertenaga, menyentuh kalbu, realistik dan bersemangat.",
      mainConflict: `Tekanan menghadapi peperiksaan yang sukar dan kebimbangan mampukah ${charName} membuktikan kemampuannya serta membanggakan keluarga.`,
      beginning: `${charName} melangkah ke sekolah dengan azam baharu namun diuji dengan nota pelajaran dan tugasan yang mencabar.`,
      middle: `Detik keraguan melanda saat menelaah bersendirian, tetapi kata-kata semangat ibu bapa dan guru membakar kembali keazamannya.`,
      climax: `${charName} menjawab kertas peperiksaan dengan tenang, penuh keyakinan dan daya konsentrasi yang tajam.`,
      ending: `${charName} menerima slip keputusan cemerlang sambil menitiskan air mata gembira bersama guru dan keluarga.`,
      moralMessage: "Tiada jalan pintas menuju kejayaan; ketekunan, disiplin dan doa restu ibu bapa adalah kunci membuka masa depan gemilang."
    };

    craftSceneActions = [
      {
        title: "Langkah Pertama Ke Bilik Darjah",
        objective: "Memulakan hari persekolahan dengan azam dan harapan baharu.",
        action: `${charName} (${charAge} tahun) melangkah masuk ke pekarangan sekolah sambil membetulkan tali beg galasnya, memandang ke arah papan kenyataan dengan penuh keazaman.`,
        dialogueText: "Tahun ini aku berjanji pada diri sendiri untuk berusaha bersungguh-sungguh demi masa depanku.",
        speaker: charName,
        emotion: "Bersemangat dan optimis",
        cam: { shotType: "Medium Shot", lens: "50mm f/1.8", movement: "Slow Tracking Shot mengikut langkah pelajar" },
        narration: "Setiap langkah melintasi pintu pagar sekolah adalah titian pertama mengukir impian masa hadapan.",
        sfx: [{ name: "Loceng sekolah berbunyi & derap kasut kanvas di koridor", volume: "60%", purpose: "Menghidupkan suasana pagi di pekarangan sekolah" }],
        musicCue: "Petikan gitar akustik segar bersemangat menyongsong hari baharu"
      },
      {
        title: "Cabaran Di Meja Belajar",
        objective: "Menyerlahkan ketekunan menelaah konsep pelajaran yang sukar.",
        action: `${charName} duduk tekun di mejanya menelaah buku pelajaran di hadapannya, mencatat nota penting dengan penuh konsentrasi.`,
        dialogueText: "Walau sesukar mana pun soalan ini, aku takkan mengalah sehingga aku benar-benar memahaminya.",
        speaker: charName,
        emotion: "Fokus mendalam dan tekad",
        cam: { shotType: "Medium Close-Up", lens: "85mm f/2.0", movement: "Slow Dolly In ke arah buku catatan" },
        narration: "Ilmu tidak datang dengan angan-angan, ia hadir bersama helaian nota yang dibaca dan kefahaman yang digali.",
        sfx: [{ name: "Helaian buku teks diselak & gesekan mata pensel menulis di atas kertas", volume: "65%", purpose: "Mewujudkan suasana fokus dan ketekunan mengulangkaji" }],
        musicCue: "Alunan piano lembut berirama fokus dan menenangkan"
      },
      {
        title: "Detik Keraguan & Ujian Kecekalan",
        objective: "Menonjolkan keraguan batin dan tekanan harapan orang tua.",
        action: `${charName} termenung seketika di tepi tingkap kelas, memerhati titisan hujan sambil memikirkan harapan ibu bapa terhadap dirinya.`,
        dialogueText: "Kadangkala aku berasa bimbang... mampukah aku buktikan bahawa usaha ini akan membuahkan hasil?",
        speaker: charName,
        emotion: "Ragu-ragu namun berhati waja",
        cam: { shotType: "Close-Up", lens: "85mm f/1.4", movement: "Slow Pan dari tingkap ke mata pelajar yang bertekad" },
        narration: "Di sebalik kesunyian bilik darjah petang, terselit rasa takut mengecewakan insan yang sentiasa berkorban untuknya.",
        sfx: [{ name: "Titisan hujan di cermin tingkap kelas & hembusan nafas perlahan", volume: "50%", purpose: "Menyerlahkan rasa cemas, beban harapan dan refleksi diri" }],
        musicCue: "Gesekan cello melankolik mencerminkan cabaran emosi remaja"
      },
      {
        title: "Sinar Pencerahan & Bimbingan",
        objective: "Memperoleh pencerahan konsep hasil tunjuk ajar dan kecekalan.",
        action: `${charName} mengangguk faham selepas Cikgu Rohani menunjukkan kaedah penyelesaian yang tepat, senyuman kelegaan terukir di bibirnya.`,
        dialogueText: "Alhamdulillah! Bila kita tidak berputus asa dan bertanya, akhirnya jalan kejayaan pasti terbuka luas.",
        speaker: charName,
        emotion: "Lega, gembira dan bersyukur",
        cam: { shotType: "Close-Up", lens: "50mm f/1.8", movement: "Slow Arc Shot" },
        narration: "Bimbingan seorang guru bagaikan lilin yang menerangi sudut gelap, mengembalikan keyakinan yang hampir pudar.",
        sfx: [{ name: "Pensel diletakkan di atas meja & hembusan nafas lega gembira", volume: "60%", purpose: "Menyampaikan detik pemahaman konsep dan kelegaan" }],
        musicCue: "Melodi piano ceria beransur meningkat penuh harapan"
      },
      {
        title: "Ketekunan Menjelang Penilaian",
        objective: "Mengulangkaji secara berdisiplin bersama rakan sebaya.",
        action: `${charName} bersama rakan-rakan di perpustakaan sekolah mengulangkaji pelajaran dengan penuh disiplin dan tolong-menolong.`,
        dialogueText: "Kejayaan lebih bermakna apabila kita saling menyokong antara satu sama lain.",
        speaker: charName,
        emotion: "Kerjasama dan ukhuwah",
        cam: { shotType: "Over-the-Shoulder", lens: "35mm f/2.0", movement: "Slow Orbit" },
        narration: "Kejayaan bukan perlumbaan bersendirian, tetapi perjalanan bersama sahabat yang saling menguatkan tekad.",
        sfx: [{ name: "Bisikan perbincangan perlahan di perpustakaan & tarikan kerusi kayu", volume: "55%", purpose: "Menghidupkan suasana belajar berkumpulan dan setia kawan" }],
        musicCue: "Harmoni gitar akustik dan strings membangkitkan inspirasi"
      },
      {
        title: "Kejayaan Membanggakan",
        objective: "Meraikan kejayaan peperiksaan dengan rasa syukur mendalam.",
        action: `${charName} tersenyum lebar memegang slip keputusan cemerlangnya di hadapan bangunan sekolah, bersedia melangkah ke masa hadapan.`,
        dialogueText: "Usaha ini untuk ibu, ayah dan guru yang sentiasa mempercayai kemampuanku!",
        speaker: charName,
        emotion: "Kesyukuran, bangga dan berwawasan",
        cam: { shotType: "Wide Shot", lens: "24mm f/2.8", movement: "Slow Cinematic Pull Back" },
        narration: "Keringat yang tumpah berganti air mata kesyukuran; impian yang dikejar kini menjadi kenyataan yang menerangi masa depan.",
        sfx: [{ name: "Sorakan riang rakan sekelas, sampul keputusan dibuka & tepukan gemuruh", volume: "70%", purpose: "Klimaks kejayaan, kesyukuran dan kebanggaan sejati" }],
        musicCue: "Orkestra akustik strings megah, bertenaga dan penuh kemenangan"
      }
    ];
  }

  // =========================================================================
  // DOMAIN 4: BUSINESS (Perniagaan / Usahawan / Kedai / Gerai / Kopi / Rezeki)
  // =========================================================================
  else if (domain === "BUSINESS") {
    locationName = isMalay ? "Gerai Perniagaan Komuniti & Kawasan Komersial Jalanan" : "Community Street Stall & Commercial Area";
    activeProps = [
      "Peralatan jualan & penyediaan produk",
      "Buku lejar akaun & nota perniagaan",
      "Bekas simpanan wang modal",
      "Papan tanda menu jualan yang kemas"
    ];

    characters.push({
      id: "CHAR_001",
      name: charName,
      role: "Peniaga Muda Berwawasan",
      age: charAge,
      gender: charGender,
      nationality: "Malaysian",
      ethnicity: "Malay",
      faceDescription: isFemale
        ? "Wajah cerah bertenaga dengan senyuman mesra pelanggan, tatapan mata yang tekad dan berani memulakan langkah."
        : "Wajah pemuda berazam tinggi, raut wajah matang dengan senyuman jujur dan tatapan mata fokus.",
      skinTone: "Natural Asian tan",
      hair: isFemale ? "Tudung bawal kemas warna pastel" : "Potongan rambut pendek kemas",
      hairStyle: isFemale ? "Neat scarf" : "Short crop",
      eyeColor: "Deep brown",
      bodyType: "Aktif dan cergas",
      height: isFemale ? "160 cm" : "172 cm",
      clothing: isFemale
        ? "Baju kurung moden ringkas dengan apron perniagaan berlogo sendiri"
        : "Kemeja lengan pendek kasual dengan apron kanvas peniaga kemas",
      shoes: "Kasut kanvas tahan lasak",
      accessories: "Jam tangan ringkas dan beg silang penyimpan wang modal",
      personality: "Jujur, rajin, mesra pelanggan, tabah menghadapi pasang surut jualan",
      emotionalTraits: "Cekal, tidak mudah mengalah, berfikiran positif",
      voiceCharacteristics: isFemale
        ? "Suara ramah mesra yang menyambut pelanggan dengan penuh santun"
        : "Suara bertenaga, yakin dan penuh kesungguhan berniaga",
      speakingStyle: "Percakapan mesra pelanggan santai bersopan",
      typicalFacialExpressions: "Senyuman manis menyapa pelanggan, fokus tekun mengira jualan",
      typicalGestures: "Menyerahkan bungkusan pesanan dengan kedua belah tangan",
      movementStyle: "Pantas, cekap dan berdisiplin",
      backstory: `Peniaga muda berjiwa cekal yang memberanikan diri membina perniagaan berpandukan idea: "${idea}".`,
      isLocked: true,
      lockedDescription: `A ${charAge}-year-old Malaysian entrepreneur named ${charName}, wearing a clean barista/artisan canvas apron over modest clothing, energetic welcoming expression, handling business tools.`
    });

    soundDesign = {
      overallMusicTheme: "Sinematik Semangat Rezeki (Acoustic Guitar, Warm Piano & Inspiring Rhythm)",
      instruments: ["Gitar Akustik", "Piano Inspirasi", "Perkusi Ringan", "Warm Strings"],
      bpmRange: "75 - 90 BPM",
      mixNotes: "Muzik membakar semangat keusahawanan dan mengekalkan kehangatan rasa bersyukur.",
      ambientFoleyTrack: "Desiran wap minuman/masakan, bunyi cawan, langkah kaki pelanggan, desiran angin pagi."
    };

    story = {
      title: params.name || "Aroma Rezeki: Langkah Pertama",
      logline: params.idea,
      genre: `${params.videoStyle} Drama Inspirasi Sosioekonomi & Usahawan`,
      theme: "Keberanian memulakan perniagaan dari bawah, keikhlasan mencari rezeki halal, dan ketabahan menghadapi pasang surut jualan.",
      setting: locationName,
      timePeriod: "Era kontemporari dengan suasana keusahawanan komuniti yang hangat.",
      storyTone: "Positif, bersemangat, menyentuh hati dan penuh inspirasi.",
      mainConflict: "Modal simpanan yang terhad dan detik-detik awal perniagaan yang sepi menguji kesabaran dan tekad watak.",
      beginning: `${charName} membuka gerai jualan pada waktu subuh dingin dengan penuh harapan walaupun serba sederhana.`,
      middle: `Dugaan hujan lebat dan jualan perlahan hampir mematahkan semangat, namun ${charName} menambah baik kualiti dan perkhidmatan.`,
      climax: `Pelanggan mula beratur panjang setelah keenakan produk dan layanan mesra ${charName} tular dalam komuniti.`,
      ending: `Perniagaan ${charName} bertapak kukuh, membawa rezeki halal dan kebanggaan kepada keluarga.`,
      moralMessage: "Rezeki yang diusahakan dengan titik peluh halal dan keikhlasan hati tidak akan pernah salah alamat."
    };

    craftSceneActions = [
      {
        title: "Subuh Di Gerai Kecil",
        objective: "Menyerlahkan keberanian memulakan perniagaan sebelum terbit mentari.",
        action: `${charName} membuka payung kanopi gerai dan menyusun peralatan jualan dengan kemas sebelum matahari terbit.`,
        dialogueText: "Bismillah... setiap rezeki besar bermula dengan langkah kecil pada hari ini.",
        speaker: charName,
        emotion: "Tekad dan optimis",
        cam: { shotType: "Medium Shot", lens: "50mm f/1.8", movement: "Slow Dolly In" },
        narration: "Rezeki tidak pernah menunggu, ia dicari dengan keberanian melangkah sebelum terbit matahari.",
        sfx: [{ name: "Bunyi meja lipat dibuka & susunan cawan jualan", volume: "60%", purpose: "Menghidupkan suasana persediaan awal perniagaan" }],
        musicCue: "Petikan gitar akustik segar bersemangat menyongsong pagi"
      },
      {
        title: "Pelanggan Pertama & Senyuman Ikhlas",
        objective: "Menyambut pelanggan pertama dengan layanan mesra dan berkualiti.",
        action: `${charName} menyambut pelanggan pertama dengan senyuman mesra dan menyediakan pesanan dengan teliti.`,
        dialogueText: "Terima kasih banyak! Jemput rasa resipi istimewa kami hari ini.",
        speaker: charName,
        emotion: "Mesra dan bersyukur",
        cam: { shotType: "Medium Close-Up", lens: "85mm f/2.0", movement: "Handheld Tracking" },
        narration: "Kemanisan perniagaan bermula daripada layanan ikhlas yang menyentuh hati pelanggan.",
        sfx: [{ name: "Desiran penyediaan bahan jualan & dentingan sudu", volume: "65%", purpose: "Foley kehangatan penyediaan produk jualan" }],
        musicCue: "Melodi piano ceria berirama sederhana"
      },
      {
        title: "Dugaan Langit Mendung",
        objective: "Menghadapi cabaran cuaca buruk dan jualan perlahan.",
        action: `${charName} memandang langit gelap yang mula menurunkan titisan hujan lebat sambil menyelamatkan barangan jualan.`,
        dialogueText: "Walau hari ini hujan dan pelanggan sepi, aku tahu Tuhan sedang menguji kesabaranku.",
        speaker: charName,
        emotion: "Cemas namun cekal",
        cam: { shotType: "Close-Up", lens: "85mm f/1.4", movement: "Slow Pan from rain to resilient eyes" },
        narration: "Pasang surut perniagaan adalah medan menempa hati yang tidak mudah mengaku kalah.",
        sfx: [{ name: "Guruh berdentum perlahan & rintik hujan di atas kanopi gerai", volume: "60%", purpose: "Menyerlahkan cabaran dugaan cuaca perniagaan jalanan" }],
        musicCue: "Alunan strings melankolik mencerminkan kecekalan jiwa"
      },
      {
        title: "Inovasi & Resipi Baharu",
        objective: "Memperbaiki mutu produk dan strategi perniagaan demi pelanggan.",
        action: `${charName} mencuba adunan dan resipi baharu dengan teliti, memastikan kualiti produk berada pada tahap terbaik.`,
        dialogueText: "Bila kita ikhlas memberi yang terbaik, orang pasti akan merasai nilainya.",
        speaker: charName,
        emotion: "Fokus dan bersemangat",
        cam: { shotType: "Close-Up", lens: "50mm f/1.8", movement: "Slow Arc Shot" },
        narration: "Dalam setiap kesukaran, sentiasa ada ruang untuk mencipta sesuatu yang lebih bernilai.",
        sfx: [{ name: "Kocokan adunan & aroma segar wap wap produk", volume: "65%", purpose: "Menonjolkan proses inovasi dan ketelitian mutu produk" }],
        musicCue: "Rentak piano bertenaga membangkitkan inspirasi"
      },
      {
        title: "Barisan Pelanggan Menghangatkan Suasana",
        objective: "Meraikan sambutan hangat orang ramai terhadap perniagaan.",
        action: `Orang ramai mula beratur panjang di hadapan gerai ${charName}, suasana menjadi riuh dengan senyuman pelanggan yang berpuas hati.`,
        dialogueText: "Alhamdulillah, terima kasih semua atas sokongan yang tidak putus-putus!",
        speaker: charName,
        emotion: "Gembira dan terharu",
        cam: { shotType: "Over-the-Shoulder", lens: "35mm f/2.0", movement: "Slow Orbit" },
        narration: "Keringat yang tumpah akhirnya berbalas dengan kepercayaan komuniti yang mekar menghangatkan suasana.",
        sfx: [{ name: "Suara riuh pelanggan berbual mesra & bunyi loceng pesanan", volume: "65%", purpose: "Suasana kemeriahan gerai dikunjungi ramai pelanggan" }],
        musicCue: "Irama akustik riang bertenaga dan penuh kegembiraan"
      },
      {
        title: "Langkah Membina Empayar Kecil",
        objective: "Menyusun perancangan masa depan dengan rasa syukur mendalam.",
        action: `${charName} mengira hasil jualan hari itu bersama senyuman syukur dan memandang ke arah masa depan dengan yakin.`,
        dialogueText: "Ini baru permulaan... impian ini akan terus membesar demi masa depan keluarga.",
        speaker: charName,
        emotion: "Kesyukuran mendalam dan berwawasan",
        cam: { shotType: "Wide Shot", lens: "24mm f/2.8", movement: "Slow Cinematic Pull Back" },
        narration: "Daripada sebuah gerai kecil, terukir masa depan gemilang yang dibina atas kejujuran dan ketekunan.",
        sfx: [{ name: "Helaian buku lejar ditutup kemas & desiran angin petang", volume: "60%", purpose: "Menandakan pengakhiran hari niaga yang berjaya" }],
        musicCue: "Orkestra akustik strings megah penuh inspirasi dan kesyukuran"
      }
    ];
  }

  // =========================================================================
  // DOMAIN 5: HEALTHCARE (Doktor / Jururawat / Hospital / Barisan Hadapan)
  // =========================================================================
  else if (domain === "HEALTHCARE") {
    locationName = isMalay ? "Hospital & Bilik Rawatan Kecemasan" : "Hospital & Emergency Care Unit";
    activeProps = [
      "Stetoskop perubatan",
      "Carta pesakit & fail klinikal",
      "Monitor denyutan nadi ECG",
      "Peralatan rawatan kecemasan"
    ];

    characters.push({
      id: "CHAR_001",
      name: charName,
      role: "Pegawai Perubatan / Doktor Berdedikasi",
      age: 28,
      gender: charGender,
      nationality: "Malaysian",
      ethnicity: "Malay",
      faceDescription: "Wajah tenang, ekspresi berwibawa dan penuh belas ihsan, mata fokus dan berdisiplin tinggi.",
      skinTone: "Natural tan",
      hair: isFemale ? "Neat tudung under scrub cap" : "Neat clinical short haircut",
      hairStyle: "Professional",
      eyeColor: "Dark brown",
      bodyType: "Lean professional build",
      height: isFemale ? "162 cm" : "175 cm",
      clothing: "Hospital clinical scrubs with white doctor's coat, ID badge clip",
      shoes: "Comfortable medical clogs",
      accessories: "Medical stethoscope draped around neck, digital wristwatch with seconds counter",
      personality: "Tenang di saat genting, berempati tinggi, cekap membuat keputusan",
      emotionalTraits: "Penyayang, berjiwa cekal, tidak mudah panik",
      voiceCharacteristics: "Nada suara tenang, meyakinkan dan memberi ketenteraman kepada pesakit",
      speakingStyle: "Bahasa Melayu profesional yang penuh belas kasihan",
      typicalFacialExpressions: "Fokus mendalam semasa memeriksa pesakit, senyuman meyakinkan",
      typicalGestures: "Memeriksa nadi pesakit dengan jari telunjuk, mencatat pemerhatian",
      movementStyle: "Tegas, pantas dan tenang",
      backstory: `Doktor perubatan yang berpegang teguh pada amanah menyelamatkan nyawa berpandukan idea: "${idea}".`,
      isLocked: true,
      lockedDescription: `A 28-year-old Malaysian doctor named ${charName}, wearing medical scrubs and a white doctor's lab coat, stethoscope around neck, focused compassionate expression.`
    });

    soundDesign = {
      overallMusicTheme: "Sinematik Kemanusiaan Hospital (Piano Syahdu, Cello Mendalam & Strings)",
      instruments: ["Piano Syahdu", "Cello Mendalam", "Strings Ensemble", "Subtle Cinematic Synth"],
      bpmRange: "65 - 78 BPM",
      mixNotes: "Muzik menyentuh jiwa kemanusiaan dan kelegaan saat nyawa diselamatkan.",
      ambientFoleyTrack: "Bip monitor denyutan jantung, derap kasut bergegas di koridor, desiran pintu automatik hospital."
    };

    story = {
      title: params.name || "Nadi Harapan: Amanah Putih",
      logline: params.idea,
      genre: `${params.videoStyle} Drama Kemanusiaan & Realiti Perubatan`,
      theme: "Dedikasi merawat pesakit, amanah kemanusiaan, dan ketenangan jiwa di saat genting.",
      setting: locationName,
      timePeriod: "Era kontemporari di sebuah hospital bandar yang sibuk.",
      storyTone: "Cemas, berwibawa, mengharukan dan penuh harapan.",
      mainConflict: "Detik kecemasan genting apabila nyawa pesakit tergantung pada tindakan pantas dan ketepatan kepakaran doktor.",
      beginning: `${charName} memulakan syif perubatan dengan penuh dedikasi meneliti setiap carta pesakit.`,
      middle: `Loceng amaran kecemasan berbunyi; keadaan pesakit merosot dan ${charName} bertindak dengan tenang mengawal situasi.`,
      climax: `${charName} mengetuai prosedur rawatan kecemasan dengan fokus yang tajam dan berjaya menstabilkan pesakit.`,
      ending: `Pesakit sedar semula dan keluarga pesakit menzahirkan ucapan terima kasih yang tidak terhingga.`,
      moralMessage: "Menyelamatkan nyawa adalah amanah mulia yang menuntut keikhlasan, ilmu dan pengorbanan jiwa."
    };

    craftSceneActions = [
      {
        title: "Memulakan Syif Penuh Amanah",
        objective: "Menyerlahkan dedikasi doktor di awal syif hospital.",
        action: `${charName} melangkah masuk ke wad kecemasan sambil memeriksa stetoskopnya, bersedia menempuh sebarang situasi.`,
        dialogueText: "Setiap minit di sini adalah amanah nyawa yang perlu aku jaga dengan sebaik mungkin.",
        speaker: charName,
        emotion: "Fokus dan berazam",
        cam: { shotType: "Medium Shot", lens: "50mm f/1.8", movement: "Tracking Shot along hospital corridor" },
        narration: "Di lorong putih ini, tiada ruang untuk kelalaian; setiap detik adalah jambatan antara keputusasaan dan harapan.",
        sfx: [{ name: "Derap langkah kasut bergegas & bip monitor di latar belakang", volume: "55%", purpose: "Menghidupkan suasana klinikal hospital" }],
        musicCue: "Melodi piano syahdu bertempo perlahan dan penuh hormat"
      },
      {
        title: "Detik Penilaian Kritikal",
        objective: "Membuat penilaian rapi terhadap keadaan pesakit.",
        action: `${charName} memeriksa denyutan nadi pesakit dan meneliti carta klinikal dengan penuh ketelitian.`,
        dialogueText: "Bertenang pakcik... kami ada di sini untuk membantu pakcik pulih.",
        speaker: charName,
        emotion: "Penyayang dan tenang",
        cam: { shotType: "Medium Close-Up", lens: "85mm f/2.0", movement: "Slow Dolly In" },
        narration: "Bukan sekadar ubat yang menyembuhkan, tetapi ketenangan dan kata-kata perangsang yang menyejukkan hati pesakit.",
        sfx: [{ name: "Helaian carta pesakit diselak & hembusan nafas tenang", volume: "60%", purpose: "Foley keheningan bilik rawatan pesakit" }],
        musicCue: "Gesekan cello halus mencerminkan empati mendalam"
      },
      {
        title: "Siren Amaran & Gelora Cemas",
        objective: "Menghadapi saat kecemasan genting yang mencabar ketahanan mental.",
        action: `Monitor jantung berbunyi cemas; ${charName} segera bertindak pantas memberi arahan kepada pasukan jururawat.`,
        dialogueText: "Tekanan darah merosot! Sediakan peralatan bantuan pernafasan sekarang juga!",
        speaker: charName,
        emotion: "Cemas namun tegas dan terkawal",
        cam: { shotType: "Close-Up", lens: "50mm f/1.4", movement: "Fast Handheld Motion" },
        narration: "Detik genting membelah keheningan; di sinilah keberanian dan ketenangan diuji pada tahap tertinggi.",
        sfx: [{ name: "Bip monitor laju & derap kasut pasukan perubatan bergegas", volume: "75%", purpose: "Membangkitkan ketegangan situasi cemas kecemasan" }],
        musicCue: "Rentak strings berdebar memuncak dramatik"
      },
      {
        title: "Ketepatan Tindakan Penyelamat",
        objective: "Melakukan prosedur kecemasan dengan ketepatan pakar.",
        action: `${charName} mengendalikan prosedur rawatan kecemasan dengan fokus mutlak, peluh dingin di dahi tidak menghalang ketelitian tangannya.`,
        dialogueText: "Bertahanlah... kami takkan biarkan kamu pergi.",
        speaker: charName,
        emotion: "Fokus mutlak dan keazaman tinggi",
        cam: { shotType: "Extreme Close-Up", lens: "100mm Macro f/2.8", movement: "Glide Tracking" },
        narration: "Di hujung jemari yang mahir, bersatu ilmu, kepakaran dan doa mengharap belas Ihsan Ilahi.",
        sfx: [{ name: "Desiran peralatan perubatan & tarikan sarung tangan getah", volume: "65%", purpose: "Menyerlahkan ketelitian tindakan pembedahan / kecemasan" }],
        musicCue: "Piano solo bertenaga dan penuh konsentrasi"
      },
      {
        title: "Degupan Menjadi Tenang",
        objective: "Menstabilkan pesakit dan menikmati saat kelegaan.",
        action: `Monitor menunjukkan graf denyutan jantung kembali stabil dan sekata; ${charName} melepaskan nafas lega bersama pasukannya.`,
        dialogueText: "Alhamdulillah... degupan jantungnya kembali stabil. Dia selamat.",
        speaker: charName,
        emotion: "Lega dan bersyukur mendalam",
        cam: { shotType: "Close-Up", lens: "85mm f/1.4", movement: "Slow Tilt Up" },
        narration: "Bila degupan kembali tenang, sirnalah mendung kegelapan digantikan dengan sinar fajar kehidupan.",
        sfx: [{ name: "Bip monitor denyutan jantung stabil & hembusan nafas lega", volume: "60%", purpose: "Detik kelegaan saat pesakit kembali stabil" }],
        musicCue: "Harmoni piano dan strings lembut melegakan hati"
      },
      {
        title: "Sinar Kehidupan Baharu",
        objective: "Menyaksikan pesakit sedar dan disambut tangisan syukur keluarga.",
        action: `${charName} tersenyum melihat pesakit membuka mata dan menggenggam tangan ahli keluarganya yang menitiskan air mata syukur.`,
        dialogueText: "Terima kasih atas segala doa dan kepercayaan anda semua.",
        speaker: charName,
        emotion: "Kesyukuran murni dan kedamaian jiwa",
        cam: { shotType: "Wide Shot", lens: "24mm f/2.8", movement: "Slow Cinematic Pull Back" },
        narration: "Tiada ganjaran lebih bermakna di dunia ini selain melihat sebutir senyuman yang kembali hidup di wajah seorang insan.",
        sfx: [{ name: "Suara sebak ucapan terima kasih keluarga pesakit & tepukan lembut", volume: "60%", purpose: "Klimaks kesyukuran dan kemanusiaan" }],
        musicCue: "Orkestra sinematik megah penuh kehangatan kasih sayang"
      }
    ];
  }

  // =========================================================================
  // DOMAIN 6: RESCUE (Bomba / Polis / Penyelamat / Kemalangan / Bencana)
  // =========================================================================
  else if (domain === "RESCUE") {
    locationName = isMalay ? "Pusat Operasi Menyelamat & Lokasi Misi Kecemasan" : "Emergency Rescue Operations Center";
    activeProps = ["Peralatan menyelamat taktikal", "Lampu suluh kuasa tinggi", "Radio walkie-talkie kecemasan", "Tali penyelamat"];

    characters.push({
      id: "CHAR_001",
      name: charName,
      role: "Anggota Penyelamat Berani",
      age: 27,
      gender: charGender,
      nationality: "Malaysian",
      ethnicity: "Malay",
      faceDescription: "Wajah berani, raut wajah tegas dengan tatapan mata yang tidak gentar menghadapi bahaya.",
      skinTone: "Sun-kissed tan",
      hair: "Potongan rambut tentera / kemas",
      hairStyle: "Regulation short",
      eyeColor: "Dark brown",
      bodyType: "Tegap dan tangkas",
      height: isFemale ? "165 cm" : "178 cm",
      clothing: "Seragam operasi penyelamat berjalur pantul cahaya, jaket tahan lasak",
      shoes: "But keselamatan taktikal",
      accessories: "Topi keledar keselamatan, sarung tangan operasi tugas berat",
      personality: "Berani, berdisiplin tinggi, mengutamakan keselamatan orang lain",
      emotionalTraits: "Pantas bertindak, berjiwa waja",
      voiceCharacteristics: "Suara tegas, berwibawa dan penuh kawalan situasi",
      speakingStyle: "Bahasa Melayu tegas arahan operasi taktikal",
      typicalFacialExpressions: "Fokus tajam, ketabahan menghadapi api/rintangan",
      typicalGestures: "Memeriksa tali keselamatan, memberi isyarat tangan kepada pasukan",
      movementStyle: "Pantas, tangkas dan berwaspada",
      backstory: `Wira barisan hadapan yang bersumpah melindungi nyawa orang awam berpandukan idea: "${idea}".`,
      isLocked: true,
      lockedDescription: `A 27-year-old Malaysian rescue personnel named ${charName}, wearing reflective emergency rescue gear and safety helmet, determined courageous expression.`
    });

    soundDesign = {
      overallMusicTheme: "Sinematik Aksi Dramatik & Harapan (Action Brass, Heroic Strings & Driving Percussion)",
      instruments: ["Heroic Horns", "Driving Drums", "Cinematic Strings", "Emergency Foley"],
      bpmRange: "80 - 100 BPM",
      mixNotes: "Muzik dramatik berdebar menaikkan debaran misi menyelamat dan kelegaan pelerai.",
      ambientFoleyTrack: "Siren kenderaan kecemasan, semboyan radio walkie-talkie, deruan angin ribut/air mengalir."
    };

    story = {
      title: params.name || "Wira Keberanian: Menongkah Bahaya",
      logline: params.idea,
      genre: `${params.videoStyle} Aksi Drama & Misi Menyelamat`,
      theme: "Keberanian menempuh bahaya demi menyelamatkan nyawa dan mendahulukan keselamatan orang awam.",
      setting: locationName,
      timePeriod: "Detik genting misi menyelamat waktu kecemasan.",
      storyTone: "Tegang, berani, mendebarkan dan penuh kelegaan.",
      mainConflict: "Misi menyelamat berisiko tinggi di mana setiap saat menentukan antara keselamatan mangsa dan bahaya maut.",
      beginning: `${charName} menerima panggilan kecemasan dan bersiap pantas menyertai pasukan operasi.`,
      middle: `Tiba di zon bahaya dengan cabaran halangan fizikal yang mengancam nyawa mangsa.`,
      climax: `${charName} merempuh halangan dengan berani dan membawa mangsa keluar ke tempat yang selamat.`,
      ending: `Operasi berjaya sepenuhnya tanpa kemalangan jiwa; mangsa selamat dipangkuan insan tersayang.`,
      moralMessage: "Keberanian sejati adalah sanggup mengorbankan keselesaan diri demi memastikan insan lain selamat."
    };

    craftSceneActions = [
      {
        title: "Panggilan Misi Kecemasan",
        objective: "Menerima amaran kecemasan dan bertindak balas pantas.",
        action: `${charName} menyarung seragam operasi dan memasang radio taktikal sebaik sahaja siren berbunyi.`,
        dialogueText: "Panggilan kecemasan diterima! Pasukan, bersedia bergerak dalam masa dua minit!",
        speaker: charName,
        emotion: "Pantas dan bersiap siaga",
        cam: { shotType: "Medium Shot", lens: "35mm f/2.0", movement: "Fast Tracking Shot" },
        narration: "Bila wisel kecemasan berbunyi, setiap degup jantung diselaraskan dengan panggilan sebuah amanah.",
        sfx: [{ name: "Siren balai penyelamat & derap but bergegas", volume: "70%", purpose: "Membangkitkan kesegeraan misi menyelamat" }],
        musicCue: "Rentak perkusi bertenaga dan debaran brass bersiap sedia"
      },
      {
        title: "Menuju Zon Bahaya",
        objective: "Mengharungi rintangan perjalanan menuju lokasi kejadian.",
        action: `Kenderaan operasi memecut membelah hujan/asap dengan lampu kecemasan berkelip terang.`,
        dialogueText: "Kekal fokus dan pastikan semua peralatan keselamatan dikunci rapi.",
        speaker: charName,
        emotion: "Tegang dan berwaspada",
        cam: { shotType: "Wide Shot", lens: "24mm f/2.8", movement: "Dynamic Pursuit Shot" },
        narration: "Menuju ke tempat di mana orang lain melarikan diri; itulah pilihan jiwa sang penyelamat.",
        sfx: [{ name: "Deruan enjin kenderaan & guruh ribut di luar", volume: "65%", purpose: "Foley perjalanan pantas dalam cuaca buruk" }],
        musicCue: "Irama rentak strings laju dan dramatik"
      },
      {
        title: "Menjejak Mangsa Yang Terperangkap",
        objective: "Mengesan kedudukan mangsa di sebalik bahaya.",
        action: `${charName} menyalakan lampu suluh taktikal dan meneliti runtuhan/arus air, memanggil suara mangsa.`,
        dialogueText: "Ada sesiapa di dalam? Jangan takut, kami datang untuk membantu anda!",
        speaker: charName,
        emotion: "Cemas namun cekal",
        cam: { shotType: "Close-Up", lens: "50mm f/1.8", movement: "Handheld Point-of-View Search" },
        narration: "Di tengah kegelapan dan kekeliruan, sebutir cahaya suluhan membawa seribu harapan.",
        sfx: [{ name: "Lampu suluh diselaraskan & seruan suara memanggil mangsa", volume: "60%", purpose: "Menghidupkan ketegangan pencarian mangsa" }],
        musicCue: "Gesekan cello perlahan penuh debaran dan saspens"
      },
      {
        title: "Detik Tindakan Berani",
        objective: "Merempuh halangan genting demi menyelamatkan mangsa.",
        action: `${charName} mengikat tali penyelamat dan meredah halangan berbahaya untuk mencapai tangan mangsa.`,
        dialogueText: "Pegang tangan saya kuat-kuat! Saya takkan lepaskan anda!",
        speaker: charName,
        emotion: "Keberanian mutlak",
        cam: { shotType: "Extreme Close-Up", lens: "85mm f/1.4", movement: "Fast Dynamic Arc" },
        narration: "Dua tangan bertaut di batas bahaya; keberanian menewaskan ketakutan dalam sekelip mata.",
        sfx: [{ name: "Hentakan tali penyelamat & hembusan nafas bergelut", volume: "75%", purpose: "Klimaks aksi pergelutan menyelamatkan mangsa" }],
        musicCue: "Orkestra memuncak hebat dengan brass gemuruh"
      },
      {
        title: "Keluar Ke Zon Selamat",
        objective: "Membawa mangsa keluar ke kawasan selamat.",
        action: `${charName} mendukung dan memimpin mangsa keluar daripada zon bahaya menuju ke khemah rawatan.`,
        dialogueText: "Tarik nafas perlahan-lahan... anda sudah selamat sekarang.",
        speaker: charName,
        emotion: "Lega dan pelindung",
        cam: { shotType: "Medium Shot", lens: "50mm f/1.4", movement: "Slow Steady Tracking" },
        narration: "Melangkah keluar dari zon maut membawa nikmat sebutir helaan nafas yang kembali berharga.",
        sfx: [{ name: "Sorakan kelegaan pasukan & hembusan nafas mangsa", volume: "65%", purpose: "Menandakan mangsa berjaya diselamatkan" }],
        musicCue: "Harmoni strings beransur hangat dan penuh kesyukuran"
      },
      {
        title: "Misi Berjaya Disempurnakan",
        objective: "Menyaksikan pertemuan mangsa dengan keluarga tercinta.",
        action: `${charName} membuka topi keledarnya, memerhati mangsa memeluk ahli keluarganya dengan linangan air mata gembira.`,
        dialogueText: "Semua selamat. Misi selesai dengan jayanya.",
        speaker: charName,
        emotion: "Kesyukuran mendalam dan bangga",
        cam: { shotType: "Wide Shot", lens: "24mm f/2.8", movement: "Slow Cinematic Rise" },
        narration: "Bila tugas terlaksana dan nyawa selamat, hilanglah segala penat lelah berganti kemuliaan sebuah bakti.",
        sfx: [{ name: "Tepukan bahu rakan sepasukan & radio melapor misi selesai", volume: "60%", purpose: "Penutup misi keselamatan yang membanggakan" }],
        musicCue: "Skor sinematik megah penuh inspirasi dan penghormatan wira"
      }
    ];
  }

  // =========================================================================
  // DOMAIN 7: SPORTS (Sukan / Bola / Badminton / Atlet / Olahraga / Juara)
  // =========================================================================
  else if (domain === "SPORTS") {
    locationName = isMalay ? "Stadium & Kompleks Sukan Olahraga" : "Sports Stadium & Athletics Complex";
    activeProps = ["Kasut larian trek bertali", "Jam randik latihan", "Botol minuman sukan", "Baton larian & medal"];

    characters.push({
      id: "CHAR_001",
      name: charName,
      role: "Atlet Berdisiplin & Berazam Tinggi",
      age: 20,
      gender: charGender,
      nationality: "Malaysian",
      ethnicity: "Malay",
      faceDescription: "Wajah muda bertenaga, mata fokus tajam memandang garisan sasaran, raut wajah berdisiplin kental.",
      skinTone: "Sun-kissed athlete bronze",
      hair: isFemale ? "Neat sports hijab" : "Short athletic taper",
      hairStyle: "Sports fit",
      eyeColor: "Dark brown",
      bodyType: "Atletik, tegap dan berdaya tahan",
      height: isFemale ? "165 cm" : "176 cm",
      clothing: "Jersi sukan Malaysia moden dengan seluar trek regang dan jaket pemanas badan",
      shoes: "Kasut larian trek spike berprestasi tinggi",
      accessories: "Jam tangan pintar pemantau degupan jantung",
      personality: "Kental, tidak mengenal putus asa, berdisiplin tinggi, menghormati jurulatih",
      emotionalTraits: "Semangat juang membara, tenang menghadapi tekanan",
      voiceCharacteristics: "Suara bertenaga, jelas dan bersemangat",
      speakingStyle: "Bahasa Melayu ringkas penuh motivasi diri",
      typicalFacialExpressions: "Fokus membara di blok permulaan, senyuman puas di garisan penamat",
      typicalGestures: "Mengetuk dada tanda semangat, membetulkan ikatan tali kasut",
      movementStyle: "Pantas, berirama dan penuh ledakan tenaga",
      backstory: `Atlet muda yang bertekad menewaskan batasan dirinya demi menggapai kejayaan berpandukan idea: "${idea}".`,
      isLocked: true,
      lockedDescription: `A 20-year-old Malaysian athlete named ${charName}, athletic build, wearing performance athletic sportswear, focused determined eyes on the running track.`
    });

    soundDesign = {
      overallMusicTheme: "Skor Semangat Juang Sukan (Energetic Percussion, Building Strings & Heroic Climax)",
      instruments: ["Epic Taiko Drums", "Driving Acoustic Bass", "Building Strings", "Stadium Foley"],
      bpmRange: "85 - 110 BPM",
      mixNotes: "Muzik menaikkan degupan jantung penonton seiring kepantasan larian watak.",
      ambientFoleyTrack: "Derap tapak kasut di trek getah sintetik, helaan nafas kencang atlet, wisel jurulatih, guruh sorakan stadium."
    };

    story = {
      title: params.name || "Garisan Akhir: Jiwa Sang Juara",
      logline: params.idea,
      genre: `${params.videoStyle} Drama Sukan & Semangat Juang`,
      theme: "Disiplin latihan harian, semangat juang pantang berundur, dan menjulang maruah diri serta pasukan.",
      setting: locationName,
      timePeriod: "Musim kejohanan sukan berprestij tinggi.",
      storyTone: "Bersemangat tinggi, mendebarkan, bertenaga dan penuh inspirasi.",
      mainConflict: "Kelesuan fizikal dan cabaran mengatasi rekod peribadi serta saingan sengit lawan yang berpengalaman.",
      beginning: `${charName} memulakan sesi latihan subuh dingin yang menuntut kekuatan otot dan ketahanan mental.`,
      middle: `Detik kekalahan dalam saringan awal menguji semangat, tetapi teguran membina jurulatih mencetuskan azam baharu.`,
      climax: `Pusingan akhir bermula; ${charName} memecut bertenaga di selekoh terakhir melangkaui had kemampuan dirinya.`,
      ending: `${charName} melintasi garisan penamat sebagai pemenang diiringi tepukan gemuruh penonton.`,
      moralMessage: "Kemenangan sejati bukan sekadar menewaskan pesaing, tetapi menewaskan rasa putus asa dalam diri sendiri."
    };

    craftSceneActions = [
      {
        title: "Disiplin Di Awal Fajar",
        objective: "Memulakan rutin latihan subuh yang menguji ketahanan fizikal.",
        action: `${charName} mengikat tali kasut sukannya dengan kemas di tepi trek larian stadium yang masih berkabus dingin.`,
        dialogueText: "Juara tidak dilahirkan di atas podium, tetapi dibina semasa orang lain masih lena tidur.",
        speaker: charName,
        emotion: "Fokus dan berdisiplin",
        cam: { shotType: "Medium Close-Up", lens: "50mm f/1.8", movement: "Slow Dolly In" },
        narration: "Setiap titisan peluh di waktu subuh adalah bayaran tunai untuk detik gemilang di kemudian hari.",
        sfx: [{ name: "Tali kasut diketatkan & derap langkah memanaskan badan", volume: "60%", purpose: "Menghidupkan rutin permulaan atlet" }],
        musicCue: "Petikan bass bertenaga beransur meningkat perlahan"
      },
      {
        title: "Ujian Had Ketahanan",
        objective: "Mengharungi kesakitan otot dan keletihan mental dalam latihan.",
        action: `${charName} memecut di selekoh trek sambil dadanya berombak kencang menahan keletihan fizikal.`,
        dialogueText: "Sikit lagi... jangan berhenti bila penat, berhenti bila sudah selesai!",
        speaker: charName,
        emotion: "Kental dan menahan cabaran",
        cam: { shotType: "Medium Shot", lens: "85mm f/2.0", movement: "Fast Tracking Shot alongside runner" },
        narration: "Bila otot merayu untuk berhenti, di situlah jiwa dipaksa untuk terus melangkah.",
        sfx: [{ name: "Helaan nafas kencang atlet & derap tapak kasut di trek", volume: "65%", purpose: "Foley daya usaha fizikal yang maksimum" }],
        musicCue: "Rentak perkusi berdebar semakin rancak"
      },
      {
        title: "Kata Perangsang Sang Jurulatih",
        objective: "Mendapat suntikan semangat baharu daripada bimbingan jurulatih.",
        action: `Jurulatih menghulurkan botol air kepada ${charName} dan menepuk bahunya sambil menunjukkan catatan masa jam randik.`,
        dialogueText: "Teknik kamu sudah tepat. Sekarang, buktikan pada hati kamu bahawa kamu layak menjadi juara.",
        speaker: charName,
        emotion: "Insaf dan membara",
        cam: { shotType: "Close-Up", lens: "85mm f/1.4", movement: "Slow Pan from stopwatch to eyes" },
        narration: "Suntikan kata-kata keyakinan mampu memadamkan seribu keraguan dalam diri seorang pejuang.",
        sfx: [{ name: "Botol air dibuka & bunyi klik jam randik", volume: "55%", purpose: "Menandakan detik penilaian strategi sukan" }],
        musicCue: "Melodi strings hangat memberi ketenangan dan tekad"
      },
      {
        title: "Di Garisan Permulaan",
        objective: "Berada di blok permulaan dengan fokus membara.",
        action: `${charName} mengambil tempat di blok permulaan, menarik nafas dalam dan memandang tepat ke arah garisan penamat.`,
        dialogueText: "Inilah saatnya. Demi negara, keluarga dan impian yang aku perjuangkan.",
        speaker: charName,
        emotion: "Fokus mutlak",
        cam: { shotType: "Extreme Close-Up", lens: "100mm Macro f/2.8", movement: "Intense Eye Focus" },
        narration: "Seluruh stadium seakan membisu; hanya degup jantung sendiri yang bergema membilang saat.",
        sfx: [{ name: "Keheningan stadium & tembakan pistol pelepas berdentum", volume: "75%", purpose: "Detik permulaan perlumbaan sukan berprestij" }],
        musicCue: "Irama hening yang tiba-tiba meledak penuh kuasa"
      },
      {
        title: "Pecutan Selekoh Terakhir",
        objective: "Mengerahkan seluruh tenaga jiwa menyaingi pesaing teratas.",
        action: `${charName} memecut dengan seluruh kekuatan di selekoh terakhir, memintas lawan setapak demi setapak diiringi sorakan gemuruh.`,
        dialogueText: "Ya Allah... beri aku kekuatan untuk melangkah ke hadapan!",
        speaker: charName,
        emotion: "Semangat juang membara",
        cam: { shotType: "Medium Shot", lens: "50mm f/1.4", movement: "Fast Dynamic Crane Tracking" },
        narration: "Di garisan lurus penentuan, bukan lagi otot yang berlari, tetapi seluruh jiwa raga yang terbang meluncur.",
        sfx: [{ name: "Sorakan gegak gempita stadium & derap larian memuncak", volume: "75%", purpose: "Klimaks perlumbaan olahraga" }],
        musicCue: "Orkestra memuncak hebat dengan paluan dram bergemuruh"
      },
      {
        title: "Menjulang Mahkota Kemenangan",
        objective: "Melintasi garisan penamat dan meraikan kejayaan teragung.",
        action: `${charName} mendepakan tangan melintasi garisan penamat di tempat pertama, tersungkur sujud syukur di atas trek larian.`,
        dialogueText: "Alhamdulillah! Terima kasih atas segala doa dan sokongan semua!",
        speaker: charName,
        emotion: "Kesyukuran mendalam dan kebanggaan sejati",
        cam: { shotType: "Wide Shot", lens: "24mm f/2.8", movement: "Slow Cinematic Pull Back into the sky" },
        narration: "Bila garisan penamat direntasi, tertunailah janji seorang pejuang yang tidak pernah tunduk pada kekalahan.",
        sfx: [{ name: "Sorakan riuh penonton & helaan nafas kesyukuran", volume: "70%", purpose: "Perayaan kejayaan seorang juara sukan" }],
        musicCue: "Skor sinematik megah penuh kemegahan dan inspirasi"
      }
    ];
  }

  // =========================================================================
  // DOMAIN 8: SILAT (Seni Persilatan Melayu, Pendekar dan Gelanggang Warisan)
  // =========================================================================
  else if (domain === "SILAT") {
    locationName = isMalay ? "Gelanggang Silat Warisan Melayu Tradisional" : "Traditional Malay Martial Arts Gelanggang";
    activeProps = [
      "Keris warisan berlok lima dengan hulu berukir",
      "Bengkung silat merah tua berikat rapi",
      "Tanjak destar lipatan dendam tak sudah",
      "Gendang silat ibu dan anak serta gong tembaga",
      "Kain samping songket tenun hitam emas"
    ];

    characters.push({
      id: "CHAR_001",
      name: charName || "Pendekar Danial",
      role: isMalay ? "Pendekar Muda dan Pewaris Gelanggang" : "Young Silat Disciple and Heir",
      age: charAge || 24,
      gender: charGender,
      nationality: "Malaysian",
      ethnicity: "Malay",
      faceDescription: isFemale
        ? "Wajah ayu penuh ketegasan dan tumpuan tajam, mata coklat gelap memancarkan ketenangan jiwa seorang pesilat wanita berhemah."
        : "Raut wajah tampan tegas, pandangan mata tajam menusuk penuh tumpuan, rahang berstruktur dengan keperibadian pendekar budiman.",
      skinTone: "Warm sun-tanned Malay complexion with radiant vitality",
      hair: isFemale ? "Rambut hitam kemas di sebalik anak tudung pendekar" : "Rambut hitam kemas disarung tanjak kain",
      hairStyle: "Traditional martial attire grooming",
      eyeColor: "Deep focused dark brown",
      bodyType: "Agile, lean athletic muscular build with grounded balance",
      height: isFemale ? "165 cm" : "178 cm",
      clothing: "Baju Melayu hitam pendekar berbutang lima, bengkung kain merah tua kemas di pinggang, seluar potong silat longgar dan destar tanjak",
      shoes: "Berkaki ayam di atas tanah gelanggang atau kasut capal tradisional",
      accessories: "Keris warisan tersisip sopan di sisi bengkung",
      personality: "Berdisiplin tinggi, merendah diri, tenang menghadapi provokasi, teguh memegang amanah guru",
      emotionalTraits: "Tegas luarannya namun berjiwa kasih dan penuh adab sopan Melayu",
      voiceCharacteristics: "Suara bernada tenang, dalam dan berwibawa (0.92x), penuh santun persilatan",
      speakingStyle: "Bahasa Melayu klasik kontemporari yang puitis dan padat dengan falsafah hidup",
      typicalFacialExpressions: "Pandangan mata tajam memerhati gerak lawan, bertukar senyum hormat saat bersalaman",
      typicalGestures: "Menyusun sepuluh jari membuka sembah persilatan dengan penuh tawaduk",
      movementStyle: "Langkah tapak empat yang kemas, anjal, senyap dan seimbang",
      backstory: "Membesar di sisi Mahaguru Silat, beliau dididik bahawa ilmu persilatan bukan untuk menindas atau bermegah, tetapi benteng mempertahankan kebenaran dan maruah bangsa.",
      isLocked: true,
      lockedDescription: `A ${charAge || 24}-year-old Malaysian Malay silat martial artist named ${charName || "Danial"}, athletic agile build, sharp disciplined eyes, wearing black traditional silat attire with crimson waist sash and traditional tanjak headgear, composed warrior posture.`
    });

    if (characters.length < 2) {
      characters.push({
        id: "CHAR_002",
        name: "Tok Guru Megat",
        role: isMalay ? "Mahaguru Silat dan Pembimbing Rohani" : "Grandmaster of Silat and Mentor",
        age: 68,
        gender: "Male",
        nationality: "Malaysian",
        ethnicity: "Malay",
        faceDescription: "Wajah tua berwibawa dengan kerutan kebijaksanaan, janggut putih pendek rapi, mata tenang memandang jauh ke dalam jiwa murid.",
        skinTone: "Weathered warm tan skin with deep character lines",
        hair: "Rambut dan janggut putih keperakan",
        hairStyle: "Diselimuti serban putih ringkas atau tanjak tua",
        eyeColor: "Warm spiritual dark brown, piercingly perceptive",
        bodyType: "Slender yet firmly rooted and resilient frame",
        height: "168 cm",
        clothing: "Baju kurung cekak musang putih gading lusuh bersopan, kain sarung tenun lama, dan serban ringkas",
        shoes: "Capal kulit tradisional Melayu",
        accessories: "Tasbih kayu kokka dan tongkat kayu nibong",
        personality: "Penuh hikmah, penyabar, lembut bicara namun tegas pada batas hukum dan adab",
        emotionalTraits: "Kasih kebapaan yang mendalam terhadap anak-anak gelanggang",
        voiceCharacteristics: "Suara tua yang tenang, gemersik hangat dan penuh resonans rohani",
        speakingStyle: "Bahasa kiasan Melayu penuh bidalan dan falsafah hidup warisan",
        typicalFacialExpressions: "Senyuman teduh menenangkan keresahan murid",
        typicalGestures: "Menepuk bahu murid sambil berpesan perlahan",
        movementStyle: "Langkah perlahan tetapi berakar teguh di bumi",
        backstory: "Telah mengabdikan lebih lima puluh tahun hidupnya menjaga rahsia jurus dan adab persilatan agar obor pusaka datuk nenek tidak padam ditelan zaman.",
        isLocked: true,
        lockedDescription: "A 68-year-old Malaysian Malay silat grandmaster Tok Guru Megat, weathered wise tan face with paternal smile, silver-white beard, wearing ivory traditional tunic and prayer cap, holding a nibong walking stick, deeply venerable presence."
      });
    }

    soundDesign = {
      overallMusicTheme: "Gendang Perang dan Nafas Silat Melayu (Gendang Ibu, Gong, Serunai dan Gambus Sinematik)",
      instruments: ["Gendang Silat Ibu dan Anak", "Serunai Tradisional", "Gong Tembaga", "Rebab Akustik", "Dynamic War Malay Hybrid Drums"],
      bpmRange: "80 - 115 BPM",
      mixNotes: "Muzik bermula dengan tiupan serunai syahdu di awal latihan, kemudian meledak bertenaga dengan paluan gendang silat semasa detik ujian, dan berakhir dengan gesekan rebab damai penuh kemenangan adab.",
      ambientFoleyTrack: "Geseran tapak kaki di tanah pasir gelanggang, desiran angin malam menerpa pokok kelapa, bunyi kain bengkung diketatkan, hembusan nafas berdisiplin."
    };

    story = {
      title: params.name || "Kilat Di Hujung Langkah: Roh Gelanggang",
      logline: params.idea,
      genre: `${vStyle}Aksi Seni Bela Diri dan Drama Warisan Melayu`,
      theme: "Ketinggian adab di atas kekuatan fizikal, memelihara maruah gelanggang pusaka, dan kerendahan hati seorang pejuang sejati.",
      setting: locationName,
      timePeriod: "Era kontemporari dengan aura warisan pendekar klasik.",
      storyTone: "Tegas, bersemangat, sarat falsafah, sinematik dan menyentuh jiwa.",
      mainConflict: `Ujian berat menduga kesabaran ${charName || "Pendekar"} apabila gelanggang pusaka dicabar, memaksa watak membuktikan bahawa jurus silat adalah benteng adab dan bukan alat kesombongan.`,
      beginning: `${charName || "Pendekar"} memasang kekuda tapak empat di tengah gelanggang tanah berpasir, memusatkan nafas batin di bawah naungan pohon beringin tua.`,
      middle: "Kata-kata hikmah Tok Guru mengingatkan bahawa musuh paling ganas bukan lawan di hadapan mata, melainkan nafsu amarah di dalam dada sendiri.",
      climax: `Di hadapan pencabar, ${charName || "Pendekar"} memperagakan jurus elakan pantas seperti kilat dan menyudahi pertembungan dengan kuncian mengunci tanpa menumpahkan darah.`,
      ending: "Lawan tunduk hormat mengakui kehebatan adab gelanggang; kedua-dua pesilat bersalaman merapatkan saf persaudaraan serumpun.",
      moralMessage: "Pendekar sejati tidak diukur pada berapa ramai lawan yang ditumpaskan, tetapi pada sejauh mana ia mampu menundukkan nafsunya sendiri."
    };

    craftSceneActions = [
      {
        title: "Membuka Sembah Gelanggang",
        objective: "Memulakan langkah dengan adab tawaduk dan tumpuan nafas batin.",
        action: `${charName || "Pendekar"} merapatkan kedua belah tangan menyusun jari di hadapan dada, tunduk memberi sembah gelanggang sebelum membuka kekuda tapak empat yang kemas dan berakar.`,
        dialogueText: "Bismillah... di gelanggang ini, adab dijunjung, maruah dipertahankan.",
        speaker: charName || "Pendekar",
        emotion: "Tawaduk dan fokus membara",
        cam: { shotType: "Medium Shot", lens: "50mm f/1.4", movement: "Slow Cinematic Dolly In" },
        narration: "Bumi dipijak dengan santun, langit dijunjung dengan doa; begitulah bermulanya langkah seorang pendekar.",
        sfx: [{ name: "Geseran tapak kaki di pasir dan hembusan nafas teratur", volume: "65%", purpose: "Menetapkan ketenangan dan asas persilatan yang kukuh" }],
        musicCue: "Tiupan serunai melankolik diiringi dengungan gong tembaga bergema perlahan"
      },
      {
        title: "Amanah Sang Mahaguru",
        objective: "Mendengar nasihat Tok Guru tentang falsafah keris dan jiwa.",
        action: `Tok Guru Megat menghulurkan keris berlok lima kepada ${charName || "Pendekar"}, menatap tepat ke dalam matanya dengan pesan yang menusuk kalbu.`,
        dialogueText: "Ingat anakku, keris tajam bukan untuk merobek daging, tetapi untuk memancung keangkuhan dalam diri kamu sendiri.",
        speaker: "Tok Guru Megat",
        emotion: "Penuh hikmah kebapaan",
        cam: { shotType: "Medium Close-Up", lens: "85mm f/1.4", movement: "Slow Arc Tracking" },
        narration: "Kata-kata seorang guru adalah azimat yang menyalakan pelita di celah kegelapan keraguan.",
        sfx: [{ name: "Dentang lembut hulu keris disentuh dan desiran angin malam", volume: "55%", purpose: "Mengukuhkan ikatan guru dan murid dalam ilmu warisan" }],
        musicCue: "Alunan gambus hangat disulam gesekan rebab sayu penuh makna"
      },
      {
        title: "Ujian Jurus dan Tapak Ketangkasan",
        objective: "Menguji refleks dan ketajaman deria di bawah panahan pelita gelanggang.",
        action: `${charName || "Pendekar"} meluncur tangkas mengelak hayunan bilah kayu latihan, memusingkan tubuh dengan imbangan sempurna dan mengunci sasaran dalam sekelip mata.`,
        dialogueText: "Biar lawan datang seperti ribut, jiwa kita mesti teguh seperti karang di lautan.",
        speaker: charName || "Pendekar",
        emotion: "Fokus mutlak",
        cam: { shotType: "Fast Dynamic Tracking", lens: "35mm f/1.8", movement: "Dynamic Whip Pan" },
        narration: "Kecepatan mata menyambut gerak; ketenangan hati menyambut serangan.",
        sfx: [{ name: "Desiran angin libasan bilah kayu dan dentuman tapak kaki", volume: "70%", purpose: "Menyerlahkan kepantasan fizikal dan ketangkasan bela diri" }],
        musicCue: "Paluan gendang silat rancak berselang gong bertempo laju"
      },
      {
        title: "Detik Pertembungan Klimaks",
        objective: "Menghadapi serangan kemuncak dengan ketenangan ilmu dan jurus rahsia.",
        action: `Lawan meluru menyerang bertubi-tubi, namun ${charName || "Pendekar"} membaca setiap pergerakan dengan tenang, mengelak ke sisi dan menyusup masuk ke ruang sempit.`,
        dialogueText: "Bukan kekuatan yang memenangi pertarungan, tetapi kejernihan akal di saat genting!",
        speaker: charName || "Pendekar",
        emotion: "Keberanian sejati tanpa gentar",
        cam: { shotType: "Over-the-Shoulder / Close-Up", lens: "50mm f/1.2", movement: "Fast Orbital Orbit" },
        narration: "Di ambang bahaya yang memuncak, saat sekelip mata menentukan hidup atau tewasnya maruah.",
        sfx: [{ name: "Dentuman pertembungan lengan berlapik dan derap pasir berterbangan", volume: "75%", purpose: "Klimaks aksi pertempuran silat yang mendebarkan" }],
        musicCue: "Orkestra dramatik berpadu paluan gendang perang bergemuruh tinggi"
      },
      {
        title: "Kuncian Penunduk Tanpa Darah",
        objective: "Menundukkan lawan dengan kuncian sempurna tanpa mencederakan.",
        action: `Dengan satu kilasan lembut namun bertenaga, ${charName || "Pendekar"} memerangkap lengan lawan ke belakang dan menguncinya ke bumi, menghentikan seluruh pergerakan secara mutlak.`,
        dialogueText: "Cukup sahabat. Gelanggang ini milik bersama, bukan pentas memupuk sengketa.",
        speaker: charName || "Pendekar",
        emotion: "Pemaaf dan mulia pekerti",
        cam: { shotType: "Close-Up Lock Focus", lens: "85mm f/1.4", movement: "Low Angle Push-In" },
        narration: "Kemenangan paling agung adalah saat musuh tertunduk bukan kerana kesakitan luka, tetapi kerana malu kepada adab yang mulia.",
        sfx: [{ name: "Hembusan nafas lega serentak dan pasir gelanggang kembali tenang", volume: "60%", purpose: "Menandakan pertarungan tamat dengan aman" }],
        musicCue: "Rentak dram reda serta-merta, berganti alunan serunai syahdu yang mendamaikan"
      },
      {
        title: "Menjulang Saf Persaudaraan",
        objective: "Meraikan kemuliaan adab dan menyambung silaturahim di bawah restu Tok Guru.",
        action: `${charName || "Pendekar"} menghulurkan tangan membangunkan lawannya; kedua-dua mereka berpelukan dan tunduk menyusun sembah di hadapan Tok Guru Megat yang tersenyum bangga.`,
        dialogueText: "Selagi adat dijunjung dan agama dipelihara, obor persilatan kita takkan pernah padam di bumi bertuah ini.",
        speaker: charName || "Pendekar",
        emotion: "Kesyukuran mendalam dan kebanggaan maruah",
        cam: { shotType: "Wide Cinematic Shot", lens: "24mm f/2.8", movement: "Slow Cinematic Pull Back into the starlit sky" },
        narration: "Malam berlabuh dengan keharmonian; di atas tanah pusaka ini, warisan pendekar kekal hidup membakar semangat generasi demi generasi.",
        sfx: [{ name: "Tepukan tangan anak-anak gelanggang dan hembusan bayu malam", volume: "60%", purpose: "Penutup yang menenangkan dan mengangkat maruah budaya" }],
        musicCue: "Gubahan orkestra sinematik megah bersulam gambus dan seruling penuh inspirasi kebangsaan"
      }
    ];
  }

  // =========================================================================
  // DOMAIN 9: FISHERMAN (Nelayan Laut Dalam, Meredah Ombak dan Rezeki Halal)
  // =========================================================================
  else if (domain === "FISHERMAN") {
    locationName = isMalay ? "Pangkalan Jeti Nelayan dan Lautan Gelora Pantai Timur" : "Fisherman Jetty and Open Ocean Waters";
    activeProps = [
      "Pukat tangsi hijau sarat dengan pelampung jingga",
      "Pelita gasolin antik bercahaya terang di muncung bot",
      "Enjin bot diesel bot kayu tradisional",
      "Tong ais biru menyimpan hasil tangkapan segar",
      "Kompas pelayaran vintaj dan sauh besi kukuh"
    ];

    characters.push({
      id: "CHAR_001",
      name: charName || "Pak Ali",
      role: isMalay ? "Nelayan Veteran Tabah dan Nahkoda Bot" : "Seasoned Fisher and Boat Skipper",
      age: charAge || 52,
      gender: charGender,
      nationality: "Malaysian",
      ethnicity: "Malay",
      faceDescription: "Raut wajah berkedut halus diterpa garam laut dan matahari, kulit sawo matang gelap, mata hitam tajam menatap lautan dengan ketenangan seorang nakhoda berjiwa cekal.",
      skinTone: "Deep weathered sun-tanned coastal skin",
      hair: "Rambut hitam bertompok uban perak di pelipis",
      hairStyle: "Ringkas lasak, terlindung di sebalik topi jerami atau tuala basah",
      eyeColor: "Warm weathered dark brown, penetrating and fearless",
      bodyType: "Kekar berotot tegap dibentuk oleh keringat puluhan tahun mengangkat pukat",
      height: "170 cm",
      clothing: "Kemeja lusuh berbutang lengan pendek, seluar kanvas kalis air, tuala kecil merah di leher",
      shoes: "Kasut but getah kuning nelayan",
      accessories: "Tali kompas di pergelangan tangan",
      personality: "Sangat tawakal, penyabar, tidak mudah mengeluh, amat menyayangi keluarga",
      emotionalTraits: "Teguh berani menghadapi gelora laut, lembut hatinya bila terkenang anak cucu di rumah",
      voiceCharacteristics: "Suara serak-serak basah yang tegas, lantang merentas desiran angin ombak (0.90x)",
      speakingStyle: "Dialek pesisir pantai timur yang pekat, jujur dan sarat doa tawakal",
      typicalFacialExpressions: "Merenung ufuk laut dengan tumpuan tajam beralih ke senyuman kelegaan bila pukat sarat",
      typicalGestures: "Memeriksa ikatan tali pukat dan menyapu peluh di dahi dengan tuala leher",
      movementStyle: "Langkah seimbang dan mantap di atas lantai bot yang terumbang-ambing",
      backstory: "Telah mengharungi lautan lebih tiga puluh tahun; bagi Pak Ali lautan adalah ladang rezeki yang diajar untuk dihormati, bukan ditakuti.",
      isLocked: true,
      lockedDescription: "A 52-year-old Malaysian Malay seasoned fisherman Pak Ali, weathered tanned coastal complexion with kind paternal crow's feet, muscular hands, wearing a worn work shirt with red towel around neck and yellow rubber boots, resilient seafaring presence."
    });

    soundDesign = {
      overallMusicTheme: "Akustik Gambus Pesisir dan Gelora Laut Sinematik (Acoustic Gambus, Accordion, Cello dan Ocean Strings)",
      instruments: ["Gambus Melayu", "Accordion Akustik", "Dram Orkestra Ombak", "Warm Cello", "Seruling Buluh Laut"],
      bpmRange: "65 - 90 BPM",
      mixNotes: "Muzik bermula sunyi dengan deruan enjin dan ombak subuh, meledak cemas semasa ribut melanda, dan berkembang megah keemasan saat bot pulang membawa hasil tangkapan sarat.",
      ambientFoleyTrack: "Hentakan ombak pada dinding bot kayu, deruan enjin bot diesel (tok-tok-tok), jeritan burung camar laut, desiran pukat tangsi ditarik."
    };

    story = {
      title: params.name || "Meredah Gelora: Rezeki Di Hujung Ombak",
      logline: params.idea,
      genre: `${vStyle}Drama Realiti dan Inspirasi Nelayan Lautan`,
      theme: "Ketabahan menongkah badai, keberkatan rezeki halal, dan pengorbanan suci seorang ayah demi masa depan keluarga.",
      setting: locationName,
      timePeriod: "Subuh hening hingga petang keemasan di perairan laut lepas.",
      storyTone: "Realistik, mendebarkan, menyentuh sanubari dan sarat nilai tawakal.",
      mainConflict: `Cuaca laut yang tiba-tiba bergelora dan pukat tersangkut menduga batas ketabahan ${charName || "Pak Ali"} di tengah lautan luas jauh daripada pantai.`,
      beginning: `Di waktu subuh sepi yang dingin, ${charName || "Pak Ali"} menghidupkan enjin bot kayu di jeti, menolak kemudi menuju lautan luas yang masih diselubungi kabus.`,
      middle: "Ketika pukat ditebar, angin timur bertiup kencang mencetuskan ombak besar yang menghempas bot kayu, menguji keberanian dan kekuatan jiwa watak.",
      climax: `Dengan doa tidak putus dan kudrat tulang empat kerat, ${charName || "Pak Ali"} berjaya menarik naik pukat gergasi yang berkilauan sarat dengan hasil laut keemasan.`,
      ending: "Bot nelayan membelah ombak petang menuju pulang ke jeti; senyuman anak cucu menyambut di pangkalan menjadi ubat paling manis menghapus lelah.",
      moralMessage: "Rezeki halal yang dicari dengan keringat dan tawakal tidak pernah salah alamat; sejauh mana gelora lautan, doa keluarga sentiasa menjadi sauh penyelamat."
    };

    craftSceneActions = [
      {
        title: "Menolak Bot Di Keheningan Subuh",
        objective: "Memulakan pelayaran di waktu subuh dengan doa dan tawakal.",
        action: `${charName || "Pak Ali"} menghidupkan enjin bot kayu tradisional, membiarkan bunyi deruan enjin diesel memecah kesunyian jeti sementara pelita gasolin dinyalakan di haluan.`,
        dialogueText: "Bismillah tawakkaltu 'alallah... permudahkanlah rezeki kami hari ini, ya Allah.",
        speaker: charName || "Pak Ali",
        emotion: "Tawakal dan tenang",
        cam: { shotType: "Wide Establishing Shot", lens: "24mm f/2.8", movement: "Slow Cinematic Track with the Boat" },
        narration: "Sebelum fajar menyapa bumi, di situlah bermulanya doa seorang pejuang lautan mencari sebutir rezeki.",
        sfx: [{ name: "Deruan enjin diesel bot (tok-tok-tok) dan percikan air laut tenang", volume: "65%", purpose: "Membina suasana permulaan pelayaran di waktu subuh" }],
        musicCue: "Petikan gambus solo lembut bersulam hembusan seruling laut"
      },
      {
        title: "Menebar Pukat Di Lautan Luas",
        objective: "Menebar jaring pukat dengan kemahiran tinggi di lubuk ikan.",
        action: `${charName || "Pak Ali"} berdiri tegap mengimbangi olengan bot, menghayun dan melontar pukat tangsi hijau melengkung indah membelah permukaan laut biru pekat.`,
        dialogueText: "Laut ini luas, tetapi rezeki yang tertulis untuk anak cucu takkan pernah tersasar.",
        speaker: charName || "Pak Ali",
        emotion: "Penuh harapan dan cekal",
        cam: { shotType: "Medium Shot", lens: "50mm f/1.4", movement: "Smooth Arc Shot capturing the net spread" },
        narration: "Setiap tebaran jaring adalah jalinan harapan yang diikat dengan kecekalan hati.",
        sfx: [{ name: "Desiran pukat membelah udara dan deburan jaring jatuh ke laut", volume: "60%", purpose: "Menunjukkan seni dan kemahiran menebar jaring nelayan" }],
        musicCue: "Alunan melodi accordion akustik hangat penuh rasa optimis"
      },
      {
        title: "Ujian Gelora Ombak Timur",
        objective: "Menghadapi ribut dan hempasan ombak yang tiba-tiba melanda.",
        action: `Langit bertukar kelam dan ombak besar menghempas lambung bot kayu; ${charName || "Pak Ali"} memegang kemudi erat-erat sambil mengikat tali keselamatan dengan pantas.`,
        dialogueText: "Pegang tali kuat-kuat! Jangan panik, lautan ini menguji siapa yang benar-benar berani!",
        speaker: charName || "Pak Ali",
        emotion: "Cekal dan berwaspada menghadapi bahaya",
        cam: { shotType: "Low Angle Handheld Tracking", lens: "35mm f/1.8", movement: "Violent Ocean Roll Tracking" },
        narration: "Bila laut bergelora menguji batas, hanya ketabahan jiwa yang mampu memegang kemudi haluan.",
        sfx: [{ name: "Deruan angin ribut kencang dan hempasan ombak membadai bot", volume: "75%", purpose: "Mewujudkan ketegangan genting di tengah laut bergelora" }],
        musicCue: "Gesekan strings dramatik bergelora dengan dentuman dram orkestra cemas"
      },
      {
        title: "Mengerah Keringat Menarik Pukat",
        objective: "Menarik pukat sarat dengan tangkapan di saat laut mula tenang.",
        action: `${charName || "Pak Ali"} mencengkam jaring basah, urat-urat lengannya timbul mengerahkan seluruh tenaga menarik pukat yang sarat dengan kilauan ikan perak melompat-lompat.`,
        dialogueText: "Satu... dua... tarik! Alhamdulillah, rezeki anak cucu kita sudah tiba!",
        speaker: charName || "Pak Ali",
        emotion: "Kegembiraan luar biasa dan kelegaan",
        cam: { shotType: "Close-Up on Hands and Net", lens: "85mm f/1.4", movement: "Dynamic Tight Follow Shot" },
        narration: "Di sebalik setiap titisan peluh yang jatuh ke lautan, terbayar sudah harga sebuah penantian yang panjang.",
        sfx: [{ name: "Percikan air laut, kibasan ikan segar melompat dan hembusan nafas lega", volume: "70%", purpose: "Klimaks kejayaan tangkapan rezeki nelayan" }],
        musicCue: "Muzik bertukar megah dengan rentak gambus rancak dan cello bertenaga"
      },
      {
        title: "Pelayaran Pulang Berbumbungkan Emas",
        objective: "Menyusuri jalan pulang ke daratan di bawah sinaran matahari senja.",
        action: `Bot kayu yang kini sarat dengan tong-tong ikan segar membelah ombak keemasan, ${charName || "Pak Ali"} menyapu dahi dengan tuala sambil tersenyum menatap tanah daratan di kejauhan.`,
        dialogueText: "Biar penat seharian membakar kulit, asalkan rezeki yang dibawa pulang berkat dan suci.",
        speaker: charName || "Pak Ali",
        emotion: "Syukur mendalam dan damai",
        cam: { shotType: "Golden Hour Silhouette Shot", lens: "50mm f/1.2", movement: "Slow Cinematic Tracking" },
        narration: "Tiada pelabuhan yang lebih indah selain jalan pulang ke pangkuan mereka yang setia menanti.",
        sfx: [{ name: "Enjin bot menderu perlahan (tok-tok) dan kicauan burung camar senja", volume: "55%", purpose: "Menenangkan penonton dengan suasana senja damai di laut" }],
        musicCue: "Alunan melodi gambus dan biola solo syahdu penuh kesyukuran"
      },
      {
        title: "Senyuman Di Jeti Pangkalan",
        objective: "Menyambut kepulangan di jeti bersama keluarga dan komuniti jeti.",
        action: `Bot selamat merapat ke tiang jeti; ${charName || "Pak Ali"} disambut dengan lambaian ceria anak dan cucu yang berlari di atas jambatan kayu sambil menghulurkan tangan.`,
        dialogueText: "Ayah dah pulang... bawa rezeki segar untuk kita semua makan bersama malam ini!",
        speaker: charName || "Pak Ali",
        emotion: "Kasih sayang keluarga dan kebahagiaan sejati",
        cam: { shotType: "Wide Establishing Shot", lens: "24mm f/2.8", movement: "Slow Cinematic Crane Pull-Up" },
        narration: "Keringat di lautan terhapus sekelip mata; kerana erti rezeki yang sebenar adalah kebahagiaan yang dikongsi bersama insan tercinta.",
        sfx: [{ name: "Tawa riang anak-anak, tali bot diikat pada tiang jeti dan tepukan mesra", volume: "60%", purpose: "Penutup yang hangat, menyentuh hati dan memuaskan jiwa" }],
        musicCue: "Orkestra sinematik megah penuh kehangatan inspirasi dan cinta kekeluargaan"
      }
    ];
  }

  // =========================================================================
  // DOMAIN 10: GENERAL (Kisah Kehidupan / Penceritaan Universal Berasaskan Idea)
  // =========================================================================
  else {
    locationName = isMalay ? "Latar Kisah Realiti Tempatan" : "Authentic Narrative Setting";
    activeProps = ["Buku catatan peribadi", "Peralatan harian penting", "Barangan kenangan penceritaan"];

    characters.push({
      id: "CHAR_001",
      name: charName,
      role: isMalay ? "Protagonis Utama" : "Lead Protagonist",
      age: charAge,
      gender: charGender,
      nationality: "Malaysian",
      ethnicity: "Malay",
      faceDescription: isFemale
        ? "Wajah cerdas dan ekspresif, mata coklat gelap memancarkan ketabahan jiwa dan senyuman yang tenang."
        : "Raut wajah tegas dan thoughtful, mata memancarkan keazaman kukuh dan keyakinan diri.",
      skinTone: "Warm natural Asian tan skin",
      hair: isFemale ? "Neat modest shawl" : "Clean short haircut",
      hairStyle: "Modern modest",
      eyeColor: "Deep expressive dark brown",
      bodyType: "Medium natural build",
      height: isFemale ? "162 cm" : "175 cm",
      clothing: isFemale
        ? "Pakaian kasual moden bersopan dengan tona pastel yang kemas"
        : "Kemeja ringkas kasual kemas dengan seluar gelap",
      shoes: "Kasut kasual selesa",
      accessories: "Jam tangan ringkas",
      personality: "Tabah, berdikari, berwawasan, ikhlas dalam bertindak",
      emotionalTraits: "Tenang, matang dan teguh pendirian",
      voiceCharacteristics: isFemale
        ? "Suara wanita muda yang hangat, jelas dan penuh keyakinan (0.95x)"
        : "Suara lelaki yang tenang, berwibawa dan meyakinkan (0.95x)",
      speakingStyle: "Bahasa Melayu standard percakapan harian yang santun dan articulate",
      typicalFacialExpressions: "Pandangan fokus beralih ke senyuman kelegaan dan harapan",
      typicalGestures: "Pergerakan tangan tenang dan teratur",
      movementStyle: "Poised, steady dan yakin",
      backstory: `Watak utama yang mengharungi liku-liku cabaran penceritaan berpandukan situasi: "${idea}".`,
      isLocked: true,
      lockedDescription: `A ${charAge}-year-old ${charGender.toLowerCase()} Malaysian named ${charName}, ${charGender === "Female" ? "slender graceful build, expressive dark brown eyes, wearing modern modest attire" : "medium athletic build, structured jawline, wearing casual smart clothing"}.`
    });

    soundDesign = {
      overallMusicTheme: "Sinematik Inspirasi Universal (Cinematic Inspirational Piano & Strings)",
      instruments: ["Piano Akustik", "Violin", "Cello", "Subtle Cinematic Synth"],
      bpmRange: "65 - 75 BPM",
      mixNotes: "Muzik disusun harmoni bagi menaikkan emosi penceritaan realistik.",
      ambientFoleyTrack: "Suasana semula jadi dan persekitaran realistik mengikut babak."
    };

    story = {
      title: params.name || "Cahaya Sebuah Harapan",
      logline: params.idea,
      genre: `${params.videoStyle} Drama Realiti & Penceritaan Inspirasi`,
      theme: "Keberanian melangkah ke hadapan, ketabahan menghadapi rintangan, dan keikhlasan mengejar matlamat hidup.",
      setting: locationName,
      timePeriod: "Era kontemporari dengan pencahayaan sinematik yang realistik.",
      storyTone: "Menyentuh kalbu, realistik, penuh azam dan inspirasi.",
      mainConflict: `Cabaran menduga ketabahan ${charName} dalam mengharungi situasi yang dihadapi.`,
      beginning: `${charName} memulakan hari dengan berdepan cabaran yang menguji keazaman dirinya.`,
      middle: `Detik keraguan melanda apabila rintangan merintangi jalan, mendorong ${charName} menilai kembali makna usahanya.`,
      climax: `${charName} melipatgandakan usaha dengan fokus mutlak dan keyakinan teguh untuk mengatasi halangan.`,
      ending: `Kejayaan manis dikecapi, membuktikan ketabahan hati adalah obor penerang masa hadapan.`,
      moralMessage: "Setiap cabaran hidup membawa peluang untuk menjadi lebih tabah; usaha yang tidak kenal putus asa pasti membuahkan hasil."
    };

    craftSceneActions = [
      {
        title: "Titik Mula Sebuah Perjalanan",
        objective: "Memulakan langkah pertama mengharungi situasi penceritaan.",
        action: `${charName} memulakan harinya dengan berdepan cabaran yang menguji keazaman dirinya.`,
        dialogueText: "Setiap langkah besar bermula dengan keberanian mempercayai diri sendiri.",
        speaker: charName,
        emotion: "Tekad dan berwaspada",
        cam: { shotType: "Medium Shot", lens: "50mm f/1.8", movement: "Slow Dolly In" },
        narration: "Setiap kisah bermula dengan satu keputusan berani untuk melangkah ke hadapan.",
        sfx: [{ name: "Langkah kaki yakin di atas lantai & desiran angin pagi", volume: "55%", purpose: "Membina suasana permulaan langkah baharu watak" }],
        musicCue: "Melodi piano solo minimalis beransur bangkit"
      },
      {
        title: "Ujian Yang Menduga Hati",
        objective: "Berdepan rintangan awal yang menguji ketahanan mental.",
        action: `${charName} berdepan detik keraguan apabila halangan besar merintangi jalannya.`,
        dialogueText: "Bolehkah aku buktikan bahawa impian ini mampu menjadi kenyataan?",
        speaker: charName,
        emotion: "Cemas namun berfikir mendalam",
        cam: { shotType: "Medium Close-Up", lens: "85mm f/2.0", movement: "Handheld Tracking" },
        narration: "Rintangan hadir bukan untuk menghentikan langkah, tetapi menguji sejauh mana tekad yang terpahat.",
        sfx: [{ name: "Detakan jam dinding & hela nafas berat", volume: "60%", purpose: "Menonjolkan ketegangan situasi dan tekanan cabaran" }],
        musicCue: "Gesekan cello bergetar perlahan menzahirkan keraguan"
      },
      {
        title: "Detik Pencerahan & Kesedaran",
        objective: "Menemui jawapan dalaman dan kembali tenang.",
        action: `${charName} menemui jawapan yang mengubah pandangan hidupnya secara menyeluruh.`,
        dialogueText: "Kini aku faham... nilai sebenar bukan pada kemasyhuran, tetapi pada keikhlasan hati.",
        speaker: charName,
        emotion: "Tenang dan bersyukur",
        cam: { shotType: "Close-Up", lens: "85mm f/1.4", movement: "Slow Tilt Up" },
        narration: "Ketenangan tiba bila hati menerima bahawa setiap usaha ikhlas sentiasa ada jalannya.",
        sfx: [{ name: "Hela nafas panjang penuh keinsafan & sentuhan jari pada barang kenangan", volume: "55%", purpose: "Detik kesedaran rohani dan ketenangan dalaman" }],
        musicCue: "Harmoni piano dan strings lembut menyentuh jiwa"
      },
      {
        title: "Tumpuan Mutlak Menuju Kejayaan",
        objective: "Mengerahkan usaha maksimum tanpa rasa ragu.",
        action: `${charName} melipatgandakan usaha dengan semangat membara yang tidak lagi berbelah bahagi.`,
        dialogueText: "Inilah saatnya untuk membuktikan bahawa usaha yang berterusan akan membuahkan hasil.",
        speaker: charName,
        emotion: "Fokus mutlak",
        cam: { shotType: "Extreme Close-Up", lens: "100mm Macro f/2.8", movement: "Glide Tracking" },
        narration: "Bila fokus terkunci pada matlamat, segala keraguan runtuh digantikan keyakinan teguh.",
        sfx: [{ name: "Bunyi peralatan dikendalikan dengan pantas dan kemas", volume: "65%", purpose: "Menghidupkan fokus dan ketelitian tindakan watak" }],
        musicCue: "Rentak irama bertenaga pantas yang menaikkan semangat"
      },
      {
        title: "Kejayaan Membawa Cahaya",
        objective: "Melihat hasil usaha diiktiraf dan mencapai matlamat.",
        action: `${charName} melihat hasil usahanya diiktiraf dan membawa kegembiraan kepada orang tersayang.`,
        dialogueText: "Terima kasih atas segala bimbingan, sokongan dan doa semua.",
        speaker: charName,
        emotion: "Kesyukuran mendalam",
        cam: { shotType: "Medium Shot", lens: "50mm f/1.4", movement: "Arc Shot" },
        narration: "Kegembiraan terindah adalah saat melihat senyuman terukir di wajah orang yang kita sayangi.",
        sfx: [{ name: "Ucapan syukur perlahan & bunyi tepukan tangan lembut", volume: "60%", purpose: "Detik kelegaan dan penerimaan kejayaan yang bermakna" }],
        musicCue: "Alunan melodi hangat dan damai penuh kesyukuran"
      },
      {
        title: "Masa Depan Yang Gemilang",
        objective: "Menatap hari esok dengan senyuman yakin dan harapan mekar.",
        action: `${charName} melangkah ke hadapan dengan senyuman yakin menyongsong hari esok.`,
        dialogueText: "Perjalanan ini baru bermula, dan obornya akan terus menyala menerangi jalan.",
        speaker: charName,
        emotion: "Bangga dan berharapan",
        cam: { shotType: "Wide Shot", lens: "24mm f/2.8", movement: "Slow cinematic pull back" },
        narration: "Sebuah babak ditutup dengan kejayaan, membuka pintu lembaran baharu yang penuh sinar harapan.",
        sfx: [{ name: "Langkah kaki melangkah ke hadapan diiringi bayu segar bertiup", volume: "60%", purpose: "Memberi rasa optimis dan masa depan yang terbuka luas" }],
        musicCue: "Gubahan orkestra sinematik megah penuh inspirasi dan harapan"
      }
    ];
  }

  return {
    characters,
    locationName,
    activeProps,
    soundDesign,
    story,
    craftSceneActions
  };
}
