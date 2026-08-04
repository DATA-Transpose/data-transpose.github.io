(() => {
  const container = document.querySelector("[data-visitor-map]");
  if (!container) return;

  const status = document.querySelector("[data-visitor-status]");
  const total = document.querySelector("[data-visitor-total]");
  const map = L.map(container, {
    worldCopyJump: true,
    minZoom: 1,
    maxZoom: 8,
    scrollWheelZoom: false,
  }).setView([18, 10], 1);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const countryNames = typeof Intl.DisplayNames === "function"
    ? new Intl.DisplayNames([document.documentElement.lang || "en"], { type: "region" })
    : null;

  const render = (stats) => {
    total.textContent = Number(stats.total || 0).toLocaleString();
    Object.values(stats.locations || {}).forEach((location) => {
      if (!Number.isFinite(location.latitude) || !Number.isFinite(location.longitude)) return;
      const radius = Math.min(34, 8 + Math.log2(location.count + 1) * 4);
      const country = countryNames?.of(location.country) || location.country;
      L.circleMarker([location.latitude, location.longitude], {
        radius,
        color: "#006b86",
        weight: 2,
        fillColor: "#00a6c8",
        fillOpacity: 0.72,
      })
        .bindTooltip(`${location.city}, ${country}: ${location.count.toLocaleString()} visit${location.count === 1 ? "" : "s"}`)
        .addTo(map);
    });
    status.textContent = "Approximate locations are aggregated; raw IP addresses are not stored.";
  };

  const countThisSession = sessionStorage.getItem("dt-visit-counted") !== "yes";
  fetch("/api/visitor-stats", { method: countThisSession ? "POST" : "GET" })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (countThisSession) sessionStorage.setItem("dt-visit-counted", "yes");
      return response.json();
    })
    .then(render)
    .catch(() => {
      status.textContent = "Visitor map statistics are unavailable in this preview.";
      container.classList.add("is-unavailable");
    });
})();
