import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { db } from "./db/index";
import { users } from "./db/schema";
import type { NewUser } from "./services/types";

// Create a new user
export const createUser = async (c: Context) => {
  try {
    const body = await c.req.json<NewUser>();

    // Validate required fields`
    if (!body.username || !body.email) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Insert user into DB
    await db.insert(users).values(body);

    return c.json({ message: "User created successfully" }, 201);
  } catch (error) {
    return c.json({ error: "Internal Server Error", details: error }, 500);
  }
};

// Get all users
export const getUsers = async (c: Context) => {
  try {
    const allUsers = await db.select().from(users);
    return c.json(allUsers, 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error", details: error }, 500);
  }
};

// Get a user by ID
export const getUserById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(id)));

    if (user.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(user[0], 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error", details: error }, 500);
  }
};

// Update a user by ID
export const updateUser = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json<Partial<NewUser>>();

    const updated = await db
      .update(users)
      .set(body)
      .where(eq(users.id, parseInt(id)));

    if (!updated.rowCount) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ message: "User updated successfully" }, 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error", details: error }, 500);
  }
};

// Delete a user by ID
export const deleteUser = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const deleted = await db.delete(users).where(eq(users.id, parseInt(id)));

    if (!deleted.rowCount) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ message: "User deleted successfully" }, 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error", details: error }, 500);
  }
};
