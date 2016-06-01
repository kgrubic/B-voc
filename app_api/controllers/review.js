var mongoose = require('mongoose');
var Cot = mongoose.model('Cotage');

var sendJSONresponse = function(res,status,content){
	res.status(status);
	res.json(content);
};

module.exports.reviewCreate = function(req,res){
  if (req.params.cotagesid) {
    Cot
      .findById(req.params.cotagesid)
      .select('reviews')
      .exec(
        function(err, cotage) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            console.log(cotage);
            doAddReview(req, res, cotage);
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, cotagesid required"
    });
  }
};


var doAddReview = function(req, res, cotage) {
  if (!cotage) {
    sendJSONresponse(res, 404, "cotagesid not found");
  } else {
    cotage.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    cotage.save(function(err, cotage) {
      var thisReview;
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        updateAverageRating(cotage._id);
        thisReview = cotage.reviews[cotage.reviews.length - 1];
        sendJSONresponse(res, 201, thisReview);
      }
    });
  }
};

var updateAverageRating = function(cotagesid) {
  console.log("Update rating average for", cotagesid);
  Cot
    .findById(cotagesid)
    .select('reviews')
    .exec(
      function(err, cotage) {
        if (!err) {
          doSetAverageRating(cotage);
        }
      });
};

var doSetAverageRating = function(cotage) {
  var i, reviewCount, ratingAverage, ratingTotal;
  if (cotage.reviews && cotage.reviews.length > 0) {
    reviewCount = cotage.reviews.length;
    ratingTotal = 0;
    for (i = 0; i < reviewCount; i++) {
      ratingTotal = ratingTotal + cotage.reviews[i].rating;
    }
    ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    cotage.rating = ratingAverage;
    cotage.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to", ratingAverage);
      }
    });
  }
};

module.exports.reviewReadOne = function(req,res){
		  console.log("Getting single review");
  if (req.params && req.params.cotagesid && req.params.reviewid) {
    Cot
      .findById(req.params.cotagesid)
      .select('name reviews')
      .exec(
        function(err, cotage) {
          console.log(cotage);
          var response, review;
          if (!cotage) {
            sendJSONresponse(res, 404, {
              "message": "cotagesid not found"
            });
            return;
          } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
          }
          if (cotage.reviews && cotage.reviews.length > 0) {
            review = cotage.reviews.id(req.params.reviewid);
            if (!review) {
            console.log(cotage.reviews);
              sendJSONresponse(res, 404, {
                "message": "reviewid not found"
              });
            } else {
              response = {
                cotage: {
                  name: cotage.name,
                  id: req.params.cotagesid
                },
                review: review
              };
              sendJSONresponse(res, 200, response);
            }
          } else {
            sendJSONresponse(res, 404, {
              "message": "No reviews found"
            });
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, cotagesid and reviewid are both required"
    });
  }
};

module.exports.reviewUpdateOne = function(req,res){
	sendJSONresponse(res,200,{"status":"sucess"})
};
module.exports.reviewDelete = function(req,res){
	sendJSONresponse(res,200,{"status":"sucess"})
};
