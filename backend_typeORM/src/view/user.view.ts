import { AppDataSource } from "../config/ormConfig.ts";
import { Users } from "../entities/User";

export const userViewer = (user: Users, token: string) => {
    const userView = {
        user: {
            email: user.email,
            token: token,
            username: user.username,
            bio: user.bio,
            image: user.image,
        },
    };
    return userView;
}