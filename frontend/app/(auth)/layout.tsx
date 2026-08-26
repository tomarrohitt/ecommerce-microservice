import { LottieAnimation } from "@/components/lottie";
import Auth from "@/public/lottie/auth.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth - E-commerce",
  description: "Sign in or create an account",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh  flex items-center justify-center lg:justify-center relative overflow-hidden bg-neutral-600/90">
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center relative z-10">
        <LottieAnimation data={Auth} className="drop-shadow-2xl absolute" />
      </div>

      <div className="w-full max-w-md shrink-0 relative z-10 mr-10">
        {children}
      </div>
    </div>
  );
}
