import { CustomException } from '../exception/customexception.js';

/**
 *
 * @param { Error } err
 * @returns { CustomException }
 */
const exceptionHandler = (err) => {
  if (err instanceof CustomException) return err;
  return err;
};

export default exceptionHandler;
