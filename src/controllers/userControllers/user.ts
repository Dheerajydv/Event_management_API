import { Request, Response } from "express"
import { db } from "../../index"
import { eventTable, registrationsTable, usersTable } from "../../db/schema";
import { and, eq, sql } from "drizzle-orm";
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";


export const registerForevents = async (req: Request, res: Response) => {
    try {
        const { name, email, eventTitle } = req.body;

        // Getting the event
        const events = await db.select().from(eventTable).where(
            and(
                eq(eventTable.title, eventTitle)
            )
        )
        if (events.length == 0) {
            throw new ApiError(400, "Wrong event details provided")
        }

        // If limit reached then throw error
        if (events[0].totalRegisterations >= events[0].capacity) {
            throw new ApiError(404, "Event Maximum Capacity Reached")
        }


        // Check if the user already exists
        const userAlreadyExists = await db.select().from(usersTable).where(
            and(
                eq(usersTable.name, name),
                eq(usersTable.email, email)
            )
        )

        if (userAlreadyExists.length !== 0) {
            // If user already exists then simple append the user to registeration column of the event table

            // If user hass already registered
            const userAlreadyRegisteredForEvent = await db.select().from(registrationsTable).where(
                and(
                    eq(registrationsTable.eventId, events[0].id),
                    eq(registrationsTable.userId, userAlreadyExists[0].id)
                )
            )
            if (userAlreadyRegisteredForEvent.length !== 0) {
                throw new ApiError(400, "Already Registered for this Event")
            }

            const dataForRegisteration = {
                userId: userAlreadyExists[0].id,
                eventId: events[0].id
            }

            const newEventRegisteration = await db.insert(registrationsTable).values(dataForRegisteration).returning();

            // If user sucessfully registered then increment the value of total registerations by one
            if (newEventRegisteration.length !== 0) {
                await db.update(eventTable).set({ totalRegisterations: sql`${eventTable.totalRegisterations} + 1` }).where(
                    and(
                        eq(eventTable.id, events[0].id)
                    )
                )
            }

            res.status(201).json(new ApiResponse(201, newEventRegisteration, "Registered for the event"))

        } else {
            // If user does not already exists then create a new user then append the user to event table

            // Creating a new user
            const userData = {
                name,
                email
            }
            const newUser = await db.insert(usersTable).values(userData).returning();


            // SIMILAR TO WHEN THE USER ALREADY EXISTED
            const dataForRegisteration = {
                userId: newUser[0].id,
                eventId: events[0].id
            }

            const newEventRegisteration = await db.insert(registrationsTable).values(dataForRegisteration).returning();

            // If user sucessfully registered then increment the value of total registerations by one
            if (newEventRegisteration.length !== 0) {
                await db.update(eventTable).set({ totalRegisterations: sql`${eventTable.totalRegisterations} + 1` }).where(
                    and(
                        eq(eventTable.id, events[0].id)
                    )
                )
            }

            res.status(201).json(new ApiResponse(201, newEventRegisteration, "New User Created and Sucessfully Registered for the Event"))

        }

    } catch (err) {
        res.status(err?.statusCode || 500).json({ error: err });
    }
}
