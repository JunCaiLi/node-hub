const {
  USERNAME_PASSWORD_IS_REQUIRE,
  USER_ALREADY_EXIST,
  USER_DOES_NOT_EXIST,
  USER_PASSWORD_FAIL,
  UNAUTHORIZED,
  UNPERMISSION,
} = require('../constant/errorType')

const errorHandle = (error, ctx) => {
  console.log(error.message);
  let message, status;
  switch (error.message) {
    case USERNAME_PASSWORD_IS_REQUIRE:
      status = 400; // params fault
      message = USERNAME_PASSWORD_IS_REQUIRE
      break;
    case USER_ALREADY_EXIST:
      status = 409; // conflict
      message = USER_ALREADY_EXIST
      break;
    case USER_DOES_NOT_EXIST:
      status = 400;
      message = USER_DOES_NOT_EXIST
      break;
    case USER_PASSWORD_FAIL:
      status = 400;
      message = USER_PASSWORD_FAIL
      break;
    case UNAUTHORIZED:
      status = 401;
      message = 'sorry you unauthoried'
      break;
    case UNPERMISSION: 
      status = 401;
      message = 'No Permission'
      break;
    default:
      status = 404;
      message = 'Not Found!'
  }
  ctx.status = status;
  ctx.body = message
}

module.exports = errorHandle