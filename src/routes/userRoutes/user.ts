import { Router } from "express"
import { registerForevents } from "../../controllers/userControllers/user"

const router = Router();

// Register for Event
router.post("/register", registerForevents)


export default router