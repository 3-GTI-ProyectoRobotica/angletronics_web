module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        res.render('index');
    })
    app.get('/index', (req, res) => {
        res.render('index');
    })

    app.get('/image/ultimo/reciclaje', function(req, res){
        const testFolder = './src/public/assets/fotos_reciclaje/';
        var fs = require('fs')
        var path = require("path");

        fs.readdir(testFolder, (err, files) => {
            last_img = files[files.length-1]
            //var img = fs.readFileSync(testFolder+last_img);
            var absolutePath = path.resolve(testFolder+last_img);
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