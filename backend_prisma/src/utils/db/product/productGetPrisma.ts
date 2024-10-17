import prisma from "../prisma";

export default async function productGetPrisma(slug: string) {
    const product = await prisma.products.findUnique({
        where: { slug }
    });
    return product;
}