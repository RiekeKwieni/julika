document.addEventListener("DOMContentLoaded", function() {
  const burgerButton = document.getElementById("burgerButton");
  const navLinks = document.getElementById("navLinks");

  if (!burgerButton || !navLinks) {
    return;
  }

  burgerButton.addEventListener("click", function() {
    const istOffen = navLinks.classList.toggle("open");

    burgerButton.classList.toggle("open", istOffen);
    burgerButton.setAttribute("aria-expanded", istOffen ? "true" : "false");
    burgerButton.setAttribute("aria-label", istOffen ? "Menue schliessen" : "Menue oeffnen");
  });
});
