require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())

app.use(express.static('build'))

const Person = require('./models/person')

const cors = require("cors")
app.use(cors())

/*
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]*/



app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(p => {
        response.json(p)
    })
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        const result = `<p>Phonebook has info for ${persons.length} people</p>
                        <p>${new Date()}</p>`
        response.send(result)
    })
})


app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id).then(result => {
        response.status(204).end()
    }).catch(error => next(error))
})

function getRandomInt(max) {
    return Math.floor(Math.random()*Math.floor(max))
}

const generateId = () => {
    const uid = getRandomInt(99999)
    return uid
}

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if(!body.name || !body.number){
        return response.status(400).json({
            error: "name or number missing"
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savePerson => {
        response.json(savePerson)
    }).catch(error => next(error))

})


app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, {new:true}).then(updatedPerson => {
        response.json(updatedPerson)
    }).catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if(error.name === 'CastError' && error.kind === 'ObjectId'){
        return response.status(400).send({error:'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

