// Narrative Arc Builder for Master AI Video Prompt Studio
// Dynamically expands storylines into N unique, progressive, non-repeating scenes (up to 30+ scenes)
// Guarantees cinematic progression with 100% unique per-scene props, environments, actions, and English AI prompt directives.

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
  const sup = characters.length > 1 ? characters[1].name : "Rakan";

  // Build 30 progressive beats per domain
  const domainBeatsGenerators = {
    INVESTIGATION: (name, antagonist, defaultProps) => [
      {
        title: "Panggilan Siasatan & Skrin Remang",
        objective: "Menerima fail kes serangan siber pertama dan mengenal pasti ancaman awal.",
        action: `${name} berdiri di hadapan dinding monitor bilik siasatan, meneliti barisan kod log keselamatan yang meluncur laju.`,
        visualActionEn: "standing alert before a wall of glowing terminal monitors, analyzing cascades of scrolling green intrusion code on the cyber security dashboard",
        dialogueText: "Sesuatu yang besar sedang berlaku... ini bukan pencerobohan biasa.",
        speaker: name,
        emotion: "Fokus tajam dan waspada",
        expressionEn: "Piercing analytical focus, slight furrow of the brow with growing suspicion",
        bodyLanguageEn: "Upright vigilant posture, arms crossed before touching terminal controls with steady precision",
        environment: "Bilik Gerakan Siasatan Siber remang dengan dinding monitor bercahaya hijau",
        environmentEn: "Dimly lit cyber operations war room with multi-screen surveillance monitors casting an emerald green glow",
        props: "Dinding monitor data, cawan kopi seramik sejuk, papan kekunci mekanikal berlampu belakang, lencana detektif",
        propsEn: "Multi-screen cyber command console, cold ceramic coffee mug, backlit tactical mechanical keyboard, silver detective badge",
        cam: { shotType: "Medium Shot", lens: "50mm f/1.4", movement: "Slow Dolly In" },
        narration: "Di dunia digital yang gelap, jenayah tidak meninggalkan cap jari fizikal, melainkan barisan kod bayang.",
        sfx: [{ name: "Ketukan papan kekunci bertalu-talu & denyutan amaran server", volume: "65%", purpose: "Membina suasana permulaan siasatan cemas" }],
        musicCue: "Denyutan bass synth perlahan berirama ritma jam berdetik"
      },
      {
        title: "Analisis Anomali & Kod Berbahaya",
        objective: "Mengasingkan laluan serangan siber pertama yang menembusi firewall induk.",
        action: `${name} memperbesar graf aliran rangkaian data pada skrin tablet forensiknya, mengecilkan kening mengesan corak pelik.`,
        visualActionEn: "leaning over a dual-monitor workstation, dissecting an encrypted malware trace with forensic diagnostic graphs reflected in his eyes",
        dialogueText: "Penceroboh ini memadamkan laluannya dalam masa 0.3 saat. Teramat licik.",
        speaker: name,
        emotion: "Kagum bercampur curiga",
        expressionEn: "Intensely engaged, narrowing eyes as an anomaly in the data stream is isolated",
        bodyLanguageEn: "Leaning forward over the desk, hands hovering decisively above dual trackpads",
        environment: "Makmal forensik digital terasing dengan rak pelayan dan pencahayaan biru sejuk",
        environmentEn: "High-tech digital forensics lab with chilled server racks, dual curved displays, and moody blue LED edge-lighting",
        props: "Tablet forensik berskrin sentuh, pemacu kilat penyahsulit, kabel gentian optik, sarung tangan antistatik",
        propsEn: "Rugged forensic touchscreen tablet, hardware decryption dongle, shielded fiber optic diagnostic cables, antistatic gloves",
        cam: { shotType: "Close-Up Screen Reflection", lens: "85mm f/1.4", movement: "Slow Pan across terminal code" },
        narration: "Setiap anomali data adalah jejak serigala yang meninggalkan bau di celah belukar maya.",
        sfx: [{ name: "Dengungan kipas pelayan bilik sejuk & klik tetikus pantas", volume: "60%", purpose: "Menonjolkan tumpuan analitikal watak" }],
        musicCue: "Gesekan cello solo gelap sarat tanda tanya"
      },
      {
        title: "Papan Siasatan & Teka-teki Karberos",
        objective: "Menyusun hipotesis awal dan menyambung benang merah kes di papan bukti.",
        action: `${name} melekatkan gambar lokasi serbuan dan menyemat benang merah ke arah satu nama samaran misteri: Karberos.`,
        visualActionEn: "pinning a handwritten cipher note to the evidence board and connecting a red string to the mysterious wolf insignia labeled KARBEROS",
        dialogueText: "Karberos... apa sebenarnya yang kamu cari di sebalik serangan bertubi-tubi ini?",
        speaker: name,
        emotion: "Penyiasatan mendalam",
        expressionEn: "Deep contemplation, jaw clenched with quiet strategic determination",
        bodyLanguageEn: "Stepping back with one hand on hip, scrutinizing the web of interconnected clues",
        environment: "Bilik siasatan detektif dengan papan gabus bukti besar berjalin benang merah",
        environmentEn: "Gritty detective war room with a sprawling cork evidence board, overhead tungsten desk lamps, and atmospheric haze",
        props: "Papan gabus bukti, foto suspek kabur, benang merah pengait kes, pin penanda peta, fail Manila bertanda SULIT",
        propsEn: "Expansive cork evidence board pinned with blurred CCTV stills, interconnected red wool yarn, brass thumb tacks, classified manila folders",
        cam: { shotType: "Medium Shot", lens: "35mm f/2.0", movement: "Slow Tracking across evidence board" },
        narration: "Titik-titik bukti yang berasingan mula membentuk lakaran wajah seorang dalang tanpa nama.",
        sfx: [{ name: "Bunyi pin ditekan pada papan gabus & helaan nafas berat", volume: "50%", purpose: "Menggambarkan dedikasi seorang penyiasat" }],
        musicCue: "Alunan ambient noir dingin dengan petikan piano minimalis"
      },
      {
        title: "Menerjah Lokasi Pencerobohan Pertama",
        objective: "Memeriksa lokasi fizikal di mana terminal kawalan data telah diakses.",
        action: `${name} melangkah masuk melepasi pita garisan kuning polis, meneliti bilik utiliti yang berselerak dengan wayar gentian optik terputus.`,
        visualActionEn: "stepping cautiously through shattered glass in an abandoned telecom vault, sweeping a narrow tactical flashlight beam across vandalized server cabinets",
        dialogueText: "Dia berada di bilik ini kurang daripada lima belas minit yang lalu.",
        speaker: name,
        emotion: "Berwaspada dan bersedia",
        expressionEn: "High combat vigilance, breath visible in the chilled damp night air",
        bodyLanguageEn: "Low tactical crouch, flashlight held parallel to sightline, senses heightened",
        environment: "Gudang telekomunikasi lama yang terabai dengan wayar tergantung dan lantai basah",
        environmentEn: "Abandoned industrial telecom hub with dangling severed wiring, puddles reflecting streetlights, and volumetric night fog",
        props: "Lampu picit taktikal LED berkuasa tinggi, pita garisan kuning polis, sarung tangan nitril hitam, pengimbas frekuensi mudah alih",
        propsEn: "High-lumen tactical LED flashlight beam cutting through airborne dust, yellow police barricade tape, black nitrile gloves, handheld RF frequency scanner",
        cam: { shotType: "Low Angle Handheld", lens: "24mm f/2.8", movement: "Slow Creep into Crime Scene" },
        narration: "Di lokasi jenayah yang sunyi, udara masih menyimpan sisa ketegangan pencerobohan.",
        sfx: [{ name: "Derap kasut taktikal di atas serpihan kaca & deringan radio polis", volume: "65%", purpose: "Menetapkan realiti lokasi jenayah sebenar" }],
        musicCue: "Dengungan sub-bass bergetar rendah membina rasa bahaya"
      },
      {
        title: "Petunjuk Pemacu Kilat Tersorok",
        objective: "Menemui perkakasan storan terselindung yang sengaja ditinggalkan suspek.",
        action: `${name} menyuluh lampu picit taktikal ke celah rak besi pelayan, menemui pemacu pena khas berukir simbol kepala serigala.`,
        visualActionEn: "using precision metal tweezers to extract a wolf-engraved titanium USB drive hidden behind a severed server cable into an evidence bag",
        dialogueText: "Dia tinggalkan ini untuk aku. Ini bukan kecuaian... ini satu jemputan.",
        speaker: name,
        emotion: "Terkejut dan teruja",
        expressionEn: "Sudden realization of a deliberate trap, eyes widening with profound intrigue",
        bodyLanguageEn: "Kneeling on one knee, holding the USB up to the tactical flashlight beam for inspection",
        environment: "Sudut sempit di belakang rak pelayan utama yang berdebu tebal",
        environmentEn: "Cramped dusty cavity behind a rusted industrial server rack with exposed copper busbars and cobwebs",
        props: "Pemacu pena titanium berukir lambang serigala Karberos, penyepit forensik keluli tahan karat, beg bukti plastik lutsinar",
        propsEn: "Titanium custom USB flash drive laser-etched with a three-headed wolf crest, stainless steel forensic tweezers, clear sealed tamper-evident evidence pouch",
        cam: { shotType: "Extreme Close-Up Macro", lens: "100mm Macro f/2.8", movement: "Rack Focus on USB Symbol" },
        narration: "Bila penjenayah meninggalkan petunjuk sengaja, siasatan bertukar menjadi permainan psikologi.",
        sfx: [{ name: "Dentang halus logam USB diambil & hembusan angin malam dari tingkap", volume: "60%", purpose: "Detik penemuan bukti penting" }],
        musicCue: "Nada synth tinggi mengejutkan berpadu denyutan orkestra tegang"
      },
      {
        title: "Soal Siasat Saksi Utama",
        objective: "Mendapatkan maklumat tentang kelibat suspek daripada jurutera syif malam.",
        action: `${name} duduk bertentangan dengan saksi yang cemas, menatap matanya mencari konsistensi jawapan sambil mencatat nota.`,
        visualActionEn: "sitting across a metal table from a trembling night technician, sliding a photo of the wolf symbol across the table while observing the witness micro-expressions",
        dialogueText: "Bertenang. Ceritakan semula... apa yang anda lihat sebelum lampu keselamatan padam?",
        speaker: name,
        emotion: "Tegas tetapi menenangkan",
        expressionEn: "Calm yet unyielding authority, penetrating eye contact that invites honesty",
        bodyLanguageEn: "Seated firmly upright, leaning slightly forward with arms resting calmly on the table",
        environment: "Bilik soal siasat berdinding akustik kelabu dengan cermin dua hala",
        environmentEn: "Stark concrete interrogation room with a soundproof one-way observation mirror, single hanging overhead pendant lamp, and stark shadows",
        props: "Cawan kertas kopi, perakam suara digital berskrin OLED, buku nota siasatan berlapik kulit, pen balpoint hitam",
        propsEn: "Crushed paper coffee cup, miniature OLED digital voice recorder, weathered leather pocket notebook, black tactical ballpoint pen",
        cam: { shotType: "Over-the-Shoulder Medium Close-Up", lens: "85mm f/1.4", movement: "Subtle Handheld Push" },
        narration: "Kebenaran sering kali tersembunyi di celah kegugupan dan ayat yang tidak dihabiskan.",
        sfx: [{ name: "Goresan mata pen pada kertas & cawan kopi diletakkan di meja", volume: "55%", purpose: "Suasana bilik soal siasat yang tegang" }],
        musicCue: "Melodi bertempo perlahan dengan ketukan metronom samar"
      },
      {
        title: "Dekripsi Data Forensik",
        objective: "Memasukkan bukti digital ke dalam sistem analisis terasing untuk membaca fail tersulit.",
        action: `${name} menyambung pemacu pena ke komputer forensik terlindung, menyaksikan barisan kod penyahsulit berputar laju.`,
        visualActionEn: "connecting the encrypted wolf drive into an air-gapped forensic workstation, watching lines of brute-force cryptographic keys flash across the terminal",
        dialogueText: "Mari kita lihat rahsia apa yang kamu sembunyikan di sebalik kod enkripsi 512-bit ini.",
        speaker: name,
        emotion: "Tumpuan mutlak",
        expressionEn: "Tense anticipation, biting his lower lip as the decryption progress bar nears completion",
        bodyLanguageEn: "Fingers poised above the mechanical keyboard, body wound tight like a coiled spring",
        environment: "Bilik sangkar Faraday terlindung sinaran elektromagnetik tanpa sambungan internet",
        environmentEn: "Copper-mesh shielded Faraday isolation cage with flickering fluorescent tube lighting and an isolated offline mainframe terminal",
        props: "Komputer riba medan lasak getah hitam (Toughbook), kabel penyahsulit terlindung, pemasa analog, kertas log kod tangan",
        propsEn: "Ruggedized black Toughbook laptop, shielded interface cable, mechanical analog stopwatch, handwritten hex dump sheets",
        cam: { shotType: "Close-Up Face and Screen", lens: "50mm f/1.2", movement: "Slow Circular Arc" },
        narration: "Setiap saat yang berlalu adalah perlumbaan antara kuasa pemprosesan dan kunci keselamatan.",
        sfx: [{ name: "Ketukan pemproses komputer berdering laju & bar kemajuan memuat", volume: "65%", purpose: "Membina debaran fasa pembongkaran data" }],
        musicCue: "Arpeggio synth elektronik berulang laju menaikkan tempo"
      },
      {
        title: "Mesej Teka-teki Pertama",
        objective: "Membaca mesej peribadi yang ditinggalkan Karberos khusus buat watak utama.",
        action: `Skrin memancarkan teks merah terang: Salam Kamal. Jam sudah mula berdetik untuk projek yang kamu lupa. ${name} tergamam.`,
        visualActionEn: "staggering back slightly as his own surveillance photograph and full name flash on the decrypted terminal monitor alongside a ticking countdown clock",
        dialogueText: "Bagaimana dia tahu nama aku? Dan apa kaitan kes ini dengan projek lama itu?",
        speaker: name,
        emotion: "Tergamam dan tercabar",
        expressionEn: "Stunned shock transforming rapidly into cold dread and personal realization",
        bodyLanguageEn: "Sudden recoil, one hand instinctively gripping the edge of the desk, chest heaving",
        environment: "Bilik komputer forensik bertukar remang disinari cahaya amaran merah",
        environmentEn: "Darkened computer bay cast in sinister blood-red emergency glow as the workstation display locks up and flickers",
        props: "Skrin monitor memaparkan teks SALAM KAMAL, telefon pintar sulit bergetar, fail siasatan terbuka",
        propsEn: "Flashing monochrome CRT display reading GREETINGS DETECTIVE KAMAL, vibrating encrypted burner smartphone, splayed case files",
        cam: { shotType: "Extreme Close-Up Eyes", lens: "100mm f/2.8", movement: "Fast Snap Zoom" },
        narration: "Bila nama sendiri terpampang di layar musuh, pemburuan ini bukan lagi sekadar tugas rasmi.",
        sfx: [{ name: "Bip ralat sistem berdentang tajam & tarikan nafas terkejut", volume: "70%", purpose: "Detik kejutan plot bermula" }],
        musicCue: "Dentuman brass padu (braam) sinematik bergegar"
      },
      {
        title: "Menjejak Alamat IP Proksi",
        objective: "Menyusuri rangkaian maya untuk menentukan koordinat fizikal penghantaran isyarat.",
        action: `${name} memetakan laluan nod dari pelayan antarabangsa sehingga ke satu zon perindustrian lama di pinggir bandar.`,
        visualActionEn: "tracking an encrypted signal bouncing across international proxy nodes until the digital tracer locks onto an abandoned power station in the city outskirts",
        dialogueText: "Isyarat ini melantun melalui lima negara, tetapi penghujungnya kembali ke bandar ini!",
        speaker: name,
        emotion: "Keazaman memuncak",
        expressionEn: "Electric surge of adrenaline, focused hunter instinct taking over",
        bodyLanguageEn: "Standing tall, finger pressed firmly onto the touchscreen target zone on the map",
        environment: "Pusat kawalan komunikasi satelit polis dengan peta unjuran radar 3D",
        environmentEn: "Tactical satellite telemetry room with holographic 3D digital city elevation maps and blue geospatial vector overlays",
        props: "Peta unjuran geolokasi bandar, kanta pembesar digital, alat dengar komunikasi wayarles, penanda koordinat GPS",
        propsEn: "3D geospatial city projection grid, digital touchscreen map interface, wireless earpiece communicator, GPS coordinate telemetry tracker",
        cam: { shotType: "Overhead Map Display", lens: "35mm f/1.8", movement: "Top-Down Crane Pan" },
        narration: "Di sebalik peta digital yang berselirat, satu titik merah menyala menandakan sarang rahsia.",
        sfx: [{ name: "Peta digital meluncur & bunyi klik tetikus berturut-turut", volume: "60%", purpose: "Menunjukkan kemahiran perisikan geolokasi" }],
        musicCue: "Irama dram berdetak tegas menandakan fasa pergerakan fizikal bermula"
      },
      {
        title: "Taklimat Taktikal Pasukan",
        objective: "Menyelaraskan pasukan penyiasat sebelum serbuan pertama dijalankan.",
        action: `${name} berdiri di hadapan pasukan taktikal berpakaian kalis peluru, menunjukkan pelan lantai bangunan sasaran.`,
        visualActionEn: "strapping on a tactical body armor vest while briefing a squad of armed tactical officers in front of an illuminated building blueprint",
        dialogueText: "Sasaran kita sangat peka pada sistem pemantauan. Masuk secara senyap, jangan beri ruang dia padamkan data.",
        speaker: name,
        emotion: "Berwibawa dan tegas",
        expressionEn: "Steely leadership, commanding authority with zero margin for error",
        bodyLanguageEn: "Fastening side velcro straps of the tactical vest, gesturing decisively toward the target entry points",
        environment: "Bilik senjata taktikal dengan papan pelan lantai bangunan sasaran",
        environmentEn: "Tactical armory and raid briefing room with rows of ballistic plate carriers, tactical carbines, and an architectural blueprint display",
        props: "Pelan arkitek bangunan sasaran berlampu belakang, jaket kalis peluru berlabel POLIS, radio komunikasi frekuensi sulit, jam taktikal",
        propsEn: "Backlit architectural blueprint lightbox, Kevlar ballistic vest stenciled with POLICE, frequency-hopping tactical comms headset, matte black combat watch",
        cam: { shotType: "Medium Wide Shot", lens: "35mm f/2.0", movement: "Tracking along team members" },
        narration: "Sebelum pintu diterjah, setiap anggota memaut keazaman yang sama di bawah satu panji amanah.",
        sfx: [{ name: "Kokangan jaket kalis peluru & radio taktikal berdesir Roger", volume: "65%", purpose: "Persiapan aksi serbuan yang realistik" }],
        musicCue: "Gubahan orkestra rendah bertenaga penuh disiplin taktikal"
      },
      {
        title: "Perjalanan Merentas Hujan Lebat",
        objective: "Menuju ke zon sasaran di bawah cuaca ribut malam yang menyembunyikan pergerakan.",
        action: `${name} memandu kereta peronda tanpa tanda membelah jalanan basah bermandikan cahaya neon lampu isyarat bandar.`,
        visualActionEn: "gripping the steering wheel of the unmarked pursuit cruiser, eyes narrowed through rain-swept glass as sirens wail distantly in the deluge",
        dialogueText: "Semoga kita tidak terlewat... firasat aku mengatakan ada sesuatu yang tidak kena.",
        speaker: name,
        emotion: "Tegang dan berwaspada",
        expressionEn: "Steely grim determination, jaw set firmly against the stormy darkness",
        bodyLanguageEn: "Tense posture behind the steering wheel, knuckles white from a firm grip, shifting gears swiftly",
        environment: "Di dalam kereta peronda membelah lebuh raya bandar dalam ribut hujan lebat",
        environmentEn: "Interior of an unmarked police sedan speeding through heavy midnight rain, neon billboards and streetlight reflections streaking across the water-drenched windshield",
        props: "Stereng kereta berbalut kulit, radio polis berdesir statik, telefon navigasi GPS menyala biru, pistol perkhidmatan dalam sarung sisi",
        propsEn: "Leather-wrapped steering wheel, dashboard police scanner crackling with code transmissions, glowing blue GPS navigation display, holstered service sidearm",
        cam: { shotType: "Inside Car POV through rain windshield", lens: "50mm f/1.2", movement: "Smooth Vehicle Tracking" },
        narration: "Di bawah curahan hujan lebat, kota metropolitan kelihatan seperti labirin tanpa penghujung.",
        sfx: [{ name: "Pengelap cermin berayun laju & deruan hujan lebat di bumbung kereta", volume: "70%", purpose: "Mewujudkan atmosfera noir sinematik yang kuat" }],
        musicCue: "Gesekan strings melankolik sarat ketegangan menunggu saat bertindak"
      },
      {
        title: "Mengepung Fasiliti Sasaran",
        objective: "Mengepung kompleks pencawang elektrik industri di bawah litupan kabus malam.",
        action: `${name} mengarahkan anggota mengepung perimeter pagar kawat, memotong rantai dengan pemotong besi tanpa mengeluarkan bunyi.`,
        visualActionEn: "slicing through a chain-link perimeter gate with heavy bolt cutters, leading tactical officers into the shadows of humming electrical transformers",
        dialogueText: "Dua orang di pintu barat, selebihnya ikut aku ke pintu kecemasan.",
        speaker: name,
        emotion: "Kewaspadaan tinggi dan senyap",
        expressionEn: "Hyper-alert, breath steaming in the wet nocturnal mist",
        bodyLanguageEn: "Low stalking posture, slicing quickly through chain link, holding up two fingers to signal hold position",
        environment: "Luar perimeter kompleks pencawang elektrik industri yang sunyi dan berkabus tebal",
        environmentEn: "Exterior perimeter fence of a rain-lashed industrial power substation, high-voltage transformers humming ominously in the wet mist",
        props: "Pemotong pagar bolt keluli, lampu taktikal berpenapis merah, senapang patah pembuka pintu, jaket kalis air basah",
        propsEn: "Heavy-duty bolt cutters, red-filtered low-signature tactical flashlight, breaching shotgun, damp tactical windbreaker",
        cam: { shotType: "Low Angle Handheld", lens: "28mm f/2.0", movement: "Creeping Perimeter Dolly" },
        narration: "Dalam kesunyian malam, setiap derap langkah adalah perjudian antara serbuan atau serang hendap.",
        sfx: [{ name: "Dawai kawat dipotong putus & deruan transformer voltan tinggi", volume: "60%", purpose: "Ketegangan penyusupan taktikal" }],
        musicCue: "Dengungan sub-bass getaran industri sejuk"
      },
      {
        title: "Menerobos Masuk Lorong Bawah Tanah",
        objective: "Menyusup masuk ke koridor penyelenggaraan bawah tanah bangunan sasaran.",
        action: `${name} menolak pintu keluli berkarat, mengacukan lampu senjata menyusuri paip stim yang membeku dalam kegelapan.`,
        visualActionEn: "raising his weapon-mounted flashlight to clear the corners of a shadowy subterranean maintenance corridor, boots splashing silently through shallow condensation",
        dialogueText: "Tiada pengawal di pintu depan... laluan ini terlalu mudah. Berjaga-jaga.",
        speaker: name,
        emotion: "Waspada mengesan perangkap",
        expressionEn: "Intense tactical focus, eyes scanning sightlines for ambushes",
        bodyLanguageEn: "Weapon held in two-handed tactical ready position, moving forward with deliberate heel-to-toe tactical steps",
        environment: "Koridor konkrit sempit dengan lampu kecemasan berkelip kuning amaran",
        environmentEn: "Concrete industrial subterranean hallway with exposed steam pipes and amber strobe hazard lights reflecting on wet floors",
        props: "Senjata api taktikal dengan lampu terpasang, perisai balistik, lencana pengenalan polis, pemegang kad akses terputus",
        propsEn: "Service pistol with mounted tactical weapon light, clear ballistic entry shield, lanyard police badge, severed magnetic keycard reader",
        cam: { shotType: "Low Angle Follow Shot", lens: "24mm f/2.8", movement: "Fast Dynamic Walk-In" },
        narration: "Di dalam lorong konkrit yang dingin, hembusan nafas sendiri terasa seperti amaran bahaya.",
        sfx: [{ name: "Langkah kasut getah di lantai lembap & bunyi wap terlepas dari paip", volume: "65%", purpose: "Atmosfera thriller bawah tanah" }],
        musicCue: "Perkusi rentak denyutan nadi perlahan semakin cemas"
      },
      {
        title: "Bilik Pelayan Utama Ditemui",
        objective: "Menemui bilik kawalan pelayan yang masih berasap tetapi kerusi pengendali kosong.",
        action: `${name} menyentuh kerusi berputar yang masih bergoyang perlahan di hadapan konsol terminal yang menyala.`,
        visualActionEn: "touching an empty leather swivel chair in front of an illuminated server console, feeling residual body heat while staring at a running digital terminal",
        dialogueText: "Dia baru sahaja bangun dari kerusi ini beberapa saat lalu!",
        speaker: name,
        emotion: "Tersentak dan kecewa",
        expressionEn: "Sudden realization that the suspect slipped away mere seconds ago, teeth clenched in frustration",
        bodyLanguageEn: "Hand resting on the backrest of the warm chair, head snapping sideways toward an open fire exit",
        environment: "Dewan pelayan gergasi bertingkat dengan ribuan kabel berselerak dan kabus sejuk",
        environmentEn: "Cavernous subterranean server vault with towering black rack arrays, humming cooling fans, and dense chilled fog hovering above grated metal walkways",
        props: "Konsol kawalan komputer bercahaya, skrin paparan pemasa undur, cawan kopi masih hangat, kerusi berputar yang baru ditinggalkan",
        propsEn: "Active glowing console terminal, LED digital countdown timer display, still-steaming paper cup, slowly swiveling vacant office chair",
        cam: { shotType: "Medium Close-Up", lens: "50mm f/1.4", movement: "Quick Whip Pan to Fire Door" },
        narration: "Di medan pemburuan bayang-bayang, terlambat satu saat bererti kehilangan seluruh sasaran.",
        sfx: [{ name: "Kerusi berputar berdecit perlahan & cawan kopi berwap panas", volume: "55%", purpose: "Menunjukkan kehadiran suspek baru sahaja hilang" }],
        musicCue: "Gesekan biola meninggi secara mendadak membina rasa panik"
      },
      {
        title: "Titik Tengah: Perangkap Bom Data",
        objective: "Menyedari terminal telah diprogramkan untuk memadamkan seluruh bukti dalam kiraan undur.",
        action: `Skrin bertukar merah menyala dengan pemasa kiraan undur 00:02:45. ${name} sedar ini bukan pelayan biasa tetapi perangkap.`,
        visualActionEn: "staring in horror at a crimson countdown clock flashing on the terminal console, realizing the server is rigged with a thermal data purge charge",
        dialogueText: "Keluar sekarang! Ini perangkap bom terma pemusnah data!",
        speaker: name,
        emotion: "Kecemasan melampau",
        expressionEn: "High-octane urgency, beads of sweat dripping down temple into his eyes",
        bodyLanguageEn: "Working furiously with both hands on the server rack casing, bracing his weight against the console",
        environment: "Bilik pelayan mula berkelip dengan lampu amaran merah letupan sistem",
        environmentEn: "High-tension server room flashing with pulsating crimson alarm strobes as system wipe purge warnings echo across loudspeakers",
        props: "Skrin paparan kiraan undur 00:02:45 berkelip pantas, tuil pemutus litar kecemasan, pemutar skru penanggal cakera keras",
        propsEn: "Crimson flashing countdown clock at 00:02:45, high-voltage manual trip lever, electric precision screwdriver, smoking server rack backplane",
        cam: { shotType: "Extreme Close-Up Hands pulling cords", lens: "85mm f/1.4", movement: "Frantic Handheld Motion" },
        narration: "Bila masa menjadi musuh, keberanian diuji dengan setiap detik yang hilang tanpa belas kasihan.",
        sfx: [{ name: "Bip pemasa berbunyi pantas & siren amaran kebakaran bilik pelayan", volume: "75%", purpose: "Detik genting ancaman letupan data" }],
        musicCue: "Rentak detik jam berdentang semakin kuat dan cemas"
      },
      {
        title: "Memintas Pemusnahan Data",
        objective: "Memotong bekalan kuasa utama secara manual sebelum data projek terhapus.",
        action: `${name} menyambar pemotong penebat getah tebal, memotong kabel tembaga utama tepat pada saat pemasa tinggal 00:00:03.`,
        visualActionEn: "snapping thick high-voltage feeder cables with insulated shears just as the purge script reaches zero, collapsing onto the grating in breathless relief",
        dialogueText: "Putus! Padamkan kuasa sekarang!",
        speaker: name,
        emotion: "Nekad dan lega luar biasa",
        expressionEn: "Sheer exhaustion mixed with triumphant defiance, coughing through electrical ozone smoke",
        bodyLanguageEn: "Bracing against the metal railing, one hand clutching the salvaged hard drive against his chest",
        environment: "Percikan api elektrik menerangi ruang gelap bilik pelayan",
        environmentEn: "Sparks raining from an electrical distribution box in the server vault, illuminating his silhouette against smoke and darkness",
        props: "Pemotong kabel penebat getah tebal, wayar tembaga utama terputus berkilau api, sarung tangan pelindung haba",
        propsEn: "Insulated heavy-duty cable shears, severed glowing copper power cables spitting sparks, heat-resistant leather tactical gloves",
        cam: { shotType: "Dynamic Slow Motion Spark Burst", lens: "50mm f/1.2", movement: "Slow Dolly Back through falling sparks" },
        narration: "Satu detik keberanian mampu memisahkan antara kegelapan misteri dan cahaya kebenaran.",
        sfx: [{ name: "Percikan elektrik berdetus kuat & bunyi mesin pelayan terhenti senyap", volume: "80%", purpose: "Klimaks menyelamatkan bahan bukti penting" }],
        musicCue: "Klimaks perkusi orkestra meletup sebelum jeda hening seketika"
      },
      {
        title: "Pengkhianat Dalam Pasukan",
        objective: "Menemui bukti bahawa frekuensi operasi polis telah dibocorkan dari dalam.",
        action: `${name} mengutip radio komunikasi polis yang tertinggal di lorong belakang, mendengar suara pegawai atasan sendiri bercakap dengan suspek.`,
        visualActionEn: "staring at an abandoned police radio tuned to his private tactical frequency, hearing the voice of a superior officer coordinating Karberos escape",
        dialogueText: "Suara ini... Tuan Rashid? Mustahil... pengkhianat itu adalah orang yang memberi aku arahan kes ini!",
        speaker: name,
        emotion: "Tersentak hebat dan dikhianati",
        expressionEn: "Heartbreaking disbelief shifting into cold, hard anger at internal corruption",
        bodyLanguageEn: "Freezing in place under the pelting rain, slowly lowering the radio, head bowed then snapping upward with resolute fury",
        environment: "Lorong belakang gudang berhujan lebat dengan pantulan lampu jalan kuning",
        environmentEn: "Dark alleyway outside the facility under pouring rain, single streetlight illuminating steam rising from his soaked tactical jacket",
        props: "Radio polis berfrekuensi sulit yang dipintas, pita rakaman audio dalam poket, telefon pintar enkripsi polis",
        propsEn: "Stolen police encryption radio displaying an internal squad channel, miniature audio recorder, rain-spattered smartphone with call logs",
        cam: { shotType: "Medium Silhouette in Rain", lens: "85mm f/1.8", movement: "Slow Pull Back" },
        narration: "Tikaman paling berbisa bukanlah daripada musuh di hadapan, tetapi daripada mereka yang berdiri di belakang kita.",
        sfx: [{ name: "Titisan hujan di topi jaket & desiran radio berkeresik statik", volume: "60%", purpose: "Menyerlahkan perasaan terpencil dan dikhianati" }],
        musicCue: "Melodi biola solo sayu sarat emosi pengkhianatan"
      },
      {
        title: "Membongkar Fail Projek Rahsia",
        objective: "Menyusup masuk ke arkib rekod fizikal lama untuk membaca dokumen asal projek Aegis.",
        action: `${name} menyelak fail arkib keselamatan bertarikh sepuluh tahun lalu, menemui kaitan nama Karberos dengan bekas penyelidik kerajaan.`,
        visualActionEn: "flipping through declassified government dossiers under a green-shaded archival lamp, uncovering the original team behind the cyber weapon",
        dialogueText: "Projek Aegis... mereka gunakan penyelidikannya, kemudian fitnah dia bila sistem ini rosak. Karberos memburu keadilan dengan cara yang salah.",
        speaker: name,
        emotion: "Sedih dan memahami punca dendam",
        expressionEn: "Somber recognition, brow furrowed as puzzle pieces of history snap into place",
        bodyLanguageEn: "Hunched over the wooden archive desk, one finger tracing names and dates across yellowed paper",
        environment: "Bilik arkib bawah tanah berhabuk dengan barisan rak fail besi setinggi siling",
        environmentEn: "Musty subterranean government document repository with towering metal shelves, rolling ladders, and yellow incandescent work lamps",
        props: "Fail projek bertanda PROJEK AEGIS - SULIT TERTINGGI, cop rasmi arkib 2014, cermin mata bacaan, lampu meja hijau arkib",
        propsEn: "Yellowed manila folder stamped OPERATION AEGIS - TOP SECRET DECOMMISSIONED 2014, faded black-and-white personnel headshots, brass reading lamp",
        cam: { shotType: "Close-Up Document Inspection", lens: "50mm f/1.4", movement: "Slow Tilt Down" },
        narration: "Dosa silam yang disembunyikan akhirnya menuntut bayaran dengan air mata generasi baharu.",
        sfx: [{ name: "Kertas arkib lama diselak & bunyi lampu pendarfluor berkelip", volume: "50%", purpose: "Mewujudkan suasana arkib rahsia yang klasik" }],
        musicCue: "Dengungan orkestra misteri bertempo perlahan"
      },
      {
        title: "Pertemuan Sulit Di Parkir Bawah Tanah",
        objective: "Menerima kad kunci penyahsulit induk daripada informan rahsia.",
        action: `${name} menunggu di celah tiang konkrit tempat letak kereta bawah tanah, menerima sampul surat sulit daripada bekas jurutera projek.`,
        visualActionEn: "confronting an informant from behind a massive concrete pillar, receiving a sealed envelope containing the master access key to Karberos mainframe",
        dialogueText: "Ambil kad ini. Karberos akan lancarkan fasa terakhir malam ini di pusat empangan bandar!",
        speaker: sup,
        emotion: "Cemas dan tergesa-gesa",
        expressionEn: "Guarded intensity, piercing scrutiny evaluating every micro-gesture of his contact",
        bodyLanguageEn: "Leaning against the concrete pillar, body angled defensively, taking the envelope smoothly with one hand",
        environment: "Tempat letak kereta bawah tanah yang luas, sunyi dan berdengung kipas ekzos",
        environmentEn: "Cavernous brutalist concrete parking garage with dripping overhead water pipes, harsh fluorescent tube flickers, and long eerie shadows",
        props: "Sampul surat coklat tebal bertali, kunci keselamatan kereta rahsia, pistol tersorok di pinggang, telefon pembakar (burner phone)",
        propsEn: "Sealed thick kraft envelope tied with twine, master cryptographic keycard, concealed holster beneath trench jacket, cheap disposable burner phone",
        cam: { shotType: "Wide Low Key Lighting", lens: "35mm f/1.8", movement: "Slow Tracking Behind Pillars" },
        narration: "Di lorong paling sunyi di bawah kota, maklumat bernilai nyawa bertukar tangan dalam bayangan kelam.",
        sfx: [{ name: "Derap kasut bergema di lantai tempat letak kereta & sampul diserahkan", volume: "55%", purpose: "Pertemuan sulit ala thriller perisikan" }],
        musicCue: "Bassline synth gelap berdenyut perlahan penuh amaran"
      },
      {
        title: "Serangan Siber Terbuka Di Ibu Pejabat",
        objective: "Menyaksikan sistem pangkalan data ibu pejabat polis dipadamkan secara serentak.",
        action: `Seluruh skrin monitor di ibu pejabat polis terpadam sebelum memaparkan lambang serigala Karberos; siren kecemasan bergema.`,
        visualActionEn: "moving swiftly through panicking officers in the blackout command center, barking decisive orders while using a battery-powered terminal",
        dialogueText: "Semua talian luar terputus! Dia sedang mengunci seluruh sistem telekomunikasi bandar!",
        speaker: name,
        emotion: "Tegas mengawal keadaan cemas",
        expressionEn: "Absolute unshakable calm in the midst of pandemonium, commanding poise",
        bodyLanguageEn: "Striding briskly through the room, pointing with authority, holding a secure comms radio to his collar",
        environment: "Bilik gerakan ibu pejabat polis yang bergelap gelita disinari lampu kecemasan merah",
        environmentEn: "High-tech police headquarters plunged into total darkness, emergency crimson beacons spinning as workstation screens flash error code 503",
        props: "Monitor bergegar dengan logo kepala serigala Karberos, telefon meja menjerit tiada henti, radio kecemasan mudah alih",
        propsEn: "Giant central videowall locked on a pulsating glitching Karberos wolf sigil, ringing desk landlines, battery-powered emergency LED lantern",
        cam: { shotType: "Fast Pan across chaotic command room", lens: "24mm f/2.8", movement: "Dynamic Handheld" },
        narration: "Kekacauan melanda bila teknologi yang dibanggakan menjadi senjata pemusnah terhadap tuannya sendiri.",
        sfx: [{ name: "Siren amaran ibu pejabat berdengung & jeritan pegawai keselamatan", volume: "75%", purpose: "Kekacauan dalam bilik operasi keselamatan" }],
        musicCue: "Orkestra dramatik dengan paluan brass bertubi-tubi"
      },
      {
        title: "Konfrontasi Dengan Pihak Atasan",
        objective: "Bersemuka secara berani dengan pegawai atasan yang bersubahat dengan jenayah siber.",
        action: `${name} menghempaskan lencana dan fail transaksi rahsia ke atas meja ketuanya, menolak arahan untuk menutup siasatan.`,
        visualActionEn: "slamming his detective badge and the incriminating offshore financial ledger onto the corrupt superiors mahogany desk",
        dialogueText: "Tuan boleh gantung tugas saya, tetapi tuan tak boleh padamkan kebenaran yang tertulis dalam fail ini!",
        speaker: name,
        emotion: "Bermaruah, garang dan berani",
        expressionEn: "Piercing contempt, unwavering moral superiority, righteous rage",
        bodyLanguageEn: "Standing tall and unyielding across the desk, hands planted firmly on the wood, glaring straight into the traitors eyes",
        environment: "Pejabat pengarah polis yang mewah dengan pemandangan kota malam di balik dinding kaca",
        environmentEn: "Luxurious high-rise executive office with panoramic glass overlooking the stormy city skyline, mahogany desk, and ambient rain streaks",
        props: "Lencana polis dicampak ke atas meja kayu padu, fail bukti penglibatan rasuah, cawan wiski kristal, pistol berdaftar",
        propsEn: "Silver police shield slammed onto mahogany desk, damning dossier of offshore transaction receipts, heavy crystal tumbler, framed commendations",
        cam: { shotType: "Medium Close-Up Confrontation", lens: "50mm f/1.4", movement: "Steady Low Angle" },
        narration: "Bila integriti berdiri menentang pangkat dan kuasa, maruah sejati seorang penyiasat tidak boleh dibeli.",
        sfx: [{ name: "Lencana diletakkan di atas meja kaca & pintu ditutup rapat", volume: "60%", purpose: "Detik pemisahan dan keazaman diri" }],
        musicCue: "Melodi cello dan piano solo hangat namun penuh tekad membara"
      },
      {
        title: "Operasi Bersendirian (Off-Grid)",
        objective: "Mendirikan pusat operasi sementara di luar radar pemantauan rasmi.",
        action: `${name} membuka tiga komputer riba di bilik motel terpencil, menyambungkan antena satelit kecil di birai tingkap.`,
        visualActionEn: "assembling an independent satellite uplink workstation on a worn motel table, loading custom decryption counter-scripts with singular focus",
        dialogueText: "Tiada lencana, tiada protokol polis. Sekarang ini pertempuran peribadi antara aku dan Karberos.",
        speaker: name,
        emotion: "Fokus membara dan tenang",
        expressionEn: "Lone wolf determination, fatigue banished by relentless clarity of purpose",
        bodyLanguageEn: "Seated on the edge of the bed, fingers hammering terminal keys in rhythmic cadence",
        environment: "Bilik motel bajet dengan cahaya neon hijau dan merah menembusi bidai tingkap",
        environmentEn: "Seedy outskirts motel room illuminated by flickering green-red neon signs outside, peeling wallpaper, and raindrops on window blinds",
        props: "Tiga komputer riba bersambung suis rangkaian mini, antena satelit mudah alih di birai tingkap, beg galas taktikal hitam",
        propsEn: "Triple-display mobile battle station on cheap folding table, compact satellite uplink antenna suction-cupped to window glass, black canvas duffel bag",
        cam: { shotType: "Close-Up on Hands and Gear", lens: "35mm f/1.8", movement: "Slow Circular Track" },
        narration: "Bila seluruh sistem menentangmu, kebenaran menjadi satu-satunya sekutu yang paling setia.",
        sfx: [{ name: "Antena satelit berdecit dilaraskan & lampu indikator hijau berkelip", volume: "55%", purpose: "Membina suasana persediaan taktikal rahsia" }],
        musicCue: "Irama synthwave perlahan berdenyut mantap membina momentum"
      },
      {
        title: "Merentas Frekuensi Komunikasi Karberos",
        objective: "Memintas siaran suara rahsia Karberos dan mengenal pasti motif serangan terakhirnya.",
        action: `${name} menyarung fon kepala studio, meneliti gelombang audio sehingga suara Karberos terdekripsi dengan jelas.`,
        visualActionEn: "adjusting audio filter frequencies on his digital console until Karberos scrambled voice suddenly decodes into crystal-clear Malay",
        dialogueText: "Aku kenal corak intonasi ini... Karberos bukan orang luar. Dia adalah jurutera utama Projek Aegis!",
        speaker: name,
        emotion: "Tersentak dengan kebenaran",
        expressionEn: "Shock turning into sudden understanding as he recognizes the voice of his former mentor",
        bodyLanguageEn: "One hand pressing the headphone cup tight against his ear, mouth parted in breathless realization",
        environment: "Bilik operasi sementara dengan bentuk gelombang audio berayun di monitor",
        environmentEn: "Dark motel room focused entirely on the oscilloscope green waveforms fluctuating across his terminal display",
        props: "Fon kepala monitor studio profesional, pemampat audio perisian, cawan mi segera, botol air mineral",
        propsEn: "Heavy studio monitor headphones clamped over ears, audio spectral analyzer display, steaming instant noodle cup, field tactical map",
        cam: { shotType: "Split Screen Comparison", lens: "50mm f/1.4", movement: "Slow Zoom In on Audio Waveforms" },
        narration: "Di sebalik suara yang diputarbelitkan algoritma, nada kemanusiaan yang terluka tidak dapat disembunyikan.",
        sfx: [{ name: "Bunyi fail digital dimuat turun lengkap & helaan nafas mendalam", volume: "60%", purpose: "Detik pembongkaran misteri utama" }],
        musicCue: "Pad orkestra sayu disulam alunan piano dramatik"
      },
      {
        title: "Sasaran Terakhir: Grid Empangan Pintar",
        objective: "Membongkar bahawa sasaran Karberos adalah membuka pintu limpahan empangan hidroelektrik utama bandar.",
        action: `${name} melihat skematik empangan pintar bandar berkelip merah di skrinnya, menyedari jutaan nyawa di lembah bandar terancam.`,
        visualActionEn: "tracing the cyber-attack trajectory heading straight for the city smart dam spillway valves, realizing millions of civilians are in danger",
        dialogueText: "Bukan wang... bukan data kerajaan! Dia mahu menenggelamkan seluruh zon perindustrian bawah empangan!",
        speaker: name,
        emotion: "Kecemasan kritikal dan berkejaran masa",
        expressionEn: "Horrified urgency, veins standing out on neck as the horrific scale of the plot becomes evident",
        bodyLanguageEn: "Standing abruptly, sweeping tactical gear into his backpack with lightning swiftness",
        environment: "Paparan peta digital infrastruktur kritikal empangan hidroelektrik bandar",
        environmentEn: "Glowing schematic hologram of the metropolitan smart hydroelectric dam, pressure valves highlighted in pulsing hazard amber",
        props: "Pelan infrastruktur digital empangan pintar, penanda laser merah, jam randik masa sebenar, kunci perkakasan keselamatan",
        propsEn: "Transparent digital blueprint overlay of dam control gates, red laser pointer, countdown telemetry clock ticking towards flood release",
        cam: { shotType: "Wide Screen Blueprint", lens: "24mm f/2.8", movement: "Dynamic Push-In to Grid Map" },
        narration: "Taruhan pemburuan kini bukan lagi tentang menang atau kalah, tetapi hidup atau matinya ribuan nyawa.",
        sfx: [{ name: "Garis amaran grid berkelip merah & siren ambulans di kejauhan", volume: "65%", purpose: "Menaikkan taruhan cerita ke tahap hidup atau mati" }],
        musicCue: "Perkusi perang industri berdegup semakin kencang"
      },
      {
        title: "Pecutan Ke Kompleks Empangan",
        objective: "Memacu motosikal lasak merentas bukit berhujan lebat menuju ke empangan hidroelektrik.",
        action: `${name} menunggang motosikal taktikal membelah selekoh bukit basah, lampu depan memancar menerobosi kabus tebal.`,
        visualActionEn: "carving hard through wet mountain asphalt curves on a tactical motorcycle, leaning into turns as lightning flashes across the colossal dam concrete",
        dialogueText: "Tinggal dua puluh minit sebelum pintu air dibuka secara paksa. Aku mesti sampai!",
        speaker: name,
        emotion: "Nekad menembusi bahaya",
        expressionEn: "Pure adrenaline, fearless laser-focus fixed on the illuminated dam crest ahead",
        bodyLanguageEn: "Low aerodynamic crouch over the handlebars, throttled wrist pinned forward",
        environment: "Jalan raya berliku ke kawasan empangan diapit hutan tebal dan ribut petir",
        environmentEn: "Winding mountain road cutting through dense rainforest toward the massive concrete dam wall, lightning illuminating storm clouds",
        props: "Motosikal lasak taktikal hitam, jaket kulit kalis air berbalut pelindung, lampu depan LED menyuluh jalan berair",
        propsEn: "Matte black dual-sport motorcycle, armored weatherproof riding jacket, high-output LED auxiliary lights piercing through mountain fog",
        cam: { shotType: "Low Angle Tracking on Motorcycle", lens: "35mm f/1.4", movement: "High Speed Gimbal Follow" },
        narration: "Di celah kilat dan deruan ribut, seorang manusia berlari menyongsong takdirnya.",
        sfx: [{ name: "Deruan enjin motosikal berkuasa tinggi & dentuman guruh di langit", volume: "75%", purpose: "Aksi perlumbaan masa sinematik" }],
        musicCue: "Dram orkestra agresif memecut laju berpadu raungan gitar elektrik"
      },
      {
        title: "Menyusup Dewan Turbin Air Gergasi",
        objective: "Menyusup masuk melalui terowong turbin empangan yang bergegar dengan tekanan air.",
        action: `${name} melangkah di atas titian besi di atas pusaran air turbin, mengacukan pistol mencari suspek dalam dewan gergasi.`,
        visualActionEn: "slipping past defeated security checkpoints inside the echoing turbine chamber, moving silently along the catwalk above churning waters",
        dialogueText: "Karberos! Aku tahu kamu di sini! Hentikan kegilaan ini!",
        speaker: name,
        emotion: "Tegang dan bersedia untuk pertembungan",
        expressionEn: "Steely predator focus, senses completely attuned to the adversary presence",
        bodyLanguageEn: "Weapon held in compressed ready position against chest, sliding along the catwalk railing with feline balance",
        environment: "Terowong konkrit dalaman empangan yang bergaung dengan deruan turbin air gergasi",
        environmentEn: "Massive subterranean turbine hall with gigantic spinning hydro-turbines, echoing water roar, and yellow handrails above deep chasms",
        props: "Alat pintasan kunci elektronik, pistol di tangan kanan, pemacu USB penawar di poket dada",
        propsEn: "Digital lock-bypass hardware clamped onto electronic door latch, drawn service pistol held low, glowing counter-virus flash drive",
        cam: { shotType: "Low Angle Stealth Tracking", lens: "35mm f/1.4", movement: "Fluid Gimbal Shadow Tracking" },
        narration: "Di perut empangan konkrit gergasi, gema deruan air seperti degupan jantung sebuah raksasa yang sedang bangkit.",
        sfx: [{ name: "Deruan air turbin bergaung kuat & langkah kasut di atas titian besi kisi", volume: "75%", purpose: "Menghidupkan skala gergasi kompleks empangan" }],
        musicCue: "Rentak synth bassline mendalam dengan ketukan logam perlahan"
      },
      {
        title: "Konfrontasi Bersemuka Di Pintu Air",
        objective: "Berhadapan secara fizikal dengan Karberos di bilik kawalan berkubah kaca.",
        action: `${name} melangkah masuk mengacukan senjata; sosok berhud berpaling perlahan dengan senyuman dingin di sebalik cahaya konsol hidraulik.`,
        visualActionEn: "stepping into the circular control room, raising his firearm directly at the hooded silhouette of Karberos who stands calmly beside the open valves console",
        dialogueText: "Tangan di atas kepala, Karberos! Dendam kamu pada Projek Aegis tidak wajar ditebus dengan nyawa rakyat tidak berdosa!",
        speaker: name,
        emotion: "Tegas, bermaruah dan berani",
        expressionEn: "Fiery determination mingled with profound empathy and sorrow for a fallen comrade",
        bodyLanguageEn: "Standoff shooting stance, arms locked steady, eyes locked with Karberos cold gaze across the consoles",
        environment: "Bilik kawalan empangan berkubah kaca dengan konsol hidraulik dan pemandangan pintu air bergelora",
        environmentEn: "Glass-domed circular dam control room with sweeping views of the stormy reservoir, banks of hydraulic pressure meters, and Karberos by the console",
        props: "Konsol kawalan pintu air utama, pemacu penggodam berlampu ungu, senjata saling teracu, paparan status limpahan air",
        propsEn: "Master spillway hydraulic override console, purple-pulsing hacking payload module, drawn firearms pointed in Mexican standoff, water overflow meters",
        cam: { shotType: "Wide Western Showdown Shot", lens: "35mm f/1.4", movement: "Slow Circular Crane Orbit" },
        narration: "Dua prinsip yang lahir daripada tragedi yang sama kini bertembung di hujung muncung senjata.",
        sfx: [{ name: "Kipas angin pendingin menderu & nafas dua watak bersilang", volume: "70%", purpose: "Ketegangan konfrontasi klasik sinematik" }],
        musicCue: "Orkestra megah berpadu choir gelap dan dentuman dram perang"
      },
      {
        title: "Pertarungan Fizikal & Detik Penawar",
        objective: "Bergelut menolak Karberos dan menyuntik pemacu penawar ke terminal induk empangan.",
        action: `Karberos menerpa menepis pistol; ${name} bergelut menahan asakan sambil sebelah tangannya menekan pemacu penawar ke soket USB terminal.`,
        visualActionEn: "locking Karberos in a grappling hold with one arm while violently slamming the blue antidote drive into the console port with his bleeding hand",
        dialogueText: "Keadilan bukan milik dendam kamu! Tamatlah segalanya!",
        speaker: name,
        emotion: "Jeritan tekad dan perjuangan kudrat terakhir",
        expressionEn: "Roaring battle cry of pure resolve, veins bulging as he exerts every ounce of human willpower",
        bodyLanguageEn: "Muscular combat lock, twisting his body to reach the USB port while neutralizing his opponents strike",
        environment: "Percikan suis elektrik dan kaca konsol retak semasa pergelutan berlaku",
        environmentEn: "Control room consoles showering sparks as the two men grapple fiercely over the master override terminal while water alarms shriek",
        props: "Papan kekunci industri berdarah sedikit, pemacu penawar biru, tuil manual limpahan air",
        propsEn: "Shattered glass console panel, glowing blue counter-virus payload USB, heavy mechanical emergency hydraulic brake lever",
        cam: { shotType: "Dynamic Combat Tracking", lens: "28mm f/2.0", movement: "Fast Kinetic Handheld" },
        narration: "Di saat genting penentuan, bukan kekuatan otot yang memenangi pertempuran, melainkan kekuatan niat di dalam dada.",
        sfx: [{ name: "Dentuman tubuh menghempas rak konsol & kaca peranti retak", volume: "80%", purpose: "Aksi pergelutan fizikal yang padu dan realistik" }],
        musicCue: "Ledakan dram industri pantas berselang gesekan strings agresif"
      },
      {
        title: "Kemenangan Kod: Pintu Air Terkunci",
        objective: "Menggari suspek sementara sistem empangan disahkan selamat dan dineutralkan.",
        action: `${name} mengunci gari besi pada pergelangan tangan Karberos yang terduduk lesu; lampu amaran bertukar menjadi hijau tenang.`,
        visualActionEn: "ratcheting handcuffs securely around the defeated hackers wrists, sinking down against the console frame to catch his breath as sirens echo across the reservoir",
        dialogueText: "Pintu air terkunci. Banjir berjaya dielakkan. Selesai sudah, Karberos.",
        speaker: name,
        emotion: "Kelegaan luar biasa dan ketenangan berwibawa",
        expressionEn: "Enormous emotional release, a tired honorable smile touching his lips",
        bodyLanguageEn: "Leaning his back against the secure console, wiping sweat and blood from brow, breathing deeply in victory",
        environment: "Bilik kawalan empangan bertukar tenang apabila lampu penunjuk bertukar hijau stabil",
        environmentEn: "Control room bathed in serene steady green indicator lighting as the spillway gate telemetry stabilizes at 100% secure",
        props: "Gari keluli bersalut krom mengunci tangan suspek, skrin memaparkan OVERRIDE NEUTRALIZED, radio polis kontinjen berdering",
        propsEn: "Heavy chrome steel handcuffs ratcheted around suspects wrists, terminal screen flashing green VALVES LOCKED SECURE, calling backup on squad comms",
        cam: { shotType: "Medium Two-Shot", lens: "50mm f/1.4", movement: "Slow Rise Up" },
        narration: "Bila badai reda dan bahaya lenyap, kebenaran berdiri teguh tanpa sedikit pun kecacatan.",
        sfx: [{ name: "Bunyi klik gari besi dikunci & helaan nafas lega kedua-dua watak", volume: "65%", purpose: "Menandakan ancaman berjaya dinetralkan sepenuhnya" }],
        musicCue: "Alunan strings hangat perlahan membina rasa keinsafan dan kedamaian"
      },
      {
        title: "Fajar Keadilan Menyinari Bandaraya",
        objective: "Menutup fail siasatan dengan penuh maruah di bawah sinaran matahari terbit keemasan.",
        action: `${name} berdiri di puncak benteng empangan, memegang lencana detektifnya sambil menatap kota metropolitan di bawah yang selamat bermandikan cahaya fajar.`,
        visualActionEn: "standing on the crest of the great dam, looking out as brilliant golden dawn rays pierce through parting storm clouds over the saved metropolis below",
        dialogueText: "Setiap rahsia yang terkubur akhirnya akan menemui jalan keluar. Keadilan sentiasa menang.",
        speaker: name,
        emotion: "Ketenangan jiwa, bangga dan keinsafan abadi",
        expressionEn: "Triumphant peace, profound fulfillment, eyes shining with quiet pride and enduring justice",
        bodyLanguageEn: "Standing tall and serene, shoulders relaxed, breathing in the fresh morning mountain air as golden light illuminates his silhouette",
        environment: "Puncak empangan terbuka luas dengan pemandangan tasik tenang dan matahari terbit keemasan",
        environmentEn: "Sweeping cinematic vista atop the massive concrete dam crest overlooking the mist-shrouded reservoir and city skyline under glorious golden sunrise",
        props: "Lencana detektif digilap bersih di genggaman, jaket terbuka dihembus angin pagi, cawan kopi panas dihulurkan rakan",
        propsEn: "Gleaming detective badge catching brilliant golden sunbeams, wind-whipped unbuttoned jacket, warm steaming coffee cup held in hand",
        cam: { shotType: "Epic Golden Hour Silhouette to Hero Close-Up", lens: "50mm f/1.2", movement: "Slow Cinematic Push into Heros Smile" },
        narration: "Selagi ada mereka yang sanggup berdiri mempertahankan kebenaran, fajar harapan akan sentiasa terbit menyinari bumi ini.",
        sfx: [{ name: "Bayu pagi bertiup segar, kicauan burung kota & helaan nafas damai", volume: "60%", purpose: "Penutup epik yang memuaskan dan berkesan di hati penonton" }],
        musicCue: "Skor piano sinematik berpadu strings orkestra crescendo agung dan penuh harapan"
      }
    ],

    // Universal Dynamic Narrative Arc Engine for all other domains
    GENERIC: (name, antagonist, defaultProps, dom) => {
      const domainThemes = {
        STUDENT: {
          envs: [
            { my: "Bilik Tidur & Meja Ulang Kaji Awal Pagi", en: "Cozy student bedroom with a warm desk study lamp and morning sunlight through blinds" },
            { my: "Koridor Sekolah Menengah & Barisan Loker", en: "Sunlit high school corridor lined with lockers and bustling student silhouettes" },
            { my: "Dewan Perpustakaan Sekolah Sunyi & Rak Buku Tinggi", en: "Grand quiet school library with towering wooden bookshelves and dust motes in sunbeams" },
            { my: "Bilik Bimbingan & Kaunseling Guru Berhawa Dingin", en: "Warm guidance counseling office with diplomas on wall and encouraging advice boards" },
            { my: "Dewan Peperiksaan Utama Berbaris Meja Tunggal", en: "Vast quiet examination hall with grid of solitary desks, ticking wall clock, and tense atmosphere" },
            { my: "Dataran Perhimpunan Sekolah Bermandi Cahaya Pagi", en: "Open school assembly square under radiant morning sunlight with fluttering flags" }
          ],
          propsList: [
            { my: "Buku rujukan teks tebal, lampu meja belajar, jam loceng analog, pen berdakwat biru", en: "Thick textbook volumes, warm desk lamp, classic twin-bell alarm clock, blue ink pen" },
            { my: "Beg galas sekolah, buku nota bergaris kemas, kalkulator saintifik berlampu skrin", en: "Canvas school backpack, ruled study notebook, illuminated scientific calculator" },
            { my: "Himpunan kertas soalan ramalan peperiksaan, pen penanda kuning, cawan air mineral", en: "Stacks of past-year examination papers, yellow highlighter marker, water bottle" },
            { my: "Kamus rujukan dwibahasa, kad imbasan nota padat, fail dokumen kemas", en: "Bilingual reference dictionary, handwritten flashcards, plastic document organizer" },
            { my: "Kertas soalan peperiksaan bertutup, slip angka giliran calon, pembaris kayu dan pensel 2B", en: "Sealed examination test paper, candidate index slip, wooden ruler and 2B pencils" },
            { my: "Slip keputusan peperiksaan cemerlang A+, sijil penghargaan berbingkai, jambangan bunga", en: "Straight-A examination result slip, framed certificate of merit, celebration flower bouquet" }
          ],
          actionsEn: [
            "reviewing handwritten study notes at dawn by a glowing desk lamp",
            "walking determinedly along the school corridor clutching revision books",
            "deeply immersed in analyzing practice exam papers in the quiet library",
            "receiving encouragement and wise advice from a respected mentor",
            "filling in the final examination answer sheet with confident steady strokes",
            "raising the pristine academic result slip toward the morning sky with joyous triumph"
          ]
        },
        BUSINESS: {
          envs: [
            { my: "Dapur Rumah & Ruang Persediaan Subuh", en: "Modest home preparation kitchen illuminated by warm dawn stove glow" },
            { my: "Kawasan Gerai & Pasar Pagi Komuniti", en: "Bustling morning community market lane with colorful canopies and rising aromatic steam" },
            { my: "Pusat Bahan Mentah & Stor Borong", en: "Wholesale trade warehouse stacked with fresh ingredients and supplier delivery trucks" },
            { my: "Ruang Kaunter Jualan Berkelajuan Tinggi", en: "Vibrant storefront service counter humming with eager customer orders and POS chimes" },
            { my: "Zon Persaingan & Medan Niaga Mencabar", en: "High-stakes commercial food court arena during peak dinner rush under evening streetlights" },
            { my: "Kedai Premis Baharu Yang Megah & Berseri", en: "Brand-new modern flagship store opening with celebratory ribbon banners and glowing storefront" }
          ],
          propsList: [
            { my: "Buku lejar kira-kira modal, bekas rempah ratus khas, periuk keluli tahan karat", en: "Financial ledger book, secret spice containers, heavy stainless steel prep cauldrons" },
            { my: "Papan tanda menu kayu berukir nama, apron kanvas bersih, payung gerai pasang siap", en: "Hand-painted wooden menu board, clean canvas apron, market umbrella canopy" },
            { my: "Timbang digital perniagaan, guni bahan mentah premium, resit pesanan borong", en: "Digital platform scale, premium raw ingredient sacks, wholesale procurement invoice" },
            { my: "Mesin daftar tunai pintar, beg bungkusan mesra alam, cawan minuman berlabel jenama", en: "Smart touchscreen POS register, eco-friendly branded take-away boxes, beverage cups" },
            { my: "Kuali besi kawah membara, sudip keluli panjang, pesanan digital bertalu-talu", en: "Sizzling commercial wok range, long stainless spatula, rapid digital order docket printer" },
            { my: "Kunci premis kedai baharu berkilau, plak perasmian syarikat, trofi usahawan muda", en: "Polished brass store keys, ceremonial opening plaque, young entrepreneur recognition trophy" }
          ],
          actionsEn: [
            "carefully measuring ingredients and balancing accounts at the break of dawn",
            "setting up the market stall canopy and proudly arranging display items",
            "negotiating quality supplies with confidence and shrewd business judgment",
            "serving smiling customers efficiently with warm hospitable flair",
            "overcoming the peak-hour rush through flawless culinary speed and composure",
            "turning the key to open the doors of a thriving new flagship business venue"
          ]
        },
        BATIK: {
          envs: [
            { my: "Bengkel Kraf Batik Tradisional & Bangsal Lilin", en: "Traditional open-air batik atelier with wooden rafters and warm sunlight filtering through leaves" },
            { my: "Meja Regangan Kain Sutera Putih", en: "Polished hardwood fabric stretching frame holding pristine raw white silk under soft north light" },
            { my: "Sudut Relang Lilin & Periuk Tembaga Berwap", en: "Copper wax pot corner with gentle aromatic rising steam and golden flickering flame" },
            { my: "Palung Pencelupan Warna Asli Tradisional", en: "Natural dye stone vats overflowing with rich indigo and madder red pigments" },
            { my: "Kawasan Pembilasan Air Mendidih & Jemuran Angin", en: "Boiling water wax removal tank surrounded by bamboo drying racks fluttering in the breeze" },
            { my: "Galeri Pameran Kraf Diraja & Dewan Karpet Merah", en: "Prestigious art gallery showroom with spotlit mannequins displaying the masterpiece batik textile" }
          ],
          propsList: [
            { my: "Canting tembaga berhulu buluh halus, lilin lebah asli, skrol lakaran motif bunga", en: "Brass canting tool with bamboo handle, organic beeswax block, floral motif concept scroll" },
            { my: "Kain sutera tulen terbentang, pensel grafit lakaran, pembaris kayu jati", en: "Stretched pure white silk canvas, fine graphite sketch pencil, teakwood alignment guide" },
            { my: "Dapur kerosin kecil menyala, periuk tembaga berisi lilin cair keemasan", en: "Small brass kerosene stove, copper melting pot filled with golden molten wax" },
            { my: "Mangkuk seramik pewarna indigo pekat, berus bulu sable sapuan warna, span alami", en: "Deep indigo dye ceramic bowls, sable hair shading brushes, natural sea sponge" },
            { my: "Penyepit kayu buluh panjang, kawah air panas merebus lilin, jemuran buluh", en: "Long bamboo lifting tongs, steaming wax-stripping copper vat, natural bamboo drying rack" },
            { my: "Kain batik sutera bercorak agung, selendang berlipat emas, sijil warisan kraf", en: "Magnificent completed batik silk textile, gold-trimmed ceremonial stole, artisan certificate" }
          ],
          actionsEn: [
            "sketching delicate traditional floral arabesques onto pure white silk",
            "dipping the fine brass canting tool into molten beeswax with practiced grace",
            "applying flowing wax outlines with laser-precise hand coordination and breath control",
            "layering luminous organic indigo dyes across intricate wax barriers",
            "lifting the finished silk cloth from the steaming wax bath to reveal glorious contrasts",
            "draping the breathtaking heirloom batik textile before an admiring gallery audience"
          ]
        },
        UKIRAN: {
          envs: [
            { my: "Bengkel Ukiran Kayu Cengal Bonda", en: "Traditional timber workshop with scent of freshly shaved cengal wood and ambient sunlight" },
            { my: "Meja Kerja Kayu Padu Berlapik Kulit", en: "Heavy weathered workbench covered in fine wood chips and curled timber shavings" },
            { my: "Bilik Lakaran Geometri & Pola Warisan", en: "Design alcove with parchment blueprints of traditional awan larat patterns on wall" },
            { my: "Sudut Pahat & Batu Asah Basah", en: "Tool maintenance corner with wet sharpening whetstones and polished oilcloth tool rolls" },
            { my: "Kawasan Kemasan Minyak Tung & Saduran Emas", en: "Finishing chamber with warm tungsten spotlights highlighting natural timber grain depths" },
            { my: "Dewan Istana Warisan & Ruang Pameran Utama", en: "Grand royal exhibition hall where the master woodcraft installation stands illuminated" }
          ],
          propsList: [
            { my: "Papan kayu cengal padu, pahat kuku pelbagai saiz, tukul kayu pengetuk (gandin)", en: "Solid cengal hardwood plank, set of gouge chisels, traditional wooden mallet (gandin)" },
            { my: "Kertas surih pola awan larat, pembaris keluli siku, jangka lukis tembaga", en: "Translucent pattern tracing paper, steel square ruler, antique brass compass" },
            { my: "Batu asah minyak Jepun, kain lap berkualiti, minyak pelincir mata pahat", en: "Fine grit oil sharpening stone, oiled leather wiping cloth, chisel honing compound" },
            { my: "Pahat rata penembus rongga kayu, berus habuk bulu kuda, kaca pembesar kayu", en: "Deep relief parting chisels, horsehair dust brush, inspection magnifying lens" },
            { my: "Kertas pasir gred halus, minyak tung alami, kain pengilat gentian kapas", en: "Ultra-fine polishing sandpapers, natural tung oil flask, pure cotton buffing rags" },
            { my: "Panel ukiran awan larat agung siap berkilat, plak ukiran emas nama pengukir", en: "Pristine carved floral timber screen panel, engraved brass signature plate, display stand" }
          ],
          actionsEn: [
            "inspecting the dense grain of aged cengal timber with reverent hands",
            "tracing intricate traditional floral motifs onto the sanded timber surface",
            "striking the wooden mallet against the gouge chisel to carve deep sculptural relief",
            "sharpening the steel cutting edge until it gleams with razor-like sharpness",
            "rubbing rich natural tung oil deep into the timber pores to awaken warm golden tones",
            "unveiling the magnificent completed relief panel to gasps of admiration"
          ]
        },
        GENERAL: {
          envs: [
            { my: "Ruang Peribadi Permulaan & Fajar Ketenangan", en: "Quiet sunlit personal room at dawn with gentle morning sunbeams and a view of the open horizon" },
            { my: "Laluan Menuju Medan Cabaran Terbuka", en: "Dynamic open pathway leading towards the challenging arena under clear morning daylight" },
            { my: "Pusat Bengkel Strategi & Persiapan Rapi", en: "Dedicated focused workspace arranged with precision tools and research blueprints" },
            { my: "Medan Ujian & Zon Rintangan Kritikal", en: "High-intensity obstacle ground under dramatic overcast skies and focused directional lighting" },
            { my: "Garis Penentuan & Pintu Klimaks Kejayaan", en: "Dramatic high-contrast final arena on the brink of achievement under evening golden hour rays" },
            { my: "Puncak Gemilang & Ruang Perayaan Kejayaan", en: "Panoramic vista at sunrise with warm triumphant golden volumetric light flooding the scene" }
          ],
          propsList: [
            { my: "Buku catatan peribadi kulit coklat, jam tangan berharga, cawan teh suam", en: "Leatherbound personal journal, treasured wristwatch, steaming ceramic tea mug" },
            { my: "Beg peralatan khusus, peta perancangan fasa, telefon pintar navigasi", en: "Rugged specialized equipment bag, phase roadmap diagram, digital navigation device" },
            { my: "Kit peralatan teknikal utama, lampu suluh medan berfokus, buku manual operasi", en: "Primary technical toolkit, focused field LED lamp, operational reference guide" },
            { my: "Tali keselamatan bersimpul kemas, peranti pemantauan metrik, sarung tangan lasak", en: "Heavy-duty safety rigging, biometric performance monitor, reinforced work gloves" },
            { my: "Komponen penyelesai cabaran utama, kunci penentu matlamat, penanda kejayaan", en: "Central objective resolution apparatus, golden master key, final milestone emblem" },
            { my: "Trofi pencapaian bermakna, surat penghargaan rasmi, cenderahati kenangan", en: "Gleaming award of excellence, official letter of commendation, celebratory keepsake" }
          ],
          actionsEn: [
            "standing with resolute focus, preparing equipment and mentally committing to the path",
            "striding forward purposefully into the dynamic operational zone",
            "meticulously calibrating key tools with calm unwavering precision",
            "pushing through intense physical and intellectual hurdles with ferocious tenacity",
            "executing the decisive breakthrough maneuver in the clutch of the critical moment",
            "standing tall in peaceful triumph as golden sunlight crowns the journey of dedication"
          ]
        }
      };

      const t = domainThemes[dom] || domainThemes.GENERAL;

      // 30 progressive stage structures mapping across 6 story acts
      const stages = [];
      const stageTitles = [
        // Act 1 (1-5): Setup & Catalyst
        { title: "Langkah Pertama Bermula", cat: 0, cam: { shotType: "Wide Establishing Shot", lens: "24mm f/2.8", movement: "Slow Cinematic Push In" }, act: "Act 1: Permulaan" },
        { title: "Menilai Peralatan & Bekalan", cat: 0, cam: { shotType: "Medium Shot", lens: "50mm f/1.4", movement: "Eye-level Dolly" }, act: "Act 1: Persediaan" },
        { title: "Detik Keraguan Muncul", cat: 0, cam: { shotType: "Close-Up Face", lens: "85mm f/1.4", movement: "Slow Circular Arc" }, act: "Act 1: Ujian Awal" },
        { title: "Kata Semangat Pendorong", cat: 1, cam: { shotType: "Over-the-Shoulder Medium Shot", lens: "50mm f/1.8", movement: "Subtle Handheld Push" }, act: "Act 1: Nasihat" },
        { title: "Melangkah Ke Zon Cabaran", cat: 1, cam: { shotType: "Low Angle Tracking Shot", lens: "35mm f/1.8", movement: "Dynamic Follow Walk" }, act: "Act 1: Pintu Masuk" },

        // Act 2A (6-11): Rising Action & Early Obstacles
        { title: "Tindakan Awal Dilancarkan", cat: 1, cam: { shotType: "Medium Wide Shot", lens: "35mm f/2.0", movement: "Steady-cam Pan" }, act: "Act 2A: Tindakan" },
        { title: "Rintangan Pertama Menduga", cat: 2, cam: { shotType: "Medium Close-Up", lens: "50mm f/1.4", movement: "Quick Refocus Tracking" }, act: "Act 2A: Rintangan" },
        { title: "Menukar Taktik & Strategi", cat: 2, cam: { shotType: "Close-Up on Hands and Tools", lens: "85mm Macro f/2.8", movement: "Rack Focus" }, act: "Act 2A: Inovasi" },
        { title: "Sokongan Dari Sahabat", cat: 2, cam: { shotType: "Medium Two-Shot", lens: "50mm f/1.4", movement: "Slow Lateral Dolly" }, act: "Act 2A: Kerjasama" },
        { title: "Kejayaan Kecil Pertama", cat: 2, cam: { shotType: "Close-Up Smiling Face", lens: "85mm f/1.4", movement: "Gentle Push In" }, act: "Act 2A: Kemajuan" },
        { title: "Mendekati Sasaran Utama", cat: 3, cam: { shotType: "Medium Shot", lens: "50mm f/1.8", movement: "Forward Tracking" }, act: "Act 2A: Momentum" },

        // Act 2B (12-17): Midpoint & Major Twist
        { title: "Titik Tengah: Situasi Berubah", cat: 3, cam: { shotType: "Dutch Angle Medium Close-Up", lens: "35mm f/1.8", movement: "Fast Whip Pan" }, act: "Act 2B: Titik Tengah" },
        { title: "Ujian Terbesar Tiba", cat: 3, cam: { shotType: "Extreme Close-Up Eyes", lens: "100mm f/2.8", movement: "Snap Zoom" }, act: "Act 2B: Krisis" },
        { title: "Kehilangan Harapan Seketika", cat: 3, cam: { shotType: "Wide High Angle Shot", lens: "24mm f/2.8", movement: "Slow Crane Up" }, act: "Act 2B: Titik Terendah" },
        { title: "Nasihat Di Detik Sunyi", cat: 4, cam: { shotType: "Medium Close-Up in Silhouette", lens: "85mm f/1.4", movement: "Slow Orbit" }, act: "Act 2B: Muhasabah" },
        { title: "Bangkit Dengan Azam Baharu", cat: 4, cam: { shotType: "Low Angle Hero Rise Shot", lens: "35mm f/1.4", movement: "Dramatic Tilt Up" }, act: "Act 2B: Kebangkitan" },
        { title: "Merangka Pelan Terakhir", cat: 4, cam: { shotType: "Top-Down Overhead Table Shot", lens: "28mm f/2.0", movement: "Slow Spiral Push" }, act: "Act 2B: Strategi Muktamad" },

        // Act 3A (18-23): The Race & Climax Buildup
        { title: "Perlumbaan Menentang Masa", cat: 4, cam: { shotType: "Fast Kinetic Tracking Shot", lens: "35mm f/1.8", movement: "Handheld Run Follow" }, act: "Act 3A: Pecutan" },
        { title: "Melepasi Halangan Genting", cat: 4, cam: { shotType: "Medium Action Shot", lens: "50mm f/1.4", movement: "Dynamic Whip Arc" }, act: "Act 3A: Ketangkasan" },
        { title: "Detik Kemuncak Kian Dekat", cat: 4, cam: { shotType: "Wide Confrontation Shot", lens: "24mm f/2.8", movement: "Slow Steady Glide" }, act: "Act 3A: Di Ambang Garisan" },
        { title: "Tumpuan Mutlak Jiwa & Raga", cat: 4, cam: { shotType: "Extreme Close-Up Focused Gaze", lens: "100mm Macro f/2.8", movement: "Slow Motion Push" }, act: "Act 3A: Penumpuan Penuh" },
        { title: "Membuka Langkah Penentu", cat: 4, cam: { shotType: "Low Angle Dynamic Wide", lens: "28mm f/2.0", movement: "Fast Dynamic Slide" }, act: "Act 3A: Serangan Nekad" },
        { title: "Saat Genting Penentuan", cat: 4, cam: { shotType: "Medium Close-Up High Tension", lens: "50mm f/1.2", movement: "Shaking Handheld Tension" }, act: "Act 3A: Saat Kritikal" },

        // Act 3B (24-27): Climax & Breakthrough
        { title: "Klimaks: Menentang Had Kemampuan", cat: 4, cam: { shotType: "Dynamic 360 Degree Orbit", lens: "35mm f/1.4", movement: "Rapid Sweeping Orbit" }, act: "Act 3B: Klimaks Agung" },
        { title: "Detik Kemenangan Dikecapi", cat: 5, cam: { shotType: "Triumphant Low Angle Hero Shot", lens: "35mm f/1.4", movement: "Slow Rise into Light" }, act: "Act 3B: Kemenangan" },
        { title: "Kelegaan Membasahi Jiwa", cat: 5, cam: { shotType: "Medium Close-Up Gentle Relief", lens: "85mm f/1.4", movement: "Slow Smooth Tilt Down" }, act: "Act 3B: Kelegaan Hati" },
        { title: "Sorakan & Pelukan Kegembiraan", cat: 5, cam: { shotType: "Wide Joyous Celebration Shot", lens: "24mm f/2.8", movement: "Circling Glide" }, act: "Act 3B: Keraian" },

        // Epilogue (28-30): Resolution & Legacy
        { title: "Menilai Erti Sebuah Perjuangan", cat: 5, cam: { shotType: "Medium Shot Contemplation", lens: "50mm f/1.2", movement: "Slow Push to Smile" }, act: "Epilog: Nilai Hidup" },
        { title: "Merayakan Kejayaan Bersama", cat: 5, cam: { shotType: "Warm Two-Shot Golden Light", lens: "50mm f/1.4", movement: "Slow Lateral Pan" }, act: "Epilog: Bersama Kasih" },
        { title: "Masa Depan Gemilang Terbentang", cat: 5, cam: { shotType: "Epic Golden Hour Wide Vista", lens: "24mm f/2.8", movement: "Majestic Crane Pull Back" }, act: "Epilog: Masa Depan" }
      ];

      for (let idx = 0; idx < stageTitles.length; idx++) {
        const item = stageTitles[idx];
        const envObj = t.envs[item.cat] || t.envs[t.envs.length - 1];
        const propsObj = t.propsList[item.cat] || t.propsList[t.propsList.length - 1];
        const baseActionEn = t.actionsEn[item.cat] || t.actionsEn[t.actionsEn.length - 1];

        stages.push({
          title: item.title,
          objective: `Fasa ${idx + 1} (${item.act}): Memajukan plot penceritaan melalui tindakan berimpak tinggi.`,
          action: `${name} bertindak dengan penuh fokus di ${envObj.my}, mengendalikan ${propsObj.my.split(",")[0]} dengan kemahiran yang jitu.`,
          visualActionEn: `${baseActionEn}, actively utilizing ${propsObj.en.split(",")[0]} with sharp practiced dexterity`,
          dialogueText: idx < 6
            ? "Setiap impian besar bermula dengan satu langkah berani pada hari ini."
            : idx < 12
            ? "Bila jalan lama buntu, kita cipta pendekatan baharu yang lebih bijak."
            : idx < 18
            ? "Selagi ada sisa tenaga dan harapan, aku takkan sesekali menyerah kalah."
            : idx < 24
            ? "Inilah saat yang menentukan segalanya. Tiada ruang untuk berundur!"
            : idx < 28
            ? "Alhamdulillah! Berkat ketabahan dan doa, kejayaan ini menjadi kenyataan!"
            : "Pengalaman ini membina jiwa yang lebih kental untuk menempuh hari esok.",
          speaker: name,
          emotion: idx < 6
            ? "Penuh harapan dan waspada"
            : idx < 12
            ? "Cekal dan gigih berusaha"
            : idx < 18
            ? "Tersentak namun bangkit berani"
            : idx < 24
            ? "Tekad membara dan fokus mutlak"
            : "Kesyukuran mendalam dan damai",
          expressionEn: idx < 6
            ? "Determined and hopeful with attentive alert eyes"
            : idx < 12
            ? "Intense concentration, steady jaw with unwavering drive"
            : idx < 18
            ? "Shock turning into steely fierce resolve, teeth gritted"
            : idx < 24
            ? "Peak adrenaline, fierce victorious determination burning in gaze"
            : "Profound serene smile, radiant eyes shining with gratitude and inner peace",
          bodyLanguageEn: idx < 6
            ? "Upright, alert posture, handling equipment with steady hands"
            : idx < 12
            ? "Lean forward stance, nimble dexterous hand mechanics"
            : idx < 18
            ? "Tense defensive stance transitioning into a powerful upward surge"
            : idx < 24
            ? "Dynamic athletic execution, perfectly balanced weight and momentum"
            : "Relaxed open shoulders, peaceful upright silhouette basking in warm sunlight",
          environment: envObj.my,
          environmentEn: envObj.en,
          props: propsObj.my,
          propsEn: propsObj.en,
          cam: item.cam,
          narration: `Setiap detik adalah titipan berharga; di babak ini ${name} membuktikan bahawa keikhlasan dan ketabahan mampu menewaskan segala halangan hidup.`,
          sfx: [{ name: `Bunyi foley realistik babak ${idx + 1} (${item.title})`, volume: "60%", purpose: "Membangunkan suasana visual yang mendalam" }],
          musicCue: idx < 12
            ? "Alunan muzik sinematik pengenalan beransur bangkit megah"
            : idx < 24
            ? "Orkestra dramatik bertenaga tinggi memuncak dengan debaran cemas"
            : "Skor piano sinematik berpadu orkestra crescendo gemilang penuh inspirasi"
        });
      }

      return stages;
    }
  };

  // Get full 30-beat array for domain
  const generator = domainBeatsGenerators[domain] || domainBeatsGenerators.GENERIC;
  const full30Beats = generator(lead, sup, activeProps, domain);

  // If user requested targetCount scenes (e.g. 6, 8, 12, 20, 30):
  if (targetCount === full30Beats.length) {
    return full30Beats;
  }

  if (targetCount > full30Beats.length) {
    // If requested more than 30, duplicate or extrapolate seamlessly
    const extended = [...full30Beats];
    while (extended.length < targetCount) {
      const idx = extended.length + 1;
      const refBeat = full30Beats[extended.length % full30Beats.length];
      extended.push({
        ...refBeat,
        title: `Lanjutan Babak ${idx}: ${refBeat.title}`,
        objective: `Memperluas kesinambungan fasa ${idx} dengan lebih teliti.`,
        action: `${lead} meneliti persekitaran di ${refBeat.environment} sambil memperhalus tindakan seterusnya.`,
        dialogueText: "Setiap langkah kecil yang kita ambil membawa kita lebih hampir kepada kejayaan mutlak."
      });
    }
    return extended;
  }

  // Sample targetCount from 30 beats evenly:
  // Always include index 0 (opening) and index 29 (final climax/resolution)
  const sampled = [];
  for (let i = 0; i < targetCount; i++) {
    const beatIndex = Math.min(29, Math.round((i * (full30Beats.length - 1)) / (targetCount - 1)));
    sampled.push(full30Beats[beatIndex]);
  }

  return sampled;
}
