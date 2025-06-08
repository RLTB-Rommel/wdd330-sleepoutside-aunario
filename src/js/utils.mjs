export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<span>${message}</span><span class="close-btn" style="float:right;cursor:pointer;">✖</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.classList.contains("close-btn") || e.target.innerText === "✖") {
      alert.remove();
    }
  });

  const container = document.getElementById("alert-container") || document.querySelector("main");

  // Remove existing alerts before showing a new one
  container.querySelectorAll(".alert").forEach(alert => alert.remove());

  container.prepend(alert);
  if (scroll) window.scrollTo(0, 0);
}