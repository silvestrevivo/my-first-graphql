const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
})
//mlab creates id by itself
module.exports = mongoose.model('Book', bookSchema)
