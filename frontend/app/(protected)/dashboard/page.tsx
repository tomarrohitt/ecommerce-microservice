import { getUserFromSession } from "@/actions/session";
import { getTotalOrdersCount } from "@/lib/services/orders";
import { getCartCount } from "@/lib/services/cart";
import { getAddressCount } from "@/lib/services/addresses";
import Link from "next/link";
import {
  List,
  MapPin,
  Package,
  ShoppingBasket,
  ShoppingCart,
  User,
} from "lucide-react";

export default async function DashboardPage() {
  const [user, cartCount, addressCount, ordersCount] = await Promise.all([
    getUserFromSession(),
    getCartCount(),
    getAddressCount(),
    getTotalOrdersCount(),
  ]);

  const stats = [
    {
      title: "Total Orders",
      value: ordersCount.total,
      icon: Package,
      href: "/orders",
    },
    {
      title: "Cart Items",
      value: cartCount.data.count,
      icon: ShoppingCart,
      href: "/cart",
    },
    {
      title: "Wishlist",
      value: 0,
      icon: List,
      href: "/wishlist",
    },
    {
      title: "Addresses",
      value: addressCount.count,
      icon: MapPin,
      href: "/addresses",
    },
  ];

  const options = [
    {
      icon: ShoppingBasket,
      title: "Browse Products",
      description: "Discover items",
      href: "/products",
    },

    {
      icon: User,
      title: "Profile",
      description: "Manage account",
      href: "/profile",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-neutral-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-neutral-100 opacity-90">
          Here&apos;s what&apos;s happening with your account today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ href, icon: Icon, title, value }) => (
          <div key={title}>
            <Link href={href} className="block h-full group">
              <div className="bg-white rounded-xl shadow-md p-4 h-full border border-transparent transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 bg-gray-50 ">
                    <Icon />
                  </div>
                  <div className="text-3xl font-bold text-gray-600">
                    {value}
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-500">{title}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className={`text-xl font-bold text-gray-600 mb-6 delay-300`}>
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map(({ description, href, icon: Icon, title }) => {
            return (
              <Link key={title} href={href} className="group">
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-white shadow-md  cursor-pointer hover:shadow-lg transition-all duration-300 ">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg shrink-0 text-xl transition-transform duration-300 group-hover:scale-110">
                    <Icon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-600 truncate">
                      {title}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {description}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className={`bg-white rounded-xl shadow-md p-6 delay-700`}>
        <h2 className="text-xl font-bold text-gray-600 mb-6">
          Account Information
        </h2>

        <div className="space-y-0">
          {[
            { label: "Email", value: user?.email },
            { label: "Name", value: user?.name },
            { label: "Role", value: user?.role },
            {
              label: "Status",
              value: user?.emailVerified ? "Verified" : "Unverified",
            },
            {
              label: "Member Since",
              value: user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : "N/A",
            },
          ].map((row, i) => (
            <div
              key={row.label}
              className={`flex justify-between items-center py-3 transition-colors hover:bg-gray-50/50 px-2 rounded-md ${
                i !== 4 ? "border-b border-gray-100" : ""
              }`}
            >
              <span className="text-sm font-medium text-gray-500">
                {row.label}
              </span>
              <span className="text-sm font-semibold text-gray-600">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
