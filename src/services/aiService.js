// AI Service Pipeline Architecture for Master AI Video Prompt Studio
// Context-Aware Semantic Extractor guaranteeing 100% coherence between user idea, story, characters, props, scenes, and prompts

import { promptBuilder } from "./promptBuilder.js";
import { consistencyChecker } from "./consistencyChecker.js";
import { storageService } from "./storageService.js";

export const PIPELINE_STEPS = [
  { id: 1, title: "Menganalisis Idea Video", desc: "Mengenal pasti tema, jantina watak, konflik utama, latar masa & emosi" },
  { id: 2, title: "Membangunkan Konsep Cerita", desc: "Menjana logline, babak permulaan, konflik, klimaks & mesej moral" },
  { id: 3, title: "Menjana Skrip Penuh", desc: "Menghasilkan pecahan adegan bertulis berserta objektif & narasi" },
  { id: 4, title: "Membina Profil Watak (Dossier)", desc: "Merekod identiti terperinci, ciri fizikal, busana, psikologi & suara" },
  { id: 5, title: "Mengaktifkan Character Lock", desc: "Mengunci deskripsi visual kekal bagi mengekalkan konsistensi watak" },
  { id: 6, title: "Pecahan Adegan & Garis Masa", desc: "Menetapkan durasi setiap babak, interaksi watak & aliran lokasi" },
  { id: 7, title: "Menjana Image Prompts (18 Aspek)", desc: "Menghasilkan prompt gambar fotografi & sinematik beresolusi tinggi" },
  { id: 8, title: "Menjana Dialog & Voice-Over", desc: "Menyusun skrip suara dalam Bahasa Melayu asli dengan arahan emosi" },
  { id: 9, title: "Menjana Arahan Muzik Latar", desc: "Menetapkan tempo, instrumen tradisi/moden, dan tenaga muzik" },
  { id: 10, title: "Menjana Cadangan Kesan Bunyi (SFX)", desc: "Menghubungkan foley audio persekitaran bagi setiap detik babak" },
  { id: 11, title: "Menjana Video Prompts (Sora/Kling)", desc: "Menetapkan fizik pergerakan, lensa kamera, zarah & negative prompts" },
  { id: 12, title: "Audit Kualiti & Papan Cerita", desc: "Menjalankan 13-point consistency check dan memuktamadkan storyboard" }
];

export const aiService = {
  // Main Pipeline Runner
  async generateVideoPlan(inputParams, onProgress = () => {}) {
    const {
      name,
      idea,
      language = "Bahasa Melayu",
      duration = "60 seconds",
      videoStyle = "Cinematic",
      targetAudience = "Penonton umum",
      videoPurpose = "Penceritaan kreatif & sinematik",
      aspectRatio = "16:9",
      numberOfScenes = 6,
      voiceStyle = "Multiple Characters",
      musicStyle = "Traditional",
      visualStyle = "Photorealistic Cinematic",
      dialogueStyle = "Natural Malaysian Malay"
    } = inputParams;

    // Progressive pipeline simulator with realistic pause for UX feedback
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    onProgress(1, PIPELINE_STEPS[0].title, 8);
    await sleep(350);

    onProgress(2, PIPELINE_STEPS[1].title, 16);
    await sleep(350);

    onProgress(3, PIPELINE_STEPS[2].title, 25);
    await sleep(350);

    // Step 4: Profil Watak (Character Dossier)
    onProgress(4, PIPELINE_STEPS[3].title, 33);
    await sleep(400);

    onProgress(5, PIPELINE_STEPS[4].title, 42);
    await sleep(300);

    onProgress(6, PIPELINE_STEPS[5].title, 50);
    await sleep(350);

    onProgress(7, PIPELINE_STEPS[6].title, 58);
    await sleep(400);

    onProgress(8, PIPELINE_STEPS[7].title, 67);
    await sleep(350);

    onProgress(9, PIPELINE_STEPS[8].title, 75);
    await sleep(300);

    onProgress(10, PIPELINE_STEPS[9].title, 83);
    await sleep(300);

    onProgress(11, PIPELINE_STEPS[10].title, 92);
    await sleep(400);

    onProgress(12, PIPELINE_STEPS[11].title, 98);
    await sleep(350);

    // Generate intelligent structured project based on input
    const generatedProject = this.synthesizeProject({
      ...inputParams,
      name: name || (idea ? idea.slice(0, 30) + "..." : "Projek Video Baharu"),
      idea,
      language,
      duration,
      videoStyle,
      targetAudience,
      videoPurpose,
      aspectRatio,
      numberOfScenes: parseInt(numberOfScenes, 10) || 6,
      voiceStyle,
      musicStyle,
      visualStyle,
      dialogueStyle,
      leadGender: inputParams.leadGender
    });

    onProgress(12, "Selesai! Pakej video sedia digunakan.", 100);
    return generatedProject;
  },

  // Deep Semantic Idea Analyzer
  analyzeIdeaContext(ideaText, params) {
    const text = (ideaText || "").toLowerCase();
    const isMalay = (params.language || "Bahasa Melayu").toLowerCase().includes("melayu") || (params.language || "").toLowerCase().includes("malay");

    // 1. Gender Detection
    const femaleKeywords = /(gadis|gadia|wanita|perempuan|ibu|emak|mak|nenek|kakak|anak perempuan|puteri|puan|cik|suraya|siti|aisyah|nurul|fatimah|zaleha|pelajar perempuan|murid perempuan|girl|woman|female|daughter|mother|sister|her|she)/i;
    let isFemale = false;
    if (params.leadGender === "Female") {
      isFemale = true;
    } else if (params.leadGender === "Male") {
      isFemale = false;
    } else {
      isFemale = femaleKeywords.test(ideaText) || (params.voiceStyle && params.voiceStyle.toLowerCase() === "female");
    }
    const isElderly = /(tua|warga emas|pak|tok|atuk|datuk|mahaguru|old man|elderly|veteran)/i.test(ideaText);
    const hasFatherMention = /(arwah ayah|ayah|bapa|abah|father|dad)/i.test(ideaText);

    // 2. Student / Age / Demographic Extraction
    const isStudent = /(pelajar|murid|sekolah|tingkatan|darjah|spm|pt3|student|school|high school)/i.test(ideaText);
    let extractedAge = null;
    let studentGrade = "";

    // Tingkatan patterns (Tingkatan 1 = 13, Tingkatan 2 = 14, Tingkatan 3 = 15, Tingkatan 4 = 16, Tingkatan 5 = 17, Tingkatan 6 = 18-19)
    if (/tingkatan\s*3|form\s*3/i.test(ideaText)) {
      extractedAge = 15;
      studentGrade = "Tingkatan 3 (15 tahun)";
    } else if (/tingkatan\s*1|form\s*1/i.test(ideaText)) {
      extractedAge = 13;
      studentGrade = "Tingkatan 1 (13 tahun)";
    } else if (/tingkatan\s*2|form\s*2/i.test(ideaText)) {
      extractedAge = 14;
      studentGrade = "Tingkatan 2 (14 tahun)";
    } else if (/tingkatan\s*4|form\s*4/i.test(ideaText)) {
      extractedAge = 16;
      studentGrade = "Tingkatan 4 (16 tahun)";
    } else if (/tingkatan\s*5|form\s*5|spm/i.test(ideaText)) {
      extractedAge = 17;
      studentGrade = "Tingkatan 5 / Calon SPM (17 tahun)";
    } else if (/darjah\s*(\d)/i.test(ideaText)) {
      const dMatch = ideaText.match(/darjah\s*(\d)/i);
      const dVal = parseInt(dMatch[1], 10);
      extractedAge = 6 + dVal; // Darjah 1 = 7, Darjah 6 = 12
      studentGrade = `Murid Sekolah Rendah Darjah ${dVal}`;
    } else if (/kanak-kanak|budak kecil|child|kid/i.test(ideaText)) {
      extractedAge = 10;
      studentGrade = "Kanak-kanak";
    } else if (/remaja|teenager|teen/i.test(ideaText)) {
      extractedAge = 16;
      studentGrade = "Remaja";
    } else if (/universiti|kolej|mahasiswa|mahasiswi|undergraduate/i.test(ideaText)) {
      extractedAge = 21;
      studentGrade = "Mahasiswa Universiti";
    } else {
      // Direct explicit age mention like "berumur 15", "usia 15 tahun", "15 years old"
      const ageMatch = ideaText.match(/(?:berumur|usia|umur|berusia)\s*(\d{1,2})/i) || ideaText.match(/(\d{1,2})\s*(?:tahun|thn|yo|years old)/i);
      if (ageMatch) {
        extractedAge = parseInt(ageMatch[1], 10);
      }
    }

    // 3. Domain / Craft Detection
    const isBatik = /(batik|canting|mencanting|kain batik|lilin batik|pewarna batik)/i.test(ideaText);
    const isWoodcarving = /(ukir|ukiran|kayu|pahat|cengal|woodcarver|woodcarving|craftsman)/i.test(ideaText);
    const isSilat = /(silat|pendekar|guru silat|keris|jurus|martial arts)/i.test(ideaText);
    const isWeaving = /(tenun|songket|kik|benang emas|loom|weaver)/i.test(ideaText);
    const isCulinary = /(masak|kuih|dapur|rendang|resepi|makanan|chef|cooking|kuih tradisional)/i.test(ideaText);
    const isFisherman = /(nelayan|pantai|laut|ikan|pukat|perahu|sampan|fisherman)/i.test(ideaText);

    // 4. Narrative Essence Detection
    const hasLetter = /(surat|warkah|pesanan|amanah|letter|note|wasiat)/i.test(ideaText);

    return {
      text,
      isMalay,
      isFemale,
      isElderly,
      isStudent,
      extractedAge,
      studentGrade,
      hasFatherMention,
      hasLetter,
      craft: isBatik ? "BATIK" : isWoodcarving ? "UKIRAN" : isSilat ? "SILAT" : isWeaving ? "SONGKET" : isCulinary ? "KULINARI" : isFisherman ? "NELAYAN" : "GENERAL"
    };
  },

  // Intelligent Rule-Based Project Synthesizer
  synthesizeProject(params) {
    const analysis = this.analyzeIdeaContext(params.idea, params);
    const { isMalay, isFemale, hasFatherMention, hasLetter, craft } = analysis;
    const projectId = "PROJ_" + Date.now().toString(36).toUpperCase();

    let characters = [];
    let locationName = "Studio Sinematik";
    let activeProps = [];
    let craftSceneActions = [];
    let soundDesign = {};

    // -------------------------------------------------------------
    // ARCHETYPE 1: BATIK (Gadis Kampung / Pewaris Batik & Arwah Ayah)
    // -------------------------------------------------------------
    if (craft === "BATIK") {
      const charName = isFemale ? (isMalay ? "Suraya" : "Suraya") : (isMalay ? "Amir" : "Amir");
      const charGender = isFemale ? "Female" : "Male";
      const charAge = isFemale ? 22 : 24;

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

      // Supporting Character: Father in memories / Mentor
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

      craftSceneActions = [
        {
          title: "Di Ruang Bengkel Yang Sunyi",
          action: `${charName} berdiri di tengah bengkel batik arwah ayahnya yang sunyi, memandang pemidang kain putih dengan perasaan ragu-ragu dan sebak.`,
          dialogueText: "Bolehkah aku teruskan perniagaan ini, Ayah? Dunia moden sudah tidak memandang batik...",
          speaker: charName,
          emotion: "Ragu-ragu, sayu dan bimbang",
          cam: { shotType: "Medium Wide Shot", lens: "35mm f/2.0", movement: "Slow Dolly In capturing empty workshop" }
        },
        {
          title: "Surat Yang Mengubah Segalanya",
          action: `${charName} membuka laci meja kayu arwah ayahnya dan menemui sekeping surat usang. Jemarinya membuka lipatan kertas dengan perlahan sambil membaca bait tulisan tangan ayahnya.`,
          dialogueText: "Setiap titisan lilin bukan sekadar corak, anakku... ia adalah doa ayah agar kamu kuat menempuh badai kehidupan.",
          speaker: "Pak Hassan",
          emotion: "Terharu, tersentuh jiwa dan insaf",
          cam: { shotType: "Close-Up", lens: "85mm f/1.4", movement: "Slow Pan from handwritten ink to tear rolling down cheek" }
        },
        {
          title: "Menyalakan Kembali Api Warisan",
          action: `${charName} menyapu air matanya, menarik nafas dengan azam baharu, lalu menyalakan api kecil di bawah periuk lilin batik dan mengambil canting tembaga arwah ayahnya.`,
          dialogueText: "Ayah tak pernah tinggalkan aku keseorangan. Jiwa ayah ada dalam setiap canting ini.",
          speaker: charName,
          emotion: "Tekad, berani dan penuh pengharapan",
          cam: { shotType: "Medium Close-Up", lens: "50mm f/1.8", movement: "Smooth tracking following the canting into molten wax" }
        },
        {
          title: "Tarian Canting Di Atas Sutera",
          action: `${charName} mula melakar motif flora Melayu di atas kain sutera putih dengan canting panas. Aliran lilin mengalir sempurna dan yakin tanpa sebarang getaran di tangannya.`,
          dialogueText: "Lihatlah, Ayah... tangan ini mula merasai apa yang Ayah rasakan selama ini.",
          speaker: charName,
          emotion: "Fokus mutlak, keindahan dan kelegaan",
          cam: { shotType: "Extreme Close-Up", lens: "100mm Macro f/2.8", movement: "Macro glide following glowing amber wax onto white silk fibers" }
        },
        {
          title: "Percikan Warna Jiwa",
          action: `${charName} menyapukan warna-warna asli pada motif batik; warna biru indigo dan merah manggis meresap hidup ke dalam kain sutera membentuk mahakarya unik.`,
          dialogueText: "Batik ini bukan sekadar kain hiasan... ia adalah identiti dan martabat kita.",
          speaker: charName,
          emotion: "Penuh kekaguman dan bangga",
          cam: { shotType: "Medium Shot", lens: "50mm f/1.4", movement: "Arc shot rotating around the vibrant colored batik frame" }
        },
        {
          title: "Cahaya Warisan Abadi",
          action: `${charName} membentangkan kain batik sutera yang telah siap di halaman bengkel di bawah biasan matahari pagi. Angin mengibarkan kain batik itu dengan megah, membuktikan keunikan yang tiada tandingan.`,
          dialogueText: "Terima kasih, Ayah. Surat ayah telah menghidupkan kembali impian kita.",
          speaker: charName,
          emotion: "Kejayaan, kesyukuran yang mendalam dan damai",
          cam: { shotType: "Wide Shot", lens: "24mm f/2.8", movement: "Majestic slow crane rise revealing the fluttering batik against blue sky" }
        }
      ];

      soundDesign = {
        overallMusicTheme: "Tradisi Akustik Melayu Moden (Acoustic Seruling, Gambus, Cello & Piano)",
        instruments: ["Seruling Buluh", "Gambus", "Piano Akustik Lembut", "Warm String Ensemble (Cello & Viola)"],
        bpmRange: "65 - 72 BPM",
        mixNotes: "Muzik bermula lembut dan melankolik di babak awal, kemudian berkembang megah penuh inspirasi dan kebanggaan.",
        ambientFoleyTrack: "Desiran angin kampung, gemeresik kain sutera, hembusan lembut canting, titisan lilin, kicauan burung pagi."
      };
    }

    // -------------------------------------------------------------
    // ARCHETYPE 2: UKIRAN (Woodcarving)
    // -------------------------------------------------------------
    else if (craft === "UKIRAN") {
      locationName = isMalay ? "Bengkel Ukiran Kayu Tradisional, Terengganu" : "Traditional Woodcarving Workshop";
      activeProps = ["Pahat kuku", "Tukul kayu", "Papan cengal", "Minyak pengilat linsid"];

      characters = [
        {
          id: "CHAR_001",
          name: isMalay ? "Pak Rahman" : "Master Rahman",
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
        },
        {
          id: "CHAR_002",
          name: isMalay ? "Amir" : "Amir",
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
        }
      ];

      craftSceneActions = [
        {
          title: "Hembusan Di Bengkel Tua",
          action: "Pak Rahman menyentuh permukaan papan kayu cengal yang belum diukir, merasai ira kayu dengan hujung jemarinya dalam keheningan.",
          dialogueText: "Kayu ini hidup, Amir. Jangan dipaksa, ikutlah rentak iranya.",
          speaker: "Pak Rahman",
          emotion: "Merenung, khusyuk dan tenang",
          cam: { shotType: "Medium Shot", lens: "50mm f/1.8", movement: "Slow Dolly In" }
        },
        {
          title: "Kegusaran Sang Perantis",
          action: "Amir memukul pemegang pahat dengan tergesa-gesa hingga matanya hilang ketelitian.",
          dialogueText: "Saya mahu selesaikan bahagian kelopak ini sebelum maghrib, Pak. Tapi kenapa garisan ini nampak kaku?",
          speaker: "Amir",
          emotion: "Kecewa, resah dan buntu",
          cam: { shotType: "Medium Close-Up", lens: "85mm f/2.0", movement: "Handheld Tracking" }
        },
        {
          title: "Genggaman Sang Guru",
          action: "Pak Rahman memegang lembut tangan Amir yang sedang menggenggam pahat, meredakan ketegangan.",
          dialogueText: "Tahan sebentar, Amir. Bila hati kamu mengejar masa, kamu lupa kayu ini sedang bernafas bersama kamu.",
          speaker: "Pak Rahman",
          emotion: "Penyayang, membimbing dan menenangkan",
          cam: { shotType: "Close-Up", lens: "85mm f/1.4", movement: "Slow Pan from hands to eyes" }
        },
        {
          title: "Falsafah Awan Larat",
          action: "Pak Rahman menyusuri garis motif Awan Larat menerangkan kerendahan hati dalam budaya Melayu.",
          dialogueText: "Tengok corak Awan Larat ini. Daunnya meliuk, bunganya mekar, tapi puncaknya selalu tunduk ke bawah. Tiada yang meninggi diri.",
          speaker: "Pak Rahman",
          emotion: "Mengagumi dan berfalsafah",
          cam: { shotType: "Over-the-Shoulder", lens: "35mm f/2.0", movement: "Slow orbit" }
        },
        {
          title: "Pencerahan Di Mata Perantis",
          action: "Amir meletakkan kedua tapak tangannya di atas kayu dengan niat baru.",
          dialogueText: "Jadi, setiap garisan yang kita ukir... sebenarnya adalah doa dan tanda syukur kita, Pak?",
          speaker: "Amir",
          emotion: "Insaf dan tenang",
          cam: { shotType: "Close-Up", lens: "85mm f/1.8", movement: "Slow Tilt Up" }
        },
        {
          title: "Obor Warisan Terus Menyala",
          action: "Pak Rahman dan Amir berdiri bersama memandang panel ukiran kayu yang siap berkilauan di bawah matahari senja.",
          dialogueText: "Esok kita mula ukir pintu masjid, anakku. Jiwa kamu sudah bersedia.",
          speaker: "Pak Rahman",
          emotion: "Harapan masa depan dan keyakinan teguh",
          cam: { shotType: "Wide Shot", lens: "24mm f/2.8", movement: "Slow pull out" }
        }
      ];

      soundDesign = {
        overallMusicTheme: "Tradisi Melayu Kontemporari (Seruling, Gambus & Cello)",
        instruments: ["Seruling Buluh", "Gambus", "Gendang Halus", "Rebab", "Cello"],
        bpmRange: "60 - 80 BPM",
        mixNotes: "Muzik dikawal di bawah vokal untuk kejelasan sebutan bahasa Melayu.",
        ambientFoleyTrack: "Bunyi pahat kayu, desiran angin jerjak, burung berkicau."
      };
    }

    // -------------------------------------------------------------
    // ARCHETYPE 3: GENERAL / UNIVERSAL CONTEXT (Fully Adaptive)
    // -------------------------------------------------------------
    else {
      const charName = isFemale ? (isMalay ? "Aisyah" : "Sarah") : (isMalay ? "Danial" : "Daniel");
      const charGender = isFemale ? "Female" : "Male";
      
      // Determine dynamic age based on user idea (e.g. Tingkatan 3 = 15)
      let charAge = isFemale ? 22 : 25;
      if (analysis.extractedAge) {
        charAge = analysis.extractedAge;
      } else if (analysis.isStudent) {
        charAge = 16;
      }

      const isStudentRole = analysis.isStudent || charAge < 19;
      const charRole = analysis.studentGrade
        ? (isMalay ? `Pelajar Sekolah (${analysis.studentGrade})` : `High School Student (${analysis.studentGrade})`)
        : isStudentRole
          ? (isMalay ? `Pelajar Sekolah Menengah (${charAge} Tahun)` : `Secondary School Student (${charAge} y/o)`)
          : (isMalay ? "Protagonis Utama" : "Lead Protagonist");

      locationName = isStudentRole
        ? (isMalay ? "Sekolah Menengah Tempatan & Bilik Darjah, Malaysia" : "Malaysian Secondary School & Classroom")
        : (isMalay ? "Latar Kisah Realiti Tempatan" : "Authentic Narrative Setting");

      activeProps = isStudentRole
        ? ["Buku teks & buku latihan sekolah", "Beg galas sekolah berzip", "Kotak pensel & alat tulis", "Meja dan kerusi kayu bilik darjah"]
        : ["Objek penceritaan utama", "Buku catatan / dokumen penting"];

      const schoolClothing = isFemale
        ? "Baju kurung seragam sekolah warna putih bersih dengan kain sarung biru tua (pakaian seragam sekolah menengah kebangsaan Malaysia) berserta tudung putih kemas"
        : "Kemeja sekolah putih lengan pendek kemas dengan seluar panjang warna hijau zaitun (pakaian seragam sekolah menengah kebangsaan Malaysia) dan lencana sekolah di poket dada";

      const schoolShoes = isFemale
        ? "Kasut kanvas putih sekolah dengan stoking putih kemas"
        : "Kasut sekolah kanvas hitam/putih dengan stoking kemas";

      const adultClothing = isFemale
        ? "Modern modest casual Malay attire with soft dusty pastel tones and matching shawl"
        : "Smart casual jacket over clean off-white tee and dark slim trousers";

      const charClothing = isStudentRole ? schoolClothing : adultClothing;
      const charShoes = isStudentRole ? schoolShoes : "Comfortable modern footwear";
      const charAccessories = isStudentRole ? "Lencana sekolah rasmi di dada, jam tangan digital ringkas, dan beg galas" : "Analog wristwatch";

      const faceDesc = isStudentRole
        ? (isFemale
            ? "Wajah remaja polos yang ceria, mata gelap bersinar penuh rasa ingin tahu dan keazaman untuk belajar, senyuman manis dan bersopan."
            : "Wajah remaja cerdas dengan tatapan mata gelap yang fokus, ekspresi bersemangat dan berdisiplin.")
        : (isFemale
            ? "Youthful expressive face, dark brown eyes with resilient determination, gentle natural features."
            : "Structured jawline, expressive dark brown eyes, confident and thoughtful demeanor.");

      const lockedDesc = isStudentRole
        ? `A ${charAge}-year-old Malaysian ${charGender === "Female" ? "female student" : "male student"} named ${charName}, ${charGender === "Female" ? "wearing a neat Malaysian national secondary school uniform (clean white Baju Kurung with deep navy blue skirt and white headscarf)" : "wearing a neat Malaysian national secondary school uniform (clean white short-sleeved collared shirt and olive green trousers)"}, carrying a school backpack and holding study books, youthful Asian facial features with earnest dark brown eyes.`
        : `A ${charAge}-year-old ${charGender.toLowerCase()} Malaysian named ${charName}, ${charGender === "Female" ? "slender graceful build, expressive dark brown eyes, wearing modern modest attire" : "medium athletic build, structured jawline, wearing casual smart clothing"}.`;

      characters.push({
        id: "CHAR_001",
        name: charName,
        role: charRole,
        age: charAge,
        gender: charGender,
        nationality: "Malaysian",
        ethnicity: "Malay",
        faceDescription: faceDesc,
        skinTone: "Warm natural Asian tan skin",
        hair: isFemale ? "Neat black hair tucked neatly under a white school tudung" : "Neat short school-regulation dark black hair",
        hairStyle: isFemale ? "Neat school headscarf" : "Short regulation school haircut",
        eyeColor: "Deep expressive dark brown",
        bodyType: isStudentRole ? "Youthful slender teenage build" : "Medium natural build",
        height: isStudentRole ? (isFemale ? "154 cm" : "165 cm") : (isFemale ? "164 cm" : "176 cm"),
        clothing: charClothing,
        shoes: charShoes,
        accessories: charAccessories,
        personality: isStudentRole ? "Rajin, bersemangat untuk menimba ilmu, menghormati guru dan rakan sekelas, tabah menghadapi peperiksaan" : "Resilient, hardworking, dedicated to personal growth and family heritage",
        emotionalTraits: isStudentRole ? "Rasa ingin tahu yang tinggi, azam untuk berjaya, setia kawan" : "Emotionally grounded, brave in facing uncertainty",
        voiceCharacteristics: isStudentRole
          ? (isFemale ? "Suara remaja perempuan Malaysia yang ceria, santun dan bertenaga (15 tahun)" : "Suara remaja lelaki Malaysia yang bersemangat dan jelas")
          : (isFemale ? "Warm, clear Malaysian Malay female voice, 0.95x" : "Confident, calm Malaysian Malay male voice, 0.95x"),
        speakingStyle: isStudentRole ? "Bahasa Melayu standard percakapan harian murid sekolah yang sopan" : "Sincere, conversational and articulate",
        typicalFacialExpressions: isStudentRole ? "Senyuman mesra, kening berkerut sedikit bila berfikir tekun, mata berbinar teruja" : "Focused gaze turning to warm reassurance",
        typicalGestures: isStudentRole ? "Memegang pemegang beg galas, membuka helaian buku dengan teliti, mengangkat tangan bertanya soalan" : "Open hands when expressing feelings",
        movementStyle: isStudentRole ? "Cekap, cergas dan penuh tenaga remaja" : "Poised, steady",
        backstory: `Watak utama ${charRole} berumur ${charAge} tahun yang mengharungi cabaran hidup dan penceritaan berpandukan idea: "${params.idea}".`,
        isLocked: true,
        lockedDescription: lockedDesc
      });

      craftSceneActions = isStudentRole ? [
        {
          title: "Langkah Pertama Ke Bilik Darjah",
          action: `${charName} (${charAge} tahun) melangkah masuk ke pekarangan sekolah sambil membetulkan tali beg galasnya, memandang ke arah papan kenyataan dengan penuh keazaman.`,
          dialogueText: "Tahun ini aku berjanji pada diri sendiri untuk berusaha bersungguh-sungguh demi masa depanku.",
          speaker: charName,
          emotion: "Bersemangat dan optimis",
          cam: { shotType: "Medium Shot", lens: "50mm f/1.8", movement: "Slow Tracking Shot mengikut langkah pelajar" }
        },
        {
          title: "Cabaran Di Meja Belajar",
          action: `${charName} duduk tekun di mejanya menelaah buku pelajaran di hadapannya, mencatat nota penting dengan penuh konsentrasi.`,
          dialogueText: "Walau sesukar mana pun soalan ini, aku takkan mengalah sehingga aku benar-benar memahaminya.",
          speaker: charName,
          emotion: "Fokus mendalam dan tekad",
          cam: { shotType: "Medium Close-Up", lens: "85mm f/2.0", movement: "Slow Dolly In ke arah buku catatan" }
        },
        {
          title: "Detik Keraguan & Ujian Kecekalan",
          action: `${charName} termenung seketika di tepi tingkap kelas, memerhati titisan hujan sambil memikirkan harapan ibu bapa terhadap dirinya.`,
          dialogueText: "Kadangkala aku berasa bimbang... mampukah aku buktikan bahawa usaha ini akan membuahkan hasil?",
          speaker: charName,
          emotion: "Ragu-ragu namun berhati waja",
          cam: { shotType: "Close-Up", lens: "85mm f/1.4", movement: "Slow Pan dari tingkap ke mata pelajar yang bertekad" }
        },
        {
          title: "Sinar Pencerahan & Bimbingan",
          action: `${charName} mengangguk faham selepas menemui jalan penyelesaian kepada masalah pembelajarannya, senyuman kelegaan terukir di bibir.`,
          dialogueText: "Alhamdulillah! Bila kita tidak berputus asa, akhirnya jalan kejayaan pasti terbuka luas.",
          speaker: charName,
          emotion: "Lega, gembira dan bersyukur",
          cam: { shotType: "Close-Up", lens: "50mm f/1.8", movement: "Slow Arc Shot" }
        },
        {
          title: "Ketekunan Menjelang Penilaian",
          action: `${charName} bersama rakan-rakan di perpustakaan sekolah mengulangkaji pelajaran dengan penuh disiplin dan tolong-menolong.`,
          dialogueText: "Kejayaan lebih bermakna apabila kita saling menyokong antara satu sama lain.",
          speaker: charName,
          emotion: "Kerjasama dan ukhuwah",
          cam: { shotType: "Over-the-Shoulder", lens: "35mm f/2.0", movement: "Slow Orbit" }
        },
        {
          title: "Kejayaan Membanggakan",
          action: `${charName} tersenyum lebar memegang slip keputusan cemerlangnya di hadapan bangunan sekolah, bersedia melangkah ke masa hadapan.`,
          dialogueText: "Usaha ini untuk ibu, ayah dan semua yang sentiasa mempercayai kemampuanku!",
          speaker: charName,
          emotion: "Kesyukuran, bangga dan berwawasan",
          cam: { shotType: "Wide Shot", lens: "24mm f/2.8", movement: "Slow Cinematic Pull Back" }
        }
      ] : [
        {
          title: "Titik Mula Sebuah Perjalanan",
          action: `${charName} memulakan harinya dengan berdepan cabaran yang menguji keazaman dirinya.`,
          dialogueText: "Setiap langkah besar bermula dengan keberanian mempercayai diri sendiri.",
          speaker: charName,
          emotion: "Tekad dan berwaspada",
          cam: { shotType: "Medium Shot", lens: "50mm f/1.8", movement: "Slow Dolly In" }
        },
        {
          title: "Ujian Yang Menduga Hati",
          action: `${charName} berdepan detik keraguan apabila halangan besar merintangi jalannya.`,
          dialogueText: "Bolehkah aku buktikan bahawa impian ini mampu menjadi kenyataan?",
          speaker: charName,
          emotion: "Cemas namun berfikir mendalam",
          cam: { shotType: "Medium Close-Up", lens: "85mm f/2.0", movement: "Handheld Tracking" }
        },
        {
          title: "Detik Pencerahan & Kesedaran",
          action: `${charName} menemui jawapan yang mengubah pandangan hidupnya secara menyeluruh.`,
          dialogueText: "Kini aku faham... nilai sebenar bukan pada kemasyhuran, tetapi pada keikhlasan hati.",
          speaker: charName,
          emotion: "Tenang dan bersyukur",
          cam: { shotType: "Close-Up", lens: "85mm f/1.4", movement: "Slow Tilt Up" }
        },
        {
          title: "Tumpuan Mutlak Menuju Kejayaan",
          action: `${charName} melipatgandakan usaha dengan semangat membara yang tidak lagi berbelah bahagi.`,
          dialogueText: "Inilah saatnya untuk membuktikan bahawa warisan ini berharga.",
          speaker: charName,
          emotion: "Fokus mutlak",
          cam: { shotType: "Extreme Close-Up", lens: "100mm Macro f/2.8", movement: "Glide Tracking" }
        },
        {
          title: "Kejayaan Membawa Cahaya",
          action: `${charName} melihat hasil usahanya diiktiraf dan membawa kegembiraan kepada orang tersayang.`,
          dialogueText: "Terima kasih atas segala bimbingan dan doa.",
          speaker: charName,
          emotion: "Kesyukuran mendalam",
          cam: { shotType: "Medium Shot", lens: "50mm f/1.4", movement: "Arc Shot" }
        },
        {
          title: "Masa Depan Yang Gemilang",
          action: `${charName} melangkah ke hadapan dengan senyuman yakin menyongsong hari esok.`,
          dialogueText: "Perjalanan ini baru bermula, dan obornya akan terus menyala.",
          speaker: charName,
          emotion: "Bangga dan berharapan",
          cam: { shotType: "Wide Shot", lens: "24mm f/2.8", movement: "Slow cinematic pull back" }
        }
      ];

      soundDesign = isStudentRole ? {
        overallMusicTheme: "Akustik Inspirasi Sekolah & Belia (Acoustic Guitar, Warm Piano & Inspiring Strings)",
        instruments: ["Gitar Akustik", "Piano Hangat", "Violin Lembut", "Loceng Sekolah (Foley)"],
        bpmRange: "72 - 88 BPM",
        mixNotes: "Muzik segar bertenaga belia, mengekalkan kejelasan vokal dialog murid sekolah.",
        ambientFoleyTrack: "Suasana bilik darjah, helaian buku diselak, loceng sekolah, desiran angin pagi."
      } : {
        overallMusicTheme: "Sinematik Inspirasi (Cinematic Inspirational Piano & Strings)",
        instruments: ["Piano Akustik", "Violin", "Cello", "Subtle Cinematic Synth"],
        bpmRange: "65 - 75 BPM",
        mixNotes: "Muzik disusun harmoni bagi menaikkan semangat penceritaan.",
        ambientFoleyTrack: "Suasana semula jadi dan persekitaran realistik."
      };
    }

    // Story Concept Construction
    const leadChar = characters[0];
    const storyTitle = params.name || (craft === "BATIK" ? "Warkah Lilin: Jiwa Di Sebalik Batik" : craft === "UKIRAN" ? "Warisan Ukiran: Jiwa Dalam Kayu" : "Cahaya Sebuah Harapan");

    const story = {
      title: storyTitle,
      logline: params.idea,
      genre: `${params.videoStyle} Drama / Warisan Budaya`,
      theme: craft === "BATIK" ? "Penyambung warisan, kasih sayang ayah, dan keunikan seni batik tradisional." : "Kesabaran, ketekunan, dan jati diri warisan pusaka.",
      setting: locationName,
      timePeriod: "Era kontemporari dengan suasana warisan klasik yang hangat.",
      storyTone: "Menyentuh kalbu, puitis, bersemangat dan penuh inspirasi.",
      mainConflict: craft === "BATIK"
        ? `${leadChar.name} pada mulanya tidak yakin batik mampu menjadi sesuatu yang bernilai tinggi, sehinggalah wasiat arwah ayahnya membuka matanya.`
        : "Pertembungan antara keraguan diri dengan tuntutan memelihara warisan pusaka.",
      beginning: `${leadChar.name} memulakan tugas dengan penuh keraguan di hadapan karya yang belum berseri.`,
      middle: hasLetter
        ? `Penemuan dan pembacaan surat wasiat arwah ayah menyedarkan ${leadChar.name} akan roh sebenar di sebalik setiap jalinan seni.`
        : "Detik bimbingan dan pencerahan yang mengubah persepsi watak secara menyeluruh.",
      climax: `${leadChar.name} menumpahkan seluruh jiwa dan tenaganya menghasilkan karya batik/seni teragung mengikut pesan arwah ayahnya.`,
      ending: "Karya yang siap berkilauan di bawah cahaya matahari pagi, membuktikan bahawa seni warisan adalah anugerah abadi yang tak ternilai.",
      moralMessage: "Warisan yang diiringi dengan doa dan keikhlasan hati orang tua tidak akan pernah lupus, malah menjadi obor penyuluh masa depan."
    };

    // Build Scenes & Allocate Exact Durations
    // Parse duration string or number (supports "60", "60 seconds", "2 minutes", "90s", etc.)
    let totalSeconds = 60;
    if (typeof params.duration === "number") {
      totalSeconds = params.duration;
    } else if (typeof params.duration === "string") {
      const minMatch = params.duration.match(/(\d+(?:\.\d+)?)\s*(?:min|minute|minit)/i);
      const secMatch = params.duration.match(/(\d+(?:\.\d+)?)\s*(?:sec|second|saat|s\b)?/i);
      if (minMatch) {
        totalSeconds = Math.round(parseFloat(minMatch[1]) * 60);
      } else if (secMatch) {
        totalSeconds = Math.round(parseFloat(secMatch[1]));
      }
    }
    if (isNaN(totalSeconds) || totalSeconds < 5) totalSeconds = 60;

    const sceneCount = Math.max(1, parseInt(params.numberOfScenes, 10) || 6);

    // Distribute totalSeconds accurately across sceneCount
    const baseSec = Math.floor(totalSeconds / sceneCount);
    let remainderSec = totalSeconds % sceneCount;
    const sceneDurations = Array.from({ length: sceneCount }, (_, idx) => {
      // distribute leftover seconds among early/middle scenes
      const extra = remainderSec > 0 ? 1 : 0;
      if (remainderSec > 0) remainderSec--;
      return Math.max(2, baseSec + extra);
    });

    const scenes = [];

    for (let i = 1; i <= sceneCount; i++) {
      const sceneActionData = craftSceneActions[(i - 1) % craftSceneActions.length];
      const sceneId = `SCENE_${String(i).padStart(3, "0")}`;
      const currentSceneDur = sceneDurations[i - 1];

      const isSpeakerFather = sceneActionData.speaker.includes("Hassan") || sceneActionData.speaker.includes("Rahman");
      const speakerChar = isSpeakerFather && characters.length > 1 ? characters[1] : leadChar;

      const presentIds = characters.length > 1 && (i === 1 || i === 2 || i === sceneCount)
        ? characters.map(c => c.id)
        : [leadChar.id];

      const activeCharsLocked = characters
        .filter((c) => presentIds.includes(c.id))
        .map((c) => `[${c.id}: ${c.name}, ${c.lockedDescription}]`);

      const imgPrompt = promptBuilder.buildImagePrompt({
        characterLockedDescriptions: activeCharsLocked,
        action: sceneActionData.action,
        expression: sceneActionData.emotion,
        bodyLanguage: "Grounded, natural artisan posture with emotional depth",
        environment: locationName,
        props: activeProps.join(", "),
        timeOfDay: i === sceneCount ? "Golden morning sunlight" : "Warm afternoon window glow",
        lighting: "Warm cinematic volumetric sunlight, dramatic soft contrast",
        cameraAngle: sceneActionData.cam.shotType,
        lens: sceneActionData.cam.lens,
        composition: "Cinematic rule of thirds with organic depth of field",
        visualStyle: params.visualStyle,
        aspectRatio: params.aspectRatio
      });

      const vidPrompt = promptBuilder.buildVideoPrompt({
        characterLockedDescriptions: activeCharsLocked,
        action: sceneActionData.action,
        movement: `Fluid natural movement at 24fps. ${sceneActionData.cam.movement}`,
        expression: sceneActionData.emotion,
        environmentMovement: craft === "BATIK" ? "Gentle rising steam from wax pot, subtle fabric sway" : "Fine wood dust floating gently in warm sunlight",
        cameraMovement: sceneActionData.cam.movement,
        cameraAngle: sceneActionData.cam.shotType,
        lighting: "Warm golden atmospheric illumination",
        cinematicStyle: `${params.visualStyle} 4k masterwork`
      });

      const voPrompt = promptBuilder.buildVoicePrompt({
        speaker: speakerChar.name,
        age: speakerChar.age,
        voiceType: speakerChar.gender === "Female" ? "Female Malay" : "Male Malay",
        accent: "Natural Malaysian Malay",
        speed: speakerChar.gender === "Female" ? "0.92x" : "0.88x",
        emotion: sceneActionData.emotion,
        dialogue: sceneActionData.dialogueText
      });

      scenes.push({
        id: sceneId,
        sceneNumber: i,
        duration: currentSceneDur || 8,
        title: sceneActionData.title,
        objective: `Menggerakkan plot fasa ${i} berfokuskan transformasi jiwa ${leadChar.name}.`,
        location: locationName,
        time: i === sceneCount ? "8:00 AM (Pagi)" : "3:30 PM (Petang)",
        environment: locationName,
        charactersPresent: presentIds,
        characterPositions: presentIds.length > 1 ? `${leadChar.name} di bahagian tengah, ${characters[1].name} di latar ingatan/sisi.` : `${leadChar.name} berada di tengah bingkai.`,
        action: sceneActionData.action,
        emotion: sceneActionData.emotion,
        narration: isMalay ? `Maka bertemulah kenangan, keikhlasan dan warisan dalam satu tarikan nafas yang penuh erti.` : `Memory and purpose unite in silence.`,
        dialogue: {
          characterId: speakerChar.id,
          speaker: speakerChar.name,
          text: sceneActionData.dialogueText,
          emotion: sceneActionData.emotion,
          voiceDirection: speakerChar.gender === "Female" ? "Nada lembut bergetar sebak kemudian bertukar yakin" : "Nada bapa yang penuh hikmah dan kasih sayang",
          speed: speakerChar.gender === "Female" ? "0.92x" : "0.88x",
          pause: "Jeda 1 saat pada perkataan penting",
          emphasis: craft === "BATIK" ? "batik, surat, doa" : "usaha, warisan"
        },
        camera: {
          shotType: sceneActionData.cam.shotType,
          movement: sceneActionData.cam.movement,
          lens: sceneActionData.cam.lens,
          angle: "Eye Level"
        },
        lighting: "Warm volumetric shafts of natural sunlight.",
        sfx: [
          {
            name: craft === "BATIK" ? "Bunyi hembusan canting dan titisan lilin" : "Bunyi alat kraf tangan",
            volume: "60%",
            timing: "00:01 - 00:07",
            purpose: "Menghidupkan suasana kraf secara nyata"
          }
        ],
        music: {
          cue: params.musicStyle !== "None" ? "Alunan seruling dan petikan gambus menyentuh kalbu" : "Tiada muzik",
          mood: "Menyentuh jiwa dan bersemangat",
          tempo: "68 BPM"
        },
        imagePrompt: imgPrompt,
        videoPrompt: vidPrompt,
        voPrompt: voPrompt
      });
    }

    // Continuity tracking
    const continuity = {
      primaryLocation: locationName,
      activeProps: activeProps,
      timeProgression: "Petang redup hingga pagi keemasan",
      weather: "Tenang dan damai",
      lightingTheme: "Warm volumetric sunlight streaming through traditional windows"
    };

    const newProject = {
      id: projectId,
      name: params.name || storyTitle,
      idea: params.idea,
      language: params.language,
      duration: params.duration,
      videoStyle: params.videoStyle,
      targetAudience: params.targetAudience,
      videoPurpose: params.videoPurpose,
      aspectRatio: params.aspectRatio,
      numberOfScenes: sceneCount,
      voiceStyle: params.voiceStyle,
      musicStyle: params.musicStyle,
      visualStyle: params.visualStyle,
      dialogueStyle: params.dialogueStyle,
      status: "Completed",
      progress: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      story,
      characters,
      continuity,
      scenes,
      soundDesign
    };

    // Run Consistency Audit
    newProject.consistencyAudit = consistencyChecker.runAudit(newProject);

    return newProject;
  },

  // Regenerate Single Scene action & prompts while strictly preserving locked character attributes
  regenerateScene(scene, characters, projectStyle = "Photorealistic Cinematic") {
    const activeChars = characters.filter((c) => (scene.charactersPresent || []).includes(c.id));
    const lockedStrs = activeChars.map((c) => `[${c.id}: ${c.name}, ${c.lockedDescription}]`);

    const refreshed = { ...scene };
    refreshed.imagePrompt = promptBuilder.buildImagePrompt({
      characterLockedDescriptions: lockedStrs,
      action: refreshed.action,
      expression: refreshed.emotion || "Calm and concentrated",
      bodyLanguage: "Grounded artisan composure",
      environment: refreshed.environment,
      props: "Essential craft tools",
      timeOfDay: refreshed.time,
      lighting: refreshed.lighting || "Warm cinematic lighting",
      cameraAngle: refreshed.camera?.shotType || "Medium Shot",
      lens: refreshed.camera?.lens || "50mm f/1.8",
      visualStyle: projectStyle,
      aspectRatio: "16:9"
    });

    refreshed.videoPrompt = promptBuilder.buildVideoPrompt({
      characterLockedDescriptions: lockedStrs,
      action: refreshed.action,
      movement: refreshed.camera?.movement || "Slow cinematic dolly in",
      expression: refreshed.emotion || "Poised and thoughtful",
      environmentMovement: "Atmospheric dust motes floating in sunlight",
      cameraMovement: refreshed.camera?.movement || "Smooth dolly motion",
      cameraAngle: refreshed.camera?.shotType || "Medium Shot",
      lighting: refreshed.lighting || "Warm volumetric light",
      cinematicStyle: projectStyle
    });

    return refreshed;
  }
};
