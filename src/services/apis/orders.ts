export async function fetchOrders(email: string) {
  console.log("Fetching orders for email:", email);
  const res = await fetch(`./api/orders/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function createOrder(orderData: {
  user_email: string;
  listing_id: number;
  status: number;
  requested_at: string;
  approved_at: string | null;
}) {
  try {
    console.log("Creating order:", orderData);
    const response = await fetch("./api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
}

export async function fetchDeliverables(email: string) {
  console.log("Fetching orders for email:", email);
  const res = await fetch(`./api/orders/deliverables/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });

  const data = await res.json();

  if (data.success) {
    const result = data.orders.map((order: any) => ({
      id: order.id,
      image: order.listing?.image || "/images/placeholder.png",
      name: order.listing?.title || "Unknown Item",
      category: order.listing?.category || "Misc",
      orderTime: new Date(order.requested_at).toLocaleString(),
      deliveryTime:
        order.status === "CANCELED"
          ? "Canceled"
          : new Date(order.delivered_at).toLocaleString(),
      status: order.status,
    }));
    console.log(result);
    return result;
  }
  return [];
}
