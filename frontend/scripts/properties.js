const filterForm = document.getElementById("filterForm");

function applyFilters(filters = {}) {
  document.getElementById("filterLocation").value =
    filters.location || "";

  document.getElementById("filterType").value =
    filters.landType || "";

  document.getElementById("filterPrice").value =
    filters.maxPrice || "";

  loadLands("allLands", filters);
}

if (filterForm) {
  filterForm.addEventListener("submit", event => {
    event.preventDefault();

    applyFilters({
      location: document.getElementById("filterLocation").value.trim(),
      landType: document.getElementById("filterType").value,
      maxPrice: document.getElementById("filterPrice").value
    });
  });

  filterForm.addEventListener("reset", () => {
    setTimeout(() => applyFilters({}), 0);
  });

  let initialFilters = {};

  try {
    initialFilters = JSON.parse(
      sessionStorage.getItem("landSearch") || "{}"
    );
  } catch {
    initialFilters = {};
  }

  sessionStorage.removeItem("landSearch");
  applyFilters(initialFilters);
}