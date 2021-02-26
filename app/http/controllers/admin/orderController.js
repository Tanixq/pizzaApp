const Order = require('../../../models/order')
const moment = require('moment')

const adminOrderController = () => {
    return {
        async index(req, res){
            try {
                const orders = await Order.find({ status: { $nin: ['delivered', 'reject'] }},
                null,
                { sort: {'createdAt': 1}}).populate('customerId', '-password')
                res.render('admin/order', { orders: orders, moment: moment })
            } catch (error) {
                console.log(error)
                res.redirect('/')
            }
        },

        async adminUpdateOrder(req, res){
            const { orderId, reqType } = req.body
            try {
                if (reqType === 'confirm') {
                    const order = await Order.findByIdAndUpdate(orderId, {status: 'confirmed'})
                    const updatedOrder = await Order.findById(orderId)
                    return res.json({status: updatedOrder.status})
                }

                if (reqType === 'reject') {
                    const order = await Order.findByIdAndUpdate(orderId, {status: 'reject'})
                    const updatedOrder = await Order.findById(orderId)
                    return res.json({status: updatedOrder.status})
                }

                if (reqType === 'outForDelivery') {
                    const order = await Order.findByIdAndUpdate(orderId, {status: 'Out for delivery'})
                    const updatedOrder = await Order.findById(orderId)
                    return res.json({status: updatedOrder.status})
                }

                if (reqType === 'complete') {
                    const order = await Order.findByIdAndUpdate(orderId, {status: 'delivered'})
                    const updatedOrder = await Order.findById(orderId)
                    return res.json({status: updatedOrder.status})
                }

            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = adminOrderController