const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

// <-----VERIFYING TESTING WORKS ------>
//                   BEGIN
describe('auth router', () => {
  test('should run the tests', () => {
    expect(true).toBe(true)
  })
})

// <----- RESETTING THE DB ----->
//                 BEGIN
beforeEach(async () => {
  await db('users').truncate()
  await request(server)
    .post('/api/auth/register')
    .send({
      username: 'Bane',
      password: 'bane'
    })
})

// <-------- REGISTRATION TESTS ---------->
//                      BEGIN
describe('POST /api/auth/register', () => {
  test('should return 201 created successfully', async () => {
    const expectedStatus = 201

    const res = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'Iggy',
        password: 'iggy'
      })
    console.log('***EYES HERE***', res.body)
    expect(res.status).toBe(expectedStatus)
  })

  test('should return a token', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'Iggy',
        password: 'iggy'
      })

    expect(typeof res.body.token === 'string').toBe(true)
  })
})

// <--------- LOGIN TESTS ---------->
//                BEGIN
describe('POST /api/auth/login', () => {
  test('should return 200 OK', async () => {
    const expectedStatus = 200

    const res = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'Bane',
        password: 'bane'
      })
    console.log('***EYES HERE***', res.body)
    expect(res.status).toBe(expectedStatus)
  })

  test('should return a token', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'Bane',
        password: 'bane'
      })
    expect(typeof res.body.token === 'string').toBe(true)
  })
})
