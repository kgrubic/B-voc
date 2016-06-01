var request = require('request');
var apiOptions = {
    server : 'http://localhost:3000'
};
if(process.env.NODE_ENV === 'production'){
    apiOptions.server = "https://guarded-eyrie-79159.herokuapp.com";
}


var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('error', {
    status : title,
    message : content
  });
};

var renderHomepage = function(req,res,responseBody){
    var message;
    if(!(responseBody instanceof Array)){
        message = "API error lookup";
        responseBody = [];
    }
    else {
        if(!responseBody.length){
            message = "No palaces found";
        }
    }
	res.render('cotages-list',{
		title :'B-voc : find a place for vocation',
		pageHeader: {
			title: 'B-voc',
			strapline: 'Find your place to charge your batheries'
		},
		sidebar: "looking for a great place for a weekend or a holiday :) ",
		cotages : responseBody,
        message : message
		});
}

/* Get HOME page*/
module.exports.homelist = function(req,res){
    var requestOptions, path;
    path = "/api/cotages";
    requestOptions = {
        url: apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,
        function(err,response,body){
            if(err){
                console.log(err);
            }
            else if(response.statusCode === 200 && body.length){
                console.log(body);
                renderHomepage(req,res,body)

            }
            else
                console.log(response.statusCode);
        });
}



var renderDetailPage = function(req,res,cotDatail){
    res.render('cotage-info', {
        title: cotDatail.name,
        pageHeader: {
            title: cotDatail.name
        },
        sidebar: {
            context: 'is on B-voc because it is a beautiful place to stay for holidays.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        cotages: cotDatail
    });
};

/* GET Cotage info page */
var getCotageInfo = function(req, res, callback) {
    var requestOptions,path;
    path = "/api/cotages/" + req.params.cotagesid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,function(err,response,body){
           var data = body;
            if(response.statusCode === 200){
                data.coords = {
                    lng: body.coords[0],
                    lat: body.coords[1]
                }
                console.log(data);
                callback(req,res,data)

            }
             else{
                _showError(req,res,response.statusCode);
            }
    });
};

module.exports.cotageInfo = function(req, res) {
    getCotageInfo(req,res,function(req,res,responseData){
        renderDetailPage(req,res,responseData);
    });
};

/* GET 'Add review' page */

var rendderReviewForm = function (req,res,cotReview){
    res.render('cotage-review-form',{
        title: 'Review ' + cotReview.name+ ' on B-voc',
        pageHeader: {title : 'Review ' + cotReview.name},
        error: req.query.err
    });
};
module.exports.addReview = function(req, res) {
    getCotageInfo(req,res,function(req,res,responseData){
        rendderReviewForm(req,res,responseData);
    });
};


module.exports.doAddReview = function(req, res){
  var requestOptions, path, cotagesid, postdata;
  cotagesid = req.params.cotagesid;
  path = "/api/cotages/" + cotagesid + '/review';
  postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect('/cotages/' + cotagesid + '/review/new?err=val');
  } else {
    request(
      requestOptions,
      function(err, response, body) {
        if (response.statusCode === 201) {
           console.log(body);
          res.redirect('/cotages/' + cotagesid);
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
           console.log(body);
          res.redirect('/cotages/' + cotagesid + '/review/new?err=val');
        } else {
          console.log(body);
          _showError(req, res, response.statusCode);
        }
      }
    );
  }
};
