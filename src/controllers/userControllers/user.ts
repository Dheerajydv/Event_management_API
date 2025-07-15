import { Request, Response } from "express"

export const registerForEvent = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        // Check if the user already exists
        // If user already exists then simple append the user to registeration column of the event table
        // If user does not already exists then create a new user then append the user to event table

    } catch (err) {
        res.status(err?.statusCode || 500).json({ error: err });
    }
}