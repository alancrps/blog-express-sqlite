import { DataSource } from "typeorm";

const loggingType = process.env.BLOG_LOGGING_LEVEL;
const synchronizeType = process.env.BLOG_SYNC_LEVEL;
const DbFile = process.env.BLOG_DB_FILE;

export const dbcontext = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    logging: false,
    synchronize: true,
    database: 'blog',
    entities: [__dirname + '/../**/*.entity.{js,ts}']
})
