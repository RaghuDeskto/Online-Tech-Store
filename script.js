// Login Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the login page
    if (document.querySelector('.login-page')) {
        initLoginPage();
    }
    
    // Check if we're on the home page
    if (document.querySelector('.home-page')) {
        initHomePage();
    }
    
    // Check if we're on the cart page
    if (document.querySelector('.cart-page')) {
        initCartPage();
    }
});

function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const loginPage = document.querySelector('.login-page');
    
    // Add mouse tracking for fluid background animation
    if (loginPage) {
        loginPage.addEventListener('mousemove', function(e) {
            const rect = loginPage.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            loginPage.style.setProperty('--mouse-x', x + '%');
            loginPage.style.setProperty('--mouse-y', y + '%');
        });
    }
    
    if (loginForm && loginBtn) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username && password) {
                // Add loading animation
                loginBtn.classList.add('loading');
                
                // Simulate login process with loading animation
                setTimeout(() => {
                    loginBtn.classList.remove('loading');
                    // Redirect to home page
                    window.location.href = 'home.html';
                }, 2000);
            }
        });
    }
}

function initHomePage() {
    // Initialize search functionality
    initSearchFunctionality();
    
    // Initialize contact modal
    initContactModal();
    
    // Initialize product card animations
    initProductAnimations();
    
    // Initialize cart functionality
    initCartFunctionality();
    
    // Initialize buy modal
    initBuyModal();
    
    // Initialize settings functionality
    initSettings();
}

function initSearchFunctionality() {
    const searchIcon = document.getElementById('searchIcon');
    const searchBox = document.getElementById('searchBox');
    
    if (searchIcon && searchBox) {
        searchIcon.addEventListener('click', function() {
            if (searchBox.classList.contains('active')) {
                // Closing - remove active state
                searchBox.classList.remove('active');
                searchIcon.classList.remove('active');
            } else {
                // Opening - add active state with rotation animation
                searchBox.classList.add('active');
                searchIcon.classList.add('active');
                searchBox.focus();
            }
        });
        
        // Close search box when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                if (searchBox.classList.contains('active')) {
                    searchBox.classList.remove('active');
                    searchIcon.classList.remove('active');
                }
            }
        });
        
        // Search functionality
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const productName = card.querySelector('.product-name').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease';
                } else {
                    card.style.display = searchTerm === '' ? 'block' : 'none';
                }
            });
        });
    }
}

function initContactModal() {
    const contactBtn = document.querySelector('.contact-btn');
    const modal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('.close');
    
    if (contactBtn && modal && closeBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

function initProductAnimations() {
    const productCards = document.querySelectorAll('.product-card');
    const buyBtns = document.querySelectorAll('.buy-btn');
    
    // Add staggered animation on page load
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Add to cart button functionality
const addCartBtns = document.querySelectorAll('.add-cart-btn');
addCartBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        addToCart(productName);
        showPurchaseNotification();
    });
});
    
    // Buy button click animation
    buyBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(0, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add purchase animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                
                // Get product name from the card
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('.product-name').textContent;
                
                // Show buy modal instead of adding to cart
                showBuyModal(productName);
            }, 150);
        });
    });
}

function showPurchaseNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.innerHTML = '✓ Added to Cart!';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #0a0a23, #1a1a3e);
        color: #00ffff;
        padding: 15px 25px;
        border: 2px solid #00ffff;
        border-radius: 10px;
        font-family: 'Orbitron', monospace;
        font-weight: 600;
        letter-spacing: 1px;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        z-index: 1001;
        transform: translateX(300px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active {
        color: #ff00ff !important;
        text-shadow: 0 0 15px #ff00ff;
    }
    
    .nav-link.active::after {
        width: 100% !important;
        background: #ff00ff !important;
    }
`;
document.head.appendChild(style);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('contactModal');
        if (modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Ctrl+K to focus search
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const searchBox = document.getElementById('searchBox');
        if (searchBox) {
            searchBox.classList.add('active');
            searchBox.focus();
        }
    }
});

function initCartFunctionality() {
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }
}

function initCartPage() {
    loadCartItems();
    initContactModal();
}

// Cart management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const products = {
    'SMARTWATCH': { price: 299.99, image: 'Photos/Watch.png' },
    'VR HEADSET': { price: 599.99, image: 'Photos/VR.png' },
    'WIRELESS EARUDS': { price: 199.99, image: 'Photos/headphine.png' },
    'SMARTPHONE': { price: 899.99, image: 'Photos/Phone.png' },
    'HEADPHONES': { price: 249.99, image: 'Photos/headphine.png' },
    'GAMING KEYBOARD': { price: 159.99, image: 'Photos/Keyborad.png' },
    'SMART SPEAKER': { price: 149.99, image: 'Photos/spekaer.png' },
    'GAMING MICROPHONE': { price: 79.99, image: 'Photos/Mic.png' }
};

function addToCart(productName) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: products[productName].price,
            image: products[productName].image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartIcon();
}

function updateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon && cart.length > 0) {
        cartIcon.classList.add('active');
    } else if (cartIcon) {
        cartIcon.classList.remove('active');
    }
}

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartSummary.style.display = 'none';
        cartItemsContainer.innerHTML = '';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartSummary.style.display = 'block';
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-icon">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-btn" onclick="removeFromCart('${item.name}')">REMOVE</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    document.getElementById('subtotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading animation for page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0.5';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Buy Modal Functionality
let currentProductName = '';

function showBuyModal(productName) {
    currentProductName = productName;
    const buyModal = document.getElementById('buyModal');
    const buyProductName = document.getElementById('buyProductName');
    
    if (buyModal && buyProductName) {
        buyProductName.textContent = `BUY ${productName}`;
        buyModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function buyOnPlatform(platform) {
    const searchQuery = currentProductName.toLowerCase().replace(/\s+/g, '+');
    let url = '';
    
    if (platform === 'amazon') {
        url = `https://www.amazon.in/s?k=${searchQuery}`;
    } else if (platform === 'flipkart') {
        url = `https://www.flipkart.com/search?q=${searchQuery}`;
    }
    
    if (url) {
        window.open(url, '_blank');
        closeBuyModal();
    }
}

function closeBuyModal() {
    const buyModal = document.getElementById('buyModal');
    if (buyModal) {
        buyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize buy modal functionality
function initBuyModal() {
    const buyModal = document.getElementById('buyModal');
    const buyClose = document.querySelector('.buy-close');
    
    if (buyClose) {
        buyClose.addEventListener('click', closeBuyModal);
    }
    
    // Close modal when clicking outside
    if (buyModal) {
        window.addEventListener('click', function(e) {
            if (e.target === buyModal) {
                closeBuyModal();
            }
        });
    }
}

// Settings Functionality
function initSettings() {
    const settingsIcon = document.getElementById('settingsIcon');
    const settingsDropdown = document.getElementById('settingsDropdown');
    const themeSelector = document.getElementById('themeSelector');
    const signOutBtn = document.getElementById('signOutBtn');
    
    if (settingsIcon && settingsDropdown) {
        settingsIcon.addEventListener('click', function() {
            settingsDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.settings-container')) {
                settingsDropdown.classList.remove('active');
            }
        });
    }
    
    // Theme changer functionality
    if (themeSelector) {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'cyberpunk';
        themeSelector.value = savedTheme;
        applyTheme(savedTheme);
        
        themeSelector.addEventListener('change', function() {
            const selectedTheme = this.value;
            applyTheme(selectedTheme);
            localStorage.setItem('theme', selectedTheme);
        });
    }
    
    // Sign out functionality
    if (signOutBtn) {
        signOutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to sign out?')) {
                // Clear cart and other data
                localStorage.clear();
                // Redirect to login page
                window.location.href = 'index.html';
            }
        });
    }
}

function applyTheme(theme) {
    const overlay = document.getElementById('themeOverlay');
    
    if (overlay) {
        // Show overlay with swipe animation
        overlay.style.animation = 'themeSwipe 0.8s ease-in-out';
        overlay.style.opacity = '1';
        
        // Change theme halfway through animation
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', theme);
        }, 400);
        
        // Hide overlay after animation
        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.animation = '';
        }, 800);
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
}

// Initialize cart icon on page load
updateCartIcon();
