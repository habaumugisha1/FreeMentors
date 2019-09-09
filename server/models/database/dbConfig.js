export default {
  user: 'postgres',
  database: 'travis_ci_test',
  password: '',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};
