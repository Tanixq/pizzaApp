const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')

app.get('/', (req, res) => {
    res.render('home')
})

app.use(expressLayout)
app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
})

