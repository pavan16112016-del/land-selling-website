const API_URL = "http://localhost:5000/api/lands";

const form = document.getElementById("sellLandForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", async event => {
  event.preventDefault();

  message.textContent = "Publishing your listing...";

  const formData = new FormData(form);

  const land = {
    title: formData.get("title").trim(),
    location: formData.get("location").trim(),
    price: Number(formData.get("price")),
    size: Number(formData.get("size")),
    landType: formData.get("landType"),
    image: formData.get("image").trim(),
    description: formData.get("description").trim(),
    sellerName: formData.get("sellerName").trim(),
    sellerPhone: formData.get("sellerPhone").trim()
  };

  if (
    !land.title ||
    !land.location ||
    !land.sellerName ||
    !/^[0-9]{10}$/.test(land.sellerPhone) ||
    !Number.isFinite(land.price) ||
    land.price <= 0 ||
    !Number.isFinite(land.size) ||
    land.size <= 0
  ) {
    message.textContent = "Please enter valid property and seller details.";
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(land)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Unable to publish listing.");
    }

    message.textContent = "Land listed successfully! Opening your listings...";

    form.reset();

    setTimeout(() => {
      window.location.href = "properties.html";
    }, 1200);

  } catch (error) {
    message.textContent =
      error.message === "Failed to fetch"
        ? "Cannot connect to the server. Check that the backend is running."
        : error.message;
  }
});