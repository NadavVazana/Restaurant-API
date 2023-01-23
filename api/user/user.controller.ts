import { userService } from "./user.service";
import { Request, Response } from "express";

async function getUsers(req: Request, res: Response) {
  try {
    console.log("here");

    const users = await userService.query();

    res.json(users);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function signUp(req: Request, res: Response) {
  try {
    const { firstName, lastName, password, email } = req.body;
    const user = { firstName, lastName, password, email };
    const account = await userService.addUser(user);
    

    res.json(
      `The user with the name of: ${user.firstName} ${user.lastName} has been added!`
    );
  } catch (error) {
    res.status(error.status).send(error);
  }
}

export const userController = {
  getUsers,
  signUp,
};
