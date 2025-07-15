import { Router } from "express"
import { registerForevents, cancleRegisteration } from "../../controllers/userControllers/user"

const router = Router();

// Register for Event
router.post("/register", registerForevents)

// Cancel Registration
router.post("/cancel", cancleRegisteration)

export default router