const Category = require('../category')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const categorySeed = [
  {
    "name": "家居物業",
    "name_en": "household",
    "icon": "fa-solid fa-house"
  },
  {
    "name": "交通出行",
    "name_en": "fare",
    "icon": "fa-solid fa-van-shuttle"
  },
  {
    "name": "休閒娛樂",
    "name_en": "entertainment",
    "icon": "fa-solid fa-face-grin-beam"
  },
  {
    "name": "餐飲食品",
    "name_en": "food",
    "icon": "fa-solid fa-utensils"
  },
  {
    "name": "其他",
    "name_en": "other",
    "icon": "fa-solid fa-pen"
  }
]
db.once('open', () => {
  return Promise.all(categorySeed.map(category => {
    return Category.create({
      name: category.name,
      icon: category.icon
    })
  }))
  .catch(err => console.log(err))
  .finally(() => {
    console.log('done.')
    process.exit()
  })
})