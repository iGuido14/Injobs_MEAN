import typeORM from "../../typeORM";
import { Products } from "../../../entities/Product";
import { Users } from "../../../entities/User";
import { Applications } from "../../../entities/Application";

const productRepository = typeORM.getMongoRepository(Products);
const userRepository = typeORM.getMongoRepository(Users);
const applicationRepository = typeORM.getMongoRepository(Applications);

export const getAllApplicationsORM = async (username: String) => {
    // return username
    const currentUser = await userRepository.findOneBy({ username });
    // return currentUser
    const applications = await applicationRepository.find({ where: { asignedRecruiter: currentUser?._id } });
    // return applications

    // Como el relation no funciona, se hace un fetch de los autores de los productos
    const applicationWithAuthors = await Promise.all(
        applications.map(async (application) => {
            const user = await userRepository.findOneBy({ _id: application.user });
            const asignedRecruiter = await userRepository.findOneBy({ _id: application.asignedRecruiter });
            const product = await productRepository.findOneBy({ _id: application.product });
            const product_author = await userRepository.findOneBy({ _id: product?.author });
            return {
                ...application,
                user: user,
                asignedRecruiter: asignedRecruiter,
                product: product,
                product_author: product_author?.username
            };
        })
    );

    return applicationWithAuthors;
};