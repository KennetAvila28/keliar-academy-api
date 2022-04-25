import { EntitySchema } from 'typeorm'
import { Class } from '../../../domain/Class'
export const ClassEntity = new EntitySchema<Class>({
  name: 'Class',
  tableName: 'classes',
  target: Class,
  columns: {
    _id: {
      type: String,
      primary: true,
    },
    name: {
      type: String,
      length: 150,
    },
    createdAt: {
      type: Date,
      nullable: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },

  relations: {
    students: {
      type: 'many-to-many',
      target: 'Student',
      joinTable: {
        name: 'classStudents',
        joinColumn: {
          name: 'classId',
          referencedColumnName: '_id',
        },
        inverseJoinColumn: {
          name: 'studentId',
          referencedColumnName: '_id',
        },
      },
    },
  },
})
