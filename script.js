const svg = document.getElementById("portfolio-map"); 
const panel = document.getElementById("project-panel");
const title = document.getElementById("project-title");
const content = document.getElementById("project-content");
const closeBtn = document.getElementById("close-panel");

// Données projets par zone (adapter les textes à ton portfolio)
const projects = {
  "ville-region": { 
    title: "Ville futuriste", 
    content: "<p>Projets modernes et technologiques.</p>" 
  },
  "ruines-region": { 
    title: "Ruines antiques", 
    content: "<p>Projets expérimentaux et archives.</p>" 
  },
  "village-region": { 
    title: "Village créatif", 
    content: "<p>Mes projets artistiques et immersifs.</p>" 
  }
};

// Fonction d’animation du zoom
function zoomOnElement(el) {
  const bbox = el.getBBox();
  const padding = 20; 
  const x = bbox.x - padding;
  const y = bbox.y - padding;
  const w = bbox.width + 2 * padding;
  const h = bbox.height + 2 * padding;

  let startX = svg.viewBox.baseVal.x;
  let startY = svg.viewBox.baseVal.y;
  let startW = svg.viewBox.baseVal.width;
  let startH = svg.viewBox.baseVal.height;

  let step = 0;
  const duration = 30; // frames
  function animate() {
    step++;
    const t = step / duration;
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
svg.querySelectorAll(".region").forEach(region => {
  region.addEventListener("click", () => {
    const id = region.id;
    if (projects[id]) {
      zoomOnElement(region);
      title.textContent = projects[id].title;
      content.innerHTML = projects[id].content;
      panel.classList.add("show");
    }
  });
});

// Fermeture panneau + reset zoom
closeBtn.addEventListener("click", () => {
  panel.classList.remove("show");
  svg.setAttribute("viewBox", "0 0 406.4 270.93"); // Reset viewBox
});
