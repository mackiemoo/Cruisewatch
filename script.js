// Simulated N9FJ data points (replace this with a live feed later)
const flightPath = [
  { lat: 51.106, lon: -0.198, alt: 450, speed: 75, time: "2025-04-03T15:21:00Z" },
  { lat: 51.183, lon: -0.12, alt: 725, speed: 92, time: "2025-04-03T15:24:00Z" },
  { lat: 51.271, lon: -0.072, alt: 950, speed: 110, time: "2025-04-03T15:27:00Z" },
  { lat: 51.487, lon: -0.164, alt: 580, speed: 60, time: "2025-04-03T15:32:00Z" }
];

const map = L.map('map').setView([51.3, -0.1], 9);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let marker = null;
let pathLine = [];

function updateMap() {
  const latest = flightPath[flightPath.length - 1];
  const latlng = [latest.lat, latest.lon];

  if (marker) {
    marker.setLatLng(latlng);
  } else {
    marker = L.marker(latlng).addTo(map);
  }

  pathLine.push(latlng);
  L.polyline(pathLine, { color: 'red' }).addTo(map);
  map.setView(latlng, 11);

  // Update last update time
  document.getElementById('last-update').innerText = `Last updated: ${new Date().toLocaleTimeString()}`;
}

function updateLog() {
  const logContainer = document.getElementById('log-entries');
  logContainer.innerHTML = '';

  flightPath.slice().reverse().forEach((point) => {
    const li = document.createElement('li');
    li.innerText = `${point.time} — Lat: ${point.lat.toFixed(3)}, Lon: ${point.lon.toFixed(3)}, Alt: ${point.alt} ft, Speed: ${point.speed} kts`;
    logContainer.appendChild(li);
  });
}

updateMap();
updateLog();
setInterval(() => {
  updateMap();
  updateLog();
}, 30000); // refresh every 30 seconds
