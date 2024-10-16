import prisma from "../prisma";

export default async function userGetAllPrisma() {
    const user = await prisma.users.findMany();
    return user;
}
