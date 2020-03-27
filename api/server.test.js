require('dotenv').config()

describe('server.js', () => {
  describe('environment', () => {
    test('should use the testing environment', () => {
      expect(process.env.DB_ENV).toBe('testing')
    })
  })
})
