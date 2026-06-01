import express, { Router } from "express";
const router: Router = express.Router();

import { signIn, signUp, signOut } from "../../controllers/admin/auth.controller";

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.post("/sign-out", signOut);

export default router;
