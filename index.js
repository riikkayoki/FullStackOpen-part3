const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())

morgan.token('content', (request) =>
    request.method === 'POST'
    ? JSON.stringify(request.body)
    : null
  )

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "040-123456"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "040-123456"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "040-123456"
    }
]

app.get('/', (request, response) => {
    response.send(`<h1>Hello World</h1>`)
  })

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const datetime = new Date()
    const ppl = persons.filter(x => x.id).length
    return response.send(`<p> Phonebook has info for ${ppl} people</p><p>${datetime}</p>`)
  }
)

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const find_person = persons.find(p => p.id === id)

    if (find_person) {
        response.json(find_person)
    } else {
        response.send(`<p>Sorry, id not found. Error 404 - Not Found</p>`)
        response.status(404).end()
    }
  }
)

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })

app.post('/api/persons', (request, response) => {
    const names = persons.map(person => person.name)
    const generateId = Math.ceil(Math.random() * 10000)
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(404).json({
        error: 'content missing'
      })
    }

    if (names.includes(body.name)) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
    const person = {
        id: generateId,
        name: body.name,
        number: body.number || false
    }
    persons = persons.concat(person)
    response.json(person)
  })


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)