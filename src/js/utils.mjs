// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// safely retrieve data from localStorage
export function getLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.warn(`[getLocalStorage] Failed to parse data for key: ${key}`, e);
    return null;
  }
}

// save data to localStorage
export function setLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`[setLocalStorage] Failed to save data for key: ${key}`, e);
  }
}

// clear key from localStorage
export function clearLocalStorageKey(key) {
  localStorage.removeItem(key);
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) return;

  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

// get a URL query parameter by name
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// render a list of items using a template function
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  if (clear) parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// load external header and footer HTML into current page
export function loadHeaderFooter() {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  fetch("/partials/header.html")
    .then((res) => {
      if (!res.ok) throw new Error("Header fetch failed");
      return res.text();
    })
    .then((html) => {
      if (header) header.innerHTML = html;
    })
    .catch((err) => console.warn("[Header Error]", err.message));

  fetch("/partials/footer.html")
    .then((res) => {
      if (!res.ok) throw new Error("Footer fetch failed");
      return res.text();
    })
    .then((html) => {
      if (footer) footer.innerHTML = html;
    })
    .catch((err) => console.warn("[Footer Error]", err.message));
}

// insert alert message into top of main content
export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<span>${message}</span><span class="close-btn" style="float:right;cursor:pointer;">✖</span>`;

  alert.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("close-btn") ||
      e.target.innerText === "✖"
    ) {
      alert.remove();
    }
  });

  const main = document.querySelector("main");
  if (main) {
    main.prepend(alert);
    if (scroll) window.scrollTo(0, 0);
  }
}