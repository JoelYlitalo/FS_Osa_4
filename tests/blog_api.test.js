const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
  	title: "Go To Statement Considered Harmful", 
	author: "Edsger W. Dijkstra", 
	url: "http://www.u.arizona.edu/", 
	likes: 5,
	
  },
  {
  	title: "React patterns", 
    author: "Michael Chan", 
    url: "https://reactpatterns.com/", 
    likes: 7, 
    
  },
]

const initialUser = [
  {
  	username: "Heppikeisari",
  	
  	password: "rockenroll"
  }
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


describe('test adding blogs to database', () => {

//tee toimenpiteet tokenin hankkimiseks

test('a valid object can be added ', async () => {

  const newBlog = {
    title: "Type wars", 
	author: "Robert C. Martin", 
	url: "http://blog.cleancoder.com", 
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
})


//testataan, että salasana ja käyttäjätunnus ovat oikeanlaisia


describe('with one user in the database', () => {
	//beforeEach(async () => {
	//	await User.deleteMany({})

	//	const passwordHash = await bcrypt.hash('esimerk', 10)
	//	const user = new User({username: 'strutsi', passwordHash})

	//	await user.save()
	//})

	test('adding a fresh user succeeds', async () => {
		const usersAtStart = await helper.usersInDb()

		const testUser = {
			username: 'helmeri',
			name: 'helmeri elmeri',
			password: 'nade',
		}

		await api
		  .post('/api/users')
		  .send(testUser)
		  .expect(200)
		  .expect('Content-Type', /application\/json/)

		  const atEnd = await helper.usersInDb()
		  expect(atEnd).toHaveLength(usersAtStart.length + 1)

		  const names = atEnd.map(u => u.username)
		  expect(names).toContain(testUser.username)


	})

	test('adding already existing username yields bad request', async () => {
		const testUser = {
			username: 'Eikka_Eltaannus',
			name: 'helmeri elmeri',
			password: 'nade',
		}

		await api
		  .post('/api/users')
		  .send(testUser)
		  .expect(400)
		  
	})

	test('adding a password that is less than 3 characters', async () => {
		const testUser = {
			username: 'kalmeri',
			name: 'Kulmaneuvos Kelmiö',
			password: 'na',
		}

		await api
		  .post('/api/users')
		  .send(testUser)
		  .expect(400)
		  
	})
})


afterAll(() => {
  mongoose.connection.close()
})