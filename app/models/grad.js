const mongoose = require('mongoose')
const songSchema = require('./songSchema')

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
  organization: {
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
  assignedToUser:{
    type: Boolean,
    default: false
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
  adviceContent:{
    type: String
  },
  messageContent:{
    type: String
  },
  endorsements:{
    type: String
  },
  songs: [songSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Grad', gradSchema)
