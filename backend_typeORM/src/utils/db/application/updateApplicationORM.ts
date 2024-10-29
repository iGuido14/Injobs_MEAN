import typeORM from "../../typeORM";
import { Applications } from "../../../entities/Application";

const applicationRepository = typeORM.getMongoRepository(Applications);

export const updateApplicationORM = async (slug: string, body: any) => {
    const result = await applicationRepository.updateOne(
        { slug: slug },         // filter criteria to find the document
        { $set: body }           // data to update in the document
    );

    return result;
};