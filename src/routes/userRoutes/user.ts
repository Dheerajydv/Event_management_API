import { Router } from "express"
import { registerForEvent } from "../../controllers/userControllers/user"

const router = Router();

// Register for Event
router.post("/register", registerForEvent)
// Cancel Registration

export default router