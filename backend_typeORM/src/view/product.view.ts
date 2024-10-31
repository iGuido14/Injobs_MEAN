import { AppDataSource } from "../config/ormConfig.ts";
import { Users } from "../entities/User";

const userRepository = AppDataSource.getMongoRepository(Users);

export const productViewer = async (product: any) => {
    const author = await userRepository.find(product.author);

    const productViewer = {
        user: {
            id: product.id,
            author: author,
            slug: product.slug
        },
    };
    return productViewer;
}