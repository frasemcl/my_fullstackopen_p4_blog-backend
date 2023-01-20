const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

// Initial posts to add to empty database

const initialBlogs = [
  {
    title: 'Hello World',
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

// Clear the test database and add the initial posts
// Need to think about this some more, how the database connection is called here
// Uses mongoose
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

// The tests
test('blog posts are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blog posts are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog post title is within the returned post titles', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
  expect(titles).toContain('Im still here')
})

afterAll(() => {
  mongoose.connection.close()
})
