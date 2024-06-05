const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const openaiService = require('./services/openaiService');
const bodyParser = require('body-parser');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let users = {};

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve 'index.html' when a GET request is made to the root URL ("/")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Add /check-fact endpoint
app.post('/check-fact', async (req, res) => {
    const text = req.body.text;
    const response = await openaiService.checkFact(text);
    res.json({ response });
});

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    socket.on('login', (username) => {
        users[socket.id] = username;
    });

    socket.on('chat message', async (msg) => {
        console.log('Received message on server:', msg);
        const username = users[socket.id];
        if (!username) {
            return socket.emit('error', { message: 'No username set' });
        }

        // Emit the user's message immediately to all clients.
        io.emit('chat message', { user: username, topic: msg.topic, message: msg.message });

        // Perform fact-checking in the background and send a correction if necessary.
        try {
            const factCheckResult = await openaiService.checkFact(msg.message);
            if (factCheckResult.isIncorrect) {
                io.emit('chat message', { user: 'Fact-Checker', topic: 'Correction', message: factCheckResult.correction });
            }
        } catch (error) {
            console.error(`Error in fact checking: ${error}`);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
        delete users[socket.id];
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});