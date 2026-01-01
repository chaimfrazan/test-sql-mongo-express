import { Router } from "express";
import { createUsers, getProfile } from "../controllers/users.collection.js";

const router = Router()

router.post('/register', createUsers)
router.get('/me', getProfile)
export default router