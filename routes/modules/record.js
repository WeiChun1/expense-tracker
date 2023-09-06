const express = require('express')

const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/:category', (req, res) => {
  const category = req.params.category
  Category.findOne({ name_en: category })
    .lean()
    .then(category => {
      Record.find({ categoryId: category._id })
        .lean()
        .then(records => {
          let totalAmount = 0
          for(let i = 0; i < records.length; i++){
            totalAmount += records[i].amount
            records[i].icon = category.icon
          }
          res.render('index', { records, totalAmount })
        })
    })
    .catch(error => console.error(error)) 
})

module.exports = router