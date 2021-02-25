require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo').default;
const passport = require('passport')

//DB connection
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify:true})
const connection = mongoose.connection
connection.once('open', () => {
    console.log('DB connected successfully!');
}).catch( err => {
    console.log(('DB connection unsuccessfull'));
})

//Sessions config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: { maxAge: 1000 * 60 * 60 * 24} //24 Hours
}))

//Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

//flash config
app.use(flash())

//Asset
app.use(express.static('public'))

//Url encoded
app.use(express.urlencoded({extended: false}))

//Json
app.use(express.json())

//Set Template Engine
app.use(expressLayout)
app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'ejs')

//Global middleware
app.use((req, res, next) => {
    res.locals.cart = req.session.cart
    res.locals.user = req.session.passport.user
    next()
})

//Importing routes
require('./routes/web')(app)

//Starting Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
})

