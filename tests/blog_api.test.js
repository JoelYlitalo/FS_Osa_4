const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
  	title: "Go To Statement Considered Harmful", 
	author: "Edsger W. Dijkstra", 
	url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
	likes: 5,
  },
  {
  	title: "React patterns", 
    author: "Michael Chan", 
    url: "https://reactpatterns.com/", 
    likes: 7, 
  },
]

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('attribute "id" is correct', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body[0].id).toBeDefined()
})

test('a valid object can be added ', async () => {
  const newBlog = {
    title: "Type wars", 
	author: "Robert C. Martin", 
	url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
	likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'Type wars'
  )
})

test('if likes not given value, then is 0', async () => {
	const newBlog = {
		title: "Tester",
		author: "Jolpertti",
		url: "aapeli.com",
	}

	await api
	  .post('/api/blogs')
	  .send(newBlog)
	  .expect(200)
	  .expect('Content-Type', /application\/json/)

	const response = await api.get('/api/blogs')
	
	const obj = response.body.filter(o => o.title === "Tester")

	expect(obj[0].likes).toEqual(0)  
})


test('if no title or url response with 400 bad request', async () => {
	const bad = {
		author: "Jolpertti",
		likes: 15,
	}

	await api
	  .post('/api/blogs')
	  .send(bad)
	  .expect(400)
})



afterAll(() => {
  mongoose.connection.close()
})