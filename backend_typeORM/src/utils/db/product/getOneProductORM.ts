import typeORM from "../../typeORM";
import { Products } from "../../../entities/Product";

const productRepository = typeORM.getMongoRepository(Products);

export const getOneProductORM = async (slug: string) => {
    const product = await productRepository.findOne({ where: { slug } })

    return product
};