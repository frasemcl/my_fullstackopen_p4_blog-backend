const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
}
