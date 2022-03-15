### Useful commands

- Generate Models & Migrations

`npx sequelize-cli model:generate --name user --attributes name:string,email:string,phone:integer,password:string`

- Generate Seed files

`npx sequelize-cli seed:generate --name some-users`

### Why add relations ?

- Not repeating data
- Only keep relevant data
- to improve performance

### Types of relation

**One to One**:

Person <-> Id card
Person <-> Social Security Number
Person <-> Drivers License
Person <-> Brain

**One to Many**:

User <-> todoList
Person <-> Passports
Person <-> phone number

user hasMany images
images belongTo user

**Many to Many**:

person hasMany subjects
subjects belongToMany person

### Steps to add relation

**Step 0:** Undo all your migrations and add the Foreign key to the seeds

`npx sequelize-cli db:migrate:undo:all`

**Step 1:** Generate a new file to add the relation

`npx sequelize-cli migration:generate --name set-up-relations`

**Step 2:** Modify that file to describe the relation

```js
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("todoLists", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("todoLists", "userId");
  },
};
```

**Step 3:** Migrate and check Postico/DBeaver (here you test the migration files)

`npx sequelize-cli db:migrate`

**Step 4:** Write the relations in the models

**Step 5:** Write queries to test (here you test the model files)