import { Router } from "express";
import { createMessage , decryptMessage } from "../controllers/massege.table.js";

const router = Router()

router.post('/encript', createMessage)
router.post('/decrypt', decryptMessage)

export default router