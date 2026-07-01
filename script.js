document.addEventListener("DOMContentLoaded", () => {
  initCurrentYear();
  initSmoothScroll();
  initHeroVideo();
  initHeaderScrollState();
  initServicesSlider();
  initReviewsSlider();
  initServiceDropdown();
  initMobileMenu();
  initFormHoneypot();
  initNameValidation();
  initEmailValidation();
  initPhoneValidation();
  initFaq();
});

function initCurrentYear() {
  const yearElement = document.querySelector("[data-current-year]");

  if (!yearElement) {
    return;
  }

  yearElement.textContent = String(new Date().getFullYear());
}

function initHeroVideo() {
  const video = document.querySelector(".hero__video");

  if (!video) {
    return;
  }

  // Respect users who prefer reduced motion: keep the still poster instead of playing.
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (prefersReducedMotion.matches) {
    video.removeAttribute("autoplay");
    video.pause();
    return;
  }

  // Some browsers block autoplay until interaction; ignore the rejection and keep the poster.
  const playAttempt = video.play();

  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch(() => {});
  }
}

function initHeaderScrollState() {
  const header = document.querySelector(".header");
  const hero = document.querySelector(".hero");
  const footer = document.querySelector(".footer");

  if (!header || !("IntersectionObserver" in window)) {
    return;
  }

  let observer = null;

  // Switch the header to its scrolled (ink) state once the hero has scrolled up
  // past the fixed header — i.e. the moment the header stops overlapping the dark
  // hero image. The negative top rootMargin equals the header height so the line
  // sits exactly at the header's bottom edge.
  //
  // Pages without a hero (e.g. /kontakt, /impressum) carry `.page--solid-header`,
  // which keeps the frosted bar + ink colours on permanently via CSS — so there's
  // no hero to observe here and the header simply stays in its solid state. The
  // footer slide-up below still runs.
  const observeHero = () => {
    if (!hero) {
      return;
    }

    observer?.disconnect();

    observer = new IntersectionObserver(
      ([entry]) => {
        header.classList.toggle("is-scrolled", !entry.isIntersecting);
      },
      { rootMargin: `-${header.offsetHeight}px 0px 0px 0px`, threshold: 0 },
    );

    observer.observe(hero);
  };

  observeHero();

  // Footer in view → slide the header up so it stops duplicating the footer's
  // logo + CTA. The percentage rootMargin trims 35% off the bottom of the
  // viewport, so the header only hides once the footer fills the lower part of
  // the screen (not the instant its top edge peeks in). No resize recompute
  // needed since the margin is relative.
  if (footer) {
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        header.classList.toggle("is-hidden", entry.isIntersecting);
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0 },
    );

    footerObserver.observe(footer);
  }

  // The header height shifts with the fluid gutter, so recompute the threshold on
  // resize (rAF-throttled).
  let resizeFrame = null;
  window.addEventListener("resize", () => {
    if (resizeFrame) {
      return;
    }

    resizeFrame = window.requestAnimationFrame(() => {
      resizeFrame = null;
      observeHero();
    });
  });
}

function initSmoothScroll() {
  // Offset anchored scrolling by the fixed desktop header so the target section's
  // heading isn't hidden beneath it. Below 1151px the header scrolls away with the
  // page (it isn't fixed), so no offset is needed there.
  const headerOffset = () => {
    const header = document.querySelector(".header");

    if (header && window.matchMedia("(min-width: 1151px)").matches) {
      return header.offsetHeight + 24;
    }

    return 0;
  };

  if (typeof window.Lenis !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // No Lenis (or reduced motion): native scrolling, no JS offset. The header
    // offset for anchored sections is applied only on the Lenis path below (a single
    // source of truth — no CSS scroll-padding, which would double the offset).
    return;
  }

  const lenis = new window.Lenis({
    duration: 1.15,
    easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1,
  });

  window.__lenis = lenis;

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);

  // Smooth-scroll clicks on same-page anchors, applying the header offset. Links that
  // point to another page (e.g. `/#leistungen` from a service page) and the mobile
  // menu's own links are left to their native/handled behaviour.
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href]');

    if (!link || link.closest(".mobile-menu")) {
      return;
    }

    const url = new URL(link.href, window.location.href);

    if (url.pathname !== window.location.pathname || url.hash.length < 2) {
      return;
    }

    const target = document.querySelector(url.hash);

    if (!target) {
      return;
    }

    event.preventDefault();
    lenis.scrollTo(target, { offset: -headerOffset() });
    window.history.pushState(null, "", url.hash);
  });

  // Arriving with a hash (e.g. landing on /#leistungen from another page): smooth-scroll
  // to the target with the header offset so its heading stays visible. The browser's
  // own fragment jump applies NO offset and would tuck the heading under the fixed
  // header, so take manual control and re-assert the offset once the page has fully
  // loaded (images/fonts settled), which also wins over that native jump.
  if (window.location.hash.length > 1) {
    const target = document.querySelector(window.location.hash);

    if (target) {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      const landOnTarget = () => {
        lenis.scrollTo(target, { offset: -headerOffset(), duration: 1.2 });
      };

      requestAnimationFrame(landOnTarget);

      if (document.readyState === "complete") {
        requestAnimationFrame(landOnTarget);
      } else {
        window.addEventListener("load", () => requestAnimationFrame(landOnTarget), { once: true });
      }
    }
  }
}

function initServicesSlider() {
  const sliderElement = document.querySelector("[data-services-slider]");

  if (!sliderElement || typeof window.Splide !== "function") {
    return;
  }

  const previousButton = document.querySelector(".services-slider__arrow--prev");
  const nextButton = document.querySelector(".services-slider__arrow--next");
  const serviceCards = Array.from(sliderElement.querySelectorAll(".service-catalog-card"));
  const sliderTrack = sliderElement.querySelector(".service-list__track");
  const sliderList = sliderElement.querySelector(".service-list__list");
  const removePagination = () => removeSliderPagination(sliderElement);

  serviceCards.forEach((card) => {
    card.setAttribute("tabindex", "0");

    const detailsLink = card.querySelector(".details-link");

    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        return;
      }

      detailsLink?.click();
    });

    card.addEventListener("keydown", (event) => {
      if ((event.key !== "Enter" && event.key !== " ") || document.activeElement !== card) {
        return;
      }

      event.preventDefault();
      detailsLink?.click();
    });
  });

  const servicesSlider = new window.Splide(sliderElement, {
    type: "slide",
    autoWidth: true,
    perMove: 1,
    padding: {
      right: "var(--content-gutter)",
    },
    arrows: false,
    pagination: false,
    keyboard: "focused",
    drag: true,
    snap: false,
    speed: 760,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    waitForTransition: false,
    slideFocus: false,
    trimSpace: true,
  });

  const getSliderPositionState = (targetIndex) => {
    const move = servicesSlider.Components?.Move;

    if (!move || typeof move.getPosition !== "function" || typeof move.getLimit !== "function") {
      const controller = servicesSlider.Components?.Controller;
      const endIndex = typeof controller?.getEnd === "function"
        ? controller.getEnd()
        : serviceCards.length - 1;
      const currentIndex = typeof targetIndex === "number" ? targetIndex : servicesSlider.index;

      return {
        isAtStart: currentIndex <= 0,
        isAtEnd: currentIndex >= endIndex,
      };
    }

    const startLimit = move.getLimit(false);
    const endLimit = move.getLimit(true);
    const position = typeof targetIndex === "number" && typeof move.toPosition === "function"
      ? move.toPosition(targetIndex, true)
      : move.getPosition();
    const tolerance = 2;
    const movesNegative = endLimit < startLimit;

    return {
      isAtStart: movesNegative
        ? position >= startLimit - tolerance
        : position <= startLimit + tolerance,
      isAtEnd: movesNegative
        ? position <= endLimit + tolerance
        : position >= endLimit - tolerance,
    };
  };

  const syncControls = (forcedState) => {
    const { isAtStart, isAtEnd } = forcedState || getSliderPositionState();

    if (previousButton) {
      previousButton.disabled = isAtStart;
      previousButton.setAttribute("aria-disabled", String(isAtStart));
    }

    if (nextButton) {
      nextButton.disabled = isAtEnd;
      nextButton.setAttribute("aria-disabled", String(isAtEnd));
    }
  };

  const syncControlsAfterLayout = () => {
    requestAnimationFrame(() => {
      syncControls(getSliderPositionState());
    });
  };

  previousButton?.addEventListener("click", () => {
    if (getSliderPositionState().isAtStart) {
      syncControls(getSliderPositionState());
      return;
    }

    servicesSlider.go("<");
  });

  nextButton?.addEventListener("click", () => {
    if (getSliderPositionState().isAtEnd) {
      syncControls(getSliderPositionState());
      return;
    }

    servicesSlider.go(">");
  });

  servicesSlider.on("mounted updated resized", removePagination);
  servicesSlider.on("move", (newIndex) => {
    syncControls(getSliderPositionState(newIndex));
  });
  servicesSlider.on("mounted moved dragged resized updated", syncControlsAfterLayout);
  servicesSlider.mount();
  removePagination();
}

function initReviewsSlider() {
  const sliderElement = document.querySelector("[data-reviews-slider]");

  if (!sliderElement || typeof window.Splide !== "function") {
    return;
  }

  const previousButton = document.querySelector(".customer-review__arrow--prev");
  const nextButton = document.querySelector(".customer-review__arrow--next");
  const authorElement = document.querySelector("[data-review-author]");
  const slides = Array.from(sliderElement.querySelectorAll(".customer-review__slide"));
  const sliderTrack = sliderElement.querySelector(".customer-review__track");
  const removePagination = () => removeSliderPagination(sliderElement);

  const reviewsSlider = new window.Splide(sliderElement, {
    type: "slide",
    perPage: 1,
    perMove: 1,
    arrows: false,
    pagination: false,
    keyboard: "focused",
    drag: true,
    speed: 420,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    waitForTransition: false,
    slideFocus: false,
  });

  const createAuthorSpan = (className, text, hidden = false) => {
    const span = document.createElement("span");
    span.className = className;
    if (hidden) {
      span.setAttribute("aria-hidden", "true");
    }
    span.textContent = text;
    return span;
  };

  const setAuthorCollapsed = (author) => {
    if (!authorElement) {
      return;
    }

    authorElement.replaceChildren(
      createAuthorSpan("customer-review__author-current", author),
    );
    authorElement.classList.remove("is-changing");
  };

  const setReviewAuthor = (author, shouldAnimate = true) => {
    if (!authorElement || !author) {
      return;
    }

    const currentAuthor = authorElement.querySelector(".customer-review__author-current")?.textContent?.trim()
      || authorElement.textContent.trim();

    if (currentAuthor === author && !authorElement.classList.contains("is-changing")) {
      return;
    }

    if (!shouldAnimate) {
      setAuthorCollapsed(author);
      return;
    }

    authorElement.replaceChildren(
      createAuthorSpan("customer-review__author-current", currentAuthor || author),
      createAuthorSpan("customer-review__author-next", author, true),
    );

    const nextSpan = authorElement.querySelector(".customer-review__author-next");

    if (!nextSpan) {
      setAuthorCollapsed(author);
      return;
    }

    authorElement.classList.remove("is-changing");
    void authorElement.offsetWidth;
    authorElement.classList.add("is-changing");

    const finalizeAuthor = () => {
      if (!authorElement.contains(nextSpan)) {
        return;
      }

      setAuthorCollapsed(author);
    };

    nextSpan.addEventListener(
      "transitionend",
      (event) => {
        if (event.propertyName !== "opacity" || event.target !== nextSpan) {
          return;
        }

        finalizeAuthor();
      },
      { once: true },
    );

    window.setTimeout(() => {
      if (authorElement.contains(nextSpan) && authorElement.classList.contains("is-changing")) {
        finalizeAuthor();
      }
    }, 260);
  };

  const syncReviewHeight = () => {
    const currentSlide = slides[reviewsSlider.index];

    if (!sliderTrack || !currentSlide) {
      return;
    }

    sliderTrack.style.height = `${currentSlide.scrollHeight}px`;
    sliderElement.style.height = `${currentSlide.scrollHeight}px`;
  };

  const syncReviewControls = () => {
    if (previousButton) {
      previousButton.disabled = false;
      previousButton.setAttribute("aria-disabled", "false");
    }

    if (nextButton) {
      nextButton.disabled = false;
      nextButton.setAttribute("aria-disabled", "false");
    }
  };

  const syncReviewAuthor = () => {
    const currentIndex = reviewsSlider.index;
    const currentSlide = slides[currentIndex];
    const author = currentSlide?.dataset.author;

    setReviewAuthor(author, false);
  };

  previousButton?.addEventListener("click", () => {
    if (reviewsSlider.index <= 0) {
      reviewsSlider.go(slides.length - 1);
      return;
    }

    reviewsSlider.go("<");
  });

  nextButton?.addEventListener("click", () => {
    if (reviewsSlider.index >= slides.length - 1) {
      reviewsSlider.go(0);
      return;
    }

    reviewsSlider.go(">");
  });

  reviewsSlider.on("mounted", () => {
    sliderElement.classList.add("is-initialized");
  });
  reviewsSlider.on("updated resized", removePagination);
  reviewsSlider.on("mounted resized updated", syncReviewHeight);
  reviewsSlider.on("mounted move moved resized updated", syncReviewControls);
  reviewsSlider.on("mounted resized updated", syncReviewAuthor);
  reviewsSlider.on("move", (newIndex, previousIndex) => {
    const previousSlide = slides[previousIndex];
    const nextAuthor = slides[newIndex]?.dataset.author;

    if (sliderTrack && previousSlide) {
      sliderTrack.style.height = `${previousSlide.scrollHeight}px`;
      sliderElement.style.height = `${previousSlide.scrollHeight}px`;
    }

    setReviewAuthor(nextAuthor, true);
  });
  reviewsSlider.on("moved", () => {
    requestAnimationFrame(() => {
      syncReviewHeight();
    });
  });
  reviewsSlider.mount();
  removePagination();
  syncReviewHeight();
}

function removeSliderPagination(sliderElement) {
  sliderElement.querySelectorAll(".splide__pagination").forEach((pagination) => {
    pagination.remove();
  });
}

function initServiceDropdown() {
  const dropdown = document.querySelector("[data-service-dropdown]");

  if (!dropdown) {
    return;
  }

  const toggle = dropdown.querySelector("[data-service-dropdown-toggle]");
  const label = dropdown.querySelector("[data-service-dropdown-label]");
  const list = dropdown.querySelector("[data-service-dropdown-list]");
  const input = dropdown.querySelector("[data-service-dropdown-input]");
  const options = Array.from(dropdown.querySelectorAll(".contact-form_select-option"));

  if (!toggle || !label || !list || !input || !options.length) {
    return;
  }

  list.setAttribute("data-lenis-prevent", "");

  list.addEventListener("wheel", (event) => {
    event.stopPropagation();
  });

  list.addEventListener("touchmove", (event) => {
    event.stopPropagation();
  });

  const setOpen = (isOpen) => {
    dropdown.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    list.setAttribute("aria-hidden", String(!isOpen));
  };

  const selectOption = (option) => {
    input.value = option.dataset.value || "";
    label.textContent = option.textContent.trim();
    toggle.classList.add("is-selected");
    dropdown.classList.remove("is-invalid");

    options.forEach((currentOption) => {
      const isSelected = currentOption === option;

      currentOption.classList.toggle("is-selected", isSelected);
      currentOption.setAttribute("aria-selected", String(isSelected));
    });

    setOpen(false);
    toggle.focus();
  };

  toggle.addEventListener("click", () => {
    setOpen(!dropdown.classList.contains("is-open"));
  });

  toggle.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowDown" && event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    setOpen(true);
    options[0]?.focus();
  });

  options.forEach((option, index) => {
    option.setAttribute("aria-selected", "false");

    option.addEventListener("click", () => {
      selectOption(option);
    });

    option.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.focus();
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectOption(option);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        options[Math.min(index + 1, options.length - 1)]?.focus();
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        options[Math.max(index - 1, 0)]?.focus();
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      setOpen(false);
    }
  });

  // The hidden input is barred from native constraint validation, so enforce the
  // required service selection here once the native fields have passed.
  dropdown.closest("form")?.addEventListener("submit", (event) => {
    if (input.value) {
      return;
    }

    event.preventDefault();
    dropdown.classList.add("is-invalid");
    setOpen(true);
    toggle.focus();
  });

  setOpen(false);
}

function initMobileMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");

  if (!toggle || !menu) {
    return;
  }

  const setOpen = (isOpen) => {
    document.body.classList.toggle("is-menu-open", isOpen);
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
    menu.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";

    if (isOpen) {
      window.__lenis?.stop();
    } else {
      window.__lenis?.start();
    }
  };

  toggle.addEventListener("click", () => {
    setOpen(!document.body.classList.contains("is-menu-open"));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("is-menu-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  setOpen(false);
}

function initFormHoneypot() {
  const honeypotInput = document.querySelector("[data-honeypot-input]");

  if (!honeypotInput?.form) {
    return;
  }

  honeypotInput.form.addEventListener("submit", (event) => {
    if (honeypotInput.value.trim()) {
      event.preventDefault();
    }
  });
}

function initNameValidation() {
  const nameInput = document.querySelector("[data-name-input]");

  if (!nameInput) {
    return;
  }

  const errorMessage = "Bitte geben Sie einen gültigen Namen ein.";
  // Letters (incl. umlauts/accents and combining marks), spaces, hyphens, apostrophes and dots only.
  const disallowedCharacter = /[^\p{L}\p{M}\s'’.-]/u;
  const disallowedCharacterGlobal = /[^\p{L}\p{M}\s'’.-]/gu;
  const namePattern = /^[\p{L}\p{M}][\p{L}\p{M}\s'’.-]*$/u;

  const sanitizeName = () => {
    const sanitized = nameInput.value.replace(disallowedCharacterGlobal, "");

    if (sanitized !== nameInput.value) {
      nameInput.value = sanitized;
    }

    return sanitized;
  };

  const validateName = () => {
    const name = sanitizeName().trim();
    const isValid = name.length > 0 && namePattern.test(name);

    nameInput.setCustomValidity(isValid ? "" : errorMessage);

    return isValid;
  };

  nameInput.addEventListener("beforeinput", (event) => {
    if (typeof event.data === "string" && disallowedCharacter.test(event.data)) {
      event.preventDefault();
    }
  });

  nameInput.addEventListener("input", () => {
    sanitizeName();

    if (nameInput.value.trim() === "") {
      nameInput.setCustomValidity("");
      return;
    }

    validateName();
  });

  nameInput.addEventListener("blur", validateName);

  nameInput.form?.addEventListener("submit", (event) => {
    if (!validateName()) {
      event.preventDefault();
      nameInput.reportValidity();
      nameInput.focus();
    }
  });
}

function initEmailValidation() {
  const emailInput = document.querySelector("[data-email-input]");

  if (!emailInput) {
    return;
  }

  const errorMessage = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const suggestionButton = document.querySelector("[data-email-suggestion]");

  // Germany-first domain lists for the mailcheck typo suggestion.
  const suggestionDomains = [
    "web.de", "gmx.de", "gmx.net", "gmx.at", "gmx.ch", "t-online.de", "freenet.de",
    "online.de", "posteo.de", "mail.de", "yahoo.de", "outlook.de", "hotmail.de", "live.de",
    "gmail.com", "googlemail.com", "outlook.com", "hotmail.com", "yahoo.com", "icloud.com",
    "me.com", "aol.com", "msn.com",
  ];
  const suggestionSecondLevelDomains = ["web", "gmx", "yahoo", "hotmail", "outlook", "live", "mail", "t-online", "freenet"];
  const suggestionTopLevelDomains = ["de", "com", "net", "org", "eu", "at", "ch", "info", "co.uk", "fr", "it", "nl", "es"];

  let currentSuggestion = "";

  const hideSuggestion = () => {
    currentSuggestion = "";

    if (suggestionButton) {
      suggestionButton.hidden = true;
      suggestionButton.textContent = "";
    }
  };

  const checkSuggestion = () => {
    if (!suggestionButton || typeof window.Mailcheck === "undefined") {
      return;
    }

    const email = emailInput.value.trim();

    if (!email) {
      hideSuggestion();
      return;
    }

    window.Mailcheck.run({
      email,
      domains: suggestionDomains,
      secondLevelDomains: suggestionSecondLevelDomains,
      topLevelDomains: suggestionTopLevelDomains,
      suggested: (suggestion) => {
        currentSuggestion = suggestion.full;
        suggestionButton.textContent = `Meinten Sie ${suggestion.full}?`;
        suggestionButton.hidden = false;
      },
      empty: hideSuggestion,
    });
  };

  const sanitizeEmail = () => {
    const sanitized = emailInput.value.replace(/\s+/g, "");

    if (sanitized !== emailInput.value) {
      emailInput.value = sanitized;
    }

    return sanitized;
  };

  const validateEmail = () => {
    const email = sanitizeEmail().trim();
    const isValid = emailPattern.test(email);

    emailInput.value = email;
    emailInput.setCustomValidity(isValid ? "" : errorMessage);

    return isValid;
  };

  suggestionButton?.addEventListener("click", () => {
    if (!currentSuggestion) {
      return;
    }

    emailInput.value = currentSuggestion;
    hideSuggestion();
    validateEmail();
    emailInput.focus();
  });

  emailInput.addEventListener("beforeinput", (event) => {
    if (typeof event.data === "string" && /\s/.test(event.data)) {
      event.preventDefault();
    }
  });

  emailInput.addEventListener("input", () => {
    hideSuggestion();

    if (emailInput.value.trim() === "") {
      emailInput.setCustomValidity("");
      return;
    }

    validateEmail();
  });

  emailInput.addEventListener("blur", () => {
    validateEmail();
    checkSuggestion();
  });

  emailInput.form?.addEventListener("submit", (event) => {
    if (!validateEmail()) {
      event.preventDefault();
      emailInput.reportValidity();
      emailInput.focus();
    }
  });
}

function initPhoneValidation() {
  const phoneInput = document.querySelector("[data-phone-input]");
  const normalizedInput = document.querySelector("[data-phone-normalized-input]");

  if (!phoneInput) {
    return;
  }

  const errorMessage = "Bitte geben Sie eine gültige deutsche Telefonnummer ein.";
  const phonePlugin = typeof window.intlTelInput === "function"
    ? window.intlTelInput(phoneInput, {
      initialCountry: "de",
      separateDialCode: true,
      strictMode: true,
      formatAsYouType: true,
      formatOnDisplay: true,
      autoPlaceholder: "aggressive",
      countrySearch: false,
      loadUtils: () => import("/assets/vendor/intl-tel-input/js/utils.js"),
    })
    : null;

  // The country list scrolls internally (max-height), but Lenis hijacks the
  // wheel globally and scrolls the page instead. Mark the generated dropdown so
  // Lenis ignores wheel events over it (same fix as the service dropdown list).
  if (phonePlugin) {
    phoneInput
      .closest(".iti")
      ?.querySelector(".iti__dropdown-content")
      ?.setAttribute("data-lenis-prevent", "");
  }

  const validatePhone = () => {
    const hasValue = phoneInput.value.trim().length > 0;
    const isValid = phonePlugin ? phonePlugin.isValidNumber() : phoneInput.checkValidity();
    const normalizedPhone = phonePlugin && isValid ? phonePlugin.getNumber() : "";

    phoneInput.setCustomValidity(hasValue && isValid ? "" : errorMessage);
    phoneInput.dataset.normalizedPhone = normalizedPhone || "";

    if (normalizedInput) {
      normalizedInput.value = normalizedPhone || "";
    }

    return hasValue && Boolean(isValid);
  };

  phoneInput.addEventListener("input", () => {
    if (phoneInput.value.trim() === "") {
      phoneInput.setCustomValidity("");
      phoneInput.dataset.normalizedPhone = "";
      if (normalizedInput) {
        normalizedInput.value = "";
      }
      return;
    }

    validatePhone();
  });

  phoneInput.addEventListener("blur", validatePhone);
  phoneInput.addEventListener("countrychange", validatePhone);

  phonePlugin?.promise?.then(() => {
    if (phoneInput.value.trim()) {
      validatePhone();
    }
  }).catch(() => {});

  phoneInput.form?.addEventListener("submit", (event) => {
    if (!validatePhone()) {
      event.preventDefault();
      phoneInput.reportValidity();
      phoneInput.focus();
    }
  });
}

function initFaq() {
  const faqElement = document.querySelector("[data-faq]");

  if (!faqElement) {
    return;
  }

  const items = Array.from(faqElement.querySelectorAll(".faq-item"));

  const setItemState = (item, isOpen) => {
    const trigger = item.querySelector(".faq-item__trigger");
    const panel = item.querySelector(".faq-item__panel");

    if (!trigger || !panel) {
      return;
    }

    item.classList.toggle("is-open", isOpen);
    trigger.setAttribute("aria-expanded", String(isOpen));
    panel.style.setProperty("--faq-panel-height", `${panel.scrollHeight}px`);
  };

  const syncPanelHeights = () => {
    items.forEach((item) => {
      const panel = item.querySelector(".faq-item__panel");

      if (panel) {
        panel.style.setProperty("--faq-panel-height", `${panel.scrollHeight}px`);
      }
    });
  };

  items.forEach((item) => {
    const trigger = item.querySelector(".faq-item__trigger");

    setItemState(item, false);

    trigger?.addEventListener("click", () => {
      const shouldOpen = trigger.getAttribute("aria-expanded") !== "true";

      items.forEach((currentItem) => {
        setItemState(currentItem, currentItem === item && shouldOpen);
      });
    });
  });

  window.addEventListener("resize", syncPanelHeights);
}
