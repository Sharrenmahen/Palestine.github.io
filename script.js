document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navList = document.querySelector("nav ul");

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            navList.classList.toggle("active");
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            if (this.getAttribute("href").startsWith("#")) {
                event.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                document.getElementById(targetId).scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // Highlight Active Page in Navbar
    let links = document.querySelectorAll("nav ul li a");
    links.forEach(link => {
        if (window.location.href.includes(link.getAttribute("href"))) {
            link.classList.add("active");
        }
    });

    // Image Lightbox with Animations & Navigation
    const images = document.querySelectorAll(".photo-box img");
    let imageList = [];
    let currentIndex = 0;

    images.forEach((img, index) => {
        imageList.push({ src: img.src, description: img.closest(".photo-box").querySelector("p").innerText });
        img.addEventListener("click", function () {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        let lightbox = document.createElement("div");
        lightbox.className = "lightbox";
        lightbox.innerHTML = `<div class="lightbox-content fade-in">
            <span class="close-btn">&times;</span>
            <img id="lightbox-img" src="" alt="Expanded Image">
            <p id="lightbox-desc"></p>
            <div class="nav-buttons">
                <button id="prev-btn">&#10094;</button>
                <button id="next-btn">&#10095;</button>
            </div>
        </div>`;

        document.body.appendChild(lightbox);
        updateLightbox();

        document.querySelector(".close-btn").addEventListener("click", function () {
            closeLightbox();
        });

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.getElementById("prev-btn").addEventListener("click", function () {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : imageList.length - 1;
            updateLightbox();
        });

        document.getElementById("next-btn").addEventListener("click", function () {
            currentIndex = (currentIndex < imageList.length - 1) ? currentIndex + 1 : 0;
            updateLightbox();
        });

        document.addEventListener("keydown", handleKeyPress);
    }

    function updateLightbox() {
        const lightboxImg = document.getElementById("lightbox-img");
        const lightboxDesc = document.getElementById("lightbox-desc");
        lightboxImg.src = imageList[currentIndex].src;
        lightboxDesc.innerText = imageList[currentIndex].description;
    }

    function handleKeyPress(event) {
        if (event.key === "Escape") {
            closeLightbox();
        } else if (event.key === "ArrowLeft") {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : imageList.length - 1;
            updateLightbox();
        } else if (event.key === "ArrowRight") {
            currentIndex = (currentIndex < imageList.length - 1) ? currentIndex + 1 : 0;
            updateLightbox();
        }
    }

    function closeLightbox() {
        const lightbox = document.querySelector(".lightbox");
        if (lightbox) {
            lightbox.classList.add("fade-out");
            setTimeout(() => lightbox.remove(), 300);
        }
        document.removeEventListener("keydown", handleKeyPress);
    }

    // Scroll Animations on Sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll(".about, .opposition, .vision-history-container").forEach(section => {
        observer.observe(section);
    });
});
