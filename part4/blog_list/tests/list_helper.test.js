const listHelper = require('../utils/list_helper')

const blogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  })

describe('max likes blogs', () => {
    test('test max like blogs', () => {
        const result = listHelper.favoriteBlog(blogs)

        const maxLikesBlog = {
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
        }
        expect(result).toEqual(maxLikesBlog)
    })
})

describe('test mostBlogs:', () => {
    test('empty should get null', () => {
        const testBlogs = []
        const result = listHelper.mostBlogs(testBlogs)
        expect(result).toEqual(null)
    })

    test('if not empty, result should be as expected', () => {
        const expectedMostBlogs = {
          author: "Robert C. Martin",
          blogs: 3
        }
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(expectedMostBlogs)
  })
})

describe('test mostLikes:', () => {
  test('empty should get null', () => {

      const testBlogs = []

      const result = listHelper.mostLikes(testBlogs)

      expect(result).toEqual(null)
  })


  test('if not empty, result should be as expected', () => {

      const expectedMostBlogs = {
          author: "Edsger W. Dijkstra",
          likes: 17
      }

      const result = listHelper.mostLikes(blogs)

      expect(result).toEqual(expectedMostBlogs)
  })
})

