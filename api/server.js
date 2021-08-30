const express = require('express')
const Users = require('./users/model')
const server = express()
server.use(express.json())

// [POST] /api/users/:id (C of CRUD, create new user from JSON payload)
server.post('/api/users/', (req, res) => {
  // res.json('create user')
  const newUser = req.body
  if (!newUser.name || !newUser.bio) {
    res.status(400).json({ message: "Please provide name and bio for the user" })
  } else {
    Users.insert(newUser)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: "There was an error while saving the user to the database" })
      })
  }
})

// [GET] /api/users/ (R of CRUD, fetch all users)
server.get('/api/users/', (req, res) => {
  // res.json('fetch all users')
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'The users information could not be retrieved' })
    })
})

// [GET] /api/users/:id (R of CRUD, fetch user by :id)
server.get('/api/users/:id', (req, res) => {
  // res.json('fetch user by id')
  Users.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    })
})

// [DELETE] /api/users/:id (D of CRUD, delete user)
server.delete('/api/users/:id', (req, res) => {
  Users.remove(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "The user could not be removed" })
    })
})

// [PUT] /api/users/:id (U of CRUD, update user by :id)
server.put('/api/users/:id', (req, res) => {
  // res.json('update user')
  const { id } = req.params
  const changes = req.body
  Users.update(id, changes)
    .then(result => {
      if (result) {
        res.status(200).json(result)
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "The user information could not be modified" })
    })
})

module.exports = server