var express = require('express');
var router = express.Router();
var ctrlCotages = require('../controllers/cotages');
var ctrlReview = require('../controllers/review');

//cotages
router.post('/cotages',ctrlCotages.cotagesCreate);
router.get('/cotages',ctrlCotages.cotagesListByAcomodation);
router.get('/cotages/:cotagesid',ctrlCotages.cotagesReadOne);
router.put('/cotages/:cotagesid',ctrlCotages.cotagesUpadateOne);
router.delete('/cotages/:cotagesid',ctrlCotages.cotagesDeleteOne);

//review

router.post('/cotages/:cotagesid/review',ctrlReview.reviewCreate);
router.get('/cotages/:cotagesid/review/:reviewid',ctrlReview.reviewReadOne);
router.put('/cotages/:cotagesid/review/:reviewid',ctrlReview.reviewUpdateOne);
router.delete('/cotages/:cotagesid/review/:reviewid',ctrlReview.reviewDelete);


module.exports = router;