"use client";

import { toggleEmailVerifiedAction } from "@/actions/toggle-email-verified-action";
import { users } from "@/drizzle/schema";

type VerifyEmailFormProps = {
  email: (typeof users.$inferSelect)["email"];
  emailVerified: (typeof users.$inferSelect)["emailVerified"];
};

export const VerifyEmailForm = ({
  email,
  emailVerified,
}: VerifyEmailFormProps) => {
  const onClick = async (email: string, isCurrentlyVerified: boolean) => {
    await toggleEmailVerifiedAction(email, isCurrentlyVerified);
  };

  return (
    <input
      type="checkbox"
      checked={!!emailVerified}
      readOnly
      onClick={onClick.bind(null, email, !!emailVerified)}
    />
  );
};
