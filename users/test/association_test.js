const mongoose = require('mongoose')
const User = require('../src/users')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')

describe('Association', done => {
  let daniel, blogPost, comment
  beforeEach(done => {
    daniel = new User({ name: 'Daniel ' })
    blogPost = new BlogPost({ title: 'JS is awesome :D', content: 'Of course!' })
    comment = new Comment({ content: 'Best post of all time!! xoxoxo' })

    // make associations
    // note:  even though we pushed entire model, mongoose will only take ObjectId for reference
    daniel.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.user = daniel

    Promise.all([daniel.save(), blogPost.save(), comment.save()]).then(() => done())
  })
  
  it('saves a relation between user and blogpost', done => {
    User.findOne({ name: 'Daniel '}).then(user => {
      console.log('user', user)
      done()
    })
  })
})
