const svg = document.getElementById("portfolio-map"); 
const panel = document.getElementById("project-panel");
const title = document.getElementById("project-title");
const content = document.getElementById("project-content");
const closeBtn = document.getElementById("close-panel");
const pages = document.querySelectorAll(".project-page");
const backBtns = document.querySelectorAll(".back-btn");

// Quand on clique sur une zone
svg.querySelectorAll(".region").forEach(region => {
  region.addEventListener("click", () => {
    const id = region.id;
    const page = document.getElementById("page-" + id);
    if (page) {
      document.querySelector(".map-container").classList.add("hidden");
      page.classList.remove("hidden");
    }
  });
});

// Boutons retour
backBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    pages.forEach(p => p.classList.add("hidden"));
    document.querySelector(".map-container").classList.remove("hidden");
  });
});

// Données projets par zone (adapter les textes à ton portfolio)
const projects = {
  ville: { 
    title: "Ville futuriste", 
    content: "<p>Projets modernes et technologiques.</p>" 
  },
  ruines: { 
    title: "Ruines antiques", 
    content: "<p>Projets expérimentaux et archives.</p>" 
  },
  foret: { 
    title: "Forêt créative", 
    content: "<p>Mes projets artistiques et immersifs.</p>" 
  }
};

// Fonction d’animation du zoom
function zoomOnElement(el) {
  const bbox = el.getBBox();
  const padding = 20; // Ajuste selon rendu
  const x = bbox.x - padding;
  const y = bbox.y - padding;
  const w = bbox.width + 2 * padding;
  const h = bbox.height + 2 * padding;

  // valeurs actuelles
  let startX = svg.viewBox.baseVal.x;
  let startY = svg.viewBox.baseVal.y;
  let startW = svg.viewBox.baseVal.width;
  let startH = svg.viewBox.baseVal.height;

  let step = 0;
  const duration = 30; // frames
  function animate() {
    step++;
    const t = step / duration; // progression 0 → 1
    svg.setAttribute(
      "viewBox",
      `${startX + (x - startX) * t} 
       ${startY + (y - startY) * t} 
       ${startW + (w - startW) * t} 
       ${startH + (h - startH) * t}`
    );
    if (step < duration) requestAnimationFrame(animate);
  }
  animate();
}

// Gestion du click sur les régions
svg.querySelectorAll("path").forEach(region => {
  region.addEventListener("click", () => {
    const id = region.id;
    if (projects[id]) {
      zoomOnElement(region);
      title.textContent = projects[id].title;
      content.innerHTML = projects[id].content;
      panel.classList.remove("hidden");
    }
  });
});

// Fermeture panneau + reset zoom
closeBtn.addEventListener("click", () => {
  panel.classList.add("hidden");
  svg.setAttribute("viewBox", "0 0 406.4 270.93"); // Reset viewBox à la taille de ton SVG
});
