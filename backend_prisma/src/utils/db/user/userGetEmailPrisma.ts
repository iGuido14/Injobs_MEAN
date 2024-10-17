import prisma from "../prisma";

export default async function userGetEmailPrisma(email: string) {
  if (!email) return null;
  const user = await prisma.users.findUnique({
    where: { email },
    // include: {
    //   products: true
    // },
  });
  return user;
}
