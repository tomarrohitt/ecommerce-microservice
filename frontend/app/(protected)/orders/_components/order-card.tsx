import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { OrderStatusBadge } from "./order-status-badge";
import { OrderItemsList } from "./order-item-list";
import { OrderActions } from "./order-actions";
import { Order } from "@/types";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow pt-0">
      <CardHeader className="bg-neutral-50 border-b pt-3">
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <p className="text-sm text-neutral-500">Order ID</p>
            <p className="font-mono font-semibold text-neutral-600">
              {order.id.toUpperCase()}
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Date</p>
            <p className="font-medium text-neutral-600">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Total</p>
            <p className="text-lg font-semibold text-neutral-600">
              ${order.totalAmount}
            </p>
          </div>
          <p className="font-semibold text-neutral-600">
            {order.status.toUpperCase()}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <OrderItemsList orderItems={order.items} status={order.status} />
        <div className="bg-neutral-50 rounded-lg p-4 mb-4">
          <p className="text-sm font-semibold text-neutral-700 mb-2">
            Shipping Address:
          </p>
          <p className="text-sm text-neutral-500">
            {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.state}, {order.shippingAddress.country},{" "}
            {order.shippingAddress.zipCode}
          </p>
        </div>

        <OrderActions
          orderId={order.id}
          status={order.status}
          invoiceUrl={order.invoiceUrl}
        />
      </CardContent>
    </Card>
  );
}
