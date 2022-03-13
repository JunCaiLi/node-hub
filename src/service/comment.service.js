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

  async getCommentByMomentId(momentId) {
    const statement = `
      SELECT 
        m.id, m.content, m.comment_id commentId, m.createAt createTime,
        JSON_OBJECT('id', u.id, 'name', u.name) author
      FROM comment m 
      LEFT JOIN users u ON u.id = m.user_id
      WHERE moment_id = ?
    `;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new CommentService();