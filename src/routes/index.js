import express from "express";
// import { verifyToken, adminVerifyToken } from "../middlewares/VerifyToken.js";

// import controller
// import usersController from "../controllers/users.controller.js";
import usersController from '../controllers/users.controller.js';
// import programsController from "../controllers/programs.controller.js";
// import teachersController from "../controllers/teachers.controller.js";
// import statsController from "../controllers/stats.controller.js";
// import ppdbController from "../controllers/ppdb.controller.js";
// import profileController from "../controllers/profile.controller.js";
// import studentsController from "../controllers/students.controller.js";

const router =  express.Router();

// import cloudinaryConfig from "../configs/cloudinary.config.js";

/* users */
router.post('/users', usersController.create);
router.get('/users', usersController.get);


export default router;