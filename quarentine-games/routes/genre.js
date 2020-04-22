  const express = require('express')
const router = express.Router()
const Genre = require('../models/genre')
const Review = require('../models/review')

// All genre Route, displays genre
router.get('/', async (req, res) => {
  try {
    const genre = await Genre.find({})
    res.render('genre/index', {
      genre: genre
    })
  } catch {
    res.redirect('/')
  }
})

// New Genre Route
router.get('/new', (req, res) => {
  res.render('genre/new', { genre: new Genre() })
})

// Create Genre Route
router.post('/', async (req, res) => {
  const genre = new Genre({
    name: req.body.name
  })

  try {
    const newGenre = await genre.save()
    //res.redirect(`genre/${newGenre.id}`)
    res.redirect(`genre`)
  } catch {
    res.render('genre/new', {
      genre: genre,
      errorMessage: 'Error creating Genre'
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id)
    const reviews = await Review.find({ genre: genre.id }).limit(6).exec()
    res.render('genre/show', {
      genre: genre,
      reviewsByGenre: reviews
    })
  } catch {
    res.redirect('/')
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id)
    res.render('genre/edit', { genre: genre })
  } catch {
    res.redirect('/genre')
  }
})

//Update Genre page
router.put('/:id', async (req, res) => {
  let genre
  try {
    genre = await Genre.findById(req.params.id)
    genre.name = req.body.name
    await genre.save()//save editted info
    res.redirect(`/genre`)//Return to Genre index
  } catch {
    if (genre == null) {
      res.redirect('/genre')
    } else {
      res.render('genre/edit', {
        genre: genre,
        errorMessage: 'Error updating Genre'
      })
    }
  }
})

//Delete Genre
router.delete('/:id', async (req, res) => {
  let genre
  try {
    genre = await Genre.findById(req.params.id)
    await genre.remove()
    res.redirect('/genre')
  } catch {
    if (genre == null) {
      res.redirect('/')
    } else {
      res.redirect(`/genre/${genre.id}`)
    }
  }
})

module.exports = router