const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', client => {
    client.on("user connected", (user) => {
        io.sockets.emit('update user connected', user);
    });
    client.on('send message', (message) => {
        io.sockets.emit('send message to client', message);
    });
    client.on('disconnect', () => {
        console.log('disconnected')
    })
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server listening on port ${port}`));