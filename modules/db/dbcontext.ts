import { DataSource } from "typeorm";

export const dbcontext = new DataSource({
    type: "sqlite",
    logging: true,
    synchronize: true,
    database: './blog.db',
    entities: [__dirname + '/../**/*.entity.{js,ts}']
})

