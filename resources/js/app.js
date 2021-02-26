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

const orderUpdate = document.querySelectorAll('.dropdown-item')

orderUpdate.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
        let orderId = JSON.parse(btn.dataset.orderid)
        let reqType = JSON.parse(btn.dataset.reqtype)
        let orderDetails = {
            orderId,
            reqType
        }
        try {
            const res = await axios.post('/admin/update-order', orderDetails)
                let card = document.getElementById(orderId)
                card.querySelector('#dropdownMenuButton').innerHTML = res.data.status
        } catch (error) {
            console.log(error)
        }
    })
})

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})