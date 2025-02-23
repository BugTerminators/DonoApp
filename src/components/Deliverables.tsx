"use client";
import { fetchDeliverables } from "@/services/apis/orders";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type OrderStatus = 0 | 1 | 2;

const OrderStatusMap: Record<OrderStatus, string> = {
  0: "COMPLETED",
  1: "IN-PROCESS",
  2: "CANCELED",
};

type Order = {
  id: number;
  image_url: string;
  title: string;
  description: string;
  category: number;
  orderTime: string;
  size: string;
  deliveryTime: string;
  status: OrderStatus;
};

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 0:
      return "text-green-500";
    case 1:
      return "text-yellow-500";
    case 2:
      return "text-red-500";
  }
};

const Deliverables = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    const fetchListings = async () => {
      if (user && user.primaryEmailAddress) {
        const newListings = await fetchDeliverables(user.primaryEmailAddress.emailAddress);
        console.log("New Listings:", newListings);
        setOrders(newListings);
      };
      setLoading(false);
    }

    fetchListings();
  }, [user]);

  return (
    <div className="p-6">
      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">No deliverables found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between gap-4 p-4 border rounded-lg shadow"
            >
              <Image
                src={order.image_url}
                width={500}
                height={500}
                alt={order.title || "Item"}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex flex-col md:flex-row">
                <div>
                  <h2 className="text-lg font-semibold">{order.title}</h2>
                  <p className="text-gray-600">Category: {order.category}</p>
                  <p className="text-gray-600">Order Time: {order.orderTime}</p>
                  <p className="text-gray-600">Delivery Time: {order.deliveryTime}</p>
                </div>
                <div className={`py-2 rounded-full flex w-full justify-start md:justify-end ${getStatusColor(order.status)}`}>
                  {OrderStatusMap[order.status]}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Deliverables;
