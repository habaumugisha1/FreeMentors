
import userEndPoint from './userRoute/userRoute';
import sessionEndPoint from './sessionRoute/sessionRoute';

export default (app) => {
  app.use('/api/v1', userEndPoint);
  app.use('/api/v1', sessionEndPoint);
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message,
    });
  });
};
