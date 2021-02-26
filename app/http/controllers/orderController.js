const Order = require('../../models/order')
const moment = require('moment')

const orderController = () => {
    return {
        async store(req, res) {

            const {
                phone,
                address
            } = req.body

            if (!phone || !address) {
                req.flash('error', 'All fields are required. *')
                return res.redirect('/cart')
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })
            try {
                await order.save()
                req.flash('success', 'Order placed successfully !')
                req.session.cart = null
                res.redirect('/customers/orders')
            } catch (error) {
                console.log(error)
                req.flash('error', 'Something went wrong !')
                res.redirect('/cart')
            }

        },
        async index(req, res) {
            try {
                const orders = await Order.find({ customerId: req.user._id }, null, {
                    sort: { 'createdAt': -1 }
                })
                res.render('customers/order', { orders: orders , moment: moment})
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = orderController