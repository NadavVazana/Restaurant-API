const express = require("express");
const router = express.Router();
import { userController } from "./user.controller";

// USERS
router.get("/", userController.getUsers);
router.post("/", userController.signUp);

export default router;
