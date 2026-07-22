/* ===================================================
   AETHERVERSE WEBSITE
   script.js - PART 1
   Navigation + Hero Slider
=================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================
       Smooth Scrolling
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });
    });


    /* ==========================
       Sticky Navbar
    ========================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 60) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }

    });


    /* ==========================
       Mobile Menu
    ========================== */

    const menuButton = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".navbar nav");

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", () => {

            navMenu.classList.toggle("active");
            menuButton.classList.toggle("active");

        });

    }


    /* ==========================
       Hero Slideshow
    ========================== */

    const hero = document.querySelector(".hero");

    const heroImages = [

        "images/hero1.jpg",
        "images/hero2.jpg",
        "images/hero3.jpg",
        "images/hero4.jpg",
        "images/hero5.jpg",
        "images/hero6.jpg"

    ];

    let currentSlide = 0;

    function changeHeroImage() {

        if (!hero) return;

        hero.style.opacity = "0.2";

        setTimeout(() => {

            hero.style.backgroundImage =
                `linear-gradient(rgba(5,10,30,.6),rgba(5,10,30,.85)),
                url('${heroImages[currentSlide]}')`;

            hero.style.backgroundSize = "cover";
            hero.style.backgroundPosition = "center";

            hero.style.opacity = "1";

            currentSlide++;

            if (currentSlide >= heroImages.length) {
                currentSlide = 0;
            }

        }, 500);

    }

    changeHeroImage();

    setInterval(changeHeroImage, 6000);


    /* ==========================
       Active Navigation
    ========================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar nav a");

    function activateMenu() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", activateMenu);


    /* ==========================
       Scroll Progress Bar
    ========================== */

    const progress = document.createElement("div");

    progress.id = "progressBar";

    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {

        const scroll =
            document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const width = (scroll / height) * 100;

        progress.style.width = width + "%";

    });

});
/* ===================================================
   AETHERVERSE WEBSITE
   script.js - PART 2
   Featured Comics Carousel
=================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.querySelector(".cards");

    if (!carousel) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScroll;

    // Auto Scroll
    function startAutoScroll() {

        autoScroll = setInterval(() => {

            carousel.scrollBy({
                left: 260,
                behavior: "smooth"
            });

            if (
                carousel.scrollLeft + carousel.clientWidth >=
                carousel.scrollWidth - 5
            ) {

                carousel.scrollTo({
                    left: 0,
                    behavior: "smooth"
                });

            }

        }, 3500);

    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    startAutoScroll();

    // Pause while hovering
    carousel.addEventListener("mouseenter", stopAutoScroll);

    carousel.addEventListener("mouseleave", startAutoScroll);

    // ==========================
    // Mouse Drag
    // ==========================

    carousel.addEventListener("mousedown", (e) => {

        isDown = true;

        carousel.classList.add("dragging");

        startX = e.pageX - carousel.offsetLeft;

        scrollLeft = carousel.scrollLeft;

        stopAutoScroll();

    });

    carousel.addEventListener("mouseleave", () => {

        isDown = false;

        carousel.classList.remove("dragging");

        startAutoScroll();

    });

    carousel.addEventListener("mouseup", () => {

        isDown = false;

        carousel.classList.remove("dragging");

        startAutoScroll();

    });

    carousel.addEventListener("mousemove", (e) => {

        if (!isDown) return;

        e.preventDefault();

        const x = e.pageX - carousel.offsetLeft;

        const walk = (x - startX) * 2;

        carousel.scrollLeft = scrollLeft - walk;

    });

    // ==========================
    // Mouse Wheel Horizontal
    // ==========================

    carousel.addEventListener("wheel", (e) => {

        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {

            e.preventDefault();

            carousel.scrollLeft += e.deltaY;

        }

    }, { passive: false });

    // ==========================
    // Keyboard Controls
    // ==========================

    document.addEventListener("keydown", (e) => {

        if (e.key === "ArrowRight") {

            carousel.scrollBy({

                left: 300,

                behavior: "smooth"

            });

        }

        if (e.key === "ArrowLeft") {

            carousel.scrollBy({

                left: -300,

                behavior: "smooth"

            });

        }

    });

});
/* ===================================================
   AETHERVERSE WEBSITE
   script.js - PART 3
   Premium Effects
=================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       Scroll Reveal Animation
    ========================== */

    const revealElements = document.querySelectorAll(
        "section, .comic, .person, .phase"
    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {

        element.classList.add("hidden");

        revealObserver.observe(element);

    });


    /* ==========================
       Hero Parallax
    ========================== */

    const hero = document.querySelector(".hero");

    window.addEventListener("scroll", () => {

        if (!hero) return;

        const offset = window.scrollY;

        hero.style.backgroundPositionY = offset * 0.4 + "px";

    });


    /* ==========================
       Character Glow
    ========================== */

    document.querySelectorAll(".person").forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.boxShadow =
                "0 0 30px rgba(143,124,255,.7)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.boxShadow = "";

        });

    });


    /* ==========================
       Comic Card Tilt
    ========================== */

    document.querySelectorAll(".comic").forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateY = (x / rect.width - 0.5) * 16;

            const rotateX = (0.5 - y / rect.height) * 16;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.05)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* ==========================
       Back To Top Button
    ========================== */

    const topButton = document.createElement("button");

    topButton.id = "topButton";

    topButton.innerHTML = "⬆";

    document.body.appendChild(topButton);

    topButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topButton.classList.add("showTop");

        } else {

            topButton.classList.remove("showTop");

        }

    });


    /* ==========================
       Counter Animation
    ========================== */

    document.querySelectorAll(".counter").forEach(counter => {

        const target = +counter.dataset.target;

        let value = 0;

        const speed = target / 120;

        function updateCounter() {

            value += speed;

            if (value < target) {

                counter.innerText = Math.floor(value);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target;

            }

        }

        updateCounter();

    });


    /* ==========================
       Floating Stars
    ========================== */

    const stars = document.createElement("div");

    stars.className = "stars";

    document.body.appendChild(stars);

    for (let i = 0; i < 60; i++) {

        const star = document.createElement("span");

        star.style.left = Math.random() * 100 + "%";

        star.style.top = Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 6 + "s";

        stars.appendChild(star);

    }

});
/* ===================================================
   AETHERVERSE WEBSITE
   script.js - PART 4
   Advanced Interactive Features
=================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       Loading Screen
    ========================== */

    const loader = document.querySelector(".loader");

    if (loader) {

        window.addEventListener("load", () => {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

            }, 600);

        });

    }

    /* ==========================
       Search Comics
    ========================== */

    const search = document.querySelector("#comicSearch");

    if (search) {

        search.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            document.querySelectorAll(".comic").forEach(card => {

                const text =
                    card.innerText.toLowerCase();

                if (text.includes(value)) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }

    /* ==========================
       Lazy Loading Images
    ========================== */

    const images =
        document.querySelectorAll("img[data-src]");

    const imageObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const img = entry.target;

                    img.src = img.dataset.src;

                    img.removeAttribute("data-src");

                    imageObserver.unobserve(img);

                }

            });

        });

    images.forEach(img => {

        imageObserver.observe(img);

    });

    /* ==========================
       Keyboard Shortcuts
    ========================== */

    document.addEventListener("keydown", e => {

        if (e.key === "Home") {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

        if (e.key === "End") {

            window.scrollTo({

                top: document.body.scrollHeight,

                behavior: "smooth"

            });

        }

    });

    /* ==========================
       Reading Progress
    ========================== */

    const progress =
        document.createElement("div");

    progress.id = "readingProgress";

    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {

        const total =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const current =
            window.scrollY;

        progress.style.width =
            (current / total) * 100 + "%";

    });

    /* ==========================
       Comic Ripple Effect
    ========================== */

    document.querySelectorAll(".comic").forEach(card => {

        card.addEventListener("click", function (e) {

            const ripple =
                document.createElement("span");

            ripple.className = "ripple";

            const rect =
                this.getBoundingClientRect();

            ripple.style.left =
                (e.clientX - rect.left) + "px";

            ripple.style.top =
                (e.clientY - rect.top) + "px";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    /* ==========================
       Theme Switch
    ========================== */

    const themeButton =
        document.querySelector("#themeButton");

    if (themeButton) {

        themeButton.addEventListener("click", () => {

            document.body.classList.toggle("lightMode");

        });

    }

});
