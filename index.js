const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// TEST ROUTE
app.get('/', (req, res) => {
    res.send('Hello World!');
});

/*
Endpoints/Routes messages CRUD List

CRUD: Crete, Read (Single & All), Update adn Delete

- [GET] /messages - Return a list of messages
- [GET] /messages/{id} - Return only a message according to the ID
- [POST] /messages - Create a new message
- [PUT] /messages/{id} - Update a message according to the ID
- [DELETE] /messages/{id} - Delete a message according to the ID
*/

/* ENDPOINTS/ROUTES */

const messages = ['This is the first message!', 'This is the second message!'];

// [GET] (All) - List all the messages
app.get('/messages', (req, res) => {
    res.send(messages);
});

// [GET] (Single) - List a especific message by ID
app.get('/messages/:id', (req, res) => {
    const { id } = req.params;
    const idFix = id - 1;
    const message = messages[idFix];
    res.send(message);
});

// [POST] - Create a new message
app.post('/messages', (req, res) => {
    const { message } = req.body;

    messages.push(message);
    res.send(`Message created with success: ${message}.`);
});

// [PUT] - Update a especifi message by ID
app.put('/messages/:id', (req, res) => {
    const { id } = req.params;
    const idFix = id - 1;

    const { newMessage } = req.body;
 messages[idFix] = newMessage;
    
    const oldMessage = messages[idFix];

   
    res.send(
        `[PUT] Update test: id = ${id}, message = {${oldMessage}} updated to {${newMessage}}`,
    );
});

/* PORT LISTENDED */
app.listen(port, () => {
    console.info(`index.js running in adress http://localhos:${port}`);
});
