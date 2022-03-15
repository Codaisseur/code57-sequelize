const User = require("./models").user;
const TodoList = require("./models").todoList
const TodoItem = require("./models").todoItem

// log all users from DB
const allUsers = async () => {
  try {
    // .findAll => [{}, {}, {}]
    const users = await User.findAll();
    console.log(users.map((u) => u.toJSON()));
  } catch (e) {
    console.log(e.message);
  }
};
// allUsers();

// get a user by Id

const specificUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
};

// specificUser(2);

const createNewUser = async (name, email, password) => {
  try {
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });
    console.log(newUser);
  } catch (e) {
    console.log(e.message);
  }
};

// createNewUser("Dario", "e@d.com", "12345");

const todoListWithUser = async () => {
  try {
    // .findAll => [{}, {}, {}]
    const todoList = await TodoList.findAll({include: User});
    console.log(todoList.map((u) => u.toJSON()));
  } catch (e) {
    console.log(e.message);
  }
};

// todoListWithUser()

const todoItemWithList = async () => {
  try {
    // .findAll => [{}, {}, {}]
    const todoItem = await TodoItem.findAll({ include: TodoList});
    console.log(todoItem.map((u) => u.toJSON()));
  } catch (e) {
    console.log(e.message);
  }
};

// todoItemWithList()

const getThemAll = async () => {
  try {
    // .findAll => [{}, {}, {}]
    const user = await User.findAll({ 
      include: { model: TodoList, include: [TodoItem] } 
    });
    console.log(user.map((u) => u.toJSON()));
  } catch (e) {
    console.log(e.message);
  }
};

getThemAll()
