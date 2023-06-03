import express from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import usersController from '../controllers/users.controller.js';
import intakeusersController from '../controllers/intakeusers.controller.js';

const router =  express.Router();

/* users */
router.get('/users', verifyToken, usersController.get);
router.get('/users/:id', verifyToken, usersController.getbyid);
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.delete('/logout', usersController.logout)

/* intakeusers */
router.get('/intakeusers', verifyToken, intakeusersController.get);
router.get('/intakeusers/:id', verifyToken, intakeusersController.getbyid);
router.post('/intakeusers/:id', verifyToken, intakeusersController.create);


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