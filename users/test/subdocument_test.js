const assert = require('assert')
const User = require('../src/users')

describe('Subdocuments', () => {
  it('can create a subdocument', done => {
    const daniel = new User({ name: 'Daniel', posts: [{ title: 'PostTitle' }, { title: 'PostTitle2' }] })
    daniel
      .save()
      .then(() => User.findOne({ name: 'Daniel' }))
      .then(user => {
        assert(user.posts[0].title === 'PostTitle')
        done()
      })
  })

  it('can add new posts (subdocuments) to existing user', done => {
    const daniel = new User({ name: 'Daniel', posts: [] })
    daniel
      .save()
      .then(() => User.findOne({ name: 'Daniel' }))
      .then(user => {
        user.posts.push({ title: 'New Post' })
        return user.save()
      })
      .then(() => User.findOne({ name: 'Daniel' }))
      .then(user => {
        assert(user.posts[0].title === 'New Post')
        done()
      })
  })

  it('can remove posts (subdocuments) to existing user', done => {
    const daniel = new User({ name: 'Daniel', posts: [{ title: 'Initial Post to be deleted!' }] })
    daniel
      .save()
      .then(() => User.findByIdAndUpdate(daniel._id, { $pull: { posts: { title: 'Initial Post to be deleted!' } } }))
      .then(() => User.findOne({ name: 'Daniel' }))
      .then(user => {
        assert(user.posts.length === 0)
        done()
      })
  })
})
