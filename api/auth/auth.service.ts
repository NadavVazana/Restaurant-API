import { AuthDto } from "models/auth";
import { User } from "models/user";
import * as createHttpError from "http-errors";
import * as bcrypt from "bcrypt";
import { dbService } from "../../services/db.service";
import { userService } from "../user/user.service";
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET1 || "Secret-1234");

const EntityTypes = {
  user: "user",
};

async function collection() {
  return dbService.getCollection("user");
}

async function loginUser(userToLogin: AuthDto) {
  const user = await userService.getUserByEmail(userToLogin.email);
  if (!user) {
    throw new createHttpError.NotFound(`Invalid email`);
  }

  const match = await bcrypt.compare(userToLogin.password, user.password);
  if (!match) {
    throw new createHttpError.NotFound(`Invalid password`);
  }
  delete user.password;
  return user;
}

async function getLoginToken(user: User) {
  return cryptr.encrypt(JSON.stringify(user));
}

async function logoutUser() {}

async function signupUser(user: User) {
  const saltRounds = 10;

  if (!user.email || !user.firstName || !user.lastName || !user.password)
    throw new createHttpError.NotFound("All credentials are required!");

  user.password = await bcrypt.hash(user.password, saltRounds);

  await (await collection()).insertOne(user);
  delete user.password;
  return user;
}

export const authService = {
  loginUser,
  logoutUser,
  signupUser,
  getLoginToken,
};

function NotFoundError(entityType: string, entityId: string) {
  return new createHttpError.NotFound(
    `${entityType}'s id: ${entityId} was not found..`
  );
}
