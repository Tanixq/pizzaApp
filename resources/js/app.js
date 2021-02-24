const axios = require('axios')
const { Notyf } = require('notyf')
const notyf = new Notyf

let addToCart = document.querySelectorAll('.cart-btn')

const updateCart = async (pizza) => {
   try {
    const data = await axios.post('/update-cart', pizza)
    let cartCounter = document.getElementById('cart-counter')
    cartCounter.innerText = data.data.totalQty
    notyf.success('Item Added !');
   } catch (error) {
       notyf.error('Some problem occured!');
   }
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})