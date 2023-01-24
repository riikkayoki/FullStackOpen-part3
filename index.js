const express = require('express')
const app = express()

app.use(express.json())

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

app.get('/api/info', (request, response) => {
    const datetime = new Date()
    const ppl = persons.filter(x => x.id).length
    return response.send(`<p> Phonebook has info for ${ppl} people</p><p>${datetime}</p>`)
  })


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)