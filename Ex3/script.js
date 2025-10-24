document.addEventListener("DOMContentLoaded", () => {
  // --- TÌM KIẾM SẢN PHẨM (LIVE SEARCH) ---
  const searchInput = document.getElementById("searchInput");

  // Khi gõ là lọc luôn
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase().trim();
    const productItems = document.querySelectorAll(".product-item");

    productItems.forEach(item => {
      const name = item.querySelector(".product-name").textContent.toLowerCase();
      item.style.display = name.includes(keyword) ? "" : "none";
    });
  });

  // --- ẨN / HIỆN FORM THÊM SẢN PHẨM ---
  const addProductBtn = document.getElementById("addProductBtn");
  const addProductForm = document.getElementById("addProductForm");
  const cancelBtn = document.getElementById("cancelBtn");

  addProductBtn.addEventListener("click", () => {
    addProductForm.classList.toggle("hidden");
  });

  cancelBtn.addEventListener("click", () => {
    addProductForm.classList.add("hidden");
  });

  // --- XỬ LÝ SUBMIT FORM THÊM SẢN PHẨM ---
  addProductForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("newName").value.trim();
    const price = document.getElementById("newPrice").value.trim();
    const desc = document.getElementById("newDesc").value.trim();
    const errorMsg = document.getElementById("errorMsg");
    const bookContainer = document.getElementById("book-container");

    // Kiểm tra hợp lệ
    if (!name || !price || price <= 0) {
      errorMsg.textContent = "Vui lòng nhập tên và giá hợp lệ!";
      return;
    }
    errorMsg.textContent = "";

    
    const newItem = document.createElement("article");
    newItem.className = "product-item";
    newItem.innerHTML = `
        <img src="https://picsum.photos/200/250?random=${Math.random()}" alt="${name}">
        <h3 class="product-name">${name}</h3>
        <p>${desc || "Không có mô tả."}</p>
        <p class="price">Giá: ${price}₫</p>
    `;

    // Thêm vào đầu danh sách
    bookContainer.prepend(newItem);

    // Reset form & ẩn form
    addProductForm.reset();
    addProductForm.classList.add("hidden");
  });
});
