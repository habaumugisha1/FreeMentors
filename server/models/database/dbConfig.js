export default {
  user: 'postgres',
  database: 'freementors',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};
