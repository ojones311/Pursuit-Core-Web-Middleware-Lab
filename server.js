const animalData = require('./data.json')

const animalListLowerCase = (obj) => {
    console.log(obj)
    const animalList = Object.keys(obj)
    let i = 0;
    const returnedObject = {}

    while(i < animalList.length){
        returnedObject[animalList[i].toLowerCase()] = true
        i ++
    }
    console.log(returnedObject)
    return returnedObject
}

// animalListLowerCase(animalData)

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000

app.use(bodyParser.urlencoded({
    extended: false
}))

const handleCors = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    next()
}

app.use(handleCors)

app.get('/', (req, res) => {
    res.send('Home page')
})
//Animal Tester

const isAnimal = (req, res, next) => {
    const lowerCaseAnimalList = animalListLowerCase(animalData)
    let animalName = req.params.animalName

    let infoRequest = {
        status: 'success',
        message: true
    }

    if (lowerCaseAnimalList[animalName.toLowerCase()]){
        next()
    } else {
        infoRequest.status = 'failed'
        infoRequest.message = false
        res.json(infoRequest)
    }
}

const giveInfoRequest = (req, res, next) => {
    let infoRequest = {
        status: 'success',
        message: true
    }
    res.json(infoRequest)     
}

app.get('/animal/:animalName', isAnimal, giveInfoRequest)

//Random Number Picker
const validNumbers = (req, res, next) => {
    let ceil = parseInt(req.query.ceil)
    let floor = parseInt(req.query.floor)

    if(isNaN(ceil) || isNaN(floor)){
        res.json({
            'status': 'Error, ceil or floor is not a valid number'
        })
    } else if(floor > ceil){
        res.json({
            'status': 'Error floor is greater than ceil'
        })
    }
      else {
          req.myNumbers = {
              ceil: ceil,
              floor: floor
          }
        next()
    }     
}
const generateSpread = (req, res, next) => {
    const ceil = req.myNumbers.ceil
    const floor = req.myNumbers.floor
    const newArr = []

    for (i = floor; i <= ceil; i++){
        newArr.push(i)
    }
    // console.log(newArr)

    let randomIndex = Math.floor(Math.random() * newArr.length)

    res.json({
        status: 'success',
        range: [floor, ceil],
        randomPick: newArr[randomIndex]
    })
}

app.get('/random', validNumbers, generateSpread)

//Queue Manager

const employees = ['xavier','michele','corey','reed']

const peek = () => {
    let statusManager1 = {
        status: 'success',
        data: employees[employees.length - 1]
    }
    return statusManager1
}

const enqueue = (name) => {
    employees.unshift(name)

    let statusManager2 = {
        status: 'success',
        enqueued: name
    }
    return statusManager2
}

const dequeue = () => {
    const lastElem = employees.slice(-1)
    employees = employees.slice(0, employees.length -1)

    let statusManager3 = {
        status: 'status',
        dequeued: lastElem
    }
    return statusManager3
}

const handleQueue = (req, res, next) => {
    const functionName = req.params.function
    
    if (functionName === 'peek'){
        peek()
    } else if(functionName === 'dequeue'){
        dequeue()
    } else if(functionName === 'enqueue'){
        const name = req.query.name
        console.log(req.query)
        console.log(name)
        if(name === undefined){
            res.send('Error try a name')
        } else{
            enqueue(name)
        }
    }
    console.log(employees)
}
app.get('/queue/:function', handleQueue)

// app.get('/queue/enqueue', handleQueue)

app.get('/queue', (req, res)=> {
    res.send('Home page test')
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})