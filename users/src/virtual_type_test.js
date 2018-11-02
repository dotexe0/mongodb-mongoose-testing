const assert = require('assert')
const User = require('../src/users')

describe('Virtual types', () => {
  it('postcount returns number of posts', done => {
    const daniel = new User({ name: 'Daniel', posts: [{ title: 'PostTitle' }] })
    daniel.save()
      .then(() => User.findOne({ name: 'Daniel'}))
      .then(user => {
        assert(daniel.postCount === 1)
        done()
      })
  })
})
