import { DataSource } from "typeorm";

const loggingType = process.env.BLOG_LOGGING_LEVEL;
const synchronizeType = process.env.BLOG_SYNC_LEVEL;
const DbFile = process.env.BLOG_DB_FILE;

export const dbcontext = new DataSource({
    type: "sqlite",
    logging: Boolean(loggingType),
    synchronize: true,
    database: DbFile ?? './blog.db',
    entities: [__dirname + '/../**/*.entity.{js,ts}']
})
