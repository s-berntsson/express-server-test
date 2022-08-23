const express = require('express'); //importera express
const app = express();  //initiera en express-applikation
const PORT = 5000;  //definiera PORT så att det enkelt går att ändra

//JSON parser middleware
app.use(express.json())

//lite data
let todos = [
    { todo: 'Köp kaffe' },
    { todo: 'Brygg kaffe' },
    { todo: 'Häll upp kaffe' },
    { todo: 'Drick kaffe' }
]
// app.<HTTP-metod>('URL', funktion(request, response))
app.get('/todos', (req, res) => {
    console.log(req.method, req.url)
    res.send(todos)
})

// POST-METOD
/*
POST-ANROP I FRONTEND KAN SE UT:

const data = {
    todo: 'Koda ett API
}

fetch('http://localhost:5000/todos', {
    method: 'POST',
    body: JSON.stringify(data),
    header: {
        'Content-type': 'application/json'
    }
})*/

// en liten funktion som hindrar att man lägger till samma objekt flera ggr
const containsObj = (array, obj, key) => {
    const result = array.find(item => item[key] === obj[key])
    return result
}

// Hur hanterar servern detta request?   
app.post('/todos', (req, res) => {
    const todo = req.body
    
    !containsObj(todos, todo, "todo") ? todos.push(todo) : null

    res.send(todos)
})

app.listen(PORT, () => {
    console.log('Server listening on port:', PORT)
})

