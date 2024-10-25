import prisma from "../prisma";

export default async function userGetPrisma(username: string) {
  // return username;
  if (!username) return null;
  const user = await prisma.users.findUnique({
    where: { username },
    include: {
      products: true
    },
  });
  return user;
}
