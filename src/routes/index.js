import express from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import usersController from "../controllers/users.controller.js";
import intakeusersController from "../controllers/intakeusers.controller.js";

const router = express.Router();

/* users */
router.get("/users",  usersController.get); //ok
router.get("/users/:userId",  usersController.getbyid); //ok
router.post("/register", usersController.register); //ok
router.post("/login", usersController.login); //ok
router.delete("/logout", usersController.logout); //ok
router.post("/predict/:userId",  usersController.predict);

/* intakeusers */
router.get("/intakeusers",  intakeusersController.get); //ok
router.get("/intakeusers/:intakeUserId",  intakeusersController.getbyid); //ok
router.post("/intakeusers/:userId",  intakeusersController.create); //ok

export default router;
