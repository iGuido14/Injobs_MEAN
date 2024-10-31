import { AppDataSource } from "../config/ormConfig.ts";
import { Users } from "../entities/User";

export const userViewer = (user: any, recruiter_token?: string) => {
    const userView = {
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            image: user.image,
            ...(recruiter_token && { recruiter_token }), //only send if token exists
            userType: user.userType,
        },
    };
    return userView;
}