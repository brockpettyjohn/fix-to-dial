require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const cors = require('cors')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { serveClient: false });
const controller = require('./chatController.js');



users = [];
channels = [];
// connections = [];

app.use(bodyParser.json());
app.use(cors());
// This will serve the content of the build folder so that they are avaiable.
// app.use(express.static('./build'));



massive(process.env.DB).then(db => {
  app.set('db', db);
})
  .catch(err => {
    console.log('\n\n DB connect error >> ', err.message)
  });




app.post('/user', controller.createUser)

app.put('/user/:user_id', controller.update)

app.get('/user/:email', controller.getUser)

app.post('/channels', controller.createChannel)

app.get('/channels/:id', controller.getChannel)

app.get('/channels', controller.getAllChannels)

app.get('/messages/', controller.getAllMessages)

app.get('/messages/:id', controller.getMessagesByConvoId)


// sockets setup 

io.on('connection', socket => {
  console.log('A user connected')

  socket.on('user_connected', data => {
    socket.broadcast.emit('user_connected', { data })
    socket.emit('user_connected', { data })
  })

  socket.on('chat_message', data => {
    controller.createMessage(app, data).then(resp => {
      socket.broadcast.emit('chat_message', data)
      socket.emit('chat_message', data)
    })
      .catch(err => {
        socket.emit('error', err.message)
      })
    console.log('\n\n what is this>> ', data)

  })

  socket.on('chat', data => {
    socket.broadcast.emit('chat', data);
  })

});



//had server.listen before and changed it to see if the variable definition was the problem
console.log('\n\n env >> ', process.env.HOST)

const path = require('path');
// app.get('/*', (req, res) => {
//   // This will send back the index.html file for the react app back whenever we make a request
//   // that we haven't explicitly set to return something else. 
//   // This is to handle the broswerHistory instead of HashHistory in React
//   res.sendFile(path.join(__dirname, '/build/index.html'));
// })
const port = 3030
server.listen({
  port: port,
  // host: process.env.HOST || 'localhost'
}, () => {
  console.log(`magic listening on ${port} :: ${port}`)
})