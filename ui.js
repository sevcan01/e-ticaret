const categoryList = document.querySelector('.categories');
const productList = document.querySelector('.products');
const basketList = document.querySelector('.list');

export function renderCategories(categories) {
    categories.forEach((category) => {
        const categoryDiv = document.createElement("div")

        categoryDiv.classList.add("category")
        categoryDiv.innerHTML = `   
        <img src=${category.image} alt="">
        <span>${category.name}</span>
    `;
        categories.splice(5)
        categoryList.appendChild(categoryDiv)
    })


}




export function renderProducts(products) {
    products.slice(0, 40).forEach((product) => {
        const productCard = document.createElement("div")
        productCard.className = "product"
        productCard.innerHTML = `
   <img src=${product.images} alt="">
                    <p>${product.title} </p>
                    <h1>${product.category.name} </h1>
                    <div class="bottom">
                        <p>${product.price} $</p>
                        <button id="add-btn" data-id=${product.id}>Sepete Ekle</button>
                    </div>
   
   `

        productList.appendChild(productCard)

    })

}

export function renderBasketItem(product) {
    const basketItem = document.createElement('div')

    basketItem.classList.add('list-item')
    basketItem.innerHTML = `
    <img src=${product.images[0]} alt="">
    <h2>${product.title}</h2>
    <h2>${product.price}$</h2>
    <p>Miktar: ${product.amount}</p>
    <button id="del-btn" data-id="${product.id}">Sil</button>
    
    `
    basketList.appendChild(basketItem)
}




