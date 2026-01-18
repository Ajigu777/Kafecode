document.addEventListener("DOMContentLoaded", function() {

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
  });

  // Smooth Scroll for Internal Links
  const smoothLinks = document.querySelectorAll('a[href*="#"]');
  smoothLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('flex');
        }
      }
    });
  });

  // Navbar Scroll Effect: Change color & lift on scroll
  const navbar = document.getElementById('navbar');
  const navLinksContainer = document.getElementById('nav-links-container');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-white/90', 'dark:bg-black/70', 'shadow-xl', 'backdrop-blur-md');
      navLinksContainer.classList.add('bg-white/20', 'dark:bg-black/30');
    } else {
      navbar.classList.remove('bg-white/90', 'dark:bg-black/70', 'shadow-xl', 'backdrop-blur-md');
      navLinksContainer.classList.remove('bg-white/20', 'dark:bg-black/30');
    }
  });

});

// --- Skills toggle ---
const skillToggles = document.querySelectorAll('input[name="skill-toggle"]');
skillToggles.forEach(toggle => {
  toggle.addEventListener('change', () => {
    const target = toggle.dataset.target;
    document.querySelectorAll('.skill-card').forEach(card => {
      card.classList.toggle('hidden', !card.classList.contains(target));
    });
  });
});

// --- Scroll-trigger animations ---
const scrollElements = document.querySelectorAll('.scroll-animate, .scroll-scale');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

scrollElements.forEach(el => observer.observe(el));

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.skill-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Highlight selected button
      buttons.forEach(b => b.classList.remove('bg-primary', 'text-black'));
      btn.classList.add('bg-primary', 'text-black');

      // Filter cards
      cards.forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Enable tap for mobile overlays
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const overlay = card.querySelector('.overlay');
      overlay.classList.toggle('opacity-100');
    });
  });
});

// --- Project filtering ---
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    // Update button styles
    filterButtons.forEach(btn => {
      btn.classList.remove('bg-primary', 'text-white');
      btn.classList.add('bg-gray-200', 'dark:bg-[#3a3227]', 'text-gray-800', 'dark:text-white');
    });

    button.classList.add('bg-primary', 'text-white');
    button.classList.remove('bg-gray-200', 'dark:bg-[#3a3227]', 'text-gray-800', 'dark:text-white');

    // Filter projects
    projectCards.forEach(card => {
      if (filter === 'all' || card.classList.contains(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("#contact-form form");

  if (!contactForm) return;

  let lastSubmitTime = 0;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const now = Date.now();

    //  Spam protection (10 seconds cooldown)
    if (now - lastSubmitTime < 10000) {
      alert("Please wait a few seconds before sending another message 🙏");
      return;
    }

    lastSubmitTime = now;

    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    //  Auto greeting based on time
    const hour = new Date().getHours();
    let greeting = "Hello";

    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";
    else greeting = "Good evening";

    const whatsappNumber = "2349158929452"; // Your WhatsApp number

    const courtesyMessage =
`${greeting} Kafewo 👋,

My name is ${name}.
Email: ${email}

Message:
${message}

Looking forward to your response.
Thank you.`;

    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(courtesyMessage);

    //  Success animation (button feedback)
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    submitButton.innerHTML = " Message Ready";
    submitButton.classList.add("scale-110");
    submitButton.disabled = true;

    setTimeout(() => {
      submitButton.innerHTML = originalText;
      submitButton.classList.remove("scale-110");
      submitButton.disabled = false;
      contactForm.reset();
      window.open(whatsappURL, "_blank");
    }, 900);
  });
});