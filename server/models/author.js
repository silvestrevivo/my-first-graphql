const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number
})
//mlab creates id by itself
module.exports = mongoose.model('Author', authorSchema)
