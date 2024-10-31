import { users } from "@prisma/client";

export default function userViewer(user: users, token: string) {
  const userView = {
    user: {
      email: user.email,
      company_token: token,
      username: user.username,
      bio: user.bio,
      image: user.image,
      favoriteProducts: user.favouriteProducts,
      userType: user.userType,
    },
  };
  return userView;
}