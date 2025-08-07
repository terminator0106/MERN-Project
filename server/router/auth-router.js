import express from 'express';
import { Router} from 'express';
import controller from "../controllers/auth-controller.js";
import {loginSchema,signupSchema} from '../validators/auth-validator.js';
import validate  from '../middleware/validate-middleware.js';
import authMiddleware from '../middleware/auth-middleware.js';
const router = Router();

router.route("/").get(controller.home);
router.route("/register").post(validate(signupSchema),controller.register);
router.route("/login").post(validate(loginSchema),controller.login);
router.route("/user").get(authMiddleware, controller.user);


export default router;