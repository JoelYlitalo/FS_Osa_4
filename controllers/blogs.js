const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title, 
    author: body.author, 
    url: body.url, 
    likes: body.likes === undefined ? 0 : body.likes,
  })

  try {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } catch (error) {
    response.status(400).send(error.message)
  }

  //const savedBlog = await blog.save()
  //response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    response.status(404).send(error.message)
  }
})



module.exports = blogsRouter