tailwind.config = {
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        purple: {
          50: "#faf5ff",
          500: "#8b5cf6",
        },
        green: {
          50: "#f0fdf4",
          500: "#22c55e",
        },
        orange: {
          50: "#fff7ed",
          500: "#f97316",
        },
      },
    },
  },
};

// portfolio_app/templates/portfolio_app/static/portfolio_app/js/main.js

document.addEventListener("DOMContentLoaded", function () {
  console.log("Portfolio loaded");

  // Skill badges animation on hover
  const skillBadges = document.querySelectorAll(".skill-badge");
  skillBadges.forEach((badge) => {
    badge.addEventListener("mouseenter", () => {
      badge.style.transform = "translateY(-3px)";
    });

    badge.addEventListener("mouseleave", () => {
      badge.style.transform = "translateY(0)";
    });
  });

  // Contact form validation
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const email = this.querySelector("#email").value;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        e.preventDefault();
        alert("Please enter a valid email address.");
        return false;
      }

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      return true;
    });
  }

  // Dark mode toggle (optional feature)
  const darkModeToggle = document.createElement("button");
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  darkModeToggle.className =
    "fixed bottom-4 right-4 z-50 w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-900 transition-colors";
  darkModeToggle.title = "Toggle Dark Mode";

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark-mode")
    );

    const icon = darkModeToggle.querySelector("i");
    if (document.body.classList.contains("dark-mode")) {
      icon.className = "fas fa-sun";
      darkModeToggle.title = "Switch to Light Mode";
    } else {
      icon.className = "fas fa-moon";
      darkModeToggle.title = "Switch to Dark Mode";
    }
  });

  // Check for saved dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  document.body.appendChild(darkModeToggle);

  // Dark mode styles
  const darkModeStyles = document.createElement("style");
  darkModeStyles.textContent = `
        .dark-mode {
            background-color: #1a202c;
            color: #e2e8f0;
        }
        
        .dark-mode nav {
            background-color: #2d3748;
            border-color: #4a5568;
        }
        
        .dark-mode .bg-white {
            background-color: #2d3748;
        }
        
        .dark-mode .text-gray-900 {
            color: #e2e8f0;
        }
        
        .dark-mode .text-gray-700 {
            color: #cbd5e0;
        }
        
        .dark-mode .text-gray-600 {
            color: #a0aec0;
        }
        
        .dark-mode .border-gray-200 {
            border-color: #4a5568;
        }
        
        .dark-mode .bg-gray-50 {
            background-color: #1a202c;
        }
        
        .dark-mode .shadow-lg {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        }
    `;

  document.head.appendChild(darkModeStyles);
});
