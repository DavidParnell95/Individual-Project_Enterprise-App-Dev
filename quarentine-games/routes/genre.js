  
const express = require('express')
const router = express.Router()
const Genre = require('../models/genre')
const Review = require('../models/review')

// All Genres Route, displays genres
router.get('/', async (req, res) => {
  /*let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }*/
  try {
    const genres = await Genre.find({})
    res.render('genres/index', {
      genres: genres
    })
  } catch {
    res.redirect('/')
  }
})

// New Genre Route
router.get('/new', (req, res) => {
  res.render('genres/new', { genre: new Genre() })
})

// Create Genre Route
router.post('/', async (req, res) => {
  const genre = new Genre({
    name: req.body.name
  })

  try {
    const newGenre = await genre.save()
    //res.redirect(`genres/${newGenre.id}`)
    res.redirect(`genre`)
  } catch {
    res.render('genres/new', {
      genre: genre,
      errorMessage: 'Error creating Genre'
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id)
    const reviews = await Review.find({ genre: genre.id }).limit(6).exec()
    res.render('genres/show', {
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
    res.render('genres/edit', { genre: genre })
  } catch {
    res.redirect('/genres')
  }
})

router.put('/:id', async (req, res) => {
  let genre
  try {
    genre = await Genre.findById(req.params.id)
    genre.name = req.body.name
    await genre.save()
    res.redirect(`/genres/${genre.id}`)
  } catch {
    if (genre == null) {
      res.redirect('/')
    } else {
      res.render('genres/edit', {
        genre: genre,
        errorMessage: 'Error updating Genre'
      })
    }
  }
})

router.delete('/:id', async (req, res) => {
  let genre
  try {
    genre = await Genre.findById(req.params.id)
    await genre.remove()
    res.redirect('/genres')
  } catch {
    if (genre == null) {
      res.redirect('/')
    } else {
      res.redirect(`/genres/${genre.id}`)
    }
  }
})

module.exports = router