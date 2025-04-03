const map = L.map('map').setView([51.3, -0.1], 9);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let marker;
let pathLine = [];

function fetchLiveData() {
  fetch('https://api.adsb.lol/v2/hex/ac6b00')
    .then(res => res.json())
    .then(data => {
      const a = data.ac[0]; // first aircraft in result

      const lat = a.lat;
      const lon = a.lon;
      const alt = a.alt_baro || 0;
      const speed = a.gs || 0;
      const time = new Date().toISOString();

      const latlng = [lat, lon];

      if (!marker) {
        marker = L.marker(latlng).addTo(map);
      } else {
        marker.setLatLng(latlng);
      }

      pathLine.push(latlng);
      L.polyline(pathLine, { color: 'red' }).addTo(map);
      map.setView(latlng, 11);

      // Update log
      const log = document.getElementById('log-entries');
      const li = document.createElement('li');
      li.innerText = `${time} — Lat: ${lat.toFixed(3)}, Lon: ${lon.toFixed(3)}, Alt: ${alt} ft, Speed: ${speed} kts`;
      log.prepend(li);

      document.getElementById('last-update').innerText = `Last updated: ${new Date().toLocaleTimeString()}`;
    })
    .catch(err => {
      console.error('Error fetching data', err);
    });
}

fetchLiveData();
setInterval(fetchLiveData, 30000);
