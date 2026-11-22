
/* =========================================
   RAGHU WORKS
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ---------- ELEMENTS ----------

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll("#navLinks a");

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    const footerYear = document.getElementById("year");


    // ---------- MOBILE NAVIGATION ----------

    function openMenu() {
        if (!menuToggle || !navLinks) return;

        menuToggle.classList.add("is-open");
        navLinks.classList.add("is-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
    }

    function closeMenu() {
        if (!menuToggle || !navLinks) return;

        menuToggle.classList.remove("is-open");
        navLinks.classList.remove("is-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = menuToggle.classList.contains("is-open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });

        // Close menu after selecting a navigation link.

        navItems.forEach((link) => {

            link.addEventListener("click", closeMenu);

        });

        // Close menu when clicking outside it.

        document.addEventListener("click", (event) => {

            const clickedMenu = navLinks.contains(event.target);
            const clickedButton = menuToggle.contains(event.target);

            if (!clickedMenu && !clickedButton) {
                closeMenu();
            }

        });

        // Close menu with Escape key.

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        // Close menu when switching to desktop layout.

        window.addEventListener("resize", () => {

            if (window.innerWidth > 800) {
                closeMenu();
            }

        });

    }


    // ---------- HEADER SCROLL EFFECT ----------

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader, { passive: true });

    updateHeader();


    // ---------- SCROLL REVEAL ANIMATION ----------

    const revealElements = document.querySelectorAll(
        ".hero-copy, .hero-art, " +
        ".section-heading, " +
        ".service-card, " +
        ".project-card, " +
        ".about-title, .about-copy, " +
        ".process-item, " +
        ".contact-intro, .contact-form"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    // ---------- FOOTER YEAR ----------

    if (footerYear) {

        footerYear.textContent = new Date().getFullYear();

    }


    // ---------- CONTACT FORM ----------

    if (contactForm) {

        contactForm.addEventListener("submit", async (event) => {

            event.preventDefault();

            // Check required fields.

            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                return;

            }

            const submitButton = contactForm.querySelector(
                'button[type="submit"]'
            );

            const originalButtonHTML = submitButton
                ? submitButton.innerHTML
                : "";

            // Disable button while sending.

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent = "Sending...";

            }

            if (formMessage) {

                formMessage.textContent = "";

            }

            try {

                const response = await fetch(contactForm.action, {

                    method: "POST",

                    body: new FormData(contactForm),

                    headers: {
                        Accept: "application/json"
                    }

                });

                if (!response.ok) {

                    const result = await response.json().catch(() => null);

                    const errorText = result?.errors
                        ?.map((error) => error.message)
                        .join(", ");

                    throw new Error(
                        errorText || "Unable to send your enquiry. Please try again."
                    );

                }

                // Success.

                if (formMessage) {

                    formMessage.textContent =
                        "Thank you! Your enquiry has been sent successfully.";

                }

                contactForm.reset();

            } catch (error) {

                // Error.

                if (formMessage) {

                    formMessage.textContent =
                        error.message ||
                        "Something went wrong. Please try again.";

                }

            } finally {

                // Restore button.

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.innerHTML = originalButtonHTML;

                }

            }

        });

    }

});
