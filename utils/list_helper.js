// var _ = require('lodash')

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
  //   const test = _.groupBy(authors, author => author)
  //   return test
  // Got lost trying lodash and did this:
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
  let authorLikes = []
  for (const blog of blogs) {
    // Ended up here again: https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
    const sel = (({ author, likes }) => ({ author, likes }))(blog)
    const exists = authorLikes.findIndex(el => el.author === sel.author)
    if (exists === -1) {
      authorLikes.push(sel)
    } else {
      authorLikes[exists].likes += sel.likes
    }
  }
  let maxLikes = authorLikes.reduce((max, post) =>
    max.likes > post.likes ? max : post
  )
  return maxLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
