import { hash, hashSync, compare } from "bcrypt"

const SALT = 10

export const crypt = {
    hash: (password: string) => hash(password, SALT),
    hashSync: (password: string) => hashSync(password, SALT),
    compare
}