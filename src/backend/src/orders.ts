import { eq, inArray } from "drizzle-orm";
import type { Context } from "hono";
import { db } from "./db/index";
import { listings, orders, users } from "./db/schema";
import type { NewOrder } from "./services/types";

// Create a new order (request for donation)
export const createOrder = async (c: Context) => {
  try {
    const body: NewOrder = await c.req.json();
    if (!body.listing_id || !body.user_email) {
      return c.json({ success: false, error: "Missing required fields" }, 400);
    }
    const formattedBody = {
      ...body,
      requested_at: body.requested_at ? new Date(body.requested_at) : undefined,
      approved_at: body.approved_at ? new Date(body.approved_at) : undefined,
    };
    const [newOrder] = await db
      .insert(orders)
      .values(formattedBody)
      .returning();
    return c.json({ success: true, order: newOrder }, 201);
  } catch (error) {
    return c.json({ success: false, error: error }, 500);
  }
};

// Get all orders
export const getOrders = async (c: Context) => {
  try {
    const allOrders = await db.select().from(orders);
    return c.json(allOrders);
  } catch (error) {
    return c.json({ success: false, error: error }, 500);
  }
};

// Get order by ID
export const getOrderById = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    if (!order) {
      return c.json({ success: false, error: "Order not found" }, 404);
    }
    return c.json(order);
  } catch (error) {
    return c.json({ success: false, error: error }, 500);
  }
};

export const getOrdersByUserEmail = async (c: Context) => {
  try {
    const body = await c.req.json();
    const email = body.email;
    console.log("Email:", email);
    // Fetch user_id using the email
    const user = await db
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    console.log("User:", user);

    if (!user.length) {
      return c.json({ success: false, error: "User not found" }, 404);
    }

    const userId = user[0].id;
    console.log("User ID:", userId);

    // Fetch listings created by the user
    const userListings = await db
      .select({ id: listings.id })
      .from(listings)
      .where(eq(listings.created_by, userId));

    if (!userListings.length) {
      return c.json({ success: true, orders: [] });
    }

    const listingIds = userListings.map((listing) => listing.id);
    console.log("Listing IDs:", listingIds);

    // Fetch orders for the retrieved listings
    const ordersForListings = await db
      .select()
      .from(orders)
      .where(inArray(orders.listing_id, listingIds));

    console.log("Orders for listings:", ordersForListings);

    return c.json(ordersForListings);
  } catch (error) {
    console.error("Error fetching orders for user listings:", error);
    return c.json({ success: false, error }, 500);
  }
};

// Update order status
export const updateOrderStatus = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const body: { status: number; approved_at: string } = await c.req.json();
    if (!body.status) {
      return c.json({ success: false, error: "Missing required fields" }, 400);
    }

    const formattedBody = {
      ...body,
      approved_at: body.approved_at ? new Date(body.approved_at) : undefined,
    };

    const [updatedOrder] = await db
      .update(orders)
      .set(formattedBody)
      .where(eq(orders.id, id))
      .returning();

    if (!updatedOrder) {
      return c.json({ success: false, error: "Order not found" }, 404);
    }
    return c.json({ success: true, order: updatedOrder });
  } catch (error) {
    return c.json({ success: false, error: error }, 500);
  }
};

// Delete order
export const deleteOrder = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const deleted = await db
      .delete(orders)
      .where(eq(orders.id, id))
      .returning();
    if (!deleted.length) {
      return c.json({ success: false, error: "Order not found" }, 404);
    }
    return c.json({ success: true, message: "Order deleted" });
  } catch (error) {
    return c.json({ success: false, error: error }, 500);
  }
};
