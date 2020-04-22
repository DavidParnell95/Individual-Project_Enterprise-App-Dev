const express = require('express')
const router = express.Router()
const Genre = require('../models/genre')
const Review = require('../models/review')


// Get All Reviews
router.get('/', async (req, res) => {
  try {
    const review = await Review.find({})
    res.render('review/index', {
      reviews: review
    })
  } catch {
    res.redirect('index')
  }
})

// New Review Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Review())
})

// Create Review Route
router.post('/', async (req, res) => {
  console.log(req.body);

  const review = new Review({
    title: req.body.title,
    genre: req.body.genre,
    releaseDate: new Date(req.body.releaseDate),//Need to conver, req.body gives a string
    score: req.body.score,
    rev: req.body.rev
  })

  review.releaseDate.toISOString().split('T')[0]

  try {
    const newReview = await review.save()
    //res.redirect(`reviews/${newReview.id}`)
    res.redirect('review')
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
    res.render('review/', { review: review })
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
    review.releaseDate = new Date(req.body.releaseDate)
    review.score = req.body.score
    review.rev = req.body.rev

    await review.save()
    res.redirect(`/review`)
  } 
  catch {
    if (review != null) {
      renderEditPage(res, review, true)
    } 
    
    else {
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
    res.redirect('/review')
  } catch {
    if (review != null) {
      res.render('review/', {
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
    //Get genre
    const genre = await Genre.find({})
    const params = {
      genre: genre,
      review: review
    }
    if (hasError) {
      if (form === 'edit') {
        params.errorMessage = 'Error Updating Review'
      } else {
        params.errorMessage = 'Error Creating Review'
      }
    }
    res.render(`review/${form}`, params)
  } catch {
    res.redirect('/review')
  }
}

module.exports = router