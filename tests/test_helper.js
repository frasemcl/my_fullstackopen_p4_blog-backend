const Blog = require('../models/blog')

// Initial test posts to add to an empty database

const initialBlogs = [
  {
    title: 'Hello helper',
    author: 'frasemcl',
    url: 'test.com',
    likes: 100,
  },
  {
    title: 'Im still here',
    author: 'fraser',
    url: 'fake.website.com',
    likes: 2,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
}
