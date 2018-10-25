const assert = require('assert')
const User = require('../src/users')

describe('Validating records', done => {
  it('requires a user name', () => {
    const user = new User({ name: undefined })
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name
    assert(message === 'Name is required.')
  })

  it("requires a user's name longer than 2 chars", () => {
    const user = new User({ name: 'Da' })
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name
    assert(message === 'Name must be longer than 2 characters.')
  })

  it('disallows invalid records from being saved', done => {
    const user = new User({ name: 'Da' })
    user.save().catch(validationResult => {
      const { message } = validationResult.errors.name
      assert(message === 'Name must be longer than 2 characters.')
      done()
    })
  })
})
