import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import allowMethod from 'allow-methods';
import swaggerUi from 'swagger-ui-express';
import masterRoute from './routes/masterRoute';
import swaggerDoc from '../swagger.json';


const app = express();
app.use(cors());
app.use(json());
app.use(allowMethod(['get', 'post', 'head', 'delete', 'patch'], 'Method Not allowed'));
app.use(urlencoded({ extended: true }));
app.get('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
masterRoute(app);
app.listen(3000);
export default app;
