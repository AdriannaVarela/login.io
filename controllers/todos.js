const todosRouter = require("express").Router();
const todo = require("../models/todo");
const User = require("../models/user");

todosRouter.get("/", async (request, response) => {
	console.log("chao");
	// const todos = await Todo.find({user: "adadsa"});
	// return response.status(200).json(todos);
});

module.exports = todosRouter;
