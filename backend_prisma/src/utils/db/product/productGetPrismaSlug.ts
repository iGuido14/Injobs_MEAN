import prisma from "../prisma";

export default async function productGetPrismaSlug(slug: string) {
    const product = await prisma.products.findUnique({
        where: { slug },
        include: {
            authorRelation: true
        }
    });
    return product;
}