'use strict';

//We want to add userId to todoList

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('todoLists', "userId", { 
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("todoLists", "userId");
  }
};
