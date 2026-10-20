(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const sections = $$(".film-section");
  const heroVideo = $(".hero-video");
  const progress = $("#videoProgress");
  const currentScene = $("#currentScene");
  const soundToggle = $("#soundToggle");
  const soundLabel = $("#soundLabel");
  const preloader = $("#preloader");
  let soundEnabled = false;
  let loaderProgress = 0;

  // Loader is decorative and never blocks the page indefinitely.
  const loaderBar = $("#loaderBar");
  const loaderPercent = $("#loaderPercent");
  const loaderInterval = window.setInterval(() => {
    loaderProgress = Math.min(96, loaderProgress + Math.max(1, Math.round((96 - loaderProgress) * .12)));
    loaderBar.style.width = `${loaderProgress}%`;
    loaderPercent.textContent = String(loaderProgress).padStart(2, "0");
  }, 45);
  function finishLoader() {
    if (!preloader || preloader.classList.contains("done")) return;
    window.clearInterval(loaderInterval);
    loaderBar.style.width = "100%";
    loaderPercent.textContent = "100";
    document.body.classList.remove("loading");
    window.setTimeout(() => preloader.classList.add("done"), 220);
  }
  window.addEventListener("load", () => window.setTimeout(finishLoader, 300), { once: true });
  window.setTimeout(finishLoader, 2200);

  // All six sections have their own unique looping background video.
  // Play videos near the viewport and pause offscreen ones to reduce CPU usage.
  const backgroundVideos = $$(".section-video");
  backgroundVideos.forEach((video, index) => {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.dataset.sceneIndex = String(index);
  });
  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          if (video === heroVideo && soundEnabled) video.muted = false;
          video.play().catch(() => {});
          const section = video.closest(".film-section");
          if (section && currentScene) currentScene.textContent = String(Number(section.dataset.scene || 0) + 1).padStart(2, "0");
        } else {
          video.pause();
          if (video !== heroVideo) video.muted = true;
        }
      });
    }, { rootMargin: "160px 0px", threshold: 0.05 });
    backgroundVideos.forEach(video => videoObserver.observe(video));
  } else {
    backgroundVideos.forEach(video => video.play().catch(() => {}));
  }

  // Sound is available for the hero video only; other section videos remain muted.
  function setSound(enabled) {
    soundEnabled = enabled;
    heroVideo.muted = !enabled;
    soundToggle.setAttribute("aria-pressed", String(enabled));
    soundLabel.textContent = enabled ? "SOUND ON" : "SOUND OFF";
    if (enabled) heroVideo.play().catch(() => {});
  }
  soundToggle.addEventListener("click", () => setSound(!soundEnabled));
  heroVideo.addEventListener("timeupdate", () => {
    const ratio = heroVideo.duration && Number.isFinite(heroVideo.duration) ? heroVideo.currentTime / heroVideo.duration : 0;
    progress.style.width = `${Math.min(100, ratio * 100)}%`;
  });

  // Mobile navigation.
  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");
  function closeMenu() {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    mainNav.classList.toggle("open", open);
  });
  $$(".nav-link").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  document.addEventListener("click", event => {
    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });

  // Scroll reveal animations.
  const revealTargets = $$(".manifesto-layout, .manifesto-copy .mini-line, .manifesto-copy .large-copy, .manifesto-copy .body-copy, .manifesto-copy .text-link, .vision-content > .eyebrow, .vision-content h2, .vision-copy, .vision-content > .button, .craft-content > div, .sequence-heading h2, .sequence-heading p, .scene-card, .sequence-controls, .closing-kicker, .closing-content h2, .closing-content > .button, .section-kicker");
  revealTargets.forEach((el, index) => {
    el.classList.add("reveal");
    // Cards enter in a gentle stagger; footage itself is never animated by scroll.
    if (el.classList.contains("scene-card")) el.style.setProperty("--reveal-delay", `${(index % 6) * 90}ms`);
  });
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealTargets.forEach(el => revealObserver.observe(el));

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        const group = id === "home" ? "home" : (["manifesto", "vision", "craft"].includes(id) ? "story" : (id === "sequence" ? "worlds" : "contact"));
        $$(".nav-link").forEach(link => link.classList.toggle("active", link.dataset.navGroup === group));
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  } else {
    revealTargets.forEach(el => el.classList.add("in-view"));
  }

  // Silent looping card previews, only while hovered.
  $$(".scene-card video").forEach(preview => {
    preview.muted = true;
    preview.loop = true;
    const card = preview.closest(".scene-card");
    card.addEventListener("mouseenter", () => {
      if (window.matchMedia("(hover: hover)").matches) preview.play().catch(() => {});
    });
    card.addEventListener("mouseleave", () => preview.pause());
    card.addEventListener("focus", () => preview.play().catch(() => {}));
    card.addEventListener("blur", () => preview.pause());
  });

  const backTop = $("#backTop");
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("visible", window.scrollY > 600);
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty("--page-progress", `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`);
  }, { passive: true });
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const cursorGlow = $("#cursorGlow");
  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", event => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
      cursorGlow.style.opacity = "1";
    }, { passive: true });
  }
  $("#year").textContent = new Date().getFullYear();
})();