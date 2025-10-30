// Initialize the map
const map = L.map('map').setView([28.6139, 77.2090], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Custom icons
const pharmacyIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
  iconSize: [32, 32],
});

const aedIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2966/2966483.png',
  iconSize: [32, 32],
});

// Resource data
const resources = [
  {
    name: "CityCentral 24-Hour Pharmacy",
    coords: [28.6139, 77.2090],
    type: "Pharmacy",
    status: "Verified In-Person",
  },
  {
    name: "Downtown AED Station",
    coords: [28.6200, 77.2100],
    type: "AED",
    status: "Verified by Phone",
  },
  {
    name: "Metro Pharmacy",
    coords: [28.625, 77.218],
    type: "Pharmacy",
    status: "Verified by Website",
  },
  {
    name: "Park AED Unit",
    coords: [28.61, 77.215],
    type: "AED",
    status: "Verified In-Person",
  },
];

// Marker group for easy filtering
let allMarkers = [];

// Function to show markers
function showMarkers(filterType = "All") {
  // Clear existing markers
  allMarkers.forEach(m => map.removeLayer(m));
  allMarkers = [];

  resources.forEach((res) => {
    if (filterType === "All" || res.type === filterType) {
      const icon = res.type === "Pharmacy" ? pharmacyIcon : aedIcon;

      const marker = L.marker(res.coords, { icon }).addTo(map);
      marker.bindPopup(
        <b>${res.name}</b><br>
        Type: ${res.type}<br>
        Status: ${res.status}
      );

      allMarkers.push(marker);
    }
  });
}

// Initial load (show all)
showMarkers();

// Filter buttons
document.getElementById("show-all").addEventListener("click", () => {
  updateActiveButton("show-all");
  showMarkers("All");
});

document.getElementById("show-pharmacies").addEventListener("click", () => {
  updateActiveButton("show-pharmacies");
  showMarkers("Pharmacy");
});

document.getElementById("show-aeds").addEventListener("click", () => {
  updateActiveButton("show-aeds");
  showMarkers("AED");
});

// Highlight active button
function updateActiveButton(id) {
  document.querySelectorAll("#filter-buttons button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}