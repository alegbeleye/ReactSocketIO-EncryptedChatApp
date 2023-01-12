const app = require('./app')
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io')
const dotenv = require("dotenv")
const cors = require('cors');
const request = require('request')

app.use(cors());

const io = new Server (server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    }
  });

dotenv.config({ path: "./config.env" })


io.on('connection', (socket)=>{
    console.log('user just connected');
    socket.on('disconnect', ()=>{
        console.log('user just disconnected');
    });

    socket.on('joinRoomClient', (value)=>{
      socket.join(value.room);
      console.log(`joined room: ${value.room}`)
    })

    socket.on('clientMessage', (value)=>{
      console.log('user sent a message');
      io.to(value.room).emit('serverMessage', {name:value.name, message:value.message});
    })

    socket.on('leaveRoomClient', (room)=>{
      socket.leave(room);
      console.log(`left room ${room}`);
    })
})

const port = process.env.PORT
app.listen(port, () => console.log(`App running on port: ${port}`))
server.listen(3001, () => console.log(`App running on port: 3001`))