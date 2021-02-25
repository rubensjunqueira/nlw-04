import 'reflect-metadata';
import conn from './database';
import express from 'express';
import router from './routes';

conn();
const app = express();
app.use(express.json());
app.use(router);

export { app }