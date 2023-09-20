import { DataSource } from "typeorm";

const loggingType = process.env.BLOG_LOGGING_BOOLEAN;
const DbFile = process.env.BLOG_DB_FILE;

export const dbcontext = new DataSource({
    type: "sqlite",
    logging: false,
    synchronize: true,
    database: `${DbFile}`,
    entities: [__dirname + '/../**/*.entity.{js,ts}']
})
