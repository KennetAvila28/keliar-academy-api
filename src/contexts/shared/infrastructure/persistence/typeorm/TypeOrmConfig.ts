/**
 *
 */
import config from 'config'

export class TypeOrmConfig {
  url: string
  type: 'mysql' | 'mariadb' | 'postgres' | 'sqlite' | 'mssql' | 'mongodb'
  host: string
  port: number
  username: string
  password: string
  database: string

  constructor() {
    this.url = config.get('storage.database.url')
    this.type = config.get('storage.database.type')
    this.host = config.get('storage.database.host')
    this.port = config.get('storage.database.port')
    this.username = config.get('storage.database.username')
    this.password = config.get('storage.database.password')
    this.database = config.get('storage.database.database')
  }
}
