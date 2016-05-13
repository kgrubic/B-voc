/* Get HOME page*/
module.exports.homelist = function(req,res){
	res.render('cotages-list',{
		title :'B-voc : find a place for vocation',
		pageHeader: {
			title: 'B-voc',
			strapline: 'Find your place to charge your batheries'
		},
		sidebar: "looking for a great place for a weekend or a holiday :) ",
		cotages : [{
			name : 'Cotage Jelena',
			address : '124 Black Street, Fremont, CA',
			rating : 3,
			facilities : ['wifi','full kitchen','2 bd','1 ba','large yard'],
			minstay : 3,
			img: 'public/images/jelena.jpg'
		},
        {
            name : 'Neveno home',
            address : '124 Vallejo, San Jose, CA',
            rating : 4,
            facilities : ['wifi','full kitchen','3 bd','2,5 ba','large yard'],
            minstay : 3
        }
		]
		});
}


/* GET Cotage info page */
module.exports.cotageInfo = function(req, res) {
    res.render('cotage-info', {
        title: 'Cotage Jelena',
        pageHeader: {
            title: 'Cotage Jelena'
        },
        sidebar: {
            context: 'is on B-voc because it is a beautiful place to stay for holidays.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        cotages: {
            name: 'Cotage Jelena',
            address: '124 Black Street, Fremont, CA',
            rating: 3,
            facilities: ['wifi','full kitchen','2 bd','1 ba','large yard'],
            coords: {
                lat: 51.455041,
                lng: -0.9690884
            },
            reviews: [{
                author: 'Simon Holmes',
                rating: 5,
                timestamp: '16 July 2013',
                reviewText: 'What a great place. I can\'t say enough good things about it.'
            }, {
                author: 'Charlie Chaplin',
                rating: 3,
                timestamp: '16 June 2013',
                reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
            }]
        }
    });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
    res.render('cotage-review-form', {
        title: 'Review Jelena on B-voc',
        pageHeader: {
            title: 'Review Jelena'
        }
    });
};
