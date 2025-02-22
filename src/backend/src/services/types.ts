import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { users, listings, orders } from "../db/schema"; // Adjust the path if needed

// Type for a User (Selecting from DB)
export type User = InferSelectModel<typeof users>;

// Type for inserting a new User
export type NewUser = InferInsertModel<typeof users>;

// Type for a Listing (Selecting from DB)
export type Listing = InferSelectModel<typeof listings>;

// Type for inserting a new Listing
export type NewListing = InferInsertModel<typeof listings>;

// Type for an Order (Selecting from DB)
export type Order = InferSelectModel<typeof orders>;

// Type for inserting a new Order
export type NewOrder = InferInsertModel<typeof orders>;
