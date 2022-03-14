const User = require("./models").user;

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

createNewUser("Dario", "e@d.com", "12345");
