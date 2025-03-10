const jwt = require("jsonwebtoken");
const {response} = require("../app");

const userExtractor = async (request, response, next) => {
	console.log("hola");
	next();
};

module.exports = {userExtractor};
