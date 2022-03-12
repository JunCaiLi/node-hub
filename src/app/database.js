const mysql = require('mysql2');

const config = require('./config');
// createPool
const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
})
// test connect
connections.getConnection((err, conn) => {
  if (err) {
    console.log(err);
    return;
  }
  conn.connect((err) => {
    if (err) {
      console.log('connect fail', err);
    } else {
      console.log('connect success~');
    }
  })
})


module.exports = connections.promise()