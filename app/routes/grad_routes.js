// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Grad = require('../models/grad')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET
router.get('/grads', (req, res, next) => {
  Grad.find()
    .then(grads => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return grads.map(grad => grad.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(grads => res.status(200).json({ grads: grads }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET
router.get('/grads/:id', (req, res, next) => {
  Grad.findById(req.params.id)
    .then(grad => {
      console.log(grad)
      return res.status(200).json({ grad: grad.toObject() })
    })
    .catch(next)
})

// CREATE
// POST
router.post('/grads', (req, res, next) => {
  Grad.create(req.body.person)
    .then(person => {
      res.status(201).json({ person: person})
    })
    .catch(next)
})

// UPDATE
// PATCH
router.patch('/grads/:id', removeBlanks, (req,res,next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  if(req.body.person.assignedToUser){
    delete req.body.person.owner
  }
  console.log('here', req.body.person)
  Grad.findById(req.params.id)
    .then(handle404)
    .then(grad => {
      // requireOwnership(req, grad)
      return grad.updateOne(req.body.person)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DELETE
router.delete('/grads/:id', (req, res, next) => {
  Grad.findById(req.params.id)
    .then(handle404)
    .then(grad => grad.remove())
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
