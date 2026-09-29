// AI Service Pipeline Architecture for Master AI Video Prompt Studio
// Context-Aware Semantic Extractor guaranteeing 100% coherence between user idea, story, characters, props, scenes, and prompts

import { promptBuilder } from "./promptBuilder.js";
import { consistencyChecker } from "./consistencyChecker.js";
import { storageService } from "./storageService.js";
import { buildDomainPackage } from "./domainPackageBuilder.js";

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

    // 1. Gender Detection with strict word boundaries
    const femaleKeywords = /\b(gadis|wanita|perempuan|ibu|emak|mak|nenek|kakak|anak perempuan|puteri|puan|cik|ustazah|suraya|siti|aisyah|nurul|fatimah|zaleha|nadia|farah|amira|atiqah|hawa|pelajar perempuan|murid perempuan|girl|woman|female|daughter|mother|sister|her|she)\b/i;
    const maleKeywords = /\b(kamal|amir|azman|farid|danial|haikal|azlan|hakim|faizal|khairul|razak|hassan|osman|ali|abu|lelaki|pemuda|bapa|ayah|abah|abang|atuk|datuk|anak lelaki|boy|man|male|son|father|brother|his|he|him)\b/i;

    let isFemale = false;
    if (params.leadGender === "Female") {
      isFemale = true;
    } else if (params.leadGender === "Male") {
      isFemale = false;
    } else if (params.voiceStyle && params.voiceStyle.toLowerCase() === "female") {
      isFemale = true;
    } else if (femaleKeywords.test(ideaText) && !maleKeywords.test(ideaText)) {
      isFemale = true;
    } else if (maleKeywords.test(ideaText) && !femaleKeywords.test(ideaText)) {
      isFemale = false;
    } else if (femaleKeywords.test(ideaText)) {
      isFemale = true;
    }

    const isElderly = /\b(tua|warga emas|pak|tok|atuk|datuk|mahaguru|old man|elderly|veteran)\b/i.test(ideaText);
    const hasFatherMention = /\b(arwah ayah|ayah|bapa|abah|father|dad)\b/i.test(ideaText);

    // 2. Student / Age / Demographic Extraction
    const isStudent = /\b(pelajar|murid|sekolah|tingkatan|darjah|spm|pt3|stpm|peperiksaan|bilik darjah|tuisyen|student|school|high school)\b/i.test(ideaText);
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
    } else if (/\b(kanak-kanak|budak kecil|child|kid)\b/i.test(ideaText)) {
      extractedAge = 10;
      studentGrade = "Kanak-kanak";
    } else if (/\b(remaja|teenager|teen)\b/i.test(ideaText)) {
      extractedAge = 16;
      studentGrade = "Remaja";
    } else if (/\b(universiti|kolej|mahasiswa|mahasiswi|undergraduate)\b/i.test(ideaText)) {
      extractedAge = 21;
      studentGrade = "Mahasiswa Universiti";
    } else {
      // Direct explicit age mention like "berumur 15", "usia 15 tahun", "15 years old"
      const ageMatch = ideaText.match(/(?:berumur|usia|umur|berusia)\s*(\d{1,2})/i) || ideaText.match(/(\d{1,2})\s*(?:tahun|thn|yo|years old)/i);
      if (ageMatch) {
        extractedAge = parseInt(ageMatch[1], 10);
      }
    }

    // 3. Explicit Name Extraction
    let extractedName = "";
    const skipWords = [
      "seorang", "sepasang", "dua", "tiga", "kanak", "remaja", "pemuda", "gadis",
      "wanita", "lelaki", "pelajar", "doktor", "dr", "polis", "bomba", "guru",
      "atlet", "peniaga", "murid", "orang", "tentera", "tukang", "pekerja",
      "nelayan", "pendekar", "pesilat", "petani", "penoreh", "warga", "emas",
      "makcik", "pakcik", "atuk", "datuk", "nenek", "abang", "kakak", "adik",
      "detektif", "penyiasat", "hacker", "penggodam"
    ];

    // Priority 1: Header / Title Colon format, e.g. "**KAMAL: MEMBURU KARBEROS**" or "KAMAL: ..."
    const titleColonMatch = ideaText.match(/(?:^\s*|\n)\s*(?:\*\*)?([A-Za-z]+)\s*:\s*[^\n]+/i);
    if (titleColonMatch && !skipWords.includes(titleColonMatch[1].toLowerCase())) {
      extractedName = titleColonMatch[1].charAt(0).toUpperCase() + titleColonMatch[1].slice(1).toLowerCase();
    }

    // Priority 2: "Name, seorang detektif / guru / pemuda..."
    if (!extractedName) {
      const commaSeorangMatch = ideaText.match(/\b([A-Z][a-z]+),\s+seorang\b/);
      if (commaSeorangMatch && !skipWords.includes(commaSeorangMatch[1].toLowerCase())) {
        extractedName = commaSeorangMatch[1].charAt(0).toUpperCase() + commaSeorangMatch[1].slice(1).toLowerCase();
      }
    }

    // Priority 3: Check for Title/Honorific + Name (e.g., Detektif Kamal, Dr Nadia, Cikgu Azlan, Ustaz Syakir, Pegawai Farid)
    if (!extractedName) {
      const titleNameMatch = ideaText.match(/(?:kisah\s+)?(Detektif|Inspektor|Dr\.?|Doktor|Cikgu|Ustaz|Ustazah|Kapten|Sarjan|Mejar|Pegawai)\s+([A-Za-z]+)/i);
      if (titleNameMatch && !skipWords.includes(titleNameMatch[2].toLowerCase())) {
        const titlePrefix = titleNameMatch[1].replace(/\.$/, "");
        const personName = titleNameMatch[2].charAt(0).toUpperCase() + titleNameMatch[2].slice(1).toLowerCase();
        extractedName = `${titlePrefix} ${personName}`;
      }
    }

    // Priority 4: "bernama Name" or "namanya Name"
    if (!extractedName) {
      const directNameMatch = ideaText.match(/(?:bernama|nama(?:nya)?)\s+([A-Za-z]+)/i);
      if (directNameMatch && !skipWords.includes(directNameMatch[1].toLowerCase())) {
        extractedName = directNameMatch[1].charAt(0).toUpperCase() + directNameMatch[1].slice(1).toLowerCase();
      }
    }

    // Priority 5: "kisah Name"
    if (!extractedName) {
      const generalNameMatch = ideaText.match(/kisah\s+([A-Za-z]+)\b/i);
      if (generalNameMatch && !skipWords.includes(generalNameMatch[1].toLowerCase())) {
        extractedName = generalNameMatch[1].charAt(0).toUpperCase() + generalNameMatch[1].slice(1).toLowerCase();
      }
    }

    // 4. Domain Detection with strict word boundaries
    const isInvestigation = /\b(detektif|penyiasat|penyiasatan|siasatan|hacker|penggodam|serangan siber|jenayah|kes jenayah|forensik|inteligen|perisik|spy|detective|investigation|cyber|cybercrime)\b/i.test(ideaText);
    const isBatik = /\b(batik|canting|mencanting|kain batik|lilin batik|pewarna batik)\b/i.test(ideaText);
    const isWoodcarving = /\b(ukir|ukiran|kayu|pahat|cengal|woodcarver|woodcarving|craftsman)\b/i.test(ideaText);
    const isSilat = /\b(silat|pendekar|pesilat|guru silat|keris|jurus|seni silat|gelanggang silat|martial arts)\b/i.test(ideaText);
    const isWeaving = /\b(tenun|songket|kik|benang emas|loom|weaver)\b/i.test(ideaText);
    const isFisherman = /\b(nelayan|pukat|kelong|perahu nelayan|bot nelayan|menangkap ikan|lautan|meredah ombak)\b/i.test(ideaText);
    const isHealthcare = /\b(doktor|jururawat|hospital|klinik|pesakit|pembedahan|wad kecemasan|ambulans|stetoskop)\b/i.test(ideaText);
    const isRescue = /\b(bomba|penyelamat|padam api|kebakaran|mangsa banjir|arus banjir|misi menyelamat)\b/i.test(ideaText);
    const isCulinary = /\b(masak|kuih|dapur|rendang|resepi|makanan|chef|cooking|kuih tradisional|lauk|hidangan|masakan)\b/i.test(ideaText);
    const isSports = /\b(sukan|bola sepak|futsal|badminton|lari pecut|pelari|atlet|kejohanan sukan|stadium|trek larian)\b/i.test(ideaText);
    const isBusiness = /\b(bisnes|perniagaan|peniaga|berniaga|gerai|kedai|jual|jualan|modal|usahawan|kopi|burger|rider|trak makanan|restoran|kedai makan)\b/i.test(ideaText);
    const isFamily = /\b(keluarga|ibu|emak|ayah|bapa|anak|rumah pusaka|arwah|kasih sayang|pengorbanan keluarga)\b/i.test(ideaText);

    let domain = "GENERAL";
    if (isInvestigation) domain = "INVESTIGATION";
    else if (isBatik) domain = "BATIK";
    else if (isWoodcarving) domain = "UKIRAN";
    else if (isSilat) domain = "SILAT";
    else if (isFisherman) domain = "FISHERMAN";
    else if (isRescue) domain = "RESCUE";
    else if (isHealthcare) domain = "HEALTHCARE";
    else if (isStudent) domain = "STUDENT";
    else if (isCulinary) domain = "CULINARY";
    else if (isSports) domain = "SPORTS";
    else if (isBusiness) domain = "BUSINESS";
    else if (isWeaving) domain = "SONGKET";
    else if (isFamily) domain = "FAMILY";

    const hasLetter = /(surat|warkah|pesanan|amanah|letter|note|wasiat)/i.test(ideaText);

    return {
      text,
      isMalay,
      isFemale,
      isElderly,
      isStudent,
      extractedAge,
      studentGrade,
      extractedName,
      hasFatherMention,
      hasLetter,
      domain,
      craft: domain
    };
  },

  // Intelligent Rule-Based Project Synthesizer
  synthesizeProject(params) {
    const analysis = this.analyzeIdeaContext(params.idea, params);
    const domainPkg = buildDomainPackage(analysis, params);
    const {
      characters,
      locationName,
      activeProps,
      soundDesign,
      story,
      craftSceneActions
    } = domainPkg;

    const projectId = "PROJ_" + Date.now().toString(36).toUpperCase();
    const leadChar = characters[0];

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
    let cumulativeSeconds = 0;
    const formatMMSS = (sec) => {
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    for (let i = 1; i <= sceneCount; i++) {
      const sceneActionData = craftSceneActions[i - 1] || craftSceneActions[(i - 1) % craftSceneActions.length];
      const sceneId = `SCENE_${String(i).padStart(3, "0")}`;
      const currentSceneDur = sceneDurations[i - 1];
      const sceneStartTime = cumulativeSeconds;
      const sceneEndTime = cumulativeSeconds + currentSceneDur;
      cumulativeSeconds = sceneEndTime;

      const timingStr = `${formatMMSS(sceneStartTime)} - ${formatMMSS(sceneEndTime)}`;

      let speakerChar = leadChar;
      if (characters.length > 1 && sceneActionData.speaker) {
        const sup = characters[1];
        const speakerLower = sceneActionData.speaker.toLowerCase();
        if (speakerLower.includes(sup.name.toLowerCase()) || 
            (sup.role && speakerLower.includes(sup.role.toLowerCase())) ||
            (!speakerLower.includes(leadChar.name.toLowerCase()) && !speakerLower.includes("lead"))) {
          speakerChar = sup;
        }
      }

      const presentIds = characters.length > 1 && (i === 1 || i === Math.ceil(sceneCount / 2) || i === sceneCount)
        ? characters.map(c => c.id)
        : [leadChar.id];

      const activeCharsLocked = characters
        .filter((c) => presentIds.includes(c.id))
        .map((c) => `[${c.id}: ${c.name}, ${c.lockedDescription}]`);

      // Calculate narrative time progression and lighting across sceneCount
      const progressRatio = sceneCount > 1 ? (i - 1) / (sceneCount - 1) : 0;
      let timeOfDay = "Awal pagi hening";
      let dynamicLighting = "Soft cool morning ambient light with gentle directional sunbeams";

      if (analysis.domain === "INVESTIGATION") {
        if (progressRatio < 0.2) {
          timeOfDay = "Larut malam remang (11:30 PM)";
          dynamicLighting = "Moody low-key terminal glow with stark blue neon shadows and screen reflections";
        } else if (progressRatio < 0.45) {
          timeOfDay = "Tengah malam berhujan lebat (1:15 AM)";
          dynamicLighting = "Rain-slicked neon street reflections with harsh directional headlights and deep shadows";
        } else if (progressRatio < 0.7) {
          timeOfDay = "Waktu krisis genting (3:30 AM)";
          dynamicLighting = "Emergency red strobe warning pulses and harsh high-contrast server rack LEDs";
        } else if (progressRatio < 0.9) {
          timeOfDay = "Ambang fajar subuh sejuk (5:15 AM)";
          dynamicLighting = "Dramatic silhouette backlight against rain-washed industrial darkness";
        } else {
          timeOfDay = "Fajar pagi keemasan (7:00 AM)";
          dynamicLighting = "Glorious golden dawn light piercing through morning mist, triumphant atmospheric clarity";
        }
      } else {
        if (progressRatio < 0.2) {
          timeOfDay = "Awal pagi hening berkabus (7:00 AM)";
          dynamicLighting = "Soft diffuse morning light with low ambient shadows and gentle sunbeams";
        } else if (progressRatio < 0.45) {
          timeOfDay = "Tengah hari cerah bertenaga (11:30 AM)";
          dynamicLighting = "Crisp bright natural daylight with sharp focused dimensional contrast";
        } else if (progressRatio < 0.7) {
          timeOfDay = "Petang mendung mencabar (3:45 PM)";
          dynamicLighting = "Moody overcast drama with warm directional tungsten practical lamps";
        } else if (progressRatio < 0.9) {
          timeOfDay = "Senja merah kemuncak (6:30 PM)";
          dynamicLighting = "Intense golden hour rim light and long cinematic dramatic shadows";
        } else {
          timeOfDay = "Pagi keemasan gemilang (8:00 AM)";
          dynamicLighting = "Warm triumphant volumetric golden rays illuminating the scene";
        }
      }

      // Scene-specific location and props
      const sceneLocation = sceneActionData.environment || locationName;
      const sceneLocationEn = sceneActionData.environmentEn || sceneLocation;
      const sceneProps = sceneActionData.props || activeProps.join(", ");
      const scenePropsEn = sceneActionData.propsEn || sceneProps;
      const sceneActionEn = sceneActionData.visualActionEn || sceneActionData.action;
      const sceneExpressionEn = sceneActionData.expressionEn || sceneActionData.emotion;
      const sceneBodyLanguageEn = sceneActionData.bodyLanguageEn || "Natural, alert posture adhering strictly to the scene action with authentic emotional depth";

      const imgPrompt = promptBuilder.buildImagePrompt({
        characterLockedDescriptions: activeCharsLocked,
        action: sceneActionEn,
        expression: sceneExpressionEn,
        bodyLanguage: sceneBodyLanguageEn,
        environment: sceneLocationEn,
        props: scenePropsEn,
        timeOfDay: timeOfDay,
        lighting: dynamicLighting,
        cameraAngle: sceneActionData.cam.shotType,
        lens: sceneActionData.cam.lens,
        composition: "Cinematic rule of thirds with organic depth of field",
        visualStyle: params.visualStyle,
        aspectRatio: params.aspectRatio
      });

      const domainEnvMovements = {
        STUDENT: "Subtle window breeze swaying classroom curtains, natural classroom atmosphere",
        BATIK: "Gentle rising steam from wax pot, subtle fabric sway",
        UKIRAN: "Fine wood dust floating gently in warm sunlight",
        BUSINESS: "Gentle steam rising from beverages/cooking, subtle ambient street motion",
        HEALTHCARE: "Subtle ambient clinical light reflections, calm clinical environment",
        RESCUE: "Swirling atmospheric mist/smoke particles, emergency light pulse in background",
        SPORTS: "Breeze fluttering stadium banners, runner breath vapor in air",
        CULINARY: "Gentle aromatic steam billowing from pan, subtle heat haze",
        FAMILY: "Soft golden dust motes floating gently in sunlit room",
        SILAT: "Subtle dust swirling from grounded footwork, gentle leaves rustling",
        FISHERMAN: "Fine ocean mist floating in warm sunlight, gentle boat sway",
        INVESTIGATION: "Blinking cyber server LED rack lights, subtle rain streaks on window, moody atmospheric noir haze",
        GENERAL: "Atmospheric natural dust motes floating gently in volumetric sunlight"
      };
      const envMovement = domainEnvMovements[analysis.domain] || domainEnvMovements.GENERAL;

      const vidPrompt = promptBuilder.buildVideoPrompt({
        characterLockedDescriptions: activeCharsLocked,
        action: sceneActionEn,
        movement: `Fluid natural movement at 24fps. ${sceneActionData.cam.movement}`,
        expression: sceneExpressionEn,
        environmentMovement: envMovement,
        cameraMovement: sceneActionData.cam.movement,
        cameraAngle: sceneActionData.cam.shotType,
        lighting: dynamicLighting,
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
        objective: sceneActionData.objective || `Menggerakkan perkembangan fasa ${i} berfokuskan usaha ${leadChar.name}.`,
        location: sceneLocation,
        time: timeOfDay,
        environment: sceneLocation,
        environmentEn: sceneLocationEn,
        props: sceneProps,
        propsEn: scenePropsEn,
        charactersPresent: presentIds,
        characterPositions: presentIds.length > 1 ? `${leadChar.name} di bahagian tengah, ${characters[1].name} di latar sisi.` : `${leadChar.name} berada di tengah bingkai.`,
        action: sceneActionData.action,
        visualActionEn: sceneActionEn,
        emotion: sceneActionData.emotion,
        expressionEn: sceneExpressionEn,
        bodyLanguageEn: sceneBodyLanguageEn,
        narration: sceneActionData.narration || (isMalay ? `Setiap detik perjuangan ${leadChar.name} membuktikan ketabahan hati menyongsong impian.` : `Every step forward tests the resolve within.`),
        dialogue: {
          characterId: speakerChar.id,
          speaker: speakerChar.name,
          text: sceneActionData.dialogueText,
          emotion: sceneActionData.emotion,
          voiceDirection: sceneActionData.voiceDirection || (speakerChar.gender === "Female" ? "Nada bersemangat, ceria dan yakin" : "Nada tenang berwawasan penuh azam"),
          speed: speakerChar.gender === "Female" ? "0.92x" : "0.88x",
          pause: "Jeda 1 saat pada perkataan penting",
          emphasis: sceneActionData.emphasis || "tekad, kejayaan, keikhlasan"
        },
        camera: {
          shotType: sceneActionData.cam.shotType,
          movement: sceneActionData.cam.movement,
          lens: sceneActionData.cam.lens,
          angle: "Eye Level"
        },
        lighting: dynamicLighting,
        sfx: (sceneActionData.sfx && sceneActionData.sfx.length > 0)
          ? sceneActionData.sfx.map(item => ({
              name: item.name,
              volume: item.volume || "60%",
              timing: timingStr,
              purpose: item.purpose
            }))
          : [
              {
                name: "Bunyi suasana latar babak",
                volume: "60%",
                timing: timingStr,
                purpose: "Menghidupkan mood persekitaran babak secara nyata"
              }
            ],
        music: {
          cue: params.musicStyle !== "None"
            ? (sceneActionData.musicCue || "Alunan muzik sinematik mengikut emosi babak")
            : "Tiada muzik",
          mood: sceneActionData.emotion || "Menyentuh jiwa dan bersemangat",
          tempo: soundDesign.bpmRange ? soundDesign.bpmRange.split(" ")[0] + " BPM" : "70 BPM"
        },
        imagePrompt: imgPrompt,
        videoPrompt: vidPrompt,
        voPrompt: voPrompt
      });
    }

    // Continuity tracking
    const continuityLighting = {
      BATIK: "Warm volumetric sunlight streaming through traditional workshop windows",
      UKIRAN: "Warm golden sunlight illuminating natural wood grain and wood shavings",
      STUDENT: "Bright fluorescent classroom lights transitioning into soft warm study glow",
      BUSINESS: "Dynamic morning market sunlight and warm street stall pendant lamps",
      HEALTHCARE: "Sterile cool-white hospital lighting with focused medical diagnostic lamps",
      RESCUE: "Moody emergency blue-red strobe flashes in heavy rain and overcast storm skies",
      SPORTS: "Brilliant stadium floodlights cutting through mist on the green field",
      CULINARY: "Warm kitchen ambient lighting with radiant golden glow from stove flames",
      FAMILY: "Cozy warm living room ambient glow with soft evening window light",
      SILAT: "Dramatic twilight backlight filtering through tropical rainforest trees onto the gelanggang",
      FISHERMAN: "Epic golden sunrise reflecting off calm coastal ocean water and mist",
      INVESTIGATION: "Moody low-key noir lighting with high-contrast shadows and glowing cyber terminals",
      GENERAL: "Cinematic natural ambient lighting with directional key light"
    };

    const continuityTime = {
      BATIK: "Petang redup hingga pagi keemasan",
      UKIRAN: "Pagi hingga senja",
      STUDENT: "Awal pagi persekolahan hingga malam ulang kaji peperiksaan",
      BUSINESS: "Subuh persediaan gerai hingga malam pelanggan berpusu-pusu",
      HEALTHCARE: "Syif malam kecemasan hingga fajar kelegaan",
      RESCUE: "Detik kecemasan hujan lebat hingga reda penyelamatan berjaya",
      SPORTS: "Latihan intensif petang hingga detik perlawanan kemuncak malam",
      CULINARY: "Awal pagi ke pasar hingga hidangan siap disajikan waktu makan",
      FAMILY: "Petang pertemuan keluarga hingga malam keakraban",
      SILAT: "Subuh latihan asas hingga senja ujian persilatan",
      FISHERMAN: "Pagi buta bertolak ke laut hingga petang bot pulang membawa hasil",
      INVESTIGATION: "Malam siasatan bilik operasi hingga konfrontasi fajar",
      GENERAL: "Permulaan cabaran hingga fajar kejayaan"
    };

    const continuity = {
      primaryLocation: locationName,
      activeProps: activeProps,
      timeProgression: continuityTime[analysis.domain] || "Permulaan hingga kemuncak kejayaan",
      weather: analysis.domain === "RESCUE" ? "Hujan lebat berselang ribut" : "Tenang dan berseri",
      lightingTheme: continuityLighting[analysis.domain] || "Cinematic volumetric lighting"
    };

    const newProject = {
      id: projectId,
      name: params.name || story.title,
      analysis: analysis,
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
    const sceneActionEn = refreshed.visualActionEn || refreshed.action;
    const sceneExpressionEn = refreshed.expressionEn || refreshed.emotion || "Calm and concentrated";
    const sceneBodyLanguageEn = refreshed.bodyLanguageEn || "Natural, alert posture adhering strictly to the scene action with authentic emotional depth";
    const sceneEnvironmentEn = refreshed.environmentEn || refreshed.environment || refreshed.location || "Cinematic setting";
    const scenePropsEn = refreshed.propsEn || refreshed.props || "Essential scene equipment";

    refreshed.imagePrompt = promptBuilder.buildImagePrompt({
      characterLockedDescriptions: lockedStrs,
      action: sceneActionEn,
      expression: sceneExpressionEn,
      bodyLanguage: sceneBodyLanguageEn,
      environment: sceneEnvironmentEn,
      props: scenePropsEn,
      timeOfDay: refreshed.time,
      lighting: refreshed.lighting || "Warm cinematic lighting",
      cameraAngle: refreshed.camera?.shotType || "Medium Shot",
      lens: refreshed.camera?.lens || "50mm f/1.8",
      visualStyle: projectStyle,
      aspectRatio: "16:9"
    });

    refreshed.videoPrompt = promptBuilder.buildVideoPrompt({
      characterLockedDescriptions: lockedStrs,
      action: sceneActionEn,
      movement: refreshed.camera?.movement || "Slow cinematic dolly in",
      expression: sceneExpressionEn,
      environmentMovement: "Atmospheric natural dust motes floating in volumetric light",
      cameraMovement: refreshed.camera?.movement || "Smooth dolly motion",
      cameraAngle: refreshed.camera?.shotType || "Medium Shot",
      lighting: refreshed.lighting || "Warm volumetric light",
      cinematicStyle: projectStyle
    });

    return refreshed;
  }
};
