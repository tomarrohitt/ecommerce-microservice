import Link from "next/link";
import { OrderItem } from "@/types";
import Image from "next/image";
import { ReviewDrawer } from "./drawer";

interface OrderItemsListProps {
  orderItems: OrderItem[];
  status: string;
}

export function OrderItemsList({ orderItems, status }: OrderItemsListProps) {
  return (
    <>
      <div className="space-y-3 mb-4">
        {orderItems.map((item, i) => (
          <div
            key={item.productId}
            className="relative flex items-center gap-4 rounded-lg  transition-all pr-3"
          >
            <Link
              href={`/products/${item.productId}`}
              className="relative w-16 h-16 bg-linear-to-br from-neutral-400 to-neutral-500 rounded-lg flex items-center justify-center shrink-0"
            >
              {item.thumbnail ? (
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  className="object-cover rounded-lg"
                  sizes="64"
                  fill
                />
              ) : (
                <span className="text-white text-2xl">📦</span>
              )}
            </Link>

            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.productId}`}
                className="font-semibold text-gray-600 hover:text-neutral-500 transition-colors line-clamp-1"
              >
                {item.name}
              </Link>
              <p className="text-sm text-gray-500 mt-0.5">
                Quantity: {item.quantity} × ${item.price}
              </p>
            </div>

            {status === "DELIVERED" && <ReviewDrawer product={item} />}

            <div className="text-right shrink-0">
              <p className="font-semibold text-neutral-600">
                ${(item.quantity * Number(item.price)).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
