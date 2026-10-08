/*
 * JS for add interactive functions to the card 
 *
 * @author Hugo Fuentes <fuentes9hugo@gmail.com>
 * @link https://github.com/fuentes9hugo/card-item-project-mastermind GitHub
 */

// -- Capture elements --
const fav = document.getElementById("fav");
const cart = document.getElementById("cart");
const cartNumber = document.getElementById("cart-number");
const buyBtn = document.getElementById("buy");
const stockNumber = document.getElementById("stock-number");
const addCartBtn = document.getElementById("add-cart-btn");
const addFavBtn = document.getElementById("add-fav-btn");


// -- Variables --
let boughtProducts = 0;


// -- Events --
// Add to favourites event
addFavBtn.addEventListener("click", e => {
    if(stockNumber.textContent > 0) {
        fav.style.visibility = "visible";
        e.currentTarget.classList.add("btn-secondary-canceled");
        e.currentTarget.classList.remove("btn-secondary");
    }
}, { once: true }); // To execute the event just in the first click

// Add to cart events
addCartBtn.addEventListener("click", () => {
    cart.style.visibility = "visible";
}, { once: true });

addCartBtn.addEventListener("click", increaseCartNum);

// Buy product event
buyBtn.addEventListener("click", buyProduct);


// -- Functions --
/**
 * Increase by 1 the number of cart items
 */
function increaseCartNum() {
    stockNumber.textContent--;
    cartNumber.textContent++;
    
    if(stockNumber.textContent <= 0) {
        changePrimaryBtnStyle();
        changeSecondaryBtnsStyle();

        buyBtn.removeEventListener("click", buyProduct);
        addCartBtn.removeEventListener("click", increaseCartNum);
    }
}


/**
 * Sell product and check if user bought more than 5
 */
function buyProduct() {
    boughtProducts++;
    stockNumber.textContent--;
    
    if(boughtProducts >= 5 || stockNumber.textContent <= 0) {
        changePrimaryBtnStyle();
        
        if(stockNumber.textContent <= 0) {
            changeSecondaryBtnsStyle();
        }

        buyBtn.removeEventListener("click", buyProduct);
    }
}


// Change primary button styles
function changePrimaryBtnStyle() {
    buyBtn.classList.add("btn-primary-canceled");
    buyBtn.classList.remove("btn-primary");
}


// Change secondary buttons styles
function changeSecondaryBtnsStyle() {
    for(const btn of [addCartBtn, addFavBtn]) {
        btn.classList.add("btn-secondary-canceled");
        btn.classList.remove("btn-secondary");
    }
}