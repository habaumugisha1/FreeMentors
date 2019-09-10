import { Pool } from 'pg';
import dbConfig from './dbConfig';


export default new Pool(dbConfig);
