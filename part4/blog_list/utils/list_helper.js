const _=require('lodash')


const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes_list = blogs.map(blog => blog.likes)
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const likes = likes_list.reduce(reducer, 0)
    return likes
}

const favoriteBlog = (blogs) => {
    const likes_list = blogs.map(blog => blog.likes)
    const indexOfMaxValue = likes_list.indexOf(Math.max(...likes_list))
    return blogs[indexOfMaxValue]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0){
        return null
    }
    const blogsByAuthor = _.chain(_.groupBy(blogs, 'author')).toPairs().maxBy().value()

    const mostBolgsByAuthor = {
        author: blogsByAuthor[0],
        blogs: blogsByAuthor[1].length
    }

    return mostBolgsByAuthor
  }

const mostLikes = (blogs) => {
    if(blogs.length === 0) {
        return null
    }
    const blogsOfAuthor = _.chain(_.groupBy(blogs, 'author')).toPairs().value()
    reducer = (accumulator, currentValue) => accumulator + currentValue
    const likesByAuthor = blogsOfAuthor.map(([author, blogs]) => ({
        author,
        likes: blogs.map(blog => {
            if(blog.author === author){
                return blog.likes
            }
        }).reduce(reducer, 0)
    })
    )

    const maxLikes = Math.max.apply(null, likesByAuthor.map(like => like.likes))

    const result = likesByAuthor.find(item => {
        if(item.likes === maxLikes){
            return item
        }
    })

    console.log(result)

    return result

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}