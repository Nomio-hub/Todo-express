import express from "express";

const app = express();
app.use(express.json());

let todos = [{ id: 1, name: "wake up", cheched: false }];

app.get("/api/todos", (req, res) => {
  return res.send(todos);
});

app.post("/api/todos", (req, res) => {
  const name = req.body?.name; // req-ees body baiwal ternees nameiig awah
  if (!name) {
    return res.status(400).send({ message: "body must have name" });
  }
  const newTodo = {
    id: [todos.length - 1].id + 1, // [todos.length - 1] svvlin id
    checked: false,
    name,
  };
  todos.push(newTodo);
  return res.send(newTodo);
});

app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const deletingItem = todos.find((todos) => todos.id == id);
  if (!deletingItem) {
    return res.status(404).send({ message: "todo not found" });
  }
  todos = todos.filter((todo) => todo.id != id); // filter ni dawtalt
  return res.send(deletingItem);
});

app.put("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const updatingItem = todos.find((todos) => todos.id == id);
  if (!updatingItem) {
    return res.status(404).send({ message: "todo not found" });
  }
  const { name, checked } = req.body;
  if (!name || checked !== undefined) {
    return res
      .status(404)
      .send({ message: "body must have at least name or checked" });
  }
  const updatedTodo = {
    ...updatingItem,
    ...(name && { name }),
    ...(checked !== undefined && { checked }),
  }; // const updatedTodo = { id: updatingItem.id, name: updatingItem.name }; adilhan
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return updatedTodo;
    }
    return todo;
  });
  return res.send(updatedTodo);
});

app.listen(5400, () => {
  console.log("server is running on http://localhost:5400");
});
