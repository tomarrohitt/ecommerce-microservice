import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/constants/format";
import { getCart } from "@/lib/services/cart";
import {
  ShoppingBag,
  ArrowRight,
  Package,
  Lock,
  TriangleAlert,
} from "lucide-react";
import { ClearCartButton } from "./_components/clear-cart-button";
import { EmptyCartState } from "./_components/empty-cart-state";
import { CartItemList } from "./_components/cart-item-list";

export default async function CartPage() {
  const cart = await getCart();

  if (cart.items.length === 0) {
    return <EmptyCartState />;
  }

  const hasOutOfStock = cart.items.some(
    (item) => item.product.stockQuantity === 0,
  );
  const hasExceedsStock = cart.items.some(
    (item) => item.quantity > item.product.stockQuantity,
  );
  const hasIssues = hasOutOfStock || hasExceedsStock;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div
        className="
    bg-linear-to-r from-neutral-50 via-neutral-50 to-neutral-50
    rounded-2xl p-8 mb-8 border-2 border-neutral-100 shadow-sm
    opacity-0 fade-in-manual
  "
      >
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="">
              <ShoppingBag className="w-12 h-12 text-neutral-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-neutral-600 mb-2 flex items-center gap-3">
                Shopping Cart
              </h1>
            </div>
          </div>
          <ClearCartButton />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CartItemList items={cart.items} />

        <div className="lg:col-span-1 delay-300">
          <Card className="sticky top-0 shadow-lg border-2 border-neutral-100  pt-0">
            <CardHeader className="bg-linear-to-r from-neutral-50 to-neutral-50  h-18 pt-6">
              <h2 className="text-xl font-bold text-neutral-600 flex items-center gap-2">
                <Package className="w-8 h-8 text-neutral-500" />
                Order Summary
              </h2>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-neutral-500">
                  <span>
                    Subtotal ({cart.totalItems}{" "}
                    {cart.totalItems === 1 ? "item" : "items"})
                  </span>
                  <span className="font-semibold">
                    ${formatPrice(cart.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Shipping</span>
                  <span className="text-neutral--500 font-semibold flex items-center gap-1">
                    <span className="text-lg">✓</span> FREE
                  </span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Tax</span>
                  <span className="font-semibold">
                    ${formatPrice(cart.tax)}
                  </span>
                </div>
                <div className="border-t-2 border-neutral-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-neutral-600">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-neutral-500">
                      ${formatPrice(cart.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {hasIssues && (
                <div className="mb-4 p-4 bg-neutral-50 border-l-4 border-neutral-500 rounded-lg animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-start gap-2">
                    <TriangleAlert />
                    <p className="text-sm text-neutral-700 font-medium">
                      Some items are out of stock or exceed available quantity.
                      Please update your cart before checkout.
                    </p>
                  </div>
                </div>
              )}

              <Link
                href="/checkout"
                className="w-full mb-3 group shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                <Button className="w-full bg-neutral-600/90 hover:bg-neutral-600">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="/products">
                <Button
                  variant="ghost"
                  className="w-full hover:bg-neutral-50 transition-colors flex items-center justify-center"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>

              <div className="mt-6 pt-6 border-t border-neutral-200 ">
                <p className="flex justify-center items-center gap-2 text-sm text-neutral-500 ">
                  <Lock />
                  Secure checkout guaranteed
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
