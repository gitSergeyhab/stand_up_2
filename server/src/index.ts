import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express from 'express';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';

import { router } from './routers';
import { sequelize } from './sequelize';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { errorMiddleware } from './middlewares/error-middleware';
import { addUserHandler, messageHandler } from './web-socket/handlers';

const app = express();
const server = new http.Server(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080'
    }
});

const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'files', 'images')))



app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);
app.use(errorMiddleware);

type Message = {
    userId: string;
    avatar?: string;
    roles: string[];
    text: string;
    nik: string;
}

io.on('connection', (socket) => {
    socket.on('message', (data) => messageHandler(io, data));
    socket.on('room:add-user', (data) => addUserHandler(io, socket, data));
    // socket.on('add-user', (data) => addUserHandler(io, data))
    socket.on('disconnect', () => {
        console.log({socket}, '____socket___ => DISconnect <=');
    })
    
})

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        server.listen(port, () => console.log(`SERVER started on PORT :  ${port}`))
        // app.listen(port, () => console.log(`SERVER started on PORT :  ${port}`));
    } catch (err) {
        console.log(' -- Start Server Error: ')
        console.log(err)

    }
}

start();