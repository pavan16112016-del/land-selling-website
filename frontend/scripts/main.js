const API_URL = "http://localhost:5000/api/lands";

const featuredLands = document.getElementById("featuredLands");
const searchForm = document.getElementById("searchForm");
const locationInput = document.getElementById("location");
const landTypeSelect = document.getElementById("landType");

let allLands = [];

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function getImage(land) {
  const image = land.image || land.images?.[0];

  if (!image) {
    return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800";
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `http://localhost:5000/${image.replace(/^\/+/, "")}`;
}

function renderLands(lands) {
  if (!featuredLands) return;

  if (!lands || lands.length === 0) {
    featuredLands.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px;">
        <h3>No lands found matching your search.</h3>
        <p>Try searching for "Bangalore" or changing the land type.</p>
      </div>
    `;
    return;
  }

  featuredLands.innerHTML = lands.map(land => `
    <article class="land-card">
      <img
        class="land-image"
        src="${escapeHTML(getImage(land))}"
        alt="${escapeHTML(land.title || "Land listing")}"
        loading="lazy"
        onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800';"
      >

      <div class="land-card-content">
        <span class="land-type">${escapeHTML(land.type || "Residential")}</span>
        <h3>${escapeHTML(land.title || "Available Land")}</h3>
        <p class="land-location">
          📍 ${escapeHTML(land.location || "Location not specified")}
        </p>
        <h4 style="color: #2e7d32; margin: 8px 0;">
          ₹${Number(land.price || 0).toLocaleString("en-IN")}
        </h4>
        <p><strong>Area:</strong> ${Number(land.area || 0).toLocaleString("en-IN")} sq ft</p>
        <p class="land-desc">${escapeHTML(land.description || "")}</p>
      </div>
    </article>
  `).join("");
}

async function fetchLands(queryParams = "") {
  if (!featuredLands) return;

  featuredLands.innerHTML = "<p style='text-align:center;'>Loading land listings...</p>";

  try {
    const url = queryParams ? `${API_URL}?${queryParams}` : API_URL;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    allLands = Array.isArray(data) ? data : (data.lands || data.data || []);

    renderLands(allLands);
  } catch (error) {
    console.error("Failed to load lands:", error);

    featuredLands.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: red; padding: 20px;">
        <p>Unable to load lands. Ensure backend server is running at http://localhost:5000</p>
      </div>
    `;
  }
}

// Handle Search Submission
if (searchForm) {
  searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const locVal = locationInput ? locationInput.value.trim() : "";
    const typeVal = landTypeSelect ? landTypeSelect.value.trim() : "";

    const params = new URLSearchParams();
    if (locVal) params.append("location", locVal);
    if (typeVal && typeVal.toLowerCase() !== "all") params.append("type", typeVal);

    // Fetch from API with current filters
    fetchLands(params.toString());

    // Smooth scroll down to listings section
    if (featuredLands) {
      featuredLands.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

// Initial fetch on page load
fetchLands();