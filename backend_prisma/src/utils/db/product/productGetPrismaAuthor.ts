import prisma from "../prisma";

export default async function productGetPrismaAuthor(author: string) {
    const product = await prisma.products.findMany({
        where: { author }
    });
    return product;
}