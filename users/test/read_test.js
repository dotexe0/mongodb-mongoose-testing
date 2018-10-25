const assert = require('assert')
const User = require('../src/users')

describe('reading users from db', () => {
  let daniel
  beforeEach(done => {
    daniel = new User({ name: 'Daniel' })
    daniel.save().then(() => done())
  })

  it('finds all users with name Daniel', done => {
    User.find({
      name: 'Daniel'
    }).then(users => {
      assert(users[0]._id.toString() === daniel._id.toString())
      done()
    })
  })

  it('find a user with a particular id', done => {
    User.findOne({ _id: daniel._id }).then(user => {
      console.log('user', user)
      assert(user.name === 'Daniel')
      done()
    })
  })
})
