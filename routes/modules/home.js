const express = require('express')

const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .then(records => {
      let totalAmount = 0
      return Promise.all(Array.from({ length: records.length }, (_, i) => {
        totalAmount += records[i].amount
        return Category.findOne({ _id: records[i].categoryId }).lean()
          .then(category => {
            records[i].icon = category.icon
            return records[i]
          })

      })).then((records) => {
        res.render('index', { records, totalAmount })
      })  
    })
    .catch(error => console.error(error)) 
})

module.exports = router