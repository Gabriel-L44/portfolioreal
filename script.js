const svg = document.getElementById("portfolio-map"); 
const panel = document.getElementById("project-panel");
const title = document.getElementById("project-title");
const content = document.getElementById("project-content");
const closeBtn = document.getElementById("close-panel");

// Données projets par zone
const projects = {
  "ville-region": { 
    title: "Ville futuriste", 
    cards: [
      { titre: "Projet 1", resume: "Un résumé rapide du projet 1 dans la ville." },
      { titre: "Projet 2", resume: "Présentation du projet 2 avec style high-tech." },
      { titre: "Projet 3", resume: "Petit aperçu du projet 3 dans cet univers urbain." }
    ]
  },
  "ruines-region": { 
    title: "Ruines antiques", 
    cards: [
      { titre: "Projet 1", resume: "Exploration des ruines et projet archéologique." },
      { titre: "Projet 2", resume: "Reconstitution 3D d’un site ancien." }
    ]
  },
  "village-region": { 
    title: "Village ancien", 
    cards: [
      { titre: "Projet 1", resume: "Vie quotidienne dans le village à travers le projet." },
      { titre: "Projet 2", resume: "Architecture traditionnelle et design visuel." },
      { titre: "Projet 3", resume: "Histoire racontée par des images interactives." }
    ]
  }
};

// Génère les cartes projets
function generateCards(cards) {
  return `
    <div class="projects">
      ${cards.map(c => `
        <div class="project-card">
          <h2>${c.titre}</h2>
          <p>${c.resume}</p>
        </div>
      `).join("")}
    </div>
  `;
}

// Animation de zoom
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
  const duration = 30;
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

// Clic sur les régions
svg.querySelectorAll("path").forEach(region => {
  region.addEventListener("click", () => {
    const id = region.id;
    if (projects[id]) {
      zoomOnElement(region);
      title.textContent = projects[id].title;
      content.innerHTML = generateCards(projects[id].cards);
      panel.classList.remove("hidden");
    }
  });
});

// Fermeture + reset zoom
closeBtn.addEventListener("click", () => {
  panel.classList.add("hidden");
  svg.setAttribute("viewBox", "0 0 406.4 270.93"); 
});
