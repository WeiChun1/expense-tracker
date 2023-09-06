if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const bcrypt = require('bcryptjs')
const userList = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: '小新',
    email: 'user2@example.com',
    password: '12345678'
  }
]
const recordList = [
  {
    name: '午餐',
    date: '2019-04-23',
    category: '餐飲食品',
    amount: 60
  },
  {
    name: '晚餐',
    date: '2019-04-23',
    category: '餐飲食品',
    amount: 60
  },
  {
    name: '捷運',
    date: '2019-04-23',
    category: '交通出行',
    amount: 120
  }, 
  {
    name: '電影：驚奇隊長',
    date: '2019-04-23',
    category: '休閒娛樂',
    amount: 220
  },
  {
    name: '租金',
    date: '2015-04-01',
    category: '家居物業',
    amount: 25000
  }
]

db.once('open', () => {
  Promise.all(
    userList.map(seedUser => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => {
          return User.create({
            name: seedUser.name,
            email: seedUser.email,
            password: hash
          })
        })
    })
  )
    .then(user => {
      return Promise.all(Array.from({length: recordList.length}, (_, i) => {
        const { name, date, category, amount } = recordList[i]
        const userId = i % 2 ? user[0]._id : user[1]._id
        return Category.findOne({ name: category }).lean()
        .then(category => {
          return Record.create({
            name,
            date,
            amount,
            userId,
            categoryId: category._id
          })
        }) 
      }))    
    })
    .catch(err => { console.log(err) })
    .finally(() => {
      console.log('done.')
      process.exit()
    })
})
