import { Client } from 'pg';
import dbConfig from './dbConfig';

const client = new Client(dbConfig);

export default client;
