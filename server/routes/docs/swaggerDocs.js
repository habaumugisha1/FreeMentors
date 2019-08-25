import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../../../swagger.json';


export default (app) => {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};
