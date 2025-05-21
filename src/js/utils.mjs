// Selects a single element from the DOM
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from localStorage and parse it
export function getLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(`Error parsing localStorage item "${key}":`, err);
    return null;
  }
}

// Save JSON data to localStorage
export function setLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error setting localStorage item "${key}":`, err);
  }
}

// Set a click and touchend listener on an element
export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) {
    console.warn(`Element not found for selector: ${selector}`);
    return;
  }

  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });

  element.addEventListener("click", callback);
}

// Get a query string parameter by name from the URL
export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}