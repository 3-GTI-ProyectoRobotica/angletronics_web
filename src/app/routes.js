module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        res.render('index');
    })
    app.get('/index', (req, res) => {
        res.render('index');
    })
    app.get('/historial', (req, res) => {
        res.render('historial');
    })


    app.get('/image/ultimo/reciclaje', function(req, res){
        const testFolder = './src/public/assets/fotos_reciclaje/';
        var path = require("path");
        var absolutePath = path.resolve(testFolder+last_img);
        res.sendFile(absolutePath);

   })

   app.get('/image/reciclaje/verde', function(req, res){
    const testFolder = './src/public/assets/fotos_reciclaje/';
    const imagenesFolder = './src/public/assets/fotosPanel/';
    var fs = require('fs')
    var path = require("path");

    fs.readdir(testFolder, (err, files) => {
        last_img = files[files.length-1]
        color_char = last_img[-5]
        img = ""
        if(last_img.includes("verde")){
            img="verde.png"
        }else{
            img="verdebw.png"
        }
        var absolutePath = path.resolve(imagenesFolder+img);
        res.sendFile(absolutePath);
      });
    })

    app.get('/image/reciclaje/amarillo', function(req, res){
        const testFolder = './src/public/assets/fotos_reciclaje/';
        const imagenesFolder = './src/public/assets/fotosPanel/';
        var fs = require('fs')
        var path = require("path");
    
        fs.readdir(testFolder, (err, files) => {
            last_img = files[files.length-1]
            color_char = last_img[-5]
            img = ""
            if(last_img.includes("amarillo")){
                img="amarillo.png"
            }else{
                img="amarillobw.png"
            }
            var absolutePath = path.resolve(imagenesFolder+img);
            res.sendFile(absolutePath);
          });
        })

    app.get('/image/reciclaje/azul', function(req, res){
        const testFolder = './src/public/assets/fotos_reciclaje/';
        const imagenesFolder = './src/public/assets/fotosPanel/';
        var fs = require('fs')
        var path = require("path");
    
        fs.readdir(testFolder, (err, files) => {
            last_img = files[files.length-1]
            color_char = last_img[-5]
            img = ""
            if(last_img.includes("azul")){
                img="azul.png"
            }else{
                img="azulbw.png"
            }
            var absolutePath = path.resolve(imagenesFolder+img);
            res.sendFile(absolutePath);
            });
    })

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/controles',
        failureRedirect : '/login',
        failureFlash : true
    }))

    app.get('/login', (req, res) => {
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    })

    app.get('/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })

   
    app.post('/registro', passport.authenticate('local-registro', {
        successRedirect : '/controles',
        failureRedirect : '/registro',
        failureFlash : true
    }))
    app.get('/registro', (req, res) => {
        res.render('registro.ejs', {
            message: req.flash('registroMessage')
        });
    })

    app.get('/controles', isLoggedIn,(req, res) => {
        res.render('controles', {
            user : req.user
        });
    })
}

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }

    return res.redirect('/login')
}
