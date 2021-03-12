const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  date: { type: Date },
  fonction: { type: String },
  phone: { type: String },
  email: { type: String },
  entreprise: { type: String },
  address1: { type: String },
  address2: { type: String },
  postalCode: { type: Number },
  city: { type: String },
  country: { type: String }
})

module.exports = mongoose.model('Client', clientSchema)