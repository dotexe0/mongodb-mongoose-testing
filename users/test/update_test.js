const assert = require('assert')
const User = require('../src/users')

describe('Updating records', () => {
  let daniel

  beforeEach(done => {
    daniel = new User({ name: 'Daniel', likes: 0 })
    daniel.save().then(() => done())
  })

  const assertName = (operation, done) =>
    operation.then(() => User.find({})).then(users => {
      assert(users.length === 1)
      assert(users[0].name === 'dandan')
      done()
    })

  const assertCount = (operation, done) =>
    operation.then(() => User.findOne({ name: 'Daniel'})).then(user => {
      assert(user.likes === 10)
      done()
    })

  it('instance set and save', done => {
    daniel.set('name', 'dandan')
    assertName(daniel.save(), done)
  })

  it('a model instance can update', done => {
    assertName(daniel.update({ name: 'dandan' }), done)
  })

  it('updates using class method', done => {
    assertName(User.update({ name: 'Daniel' }, { name: 'dandan' }), done)
  })

  it('updates one record using a model class', done => {
    assertName(User.findOneAndUpdate({ name: 'Daniel' }, { name: 'dandan' }), done)
  })

  it('updates a record by finding it by id', done => {
    assertName(User.findByIdAndUpdate(daniel._id, { name: 'dandan' }), done)
  })

  it('increments postcount by one using class based method', done => {
    assertCount(User.update({ name: 'Daniel' }, { $inc: { likes: 10 } }), done)
  })
})
