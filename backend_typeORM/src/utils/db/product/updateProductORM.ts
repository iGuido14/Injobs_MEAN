import typeORM from "../../typeORM";
import { Products } from "../../../entities/Product";

const productRepository = typeORM.getMongoRepository(Products);

export const updateProductORM = async (slug: string, body: any) => {
    const result = await productRepository.updateOne(
        { slug: slug },
        { $set: body }
    );

    return result;
};