const connection = require('../app/database');

class AuthService {
  async checkResource(tableName, id, userId) {
    console.log(tableName, id, userId);
    try {
      const statement = `SELECT * FROM ${tableName} WHERE user_id = ? and id = ?;`;
      const [result] = await connection.execute(statement, [userId, id])
      return result.length === 0 ? false : true;
    } catch (err) {
      console.log(err)
    }
  }
}
//

module.exports = new AuthService();