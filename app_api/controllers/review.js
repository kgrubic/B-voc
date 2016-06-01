var mongoose = require('mongoose');
var Cot = mongoose.model('Cotage');

var sendJSONresponse = function(res,status,content){
	res.status(status);
	res.json(content);
};

module.exports.reviewCreate = function(req,res){
	sendJSONresponse(res,200,{"status":"sucess"})
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
