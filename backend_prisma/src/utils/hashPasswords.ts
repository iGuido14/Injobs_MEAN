// import bcrypt from "bcrypt";
import argon2 from "argon2";

const saltRounds = 10;

export function hashPassword(password: string) {
  // return bcrypt.hashSync(password, saltRounds);
  const hashedPwd = argon2.hash(password);
  return hashedPwd;
}

export function compareWithHash(hash: string, password: string) {

  const match = argon2.verify(password, hash);
  return match;
}
