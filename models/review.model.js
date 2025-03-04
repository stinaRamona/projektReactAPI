const Mongoose = require ("mongoose"); 

const ReviewSchema = new Mongoose.Schema({
    //bokid från Google Books API 
    bookId: {
        type: String
    },  
    //id från användaren
    userId: {
        type: Mongoose.Schema.Types.ObjectId, ref: "User", required: true,
    }, 
    rating: {
        type: Number
    }, 
    review: {
        type: String
    }
}); 

const Review = Mongoose.model("Review", ReviewSchema); 

module.exports = Review; 