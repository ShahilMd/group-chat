import express from 'express';
import {createServer} from 'node:http';
import {Server} from "socket.io";

const  app = express()
const server = createServer(app)

app.get('/',(req,res)=>{
    res.send('<h1>Hello World!</h1>')
})

server.listen(3000,()=>{
    console.log("Server started on port 3000: http://localhost:3000");
})