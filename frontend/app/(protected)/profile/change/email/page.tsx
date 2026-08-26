import { Mail, Verified } from "lucide-react";
import { ChangeEmailForm } from "./change-email-form";

export default function ChangeEmailPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className={`flex items-center gap-3 mb-4 delay-100`}>
          <div className="p-3 bg-linear-to-br from-neutral-600 to-neutral-500 rounded-2xl shadow-lg shadow-neutral-600/30">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-600 tracking-tight">
              Change Email Address
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">
              Update the email associated with your account
            </p>
          </div>
        </div>

        <div
          className={`bg-neutral--50 rounded-lg px-4 py-3 border border-neutral--200 delay-150`}
        >
          <div className="flex items-center gap-2 text-sm">
            <Verified className="w-4 h-4 text-neutral--600" />
            <span className="text-neutral--600 font-medium">
              Current email is verified
            </span>
          </div>
        </div>
      </div>

      <ChangeEmailForm />
    </div>
  );
}
