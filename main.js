import { renderCategories, renderProducts, renderBasketItem } from "./ui.js";


document.addEventListener("DOMContentLoaded", () => {
    fetchCategories();
    fetchProducts();
})


const baseUrl = 'https://api.escuelajs.co/api/v1/';
function fetchCategories() {

    fetch(`${baseUrl}categories`)
        .then((response) => response.json()).
        then((data) => renderCategories(data)).
        catch((err) => console.log(err));
}


let globalData = []


async function fetchProducts() {
    try {
        const response = await fetch(`${baseUrl}products`);

        const data = await response.json();
        globalData = data;
        renderProducts(data)
    } catch (err) {
        console.log(err)
    }
}

let basket = []

let total = 0
const modal = document.querySelector(".modal-wrapper")
const sepetBtn = document.querySelector("#sepet-btn")
const closeBtn = document.querySelector("#close-btn")
const basketList = document.querySelector(".list")
const modalInfo = document.querySelector(".total-span")


sepetBtn.addEventListener("click", () => {
    modal.classList.add("active");

    addList()
})

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active")
    basketList.innerHTML = "";
    modalInfo.textContent = 0;
    total = 0
})


document.addEventListener("click", (e) => {
    var clickedEl = e.target;
    if (clickedEl.classList.contains("modal-wrapper")) {
        modal.classList.remove("active")
        basketList.innerHTML = "";
        modalInfo.textContent = 0;
        total = 0

    }

})


document.body.addEventListener("click", findItem)

function findItem(e) {
    const ele = e.target
    if (ele.id === 'add-btn') {


        const select = globalData.find(
            (product) => product.id == ele.dataset.id
        )
        if (!select.amount) {
            select.amount = 1
        }
        addToBasket(select)
    }
    if (ele.id === 'del-btn') {
        ele.parentElement.remove()

        const select = globalData.find((i) => i.id == ele.dataset.id)
        deleteItem(select)

    }



}


function addToBasket(product) {
    const foundItem = basket.find((item) => item.id === product.id)
    if (foundItem) {
        foundItem.amount++;
    } else {
        basket.push(product);
    }

}

//urunleri sepete ekleme

function addList() {
    basket.forEach((product) => {
        renderBasketItem(product)

        total += product.price * product.amount;
    })
    modalInfo.textContent = total
}


function deleteItem(deletingItem) {
    const filterData = basket.filter((item) => item.id !== deletingItem.id)
    basket = filterData

    total -= deletingItem.price * deletingItem.amount;

    modalInfo.textContent = total
}








