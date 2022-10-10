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

// [GET] (All) - List all the messages
app.get('/messages', (req, res) => {
    res.send(messages.filter(Boolean)); // doesn't show null
});

// [GET] (Single) - List a especific message by ID
app.get('/messages/:id', (req, res) => {
    const { id } = req.params;
    const message = messages[id - 1];

    if (!message) {
        res.status(404).send('Message not found!');
        return;
    }

    res.send(message.text);
});

// [POST] - Create a new message
app.post('/messages', (req, res) => {
    const message = req.body;

    if (!message || !message.text) {
        res.status(400).send(
            'Create Failed! Please check if {text} exists and is not empty and try again!',
        );
        return;
    }

    const id = messages.length + 1;
    message.id = id;

    messages.push(message);
    res.send(`Message created with success: ${message.text}`);
});

// [PUT] - Update a especific message by ID
app.put('/messages/:id', (req, res) => {
    // GET: message by id who wants to update!
    const { id } = req.params;
    const message = messages[id - 1];

    // VALIDATION

    if (id > messages.length) {
        res.status(404).send('Message not found! Update Failed!');
        return;
    }

    if (!req.body.newText) {
        res.status(400).send(
            'Update failed! Please check that {newText} exists and is not empty and try again!',
        );
        return;
    }

    // Get the new text from REQUEST BODY
    const { newText } = req.body;

    // UPDATE MESSAGE
    const oldText = message.text;
    message.text = newText;

    res.send(
        `[PUT] Update test: index = ${message.id}, message = {${oldText}} updated to {${newText}}`,
    );
});

// [DELETE] - Delete a especific message by ID
app.delete('/messages/:id', (req, res) => {
    const { id } = req.params;
    const message = messages[id - 1];
    const oldMessage = message.text;

    // VALIDATION
    if (id > messages.length) {
        res.status(404).send('Message not found! Delete failed!');
        return;
    }

    // DELETE MESSAGE
    /* messages.splice(id - 1, 1);   // remove from array */

    // DELETE MESSAGE
    delete messages[id - 1]; // change for null

    res.send(
        `[DELETE] Delete test: index = ${message.id}, message = {${oldMessage}} removed!`,
    );
});

/* PORT LISTENDED */
app.listen(port, () => {
    console.info(`index.js running in adress http://localhos:${port}`);
});
