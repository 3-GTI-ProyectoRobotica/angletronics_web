/**
 * @author: Juan Carlos Hernandez
 * @fecha: 05/2022
 * @description: Este fichero controla las constantes para la conexión con el servidor
 */
const express = require('express')
const app = express()

const path = require('path')
const passport = require('passport')
const flash = require('connect-flash')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

require('./config/passport')(passport)
//setting
app.set('port', process.env.PORT || 3000)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//middlewares

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
    secret:'secret_tronics',
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
//routes
require('./app/routes')(app, passport)

//static files
app.use(express.static(path.join(__dirname, 'public')))

//init server
app.listen(app.get('port'), () =>{
    console.log('server on port:', app.get('port'))
})