const API_BASE = "https://script.google.com/macros/s/AKfycby3e4EWcQUHBRpc0j1CMw_n7ZPj0GuIFzoh6z1d86TeE03v0bu_FYpZstpee2Sey18FqA/exec";

let currentItem = null;
let list = [];

function handleSearch() {
  const q = document.getElementById("searchInput").value.trim();
  if (!q) return alert("Enter a part number or keyword");

  fetch(`${API_BASE}?search=${encodeURIComponent(q)}`)
    .then(r => r.json())
    .then(data => {
      if (data.status === "success") {
        currentItem = data.item;
        displayItem(data.item);
      } else {
        alert("Item not found");
        document.getElementById("itemDisplay").innerHTML = "";
        document.querySelector(".add-section").style.display = "none";
        currentItem = null;
      }
    });
}

function displayItem(item) {
  const div = document.getElementById("itemDisplay");
  div.innerHTML = `
    <strong>${item["Manufacturer"]} – ${item["Part Number"]}</strong><br>
    ${item["Description"]}<br>
    Category: ${item["Category"]}<br>
    Price: $${item["Sale Price"]}
  `;
  document.querySelector(".add-section").style.display = "flex";
}

function addItem() {
  const qty = parseInt(document.getElementById("quantityInput").value);
  if (!qty || qty <= 0) return alert("Enter a valid quantity");

  list.push({
    partNumber: currentItem["Part Number"],
    description: currentItem["Description"],
    quantity: qty
  });

  currentItem = null;
  document.getElementById("itemDisplay").innerHTML = "";
  document.querySelector(".add-section").style.display = "none";
  document.getElementById("quantityInput").value = "";
  document.getElementById("searchInput").value = "";

  renderList();
}

function renderList() {
  const ul = document.getElementById("itemList");
  ul.innerHTML = "";
  list.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.partNumber} – ${item.description} (x${item.quantity})`;
    ul.appendChild(li);
  });
}

function submitList() {
  if (!list.length) return alert("Nothing to submit");

  // TODO: Send this to Google Sheet or JotForm
  console.log("Submitting list:", list);
  alert("Submission captured (placeholder)");
}
