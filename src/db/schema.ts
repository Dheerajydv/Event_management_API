import { relations } from "drizzle-orm";
import { integer, pgTable, varchar, uuid, date, time, timestamp, serial, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: serial().primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    email: text("email").notNull()
});

export const eventTable = pgTable("events", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    location: text("location").notNull(),
    dateTime: timestamp("date-time").notNull(),
    capacity: integer("capacity").notNull().default(0),
    registerations: integer("registerations").references(
        () => usersTable.id, { onDelete: 'cascade', onUpdate: "cascade" }
    ),
    createdAt: timestamp("created-at").notNull().defaultNow(),
    updatedAt: timestamp("updated-at").notNull().defaultNow().$onUpdate(() => new Date())
})


export const userRelations = relations(usersTable, ({ many }) => ({
    registrations: many(eventTable),
}));