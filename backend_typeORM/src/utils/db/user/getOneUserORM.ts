import typeORM from "../../typeORM";
import { Users } from "../../../entities/User";

const userRepository = typeORM.getMongoRepository(Users);

export const getOneUserORM = async (email: string) => {
    const user = await userRepository.findOne({ where: { email } })

    return user
};