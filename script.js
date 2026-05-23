const body = document.body;
const loader = document.getElementById("loader");
const loaderVideo = document.getElementById("loaderVideo");
const menuOverlay = document.getElementById("menuOverlay");
const menuPanel = document.getElementById("menuPanel");
const menuButton = document.getElementById("menuButton");
const menuClose = document.getElementById("menuClose");
const menuLinks = document.querySelectorAll(".menu-link");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const previewMedia = document.querySelectorAll(".portfolio-preview__media");
const isDesktop = window.matchMedia("(min-width: 768px)");
const rippleCards = document.querySelectorAll(".showcase-card--ripple");

if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

const splitLines = (selector) => {
  document.querySelectorAll(selector).forEach((element) => {
    if (element.dataset.splitReady === "true") return;

    const lines = Array.from(element.childNodes)
      .filter((node) => node.nodeType === Node.ELEMENT_NODE || node.textContent.trim())
      .map((node) => {
        const text = node.textContent.trim();
        if (!text) return "";
        return `<span class="split-line"><span class="split-word">${text}</span></span>`;
      })
      .join("");

    if (lines) {
      element.innerHTML = lines;
      element.dataset.splitReady = "true";
    }
  });
};

const animateLoaderOut = () => {
  if (!loader || loader.dataset.done === "true") return;

  loader.dataset.done = "true";

  if (!window.gsap) {
    loader.style.display = "none";
    return;
  }

  gsap.to(loader, {
    yPercent: -100,
    duration: 1.2,
    ease: "power4.inOut",
    onComplete: () => {
      loader.style.display = "none";
    },
  });
};

const initLoader = () => {
  if (window.innerWidth < 768) {
    animateLoaderOut();
    return;
  }

  const fallback = setTimeout(animateLoaderOut, 2600);

  loaderVideo?.addEventListener(
    "ended",
    () => {
      clearTimeout(fallback);
      animateLoaderOut();
    },
    { once: true }
  );

  window.addEventListener(
    "load",
    () => {
      setTimeout(animateLoaderOut, 1200);
    },
    { once: true }
  );
};

const openMenu = () => {
  if (!window.gsap) {
    menuOverlay.style.opacity = "1";
    menuOverlay.style.visibility = "visible";
    body.classList.add("menu-open");
    return;
  }

  body.classList.add("menu-open");
  menuButton.setAttribute("aria-expanded", "true");
  menuOverlay.setAttribute("aria-hidden", "false");

  gsap.set(menuOverlay, { autoAlpha: 1 });
  gsap.fromTo(
    menuPanel,
    { rotationX: -15, y: -40, opacity: 0, transformOrigin: "top center" },
    {
      duration: 1.2,
      rotationX: 0,
      y: 0,
      opacity: 1,
      ease: "elastic.out(1, 0.45)",
    }
  );

  gsap.fromTo(
    ".menu-link",
    { yPercent: 120, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.07,
      delay: 0.08,
      ease: "power4.out",
    }
  );
};

const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  menuOverlay.setAttribute("aria-hidden", "true");

  if (!window.gsap) {
    menuOverlay.style.opacity = "0";
    menuOverlay.style.visibility = "hidden";
    body.classList.remove("menu-open");
    return;
  }

  gsap.to(menuPanel, {
    y: -24,
    opacity: 0,
    duration: 0.4,
    ease: "power2.in",
  });

  gsap.to(menuOverlay, {
    autoAlpha: 0,
    duration: 0.4,
    delay: 0.08,
    ease: "power2.out",
    onComplete: () => body.classList.remove("menu-open"),
  });
};

const stopAllPreviews = () => {
  previewMedia.forEach((media) => {
    const video = media.querySelector("video");
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  });
};

const activatePreview = (targetKey) => {
  previewMedia.forEach((media) => {
    const isMatch = media.dataset.preview === targetKey;
    media.classList.toggle("is-active", isMatch);

    const video = media.querySelector("video");
    if (!video) return;

    if (isMatch && isDesktop.matches) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });

  portfolioItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.previewTarget === targetKey);
  });
};

const initPortfolio = () => {
  portfolioItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      if (!isDesktop.matches) return;
      activatePreview(item.dataset.previewTarget);
    });

    item.addEventListener("focusin", () => {
      activatePreview(item.dataset.previewTarget);
    });

    item.addEventListener("click", () => {
      if (isDesktop.matches) return;
      activatePreview(item.dataset.previewTarget);
    });
  });

  isDesktop.addEventListener("change", () => {
    stopAllPreviews();
    activatePreview("preview-1");
  });

  activatePreview("preview-1");
};

const initReveals = () => {
  splitLines(".hero__title, .section-title, .contact__title");

  if (!window.gsap) return;

  gsap.set(".reveal-text, .split-word", {
    yPercent: 110,
    opacity: 0,
  });

  gsap.to(".hero .reveal-text, .hero .split-word", {
    yPercent: 0,
    opacity: 1,
    duration: 1.1,
    ease: "power4.out",
    stagger: 0.06,
    delay: 0.4,
  });

  document.querySelectorAll(".section, .contact").forEach((section) => {
    const targets = section.querySelectorAll(".reveal-text, .split-word, .showcase-card, .gallery-grid__item, .portfolio-item");
    if (!targets.length) return;

    gsap.fromTo(
      targets,
      { y: 48, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
        },
      }
    );
  });

  gsap.to(".hero__media", {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      scrub: true,
      start: "top top",
      end: "bottom top",
    },
  });
};

const initRippleCards = () => {
  rippleCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--ripple-x", `${x}%`);
      card.style.setProperty("--ripple-y", `${y}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--ripple-x", "50%");
      card.style.setProperty("--ripple-y", "50%");
    });
  });
};

menuButton?.addEventListener("click", openMenu);
menuClose?.addEventListener("click", closeMenu);
menuOverlay?.addEventListener("click", (event) => {
  if (event.target === menuOverlay) closeMenu();
});

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

initLoader();
initPortfolio();
initReveals();
initRippleCards();
