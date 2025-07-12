import { Router } from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByPriority,
} from "../controllers/eventController";

const router = Router();

router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);
router.post("/events", createEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);
router.get("/events/priority/:priority", getEventsByPriority);

export default router;
