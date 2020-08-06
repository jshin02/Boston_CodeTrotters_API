// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// need to require mongoose to create Song Model here.
const mongoose = require('mongoose')

// pull in Mongoose model for examples
const songSchema = require('../models/songSchema')
const Song = mongoose.model('Song', songSchema)
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
// GET /examples
router.get('/songs', (req, res, next) => {
  Song.find()
    .then(songs => {
      return songs.map(song => song.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(songs => res.status(200).json({ songs: songs }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/songs/:id', (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Song.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(song => res.status(200).json({ song: song.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /examples
router.post('/songs/:id', (req, res, next) => {
  // set owner of new example to be current user
  // req.body.song.owner = req.user.id
  // need GRADID, show request, push song into songs array.
  let songJSON
  Song.create(req.body.song)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(song => {
      Grad.findById(req.params.id)
        .then(grad => {
          grad.songs.push(song)
          return grad.save()
        })
        .then(grad => res.status(200).json({ grad: grad.toObject() }))
        .catch(next)
      // res.status(201).json({ song: song.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    .catch(next)
    // .then(grad => {
    //   console.log('song data', songJSON)
    //   grad.songs.push(songJSON)
    //   return grad.save()
    // })
    // .then(grad => res.status(200).json({ grad: grad.toObject() }))
    // .catch(next)
})

// UPDATE song in inventory
router.patch('/songs/:id', removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.song.owner

  Song.findById(req.params.id)
    .then(handle404)
    .then(song => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      // requireOwnership(req, example)

      // pass the result of Mongoose's `.update` to the next `.then`
      return song.updateOne(req.body.song)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// UPDATE song in array
router.patch('/grads/:id/songs/:songId', removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.song.owner

  Grad.findById(req.params.id)
    .then(handle404)
    .then(grad => {
      grad.songs.id(req.params.songId).set(req.body.song)
      return grad.save()
    })
    .then(grad => {
    //   Song.findById(req.params.songId)
    //     .then(song => {
    //       return song.updateOne(req.body.song)
    //     })
    //   return grad
    console.log(grad)
    res.sendStatus(204)
    })
    .catch(next)
})

// DESTROY song from inventory
router.delete('/songs/:id', (req, res, next) => {
  Song.findById(req.params.id)
    .then(handle404)
    .then(song => {
      // throw an error if current user doesn't own `song`
      // requireOwnership(req, song)
      song.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY song from grad array
router.delete('/grads/:id/songs/:songId', (req, res, next) => {
  Grad.findById(req.params.id)
    .then(handle404)
    .then(grad => {
      grad.songs.id(req.params.songId).remove()
      return grad.save()
    })
    .then(grad => {
      console.log(grad)
      res.sendStatus(204)
    })
    .catch(next)
})

// DESTROY (pop) last song from grad array
router.delete('/grads/:id/songs', (req, res, next) => {
  Grad.findById(req.params.id)
    .then(handle404)
    .then(grad => {
      grad.songs.pop()
      return grad.save()
    })
    .then(grad => {
      console.log(grad)
      res.sendStatus(204)
    })
    .catch(next)
})

module.exports = router
