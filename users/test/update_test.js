const assert = require('assert')
const User = require('../src/users')

describe('Updating records', () => {
  let daniel

  beforeEach(done => {
    daniel = new User({ name: 'Daniel' })
    daniel.save().then(() => done())
  })

  it('instance set and save', done => {
    daniel.set('name', 'dandan')
    daniel
      .save()
      .then(() => User.find({}))
      .then(users => {
        console.log(users)
        assert(users.length === 1)
        assert(users[0].name === 'dandan')
        done()
      })
  })
})
