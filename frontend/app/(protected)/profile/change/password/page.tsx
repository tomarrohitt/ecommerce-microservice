import { ChangePasswordForm } from "./change-password-form";
import { LockKeyhole } from "lucide-react";

export default function ChangePasswordPage() {
  return (
    <div className="space-y-8">
      <div className={`space-y-3 delay-150`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-linear-to-br from-neutral-600 to-neutral-500 rounded-2xl shadow-lg shadow-neutral-600/30">
            <LockKeyhole className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-600 tracking-tight">
              Change Password
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">
              Keep your account secure with a strong password
            </p>
          </div>
        </div>
      </div>
      <ChangePasswordForm />
    </div>
  );
}
