
import userEndPoint from './userRoute/userEndPoint';

export default (app) => {
  app.use('/api/v1', userEndPoint);
};
