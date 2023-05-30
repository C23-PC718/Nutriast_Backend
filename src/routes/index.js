import express from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import usersController from '../controllers/users.controller.js';
import intakeusersController from '../controllers/intakeusers.controller';

const router =  express.Router();

/* users */
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.delete('/logout', usersController.logout)

router.post('/intakeusers', intakeusersController.create);
router.get('/intakeusers', intakeusersController.get);

// {
//   "username":"rafi",
//   "email":"test@gmail.com",
//   "password":"test",
//   "birthdate":"2002-05-05",
//   "gender":"male",
//   "height":1.0,
//   "weight":1.0,
// }

export default router;