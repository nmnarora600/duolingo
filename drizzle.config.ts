import "dotenv/config"
import type {Config} from "drizzle-kit"

export default {
    schema:"./db/schema.ts",
    out:"./drizzle",
    driver:"pg",
    dbCredentials:{
        // connectionString:process.env.DATABASE_URL!,    //hosted pg
        host:process.env.PG_HOST!,
        user:process.env.PG_USER,
        password:process.env.PG_PWD,
        port:Number(process.env.PG_PORT),
        database:process.env.PG_DATABASE!
    }
} satisfies Config;