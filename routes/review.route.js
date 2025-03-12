const Review = require("../models/review.model"); 
const Joi = require("joi"); 

const ReviewRouteArr = [
    //Hämta hela listan med bloginlägg
    {
        method: "GET", 
        path: "/reviews",
        options : {
            auth: false
        },
        handler: async (request, h) => {
            return await Review.find(); 
        }
        
    },

    //Hämta ett specifikt review för BOK
    {
        method: "GET",
        path: "/review/{bookId}",
        options: {
            auth: false
        }, 
        handler: async (request, h) => {
            try {
                const review = await Review.find({bookId : request.params.bookId}); 
                return review || h.response("Inlägget hittades inte").code(404)
            } catch(err) {
                return h.response(err).code(500)
            } 
        } 
    },
    
    //hämta specifik review baserat på användarID
    {
        method: "GET",
        path: "/review/{userId}",
        options: {
            auth: false
        }, 
        handler: async (request, h) => {
            try {
                const review = await Review.find({userId : request.params.userId}); 
                return review || h.response("Inlägget hittades inte").code(404)
            } catch(err) {
                return h.response(err).code(500)
            } 
        } 
    },

    //Lägg till ett blogginlägg
    {
        method: "POST",
        path: "/review", 
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    bookId: Joi.string().required(), 
                    userId: Joi.string().required(),
                    rating: Joi.number().min(1).max(5).required(), 
                    review: Joi.string().min(5).required()
                })
            }
        },
        handler: async (request, h) => {
            const review = new Review(request.payload);
            return await review.save();
        }
    }, 

    //Uppdatera ett blogginlägg
    {
        method: "PUT",
        path: "/review/{id}", 
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    bookId: Joi.string().required(), 
                    userId: Joi.string().required(),
                    rating: Joi.number().min(1).max(5).required(), 
                    review: Joi.string().min(5).required()
                })
            }
        },
        handler: async (request, h) => {
            try {
                return await Review.findByIdAndUpdate(
                    request.params.id,
                    request.payload,
                    { new: true }
                );

            } catch (err) {
                return h.response(err).code(500);
            }
        }
    },
    
    //Ta bort ett blogginlägg 
    {
        method: "DELETE",
        path: "/review/{id}", 
        options: {
            auth: false,
        },
        handler: async (request, h) => {
            try {
                return await Review.findByIdAndDelete(request.params.id);
            } catch(err) {
                return h.response(err).code(500); 
            } 
        }
    }
]

module.exports = ReviewRouteArr; 