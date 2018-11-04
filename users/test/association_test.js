const assert = require('assert')
const mongoose = require('mongoose')
const User = require('../src/users')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')

describe('Association', done => {
  let daniel, blogPost, comment
  beforeEach(done => {
    daniel = new User({ name: 'Daniel' })
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
    User.findOne({ name: 'Daniel'}).populate('blogPosts').then(user => {
      assert(user.blogPosts[0].title === 'JS is awesome :D')
      done()
    })
  })

  it('saves a full relation graph', done => {
    User.findOne({ name: 'Daniel' }).populate({
      path: 'blogPosts', //load up all associated blogposts
      populate: {
        path: 'comments', // load up all associated comments
        model: 'comment', // tell it what model to use for association
        populate: {
          path: 'user', // load up associated user in comments
          model: 'user' // tell it what model to use
        }
      }
     }).then(user => {
       assert(user.name === 'Daniel')
       assert(user.blogPosts[0].title === 'JS is awesome :D')
       assert(user.blogPosts[0].comments[0].content === 'Best post of all time!! xoxoxo')
       assert(user.blogPosts[0].comments[0].user.name === 'Daniel')
       done()
     })
  })
})
