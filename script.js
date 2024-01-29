// const url = "https://crudcrud.com/api/4446062dedcd4fbeace2c026a5baeac0/todos";

// const todo = document.getElementById("todo");
// const todos = document.getElementById("todos");
// const addTodoButton = document.getElementById("addTodoButton");

// const todosArray = [];

// const postTodo = (event) => {
//   event.preventDefault();
// 	fetch(url, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			name: todo.value,
// 			createAt: new Date(),
// 			completed: true,
// 		}),
// 	})
// 		.then((respocse) => {
// 			getTodos();
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});

// 	todo.value = "";
// };
// const getTodos = () => {
//   fetch(url).then((respocse) => {
//     return respocse.json();
//   }).then((todos) => {
//     renderTodos(todos);
//   })
// };

// getTodos();

// const renderTodos = (data) => {
//   todos.innerHTML = "";
//   data.forEach((el) => {
//     // const dateFromBack = new Date(el.createAt).toISOString();
//     const {_id, name, createAt } = el;
//     const newTodos = document.createElement("div");
//     newTodos.id = _id;
//     const todoName = document.createElement("p");
//     const todoDate = document.createElement("p");
//     const deleteButton = document.createElement("button");
//     deleteButton.innerText = "Delete";
//     const completedButton = document.createElement("button");
//     completedButton.innerHTML = 'Complete';
//     todoDate.innerHTML = createAt;
//     todoName.innerText = name;
//     newTodos.className = completed === true ? 'completed' : 'unCompleted';
//     newTodos.append(todoName, todoDate, completedButton, deleteButton);
//     todos.appendChild(newTodos);
//   });
// };

// addTodoButton.onclick = postTodo;

const url = "https://crudcrud.com/api/4446062dedcd4fbeace2c026a5baeac0/movies";
const todo = document.getElementById("todo");
const todos = document.getElementById("todos");
const addTodoButton = document.getElementById("addTodoButton");
const todosArray = [];
const postTodo = (event) => {
	event.preventDefault();
	console.log(todo.value);
	if (todo.value !== "") {
		fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				name: todo.value,
				createAt: new Date(),
				completed: false,
			}),
		})
			.then((response) => {
				getTodos();
			})
			.catch((error) => {
				console.log(error);
			});
	}
	todo.value = "";
};
const getTodos = () => {
	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((todos) => {
			renderTodos(todos);
		});
};
getTodos();
const renderTodos = (data) => {
	todos.innerHTML = "";
	data.forEach((el) => {
		const { _id, name, createAt, completed } = el;
		const newTodos = document.createElement("div");
		newTodos.id = _id;
		const todoName = document.createElement("p");
		const todoDate = document.createElement("p");
		const deleteButton = document.createElement("button");
		deleteButton.innerText = "delete";
		const completedButton = document.createElement("button");
		completedButton.innerHTML = "complete";
		todoDate.innerHTML = createAt;
		todoName.innerText = name;
		newTodos.className = completed ? "completed" : "unCompleted";
		newTodos.append(todoName, todoDate, completedButton, deleteButton);
		todos.appendChild(newTodos);
		deleteButton.onclick = () => {
			deleteTodo(el._id);
		};
		completedButton.onclick = () => {
			console.log("func is working");
			updateTodo(el);
		};
	});
};
const deleteTodo = (id) => {
	fetch(`${url}/${id}`, {
		method: "DELETE",
	}).then(() => {
		getTodos();
	});
};
const updateTodo = (el) => {
	const { name, createAt, completed } = el;
	console.log("elelment", el);
	fetch(`${url}/${el._id}`, {
		method: "PUT",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify({ name, createAt, completed: !completed }),
	}).then(() => {
		getTodos();
	});
};
addTodoButton.onclick = postTodo;
