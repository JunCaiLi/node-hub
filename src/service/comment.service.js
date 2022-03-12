const connection = require('../app/database');

class CommentService {
  async createComment(userId, content, momentId) {
    try {
      const statement = `INSERT INTO comment (content, user_id, moment_id) VALUES(?, ?, ?);`;
      const [result] = await connection.execute(statement, [content, userId, momentId]);
      // database 
      return result
    } catch (err) {
      console.log(err);
    }
  }

  async replyComment(userId, content, momentId, commentId) {
    try {
      const statement = `INSERT INTO comment (content, user_id, moment_id, comment_id) VALUES(?, ?, ?, ?);`;
      const [result] = await connection.execute(statement, [content, userId, momentId, commentId]);
      // database 
      return result
    } catch (err) {
      console.log(err);
    }
  }

  async upDateComment(content, commentId) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, commentId]);
    return result;
  }

  async deleteComment(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }
}

module.exports = new CommentService();