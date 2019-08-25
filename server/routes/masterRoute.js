
import userEndPoint from './userRoute/userRoute';
import sessionEndPoint from './sessionRoute/sessionRoute';
import swaggerDoc from './docs/swaggerDocs';

export default (app) => {
  app.use('/api/v1', userEndPoint);
  app.use('/api/v1', sessionEndPoint);
  swaggerDoc(app);
};
