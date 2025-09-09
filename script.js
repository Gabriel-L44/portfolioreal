const svg = document.getElementById("portfolio-map");
const panel = document.getElementById("project-panel");
const title = document.getElementById("project-title");
const content = document.getElementById("project-content");
const closeBtn = document.getElementById("close-panel");
const backBtn = document.getElementById("back-btn");

// Données projets
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

// Valeur initiale du viewBox
const initialViewBox = "0 0 406.4 270.93";
svg.setAttribute("viewBox", initialViewBox);

// Fonction de zoom fluide
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
  const duration = 40;

  function animate() {
    step++;
    const t = step / duration;
    const ease = t * (2 - t); // easing out
    svg.setAttribute(
      "viewBox",
      `${startX + (x - startX) * ease} 
       ${startY + (y - startY) * ease} 
       ${startW + (w - startW) * ease} 
       ${startH + (h - startH) * ease}`
    );
    if (step < duration) requestAnimationFrame(animate);
  }
  animate();
}

// Clic sur région
svg.querySelectorAll(".region").forEach(region => {
  region.addEventListener("click", () => {
    const id = region.id;
    if (projects[id]) {
      zoomOnElement(region);
      title.textContent = projects[id].title;
      content.innerHTML = projects[id].content;
      panel.classList.remove("hidden");
      backBtn.classList.remove("hidden");
    }
  });
});

// Bouton retour
backBtn.addEventListener("click", () => {
  svg.setAttribute("viewBox", initialViewBox);
  panel.classList.add("hidden");
  backBtn.classList.add("hidden");
});

// Fermeture panneau
closeBtn.addEventListener("click", () => {
  panel.classList.add("hidden");
});

// ✅ Parallaxe (quand pas zoomé)
document.addEventListener("mousemove", (e) => {
  if (backBtn.classList.contains("hidden")) {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    svg.style.transform = `translate(${x}px, ${y}px) scale(1)`;
  }
});
