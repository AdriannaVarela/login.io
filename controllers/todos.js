const todosRouter = require("express").Router();
const Todo = require("../models/todo");
const User = require("../models/user");

todosRouter.get("/", async (request, response) => {
	const user = request.user;
	// console.log(user);
	const todos = await Todo.find({user: user.id});
	return response.status(200).json(todos);
});

todosRouter.post("/", async (request, response) => {
	const user = request.user;
	const {text} = request.body;
	const newTodo = new Todo({
		text,
		checked: false,
		user: user.id,
	});
	console.log(newTodo);
	const savedTodo = await newTodo.save();
	user.todos = user.todos.concat(savedTodo._id);
	await user.save();
	// console.log(savedTodo);

	return response.status(201).json(savedTodo);
});

module.exports = todosRouter;
