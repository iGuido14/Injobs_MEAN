import { NextFunction, Response, Request } from "express";
import userGetAllORM from "../../utils/db/User/userGetAllORM";

export default async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        // Get all users from the ORM function
        const allUsers = await userGetAllORM();

        // Return the list of users in the response
        return res.json(allUsers);
    } catch (error) {
        // Pass the error to the next middleware/error handler
        return next(error);
    }
}
