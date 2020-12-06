const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item
	}

	return blogs.length === 0
	? 0
	: blogs.map(m => m.likes).reduce(reducer, 0)

}

const favouriteBlog = (blogs) => {
	const reducer = (max, current) => {
		return Math.max(...[max, current])
	}

	const mostLikes = blogs.map(m => m.likes).reduce(reducer, 0)
	const favourite = blogs.find(m => m.likes === mostLikes)

	if(blogs.length === 0) {
		return 'no blogs'
	} else {
		const {_id, url, __v, ...theRest} = favourite
		return theRest
	}
}

const mostBlogs = (blogs) =>  {

	const mapped = blogs.map(m => m.author)

	const helperFunction = (blog) => {
		if(blog.length === 0) {
			return 0
		}

		var map = new Map()
		var maxVal = blog[0]
		var maxCount = 0

		for(var i = 0; i < blog.length; i++) {
			var current = blog[i]
			if(map.get(current) === undefined) {
				map.set(current, 1)
			} else {
				map.set(current, map.get(current) + 1)
			}

			if(map.get(current) > maxCount) {
				maxVal = current
				maxCount = map.get(current)
			}
		}

		const obj = {
			author: maxVal,
			blogs: maxCount
		}

		return obj
	}

	return helperFunction(mapped)

}

const mostLikes = (blogs) => {
	if(blogs.length === 0) { return 0 }


	var map = new Map()
    var maxVal = blogs[0]
    var maxLikes = 0

    for(var i = 0; i < blogs.length; i++) {
    	var current = blogs[i]

    	if(map.get(current.author) === undefined) {
    		map.set(current.author, current.likes)
    	} else {
    		map.set(current.author, map.get(current.author) + current.likes)
    	}

    	if(map.get(current.author) > maxLikes) {
    		maxLikes = map.get(current.author)
    		maxVal = current.author
    	}
    }

    const obj = {
    	author: maxVal,
    	likes: maxLikes
    }

    return obj


}

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}