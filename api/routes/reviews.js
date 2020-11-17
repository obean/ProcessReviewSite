var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/all', async function (req, res, next) {

  console.log(req.param('id') + " params!!!!")
  if (req.param('id')) {
    const reviews = await models.Review.findAll(
      {
        where: { userId: req.param('id') }
      }
    );

    res.send(JSON.stringify(reviews));
  }
});





router.get('/get-review', async function (req, res) {
  console.log(req)
  const review = await models.Review.findByPk(req.param('id'))
  res.status(200).send(JSON.stringify(review))
})

router.get('/ratings', async function (req, res, next) {

  const ratings = await models.Review.findAll({
    attributes: [
      "TDD_rating",
      "Fluency_rating",
      "Debug_rating",
      "Model_rating",
      "Refactor_rating",
      "Agile_rating",
      "Maintainability_rating"],
    where: {
      userId: 1
    }
  });

  res.send(JSON.stringify(ratings));
});

router.get('/book', async function (req, res, next) {
  const availableReviews = await models.Review.findAll({
    attributes: ['id', 'reviewerId', 'booking_date'],//, 'booking_time'],
    where: { userId: null }
  }
  )
  res.send(JSON.stringify(availableReviews))
})

router.post('/book', async function (req, res) {
  console.log(req.body.booking.user)
  console.log(req.body.booking.review)
  // await models.Review.findByPk(req.body.booking.review)
  // .then((review) => review.update({
  //   userId: req.body.user
  //   }, {
  //     where: {}
  //   }
  // ))
  const [numberOfAffectedRows, affectedRows] = await models.Review.update({
    userId: req.body.booking.user
  },
    {
      where: { id: req.body.booking.review },
      returning: true,
      plain: true
    })
  res.status(200).send(JSON.stringify(affectedRows))
})

router.post('/cancel', async function (req, res) {
  const [numberOfAffectedRows, affectedRows] = await models.Review.update({
    userId: null
  }, {
    where: { id: req.body.reviewId },
    returning: true,
    plain: true
  })
})


module.exports = router;