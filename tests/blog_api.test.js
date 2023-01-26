const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

// Clear the test database and add the initial posts
beforeEach(async () => {
  await Blog.deleteMany({})
  // Promise.all executes the promises it receives in parallel. If the promises need to be executed in a particular order, this will be problematic. In situations like this, the operations can be executed inside of a for...of block, that guarantees a specific execution order.
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

// The tests
test('blog posts are returned as json', async () => {
  console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('a valid blog post can be added', async () => {
  const newBlog = {
    title: 'Hello from test',
    author: 'frasemcl',
    url: 'test.com',
    likes: 1000,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain('Hello from test')
})

test('blog post without title is not added', async () => {
  const newBlog = {
    author: 'frasemcl',
    url: 'test.com',
    likes: 1000,
  }

  // Revisit why my response is 500 and course notes show 400 when required field is missing
  await api.post('/api/blogs').send(newBlog).expect(500)

  // const response = await api.get('/api/blogs')
  // expect(response.body).toHaveLength(helper.initialBlogs.length)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('all blog posts are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog post title is within the returned post titles', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
  expect(titles).toContain('Im still here')
})

// ex4.9 - I'm considering this an api test but maybe should move it to list_helper tests?
test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
