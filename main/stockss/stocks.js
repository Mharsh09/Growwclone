console.log("✅ JS Loaded");

fetch("http://127.0.0.1:5050/api/stocks")
  .then(res => res.json())
  .then(stocks => {
    console.log("📦 Fetched stocks:", stocks);

    const cardContainer = document.getElementById("cardContainer");

    stocks.forEach(stock => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <div class="stock-data">
          <img src="${stock.img}" alt="Stock Icon">
          <span class="stock-names">${stock.name}</span>
        </div>
        <div class="stock-price">
          <p class="price">${stock.price}</p>
          <p class="percentage">${stock.change}</p>
        </div>
      `;

      console.log("🧱 Appending card for:", stock.name);
      cardContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error("❌ Failed to load stock data:", error);
  });