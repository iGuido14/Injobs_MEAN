import prisma from "../prisma"; // Import Prisma Client instance
import slugfy from "../../slugfy"; // Import slug generation utility

interface ProductCreateInput {
    description: string;
    id_cat: string;
    images?: string[];
    img?: string;
    name: string;
    price: number;
}

export default async function createProduct(
    inputs: ProductCreateInput,
    currentUser: string
) {
    // Basic validation for required fields can be added here
    if (!inputs.name || !inputs.description || !inputs.id_cat || inputs.price < 0) {
        throw new Error('Invalid input data');
    }

    try {
        const slug = slugfy(inputs.name);
        const newProduct = await prisma.products.create({
            data: {
                author: currentUser,
                description: inputs.description,
                favouritesCount: 0,
                id_cat: inputs.id_cat,
                images: inputs.images || [
                    'placeholder_1.png',
                    'placeholder_2.png',
                    'placeholder_3.png',
                    'placeholder_4.png',
                    'placeholder_5.png',
                ],
                img: inputs.img || 'product_7',
                name: inputs.name,
                price: inputs.price,
                slug,
                isClosed: false,
                isAccepted: false,
            },
        });

        console.log('Product created:', newProduct);
        return newProduct;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error; // Re-throw the error for further handling
    }
}
