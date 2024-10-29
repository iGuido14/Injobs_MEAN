import typeORM from "../../typeORM";
import { Products } from "../../../entities/Product";
import { Users } from "../../../entities/User";

const productRepository = typeORM.getMongoRepository(Products);
const userRepository = typeORM.getMongoRepository(Users);

export const getPendingProductsORM = async () => {
    const products = await productRepository.find({ isAccepted: false });

    // Como el relation no funciona, se hace un fetch de los autores de los productos
    const productsWithAuthors = await Promise.all(
        products.map(async (product) => {
            const user = await userRepository.findOneBy({ _id: product.author });
            return {
                ...product,
                author: user,
            };
        })
    );
    return productsWithAuthors
};