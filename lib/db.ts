import { Pool } from 'pg';


if (!(global as any).pgPool) {
    (global as any).pgPool = new Pool({
        connectionString: process.env.POSTGRES_URL_CONNECTION,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 50000
    })
}
const pool = (global as any).pgPool;
export default pool;