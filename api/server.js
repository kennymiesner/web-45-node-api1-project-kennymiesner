const express = require('express')
const Users = require('./users/model')
const server = express()
server.use(express.json())

// [POST] /api/users/:id (C of CRUD, create new user from JSON payload)
server.post('/api/users/:id', (req, res) => {
  res.json('create user')
})

// [GET] /api/users/:id (R of CRUD, fetch user by :id)
server.get('/api/users/:id', (req, res) => {
  res.json('fetch user by id')
})

// [GET] /api/users/ (R of CRUD, fetch all users)
server.get('/api/users/', (req, res) => {
  res.json('fetch all users')
})

// [DELETE] /api/users/:id (D of CRUD, delete user)
server.delete('/api/users/:id', (req, res) => {
  res.json('delete user')
})

// [PUT] /api/users/:id (U of CRUD, update user by :id)
server.put('/api/users/:id', (req, res) => {
  res.json('update user')
})

module.exports = server