import typeORM from "../../typeORM";
import { Users } from "../../../entities/User";

const userRepository = typeORM.getMongoRepository(Users);

export const getOneUserORM = async (username: string) => {
    const user = await userRepository.findOne({ where: { username } })

    return user
};