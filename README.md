# 🌿 Undangan Digital Rizkiatul & Didi

Website undangan digital premium dengan nuansa adat Sunda.

## Struktur file

```text
index.html
style.css
script.js
cover.JPG
foto1.JPG
foto2.JPG
foto3.JPG
foto4.JPG
foto5.JPG
foto6.JPG
pria.JPG
wanita.JPG
music.mp3
```

## Fitur

- Opening screen premium
- Animasi preloader
- Background music
- Floating particles
- Animasi zoom foto
- Scroll reveal animation
- Couple section
- Countdown 18 Desember 2026
- Detail akad & resepsi
- Google Maps
- Gallery + lightbox
- RSVP hadir / tidak hadir
- Pesan & doa
- WhatsApp otomatis
- Wedding gift
- Copy nomor rekening
- Nama tamu dari URL
- Responsive mobile

## 1. Upload ke GitHub

Upload:
- index.html
- style.css
- script.js

Kemudian pastikan file foto dan musik di repository memiliki nama yang sama persis.

## 2. Ganti nomor WhatsApp

Buka `script.js`.

Cari:

```javascript
const phone = "6281234567890";
```

Ganti dengan nomor WhatsApp tujuan.

Contoh:

```javascript
const phone = "628xxxxxxxxxx";
```

Jangan menggunakan tanda `+`, spasi, atau strip.

## 3. Ganti rekening

Buka `index.html`, cari:

```text
1234567890
```

Ganti dengan nomor rekening asli dan ubah nama pemiliknya.

## 4. Nama tamu otomatis

Website mendukung URL:

```text
?to=Nama%20Tamu
```

Contoh:

```text
https://username.github.io/nama-repository/?to=Bapak%20Andi
```

Maka pada halaman pembuka akan tampil:

```text
Kepada Yth.
Bapak Andi
```

## 5. Catatan pesan & doa

Versi ini menggunakan GitHub Pages sehingga tidak memiliki database server.

Pesan:
- dikirim ke WhatsApp penerima
- juga disimpan di `localStorage` browser pengunjung

Artinya daftar ucapan belum menjadi satu database yang bisa dilihat oleh semua tamu.

Jika ingin semua tamu melihat ucapan secara real-time, gunakan database seperti Firebase/Supabase.


## 🔥 Database Ucapan & RSVP Online

Versi ini sudah disiapkan untuk **Firebase Firestore**.

Dengan Firebase, pesan dari tamu dapat tersimpan secara online sehingga ucapan dapat ditampilkan kepada tamu lain yang membuka website.

### 1. Buat Firebase Project

Masuk ke Firebase Console dan buat project baru.

### 2. Aktifkan Firestore Database

Pilih:
**Build → Firestore Database → Create database**

Untuk testing awal, gunakan mode yang sesuai kebutuhan. Sebelum undangan dipublikasikan, sebaiknya gunakan Security Rules yang membatasi akses.

### 3. Tambahkan Web App

Di Firebase Project:
**Project settings → Your apps → Web app**

Firebase akan memberikan konfigurasi seperti:

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

Copy konfigurasi tersebut ke bagian `FIREBASE CONFIG` di `script.js`.

### 4. Collection Firestore

Website otomatis menggunakan collection:

```text
wishes
```

Field yang disimpan:

```text
name
attendance
guestCount
message
createdAt
```

### 5. WhatsApp

Nomor WhatsApp RSVP sudah diatur ke:

```text
081290492607
```

Dalam kode web digunakan format internasional:

```javascript
const phone = "6281290492607";
```

### 6. Nama Tamu

Gunakan:

```text
?to=Nama%20Tamu
```

Contoh:

```text
https://username.github.io/Undangan-Digital-Rizkiatul-Dan-Didi/?to=Bapak%20Andi
```

Maka halaman pembuka akan menampilkan nama **Bapak Andi**.

### ⚠️ Catatan Keamanan Firebase

Jangan menaruh service account private key di website.

Firebase Web App config memang dapat berada di frontend, tetapi Firestore Security Rules harus disusun dengan benar agar data tidak dapat dimodifikasi sembarangan.
