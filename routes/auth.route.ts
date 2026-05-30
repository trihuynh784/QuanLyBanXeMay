import express, { Router } from "express";
const router: Router = express.Router();

import { signIn, signUp, signOut } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.post("/sign-out", authMiddleware, signOut);

export default router;
