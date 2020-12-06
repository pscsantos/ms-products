import 'reflect-metadata';
import { getConnection, createConnection, Connection } from "typeorm";
import { ENTITIES } from '../entities';

export const connection = async(): Promise<Connection> => {
    try {
      return getConnection();
    } catch (err) {
      return await createConnection({
        type: "mysql",
        host: "tcc-estacio-mysql.mysql.database.azure.com",
        port: 3306,
        username: process.env["DB_username"],
        password: process.env["DB_password"],
        database: process.env["DB_database"],
        synchronize: false,
        logging: false,
        entities: ENTITIES,
      });
    }
}