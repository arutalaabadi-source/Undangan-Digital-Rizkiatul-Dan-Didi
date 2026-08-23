# Undangan Digital Rizkiatul & Didi — Premium Sunda

File utama:
- `index.html`
- `style.css`
- `script.js`
- `cover.JPG`, `foto1.JPG` s/d `foto6.JPG`, `pria.JPG`, `wanita.JPG`, `music.mp3`

## Data yang sudah disesuaikan
- Mempelai wanita: **Rizkiatul**
- Orang tua: **Bapak Endang Sukandar & Ibu Iis Fatimah**
- Mempelai pria: **Didi**
- Orang tua: **Bapak Ruben & Ibu Sarwendah**
- WhatsApp RSVP: **081290492607**
- Tanggal: **18 Desember 2026**

## Rekening / ATM card
Tampilan Wedding Gift sudah dibuat seperti kartu ATM premium. Nomor rekening masih contoh:
`1234567890123456`

Ganti pada `index.html` di bagian:
```html
<div class="atm-number" id="accountNumber">1234 5678 9012 3456</div>
<button class="atm-copy copy-btn" data-copy="1234567890123456">
```

Jangan lupa mengganti `data-copy` dengan nomor rekening sebenarnya agar tombol salin bekerja.

## Firebase
`script.js` sudah mendukung Firebase Firestore untuk ucapan & RSVP online. Isi `firebaseConfig` dengan konfigurasi project Firebase kamu.


### Rekening sementara
- BCA — 1234 5678 9012 — atas nama RIZKIATUL
- BRI — 9876 5432 1098 — atas nama DIDI

**Catatan:** nomor rekening di atas adalah nomor contoh sementara dan wajib diganti sebelum website dipublikasikan.
