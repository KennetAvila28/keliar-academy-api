import { BaseEntity } from '../../../domain/BaseEntity'
import { Connection, EntitySchema, getConnection, Repository } from 'typeorm'
import { injectable } from 'inversify'

@injectable()
export abstract class TypeOrmRepository<T extends BaseEntity> {
  _client: Connection;

  constructor() {
    this._client = getConnection();
  }

  protected abstract entitySchema(): EntitySchema<T>;

  protected async repository(): Promise<Repository<T>> {
    return this._client.getRepository(this.entitySchema());
  }

  protected async persist(entity: T): Promise<T> {
    const repository = await this.repository();
    return await repository.save(entity as any);
  }
}
