const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../src/users')
const BlogPost = require('../src/blogPost')

describe('Middlewares', () => {
    let daniel, blogPost
    beforeEach(done => {
        daniel = new User({ name: 'Daniel' })
        blogPost = new BlogPost({ title: 'JS is awesome :D', content: 'Of course!' })

        daniel.blogPosts.push(blogPost)

        Promise.all([daniel.save(), blogPost.save()]).then(() => done())
    })
    it('users cleanup associated blogposts on delete/remove', done => {
        daniel.remove().then(() => BlogPost.countDocuments()).then(count => {
            assert(count === 0)
            done()
        })
    })
})