import Link from "next/link";
import { SignUpForm } from "./_components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="rounded-3xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Create account
        </h1>
        <p className="text-neutral-200 mt-1.5 text-sm">
          Join us and start shopping today
        </p>
      </div>

      <SignUpForm />

      <div className="flex items-center my-7">
        <div className="grow border-t border-white/20" />
        <span className="px-3 text-xs text-neutral-200/80 font-medium">
          Already a member?
        </span>
        <div className="grow border-t border-white/20" />
      </div>

      <div className="text-center">
        <Link
          href="/sign-in"
          className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors duration-200"
        >
          Sign in instead
        </Link>
      </div>
    </div>
  );
}
