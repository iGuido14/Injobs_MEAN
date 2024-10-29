import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../utils/types";

export default async function userLoginValidator(req: Request, res: Response, next: NextFunction) {

  const errors: ValidationError = {};
  errors.body = [];
  if (!req.body) {
    errors.body.push("can't be empty");
    return res.status(400).json({ errors });
  }

  const { user } = req.body;
  if (!user) {
    errors.body.push("user object must be defined");
    return res.status(400).json({ errors });
  }

  const { password, email } = user;

  if (!password) {
    errors.body.push("password property in user can't be empty");
  } else if (typeof password != "string") {
    errors.body.push("password property in user must be a string");
  }

  if (!email) {
    errors.body.push("email property in user can't be empty");
  } else if (typeof email != "string") {
    errors.body.push("email property in user must be a string");
  }

  if (errors.body.length) return res.status(400).json({ errors });
  next();
}
