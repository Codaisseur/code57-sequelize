const express = require("express");
const User = require("./models").user; // all models.
const TodoList = require("./models").todoList;
const TodoItem = require("./models").todoItem

const PORT = 4001;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/users", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/users", async (req, res, next) => {
  try {
    // what do we need? name, email, password
    const { name, email, password } = req.body;

    if (!email) {
      res.status(400).send("You must provide a valid email address");
    }
    const newUser = await User.create({ name, email, password });
    res.send(newUser);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

// return user with requested id (findByPk)
app.get("/users/:id", async (req, res) => {
  try {
    // 1. get id from params
    const userId = req.params.id;
    // 2. fetch user by PK
    const oneUser = await User.findByPk(userId);
    res.send(oneUser);
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/all", async (req, res) => {
  try {
    // .findAll => [{}, {}, {}]
    const user = await User.findAll({ 
      include: { model: TodoList, include: [TodoItem] } 
    });
    res.send(user)
  } catch (e) {
    console.log(e.message);
  }
});


app.listen(PORT, () => console.log("server started"));
