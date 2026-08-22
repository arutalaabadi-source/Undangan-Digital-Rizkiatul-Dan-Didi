/* ==========================================
   NAMA TAMU DARI LINK
========================================== */

const params = new URLSearchParams(window.location.search);

const guest =
    params.get("to") ||
    "Tamu Undangan";

document.getElementById("guestName").textContent =
    guest;


/* ==========================================
   OPEN INVITATION
========================================== */

const opening =
    document.getElementById("opening");

const website =
    document.getElementById("website");

const openButton =
    document.getElementById("openInvitation");

const music =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");


document.body.classList.add("locked");


openButton.addEventListener("click", function () {

    opening.style.transition =
        "opacity .8s ease, transform .8s ease";

    opening.style.opacity = "0";

    opening.style.transform =
        "scale(1.05)";


    setTimeout(function () {

        opening.remove();

        website.classList.remove("hidden");

        document.body.classList.remove("locked");

        window.scrollTo(0, 0);


        music.play()
            .then(function () {

                musicButton.innerHTML = "❚❚";

            })
            .catch(function () {

                musicButton.innerHTML = "♫";

            });


        startAnimation();

    }, 800);

});


/* ==========================================
   MUSIC
========================================== */

musicButton.addEventListener("click", function () {

    if (music.paused) {

        music.play();

        musicButton.innerHTML = "❚❚";

    } else {

        music.pause();

        musicButton.innerHTML = "♫";

    }

});


/* ==========================================
   COUNTDOWN
========================================== */

const weddingDate =
    new Date(
        "2026-12-20T08:00:00+07:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    if (distance <= 0) {

        document.getElementById("days")
            .innerText = "00";

        document.getElementById("hours")
            .innerText = "00";

        document.getElementById("minutes")
            .innerText = "00";

        document.getElementById("seconds")
            .innerText = "00";

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (distance /
                (1000 * 60 * 60)) %
            24
        );

    const minutes =
        Math.floor(
            (distance /
                (1000 * 60)) %
            60
        );

    const seconds =
        Math.floor(
            (distance /
                1000) %
            60
        );


    document.getElementById("days")
        .innerText =
        String(days).padStart(2, "0");

    document.getElementById("hours")
        .innerText =
        String(hours).padStart(2, "0");

    document.getElementById("minutes")
        .innerText =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds")
        .innerText =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* ==========================================
   SCROLL ANIMATION
========================================== */

function startAnimation() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("show");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        function (element) {

            observer.observe(element);

        }
    );

}


/* ==========================================
   COPY BANK
========================================== */

function copyAccount() {

    const account =
        "1234567890";


    navigator.clipboard
        .writeText(account)
        .then(function () {

            const button =
                document.querySelector(
                    ".copy-button"
                );

            const oldText =
                button.innerText;


            button.innerText =
                "✓ BERHASIL DISALIN";


            setTimeout(function () {

                button.innerText =
                    oldText;

            }, 2000);

        })
        .catch(function () {

            alert(
                "Nomor Rekening BRI: " +
                account
            );

        });

}


/* ==========================================
   WHATSAPP RSVP
========================================== */

const phone =
    "6281290492607";


const message =
    `Halo, saya ${guest}.

Saya ingin mengonfirmasi kehadiran pada acara pernikahan Rizkiatul Fuaziah & Didi.

Terima kasih. ❤️`;


const whatsappLink =
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(message);


document.getElementById(
    "whatsappButton"
).href =
    whatsappLink;


/* ==========================================
   SMOOTH SCROLL
========================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const target =
                    document.querySelector(
                        link.getAttribute(
                            "href"
                        )
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });
