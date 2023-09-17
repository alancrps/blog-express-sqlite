import { DataSource } from "typeorm";

export const dbcontext = new DataSource({
    type: "sqlite",
    logging: false,
    synchronize: true,
    database: './blog.db',
    entities: [__dirname + '/../**/*.entity.{js,ts}']
})

