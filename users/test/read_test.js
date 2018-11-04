const assert = require('assert')
const User = require('../src/users')

describe('reading users from db', () => {
  let daniel, sally, joe, maria
  beforeEach(done => {
    daniel = new User({ name: 'Daniel' })
    joe = new User({ name: 'Joe' })
    maria = new User({ name: 'Maria' })
    sally = new User({ name: 'Sally' })    

    Promise.all([daniel.save(), sally.save(), joe.save(), maria.save()])
      .then(() => done())
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
      assert(user.name === 'Daniel')
      done()
    })
  })

  it('can skip and limit and sort the result', done => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
      assert(users.length === 2)
      assert(users[0].name === 'Joe')
      assert(users[1].name === 'Maria')
      done()
    })
  })
})
