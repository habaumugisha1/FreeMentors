
import userEndPoint from './userRoute/userRoute';
import sessionEndPoint from './sessionRoute/sessionRoute';

export default (app) => {
  app.use('/api/v1', userEndPoint);
  app.use('/api/v1', sessionEndPoint);
};