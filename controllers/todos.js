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
	// console.log(newTodo);
	const savedTodo = await newTodo.save();
	user.todos = user.todos.concat(savedTodo._id);
	await user.save();
	// console.log(savedTodo);

	return response.status(201).json(savedTodo);
});

todosRouter.delete("/:id", async (request, response) => {
	const user = request.user;
	// console.log(user);

	await Todo.findByIdAndDelete(request.params.id);
	console.log("parametro", request.params.id);

	user.todos.map((todo) => console.log("map", String(todo)));
	user.todos = user.todos.filter((todo) => todo.id !== request.params.id);

	await user.save();
	// console.log(user.todos);

	return response.sendStatus(200);
});

module.exports = todosRouter;
