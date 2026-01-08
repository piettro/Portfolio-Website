// Mobile Menu Toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuButton) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    const icon = mobileMenuButton.querySelector("i");
    if (mobileMenu.classList.contains("hidden")) {
      icon.className = "fas fa-bars text-xl";
    } else {
      icon.className = "fas fa-times text-xl";
    }
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenuButton.querySelector("i").className = "fas fa-bars text-xl";
  });
});

// Scroll Spy Navigation
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

function updateActiveNavLink() {
  let current = "";
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("section-active", "text-blue-600");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-blue-600");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);
updateActiveNavLink(); // Initial check

// Download Resume Function
function downloadResume() {
  // Simulate download
  alert(
    "Resume download would start here. In production, link to actual PDF file."
  );
  // window.open('/static/resume.pdf', '_blank');
}

// Form Submission Feedback
const contactForm = document.querySelector("form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    // You can add form validation here
    const inputs = this.querySelectorAll("input[required], textarea[required]");
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add("border-red-500");
      } else {
        input.classList.remove("border-red-500");
      }
    });

    if (!isValid) {
      e.preventDefault();
      alert("Please fill in all required fields.");
    }
  });
}

// Add animation classes on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});
