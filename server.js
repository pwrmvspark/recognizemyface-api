const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const app = express()
const knex = require('knex')

const db  = knex({
  client: 'pg',
  connection: { 
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'recognizeMyFace'
  }
});

db.select('*').from('users').then(data => {
  // console.log(data)
})

console.log(db.select('*').from('users'))

app.use(bodyParser.json())
app.use(cors())

const database = {
  users: [
    {
      id: '123',
      name: 'john',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined:   Date()
    },
    {
      id: '124',
      name: 'sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password) {
      res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in')
  }
})

app.post('/register', (req,res) => {
  const { name, email, password } = req.body
  // bcrypt.hash(password, null, null, function(err, hash) {
  //   console.log(hash)
  // })

  db('users')
    .returning('*')
    .insert({
      email: email,
      name: name,
      joined: new Date()
    }).then(user => {
      res.json(user[0])
  })
  .catch(err => res.status(400).json('unable to register'))

})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  let found = false

  db.select('*').from('users').where({
    id: id
  })
  .then(user => {
    if (user.length) {
      res.json(user[0])
    } else {
      res.status(400).json('Not found')
    }
  })
    .catch(err => res.status(400).json('error getting user'))
    // console.log(user[0])
  })

app.put('/image', (req, res) => {
  const { id } = req.body
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries  => {
    res.json(entries[0])
  })
  .catch(error => res.status(400).json('unable to get entries'))
})

app.listen(3001, () => {
  console.log('app is running on port 3001')
})