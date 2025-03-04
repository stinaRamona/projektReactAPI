const adminRoute = require("./admin.route"); 
const reviewRoute = require("./review.route"); 

const combinedRoutes = [
    ... adminRoute, 
    ... reviewRoute
]; 

module.exports = combinedRoutes; 