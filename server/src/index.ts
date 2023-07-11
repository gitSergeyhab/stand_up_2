import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {Server} from 'socket.io';
import { router } from './routers';
import { sequelize } from './sequelize';
import { errorMiddleware } from './middlewares/error-middleware';
import { connectionHandler } from './web-socket/handlers/connection-handler';


const ALLOWED_URLS = ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5500', 'http://127.0.0.1:5500'];
const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];
const port = process.env.PORT || 4000;

const app = express();
const server = new http.Server(app);
const io = new Server(server, { 
    cors: { origin: ALLOWED_URLS },
    maxHttpBufferSize: 2 * 1024 * 1024 * 1.01
});

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'files', 'images')));
app.use(cors({
    origin: ALLOWED_URLS,
    methods: ALLOWED_METHODS,
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);
app.use(errorMiddleware);

io.on('connection', (socket) => connectionHandler(socket, io));

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        server.listen(port, () => console.log(`SERVER started on PORT :  ${port}`));
    } catch (err) {
        console.log(' -- Start Server Error: ', {err});
    }
}

start();