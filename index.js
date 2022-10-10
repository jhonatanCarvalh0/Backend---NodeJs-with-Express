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

const messages = [
    {
        id: 1,
        text: 'This is the first message!',
    },
    {
        id: 2,
        text: 'This is the second message!',
    },
];

// FUNCTIONS

const getValidMessages = () => messages.filter(Boolean);

const getMessageById = id => getValidMessages().find(msg => msg.id === id);

const messageExists = function (id, res) {
    if (!getMessageById(id)) {
        res.status(404).send('Message not found!');
        return false;
    }
    return true;
};

const reqIsValid = function (message, res) {
    if (!message || !message.text) {
        res.status(400).send(
            'Create Failed! Please check if {text} exists and is not empty and try again!',
        );
        return false;
    }
    return true;
};

// [GET] (All) - List all the messages
app.get('/messages', (req, res) => {
    res.send(getValidMessages()); // doesn't show null
});

// [GET] (Single) - List a especific message by ID
app.get('/messages/:id', (req, res) => {
    const id = +req.params.id;
    const message = getMessageById(id);

    if (!messageExists(id, res)) {
        return;
    }

    res.send(message.text);
});

// [POST] - Create a new message
app.post('/messages', (req, res) => {
    const message = req.body;

    if (!reqIsValid(message, res)) {
        return;
    }

    const lastId = messages[messages.length - 1];
    const id = lastId.id + 1;
    message.id = id;

    messages.push(message);
    res.send(`Message created with success: ${message.text}`);
});

// [PUT] - Update a especific message by ID
app.put('/messages/:id', (req, res) => {
    // GET: message by id who wants to update!
    const id = +req.params.id;
    const newMessage = req.body;
    const message = getMessageById(id);

    // VALIDATION
    if (!messageExists(id, res)) {
        return;
    }

    if (!reqIsValid(message, res)) {
        return;
    }

    // GET NEW MESSAGE
    const newText = newMessage.text;
    // UPDATE MESSAGE
    const oldMessage = message.text;
    message.text = newText;

    res.send(
        `[PUT] Update test: index = ${message.id}, message = {${oldMessage}} updated to {${newText}}`,
    );
});

// [DELETE] - Delete a especific message by ID
app.delete('/messages/:id', (req, res) => {
    const id = +req.params.id;
    const message = getMessageById(id);
    const oldMessage = message;

    // VALIDATION
    if (!messageExists(id, res)) {
        return;
    }

    // DELETE MESSAGE
    const indexOfMessage = messages.indexOf(message);
    messages.splice(indexOfMessage, 1); // remove from array

    res.send(
        `[DELETE] Delete test: index = ${message.id}, message = {${oldMessage.text}} removed!`,
    );
});

/* PORT LISTENDED */
app.listen(port, () => {
    console.info(`index.js running in adress http://localhos:${port}`);
});
