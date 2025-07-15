import { Router } from "express"
import { createEvent, getEventData, getEventStats, getUpcommingEvents } from "../../controllers/eventControllers/event";

const router = Router();

// Create an event
router.post("/create", createEvent)

// Get Event Details
router.get("/events", getEventData)

// List Upcoming Events
router.get("/upcomming-events", getUpcommingEvents)

// Event Stats
router.get("/:eventId", getEventStats)

export default router