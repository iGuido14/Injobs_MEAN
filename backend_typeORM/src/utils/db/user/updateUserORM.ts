import typeORM from "../../typeORM";
import { Users } from "../../../entities/User";

const userRepository = typeORM.getMongoRepository(Users);

export const updateUserORM = async (username: string, body: any) => {
    const result = await userRepository.updateOne(
        { username: username },
        { $set: body }
    );

    return result;
};