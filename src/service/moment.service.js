const connection = require('../app/database');

const sqlSegment = `
  SELECT
	  m.id id, m.content content, m.createAt createTime, m.updateAt updataTime,
	  JSON_OBJECT('id', u.id, 'name', u.name) user
  FROM moment m 
  LEFT JOIN users u ON m.user_id = u.id
`
class MomentService {
  async createContent(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES(?, ?);`;

    const [result] = await connection.execute(statement, [content, userId]);
    // database 
    return result
  }

  async getMomentById(id) {
    const statement = `
      ${sqlSegment}
      WHERE m.id = ?;`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }

  async getMomentList(offset, size) {
    const statement = `
      SELECT
	      m.id id, m.content content, m.createAt createTime, m.updateAt updataTime,
	      JSON_OBJECT('id', u.id, 'name', u.name) user,
        (SELECT COUNT(*) FROM comment c WHERE c.comment_id = m.id) commentCount
      FROM moment m 
      LEFT JOIN users u ON m.user_id = u.id
      LIMIT ?, ? ;`;
    const [result] = await connection.execute(statement, [offset, size]);
    console.log(result);
    return result
  }

  async upDateMoment(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }

  async deleteMoment(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new MomentService();