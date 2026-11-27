(() => {
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const glow = document.querySelector(".cursor-glow");
  if (glow && matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("pointermove", event => {
      glow.style.left = event.clientX + "px";
      glow.style.top = event.clientY + "px";
    }, { passive: true });
  }

  const revealTargets = document.querySelectorAll(".intro-grid,.principle,.project-card,.project-note,.experience-grid,.github-panel,.contact-card");
  revealTargets.forEach(element => element.classList.add("reveal"));
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(element => observer.observe(element));
  } else {
    revealTargets.forEach(element => element.classList.add("visible"));
  }

  const cursor = document.querySelector(".custom-cursor");
  const finePointer = matchMedia("(pointer:fine)").matches;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (cursor && finePointer && !reducedMotion) {
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let targetX = x, targetY = y;
    window.addEventListener("pointermove", event => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add("cursor-visible");
    }, { passive: true });
    document.addEventListener("pointerleave", () => cursor.classList.remove("cursor-visible"));
    const tick = () => {
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      cursor.style.left = x + "px";
      cursor.style.top = y + "px";
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    document.querySelectorAll("a,button").forEach(element => {
      element.addEventListener("pointerenter", () => cursor.classList.add("cursor-hover"));
      element.addEventListener("pointerleave", () => cursor.classList.remove("cursor-hover"));
    });
  }

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = menu.getAttribute("aria-expanded") !== "true";
      menu.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("nav-open", open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      menu.setAttribute("aria-expanded", "false");
      nav.classList.remove("nav-open");
    }));
  }
})();