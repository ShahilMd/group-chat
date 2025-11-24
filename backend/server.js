import express from 'express';
import {createServer} from 'node:http';
import {Server} from "socket.io";
import dotenv from 'dotenv';


dotenv.config();
const  app = express()
const server = createServer(app)
const io = new Server(server,{
    cors:{
        origin:process.env.FRONTEND_URL,
    }
});
const ROOM = 'group'
io.on('connection',(socket) => {
    console.log('a user connected',socket.id);
    socket.on('joinRoom',async (userName)=>{
        console.log(userName,' is join the group');
        await socket.join(ROOM)

        //send to all
        // io.to(ROOM).emit('roomNotice',userName)

        //broadcast means send to all except current user
        socket.to(ROOM).emit('roomNotice',userName)
    })
    socket.on('chatMessage',(message)=>{
        socket.to(ROOM).emit('chatMessage',message)
    })
    socket.on('typing',(userName) => {
        socket.to(ROOM).emit('typing',userName)
    })
    socket.on('stopTyping',(userName) => {
        socket.to(ROOM).emit('stopTyping',userName)
    })
})

app.get('/',(req,res)=>{
    res.send('<h1>Hello World!</h1>')
})

server.listen(3000,()=>{
    console.log("Server started on port 3000: http://localhost:3000");
})