
document.getElementById("navlogo").onclick = function () {
  window.location.href = "/main/stockss/stockshomepage.html";
};

window.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".market-indices-track");
  const original = track.querySelector(".market-indices");


  const clone = original.cloneNode(true);
  track.appendChild(clone);
});

fetch("http://127.0.0.1:5050/api/stocks")
  .then(res => res.json())
  .then(stocks => {
    console.log("📦 Fetched stocks:", stocks);

    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = ""; // Remove initial placeholder card

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
    applyPriceColors();
  })
  .catch(error => {
    console.error("❌ Failed to load stock data:", error);
  });

function renderCards(containerSelector, stockList) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = "";

  stockList.forEach(stock => {
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

    container.appendChild(card);
  });
}

// Top Gainers
fetch("http://127.0.0.1:5050/api/top-gainers")
  .then(res => res.json())
  .then(gainers => {
    renderCards(".top-gainers", gainers);
    applyPriceColors();
  })
  .catch(err => console.error("❌ Top Gainers error:", err));

// Top Losers
fetch("http://127.0.0.1:5050/api/top-losers")
  .then(res => res.json())
  .then(losers => {
    renderCards(".top-losers", losers);
    applyPriceColors();
  })
  .catch(err => console.error("❌ Top Losers error:", err));


function applyPriceColors() {
  document.querySelectorAll('.percentage').forEach(el => {
    const text = el.textContent.trim();
    if (text.startsWith('-')) {
      el.style.color = '#e63946';
    } else {
      el.style.color = '#06b488';
    }
  });
}

