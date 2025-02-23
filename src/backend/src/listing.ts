import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { db } from "./db/index";
import { listings, users } from "./db/schema";
import type { NewListing } from "./services/types";

// Create a new listing
export const createListing = async (c: Context) => {
  try {
    console.log("createListing");
    const body = await c.req.json<NewListing>();

    console.log("body", body);
    if (!body.title || !body.description || !body.created_by) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const formattedBody = {
      ...body,
      created_at: body.created_at ? new Date(body.created_at) : undefined,
      expire_at: body.expire_at ? new Date(body.expire_at) : null,
      order_pickup_time: body.order_pickup_time
        ? new Date(body.order_pickup_time)
        : null,
    };
    console.log("inserting");
    const a = await db.insert(listings).values(formattedBody).returning();

    console.log("returning");
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
    // if (!body.title && !body.description && !body.created_by) {
    //   return c.json({ error: "No fields to update" }, 400);
    // }

    // const formattedBody = {
    //   ...body,
    //   created_at: body.created_at ? new Date(body.created_at) : undefined,
    //   expire_at: body.expire_at ? new Date(body.expire_at) : null,
    //   order_pickup_time: body.order_pickup_time
    //     ? new Date(body.order_pickup_time)
    //     : null,
    // };

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

export const getListingByEmail = async (c: Context) => {
  try {
    const body = await c.req.json();
    const email = body.email;

    // Fetch user_id using the email
    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .then((rows) => rows[0]);

    if (!user) {
      return c.json({ success: false, error: "User not found" }, 404);
    }

    // Fetch listings for the retrieved user_id
    const user_listings = await db
      .select()
      .from(listings)
      .where(eq(listings.created_by, user.id));

    if (user_listings.length === 0) {
      return c.json(
        { success: false, error: "No listings found for this user" },
        404
      );
    }

    return c.json(user_listings, 200);
  } catch (error) {
    console.error("Error fetching listings:", error);
    return c.json(
      { success: false, error: "Internal Server Error", details: error },
      500
    );
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
