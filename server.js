const express = require('express')
const bodyParser = require('body-parser')

app.use(bodyParser.json)
const app = express()

const database = {
  users: [
    {
      id: '123',
      name: 'john',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '321',
      name: 'sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send('this is working')
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.user[0].password) {
      res.json('success')
    } else {
      res.status(400).json('error logging in')
    }
  res.json('signin working')
})

// app.post('/register', (req, res) => {

// })

app.listen(3000, () => {
  console.log('app is running on port 3000')
})

/*
/signin === POST (success/fail)
/register === POST (return user object)
/profile/:userid === GET (user object)
/image === PUT (user/count)
*/