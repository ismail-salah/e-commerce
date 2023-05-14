let cart = []; // initialize an empty cart

const cartList = document.getElementById('cart');
const productList = document.getElementById('products');


const cartCount = document.getElementById('cart-count');
const itemCount = document.getElementById('item-count');



// Function to update the cart UI
function updateCart() {
  cartList.innerHTML = ' <div class="card text-bg-success mb-3"><div class="card-header"><h2 class="text-center">my cart</h2></div></div>'; // clear the cart
  cart.forEach(item => {

    const li = document.createElement('li');
    li.innerHTML = `<div class="res">
    
    <img src="${item.img}" alt="${item.name}">
                    <span>${item.name}  $${item.price.toFixed(2)} SAR</span>
                    
                    <span class="cart-item-count">  ${item.count} </span> 
                    
                    <button class="remove-from-cart" data-index="${cart.indexOf(item)}">Remove</button>
                    </div>`;
    cartList.appendChild(li);
  });
  localStorage.setItem('cart', JSON.stringify(cart)); // save cart in local storage
}

// Function to check if an item is already in the cart
function isInCart(name) {
  return cart.some(item => item.name === name);
}

// Function to add an item to the cart
function addToCart(name, price, img) {
  if (isInCart(name)) {
    // If the item is already in the cart, increment its count
    const index = cart.findIndex(item => item.name === name);
    cart[index].count++;
  } else {
    // If the item is not in the cart, add it with count 1
    cart.push({ name, price, img, count: 1 });
  }
  updateCart();
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cart[index].count--; // decrement the item count
  if (cart[index].count === 0) {
    // If the item count is 0, remove the item from the cart
    cart.splice(index, 1);
  }
  updateCart();
}

// Add event listener to the product list
productList.addEventListener('click', event => {
  if (event.target.classList.contains('add-to-cart')) {
    const product = event.target.closest('.product');
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);
    const img = product.dataset.img;
    addToCart(name, price, img);
  }
});




  

// Add event listener to the cart list
cartList.addEventListener('click', event => {
  if (event.target.classList.contains('remove-from-cart')) {
    const index = parseInt(event.target.dataset.index);
    removeFromCart(index);
  }
});

// Initialize the cart from local storage
const storedCart = localStorage.getItem('cart');
if (storedCart) {
  cart = JSON.parse(storedCart);
  updateCart();
}
