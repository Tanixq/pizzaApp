const user = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        return res.redirect('/')
    }
}

module.exports = user