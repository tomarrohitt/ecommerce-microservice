"use client";

import { useActionState } from "react";

import { register } from "@/actions/auth";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2, AlertCircle } from "lucide-react";

const initialState = {
  success: false,
  message: "",
  errors: {
    name: "",
    email: "",
    password: "",
  },
  inputs: {
    name: "",
    email: "",
    password: "",
  },
};

export const SignUpForm = () => {
  const [state, action, pending] = useActionState(register, initialState);

  return (
    <form action={action} className="space-y-5">
      {state.message && (
        <div
          className={`flex items-start gap-3 p-3 rounded-md text-sm border ${
            state.success ? "" : "bg-red-400/90 text-white"
          }`}
        >
          {!state.success && (
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      <Field className="gap-0">
        <FieldLabel
          className="mb-1.5 text-sm font-medium text-neutral-100"
          htmlFor="name"
        >
          Full name
        </FieldLabel>
        <Input
          id="name"
          name="name"
          type="text"
          disabled={pending}
          defaultValue={state.inputs.name}
          placeholder="John Doe"
          className="bg-white/5 border-0 text-white placeholder:text-white rounded-md"
        />
        <FieldError className="mt-1.5 text-sm text-rose-300/80">
          {state.errors.name}
        </FieldError>
      </Field>

      <Field className="gap-0">
        <FieldLabel
          className="mb-1.5 text-sm font-medium text-neutral-100"
          htmlFor="email"
        >
          Email address
        </FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          disabled={pending}
          defaultValue={state.inputs.email}
          placeholder="you@example.com"
          className="bg-white/5 border-0 text-white placeholder:text-white rounded-md"
        />
        <FieldError className="mt-1.5 text-sm text-rose-300/80">
          {state.errors.email}
        </FieldError>
      </Field>

      <Field className="gap-0">
        <FieldLabel
          className="mb-1.5 text-sm font-medium text-neutral-100"
          htmlFor="password"
        >
          Password
        </FieldLabel>
        <Input
          id="password"
          name="password"
          type="password"
          disabled={pending}
          defaultValue={state.inputs.password}
          placeholder="••••••••••••"
          className="bg-white/5 border-0 text-white placeholder:text-white rounded-md"
        />
        <FieldError className="mt-1.5 text-sm text-rose-300/80">
          {state.errors.password}
        </FieldError>
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-white/80 text-neutral-700 font-semibold py-2 px-4 rounded-md transition-all duration-200 hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center mt-2 shadow-lg cursor-pointer"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" />
            Creating account…
          </>
        ) : (
          "Create account"
        )}
      </button>
    </form>
  );
};
