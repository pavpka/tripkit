import { hash, verify } from 'argon2';
import { randomBytes } from 'node:crypto';

const dummyHash = await hash(randomBytes(32).toString('hex'));

export const fakeVerify = () => verify(dummyHash, 'x').catch(() => false);