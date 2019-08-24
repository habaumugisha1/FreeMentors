import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import masterRoute from './routes/masterRoute';

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
masterRoute(app);
export default app;
