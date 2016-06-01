var express = require('express');
var router = express.Router();

var ctrlCotages = require('../controllers/cotages');
var ctrlOther = require('../controllers/other');

/* GET HOME PAGE */

/*Cotages pages*/
router.get('/', ctrlCotages.homelist);
router.get('/cotages/:cotagesid',ctrlCotages.cotageInfo);
router.get('/cotages/:cotagesid/review/new',ctrlCotages.addReview);
router.post('/cotages/:cotagesid/review/new',ctrlCotages.doAddReview);

/*Other pages*/
router.get('/about',ctrlOther.about);

module.exports = router;
