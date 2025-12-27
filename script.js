// Dark mode toggle function - defined first for immediate availability
function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  
  // Update icon
  const icons = document.querySelectorAll(".theme-icon");
  icons.forEach(icon => {
    if (icon) {
      icon.textContent = newTheme === "dark" ? "☀️" : "🌙";
    }
  });
}

// Make toggleDarkMode available globally immediately
window.toggleDarkMode = toggleDarkMode;

// Hamburger menu toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Dark mode toggle
function initTheme() {
  // Set initial theme from localStorage or default to light
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  // Get theme toggle buttons
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");

  // Toggle theme function
  const toggleTheme = (e) => {
    if (e) e.preventDefault();
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  };

  // Attach event listeners
  if (themeToggle) {
    themeToggle.removeEventListener("click", toggleTheme); // Remove if exists to prevent duplicates
    themeToggle.addEventListener("click", toggleTheme);
  }
  if (themeToggleMobile) {
    themeToggleMobile.removeEventListener("click", toggleTheme); // Remove if exists to prevent duplicates
    themeToggleMobile.addEventListener("click", toggleTheme);
  }
}

function updateThemeIcon(theme) {
  const icons = document.querySelectorAll(".theme-icon");
  icons.forEach(icon => {
    if (icon) {
      icon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  });
}

// Project filtering
function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach(card => {
        if (filterValue === "all") {
          card.classList.remove("hidden");
        } else {
          const categories = card.getAttribute("data-category").split(" ");
          if (categories.includes(filterValue)) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        }
      });
    });
  });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

// Scroll to section function for arrow navigation
function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

// Initialize all functions when DOM is loaded
function initializePortfolio() {
  try {
    initTheme();
    initProjectFilter();
    initSmoothScroll();
  } catch (error) {
    console.error("Error initializing portfolio:", error);
  }
}

// Make scrollToSection available globally
window.scrollToSection = scrollToSection;

// Initialize based on document ready state
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
  // DOM is already loaded
  initializePortfolio();
}
