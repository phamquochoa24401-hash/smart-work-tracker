// ===== Navigation & Scroll Behavior =====
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");
  const scrollToTopBtn = document.getElementById("scrollToTop");

  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Show/hide scroll to top button
    if (currentScroll > 500) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }

    lastScroll = currentScroll;
  });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Mobile menu toggle
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Active navigation link on scroll
  const sections = document.querySelectorAll("section[id]");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -80% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });
});

// ===== Copy Code Functionality =====
document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const code = button.getAttribute("data-code");

      try {
        await navigator.clipboard.writeText(code);

        // Visual feedback
        const originalHTML = button.innerHTML;
        button.classList.add("copied");
        button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;

        setTimeout(() => {
          button.classList.remove("copied");
          button.innerHTML = originalHTML;
        }, 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    });
  });
});

// ===== FAQ Accordion =====
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove("active");
      } else {
        item.classList.add("active");
      }
    });
  });
});

// ===== API Documentation Navigation =====
document.addEventListener("DOMContentLoaded", () => {
  const apiNavItems = document.querySelectorAll(".api-nav-item");
  const apiSections = document.querySelectorAll(".api-section-content");

  // Intersection Observer for API sections
  const apiObserverOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  };

  const apiObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        apiNavItems.forEach((item) => {
          item.classList.remove("active");
          if (item.getAttribute("href") === `#${id}`) {
            item.classList.add("active");
          }
        });
      }
    });
  }, apiObserverOptions);

  apiSections.forEach((section) => {
    apiObserver.observe(section);
  });
});

// ===== Animate on Scroll =====
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".feature-card, .step-card, .usage-card"
  );

  const animateObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 100);
          animateObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  animateElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    animateObserver.observe(element);
  });
});

// ===== Gradient Orb Mouse Follow Effect =====
document.addEventListener("DOMContentLoaded", () => {
  const orb3 = document.querySelector(".orb-3");

  if (orb3) {
    let mouseX = 0;
    let mouseY = 0;
    let orbX = 0;
    let orbY = 0;
    const speed = 0.05;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      const distX = mouseX - orbX;
      const distY = mouseY - orbY;

      orbX += distX * speed;
      orbY += distY * speed;

      orb3.style.left = `${orbX}px`;
      orb3.style.top = `${orbY}px`;

      requestAnimationFrame(animate);
    }

    animate();
  }
});

// ===== Code Block Syntax Highlighting (Simple) =====
// Disabled to prevent HTML tags from appearing in code blocks
// If you want syntax highlighting, consider using a library like Prism.js or highlight.js
/*
document.addEventListener("DOMContentLoaded", () => {
  const codeBlocks = document.querySelectorAll(".code-block code");

  codeBlocks.forEach((block) => {
    let html = block.innerHTML;

    // Simple syntax highlighting for bash
    html = html.replace(
      /(npm|cd|electron|git|node)/g,
      '<span style="color: #f59e0b;">$1</span>'
    );
    html = html.replace(
      /(install|start|dev|package|clone)/g,
      '<span style="color: #10b981;">$1</span>'
    );

    // Highlight strings
    html = html.replace(
      /(['"])(.*?)\1/g,
      '<span style="color: #ec4899;">$1$2$1</span>'
    );

    // Highlight comments
    html = html.replace(
      /(\/\/.*$|#.*$)/gm,
      '<span style="color: #64748b;">$1</span>'
    );

    // Highlight keys in JSON
    html = html.replace(
      /("[\w_]+")\s*:/g,
      '<span style="color: #8b5cf6;">$1</span>:'
    );

    // Highlight numbers
    html = html.replace(
      /\b(\d+)\b/g,
      '<span style="color: #3b82f6;">$1</span>'
    );

    block.innerHTML = html;
  });
});
*/

// ===== Performance Optimization: Lazy Load Images =====
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// ===== Easter Egg: Konami Code =====
document.addEventListener("DOMContentLoaded", () => {
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let konamiIndex = 0;

  document.addEventListener("keydown", (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activateEasterEgg() {
    // Add rainbow animation to gradient text
    const gradientTexts = document.querySelectorAll(".gradient-text");
    gradientTexts.forEach((text) => {
      text.style.animation = "rainbow 2s linear infinite";
    });

    // Add CSS animation
    if (!document.getElementById("easter-egg-style")) {
      const style = document.createElement("style");
      style.id = "easter-egg-style";
      style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
      document.head.appendChild(style);
    }

    // Show notification
    const notification = document.createElement("div");
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            font-weight: 600;
            animation: slideDown 0.5s ease-out;
        `;
    notification.textContent = "🎉 Konami Code Activated! Rainbow Mode ON!";
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideUp 0.5s ease-out";
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }
});

// ===== Search Functionality (Optional Enhancement) =====
document.addEventListener("DOMContentLoaded", () => {
  // Add keyboard shortcut for search (Ctrl/Cmd + K)
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      // You can implement a search modal here
      console.log("Search shortcut triggered");
    }
  });
});

// ===== Print Styles Handler =====
window.addEventListener("beforeprint", () => {
  // Expand all FAQ items for printing
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.add("active");
  });
});

window.addEventListener("afterprint", () => {
  // Collapse FAQ items after printing
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active");
  });
});

// ===== Analytics Event Tracking (Placeholder) =====
function trackEvent(category, action, label) {
  // Placeholder for analytics tracking
  console.log("Event tracked:", { category, action, label });

  // Example: Google Analytics
  // if (typeof gtag !== 'undefined') {
  //     gtag('event', action, {
  //         'event_category': category,
  //         'event_label': label
  //     });
  // }
}

// Track button clicks
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const label = e.target.textContent.trim();
      trackEvent("Button", "Click", label);
    });
  });

  // Track external links
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const url = e.target.href;
      trackEvent("External Link", "Click", url);
    });
  });
});

// ===== Service Worker Registration (for PWA support) =====
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered:', registration))
    //     .catch(error => console.log('SW registration failed:', error));
  });
}

// ===== Dark Mode Toggle (Future Enhancement) =====
// Placeholder for dark mode toggle functionality
function toggleDarkMode() {
  document.body.classList.toggle("light-mode");
  const isDark = !document.body.classList.contains("light-mode");
  localStorage.setItem("darkMode", isDark);
}

// Load dark mode preference
document.addEventListener("DOMContentLoaded", () => {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "false") {
    document.body.classList.add("light-mode");
  }
});

console.log(
  "%c🚀 Smart Work Tracker Documentation",
  "font-size: 20px; font-weight: bold; color: #6366f1;"
);
console.log(
  "%cBuilt with ❤️ for developers",
  "font-size: 14px; color: #94a3b8;"
);
