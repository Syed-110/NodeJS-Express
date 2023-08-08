const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const users = [
    { id: 1, name: 'Tom' },
    { id: 2, name: 'Jack' },
    { id: 3, name: 'John' },
    { id: 4, name: 'Doe' },
    { id: 5, name: 'Kratos' },
    { id: 6, name: 'Zeus' },
    { id: 7, name: 'Athena' },
    { id: 8, name: 'Hera' }
]

//------------------------------------- GET API -------------------------------------------------

app.get('/', (req, res) => {
    res.send('Hello World');
});

//With Paramters
app.get('/api/users/:id', (req, res) => { ///api/users/:id/:name
    // res.send(req.params.id);
    // res.send(req.params);
    const user = users.find(item => item.id == parseInt(req.params.id));
    if(!user) {
        return res.status(404).send('User not found');
    }
    else {
        res.send(user);
    }
})
// With Query Parameters
app.get('/api/users', (req, res) => {
    // res.send(req.query);
    res.send(users);
})

// --------------------------------------------- Post API --------------------------------------------------
app.post('/api/users', (req, res) => {
    //With JOI validation
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // })
    // const result = schema.validate(req.body);
    // if(result.error) {
    //     return res.status(400).send(result.error.details[0].message);
    // }
    // Object Destructuring
    const { error } = validatUsers(req.body); // will return result.error
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    // W/O JOI validation
    // if(!req.body.name) {
    //     return res.status(400).send('Name is required');
    // }
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    }
    users.push(newUser);
    res.send(newUser);
})

// --------------------------------------------- PUT API --------------------------------------------------
app.put('/api/users/:id', (req, res) => {
    const user = users.find(item => item.id == parseInt(req.params.id));
    if(!user) {
        return res.status(404).send('User not found');
    }
    // const result = validatUsers(req.body);
    //Pbject Destructuring
    const { error } = validatUsers(req.body); // will return result.error
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    user.name = req.body.name;
    res.send(user);
})

// --------------------------------------------- DELETE API --------------------------------------------------
app.delete('/api/users/:id', (req, res) => {
    const user = users.find(item => item.id == parseInt(req.params.id));
    if(!user) {
        return res.status(404).send('User not found');
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.send(user);
})

function validatUsers(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(user);
}

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})

//const port = process.env.PORT || 3000; to assign a port number to the server. In cmd use set PORT=3000 to assign a port number to the server.