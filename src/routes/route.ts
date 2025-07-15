import { Router } from "express";
import userRouter from "./userRoutes/user"
import eventRouter from "./eventRoutes/event"


export const router = Router();

router.use("/user", userRouter)
router.use("/event", eventRouter)