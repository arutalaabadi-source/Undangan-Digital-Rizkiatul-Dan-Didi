# UNDANGAN PERNIKAHAN

## File yang perlu dimasukkan ke GitHub

Upload struktur berikut:

```text
undangan-nikah/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── cover.jpg
    ├── pria.jpg
    ├── wanita.jpg
    ├── foto1.jpg
    ├── foto2.jpg
    ├── foto3.jpg
    ├── foto4.jpg
    ├── foto5.jpg
    ├── foto6.jpg
    └── music.mp3
```

## Yang wajib diedit

Buka `script.js`, lalu ubah bagian:

```javascript
const wedding = {
  groom: "Ari",
  bride: "Ayu",
  dateText: "20 Desember 2026",
  dateISO: "2026-12-20T08:00:00+07:00",
  ...
};
```

Ganti nama, tanggal, lokasi, Google Maps, Instagram, WhatsApp, dan rekening sesuai data sebenarnya.

## Foto

Masukkan foto sendiri ke folder `assets` dengan nama:

- `cover.jpg`
- `pria.jpg`
- `wanita.jpg`
- `foto1.jpg` sampai `foto6.jpg`

Jangan mengubah nama file kalau tidak mengubah nama file di `index.html`.

## Musik

Masukkan musik MP3 ke:

```text
assets/music.mp3
```

Pastikan kamu memiliki hak untuk menggunakan musik tersebut.

## Nama tamu

Nama tamu bisa dibuat otomatis dari link.

Contoh:

```text
https://USERNAME.github.io/undangan-nikah/?to=Ari%20Muldin
```

Maka halaman akan menampilkan:

> Kepada Yth.  
> Ari Muldin

Spasi di URL ditulis sebagai `%20`.

## Upload ke GitHub

1. Buat repository baru, misalnya `undangan-nikah`.
2. Upload `index.html`.
3. Upload `style.css`.
4. Upload `script.js`.
5. Buat folder `assets`, lalu upload semua foto dan `music.mp3`.
6. Masuk ke **Settings → Pages**.
7. Pada **Build and deployment**, pilih:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
8. Save.
9. Tunggu beberapa saat sampai GitHub Pages aktif.

Link biasanya menjadi:

```text
https://USERNAME.github.io/undangan-nikah/
```

Ganti `USERNAME` dengan username GitHub kamu.


## PENTING — nama asset sudah disesuaikan

Coding ini memakai nama file persis seperti yang terlihat di upload GitHub:

- PUT_cover.jpg_HERE.JPG
- PUT_pria.jpg_HERE.JPG
- PUT_wanita.jpg_HERE.JPG
- PUT_foto1.jpg_HERE.JPG sampai PUT_foto6.jpg_HERE.JPG
- PUT_music.mp3_HERE.mp3

Semua file asset harus berada di **root repository**, sejajar dengan `index.html`.
