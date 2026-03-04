const LOCALE_KEY = "gpt_voyager_locale";

const pageMap = {
  index: {
    en: "./index.html",
    zh: "./index.zh.html"
  },
  privacy: {
    en: "./privacy.html",
    zh: "./privacy.zh.html"
  }
};

function normalizeLocale(value) {
  return value === "zh" ? "zh" : "en";
}

function detectCurrentLocale() {
  return document.documentElement.lang.startsWith("zh") ? "zh" : "en";
}

function getStoredLocale() {
  try {
    return normalizeLocale(localStorage.getItem(LOCALE_KEY));
  } catch {
    return null;
  }
}

function setStoredLocale(locale) {
  try {
    localStorage.setItem(LOCALE_KEY, normalizeLocale(locale));
  } catch {
    // Ignore storage failures (e.g. privacy mode restrictions).
  }
}

function redirectToLocale(page, locale) {
  const targetPath = pageMap[page]?.[locale];
  if (!targetPath) {
    return;
  }

  const targetUrl = new URL(targetPath, window.location.href);
  targetUrl.search = window.location.search;
  targetUrl.hash = window.location.hash;

  if (targetUrl.pathname === window.location.pathname) {
    return;
  }

  window.location.replace(targetUrl.href);
}

function markActiveLocale(locale) {
  document.querySelectorAll(".lang-option").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.locale === locale);
  });
}

function initLanguageSwitch() {
  const page = document.documentElement.dataset.page;
  if (!page || !pageMap[page]) {
    return;
  }

  const currentLocale = detectCurrentLocale();
  const storedLocale = getStoredLocale();

  if (!storedLocale) {
    setStoredLocale(currentLocale);
  } else if (storedLocale !== currentLocale) {
    redirectToLocale(page, storedLocale);
    return;
  }

  markActiveLocale(currentLocale);

  document.querySelectorAll(".lang-option").forEach((link) => {
    link.addEventListener("click", (event) => {
      const nextLocale = normalizeLocale(link.dataset.locale);
      setStoredLocale(nextLocale);
      markActiveLocale(nextLocale);

      const href = link.getAttribute("href");
      if (!href) {
        return;
      }

      if (nextLocale === currentLocale) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      window.location.href = href;
    });
  });
}

initLanguageSwitch();
