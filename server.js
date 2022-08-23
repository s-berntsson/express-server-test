// IMPORTS & VARIABLES ------------
const express = require('express');
const app = express()   // create an express app
const PORT = 5000   // use variable to enable easy change
let users = require('./initial-data.json')  //import initial data


// MIDDLEWARE -------
app.use(express.json())


// CALLBACKS ------
    // see if <obj> data under <field> already exists
const userDataMatch = (obj, field) => {
    const result = users.some(user => user[field] === obj[field])
    return result
}    

    // login attempt with submitted username and password
const loginSuccess = (attempted) => {
    let result = false

    // return the registered user with matching username
    const registered = users.find(item => item["username"] === attempted["username"])

    // if it is registered, try if password matches
    if (registered) {
        result = attempted["password"] === registered["password"]
    }

    return result
}    


// ENDPOINT LOGIN ---------
app.post('/login', (req, res) => {
    const user = req.body
    const login = {
        success: loginSuccess(user)
    }
    const status = login.success ? 200 : 401

    res.status(status).send({success: loginSuccess(user)})
})


// ENDPOINT SIGNUP ---------
app.post('/signup', (req, res) => {
    const user = req.body

    let resObj = {
        usernameExists: userDataMatch(user, "username"),
        emailExists: userDataMatch(user, "email"),
        success: false
    }

    //if username and email are not already in use: set {success: true} and save user data
    if (!resObj.usernameExists && !resObj.emailExists){
        resObj.success = true
        users.push(user)
    }

    res.send(resObj)
})


// SERVER LISTEN ----------
app.listen(PORT, () => {
    console.log("Server now listening on port ", PORT)
})