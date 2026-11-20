
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

  // Contact form validation
  const contactForm = document.querySelector("#contactForm");
  const formMessage = document.querySelector("#formMessage");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      formMessage.textContent =
        "Your details passed browser validation. This demo form is not connected to an email or submission service.";

      formMessage.classList.add("is-visible");
    });
  }
});
