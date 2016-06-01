var mongoose = require('mongoose');
var Cot = mongoose.model('Cotage');

var sendJSONresponse = function(res,status,content){
	res.status(status);
	res.json(content);
};

//POST a new cotage
module.exports.cotagesCreate = function(req,res){
	  console.log(req.body);
	  Cot.create({
	    name: req.body.name,
	    address: req.body.address,
	    facilities: req.body.facilities.split(","),
	    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
	    food: [{
	      days: req.body.days1,
	      breakfast: req.body.breakfast1,
	      dinner: req.body.dinner1,
	      closed: req.body.closed1,
	    }, {
	      days: req.body.days2,
	      breakfast: req.body.breakfast2,
	      dinner: req.body.dinner2,
	      closed: req.body.closed2,
	    },
	    {
	      days: req.body.days3,
	      breakfast: req.body.breakfast3,
	      dinner: req.body.dinner3,
	      closed: req.body.closed3,
	    }
	    ]
	  }, function(err, cotage) {
	    if (err) {
	      console.log(err);
	      sendJSONresponse(res, 400, err);
	    } else {
	      console.log(cotage);
	      sendJSONresponse(res, 201, cotage);
	    }
	  });
};

module.exports.cotagesListByAcomodation = function(req,res){
  Cot
    .find()
    .exec(function(err,cotages){
      if(!cotages){
        sendJSONresponse(res,404,{
          "messafe" : "cotages not found"
        });
        return;
      }
      else if(err){
        console.log(err);
        sendJSONresponse(res,404,err);
        return;
      }
      else
        console.log(cotages);
        sendJSONresponse(res, 200, cotages);

    })
};

//GET  api cotage info
module.exports.cotagesReadOne = function(req,res){
	  console.log('Finding cotages details', req.params);
  if (req.params && req.params.cotagesid) {
    Cot
      .findById(req.params.cotagesid)
      .exec(function(err, cotage) {
        if (!cotage) {
          sendJSONresponse(res, 404, {
            "message": "cotage not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(cotage);
        sendJSONresponse(res, 200, cotage);
      });
  } else {
    console.log('No cotageid specified');
    sendJSONresponse(res, 404, {
      "message": "No cotageid in request"
    });
  }
};

//PUT  api cotage info
module.exports.cotagesUpadateOne = function(req,res){
	 if (!req.params.cotagesid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, cotageid is required"
    });
    return;
  }
  Loc
    .findById(req.params.cotagesid)
    .select('-reviews -rating')
    .exec(
      function(err, cotage) {
        if (!cotage) {
          sendJSONresponse(res, 404, {
            "message": "cotagesid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        cotage.name = req.body.name;
        cotage.address = req.body.address;
        cotage.facilities = req.body.facilities.split(",");
        cotage.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
        cotage.food = [{
          days: req.body.days1,
          breakfast: req.body.breakfast1,
          dinner: req.body.dinner1,
          closed: req.body.closed1,
        }, {
          days: req.body.days2,
          breakfast: req.body.breakfast2,
          dinner: req.body.dinner2,
          closed: req.body.closed2,
        }];
        cotage.save(function(err, cotage) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, cotage);
          }
        });
      }
  );
};

module.exports.cotagesDeleteOne = function(req,res){
	var cotageid = req.params.cotagesid;
  if (cotageid) {
    Loc
      .findByIdAndRemove(cotageid)
      .exec(
        function(err, cotage) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Cotage id " + cotageid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No cotageid"
    });
  }
};