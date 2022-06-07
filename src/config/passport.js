/**
 * @author: Juan Carlos Hernandez
 * @fecha: 06/2022
 * @description: Este fichero controla la libreria passport para la logica del login
 */
const Localstrategy = require('passport-local').Strategy
const User=require('../app/models/usuario');

module.exports = function (passport){

    passport.serializeUser(function(user, done){
        done(null,user)
    })

    passport.deserializeUser(function(user, done){
        done(null,user)
    })

    passport.use('local-registro', new Localstrategy({
        usernameField: 'mail',
        passwordField: 'password',
        nameField: 'nombre',
        passReqToCallback: true
    },
    function(req, mail, password, done) {
        console.log('gol')
        User.CheckIfUserExists(mail, function(err, user){
            if(err) {return done(err)}
            console.log(req.body)
            if (user!=null){
                return done(null, false, req.flash('registroMessage', 'El mail ya esta en uso.'))
            }else{

                if(req.body.nombre.length == 0 || req.body.mail.length == 0 || req.body.password.length == 0 || req.body.password2.length == 0){
                    return done(null, false, req.flash('registroMessage', 'Todos los campos son obligatorios.'))
                }else if(req.body.password != req.body.password2){
                    return done(null, false, req.flash('registroMessage', 'Las contraseñas deben coincidir'))
                }else{
                    var newUser = new User()
                    newUser.mail = mail
                    newUser.password = User.EncryptPassword(password)
                    newUser.nombre = req.body.nombre
                    newUser.save(function (err){
                        if(err) throw err
                        return done(null, newUser)
                    })
                }
            }
        })
    }
    ))

    passport.use('local-login', new Localstrategy({
        usernameField: 'mail',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, mail, password, done) {
        console.log("sss")
        User.CheckIfUserExists(mail, function(err, user){
            if(err) {return done(err)}
            
            
            console.log(user)
            

            if (user==null || !user.comparePassword(password)){
                return done(null, false, req.flash('loginMessage', 'Usuario o contraseña incorrectos.'))
            }else{
               
               return done(null, user)
            }
        })
    }
    ))
    

}