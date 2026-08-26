import Link from "next/link";
import { SignInForm } from "./_components/sign-in-form";
import { Suspense } from "react";
import Loading from "./_components/loading";

export default function SignInPage() {
  return (
    <div className="rounded-3xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Welcome back
        </h1>
        <p className="text-neutral-200 mt-1.5 text-sm">
          Sign in to continue shopping
        </p>
      </div>

      <Suspense fallback={<Loading />}>
        <SignInForm />
      </Suspense>

      <div className="flex items-center my-7">
        <div className="grow border-t border-white/20" />
        <span className="px-3 text-xs text-neutral-200/80 font-medium">
          New here?
        </span>
        <div className="grow border-t border-white/20" />
      </div>

      <div className="text-center">
        <Link
          href="/sign-up"
          className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors duration-200"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
