import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import allowMethod from 'allow-methods';
import { config } from 'dotenv';
import masterRoute from './routes/masterRoute';

config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(allowMethod(['get', 'post', 'head', 'delete', 'patch'], 'Method Not allowed'));
masterRoute(app);
app.listen(port, () => console.log(`runing on port${port}`));
export default app;
