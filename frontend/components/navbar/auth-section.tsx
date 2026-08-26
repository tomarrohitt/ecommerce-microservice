import { CartCount } from "./cart-count";
import { UserDropdown } from "./user-dropdown";
import Link from "next/link";
import { AnimatedCart } from "./animated-cart";

import { NavLinks } from "./nav-links";
import { User } from "@/types";

export function AuthSection({ user }: { user: User | null }) {
  if (!user) {
    return <UnProtectedSection />;
  }

  return (
    <div className="flex justify-between items-center gap-6">
      <NavLinks />

      <div className="flex items-center gap-4 pl-6 border-l border-gray-200 ml-30">
        <UserDropdown user={user} />
        <AnimatedCart>
          <CartCount />
        </AnimatedCart>
      </div>
    </div>
  );
}

const UnProtectedSection = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/sign-in"
        className="text-sm font-medium text-gray-600 hover:text-neutral-600 transition-colors"
      >
        Sign In
      </Link>
      <Link href="/sign-up">
        <button className="relative px-5 py-2.5 rounded-full bg-neutral-600 text-white text-sm font-semibold shadow-lg shadow-neutral-500/30 hover:shadow-neutral-500/50 hover:bg-neutral-500 transition-all duration-300 active:shadow-none cursor-pointer">
          Sign Up
        </button>
      </Link>
    </div>
  );
};
