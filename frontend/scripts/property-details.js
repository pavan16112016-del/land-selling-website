const API_URL = "http://localhost:5000/api/lands";
const container = document.getElementById("propertyDetails");
const id = new URLSearchParams(window.location.search).get("id");

function addText(parent, tag, text, className = "") {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  parent.appendChild(element);
  return element;
}

async function showProperty() {
  if (!id) {
    container.textContent = "No property ID was provided.";
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/${encodeURIComponent(id)}`
    );

    const land = await response.json();

    if (!response.ok) {
      throw new Error(land.message || "Property not found");
    }

    container.replaceChildren();

    const image = document.createElement("img");
    image.className = "details-image";
    image.src = land.image ||
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";
    image.alt = land.title;
    image.onerror = () => {
      image.onerror = null;
      image.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";
    };

    const panel = document.createElement("section");
    panel.className = "details-panel";

    addText(panel, "span", land.landType, "land-type");
    addText(panel, "h1", land.title);
    addText(panel, "p", "📍 " + land.location);

    const price = land.price >= 10000000
      ? "₹" + (land.price / 10000000).toFixed(2) + " Cr"
      : land.price >= 100000
        ? "₹" + (land.price / 100000).toFixed(2) + " L"
        : "₹" + Number(land.price).toLocaleString("en-IN");

    addText(panel, "p", price, "details-price");
    addText(
      panel,
      "p",
      "Land size: " + Number(land.size).toLocaleString("en-IN") + " sq. ft."
    );
    addText(panel, "h3", "Property description");
    addText(panel, "p", land.description || "No description provided.");
    addText(panel, "h3", "Seller information");
    addText(panel, "p", "Name: " + land.sellerName);

    const phone = document.createElement("p");
    phone.append("Phone: ");

    const phoneLink = document.createElement("a");
    phoneLink.href = "tel:" + land.sellerPhone;
    phoneLink.textContent = land.sellerPhone;
    phone.appendChild(phoneLink);
    panel.appendChild(phone);

    container.append(image, panel);

  } catch (error) {
    container.textContent = error.message;
  }
}

showProperty();