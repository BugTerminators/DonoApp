import {
  createListing,
  deleteListing,
  getListingById,
  getListings,
  updateListing,
} from "@/backend/src/listing";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "@/backend/src/user";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// Dynamic route for fetching product details
// app.get("product/all", (c) => {
//   // connect DB
//   // get the data fropm DB
//   // return the data
//   return c.json({
//     products: [
//       {
//         productId: 1,
//         productName: `Product Name for ID 1`,
//       },
//       {
//         productId: 2,
//         productName: `Product Name for ID 2`,
//       },
//       {
//         productId: 3,
//         productName: `Product Name for ID 3`,
//       },
//     ],
//   });
// });

// app.get("product/create", (c) => {
//   // connect DB
//   // create a new product
//   // return the data
//   return c.json({
//     productId: 4,
//     productName: `Product Name for ID 4`,
//     messege: "product created successfully",
//   });
// });

// app.get("product/:id", (c) => {
//   const id = c.req.param("id"); // get the id from the URL
//   // connect DB
//   // get the data from DB
//   // return the data

//   return c.json({
//     productId: id,
//     productName: `Product Name for ID ${id}`,
//   });
// });

// app.get("user/:id", (c) => {
//   const id = c.req.param("id");
//   return c.json({
//     userId: id,
//     username: `Username for ID ${id}`,
//   });
// });

// User Routes
app.post("/users", createUser);
app.get("/users", getUsers);
app.get("/users/:id", getUserById);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

// Listing Routes
app.post("/listings", createListing);
app.get("/listings", getListings);
app.get("/listings/:id", getListingById);
app.put("/listings/:id", updateListing);
app.delete("/listings/:id", deleteListing);

export const GET = handle(app);
export const POST = handle(app);
