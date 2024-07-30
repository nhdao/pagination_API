const mongoose = require('mongoose')
const User = require('./../models/user.model')

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI)
    console.log('DB connected')
    
    const db = mongoose.connection
    db.once('open', async () => {
      if(await User.countDocuments() > 0) {
        return
      }
    
      Promise.all([
        User.create({name: 'User 1'}),
        User.create({name: 'User 2'}),
        User.create({name: 'User 3'}),
        User.create({name: 'User 4'}),
        User.create({name: 'User 5'}),
        User.create({name: 'User 6'}),
        User.create({name: 'User 7'}),
        User.create({name: 'User 8'}),
        User.create({name: 'User 9'}),
        User.create({name: 'User 10'}),
        User.create({name: 'User 11'}),
        User.create({name: 'User 12'}),
        User.create({name: 'User 13'}),
        User.create({name: 'User 14'}),
        User.create({name: 'User 15'}),
      ]).then(() => {
        console.log('Users added')
      })
    })
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = connectDB

