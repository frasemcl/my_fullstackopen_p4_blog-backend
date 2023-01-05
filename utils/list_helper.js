// var _ = require('lodash/core')

const dummy = blogs => {
  console.log(blogs)
  return 1
}

const totalLikes = blogs => {
  let total = 0
  blogs.map(blog => (total += blog.likes))
  return total
}

const favoriteBlog = blogs => {
  const topPostLikes = blogs.reduce(
    (acc, curr) => (curr.likes > acc ? (acc = curr.likes) : acc),
    0
  )
  const result = blogs.find(blog => {
    return blog.likes === topPostLikes
  })
  return (({ title, author, likes }) => ({ title, author, likes }))(result)
}

const mostBlogs = blogs => {
  let authors = []
  blogs.map(blog => authors.push(blog.author))
  let counts = {}
  for (const author of authors) {
    counts[author] = counts[author] ? counts[author] + 1 : 1
  }
  let numPerAuthor = Object.values(counts)
  let maxArticleNum = Math.max(...numPerAuthor)

  let blogsByAuthor = Object.entries(counts).map(([author, blogs]) => ({
    author,
    blogs,
  }))
  const result = blogsByAuthor.filter(obj => {
    return obj.blogs === maxArticleNum
  })
  return result[0]
}

const mostLikes = blogs => {
  let authors = []
  blogs.map(blog =>
    authors.indexOf(blog.author) === -1
      ? authors.push(blog.author)
      : console.log(authors)
  )
  return authors
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
