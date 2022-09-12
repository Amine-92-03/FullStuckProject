const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
 
app.use('/', indexRouter)
app.use('/authors', authorRouter)

// require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser : true})

const db = mongoose.connection
db.on('error', error => console.log('db error', error))
db.once('open', ()=> console.log('connected to mongooose'))

app.listen(process.env.PORT || 3300,()=>{
    console.log('listen to PORT', process.env.PORT || 3300 );
})
