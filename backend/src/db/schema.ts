import { pgTable, pgEnum, uuid, text, date, integer, boolean, time, smallint, timestamp, foreignKey, primaryKey, unique, check } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const tripStatus = pgEnum("trip_status", ["idea", "planning", "booked", "ongoing", "done", "cancelled"])
export const currency = pgEnum("currency", ["RUB", "USD", "EUR"])
export const activityType = pgEnum("activity_type", ["sight", "food", "transport", "hotel", "shopping", "other"])
export const packingCategories = ['clothes', 'docs', 'tech', 'hygiene', 'other'] as const;

export const activities = pgTable("activities", {
	id: uuid().default(sql`uuidv7()`).primaryKey(),
	tripId: uuid("trip_id").notNull(),
	dayId: uuid("day_id"),
	order: integer().notNull(),
	title: text().notNull(),
	type: text().notNull(),
	address: text(),
	url: text(),
	startTime: time("start_time"),
	endTime: time("end_time"),
	costEstimate: integer("cost_estimate"),
	bookingStatus: text("booking_status"),
	note: text(),
}, (table) => [
	foreignKey({
		columns: [table.dayId, table.tripId],
		foreignColumns: [days.id, days.tripId],
		name: "activities_day_id_trip_id_fkey"
	}).onDelete("set null"),
	foreignKey({
		columns: [table.tripId],
		foreignColumns: [trips.id],
		name: "activities_trip_id_fkey"
	}).onDelete("cascade"),
	unique("activities_id_trip_id_key").on(table.id, table.tripId),check("activities_booking_status_check", sql`(booking_status = ANY (ARRAY['todo'::text, 'booked'::text]))`),check("activities_check", sql`(start_time <= end_time)`),check("activities_cost_estimate_check", sql`(cost_estimate >= 0)`),check("activities_order_check", sql`("order" >= 0)`),check("activities_type_check", sql`(type = ANY (ARRAY['sight'::text, 'food'::text, 'transport'::text, 'hotel'::text, 'shopping'::text, 'other'::text]))`),]);

export const days = pgTable("days", {
	id: uuid().default(sql`uuidv7()`).primaryKey(),
	tripId: uuid("trip_id").notNull(),
	date: date().notNull(),
	title: text(),
}, (table) => [
	foreignKey({
		columns: [table.tripId],
		foreignColumns: [trips.id],
		name: "days_trip_id_fkey"
	}).onDelete("cascade"),
	unique("days_id_trip_id_key").on(table.id, table.tripId),	unique("days_trip_id_date_key").on(table.tripId, table.date),]);

export const expenses = pgTable("expenses", {
	id: uuid().default(sql`uuidv7()`).primaryKey(),
	tripId: uuid("trip_id").notNull(),
	activityId: uuid("activity_id"),
	category: text().notNull(),
	amount: integer().notNull(),
	currency: text().notNull(),
	date: date().notNull(),
	note: text(),
}, (table) => [
	foreignKey({
		columns: [table.activityId, table.tripId],
		foreignColumns: [activities.id, activities.tripId],
		name: "expenses_activity_id_trip_id_fkey"
	}).onDelete("set null"),
	foreignKey({
		columns: [table.tripId],
		foreignColumns: [trips.id],
		name: "expenses_trip_id_fkey"
	}).onDelete("cascade"),
check("expenses_amount_check", sql`(amount > 0)`),check("expenses_category_check", sql`(category = ANY (ARRAY['transport'::text, 'hotel'::text, 'food'::text, 'tickets'::text, 'shopping'::text, 'other'::text]))`),check("expenses_currency_check", sql`(currency = ANY (ARRAY['RUB'::text, 'USD'::text, 'EUR'::text]))`),]);

export const packingItems = pgTable("packing_items", {
	id: uuid().default(sql`uuidv7()`).primaryKey(),
	tripId: uuid("trip_id").notNull(),
	label: text().notNull(),
	qty: integer().default(1).notNull(),
	packed: boolean().default(false).notNull(),
	category: text({ enum: packingCategories }).default("other").notNull(),
}, (table) => [
	foreignKey({
		columns: [table.tripId],
		foreignColumns: [trips.id],
		name: "packing_items_trip_id_fkey"
	}).onDelete("cascade"),
check("packing_items_category_check", sql`(category = ANY (ARRAY['clothes'::text, 'docs'::text, 'tech'::text, 'hygiene'::text, 'other'::text]))`),check("packing_items_qty_check", sql`(qty > 0)`),]);

export const trips = pgTable("trips", {
	id: uuid().default(sql`uuidv7()`).primaryKey(),
	title: text().notNull(),
	destinations: text().array().notNull(),
	status: tripStatus().default("idea").notNull(),
	startDate: date("start_date"),
	endDate: date("end_date"),
	budget: integer(),
	currency: currency().notNull(),
	travellersCount: smallint("travellers_count").default(1).notNull(),
	coverNote: text("cover_note"),
	emoji: text().notNull(),
	color: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
check("check_trip_dates", sql`((status = 'idea'::trip_status) OR ((status <> 'idea'::trip_status) AND (start_date IS NOT NULL) AND (end_date IS NOT NULL)))`),check("trips_budget_check", sql`(budget >= 0)`),check("trips_check", sql`(start_date <= end_date)`),check("trips_travellers_count_check", sql`(travellers_count > 0)`),]);
