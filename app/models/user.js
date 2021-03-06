const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gradId: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  newUser: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    default: 'basic'
  },
  token: String
}, {
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

module.exports = mongoose.model('User', userSchema)
