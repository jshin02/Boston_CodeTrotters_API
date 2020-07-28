const mongoose = require('mongoose')

const gradSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  identity: {
    type: String,
    required: true
  },
  compliment: {
    type: String,
    required: true
  },
  interests:{
    type: String,
    required: true
  },
  imageUrl:{
    type: String,
    required: true
  },
  linkedin:{
    type: String
  },
  github:{
    type: String
  },
  email:{
    type: String
  },
  instagram:{
    type: String
  },
  messageTitle:{
    type: String
  },
  messageContent:{
    type: String
  },
  endorsements:{
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Grad', gradSchema)
