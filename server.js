
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')
const publicPath = path.resolve(__dirname, 'public')

//load config
dotenv.config({path: './config/config.env'})

// passport config
require('./config/passport')(passport)


connectDB()

const app = express()

// Body parser

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// enable logging for development
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// handlebars

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
})
)


// set passport middleware

app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// static folder

app.use(express.static(publicPath))

// routes

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


const PORT = process.env.PORT || 3000


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))