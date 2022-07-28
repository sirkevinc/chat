require('dotenv').config()
const tmi = require('tmi.js')
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const { PORT } = process.env;

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/', 'index.html');
  });

const client = new tmi.Client({
    channels: [process.env.CHANNEL]
});

client.connect(
    io.on('connection', (socket) => {
        client.on('message', (channel, tags, message, self) => {
            socket.emit('chat message', { tags, message, channel });
        })
        socket.on('disconnect', () => {
            console.log('User disconnected');
        })
    })
);

// client.on('message', (channel, tags, message, self) => {
//     console.log(`${tags['display-name']}: ${message}`);
// });

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
