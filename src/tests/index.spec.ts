import app from '../app'
import request from 'supertest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

request(app)
  .get('/products/topten')
  .send()
  .expect('Content-Type', /json/)
  .expect(200)
