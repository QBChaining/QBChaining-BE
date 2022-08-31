import {
  CustomException,
  UnkownException,
} from '../exception/customException.js';

/**
 *
 * @param { Error } err
 * @returns { CustomException }
 */
const exceptionHandler = (err) => {
  if (err instanceof CustomException) return err;
  else if (err instanceof Error) return new UnkownException(err);
  else return new UnkownException('알 수 없는 에러가 났다.');
};

export default exceptionHandler;
