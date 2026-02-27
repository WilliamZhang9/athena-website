// Store Data - Loaded from your GitHub MCP database
const STORE_DATA = {
    "categories": [
        "Skincare",
        "Makeup",
        "Accessories"
    ],
    "products": [
        {
            "id": 1,
            "name": "Hydra Glow Serum",
            "category": "Skincare",
            "price": 39.99,
            "description": "Lightweight hydrating serum with hyaluronic acid for daily moisture.",
            "picture": "https://upload.wikimedia.org/wikipedia/commons/9/94/2_oz_-_60_ml_Amber_Glass_Boston_Round_Bottles_with_Gold_Metal_and_Glass_Droppers.jpg"
        },
        {
            "id": 2,
            "name": "Velvet Matte Lipstick",
            "category": "Makeup",
            "price": 24.5,
            "description": "Long-wear matte lipstick with rich pigment and smooth finish.",
            "picture": "https://upload.wikimedia.org/wikipedia/commons/1/16/MAC_pink_lipstick_%281%29.jpg"
        },
        {
            "id": 3,
            "name": "Pearl Claw Clip",
            "category": "Accessories",
            "price": 12.0,
            "description": "Elegant pearl hair claw clip for quick and stylish updos.",
            "picture": "https://upload.wikimedia.org/wikipedia/commons/1/1e/3_big_claw_clips_for_thick_long_hair.png"
        },
        {
            "id": 4,
            "name": "Sun Shield SPF 50",
            "category": "Skincare",
            "price": 29.0,
            "description": "Broad-spectrum SPF 50 sunscreen with non-greasy finish.",
            "picture": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Suncademy_airless_bottle_sunscreen_citronella_active_ingredients.jpg"
        }
    ],
    "discountPolicy": [
        {
            "minimumOrderAmount": 100,
            "discountPercent": 10,
            "description": "10% off when order amount is at least $100."
        },
        {
            "minimumOrderAmount": 200,
            "discountPercent": 20,
            "description": "20% off when order amount is at least $200."
        },
        {
            "minimumOrderAmount": 500,
            "discountPercent": 30,
            "description": "30% off when order amount is at least $500."
        }
    ]
};

// Shopping Cart
let cart = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
});

// Load and display products
function loadProducts(category = 'all') {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    const filteredProducts = category === 'all' 
        ? STORE_DATA.products 
        : STORE_DATA.products.filter(p => p.category === category);

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.picture}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/250x200?text=Product+Image'">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        </div>
    `;

    card.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product.id);
    });

    return card;
}

// Add product to cart
function addToCart(productId) {
    const product = STORE_DATA.products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showNotification(`${product.name} added to cart!`);
}

// Update cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItem = createCartItem(item);
            cartItemsContainer.appendChild(cartItem);
        });
        checkoutBtn.disabled = false;
    }

    updateCartSummary();
}

// Create cart item element
function createCartItem(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
        <img src="${item.picture}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/60?text=Item'">
        <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-quantity">
                <button class="qty-btn" data-id="${item.id}" data-action="decrease">−</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
            </div>
        </div>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
    `;

    div.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const action = e.target.dataset.action;
            updateQuantity(id, action);
        });
    });

    div.querySelector('.remove-btn').addEventListener('click', (e) => {
        removeFromCart(parseInt(e.target.dataset.id));
    });

    return div;
}

// Update item quantity
function updateQuantity(productId, action) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    if (action === 'increase') {
        item.quantity++;
    } else if (action === 'decrease') {
        item.quantity--;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
    }

    updateCart();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update cart summary with discount calculation
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Calculate discount
    let discountPercent = 0;
    let discountInfo = '';
    
    const sortedDiscounts = [...STORE_DATA.discountPolicy].sort((a, b) => b.minimumOrderAmount - a.minimumOrderAmount);
    
    for (const policy of sortedDiscounts) {
        if (subtotal >= policy.minimumOrderAmount) {
            discountPercent = policy.discountPercent;
            discountInfo = policy.description;
            break;
        }
    }
    
    const discountAmount = subtotal * (discountPercent / 100);
    const total = subtotal - discountAmount;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('discount').textContent = discountPercent > 0 ? `-$${discountAmount.toFixed(2)} (${discountPercent}%)` : '$0.00';
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;

    const discountInfoElement = document.getElementById('discount-info');
    if (discountInfo) {
        discountInfoElement.textContent = `🎉 ${discountInfo}`;
        discountInfoElement.style.display = 'block';
    } else {
        // Show next discount tier
        const nextTier = STORE_DATA.discountPolicy.find(p => p.minimumOrderAmount > subtotal);
        if (nextTier) {
            const remaining = nextTier.minimumOrderAmount - subtotal;
            discountInfoElement.textContent = `Add $${remaining.toFixed(2)} more to get ${nextTier.discountPercent}% off!`;
            discountInfoElement.style.display = 'block';
            discountInfoElement.style.background = '#fff3cd';
            discountInfoElement.style.borderColor = '#ffc107';
            discountInfoElement.style.color = '#856404';
        } else {
            discountInfoElement.style.display = 'none';
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            loadProducts(e.target.dataset.category);
        });
    });

    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            const total = document.getElementById('total').textContent;
            alert(`Thank you for your purchase!\nTotal: ${total}\n\nThis is a demo - no actual payment was processed.`);
            cart = [];
            updateCart();
        }
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
