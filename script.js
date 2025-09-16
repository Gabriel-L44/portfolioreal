document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.querySelector(".map-container");
  const overlays = document.querySelectorAll(".overlay-wrapper"); // images cliquables
  const pages = document.querySelectorAll(".project-page");       // pages projets
  const backButtons = document.querySelectorAll(".back-btn");     // boutons retour

  // Fonction pour afficher une page
  function showPage(pageId) {
    // cacher la map
    mapContainer.style.display = "none";

    // cacher toutes les pages
    pages.forEach(page => page.classList.add("hidden"));

    // afficher la page demandée
    const page = document.getElementById(pageId);
    if (page) page.classList.remove("hidden");
  }

  // Fonction pour revenir à la map
  function showMap() {
    // cacher toutes les pages
    pages.forEach(page => page.classList.add("hidden"));

    // réafficher la map
    mapContainer.style.display = "block";
  }

  // Associer chaque overlay (ville, ruines, village) à sa page correspondante
  overlays.forEach(overlay => {
    overlay.addEventListener("click", () => {
      if (overlay.classList.contains("ville")) {
        showPage("page-ville");
      } else if (overlay.classList.contains("ruines")) {
        showPage("page-ruines");
      } else if (overlay.classList.contains("village")) {
        showPage("page-village");
      }
    });
  });

  // Boutons retour
  backButtons.forEach(btn => {
    btn.addEventListener("click", showMap);
  });
});
