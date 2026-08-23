import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

/* =========================================================
   FIREBASE CONFIG
   1. Buat project Firebase
   2. Aktifkan Firestore Database
   3. Buat Web App
   4. Paste config Firebase kamu di bawah ini
========================================================= */
const firebaseConfig = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "PASTE_MESSAGING_SENDER_ID",
  appId: "PASTE_APP_ID"
};

let db = null;
const firebaseReady =
  firebaseConfig.apiKey !== "PASTE_API_KEY" &&
  firebaseConfig.projectId !== "PASTE_PROJECT_ID" &&
  firebaseConfig.appId !== "PASTE_APP_ID";

if (firebaseReady) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.error("Firebase gagal diinisialisasi:", error);
  }
}

/* =========================
   GUEST NAME FROM URL
   Example:
   ?to=Bapak%20Andi
========================= */
const params = new URLSearchParams(window.location.search);
const guest = params.get("to");
if (guest) {
  document.querySelector("#guestName").textContent = guest.replace(/\+/g, " ");
}

/* =========================
   PRELOADER
========================= */
window.addEventListener("load", () => {
  setTimeout(() => document.querySelector("#preloader").classList.add("hide"), 900);
});

/* =========================
   OPEN INVITATION + MUSIC
========================= */
const music = document.querySelector("#weddingMusic");
const musicControl = document.querySelector("#musicControl");

document.querySelector("#openInvitation").addEventListener("click", async () => {
  document.querySelector("#opening").classList.add("opening-out");

  setTimeout(() => {
    document.querySelector("#opening").style.display = "none";
    document.querySelector("#mainContent").classList.remove("hidden");
    document.body.classList.remove("locked");
    document.querySelector("#nav").classList.add("show");
    showQuickNav();
    window.scrollTo(0, 0);
    activateReveals();
    loadWishes();
  }, 700);

  try {
    await music.play();
    musicControl.classList.add("playing");
  } catch (e) {}
});

musicControl.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicControl.classList.add("playing");
    } catch (e) {}
  } else {
    music.pause();
    musicControl.classList.remove("playing");
  }
});

/* =========================
   PARTICLES
========================= */
const particleBox = document.querySelector("#particles");
for (let i = 0; i < 28; i++) {
  const p = document.createElement("span");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "%";
  p.style.animationDuration = (8 + Math.random() * 12) + "s";
  p.style.animationDelay = (-Math.random() * 15) + "s";
  p.style.opacity = (0.08 + Math.random() * 0.3).toFixed(2);
  p.style.width = p.style.height = (2 + Math.random() * 4) + "px";
  particleBox.appendChild(p);
}

/* =========================
   SCROLL REVEAL
========================= */
function activateReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach((el) => observer.observe(el));
}
activateReveals();

/* =========================
   NAV
========================= */
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) document.querySelector("#nav").classList.add("show");
});

/* =========================
   COUNTDOWN
========================= */
const weddingDate = new Date("December 18, 2026 08:00:00").getTime();

function updateCountdown() {
  const distance = weddingDate - Date.now();

  if (distance <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(
      id => document.querySelector("#" + id).textContent = "00"
    );
    return;
  }

  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance / 3600000) % 24);
  const minutes = Math.floor((distance / 60000) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.querySelector("#days").textContent = String(days).padStart(2, "0");
  document.querySelector("#hours").textContent = String(hours).padStart(2, "0");
  document.querySelector("#minutes").textContent = String(minutes).padStart(2, "0");
  document.querySelector("#seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* =========================
   GALLERY LIGHTBOX
========================= */
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    lightboxImage.src = item.getAttribute("href");
    lightbox.classList.add("show");
    document.body.classList.add("no-scroll");
  });
});

function closeLightbox() {
  lightbox.classList.remove("show");
  document.body.classList.remove("no-scroll");
}
document.querySelector("#closeLightbox").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* =========================
   CENTER QUICK NAVIGATION
========================= */
const quickNav = document.querySelector("#quickNav");
const quickItems = document.querySelectorAll(".quick-item");

function showQuickNav() {
  if (quickNav) quickNav.classList.add("show");
}

quickItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = item.dataset.target;
    const target = document.getElementById(targetId);
    if (!target) return;

    quickItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    quickItems.forEach((item) => {
      item.classList.toggle("active", item.dataset.target === entry.target.id);
    });
  });
}, { threshold: 0.35 });

["home", "couple", "event", "gallery", "rsvp", "gift"].forEach((id) => {
  const section = document.getElementById(id);
  if (section) sectionObserver.observe(section);
});

/* =========================
   RSVP + WHATSAPP + FIRESTORE
========================= */
document.querySelector("#rsvpForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#rsvpName").value.trim();
  const attendance = document.querySelector("#attendance").value;
  const count = document.querySelector("#guestCount").value;
  const guestMessage = document.querySelector("#guestMessage").value.trim();

  // Nomor WhatsApp: 081290492607 -> 6281290492607
  const phone = "6281290492607";

  const message =
`Assalamu'alaikum.

🌿 *KONFIRMASI UNDANGAN*
*Rizkiatul & Didi*

👤 Nama: ${name}
💚 Kehadiran: ${attendance}
👥 Jumlah tamu: ${count} orang

💌 *Pesan & Doa:*
"${guestMessage}"

Terima kasih.`;

  const submitBtn = e.target.querySelector(".submit-btn");
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = "<span>MENYIMPAN PESAN...</span><b>✓</b>";

  // Simpan ke database online.
  if (db) {
    try {
      await addDoc(collection(db, "wishes"), {
        name,
        attendance,
        guestCount: Number(count),
        message: guestMessage,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Gagal menyimpan ke Firestore:", error);
      showToast("WhatsApp tetap dibuka, tetapi pesan belum tersimpan online.");
    }
  } else {
    // Fallback agar website tetap bisa dipakai sebelum Firebase dikonfigurasi.
    saveLocalWish(name, attendance, guestMessage);
  }

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );

  if (db) await loadWishes();

  showToast("Terima kasih, pesan & konfirmasi berhasil dikirim.");
  e.target.reset();

  submitBtn.disabled = false;
  submitBtn.innerHTML = originalText;
});

/* =========================
   FIRESTORE WISHES
========================= */
async function loadWishes() {
  const list = document.querySelector("#wishList");

  if (!db) {
    renderLocalWishes();
    return;
  }

  list.innerHTML = '<div class="empty-wish">Memuat ucapan & doa...</div>';

  try {
    const wishesQuery = query(
      collection(db, "wishes"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const snapshot = await getDocs(wishesQuery);

    if (snapshot.empty) {
      list.innerHTML = '<div class="empty-wish">Jadilah yang pertama memberikan ucapan & doa.</div>';
      return;
    }

    list.innerHTML = snapshot.docs.map(doc => {
      const w = doc.data();
      const date = w.createdAt?.toDate
        ? w.createdAt.toDate().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        : "Baru saja";

      return `
        <article class="wish-item">
          <strong>${escapeHtml(w.name || "Tamu Undangan")}</strong>
          <small>${escapeHtml(w.attendance || "Konfirmasi")} • ${escapeHtml(date)}</small>
          <p>“${escapeHtml(w.message || "")}”</p>
        </article>
      `;
    }).join("");
  } catch (error) {
    console.error("Gagal membaca Firestore:", error);
    list.innerHTML = '<div class="empty-wish">Ucapan belum dapat dimuat. Pastikan Firebase sudah dikonfigurasi.</div>';
  }
}

/* =========================
   LOCAL FALLBACK
========================= */
function saveLocalWish(name, attendance, message) {
  const wishes = JSON.parse(localStorage.getItem("weddingWishes") || "[]");

  wishes.unshift({
    name,
    attendance,
    message,
    date: new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  });

  localStorage.setItem("weddingWishes", JSON.stringify(wishes.slice(0, 30)));
  renderLocalWishes();
}

function renderLocalWishes() {
  const list = document.querySelector("#wishList");
  const wishes = JSON.parse(localStorage.getItem("weddingWishes") || "[]");

  if (!wishes.length) {
    list.innerHTML = '<div class="empty-wish">Belum ada ucapan di perangkat ini.</div>';
    return;
  }

  list.innerHTML = wishes.map(w => `
    <article class="wish-item">
      <strong>${escapeHtml(w.name)}</strong>
      <small>${escapeHtml(w.attendance)} • ${escapeHtml(w.date)}</small>
      <p>“${escapeHtml(w.message)}”</p>
    </article>
  `).join("");
}

/* =========================
   COPY ACCOUNT
========================= */
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const value = btn.dataset.copy;

    try {
      await navigator.clipboard.writeText(value);
      const old = btn.textContent;
      btn.textContent = "✓ BERHASIL DISALIN";
      showToast("Nomor rekening berhasil disalin.");
      setTimeout(() => btn.textContent = old, 1800);
    } catch {
      showToast("Nomor rekening: " + value);
    }
  });
});

/* =========================
   TOAST
========================= */
let toastTimer;
function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* Load online wishes when page is ready. */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadWishes);
} else {
  loadWishes();
}
