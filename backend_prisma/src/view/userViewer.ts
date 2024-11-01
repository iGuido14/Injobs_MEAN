import { users } from "@prisma/client";

export default function userViewer(user: users, token?: string) {
  const userView = {
    user: {
      email: user.email,
      accessToken: token,
      username: user.username,
      bio: user.bio,
      image: user.image,
      userType: user.userType,
    },
  };
  return userView;
}