import { relations } from "drizzle-orm";
import { integer, pgTable, varchar, uuid, date, time, timestamp, serial, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    email: text("email").notNull()
});

export const eventTable = pgTable("events", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    location: text("location").notNull(),
    dateTime: timestamp("date-time").notNull(),
    capacity: integer("capacity").notNull().default(0),
    totalRegisterations: integer("total-registerations").notNull().default(0),
    createdAt: timestamp("created-at").notNull().defaultNow(),
    updatedAt: timestamp("updated-at").notNull().defaultNow().$onUpdate(() => new Date())
})

export const registrationsTable = pgTable("registrations", {
    userId: integer("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade', onUpdate: "cascade" }),
    eventId: integer("event_id")
        .notNull()
        .references(() => eventTable.id, { onDelete: 'cascade', onUpdate: "cascade" }),
})

export const userRelations = relations(usersTable, ({ many }) => ({
    registrations: many(registrationsTable),
}));

export const eventRelations = relations(eventTable, ({ many }) => ({
    registrations: many(registrationsTable),
}));


export const registrationRelations = relations(registrationsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [registrationsTable.userId],
        references: [usersTable.id],
    }),
    event: one(eventTable, {
        fields: [registrationsTable.eventId],
        references: [eventTable.id],
    }),
}));
