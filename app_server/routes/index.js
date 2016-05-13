var express = require('express');
var router = express.Router();

var ctrlCotages = require('../controllers/cotages');
var ctrlOther = require('../controllers/other');

/* GET HOME PAGE */

/*Cotages pages*/
router.get('/', ctrlCotages.homelist);
router.get('/cotage',ctrlCotages.cotageInfo);
router.get('/cotages/review/new',ctrlCotages.addReview);

/*Other pages*/
router.get('/about',ctrlOther.about);

module.exports = router;
