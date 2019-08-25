import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import allowMethod from 'allow-methods';
import masterRoute from './routes/masterRoute';

const app = express();
app.use(cors());
app.use(json());
app.use(allowMethod(['get', 'post', 'head', 'delete', 'patch'], 'Method Not allowed'));
app.use(urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.json({ message: 'hello' });
});
masterRoute(app);
app.listen(3000);
export default app;
