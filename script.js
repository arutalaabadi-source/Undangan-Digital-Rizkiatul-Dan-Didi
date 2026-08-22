/* =====================================================
   DATA UNDANGAN
===================================================== */

const weddingDate =
    new Date("2026-12-20T08:00:00+07:00").getTime();

const whatsappNumber =
    "6281290492607";

const rekening =
    "1234567890";


/* =====================================================
   NAMA TAMU DARI URL
===================================================== */

const params =
    new URLSearchParams(window.location.search);

const guest =
    params.get("to");

if (guest) {

    document.getElementById("guestName").textContent =
        guest;

}


/* =====================================================
   OPEN INVITATION
===================================================== */

const opening =
    document.getElementById("opening");

const website =
    document.getElementById("website");

const openButton =
    document.getElementById("openInvitation");

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");


openButton.addEventListener("click", function () {

    opening.style.opacity = "0";

    opening.style.transform = "scale(1.05)";


    setTimeout(function () {

        opening.style.display = "none";

        document.body.classList.remove("locked");

        music.play()
            .then(function () {

                musicButton.textContent = "❚❚";

            })
            .catch(function () {

                musicButton.textContent = "♫";

            });

        startReveal();

    }, 900);

});


/* =====================================================
   MUSIC
===================================================== */

musicButton.addEventListener("click", function () {

    if (music.paused) {

        music.play();

        musicButton.textContent = "❚❚";

    } else {

        music.pause();

        musicButton.textContent = "♫";

    }

});


/* =====================================================
   COUNTDOWN
===================================================== */

function countdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    if (distance <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }


    const days =
        Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance / (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (distance / (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (distance / 1000) % 60
        );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


countdown();

setInterval(countdown, 1000);


/* =====================================================
   SCROLL ANIMATION
===================================================== */

function startReveal() {

    const elements =
        document.querySelectorAll(".reveal");


    const observer =
        new IntersectionObserver(

            function(entries) {

                entries.forEach(function(entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: .12
            }

        );


    elements.forEach(function(element) {

        observer.observe(element);

    });

}


/* =====================================================
   COPY BANK
===================================================== */

const copyBank =
    document.getElementById("copyBank");


copyBank.addEventListener("click", async function () {

    try {

        await navigator.clipboard.writeText(rekening);

        copyBank.textContent =
            "✓ NOMOR BERHASIL DISALIN";

        setTimeout(function () {

            copyBank.textContent =
                "SALIN NOMOR REKENING";

        }, 2500);

    } catch {

        alert(
            "Nomor rekening BRI: " +
            rekening
        );

    }

});


/* =====================================================
   UCAPAN
===================================================== */

const wishForm =
    document.getElementById("wishForm");

const wishList =
    document.getElementById("wishList");

const wishStatus =
    document.getElementById("wishStatus");


let wishes =
    JSON.parse(
        localStorage.getItem("weddingWishes")
    ) || [];


function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function renderWishes() {

    if (wishes.length === 0) {

        wishList.innerHTML = `
            <div class="wish-card">

                <strong>
                    Jadilah yang pertama memberi ucapan ❤️
                </strong>

                <p>
                    Doa terbaik dari Anda akan menjadi
                    bagian indah dari hari bahagia kami.
                </p>

            </div>
        `;

        return;

    }


    wishList.innerHTML =
        wishes.map(function(item) {

            return `

                <div class="wish-card">

                    <strong>
                        ${escapeHTML(item.name)}
                    </strong>

                    <p>
                        ${escapeHTML(item.message)}
                    </p>

                </div>

            `;

        }).join("");

}


renderWishes();


wishForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "wishName"
            ).value.trim();


        const message =
            document.getElementById(
                "wishMessage"
            ).value.trim();


        if (!name || !message) {

            return;

        }


        wishes.unshift({

            name: name,

            message: message

        });


        localStorage.setItem(
            "weddingWishes",
            JSON.stringify(wishes)
        );


        renderWishes();


        wishForm.reset();


        wishStatus.textContent =
            "Ucapan berhasil ditambahkan ❤️";


        setTimeout(function() {

            wishStatus.textContent = "";

        }, 3000);

    }
);


/* =====================================================
   RSVP
===================================================== */

const presentButton =
    document.getElementById("presentButton");

const absentButton =
    document.getElementById("absentButton");


presentButton.addEventListener(
    "click",
    function() {

        presentButton.classList.add("active");

        absentButton.classList.remove("active");

        sendWhatsApp("Hadir");

    }
);


absentButton.addEventListener(
    "click",
    function() {

        absentButton.classList.add("active");

        presentButton.classList.remove("active");

        sendWhatsApp("Tidak hadir");

    }
);


/* =====================================================
   WHATSAPP
===================================================== */

const whatsappButton =
    document.getElementById(
        "whatsappButton"
    );


function sendWhatsApp(status) {

    const guestName =
        guest || "Tamu Undangan";


    const message =

        `Halo Rizkiatul & Didi 👋%0A%0A` +

        `Saya ${guestName}.%0A` +

        `Konfirmasi kehadiran: ${status}.%0A%0A` +

        `Semoga acara pernikahannya berjalan lancar ` +

        `dan menjadi awal kehidupan yang penuh kebahagiaan. ❤️`;


    const url =
        `https://wa.me/${whatsappNumber}?text=${message}`;


    whatsappButton.href = url;

}


/* =====================================================
   DEFAULT WHATSAPP
===================================================== */

sendWhatsApp("Hadir");
