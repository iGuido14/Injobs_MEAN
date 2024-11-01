import { AppDataSource } from "../config/ormConfig.ts";
import { Users } from "../entities/User";

export const userViewer = (user: any, accessToken?: string) => {
    const userView = {
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            image: user.image,
            ...(accessToken && { accessToken }),
            userType: user.userType,

        },
    };
    return userView;
}