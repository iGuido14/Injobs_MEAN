import prisma from "../prisma";

interface UpdateFields {
  email?: string;
  username?: string;
  password?: string;
  image?: string;
  bio?: string;
}

export default async function userUpdatePrisma(username: string, info: UpdateFields) {
  if (!username) return null;
  const user = await prisma.users.update({
    where: { username },
    data: info,
    include: {
      products: true
    }
  });
  return user;
}
