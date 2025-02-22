import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { db } from "./db/index";
import { listings } from "./db/schema";
import type { NewListing } from "./services/types";

// Create a new listing
export const createListing = async (c: Context) => {
  try {
    const body = await c.req.json<NewListing>();

    if (!body.title || !body.description || !body.created_by) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    await db.insert(listings).values(body);

    return c.json({ message: "Listing created successfully" }, 201);
  } catch (error) {
    return c.json({ error: "Internal Server Error", details: error }, 500);
  }
};

// Get all listings
export const getListings = async (c: Context) => {
  try {
    const allListings = await db.select().from(listings);
    return c.json(allListings, 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error", details: error }, 500);
  }
};

// Get a listing by ID
export const getListingById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const listing = await db
      .select()
      .from(listings)
      .where(eq(listings.id, parseInt(id)));

    if (listing.length === 0) {
      return c.json({ error: "Listing not found" }, 404);
    }

    return c.json(listing[0], 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error", details: error }, 500);
  }
};

// Update a listing by ID
export const updateListing = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json<Partial<NewListing>>();

    const updated = await db
      .update(listings)
      .set(body)
      .where(eq(listings.id, parseInt(id)));

    if (!updated.rowCount) {
      return c.json({ error: "Listing not found" }, 404);
    }

    return c.json({ message: "Listing updated successfully" }, 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error", details: error }, 500);
  }
};

// Delete a listing by ID
export const deleteListing = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const deleted = await db
      .delete(listings)
      .where(eq(listings.id, parseInt(id)));

    if (!deleted.rowCount) {
      return c.json({ error: "Listing not found" }, 404);
    }

    return c.json({ message: "Listing deleted successfully" }, 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error", details: error }, 500);
  }
};
