/**
 *  TypeOrmClient
 */
import { createConnection } from 'typeorm'
import { TypeOrmConfig } from './TypeOrmConfig'
import { UserEntity } from '../../../../keliarAcademy/users/infrastructure/persistence/typeorm/UserEntity'
export class TypeOrmClient {
  async getTypeOrmConnection() {
    const config = new TypeOrmConfig()

    return await createConnection({
      type: config.type,
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      uuidExtension: 'uuid-ossp',
      entities: [UserEntity],
      synchronize: true,
      extra: {
        ssl:false
      },
    })
  }
}
