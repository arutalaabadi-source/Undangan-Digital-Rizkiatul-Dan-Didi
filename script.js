// ===============================
// EDIT DATA UNDANGAN DI SINI
// ===============================
const wedding = {
  groom: "Ari",
  bride: "Ayu",

  dateText: "20 Desember 2026",
  dateISO: "2026-12-20T08:00:00+07:00",

  akadDate: "Minggu, 20 Desember 2026",
  akadTime: "08.00 WIB - Selesai",

  receptionDate: "Minggu, 20 Desember 2026",
  receptionTime: "11.00 - 14.00 WIB",

  venue: "Nama Gedung / Venue",
  address: "Jl. Contoh Alamat No. 123, Jakarta",

  maps: "https://maps.google.com/",

  groomParents: "Bapak Nama Ayah & Ibu Nama Ibu",
  brideParents: "Bapak Nama Ayah & Ibu Nama Ibu",

  groomInstagram: "https://instagram.com/",
  brideInstagram: "https://instagram.com/",

  whatsapp: "6281234567890",

  bank: "BANK BCA",
  accountNumber: "1234567890",
  accountName: "Nama Pengantin"
};

// ===============================
// ISI NAMA TAMU DARI URL
// contoh: ?to=John%20Doe
// ===============================
const params = new URLSearchParams(window.location.search);
const guest = params.get("to") || "Tamu Undangan";

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

setText("openingGroom", wedding.groom);
setText("openingBride", wedding.bride);
setText("openingDate", wedding.dateText);
setText("guestName", guest);

setText("heroGroom", wedding.groom);
setText("heroBride", wedding.bride);
setText("heroDate", wedding.dateText);
setText("heroVenue", wedding.venue);

setText("groomName", wedding.groom);
setText("brideName", wedding.bride);
setText("groomParents", wedding.groomParents);
setText("brideParents", wedding.brideParents);

setText("akadDate", wedding.akadDate);
setText("akadTime", wedding.akadTime);
setText("receptionDate", wedding.receptionDate);
setText("receptionTime", wedding.receptionTime);

setText("venueName", wedding.venue);
setText("venueAddress", wedding.address);

setText("closingGroom", wedding.groom);
setText("closingBride", wedding.bride);

setText("bankName", wedding.bank);
setText("bankNumber", wedding.accountNumber);
setText("accountName", wedding.accountName);

document.getElementById("mapsButton").href = wedding.maps;
document.getElementById("groomInstagram").href = wedding.groomInstagram;
document.getElementById("brideInstagram").href = wedding.brideInstagram;

const waMessage =
  `Halo, saya ${guest}. Saya ingin mengonfirmasi kehadiran pada pernikahan ${wedding.groom} & ${wedding.bride}.`;
document.getElementById("rsvpButton").href =
  `https://wa.me/${wedding.whatsapp}?text=${encodeURIComponent(waMessage)}`;

// ===============================
// OPEN UNDANGAN
// ===============================
const opening = document.getElementById("opening");
const mainContent = document.getElementById("mainContent");
const openButton = document.getElementById("openInvitation");
const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");

document.body.classList.add("locked");

openButton.addEventListener("click", () => {
  opening.style.transition = "opacity .8s ease, transform .8s ease";
  opening.style.opacity = "0";
  opening.style.transform = "scale(1.03)";

  setTimeout(() => {
    opening.remove();
    mainContent.classList.remove("hidden");
    document.body.classList.remove("locked");
    window.scrollTo(0, 0);

    music.play().then(() => {
      musicButton.textContent = "❚❚";
    }).catch(() => {
      musicButton.textContent = "♫";
    });

    initReveal();
  }, 800);
});

musicButton.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicButton.textContent = "❚❚";
  } else {
    music.pause();
    musicButton.textContent = "♫";
  }
});

// ===============================
// COUNTDOWN
// ===============================
const targetDate = new Date(wedding.dateISO).getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = targetDate - now;

  if (distance <= 0) {
    setText("days", "00");
    setText("hours", "00");
    setText("minutes", "00");
    setText("seconds", "00");
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  setText("days", String(days).padStart(2, "0"));
  setText("hours", String(hours).padStart(2, "0"));
  setText("minutes", String(minutes).padStart(2, "0"));
  setText("seconds", String(seconds).padStart(2, "0"));
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===============================
// ANIMASI SCROLL
// ===============================
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ===============================
// COPY REKENING
// ===============================
document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const number = button.dataset.copy;

    try {
      await navigator.clipboard.writeText(number);
      const original = button.textContent;
      button.textContent = "✓ Berhasil Disalin";
      setTimeout(() => {
        button.textContent = original;
      }, 1800);
    } catch {
      alert("Nomor rekening: " + number);
    }
  });
});
