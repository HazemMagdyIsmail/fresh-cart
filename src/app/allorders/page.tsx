
"use server";

import { getUserOrder } from "@/CheckoutActions/getUserOrders";
import Image from "next/image";

interface Order {
  _id: string;
  isPaid: boolean;
  paymentMethodType: string;
  totalOrderPrice: number;
  cartItems: {
    _id: string;
    count: number;
    price: number;
    product: {
      title: string;
      imageCover: string;
    };
  }[];
  createdAt: string;
}



export default async function OrdersPage() {
  let orders = await getUserOrder();
orders = orders.reverse();
  if (orders.length === 0) return <p className="text-center mt-10">No orders found.</p>;

  return (<div className="max-w-6xl mx-auto p-6 w-[80%]">
  <h1 className="text-3xl font-bold mb-8 pb-4 text-center">My Orders</h1> {/* removed border-b */}

  <div className="grid gap-6">
    {orders.map((order: Order) => (
      <div
        key={order._id}
        className="border rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <div>
            <span className="text-gray-700 font-medium">{order.paymentMethodType.toUpperCase()}</span>
            <span className="font-bold text-lg ml-4">{order.totalOrderPrice}EGP</span>
          </div>
          <span
            className={`px-3 py-1 rounded-full font-semibold text-sm ${
              order.isPaid ? "bg-green-600 text-white" : "bg-red-600 text-white"
            }`}
          >
            {order.isPaid ? "Paid" : "Not Paid"}
          </span>
        </div>

        <div className="divide-y divide-gray-200">
          {order.cartItems.map((item) => (
            <div key={item._id} className="flex items-center gap-4 py-4 hover:bg-gray-50 transition-colors rounded-lg">
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                width={100}
                height={100}
                className="rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-lg line-clamp-3">{item.product.title}</p>
                <p className="text-gray-600">Quantity: {item.count}</p>
                <p className="text-gray-800 font-medium">Price: {item.price} EGP</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Ordered on: {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>
    ))}
  </div>
</div>
)

}
