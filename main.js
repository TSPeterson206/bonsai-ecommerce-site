const { inventory } = require('./data');
const products = require('./products')
const scriptcheck = require('./scriptcheck')
const cardGenerator = require('./template');
const numberInCart = document.querySelector('.number-in-cart')
let cartCount = Number(localStorage.getItem('cartCount'))
let recentImages = JSON.parse(localStorage.getItem('recentImages')) || false
let recentItems = JSON.parse(localStorage.getItem('recentItems')) || false


if (!recentImages && !recentItems) {
    localStorage.setItem('recentImages', JSON.stringify(['#', '#', '#', '#', '#']))
    localStorage.setItem('recentItems', JSON.stringify(['', '', '', '', '']))
}

if (cartCount) {
    numberInCart.textContent = cartCount + ' Items'
}

const onSaleFooter = document.querySelector('.on-sale-footer')

const onSale = inventory.filter ( bonsai => bonsai.category === 'Sale' )

function saleFooterTemplate ( {title, price} ) {
    return `<li>${title}, ${price}</li>`
}

const onSaleStrings = onSale.map( bonsai => saleFooterTemplate(bonsai))

const onSaleHTML = onSaleStrings.join('')

onSaleFooter.innerHTML = onSaleHTML

if (window.location.pathname === '/') {
    const homePageProducts = document.querySelector('.newArrivals')
    cardGenerator.render(homePageProducts, inventory, 3, "all");
    //products on the homepage can also be added to the cart
    products.newCartItems()
}

else if (window.location.pathname === '/products.html') {
    products.init()
}

else if (window.location.pathname === '/checkout.html') {
    scriptcheck.checkoutFunction()
}