import { describe, it, expect } from 'vitest'
import { db } from '../../lib/db'
import { PrismaClient } from '@prisma/client'

describe('Database Client', () => {
  it('should export db client successfully', () => {
    expect(db).toBeDefined()
    expect(db).toBeInstanceOf(PrismaClient)
  })

  it('should have Prisma Client types available', () => {
    // Verify that db has the expected model accessors
    expect(db.user).toBeDefined()
    expect(db.cV).toBeDefined()
    expect(db.creditTransaction).toBeDefined()
  })

  it('should have correct model structure', () => {
    // Verify the database client has all expected models
    expect(db.user).toHaveProperty('findUnique')
    expect(db.user).toHaveProperty('create')
    expect(db.user).toHaveProperty('update')
    expect(db.user).toHaveProperty('delete')

    expect(db.cV).toHaveProperty('findMany')
    expect(db.cV).toHaveProperty('create')

    expect(db.creditTransaction).toHaveProperty('create')
    expect(db.creditTransaction).toHaveProperty('findMany')
  })

  it('should have disconnect method', () => {
    expect(db.$disconnect).toBeDefined()
    expect(typeof db.$disconnect).toBe('function')
  })
})
