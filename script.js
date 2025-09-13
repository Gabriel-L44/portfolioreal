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

// Gestion du clic sur les régions
svg.querySelectorAll("path").forEach(region => {
  region.addEventListener("click", () => {
    const id = region.id;

    // Ferme tous les containers avant d’ouvrir le bon
    villeC.classList.add("hidden");
    ruinesC.classList.add("hidden");
    villageC.classList.add("hidden");

    if (regionToContainer[id]) {
      zoomOnElement(region);
      regionToContainer[id].classList.remove("hidden");
    }
  });
});

// Quand on clique sur une zone, on ouvre la page correspondante
document.querySelectorAll(".overlay-wrapper").forEach(zone => {
  zone.addEventListener("click", () => {
    const link = zone.getAttribute("data-link");
    if (link) {
      window.location.href = link; // Redirige vers la nouvelle page
    }
  });
});
