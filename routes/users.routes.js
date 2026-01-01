import { Router } from "express";
import { createUsers } from "../controllers/users.collection.js";

const router = Router()

router.post('/register', createUsers)
// router.get('/api/products', getProducts)
export default router