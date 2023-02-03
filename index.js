require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())
app.use(express.static('build'))

morgan.token('content', (request) =>
    request.method === 'POST'
    ? JSON.stringify(request.body)
    : null
  )

app.get('/', (request, response) => {
    response.send(`<h1>Hello World</h1>`)
  })

app.get('/api/persons', (request, response) => {
    console.log('Hello World')
    Person
    .find({})
    .then(persons => {
      response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const datetime = new Date()
    Person
    .find({})
    .then(persons => {
      response.send(`<p> Phonebook has info for ${persons.length} people</p><p>${datetime}</p>`)
    })
  }
)

app.get('/api/persons/:id', (request, response) => {
  Person
  .findById(request.params.id)
  .then(note => {
    response.json(note)
  })
  }
)

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  Person.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing' })
  }
  const person = new Person ({
      name: body.name,
      number: body.number,
  })

  person.save().then(savedPerson => {
      response.json(savedPerson)
  })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
