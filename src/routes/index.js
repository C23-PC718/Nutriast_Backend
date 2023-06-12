import express from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import usersController from "../controllers/users.controller.js";
import intakeusersController from "../controllers/intakeusers.controller.js";

const router = express.Router();

// /* users */
router.get("/users", verifyToken, usersController.get);
router.get("/users/:userId", verifyToken, usersController.getbyid);
router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.delete("/logout", usersController.logout);
router.post("/predict/:userId", verifyToken, usersController.predict);
/* intakeusers */
router.get("/intakeusers", verifyToken, intakeusersController.get);
router.get("/intakeusers/:intakeUserId", verifyToken, intakeusersController.getbyid);
router.get("/intakeusershistory/:intakeUserId", verifyToken, intakeusersController.gethistory);
router.post("/intakeusers/:userId", verifyToken, intakeusersController.create);

// UNTUK TEST LOCAL
// /* users */
// router.get("/users", usersController.get);
// router.get("/users/:userId", usersController.getbyid);
// router.post("/register", usersController.register);
// router.post("/login", usersController.login);
// router.delete("/logout", usersController.logout);
// router.post("/predict/:userId", usersController.predict);
// /* intakeusers */
// router.get("/intakeusers", intakeusersController.get);
// router.get("/intakeusers/:intakeUserId", intakeusersController.getbyid);
// router.get("/intakeusershistory/:intakeUserId", intakeusersController.gethistory);
// router.post("/intakeusers/:userId", intakeusersController.create);

export default router;