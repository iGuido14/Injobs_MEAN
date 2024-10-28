import { getRepository } from "typeorm";
import { User } from "../../../entities/User";

export default async function getAllUsersORM() {
    const users = await getRepository(User).find();
    return users;
}