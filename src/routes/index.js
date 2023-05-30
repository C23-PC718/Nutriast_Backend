import express from "express";
import usersController from '../controllers/users.controller.js';
import usersController from '../controllers/intakeusers.controller';

const router =  express.Router();

/* users */
router.post('/users', usersController.create);
router.get('/users', usersController.get);

router.post('/intakeusers', usersController.create);
router.get('/intakeusers', usersController.get);

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