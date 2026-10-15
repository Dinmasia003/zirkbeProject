
// ========================================
// MOBILE NAVIGATION MENU
// ========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");
const menuIcon = menuToggle.querySelector("i");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    const menuIsOpen = navMenu.classList.contains("active");

    if (menuIsOpen) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");

        menuToggle.setAttribute("aria-label", "Close navigation");
    } else {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

        menuToggle.setAttribute("aria-label", "Open navigation");
    }
});
// ========================================
// THEME TOGGLE
// ========================================

const themeToggle = document.getElementById("themeToggle");

// Check if the user has previously selected a theme
const savedTheme = localStorage.getItem("theme");

// Apply saved theme
if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");

    themeToggle.setAttribute("aria-label", "Switch to light mode");
} else {
    document.documentElement.removeAttribute("data-theme");

    themeToggle.setAttribute("aria-label", "Switch to dark mode");
}


// Toggle theme
themeToggle.addEventListener("click", () => {

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    if (isDark) {

        // Switch to light
        document.documentElement.removeAttribute("data-theme");

        localStorage.setItem("theme", "light");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    } else {

        // Switch to dark
        document.documentElement.setAttribute("data-theme", "dark");

        localStorage.setItem("theme", "dark");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );
    }

});



// ========================================
// HERO IMAGE SLIDESHOW
// ========================================

const heroSlides = document.querySelectorAll(".hero-slide");

const heroImages = [
    "images/image1.jpg",
    "images/image2.jpg",
    "images/image3.jpg",
    "images/image4.jpg"
];

let currentHeroImage = 0;
let activeSlide = 0;


// Preload all images
heroImages.forEach((src) => {
    const img = new Image();
    img.src = src;
});


function changeHeroImage() {

    const nextImage =
        (currentHeroImage + 1) % heroImages.length;

    const nextSlide =
        activeSlide === 0 ? 1 : 0;


    // Put the next image into the hidden slide
    heroSlides[nextSlide].src = heroImages[nextImage];


    // Fade the new image in
    heroSlides[nextSlide].classList.add("active");


    // Fade the current image out
    heroSlides[activeSlide].classList.remove("active");


    // Update indexes
    activeSlide = nextSlide;
    currentHeroImage = nextImage;
}


// Change image every 10 seconds
setInterval(changeHeroImage, 10000);



/* =========================================
   ABOUT STATS COUNTER
========================================= */

const statNumbers = document.querySelectorAll(".stat-number");

const statsObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const stat = entry.target;

            const target = Number(stat.dataset.target);
            const suffix = stat.dataset.suffix || "";

            let current = 0;

            const duration = 1500;
            const increment = target / (duration / 16);

            const updateCounter = () => {

                current += increment;

                if (current >= target) {

                    stat.textContent = target + suffix;

                    return;

                }

                stat.textContent = Math.floor(current) + suffix;

                requestAnimationFrame(updateCounter);

            };

            updateCounter();

            observer.unobserve(stat);
        }

    });

}, {
    threshold: 0.5
});


statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});


/* =========================================
   PROJECT FILTER
========================================= */

const projectFilters = document.querySelectorAll(".project-filter");
const projectCards = document.querySelectorAll(".project-card");

projectFilters.forEach(filter => {

    filter.addEventListener("click", () => {

        /* Remove active state from all filters */
        projectFilters.forEach(button => {
            button.classList.remove("active");
        });

        /* Add active state to clicked filter */
        filter.classList.add("active");

        /* Get selected category */
        const selectedFilter = filter.dataset.filter;

        /* Show / hide projects */
        projectCards.forEach(card => {

            const projectCategory = card.dataset.category;

            if (
                selectedFilter === "all" ||
                projectCategory === selectedFilter
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});

/* =========================================
   PROJECT VIEWER
========================================= */

const projectViewer = document.getElementById("projectViewer");
const projectViewerClose = document.getElementById("projectViewerClose");
const projectViewerPrev = document.getElementById("projectViewerPrev");
const projectViewerNext = document.getElementById("projectViewerNext");

const projectViewerImage = document.getElementById("projectViewerImage");
const projectViewerCategory = document.getElementById("projectViewerCategory");
const projectViewerLocation = document.getElementById("projectViewerLocation");
const projectViewerYear = document.getElementById("projectViewerYear");
const projectViewerTitle = document.getElementById("projectViewerTitle");
const projectViewerDescription = document.getElementById("projectViewerDescription");

const projectsBtn = document.querySelector(".projects-btn");

let currentProject = 0;


/* =========================================
   GET PROJECT INFORMATION
========================================= */

function showProject(index) {

    const project = projectCards[index];

    if (!project) return;

    const image = project.querySelector(".project-image img");
    const category = project.querySelector(".project-category");
    const location = project.querySelector(".project-location");
    const year = project.querySelector(".project-year");
    const title = project.querySelector("h3");
    const description = project.querySelector("p");


    /* Update viewer */

    projectViewerImage.src = image.src;
    projectViewerImage.alt = image.alt;

    projectViewerCategory.textContent = category.textContent.trim();

    projectViewerLocation.textContent = location.textContent.trim();

    projectViewerYear.textContent = year.textContent.trim();

    projectViewerTitle.textContent = title.textContent.trim();

    projectViewerDescription.textContent = description.textContent.trim();
}


/* =========================================
   OPEN PROJECT VIEWER
========================================= */

projectsBtn.addEventListener("click", (event) => {

    event.preventDefault();

    currentProject = 0;

    showProject(currentProject);

    projectViewer.classList.add("active");

    document.body.classList.add("project-viewer-open");

});


/* =========================================
   CLOSE PROJECT VIEWER
========================================= */

function closeProjectViewer() {

    projectViewer.classList.remove("active");

    document.body.classList.remove("project-viewer-open");

}


projectViewerClose.addEventListener("click", closeProjectViewer);


/* =========================================
   CLOSE WHEN CLICKING OUTSIDE
========================================= */

projectViewer.addEventListener("click", (event) => {

    if (event.target === projectViewer) {

        closeProjectViewer();

    }

});


/* =========================================
   NEXT PROJECT
========================================= */

projectViewerNext.addEventListener("click", () => {

    currentProject++;

    if (currentProject >= projectCards.length) {

        currentProject = 0;

    }

    showProject(currentProject);

});


/* =========================================
   PREVIOUS PROJECT
========================================= */

projectViewerPrev.addEventListener("click", () => {

    currentProject--;

    if (currentProject < 0) {

        currentProject = projectCards.length - 1;

    }

    showProject(currentProject);

});


/* =========================================
   KEYBOARD NAVIGATION
========================================= */

document.addEventListener("keydown", (event) => {

    if (!projectViewer.classList.contains("active")) return;


    /* Escape = close */

    if (event.key === "Escape") {

        closeProjectViewer();

    }


    /* Right arrow = next */

    if (event.key === "ArrowRight") {

        projectViewerNext.click();

    }


    /* Left arrow = previous */

    if (event.key === "ArrowLeft") {

        projectViewerPrev.click();

    }

});









const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}



/* =====================================
   GET A QUOTE MODAL
===================================== */

document.addEventListener("DOMContentLoaded", () => {
    const quoteButtons = document.querySelectorAll(".open-quote-modal");
    const contactFormWrapper = document.querySelector(".contact-form-wrapper");
    const contactFormHeading = contactFormWrapper
    ? contactFormWrapper.querySelector("h3")
    : null;

    const originalHeading = contactFormHeading
    ? contactFormHeading.textContent
    : "";

    // Stop if the form or buttons cannot be found
    if (!contactFormWrapper || quoteButtons.length === 0) {
        return;
    }

    // Create the background overlay
    const modalBackdrop = document.createElement("div");
    modalBackdrop.className = "quote-modal-backdrop";
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(modalBackdrop);

    // Create the close button
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "quote-modal-close";
    closeButton.innerHTML = "&times;";
    closeButton.setAttribute("aria-label", "Close quote form");
    closeButton.setAttribute("title", "Close");

    // Add the close button to the existing form wrapper
    contactFormWrapper.prepend(closeButton);

    // Open the modal
    function openQuoteModal() {
        contactFormWrapper.classList.add("quote-modal-active");
        modalBackdrop.classList.add("active");
        document.body.classList.add("quote-modal-open");

        if (contactFormHeading) {
        contactFormHeading.textContent = "Request a Quote";
        }

        modalBackdrop.setAttribute("aria-hidden", "false");
        closeButton.focus();
    }

    // Close the modal
    function closeQuoteModal() {
        contactFormWrapper.classList.remove("quote-modal-active");
        modalBackdrop.classList.remove("active");
        document.body.classList.remove("quote-modal-open");

        if (contactFormHeading) {
        contactFormHeading.textContent = originalHeading;
        }

        modalBackdrop.setAttribute("aria-hidden", "true");
    }

    // Open from either Get a Quote button
    quoteButtons.forEach(button => {
        button.addEventListener("click", openQuoteModal);
    });

    // Close with the X button
    closeButton.addEventListener("click", closeQuoteModal);

    // Close when clicking the dark background
    modalBackdrop.addEventListener("click", closeQuoteModal);

    // Close with the Escape key
    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            contactFormWrapper.classList.contains("quote-modal-active")
        ) {
            closeQuoteModal();
        }
    });
});



// ========================================
// WEB3FORMS CONTACT FORM SUBMISSION
// ========================================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonText = submitButton.textContent;

        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        formStatus.textContent = "Sending your message...";
        formStatus.classList.remove("success", "error");

        try {
            const formData = new FormData(contactForm);

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            if (response.ok && result.success) {
                formStatus.textContent =
                    "Thank you! Your message has been sent successfully.";

                formStatus.classList.add("success");
                contactForm.reset();
            } else {
                throw new Error(
                    result.message || "Unable to send your message."
                );
            }

        } catch (error) {
            console.error("Web3Forms submission error:", error);

            formStatus.textContent =
                "Sorry, your message could not be sent. Please try again.";

            formStatus.classList.add("error");

        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}



/* ========================================
   SCROLL REVEAL ANIMATIONS
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(
    ".about-content, .about-image, " +
    ".story-image, .story-content, " +
    ".mission-card, .vision-card, " +
    ".services-header, .service-card, .services-footer, " +
    ".projects-heading, .project-filters, .project-card, .projects-action, " +
    ".values-heading, .value-card, " +
    ".testimonials-header, .testimonial-card, .testimonials-footer, " +
    ".contact-header, .contact-info, .contact-form-wrapper"
    );

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});

/* ACTIVE NAVIGATION LINK ON SCROLL */
const navLinks = document.querySelectorAll(".nav-menu .links");
const pageSections = document.querySelectorAll(
    "#home, #about, #services, #projects, #contact"
);

function updateActiveNavLink() {
    let currentSection = "home";

    pageSections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);