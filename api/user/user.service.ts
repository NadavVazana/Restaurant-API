import { ObjectId } from "mongodb";
// import httpErrors from "http-errors";
import { dbService } from "../../services/db.service";
// const createHttpError = require("http-errors");
import * as createHttpError from "http-errors";
import * as bcrypt from "bcrypt";
import { User } from "models/user";

const EntityType = {
  Restaurant: "Restaurant",
  Product: "Product",
};

async function collection() {
  return dbService.getCollection("user");
}

function NotFoundError(entityType: string, entityId: string) {
  return new createHttpError.NotFound(
    `${entityType}'s id: ${entityId} was not found..`
  );
}

async function query() {
  return await (await collection()).find({}).toArray();
}

async function login(user: User) {
  
}

async function addUser(user: User) {
  const saltRounds = 10;

  if (!user.email || !user.firstName || !user.lastName || !user.password)
    throw new createHttpError.NotFound("All credentials are required!");

  user.password = await bcrypt.hash(user.password, saltRounds);

  await (await collection()).insertOne(user);
  return user;
}

export const userService = {
  query,
  addUser,
};
