import { Router } from "express";
import {
  createMessage,
  decryptMessage,
  listMyMessage,
} from "../controllers/massege.table.js";

const router = Router();

router.get("/", listMyMessage);
router.post("/encript", createMessage);
router.post("/decrypt", decryptMessage);

export default router;
