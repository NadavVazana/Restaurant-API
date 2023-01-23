import * as express from "express";
const router = express.Router();
import { userController } from "./user.controller";

router.get("/", userController.getUsers);
router.get("/:userId", userController.getUserById);

router.delete("/:userId", userController.removeUser);

export default router;
