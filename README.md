# MASTER AI VIDEO PROMPT STUDIO 🎬✨

Sistem penjana prompt dan pakej pra-produksi video AI berkuasa tinggi. Dibina untuk mengubah idea ringkas kepada perancangan produksi video sinematik yang lengkap dan bertaraf industri.

---

## 🌟 Ciri-Ciri Utama (Core Features)

1. **Aliran Progresif AI (From Idea to Production)**
   - Masukkan sebarang idea ringkas, AI akan menstrukturkan keseluruhan pelan produksi dalam 12 langkah.
2. **Konsep Cerita & Skrip Sinematik (Story & Script Generator)**
   - Arka 4-fasa (Beginning, Middle, Climax, Ending), tema moral, logline, dan skrip babak demi babak.
3. **Profil Watak & Character Lock (Character Dossier)**
   - Profil terperinci watak (jantina, umur, wajah, busana, psikologi, suara).
   - Sistem kunci identiti (*Character Lock*) untuk memastikan konsistensi visual tidak lari dari babak ke babak.
4. **Pembina Babak & Garis Masa (Scene Builder & Timeline)**
   - Sistem 18 jenis tangkapan kamera sinematik, sudut lensa, kawalan pencahayaan, dan kesinambungan cerita.
5. **Prompt Gambar Fotorealistik (18-Aspect Image Prompts)**
   - Format prompt gambar ultra-terperinci (watak terkunci, lensa, komposisi, pencahayaan, kualiti 8k).
6. **Skrip Dialog & Arahan Suara (Voice-Over & Dialogue)**
   - Skrip perbualan Bahasa Melayu asli, panduan emosi, kelajuan sebutan, jeda, dan tetapan ElevenLabs.
7. **Reka Bentuk Muzik & Foley SFX (Audio & Sound Design)**
   - Cadangan muzik latar (BPM, instrumen tradisi/moden, mood) serta senarai kesan bunyi (SFX) persekitaran.
8. **Prompt Video Sinematik (Sora, Kling & Runway Gen-3)**
   - Prompt video generasi baharu dengan fizik pergerakan, kawalan kamera berparameter, dan *Negative Prompts* anti-morphing.
9. **Papan Cerita Akhir (Final Storyboard)**
   - Paparan garis masa visual mengikut durasi saat terkumpul bagi setiap babak.
10. **Audit Kualiti AI (Consistency & QC Checker)**
    - Sistem semakan automatik 13-titik untuk mengesan sebarang ketidakkonsistenan jantina, umur, atau kesinambungan visual.

---

## 🛠️ Teknologi Yang Digunakan

- **Frontend:** React 19 + Vite
- **Ikon:** Lucide React
- **Gaya Visual:** Custom Modern CSS (Glassmorphism, Light Theme, Responsive Design)
- **Storan:** LocalStorage (Simpanan projek luar talian selamat)

---

## 🚀 Cara Memulakan Projek (Quick Start)

### 1. Klon Repositori
```bash
git clone <URL_REPOSITORI_ANDA>
cd "sistem video"
```

### 2. Pasang Dependensi (Install Dependencies)
```bash
npm install
```

### 3. Jalankan Pelayan Pembangunan (Run Dev Server)
```bash
npm run dev
```
Buka pelayar anda di `http://localhost:5173/`.

### 4. Membina Versi Produksi (Production Build)
```bash
npm run build
```

---

## 📁 Struktur Fail Utama
```text
├── src/
│   ├── components/
│   │   ├── common/         # Komponen boleh guna semula (Modal, CopyButton, dsb.)
│   │   ├── layout/         # Header, Sidebar, Navigation
│   │   └── modules/        # Modul Studio (NewProject, Story, Profil Watak, SceneBuilder, dsb.)
│   ├── services/
│   │   ├── aiService.js    # Enjin pemprosesan dan sintesis produksi AI
│   │   ├── consistencyChecker.js # Audit konsistensi 13-titik
│   │   └── promptBuilder.js      # Penjana prompt gambar & video berstruktur
│   ├── App.jsx             # Pengurus state aplikasi utama
│   ├── index.css           # Tema visual moden & sistem reka bentuk
│   └── main.jsx            # Titik masuk aplikasi
├── index.html
├── package.json
└── vite.config.js
```

---

## 📄 Lesen (License)
Hak Cipta Terpelihara © 2026. Dibina untuk kegunaan pengeluaran kandungan video AI kreatif.
