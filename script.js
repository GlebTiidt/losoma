const GA_MEASUREMENT_ID = "G-QPX35L2ZGK";
const RECAPTCHA_SITE_KEY = "6LeN1GAtAAAAAH7KhsyHhWqNCROF5la2DSA2mfJw";
const RECAPTCHA_ACTION = "contact";
const RECAPTCHA_HOSTNAMES = new Set(["losoma.de", "www.losoma.de"]);
const COOKIE_CONSENT_STORAGE_KEY = "losoma_cookie_consent";
const COOKIE_CONSENT_VERSION = 1;
let isGoogleAnalyticsLoaded = false;
let recaptchaScriptPromise = null;

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

function loadRecaptcha() {
  if (!RECAPTCHA_HOSTNAMES.has(window.location.hostname)) {
    return Promise.resolve(null);
  }

  if (window.grecaptcha) {
    return Promise.resolve(window.grecaptcha);
  }

  if (!recaptchaScriptPromise) {
    recaptchaScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");

      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_SITE_KEY)}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.grecaptcha);
      script.onerror = () => reject(new Error("recaptcha_load"));
      document.head.append(script);
    });
  }

  return recaptchaScriptPromise;
}

async function getRecaptchaToken() {
  const recaptcha = await loadRecaptcha();

  if (!recaptcha) {
    return "";
  }

  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("recaptcha_timeout")), 10000);

    recaptcha.ready(() => {
      recaptcha.execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION })
        .then((token) => {
          window.clearTimeout(timeout);

          if (!token) {
            reject(new Error("recaptcha_empty"));
            return;
          }

          resolve(token);
        })
        .catch((error) => {
          window.clearTimeout(timeout);
          reject(error);
        });
    });
  });
}

gtag("consent", "default", {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
});

document.addEventListener("DOMContentLoaded", () => {
  initFirstVisitLoader();
  initCurrentYear();
  initSmoothScroll();
  initCookieConsent();
  initAnalyticsEventTracking();
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
  initContactFormSubmit();
  initFaq();
});

function initFirstVisitLoader() {
  const root = document.documentElement;
  const loader = document.querySelector("[data-site-loader]");

  if (!loader || !root.classList.contains("has-first-visit-loader")) {
    return;
  }

  try {
    sessionStorage.setItem("losoma_intro_seen", "true");
  } catch {
    // The loader still works when storage is unavailable; it may reappear next time.
  }

  const video = document.querySelector(".hero_video");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const minimumDuration = reduceMotion ? 0 : 900;
  const startedAt = performance.now();
  let isReleaseScheduled = false;
  let fallbackTimer = 0;

  const removeLoader = () => {
    root.classList.remove("has-first-visit-loader");
    loader.remove();
  };

  const releaseLoader = () => {
    if (isReleaseScheduled) {
      return;
    }

    isReleaseScheduled = true;
    window.clearTimeout(fallbackTimer);

    const remainingDelay = Math.max(0, minimumDuration - (performance.now() - startedAt));

    window.setTimeout(() => {
      loader.classList.add("is-leaving");
      loader.addEventListener("transitionend", removeLoader, { once: true });
      window.setTimeout(removeLoader, 500);
    }, remainingDelay);
  };

  if (reduceMotion || !video || video.error || video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
    releaseLoader();
    return;
  }

  video.addEventListener("canplay", releaseLoader, { once: true });
  video.addEventListener("error", releaseLoader, { once: true });
  fallbackTimer = window.setTimeout(releaseLoader, 4500);
}

function initCookieConsent() {
  const elements = createCookieConsentElements();
  const savedConsent = readCookieConsent();

  document.body.appendChild(elements.root);

  const openSettings = () => openCookiePanel(elements, "settings");
  elements.floatingButton.addEventListener("click", openSettings);

  elements.rejectButton.addEventListener("click", () => saveCookieConsent(false, elements));
  elements.acceptButton.addEventListener("click", () => saveCookieConsent(true, elements));
  elements.settingsButton.addEventListener("click", () => openCookiePanel(elements, "settings"));
  elements.settingsAcceptButton.addEventListener("click", () => saveCookieConsent(true, elements));
  elements.saveSelectionButton.addEventListener("click", () => saveCookieConsent(elements.statisticsInput.checked, elements));

  if (savedConsent) {
    applyCookieConsent(savedConsent);
    elements.floatingButton.hidden = false;
    return;
  }

  openCookiePanel(elements, "intro");
}

function createCookieConsentElements() {
  const root = document.createElement("section");
  root.className = "cookie-consent";
  root.setAttribute("aria-label", "Cookie-Einstellungen");

  root.innerHTML = `
    <div class="cookie-consent_backdrop" aria-hidden="true"></div>
    <div class="cookie-consent_panel" role="dialog" aria-modal="false" aria-hidden="true" aria-labelledby="cookie-consent-title">
      <div class="cookie-consent_view is-intro" data-cookie-view="intro">
        <div class="cookie-consent_header">
          <h2 class="cookie-consent_title" id="cookie-consent-title">Ihre Privatsphäre ist uns wichtig</h2>
          <p class="cookie-consent_text">Wir nutzen notwendige Cookies. Google Analytics verwenden wir nur mit Ihrer Einwilligung. Mehr dazu in unserer <a href="/datenschutz">Datenschutzerklärung</a>.</p>
        </div>
        <div class="cookie-consent_actions">
          <button class="cookie-consent_button is-secondary" type="button" data-cookie-reject>Alle ablehnen</button>
          <button class="cookie-consent_button is-primary" type="button" data-cookie-accept>Alle akzeptieren</button>
        </div>
        <button class="cookie-consent_settings" type="button" data-cookie-settings>Einstellungen</button>
      </div>

      <div class="cookie-consent_view is-settings" data-cookie-view="settings" aria-labelledby="cookie-settings-title">
        <div class="cookie-consent_header is-settings">
          <h2 class="cookie-consent_title" id="cookie-settings-title">Cookie-Einstellungen</h2>
          <p class="cookie-consent_text">Hier können Sie festlegen, welche Dienste wir verwenden dürfen.</p>
        </div>

        <div class="cookie-consent_option">
          <div class="cookie-consent_option-copy">
            <div class="cookie-consent_option-heading">
              <h3>Notwendige Cookies</h3>
              <span>Immer aktiv</span>
            </div>
            <p>Diese Cookies sind für den Betrieb der Website und die Speicherung Ihrer Cookie-Auswahl erforderlich.</p>
          </div>
          <label class="cookie-toggle is-disabled" aria-label="Notwendige Cookies sind immer aktiv">
            <input type="checkbox" checked disabled>
            <span class="cookie-toggle_track" aria-hidden="true"></span>
          </label>
        </div>

        <div class="cookie-consent_option">
          <div class="cookie-consent_option-copy">
            <h3>Statistik</h3>
            <p>Google Analytics hilft uns zu verstehen, wie unsere Website genutzt wird. Die Auswertung erfolgt nur mit Ihrer Einwilligung.</p>
          </div>
          <label class="cookie-toggle" aria-label="Google Analytics erlauben">
            <input type="checkbox" data-cookie-statistics>
            <span class="cookie-toggle_track" aria-hidden="true"></span>
          </label>
        </div>

        <div class="cookie-consent_actions is-settings">
          <button class="cookie-consent_button is-secondary" type="button" data-cookie-save>Auswahl speichern</button>
          <button class="cookie-consent_button is-primary" type="button" data-cookie-settings-accept>Alle akzeptieren</button>
        </div>
      </div>
    </div>

    <button class="cookie-consent_floating" type="button" aria-label="Cookie-Einstellungen öffnen" hidden>
      <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true" focusable="false">
        <path d="M20 35.8333C17.81 35.8333 15.7517 35.4178 13.825 34.5867C11.8983 33.7556 10.2228 32.6278 8.79832 31.2033C7.37388 29.7789 6.24555 28.1028 5.41333 26.175C4.5811 24.2472 4.16555 22.1889 4.16666 20C4.16666 17.8522 4.57999 15.8211 5.40666 13.9067C6.23333 11.9922 7.35833 10.3089 8.78166 8.85667C10.205 7.40444 11.8717 6.25278 13.7817 5.40167C15.6917 4.55056 17.7272 4.125 19.8883 4.125C20.3128 4.125 20.7472 4.14167 21.1917 4.175C21.6361 4.21056 22.0817 4.26556 22.5283 4.34C22.4505 5.59 22.6033 6.72222 22.9867 7.73667C23.3722 8.75222 23.9389 9.61722 24.6867 10.3317C25.4344 11.0461 26.3417 11.5794 27.4083 11.9317C28.475 12.285 29.6628 12.435 30.9717 12.3817C30.6339 14.0206 30.9783 15.4939 32.005 16.8017C33.0317 18.1094 34.3017 18.8656 35.815 19.07L35.8283 19.2683C35.8317 19.3294 35.8333 19.395 35.8333 19.465C35.8333 21.7061 35.4155 23.8172 34.58 25.7983C33.7444 27.7806 32.6105 29.5167 31.1783 31.0067C29.745 32.4956 28.0694 33.6722 26.1517 34.5367C24.2317 35.4011 22.1811 35.8333 20 35.8333ZM17.5167 16.3467C18.1144 16.3467 18.6244 16.13 19.0467 15.6967C19.4689 15.2633 19.68 14.7478 19.68 14.15C19.68 13.5522 19.4678 13.0422 19.0433 12.62C18.6189 12.1978 18.1044 11.9867 17.5 11.9867C16.9122 11.9867 16.4022 12.1989 15.97 12.6233C15.5378 13.0478 15.3211 13.5622 15.32 14.1667C15.32 14.7544 15.5367 15.2644 15.97 15.6967C16.4033 16.1289 16.9183 16.3456 17.515 16.3467M14.1817 24.68C14.7805 24.68 15.2911 24.4633 15.7133 24.03C16.1355 23.5967 16.3467 23.0817 16.3467 22.485C16.3467 21.8883 16.1344 21.3778 15.71 20.9533C15.2855 20.5289 14.7711 20.3178 14.1667 20.32C13.5789 20.32 13.0689 20.5322 12.6367 20.9567C12.2044 21.3811 11.9878 21.8956 11.9867 22.5C11.9867 23.0878 12.2033 23.5978 12.6367 24.03C13.07 24.4622 13.5855 24.6789 14.1833 24.68M25.0167 26.3467C25.3922 26.3467 25.7078 26.2133 25.9633 25.9467C26.2189 25.68 26.3467 25.3594 26.3467 24.985C26.3467 24.6106 26.2178 24.2944 25.96 24.0367C25.7011 23.7811 25.3811 23.6533 25 23.6533C24.6344 23.6533 24.3189 23.7828 24.0533 24.0417C23.7878 24.3006 23.6544 24.62 23.6533 25C23.6533 25.3656 23.7867 25.6811 24.0533 25.9467C24.32 26.2122 24.6411 26.3456 25.0167 26.3467ZM20.0067 34.1667C23.5955 34.1667 26.7789 32.8667 29.5567 30.2667C32.3378 27.6667 33.8639 24.3683 34.135 20.3717C32.6605 19.7828 31.5111 18.9494 30.6867 17.8717C29.8622 16.7939 29.3761 15.4961 29.2283 13.9783C26.9394 13.7783 25.0255 12.9578 23.4867 11.5167C21.9478 10.0756 21.105 8.17778 20.9583 5.82333C18.8428 5.68222 16.865 5.97833 15.025 6.71167C13.185 7.445 11.5844 8.47444 10.2233 9.8C8.86221 11.1256 7.78999 12.6756 7.00666 14.45C6.22333 16.2244 5.83221 18.0744 5.83333 20C5.83333 23.9078 7.21721 27.2461 9.98499 30.015C12.7539 32.7828 16.0944 34.1667 20.0067 34.1667Z" fill="currentColor"/>
      </svg>
    </button>
  `;

  return {
    root,
    panel: root.querySelector(".cookie-consent_panel"),
    acceptButton: root.querySelector("[data-cookie-accept]"),
    rejectButton: root.querySelector("[data-cookie-reject]"),
    settingsButton: root.querySelector("[data-cookie-settings]"),
    settingsAcceptButton: root.querySelector("[data-cookie-settings-accept]"),
    saveSelectionButton: root.querySelector("[data-cookie-save]"),
    statisticsInput: root.querySelector("[data-cookie-statistics]"),
    floatingButton: root.querySelector(".cookie-consent_floating"),
  };
}

function openCookiePanel(elements, view) {
  const isSettings = view === "settings";
  const currentConsent = readCookieConsent();

  if (isSettings) {
    elements.root.classList.add("is-syncing");
    elements.statisticsInput.checked = Boolean(currentConsent?.statistics);
  }

  elements.root.classList.add("is-open");
  elements.root.classList.toggle("is-settings", isSettings);
  elements.panel.setAttribute("aria-hidden", "false");
  elements.floatingButton.hidden = true;
  document.body.classList.add("is-cookie-panel-open");

  const focusTarget = isSettings ? elements.statisticsInput : elements.rejectButton;
  window.requestAnimationFrame(() => {
    focusTarget.focus();
    window.requestAnimationFrame(() => elements.root.classList.remove("is-syncing"));
  });
}

function closeCookiePanel(elements) {
  elements.root.classList.remove("is-open", "is-settings", "is-syncing");
  elements.panel.setAttribute("aria-hidden", "true");
  elements.floatingButton.hidden = false;
  document.body.classList.remove("is-cookie-panel-open");
}

function saveCookieConsent(statistics, elements) {
  const consent = {
    version: COOKIE_CONSENT_VERSION,
    necessary: true,
    statistics: Boolean(statistics),
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent));
  applyCookieConsent(consent);
  closeCookiePanel(elements);
}

function readCookieConsent() {
  try {
    const rawConsent = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    const consent = rawConsent ? JSON.parse(rawConsent) : null;

    if (!consent || consent.version !== COOKIE_CONSENT_VERSION || consent.necessary !== true) {
      return null;
    }

    return consent;
  } catch {
    return null;
  }
}

function applyCookieConsent(consent) {
  const hasStatisticsConsent = Boolean(consent?.statistics);

  gtag("consent", "update", {
    analytics_storage: hasStatisticsConsent ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  if (hasStatisticsConsent) {
    loadGoogleAnalytics();
  } else {
    deleteGoogleAnalyticsCookies();
  }
}

function loadGoogleAnalytics() {
  if (isGoogleAnalyticsLoaded) {
    return;
  }

  isGoogleAnalyticsLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
}

function deleteGoogleAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  const hostname = window.location.hostname;
  const domainParts = hostname.split(".");
  const domains = new Set(["", hostname]);

  if (domainParts.length > 1) {
    domains.add(`.${domainParts.slice(-2).join(".")}`);
  }

  cookieNames.forEach((name) => {
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ""}`;
    });
  });
}

function sendAnalyticsEvent(eventName, parameters = {}) {
  const consent = readCookieConsent();

  if (!consent?.statistics || !isGoogleAnalyticsLoaded) {
    return;
  }

  gtag("event", eventName, {
    ...parameters,
    send_to: GA_MEASUREMENT_ID,
    transport_type: "beacon",
  });
}

function initCurrentYear() {
  const yearElement = document.querySelector("[data-current-year]");

  if (!yearElement) {
    return;
  }

  yearElement.textContent = String(new Date().getFullYear());
}

function initHeroVideo() {
  const video = document.querySelector(".hero_video");

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
  // Pages without a hero (e.g. /kontakt, /impressum) carry `.is-solid-header`,
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

  const previousButton = document.querySelector(".services-slider_arrow.is-prev");
  const nextButton = document.querySelector(".services-slider_arrow.is-next");
  const serviceCards = Array.from(sliderElement.querySelectorAll(".service-catalog-card"));
  const sliderTrack = sliderElement.querySelector(".service-list_track");
  const sliderList = sliderElement.querySelector(".service-list_list");
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

  const previousButton = document.querySelector(".customer-review_arrow.is-prev");
  const nextButton = document.querySelector(".customer-review_arrow.is-next");
  const authorElement = document.querySelector("[data-review-author]");
  const slides = Array.from(sliderElement.querySelectorAll(".customer-review_slide"));
  const sliderTrack = sliderElement.querySelector(".customer-review_track");
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
      createAuthorSpan("customer-review_author-current", author),
    );
    authorElement.classList.remove("is-changing");
  };

  const setReviewAuthor = (author, shouldAnimate = true) => {
    if (!authorElement || !author) {
      return;
    }

    const currentAuthor = authorElement.querySelector(".customer-review_author-current")?.textContent?.trim()
      || authorElement.textContent.trim();

    if (currentAuthor === author && !authorElement.classList.contains("is-changing")) {
      return;
    }

    if (!shouldAnimate) {
      setAuthorCollapsed(author);
      return;
    }

    authorElement.replaceChildren(
      createAuthorSpan("customer-review_author-current", currentAuthor || author),
      createAuthorSpan("customer-review_author-next", author, true),
    );

    const nextSpan = authorElement.querySelector(".customer-review_author-next");

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

  dropdown.closest("form")?.addEventListener("reset", () => {
    window.setTimeout(() => {
      input.value = "";
      label.textContent = "Welche Leistung benötigen Sie? *";
      toggle.classList.remove("is-selected");
      dropdown.classList.remove("is-invalid");

      options.forEach((option) => {
        option.classList.remove("is-selected");
        option.setAttribute("aria-selected", "false");
      });
    }, 0);
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
      // Keep native paste available for contacts, password managers and assistive
      // tools. The plugin and server still validate the complete number.
      strictMode: false,
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

function initContactFormSubmit() {
  const form = document.querySelector("[data-contact-form]");

  if (!form) {
    return;
  }

  const submitButton = form.querySelector(".contact-form_submit");
  const submitLabel = submitButton?.querySelector("span:last-child");
  const statusElement = form.querySelector("[data-contact-form-status]");
  let successPanel = form.parentElement?.querySelector("[data-contact-form-success]");
  const defaultSubmitText = submitLabel?.textContent || "Anfrage senden";

  if (RECAPTCHA_HOSTNAMES.has(window.location.hostname)) {
    const recaptchaNotice = document.createElement("p");

    recaptchaNotice.className = "contact-form_recaptcha-notice";
    recaptchaNotice.innerHTML = `Diese Website ist durch reCAPTCHA geschützt. Es gelten die <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Datenschutzerklärung</a> und <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Nutzungsbedingungen</a> von Google.`;

    if (statusElement) {
      statusElement.insertAdjacentElement("beforebegin", recaptchaNotice);
    } else {
      form.append(recaptchaNotice);
    }
  }

  if (!successPanel) {
    successPanel = document.createElement("div");
    successPanel.className = "contact-form_success";
    successPanel.hidden = true;
    successPanel.tabIndex = -1;
    successPanel.setAttribute("role", "status");
    successPanel.setAttribute("aria-live", "polite");
    successPanel.setAttribute("data-contact-form-success", "");
    successPanel.innerHTML = "<p>Danke, Ihre Anfrage wurde gesendet. Wir melden uns zeitnah.</p>";
    form.insertAdjacentElement("afterend", successPanel);
  }

  const setStatus = (message, state = "") => {
    if (!statusElement) {
      return;
    }

    statusElement.textContent = message;
    statusElement.dataset.state = state;
  };

  const setSubmitting = (isSubmitting) => {
    form.dataset.isSubmitting = isSubmitting ? "true" : "false";

    if (submitButton) {
      submitButton.disabled = isSubmitting;
      submitButton.setAttribute("aria-busy", String(isSubmitting));
    }

    if (submitLabel) {
      submitLabel.textContent = isSubmitting ? "Wird gesendet..." : defaultSubmitText;
    }
  };

  form.addEventListener("submit", async (event) => {
    if (event.defaultPrevented || form.dataset.isSubmitting === "true") {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    setSubmitting(true);
    setStatus("", "");

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || formData.get("phone_display") || "",
      phone_display: formData.get("phone_display") || "",
      service: formData.get("service") || "",
      message: formData.get("message") || "",
      company_website: formData.get("company_website") || "",
      privacy_consent: formData.get("privacy_consent") === "yes",
      source_path: window.location.pathname,
    };

    sendAnalyticsEvent("form_submit", {
      form_id: form.id || "contact_form",
      form_location: window.location.pathname,
      service: String(payload.service || ""),
    });

    try {
      payload.recaptcha_token = await getRecaptchaToken();

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 429) {
        throw new Error("rate_limit");
      }

      if (response.status === 409) {
        throw new Error("duplicate");
      }

      if (!response.ok) {
        throw new Error("delivery");
      }

      const formHeight = Math.ceil(form.getBoundingClientRect().height);

      form.reset();

      if (successPanel) {
        successPanel.style.minHeight = `${formHeight}px`;
        form.hidden = true;
        successPanel.hidden = false;
        successPanel.focus({ preventScroll: true });
      } else {
        setStatus("Danke, Ihre Anfrage wurde gesendet. Wir melden uns zeitnah.", "success");
      }

      sendAnalyticsEvent("form_success", {
        form_id: form.id || "contact_form",
        form_location: window.location.pathname,
      });
    } catch (error) {
      const message = error.message === "rate_limit"
        ? "Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut."
        : error.message === "duplicate"
          ? "Diese Anfrage wurde bereits gesendet."
          : "Die Anfrage konnte nicht gesendet werden. Bitte schreiben Sie uns direkt an maxim@losoma.de.";

      setStatus(message, "error");
      sendAnalyticsEvent("form_error", {
        form_id: form.id || "contact_form",
        form_location: window.location.pathname,
        error_type: error.message || "delivery",
      });
    } finally {
      setSubmitting(false);
    }
  });
}

function initAnalyticsEventTracking() {
  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    let hasStarted = false;
    const trackFormStart = () => {
      if (hasStarted) {
        return;
      }

      hasStarted = true;
      sendAnalyticsEvent("form_start", {
        form_id: form.id || "contact_form",
        form_location: window.location.pathname,
      });
    };

    form.addEventListener("input", trackFormStart, { once: true });
    form.addEventListener("change", trackFormStart, { once: true });
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");

    if (!link) {
      return;
    }

    const href = link.getAttribute("href") || "";
    const linkText = link.textContent.trim().replace(/\s+/g, " ");

    if (href.startsWith("tel:")) {
      sendAnalyticsEvent("phone_click", {
        link_url: href,
        link_text: linkText,
      });
      return;
    }

    if (href.startsWith("mailto:")) {
      sendAnalyticsEvent("email_click", {
        link_url: href,
        link_text: linkText,
      });
      return;
    }

    if (href === "/kontakt" || href.endsWith("/kontakt")) {
      sendAnalyticsEvent("cta_click", {
        link_url: href,
        link_text: linkText,
        page_path: window.location.pathname,
      });
      return;
    }

    const url = new URL(link.href, window.location.href);

    if (url.hostname !== window.location.hostname) {
      sendAnalyticsEvent("outbound_click", {
        link_url: url.href,
        link_text: linkText,
      });
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
    const trigger = item.querySelector(".faq-item_trigger");
    const panel = item.querySelector(".faq-item_panel");

    if (!trigger || !panel) {
      return;
    }

    item.classList.toggle("is-open", isOpen);
    trigger.setAttribute("aria-expanded", String(isOpen));
    panel.style.setProperty("--faq-panel-height", `${panel.scrollHeight}px`);
  };

  const syncPanelHeights = () => {
    items.forEach((item) => {
      const panel = item.querySelector(".faq-item_panel");

      if (panel) {
        panel.style.setProperty("--faq-panel-height", `${panel.scrollHeight}px`);
      }
    });
  };

  items.forEach((item) => {
    const trigger = item.querySelector(".faq-item_trigger");

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
