document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const addProductBtn = document.getElementById("addProductBtn");
  const addProductForm = document.getElementById("addProductForm");
  const cancelBtn = document.getElementById("cancelBtn");
  const errorMsg = document.getElementById("errorMsg");
  const bookContainer = document.getElementById("book-container");

  // --- HÀM HIỂN THỊ SẢN PHẨM RA MÀN HÌNH ---
  function renderProducts(products) {
    bookContainer.innerHTML = "";
    products.forEach(p => {
      const item = document.createElement("article");
      item.className = "product-item";
      item.innerHTML = `
        <img src="https://picsum.photos/200/250?random=${Math.random()}" alt="${p.name}">
        <h3 class="product-name">${p.name}</h3>
        <p>${p.desc || "Không có mô tả."}</p>
        <p class="price">Giá: ${p.price}₫</p>
      `;
      bookContainer.appendChild(item);
    });
  }

  // --- LẤY DỮ LIỆU TỪ LOCALSTORAGE ---
  function loadProducts() {
    const data = localStorage.getItem("products");
    return data ? JSON.parse(data) : [];
  }

  // --- LƯU DỮ LIỆU XUỐNG LOCALSTORAGE ---
  function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  // --- KHỞI TẠO DỮ LIỆU ---
  let products = loadProducts();

  // Nếu có dữ liệu, hiển thị ra
  if (products.length > 0) {
    renderProducts(products);
  }

  // --- TÌM KIẾM SẢN PHẨM ---
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase().trim();
    const productItems = document.querySelectorAll(".product-item");

    productItems.forEach(item => {
      const name = item.querySelector(".product-name").textContent.toLowerCase();
      item.style.display = name.includes(keyword) ? "" : "none";
    });
  });

  // --- ẨN / HIỆN FORM THÊM SẢN PHẨM ---
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

    // Kiểm tra hợp lệ
    if (!name || !price || price <= 0) {
      errorMsg.textContent = "Vui lòng nhập tên và giá hợp lệ!";
      return;
    }
    errorMsg.textContent = "";

    // Tạo sản phẩm mới
    const newProduct = { name, price, desc };

    // Thêm sản phẩm vào mảng và lưu xuống LocalStorage
    products.unshift(newProduct);
    saveProducts(products);

    // Hiển thị lại toàn bộ danh sách
    renderProducts(products);

    // Reset & ẩn form
    addProductForm.reset();
    addProductForm.classList.add("hidden");
  });
});
