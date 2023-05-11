'use strict';
const bcrypt = require('bcryptjs')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      const userId = await queryInterface.bulkInsert('Users', [{
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: bcrypt.hashSync(SEED_USER.password, bcrypt.genSaltSync(10), null),
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {})

      await queryInterface.bulkInsert('Todos', Array.from({ length: 10 }).map((_, i) => ({
        name: `name-${i}`,
        UserId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      })), {});
      process.exit()
    } catch (error) {
      console.log(error)
    }
  },
  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('Todos', null, {})
      await queryInterface.bulkDelete('Users', null, {})
      process.exit()
    } catch (error) {
      console.log(error)
    }
  }
};
