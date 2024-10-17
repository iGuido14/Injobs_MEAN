import prisma from "../prisma";

export default async function productGetAllPrisma() {
    const productList = await prisma.products.findMany();
    return productList;
}
