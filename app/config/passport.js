const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

const init = (passport) => {

    passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email })

            if (!user) {
                return done(null, false, { message: 'User does not exist' })
            } else {
                const match = await bcrypt.compare(password, user.password);

                if (!match) {
                    return done(null, false, { message: 'wrong username or password' })
                } else {
                    return done(null, user, { message: 'Logged in successfully!'})
                }
            }

        } catch (error) {

            console.log(error);
            return done(null, false, { message: 'Something went wrong!'})   
        }

    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}

module.exports = init