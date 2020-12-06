const listHelper = require('../utils/list_helper')


const empty = []

const blogs = [ 
{
    _id: "5a422a851b54a676234d17f7", 
    title: "React patterns", 
    author: "Michael Chan", 
    url: "https://reactpatterns.com/", 
    likes: 7, 
    __v: 0 
}, 
{ 
	_id: "5a422aa71b54a676234d17f8", 
	title: "Go To Statement Considered Harmful", 
	author: "Edsger W. Dijkstra", 
	url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
	likes: 5, 
	__v: 0 },
{ 
	_id: "5a422b3a1b54a676234d17f9", 
	title: "Canonical string reduction", 
	author: "Edsger W. Dijkstra", 
	url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
	likes: 12, 
	__v: 0 
}, 
{ 
	_id: "5a422b891b54a676234d17fa",
	title: "First class tests", 
	author: "Robert C. Martin", 
	url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
	likes: 10, 
	__v: 0 
}, 
{ 
	_id: "5a422ba71b54a676234d17fb", 
	title: "TDD harms architecture", 
	author: "Robert C. Martin", 
	url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
	likes: 0, 
	__v: 0 
}, 
{ 
	_id: "5a422bc61b54a676234d17fc", 
	title: "Type wars", 
	author: "Robert C. Martin", 
	url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
	likes: 2,
	 __v: 0 
}
]

const oneBlog = blogs.filter(b => b.likes === 12)

describe('dummy', () => {
	test('dummy returns one', () => {
	   
	    const result = listHelper.dummy(blogs)
	    expect(result).toBe(1)
    })
})

describe('total likes', () => {
	test('of empty list is zero', () => {

		expect(listHelper.totalLikes(empty)).toBe(0)
	})

	test('when only one blog equals the likes of that', () => {

		expect(listHelper.totalLikes(oneBlog)).toBe(12)
	})

	test('of a bigger list is calculated right', () => {

		expect(listHelper.totalLikes(blogs)).toBe(36)
	})
})

describe('favourite blog', () => {

	test('of empty list is "no blogs"', () => {

		expect(listHelper.favouriteBlog(empty)).toEqual('no blogs')
	})

	test('when only one blog that one is favourite', () => {

		const example = 
		{
			
	        title: "Canonical string reduction", 
	        author: "Edsger W. Dijkstra",  
	        likes: 12, 
	        
		}
		

		expect(listHelper.favouriteBlog(oneBlog)).toEqual(example)
	})

	test('when many blogs returns the one with most likes', () => {

		const example = 
		{
			 
	        title: "Canonical string reduction", 
	        author: "Edsger W. Dijkstra", 
	        likes: 12, 
	        
		}
		

		expect(listHelper.favouriteBlog(blogs)).toEqual(example)

	})

})

describe('author with most blogs', () => {

	test('of an empty list is 0', () => {
		expect(listHelper.mostBlogs(empty)).toEqual(0)
	})

	test('of a proper list gives correct answer', () => {

		const ex = {
			author: "Robert C. Martin",
			blogs: 3
		}

		expect(listHelper.mostBlogs(blogs)).toEqual(ex)
	})
})


describe('author with most likes', () => {
	test('of an empty list is 0', () => {
		expect(listHelper.mostLikes(empty)).toBe(0)
	})

	test('of a proper list gives correct answer', () => {
		const ex = {
			author: "Edsger W. Dijkstra",
			likes: 17
		}

		expect(listHelper.mostLikes(blogs)).toEqual(ex)

	})
})