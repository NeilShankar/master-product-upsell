const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
   name: String,
   email: String,
   shop: String
})


const User = mongoose.model('User', schema)

module.exports = {User, schema}