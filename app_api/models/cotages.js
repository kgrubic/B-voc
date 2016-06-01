var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    author: {type : String,required :true},
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: {type: String, required :true},
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var foodSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true
    },
    breakfast: String,
    dinner: String,
    closed: {
        type: Boolean,
        required: true
    }
});

var cotageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    rating: {
        type: Number,
        "default": 0,
        min: 0,
        max: 5
    },
    minstay : {
        type: Number,
        require : true
    },
    facilities: [String],
    // Always store coordinates longitude, latitude order.
    coords: {
        type: [Number],
        index: '2dsphere'
    },
    food: [foodSchema],
    reviews: [reviewSchema]
});

mongoose.model('Cotage', cotageSchema);