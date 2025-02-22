import React from "react";

type OrderStatus = "completed" | "in-process" | "canceled";

type Order = {
  id: number;
  image: string;
  name: string;
  category: string;
  orderTime: string;
  deliveryTime: string;
  status: OrderStatus;
};

const orders: Order[] = [
  {
    id: 1,
    image: "https://via.placeholder.com/100",
    name: "Tshirt",
    category: "Cloths",
    orderTime: "2025-02-22 10:00 AM",
    deliveryTime: "2025-02-23 5:00 PM",
    status: "completed",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/100",
    name: "Orchid Pot",
    category: "Plants",
    orderTime: "2025-02-21 3:00 PM",
    deliveryTime: "2025-02-24 2:00 PM",
    status: "in-process",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/100",
    name: "Lily Basket",
    category: "Flowers",
    orderTime: "2025-02-20 8:00 AM",
    deliveryTime: "Canceled",
    status: "canceled",
  },
];

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "completed":
      return "text-green-500";
    case "in-process":
      return "text-yellow-500";
    case "canceled":
      return "text-red-500";
  }
};

const Deliverables = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Deliverables</h1>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center gap-4 p-4 border rounded-lg shadow"
          >
            <img
              src={order.image}
              alt={order.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{order.name}</h2>
              <p className="text-gray-600">Category: {order.category}</p>
              <p className="text-gray-600">Order Time: {order.orderTime}</p>
              <p className="text-gray-600">Delivery Time: {order.deliveryTime}</p>
            </div>
            <span
              className={`px-4 py-2 rounded-full ${getStatusColor(
                order.status
              )}`}
            >
              {order.status.replace("-", " ").toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deliverables;
