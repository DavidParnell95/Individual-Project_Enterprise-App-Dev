const express = require('express')
const router = express.Router()
const Review = require('../models/review')
const Genre = require('../models/genre')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

// All Reviews Route
router.get('/', async (req, res) => {
  let query = Review.find()
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('publishDate', req.query.publishedBefore)
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
    query = query.gte('publishDate', req.query.publishedAfter)
  }
  try {
    const reviews = await query.exec()
    res.render('reviews/index', {
      reviews: reviews,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Review Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Review())
})

// Create Review Route
router.post('/', async (req, res) => {
  const review = new Review({
    title: req.body.title,
    genre: req.body.genre,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description
  })
  saveCover(review, req.body.cover)

  try {
    const newBook = await review.save()
    res.redirect(`reviews/${newBook.id}`)
  } catch {
    renderNewPage(res, review, true)
  }
})

// Show Review Route
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
                           .populate('genre')
                           .exec()
    res.render('reviews/show', { review: review })
  } catch {
    res.redirect('/')
  }
})

// Edit Review Route
router.get('/:id/edit', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
    renderEditPage(res, review)
  } catch {
    res.redirect('/')
  }
})

// Update Review Route
router.put('/:id', async (req, res) => {
  let review

  try {
    review = await Review.findById(req.params.id)
    review.title = req.body.title
    review.genre = req.body.genre
    review.publishDate = new Date(req.body.publishDate)
    review.pageCount = req.body.pageCount
    review.description = req.body.description
    if (req.body.cover != null && req.body.cover !== '') {
      saveCover(review, req.body.cover)
    }
    await review.save()
    res.redirect(`/reviews/${review.id}`)
  } catch {
    if (review != null) {
      renderEditPage(res, review, true)
    } else {
      redirect('/')
    }
  }
})

// Delete Review Page
router.delete('/:id', async (req, res) => {
  let review
  try {
    review = await Review.findById(req.params.id)
    await review.remove()
    res.redirect('/reviews')
  } catch {
    if (review != null) {
      res.render('reviews/show', {
        review: review,
        errorMessage: 'Could not remove review'
      })
    } else {
      res.redirect('/')
    }
  }
})

async function renderNewPage(res, review, hasError = false) {
  renderFormPage(res, review, 'new', hasError)
}

async function renderEditPage(res, review, hasError = false) {
  renderFormPage(res, review, 'edit', hasError)
}

async function renderFormPage(res, review, form, hasError = false) {
  try {
    const genres = await Genre.find({})
    const params = {
      genres: genres,
      review: review
    }
    if (hasError) {
      if (form === 'edit') {
        params.errorMessage = 'Error Updating Review'
      } else {
        params.errorMessage = 'Error Creating Review'
      }
    }
    res.render(`reviews/${form}`, params)
  } catch {
    res.redirect('/reviews')
  }
}

function saveCover(review, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    review.coverImage = new Buffer.from(cover.data, 'base64')
    review.coverImageType = cover.type
  }
}

module.exports = router