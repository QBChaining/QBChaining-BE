const { CustomException } = require('../exception/customException');

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
