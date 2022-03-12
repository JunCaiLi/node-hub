const connection = require('../app/database');

class UserService {
  async create(user) {
    console.log('receive data :', user);
    const { name, password } = user
    const statement = `INSERT INTO users (name, password) VALUES(?, ?);`;

    const result = await connection.execute(statement, [name, password]);
    // database 
    return result[0]
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);

    return result[0];
  }
}

module.exports = new UserService();