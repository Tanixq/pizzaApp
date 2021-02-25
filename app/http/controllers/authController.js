const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
const saltRounds = 6

const authController = () => {
    return {
        login(req, res) {
            res.render('auth/login')
        },

        async postLogin(req, res, next) {

            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }

                if(!user){
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }

                req.logIn(user, (error) => {
                    if(error){
                        req.flash('error', info.message)
                        return next(error)
                    }

                    return res.redirect('/')
                })
            })(req, res, next)
        },

        register(req, res) {
            res.render('auth/register')
        },

        async postRegister(req,res){
            const { name, email, password } = req.body

            try {
                //Validate fields
                if(!name || !email || !password){
                req.flash('error', 'All fields are required. *')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
                }

                //Check Email Existence
                const isExist = await User.exists({ email: email })
                if(!isExist){

                    const hashedPassword = await bcrypt.hash(password, saltRounds);
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword
                    })
                    newUser.save()
                    return res.redirect('/')

                } else {

                    req.flash('error', 'Email already exists')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/register')

                }
                
            } catch (error) {
                console.log(error)
                req.flash('error', 'Something went wront!')
                return res.redirect('/register')
            }

        },

        logout(req, res){
            req.logout()
            res.redirect('/login')
        }
    }
}

module.exports = authController