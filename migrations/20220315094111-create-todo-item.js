'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('todoItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      task: {
        type: Sequelize.STRING
      },
      deadline: {
        type: Sequelize.STRING
      },
      todoListId: {
        type: Sequelize.INTEGER,
        references: {
          model: "todoLists",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('todoItems');
  }
};