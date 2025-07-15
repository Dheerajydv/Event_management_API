import { Request, Response } from "express";
import { db } from "../../index";
import { eventTable, registrationsTable } from "../../db/schema.ts"
import { and, asc, desc, eq, gt } from "drizzle-orm";
import { ApiResponse } from "../../helpers/ApiResponse.ts"
import { ApiError } from "../../helpers/ApiError.ts"

export const createEvent = async (req: Request, res: Response) => {
    try {
        // Get the event title, date-time location and capacity from request
        const { title, dateTime, location, capacity } = req.body;
        if (!title || !dateTime || !location || !capacity) {
            throw new ApiError(400, "Provide relevenet data for event")
        }

        // Data verification
        // 1. Event with this title already exists
        const eventWIthTitleExists = await db.select().from(eventTable).where(
            and(
                eq(eventTable.title, title)
            )
        )
        // Should not be able to create a new event
        if (eventWIthTitleExists.length !== 0) {
            throw new ApiError(400, "Event Already Exists")
        }

        // Create the date and time into a valid format for drizzle to handle
        const date = new Date(dateTime)

        // Creating the event data to insert
        const eventData = {
            title,
            dateTime: date,
            location,
            capacity
        }

        // Inseting the date into the database
        const createdEvent = await db.insert(eventTable).values(eventData).returning();

        res.status(201).json(new ApiResponse(200, { eventId: createdEvent[0].id }, "Event Created Sucessfully"))

    } catch (err) {
        res.status(err?.statusCode || 500).json({ error: err });
    }
}

export const getEventData = async (req: Request, res: Response) => {
    try {
        const events = await db.select().from(eventTable);

        if (!events) {
            throw new ApiError(404, "Events Not Found")
        }

        res.status(200).json(new ApiResponse(200, { events }, "All events fetched"))

    } catch (err) {
        res.status(err?.statusCode || 500).json({ error: err });
    }
}

export const getEventStats = async (req: Request, res: Response) => {
    try {

        // Get the event id from params
        const { eventId } = req.params;
        if (!eventId) {
            throw new ApiError(400, "No Event ID provided")
        }

        // Selecting the event from database
        const eventData = await db.select().from(eventTable).where(
            and(
                eq(eventTable.id, eventId)
            )
        )
        if (eventData.length == 0) {
            throw new ApiError(404, "Event Details Not Found")
        }

        // Getting total registerations
        const registerationsTable = await db.select().from(registrationsTable).where(
            and(
                eq(registrationsTable.eventId, eventId)
            )
        )

        // Creating a response data to send to user
        const responseData = {
            TotalRegistrations: registerationsTable.length,
            RemainingCapacity: eventData[0].capacity - registerationsTable.length,
            TotalCapacity: eventData[0].capacity
        }

        res.status(200).json(new ApiResponse(200, responseData, "Event Stats Fetched"))

    } catch (err) {
        res.status(err?.statusCode || 500).json({ error: err });
    }
}


export const getUpcommingEvents = async (req: Request, res: Response) => {
    try {

        const currentDate = new Date(Date.now())

        const upcomingEvents = await db.select().from(eventTable).where(
            gt(eventTable.dateTime, currentDate)
        ).orderBy(
            asc(eventTable.dateTime),
            asc(eventTable.title)
        )
        if (!upcomingEvents) {
            throw new ApiError(404, "Upcomming Events Not Found")
        }

        const responseData = upcomingEvents.length == 0 ? { message: "No Upcomming Events" } : upcomingEvents;

        res.status(200).json(new ApiResponse(200, responseData, "All Upcomming Events"))


    } catch (err) {
        res.status(err?.statusCode || 500).json({ error: err });
    }
}