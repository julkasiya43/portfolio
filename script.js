// Home page
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(sec => {

    // ❌ Don't hide hero
    if (sec.classList.contains("hero")) return;

    sec.style.opacity = "0";
    sec.style.transform = "translateY(50px)";
    sec.style.transition = "all 0.8s ease";

    observer.observe(sec);
  });
});

// about page 
const typingElement = document.querySelector(".typing");

if (typingElement) {
  const texts = [
    "Frontend Developer",
    "UI Designer",
    "Creative Thinker"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 1200); // pause after typing
        return;
      }
    } else {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    setTimeout(type, isDeleting ? 40 : 70);
  }

  type();
}

// Project page 
const projectCards = document.querySelectorAll('.project-card');

if (projectCards.length > 0) {
  const projectObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  projectCards.forEach(p => {
    p.style.opacity = "0";
    p.style.transform = "translateY(40px)";
    p.style.transition = "0.6s";
    projectObserver.observe(p);
  });
}

// Skill page
const cards = document.querySelectorAll('.skill-card');

function animateCard(card) {
  const progress = card.querySelector('.progress');
  const percentText = card.querySelector('.percent');
  const value = card.getAttribute('data-percent');

  let count = 0;

  const interval = setInterval(() => {
    if (count >= value) {
      clearInterval(interval);
    } else {
      count++;
      percentText.innerText = count + "%";
      progress.style.width = count + "%";
    }
  }, 15);
}

cards.forEach(card => {
  animateCard(card);
});

/* Scroll Reveal */
// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('show');
//       animateCard(entry.target);
//     }
//   });
// }, { threshold: 0.3 });

// cards.forEach(card => observer.observe(card));

// // Contact page 
// const cards = document.querySelectorAll('.contact-card');

// cards.forEach((card, i) => {
//   card.style.opacity = 0;
//   card.style.transform = "translateX(-30px)";
//   card.style.transition = "0.5s";

//   setTimeout(() => {
//     card.style.opacity = 1;
//     card.style.transform = "translateX(0)";
//   }, i * 150);
// });


// --- NEW FEATURES ---

// 1. Active Page Highlight
document.addEventListener("DOMContentLoaded", () => {
  const currentPagePath = window.location.pathname;
  let currentPage = currentPagePath.split("/").pop();
  
  // Default to index.html if we are at the root
  if (currentPage === "" || currentPage === "/" || !currentPage.endsWith('.html')) {
    currentPage = "index.html";
  }

  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    const linkHref = link.getAttribute("href");
    if (linkHref === currentPage) {
      link.classList.add("active");
    }
  });
});


// 3. 3D Tilt Effect using Vanilla-Tilt
const tiltScript = document.createElement("script");
tiltScript.src = "https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js";
tiltScript.onload = () => {
  // Apply to all card types
  VanillaTilt.init(document.querySelectorAll(".card, .skill-card, .project-card, .contact-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
  });
};
document.body.appendChild(tiltScript);

