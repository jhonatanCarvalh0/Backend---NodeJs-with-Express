const express = require('express');

const app = express();
const port = 3000;

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

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.get('/messages/:id', (req, res) => {
    const { id } = req.params;
    const idFix = id - 1;
    const message = messages[idFix];
    res.send(message);
});

/* PORT LISTENDED */
app.listen(port, () => {
    console.info(`index.js running in adress http://localhos:${port}`);
});
