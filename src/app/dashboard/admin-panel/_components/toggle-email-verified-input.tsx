"use client";

import { toggleEmailVerifiedAction } from "@/actions/toggle-email-verified-action";
import { users } from "@/drizzle/schema";
import { useTransition } from "react";

type VerifyEmailFormProps = {
  email: (typeof users.$inferSelect)["email"];
  emailVerified: (typeof users.$inferSelect)["emailVerified"];
  isAdmin: boolean;
};

export const ToggleEmailVerifiedInput = ({
  email,
  emailVerified,
  isAdmin,
}: VerifyEmailFormProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = async (email: string, isCurrentlyVerified: boolean) => {
    startTransition(() => {
      toggleEmailVerifiedAction(email, isCurrentlyVerified);
    });
  };

  return (
    <div className="flex items-center justify-center">
      <input
        disabled={isPending || isAdmin}
        type="checkbox"
        checked={!!emailVerified}
        className="scale-150 enabled:cursor-pointer disabled:opacity-50"
        readOnly
        onClick={onClick.bind(null, email, !!emailVerified)}
      />
    </div>
  );
};
