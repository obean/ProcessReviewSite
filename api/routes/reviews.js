var express = require('express');
var router = express.Router();
var models = require('../models');


router.get('/all', async function (req, res, next) {

  // console.log(req.param('id') + " params!!!!")
  if (req.param('id')) {
    const reviews = await models.Review.findAll(
      {
        where: { userId: req.param('id') }
      }
    );

    res.send(JSON.stringify(reviews));
  }else if(req.param('reviewerId')){
    const reviews = await models.Review.findAll(
      {
        where: { reviewerId: req.param('reviewerId') }
      }
    );

    res.send(JSON.stringify(reviews));
  }
});



router.post('/create', async function(req, res){
  try{
    for(let i = 0; i <= req.body.dateNames.length-1; i++){
    await models.Review.create({
      reviewerId: req.body.id,
      booking_date: req.body.dateNames[i]
    })
    }
    res.status(200).send()
  }catch (err) {res.status(401).send("review creation failed")}
})


router.post('/submit-feedback', async function (req, res) {
  const toUpdate = Object.keys(req.body.review)
  console.log(toUpdate)
  
  const [numberOfAffectedRows, affectedRows] = await models.Review.update({
    general_feedback: req.body.review.general_feedback,
    TDD_rating: req.body.review.TDD_rating,
    TDD_description: req.body.review.TDD_description,
    Fluency_description: req.body.review.Fluency_description,
    Fluency_rating: req.body.review.Fluency_rating,
    Debug_description: req.body.review.Debug_description,
    Model_description: req.body.review.Model_description,
    Refactor_description: req.body.review.Refactor_description,
    Maintainability_rating: req.body.review.Maintainability_rating,
    Maintainability_description: req.body.review.Maintainability_description,
    Refactor_rating: req.body.review.Refactor_rating,
    Model_rating: req.body.review.Model_rating,
    Debug_rating: req.body.review.Debug_rating,
    Agile_rating: req.body.review.Agile_rating,
    Agile_description: req.body.review.Agile_description,
  }, {
    where: { id: req.body.id },
    returning: true,
    plain: true
  })
  res.status(200).send(JSON.stringify(affectedRows))


})



router.get('/get-review', async function (req, res) {
  console.log(req)
  const review = await models.Review.findByPk(req.param('id'))
  res.status(200).send(JSON.stringify(review))
})

// router.get('/ratings', async function (req, res, next) {

//   const ratings = await models.Review.findAll({
//     attributes: [
//       "TDD_rating",
//       "Fluency_rating",
//       "Debug_rating",
//       "Model_rating",
//       "Refactor_rating",
//       "Agile_rating",
//       "Maintainability_rating"],
//     where: {
//       userId: 4
//     }
//   });

//   res.send(JSON.stringify(ratings));
// });

router.get('/ratings', async function (req, res, next) {
  if(req.param('id')){
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
        userId: req.param('id')
      }
    });
    res.send(JSON.stringify(ratings));}
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
  // console.log(req.body.booking.user)
  // console.log(req.body.booking.review)
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