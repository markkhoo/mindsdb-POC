import 'dotenv/config';
import { cleanEnv, makeValidator } from 'envalid'

const notEmptyString = makeValidator(x => {
  if (typeof x !== 'string' || x.length === 0) {
    throw new Error('Expected non-empty string')
  }
  return x
});

export default cleanEnv(process.env, {
  MINDSDB_USER: notEmptyString(),
  MINDSDB_PASS: notEmptyString(),
});