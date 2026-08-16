(function () {
  "use strict";

  const icons = {
    people: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    bell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM14 21h-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-9Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m20 20-4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M16 3v4M8 3v4M3 10h18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    message: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 21a8 8 0 0 1 16 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>'
  };

  const page = document.body.dataset.page || "home";
  const isHostPage = ["host-dashboard", "create-experience", "host-profile"].includes(page);
  const headerTarget = document.querySelector("[data-component='header']");
  const footerTarget = document.querySelector("[data-component='footer']");

  const mainNav = [
    ["explore", "explore.html", "Entdecken", "کشف تجربه‌ها"],
    ["categories", "index.html#categories", "Kategorien", "دسته‌بندی‌ها"],
    ["bookings", "my-bookings.html", "Meine Buchungen", "رزروهای من"],
    ["host-dashboard", "host-dashboard.html", isHostPage ? "Gastgeber-Dashboard" : "Gastgeber werden", isHostPage ? "داشبورد میزبان" : "میزبان شوید"],
    ["login", "login.html", "Anmelden", "ورود"]
  ];

  const mobileNav = [
    ["home", "index.html", "Start", "خانه", icons.home],
    ["explore", "explore.html", "Entdecken", "کشف", icons.search],
    ["bookings", "my-bookings.html", "Buchungen", "رزروها", icons.calendar],
    ["messages", "my-bookings.html#messages", "Nachrichten", "پیام‌ها", icons.message],
    ["profile", "profile.html", "Profil", "پروفایل", icons.user]
  ];

  function activeFor(key) {
    if (key === "categories" && page === "home") return false;
    if (key === "host-dashboard" && ["host-dashboard", "create-experience", "host-profile"].includes(page)) return true;
    if (key === "bookings" && ["bookings", "booking-confirmation"].includes(page)) return true;
    if (key === "profile" && ["profile", "host-profile"].includes(page)) return true;
    return key === page;
  }

  function wordmark() {
    return `<span class="wordmark__mark">${icons.people}</span><span class="wordmark__text">Gather</span>`;
  }

  if (headerTarget) {
    const desktopLinks = mainNav.map(([key, href, de, fa]) => `<a href="${href}" ${activeFor(key) ? 'aria-current="page"' : ""} data-de="${de}" data-fa="${fa}">${de}</a>`).join("");
    const mobileLinks = mainNav.map(([key, href, de, fa]) => `<a href="${href}" ${activeFor(key) ? 'aria-current="page"' : ""} data-de="${de}" data-fa="${fa}">${de}</a>`).join("");
    const bottomLinks = mobileNav.map(([key, href, de, fa, svg]) => `<a href="${href}" ${activeFor(key) ? 'aria-current="page"' : ""}>${svg}<span data-de="${de}" data-fa="${fa}">${de}</span></a>`).join("");

    headerTarget.innerHTML = `
      <a class="skip-link" href="#main" data-de="Zum Inhalt springen" data-fa="رفتن به محتوای اصلی">Zum Inhalt springen</a>
      <header class="site-header">
        <div class="site-header__inner">
          <a class="wordmark" href="index.html" aria-label="Gather – Startseite" data-de-aria="Gather – Startseite" data-fa-aria="Gather – صفحه اصلی">${wordmark()}</a>
          <nav class="site-header__nav" aria-label="Hauptnavigation" data-de-aria="Hauptnavigation" data-fa-aria="منوی اصلی">${desktopLinks}</nav>
          <div class="site-header__actions">
            <button class="location-button" type="button" data-toast data-de-message="Standort ist auf Frankfurt eingestellt." data-fa-message="مکان روی فرانکفورت تنظیم شده است.">${icons.pin}<span>Frankfurt</span></button>
            <div class="language-switcher" role="group" aria-label="Sprache wählen" data-de-aria="Sprache wählen" data-fa-aria="انتخاب زبان">
              <button type="button" data-language="de" aria-pressed="true">DE</button>
              <button type="button" data-language="fa" aria-pressed="false">فارسی</button>
            </div>
            <button class="header-icon" type="button" data-toast data-de-message="Du hast zwei neue Benachrichtigungen." data-fa-message="شما دو اعلان جدید دارید." aria-label="Benachrichtigungen" data-de-aria="Benachrichtigungen" data-fa-aria="اعلان‌ها">${icons.bell}<span class="header-icon__dot"></span></button>
            <a class="header-icon" href="profile.html" aria-label="Profil öffnen" data-de-aria="Profil öffnen" data-fa-aria="باز کردن پروفایل"><img class="avatar avatar--sm" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=96&q=80" alt="Profilbild von Amir" data-de-alt="Profilbild von Amir" data-fa-alt="تصویر پروفایل امیر"></a>
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Menü öffnen" data-de-aria="Menü öffnen" data-fa-aria="باز کردن منو" data-de-close-aria="Menü schließen" data-fa-close-aria="بستن منو">${icons.menu}</button>
          </div>
        </div>
      </header>
      <div class="mobile-menu" id="mobile-menu" aria-hidden="true" inert><nav aria-label="Mobile Navigation" data-de-aria="Mobile Navigation" data-fa-aria="منوی موبایل">${mobileLinks}</nav></div>
      <nav class="mobile-nav" aria-label="Mobile Hauptnavigation" data-de-aria="Mobile Hauptnavigation" data-fa-aria="منوی اصلی موبایل">${bottomLinks}</nav>`;
  }

  if (footerTarget) {
    footerTarget.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer__grid">
          <div class="site-footer__intro">
            <a class="wordmark" href="index.html">${wordmark()}</a>
            <p data-de="Erlebnisse entdecken. Menschen kennenlernen. Gemeinsam erleben." data-fa="تجربه‌های تازه را کشف کن. آدم‌های جدید را بشناس. با هم همراه شویم.">Erlebnisse entdecken. Menschen kennenlernen. Gemeinsam erleben.</p>
          </div>
          <div><h2 data-de="Entdecken" data-fa="کشف کنید">Entdecken</h2><ul><li><a href="explore.html" data-de="Alle Erlebnisse" data-fa="همه تجربه‌ها">Alle Erlebnisse</a></li><li><a href="index.html#categories" data-de="Kategorien" data-fa="دسته‌بندی‌ها">Kategorien</a></li><li><a href="host-profile.html" data-de="Vertrauenswürdige Gastgeber" data-fa="میزبان‌های قابل اعتماد">Vertrauenswürdige Gastgeber</a></li></ul></div>
          <div><h2 data-de="Gastgeber" data-fa="میزبان">Gastgeber</h2><ul><li><a href="create-experience.html" data-de="Erlebnis erstellen" data-fa="ایجاد تجربه">Erlebnis erstellen</a></li><li><a href="host-dashboard.html" data-de="Gastgeber-Dashboard" data-fa="داشبورد میزبان">Gastgeber-Dashboard</a></li><li><a href="ui-states.html" data-de="UI-Zustände" data-fa="وضعیت‌های رابط">UI-Zustände</a></li></ul></div>
          <div><h2 data-de="Sicherheit" data-fa="امنیت">Sicherheit</h2><ul><li><a href="experience-details.html#cancellation" data-de="Stornierung" data-fa="لغو رزرو">Stornierung</a></li><li><a href="profile.html#privacy" data-de="Datenschutz" data-fa="حریم خصوصی">Datenschutz</a></li><li><a href="ui-states.html#community" data-de="Community-Richtlinien" data-fa="قوانین جامعه">Community-Richtlinien</a></li></ul></div>
        </div>
        <div class="site-footer__bottom"><span>© 2026 Gather.</span> <span data-de="Ein UI-Prototyp für echte Begegnungen." data-fa="نمونه رابط کاربری برای دیدارهای واقعی.">Ein UI-Prototyp für echte Begegnungen.</span></div>
      </footer>`;
  }

  const toastRegion = document.createElement("div");
  toastRegion.className = "toast-region";
  toastRegion.setAttribute("aria-live", "polite");
  toastRegion.setAttribute("aria-atomic", "true");
  document.body.appendChild(toastRegion);

  function currentLanguage() {
    return document.documentElement.lang === "fa" ? "fa" : "de";
  }

  function localValue(element, key, language) {
    const prefix = language === "fa" ? "fa" : "de";
    return element.dataset[`${prefix}${key}`] || "";
  }

  function updateMenuButtonLabel(button, language = currentLanguage()) {
    if (!button) return;
    const key = button.getAttribute("aria-expanded") === "true" ? "CloseAria" : "Aria";
    const value = localValue(button, key, language);
    if (value) button.setAttribute("aria-label", value);
  }

  function applyLanguage(language) {
    const isPersian = language === "fa";
    document.documentElement.lang = isPersian ? "fa" : "de";
    document.documentElement.dir = isPersian ? "rtl" : "ltr";
    document.body.dataset.language = language;
    localStorage.setItem("gather-language", language);

    document.querySelectorAll("[data-de][data-fa]").forEach((element) => {
      element.textContent = isPersian ? element.dataset.fa : element.dataset.de;
    });
    ["placeholder", "aria", "alt", "title"].forEach((attribute) => {
      document.querySelectorAll(`[data-de-${attribute}][data-fa-${attribute}]`).forEach((element) => {
        if (attribute === "title" && element === document.body) return;
        const value = localValue(element, attribute.charAt(0).toUpperCase() + attribute.slice(1), language);
        const name = attribute === "aria" ? "aria-label" : attribute;
        if (value) element.setAttribute(name, value);
      });
    });
    document.querySelectorAll("[data-de-value][data-fa-value]").forEach((element) => {
      element.value = isPersian ? element.dataset.faValue : element.dataset.deValue;
    });
    document.querySelectorAll("button[data-language]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    });
    const title = isPersian ? document.body.dataset.faTitle : document.body.dataset.deTitle;
    if (title) document.title = `${title} | Gather`;
    updateMenuButtonLabel(document.querySelector(".menu-toggle"), language);
  }

  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast${type === "error" ? " toast--error" : ""}`;
    toast.setAttribute("role", "status");
    toast.innerHTML = `${icons[type === "error" ? "close" : "check"]}<span></span>`;
    toast.querySelector("span").textContent = message;
    toastRegion.appendChild(toast);
    window.setTimeout(() => toast.remove(), 3600);
  }

  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const overlayOpeners = new WeakMap();
  let activeOverlay = null;

  function focusableElements(overlay) {
    return [...overlay.querySelectorAll(focusableSelector)].filter((element) => !element.hidden && element.getAttribute("aria-hidden") !== "true");
  }

  function openOverlay(overlay, trigger) {
    if (!overlay) return;
    if (activeOverlay && activeOverlay !== overlay) closeOverlay(activeOverlay, false);
    if (trigger) overlayOpeners.set(overlay, trigger);
    overlay.inert = false;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    if (overlay.matches(".modal, .drawer")) document.body.classList.add("no-scroll");
    activeOverlay = overlay;
    const menuButton = overlay.id === "mobile-menu" ? document.querySelector(".menu-toggle") : null;
    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "true");
      updateMenuButtonLabel(menuButton);
    }
    window.requestAnimationFrame(() => {
      if (activeOverlay !== overlay || overlay.getAttribute("aria-hidden") === "true") return;
      const firstFocusable = focusableElements(overlay)[0];
      if (firstFocusable) firstFocusable.focus({ preventScroll: true });
      else {
        overlay.setAttribute("tabindex", "-1");
        overlay.focus({ preventScroll: true });
      }
    });
  }

  function closeOverlay(overlay, restoreFocus = true) {
    if (!overlay) return;
    const opener = overlayOpeners.get(overlay);
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    overlay.inert = true;
    if (overlay.id === "mobile-menu") {
      const menuButton = document.querySelector(".menu-toggle");
      menuButton?.setAttribute("aria-expanded", "false");
      updateMenuButtonLabel(menuButton);
    }
    if (activeOverlay === overlay) activeOverlay = null;
    if (!document.querySelector(".modal.is-open, .drawer.is-open")) document.body.classList.remove("no-scroll");
    if (restoreFocus && opener?.isConnected) opener.focus({ preventScroll: true });
  }

  function closeOverlays() {
    if (activeOverlay) closeOverlay(activeOverlay);
  }

  function activateTab(tab, moveFocus = false) {
    const tablist = tab?.closest("[role='tablist']");
    const scope = tablist?.closest("[data-tabs]");
    if (!tablist || !scope) return;
    tablist.querySelectorAll("[role='tab']").forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.setAttribute("tabindex", selected ? "0" : "-1");
    });
    scope.querySelectorAll("[role='tabpanel']").forEach((panel) => {
      panel.hidden = panel.id !== tab.getAttribute("aria-controls");
    });
    if (moveFocus) tab.focus();
  }

  document.addEventListener("click", (event) => {
    const languageButton = event.target.closest("button[data-language]");
    if (languageButton) applyLanguage(languageButton.dataset.language);

    const menuButton = event.target.closest(".menu-toggle");
    if (menuButton) {
      const menu = document.getElementById("mobile-menu");
      if (menu.classList.contains("is-open")) closeOverlay(menu);
      else openOverlay(menu, menuButton);
    }

    const favourite = event.target.closest("[data-favourite]");
    if (favourite) {
      const active = favourite.getAttribute("aria-pressed") !== "true";
      favourite.setAttribute("aria-pressed", String(active));
      const message = currentLanguage() === "fa" ? (active ? "به علاقه‌مندی‌ها اضافه شد." : "از علاقه‌مندی‌ها حذف شد.") : (active ? "Zu Favoriten hinzugefügt." : "Aus Favoriten entfernt.");
      showToast(message);
    }

    const toastButton = event.target.closest("[data-toast]");
    if (toastButton) {
      showToast(currentLanguage() === "fa" ? toastButton.dataset.faMessage : toastButton.dataset.deMessage, toastButton.dataset.toastType);
    }

    const drawerButton = event.target.closest("[data-open-drawer]");
    if (drawerButton) {
      const drawer = document.getElementById(drawerButton.dataset.openDrawer);
      openOverlay(drawer, drawerButton);
    }

    const modalButton = event.target.closest("[data-open-modal]");
    if (modalButton) {
      const modal = document.getElementById(modalButton.dataset.openModal);
      openOverlay(modal, modalButton);
    }

    const closeButton = event.target.closest("[data-close-overlay]");
    if (closeButton) closeOverlay(closeButton.closest(".modal, .drawer, .mobile-menu"));
    else if (event.target.matches(".modal, .drawer")) closeOverlay(event.target);

    const tab = event.target.closest("[role='tab']");
    if (tab) activateTab(tab);

    const accordion = event.target.closest(".accordion__button");
    if (accordion) {
      const panel = document.getElementById(accordion.getAttribute("aria-controls"));
      const open = accordion.getAttribute("aria-expanded") !== "true";
      accordion.setAttribute("aria-expanded", String(open));
      panel.hidden = !open;
    }

    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      const group = viewButton.closest(".view-switch");
      group.querySelectorAll("button").forEach((button) => button.setAttribute("aria-pressed", String(button === viewButton)));
      const results = document.querySelector(".results-grid");
      if (results) results.classList.toggle("is-list", viewButton.dataset.view === "list");
      if (viewButton.dataset.view === "map") showToast(currentLanguage() === "fa" ? "نمای نقشه در این نمونه شبیه‌سازی شده است." : "Die Kartenansicht ist in diesem Prototyp simuliert.");
    }

    const passwordButton = event.target.closest("[data-password-toggle]");
    if (passwordButton) {
      const input = document.getElementById(passwordButton.dataset.passwordToggle);
      input.type = input.type === "password" ? "text" : "password";
      passwordButton.setAttribute("aria-pressed", String(input.type === "text"));
    }

    const galleryButton = event.target.closest("[data-gallery-image]");
    if (galleryButton) {
      const mainImage = document.querySelector(".gallery__item:first-child img");
      const clickedImage = galleryButton.querySelector("img");
      if (mainImage && clickedImage && mainImage !== clickedImage) {
        const old = { src: mainImage.src, alt: mainImage.alt, de: mainImage.dataset.deAlt, fa: mainImage.dataset.faAlt };
        mainImage.src = clickedImage.src;
        mainImage.alt = clickedImage.alt;
        mainImage.dataset.deAlt = clickedImage.dataset.deAlt;
        mainImage.dataset.faAlt = clickedImage.dataset.faAlt;
        clickedImage.src = old.src;
        clickedImage.alt = old.alt;
        clickedImage.dataset.deAlt = old.de;
        clickedImage.dataset.faAlt = old.fa;
      }
    }

    const nextButton = event.target.closest("[data-next-step]");
    const backButton = event.target.closest("[data-back-step]");
    if (nextButton || backButton) {
      const form = (nextButton || backButton).closest("[data-step-form]");
      changeStep(form, nextButton ? 1 : -1);
    }

    const progressButton = event.target.closest("[data-go-step]");
    if (progressButton) {
      const form = document.querySelector(progressButton.dataset.formTarget);
      showStep(form, Number(progressButton.dataset.goStep));
    }
  });

  document.addEventListener("keydown", (event) => {
    const tab = event.target.closest?.("[role='tab']");
    if (tab && ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      const tabs = [...tab.closest("[role='tablist']").querySelectorAll("[role='tab']")];
      const current = tabs.indexOf(tab);
      const isRtl = document.documentElement.dir === "rtl";
      let next = current;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (event.key === "ArrowRight") next = (current + (isRtl ? -1 : 1) + tabs.length) % tabs.length;
      if (event.key === "ArrowLeft") next = (current + (isRtl ? 1 : -1) + tabs.length) % tabs.length;
      activateTab(tabs[next], true);
      event.preventDefault();
      return;
    }
    if (event.key === "Escape" && activeOverlay) {
      closeOverlays();
      event.preventDefault();
      return;
    }
    if (event.key === "Tab") {
      const overlay = activeOverlay?.classList.contains("is-open") ? activeOverlay : null;
      if (!overlay) return;
      const focusable = focusableElements(overlay);
      if (!focusable.length) {
        overlay.focus({ preventScroll: true });
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!overlay.contains(document.activeElement)) { first.focus(); event.preventDefault(); return; }
      if (event.shiftKey && document.activeElement === first) { last.focus(); event.preventDefault(); }
      if (!event.shiftKey && document.activeElement === last) { first.focus(); event.preventDefault(); }
    }
  });

  document.addEventListener("focusin", (event) => {
    if (activeOverlay?.classList.contains("is-open") && !activeOverlay.contains(event.target)) {
      (focusableElements(activeOverlay)[0] || activeOverlay).focus({ preventScroll: true });
    }
  });

  function showStep(form, index) {
    if (!form) return;
    const steps = [...form.querySelectorAll(".booking-step, .form-step")];
    const safeIndex = Math.max(0, Math.min(index, steps.length - 1));
    form.dataset.currentStep = String(safeIndex);
    steps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === safeIndex));
    document.querySelectorAll(`[data-form-target="#${form.id}"]`).forEach((button, buttonIndex) => button.classList.toggle("is-active", buttonIndex === safeIndex));
    form.querySelectorAll(".stepper__item").forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === safeIndex);
      item.classList.toggle("is-complete", itemIndex < safeIndex);
    });
    form.querySelector(".is-active input, .is-active select, .is-active textarea")?.focus();
  }

  function changeStep(form, direction) {
    if (!form) return;
    const current = Number(form.dataset.currentStep || 0);
    const activeStep = form.querySelector(".booking-step.is-active, .form-step.is-active");
    if (direction > 0 && activeStep) {
      let valid = true;
      activeStep.querySelectorAll("[required]").forEach((input) => {
        const field = input.closest(".field");
        const invalid = !input.checkValidity();
        input.setAttribute("aria-invalid", String(invalid));
        field?.classList.toggle("has-error", invalid);
        if (invalid) valid = false;
      });
      if (!valid) {
        showToast(currentLanguage() === "fa" ? "لطفاً فیلدهای مشخص‌شده را بررسی کنید." : "Bitte prüfe die markierten Felder.", "error");
        activeStep.querySelector("[aria-invalid='true']")?.focus();
        return;
      }
    }
    showStep(form, current + direction);
  }

  document.querySelectorAll("[data-step-form]").forEach((form) => showStep(form, Number(form.dataset.currentStep || 0)));

  document.querySelectorAll("[role='tablist']").forEach((tablist) => {
    const selected = tablist.querySelector("[role='tab'][aria-selected='true']") || tablist.querySelector("[role='tab']");
    activateTab(selected);
  });

  document.querySelectorAll(".modal, .drawer, .mobile-menu").forEach((overlay) => {
    if (!overlay.classList.contains("is-open")) {
      overlay.inert = true;
      overlay.setAttribute("aria-hidden", "true");
    }
  });

  document.querySelectorAll("svg:not([aria-hidden]), .category-card__icon, .state-icon, .stat-card__icon, .success-panel__icon").forEach((element) => {
    element.setAttribute("aria-hidden", "true");
  });

  document.querySelectorAll(".prototype-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.querySelectorAll("[required]").forEach((input) => {
          const invalid = !input.checkValidity();
          input.setAttribute("aria-invalid", String(invalid));
          input.closest(".field")?.classList.toggle("has-error", invalid);
        });
        showToast(currentLanguage() === "fa" ? "لطفاً اطلاعات لازم را کامل کنید." : "Bitte fülle alle Pflichtfelder aus.", "error");
        form.querySelector("[aria-invalid='true']")?.focus();
        return;
      }
      const message = currentLanguage() === "fa" ? (form.dataset.faSuccess || "اطلاعات با موفقیت ذخیره شد.") : (form.dataset.deSuccess || "Die Angaben wurden gespeichert.");
      showToast(message);
    });
    form.addEventListener("input", (event) => {
      if (event.target.matches("input, select, textarea")) {
        event.target.removeAttribute("aria-invalid");
        event.target.closest(".field")?.classList.remove("has-error");
      }
    });
  });

  const places = document.querySelector("[data-places]");
  if (places) {
    places.addEventListener("change", () => {
      const count = Number(places.value);
      document.querySelectorAll("[data-subtotal]").forEach((el) => { el.textContent = `${count * 39} €`; });
      document.querySelectorAll("[data-total]").forEach((el) => { el.textContent = `${count * 39 + 4} €`; });
    });
  }

  const savedLanguage = localStorage.getItem("gather-language");
  applyLanguage(savedLanguage === "fa" ? "fa" : "de");
})();
