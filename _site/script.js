const products = [
  { id: 1, name: "Kulkas", price: 3200000 },
  { id: 2, name: "Kipas angin", price: 350000 },
  { id: 3, name: "Mesin cuci", price: 1900000 },
  { id: 4, name: "Freezer", price: 3000000 },
];

let cart = [];
let couponApplied = false;

function displayProducts(list) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  list.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <strong>${product.name}</strong><br>
      Rp${product.price.toLocaleString()}<br>
      <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
    `;
    productList.appendChild(div);
  });
}

displayProducts(products);

function filterProducts() {
  const search = document.getElementById('search').value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(search));
  displayProducts(filtered);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    renderCart();
  }
}

function renderCart() {
  const cartList = document.getElementById('cart');
  cartList.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - Rp${item.price.toLocaleString()} `;
    const btn = document.createElement('button');
    btn.textContent = 'Hapus';
    btn.onclick = () => removeFromCart(index);
    li.appendChild(btn);
    cartList.appendChild(li);
  });
  updateTotal();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function applyCoupon() {
  const coupon = document.getElementById('coupon').value.trim();
  if (coupon === 'diskon10') {
    alert('Kupon berhasil diterapkan, diskon 10%');
    couponApplied = true;
  } else {
    alert('Kupon tidak valid');
    couponApplied = false;
  }
  updateTotal();
}

function updateTotal() {
  const shipping = parseInt(document.getElementById('shipping').value) || 0;
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  total += shipping;
  if (couponApplied) {
    total *= 0.9;
  }
  document.getElementById('total').textContent = 'Total: Rp' + total.toLocaleString();
}