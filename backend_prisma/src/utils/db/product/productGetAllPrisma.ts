import prisma from "../prisma";

export default async function productGetAllPrisma() {
    const user = await prisma.products.findMany();
    return user;
}
