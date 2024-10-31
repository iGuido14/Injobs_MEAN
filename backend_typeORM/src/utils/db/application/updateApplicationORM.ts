import typeORM from "../../typeORM";
import { Applications } from "../../../entities/Application";

const applicationRepository = typeORM.getMongoRepository(Applications);

export const updateApplicationORM = async (slug: string, body: any) => {
    const result = await applicationRepository.updateOne(
        { slug: slug },
        { $set: body }
    );

    return result;
};