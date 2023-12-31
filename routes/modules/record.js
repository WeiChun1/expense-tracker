const express = require('express')

const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')


router.get('/new', (req, res) => {
  Category.find().lean()
    .then(categories => res.render('new', { categories }))
  
})
router.post('/', (req, res) => {
  const userId = req.user._id
  const {categoryId, amount, date, name} = req.body
  Record.create({
    categoryId,
    userId,
    amount,
    date,
    name
  })
  .then(() => res.redirect('/'))
  .catch(err => console.log(err))
})
router.get('/:category', (req, res) => {
  const category = req.params.category
  const userId = req.user._id
  Category.findOne({ name_en: category })
    .lean()
    .then(category => {
      Record.find({ categoryId: category._id,  userId})
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

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Promise.all([
    Record.findOne({ _id, userId }).lean(),
    Category.find().lean()
  ])
    .then(([record, categories]) => {
      Category.findOne({ _id: record.categoryId }).lean()
      .then(category =>{
        return record.categoryId.name = category.name
      })
      .then(() => res.render('edit', { record, categories }))
    })
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const { categoryId, amount, date, name } = req.body
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .update({
      categoryId,
      amount,
      date,
      name
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  Record.findOne({ _id })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
module.exports = router