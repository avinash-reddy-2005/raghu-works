
document.addEventListener("DOMContentLoaded", () => {
    // Mobile navigation
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector("#navLinks");
    const navItems = document.querySelectorAll("#navLinks a");

    if (menuToggle && navLinks) {
        function closeMenu() {
            menuToggle.classList.remove("is-open");
            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }

        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.classList.toggle("is-open");

            navLinks.classList.toggle("is-open", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        navItems.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", (event) => {
            if (
                !menuToggle.contains(event.target) &&
                !navLinks.contains(event.target)
            ) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }

    // Section reveal animations
    const revealElements = document.querySelectorAll(
        ".section-heading, .section-top, .service-card, .project-card, .about-content, .process-item, .contact-content, .contact-form"
    );

    revealElements.forEach((element) => {
        element.classList.remove("reveal");
        element.classList.add("is-visible");
    });

    // Automatic footer year
    const yearElement = document.querySelector("#year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Contact form submission
    const contactForm = document.querySelector("#contactForm");
    const formMessage = document.querySelector("#formMessage");

    if (contactForm && formMessage) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const submitButton = contactForm.querySelector(
                'button[type="submit"]'
            );

            const originalButtonText = submitButton
                ? submitButton.innerHTML
                : "";

            formMessage.textContent = "Sending your enquiry...";
            formMessage.classList.add("is-visible");

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Sending...";
            }

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        Accept: "application/json"
                    }
                });

                if (response.ok) {
                    formMessage.textContent =
                        "Thank you! Your enquiry has been sent successfully. I will get back to you soon.";

                    contactForm.reset();
                } else {
                    const result = await response.json();

                    const errorMessage = result.errors
                        ? result.errors.map((error) => error.message).join(", ")
                        : "Something went wrong. Please try again.";

                    formMessage.textContent = errorMessage;
                }
            } catch (error) {
                formMessage.textContent =
                    "Unable to send your enquiry. Please check your internet connection and try again.";
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }
            }
        });
    }
});
