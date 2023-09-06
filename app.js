const express = require('express')
const exphbs = require('express-handlebars')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()
require('./config/mongoose')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`app is running on http://localhost:${process.env.PORT}`)
})