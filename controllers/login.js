const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')


loginRouter.post('/', async (req, res) => {
	const body = req.body

	const user = await User.findOne({username: body.username})

	const passwordCheck = user === null
	  ? false
	  : await bcrypt.compare(body.password, user.passwordHash)

	if(!(user && passwordCheck)) {
		return res.status(401).json({
			error: 'invalid username or password'
		})
	}  

	const userObject = {
		username: user.username,
		id: user._id,
	}

	const token = jwt.sign(userObject, process.env.SECRET)

	res
	  .status(200)
	  .send({token, username: user.username, name: user.name})
})





module.exports = loginRouter