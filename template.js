const cardTemplate = ({ id, img, title, description, price, category, stars }) => {
  return `
      <div class="card m-3 border" style="min-width: 25%; max-width: 30%;">
          <img class="card-img-top productPic" src="${img}" alt="${title}" style="width: 100%;">
          <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p>${description}</p>
        </div>
        <div class="card-footer priceBar">
        <p class = "priceText">$${price}</p>
        </div>
        <div class="card-footer text-muted">
        <button data-id="${id}" type="button" class="btn btn-secondary cart-button">Add To Cart</button>
        </div>
        <div class="card-footer dataBar">
        <p class = "productInfo">RATED: <strong>${stars} STARS</strong></p>
        <p class = "productInfo">CATEGORY: <strong>${category}</strong></p>
    </div>
      </div>
    `
}

const rowTemplate = (item) => {
  return `
      <div class="row">
        <div class="col">
          <div class="card-deck justify-content-around">
            ${item}
          </div>
        </div>
      </div>
    `
}

const generateList = (arr, filter) => {
  const productList = [];
  if (filter === 'all') {
    return arr;
  } else {
    for (products of arr) {
      if (products.category === filter) {
        productList.push(products)
      }
    }
    return productList;
  }
}

const generateListPrice = (arr, range) => {
  const productList = [];
  for (products of arr) {
    if (products.price >= range[0] && products.price <= range[1]) {
    productList.push(products)
    }
  }
  return productList;
}

const generateCards = (trees, num) => {
  let cardList = [];
  if (trees.length <= num) {
    for (let i = 0; i < trees.length; i++) {
      cardList.push(cardTemplate(trees[i]))
    }
  } else {
  for (let i = 0; i < num; i++) {
    cardList.push(cardTemplate(trees[i]))
  }
}
  return cardList
}

const render = (container, products, num, filter) => {
  if (typeof filter !== "string") {
    const productList = generateListPrice(products, filter);
    const cards = generateCards(productList, num);
    const cardRow = rowTemplate(cards.join('\n'));
    container.innerHTML = cardRow;
  } else {
    const productList = generateList(products, filter)
    const cards = generateCards(productList, num);
    const cardRow = rowTemplate(cards.join('\n'));
    container.innerHTML = cardRow;
  }
}

module.exports = {
  render
}