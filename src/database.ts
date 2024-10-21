// database.ts
import knex, { Knex } from 'knex';
import config from '../knexfile';

let knexInstance: Knex;

if(process.env.NODE_ENV === 'test'){
    knexInstance = knex(config.test)
}
else{
    knexInstance = knex(config.development);
}
export { knexInstance }; // Or use another environment