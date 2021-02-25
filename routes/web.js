const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const guest = require('../app/http/middlewares/guest')

const initRoutes = (app) => {

    app.get('/', homeController().index )
    
    app.get('/login', guest, authController().login )
    app.post('/login', guest, authController().postLogin )

    app.get('/logout', authController().logout )
    
    app.get('/register', guest, authController().register )
    app.post('/register', guest, authController().postRegister )

    app.get('/cart', cartController().index )
    app.post('/update-cart', cartController().update )


}

module.exports = initRoutes
