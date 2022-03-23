/**
 *  TypeOrmClient
 */
import { createConnection } from 'typeorm'
import { TypeOrmConfig } from './TypeOrmConfig'
import { TypeOrmEntities } from './TypeOrmEntities';
export class TypeOrmClient {
  async getTypeOrmConnection() {
    const config = new TypeOrmConfig();

    return await createConnection({
      type: config.type,
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      uuidExtension: 'uuid-ossp',
      entities: TypeOrmEntities,
      synchronize: true,
      extra: {
        ssl:false
      },
    });
  }
}
