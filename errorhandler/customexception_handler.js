const { CustomException } = require('./customexception_handler');

/**
 *
 * @param { Error } err
 * @returns { CustomException }
 */
const exceptionHandler = (err) => {
  if (err instanceof CustomException) return err;
  return err;
};

module.exports = exceptionHandler;
