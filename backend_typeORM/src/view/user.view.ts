import { AppDataSource } from "../config/ormConfig.ts";
import { Users } from "../entities/User";

export const userViewer = (user: any, token?: string) => {
    const userView = {
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            image: user.image,
            ...(token && { token }) //only send if token exists
        },
    };
    return userView;
}