// Quand on clique sur une zone, on ouvre la page correspondante
document.querySelectorAll(".overlay-wrapper").forEach(zone => {
  zone.addEventListener("click", () => {
    const link = zone.getAttribute("data-link");
    if (link) {
      window.location.href = link; // Redirige vers la nouvelle page
    }
  });
});
