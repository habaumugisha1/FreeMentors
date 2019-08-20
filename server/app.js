import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import masterRoute from './routes/masterRoute';

const app = express();
app.use(cors());
app.use(json());
masterRoute(app);
app.listen(3000);
