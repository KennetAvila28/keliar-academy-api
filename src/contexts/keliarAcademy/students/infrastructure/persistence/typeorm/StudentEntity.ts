import { EntitySchema } from 'typeorm'
import { Student } from '../../../domain/Student'
export const StudentEntity = new EntitySchema<Student>({
  name: 'Student',
  tableName: 'students',
  target: Student,
  columns: {
    _id: {
      type: String,
      primary: true,
    },
    names: {
      type: String,
      length: 150,
    },
    lastNames: {
      type: String,
      length: 150,
    },
    phone: {
      type: String,
      length: 15,
    },

    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    createdAt: {
      type: Date,
      nullable: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String,
      nullable: true,
    },
  },
  relations: {
    classes: {
      type: 'many-to-many',
      target: 'Class',
      joinTable: {
        name: 'classStudents',
        joinColumn: {
          name: 'studentId',
          referencedColumnName: '_id',
        },
        inverseJoinColumn: {
          name: 'classId',
          referencedColumnName: '_id',
        },
      },
    },
  },
})
