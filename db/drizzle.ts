
// neon database
// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// import * as schema from "./schema"
// const sql = neon(process.env.DATABASE_URL!);
// const db = drizzle(sql,{schema});

// export default db;


//for supabase
// import { drizzle } from 'drizzle-orm/postgres-js';
// import * as schema from "./schema"
// import postgres from 'postgres'
// const connectionString = process.env.DATABASE_URL!
// const client = postgres(connectionString)
// const db = drizzle(client,{schema});

// export default db;


//local postgres
import "dotenv/config"
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema"


export const connectionToPG=async()=>{


const client = new pg.Client({
    host:process.env.PG_HOST!,
    user:process.env.PG_USER,
    password:process.env.PG_PWD,
    port:Number(process.env.PG_PORT),
    database:process.env.PG_DATABASE!
});
await client.connect();
const db = drizzle(client,{schema});
return {db,client};

}

