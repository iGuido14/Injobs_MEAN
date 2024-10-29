import typeORM from "../../typeORM";
import { Products } from "../../../entities/Product";
import { Users } from "../../../entities/User";
import { Applications } from "../../../entities/Application";

const productRepository = typeORM.getMongoRepository(Products);
const userRepository = typeORM.getMongoRepository(Users);
const applicationRepository = typeORM.getMongoRepository(Applications);

export const getAllApplicationsORM = async () => {
    // return "entra en getAllApplicationsORM";

    const applications = await applicationRepository.find({
        relations: ["user"]
    });

    // Como el relation no funciona, se hace un fetch de los autores de los productos
    // const applicationWithAuthors = await Promise.all(
    //     products.map(async (product) => {
    //         const user = await userRepository.findOneBy({ _id: product.author });
    //         return {
    //             ...product,
    //             author: user,
    //         };
    //     })
    // );

    return applications;
};