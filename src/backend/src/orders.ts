import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { db } from "./db/index";
import { orders } from "./db/schema";
import type { NewOrder } from "./services/types";

// Create a new order (request for donation)
export const createOrder = async (c: Context) => {
  try {
    const body: NewOrder = await c.req.json();
    if (!body.listing_id || !body.user_id) {
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
    return c.json({ success: true, orders: allOrders });
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
    return c.json({ success: true, order });
  } catch (error) {
    return c.json({ success: false, error: error }, 500);
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
