import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
  doublePrecision,
  timestamp,
} from "drizzle-orm/pg-core";

// User Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password"),
  phone_no: varchar("phone_no", { length: 20 }),
  account_type: integer("account_type").notNull(),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  reward_point: integer("reward_point").default(0),
});

// Listing Table
export const listings = pgTable("listings", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  created_by: text("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  received_by: text("received_by").references(() => users.id, {
    onDelete: "set null",
  }),
  category: integer("category").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  expire_at: timestamp("expire_at"),
  order_pickup_time: timestamp("order_pickup_time"),
  quantity: varchar("quantity", { length: 100 }),
  status: integer("status").notNull(),
  size: varchar("size", { length: 50 }),
  image_url: text("image_url"),
});
