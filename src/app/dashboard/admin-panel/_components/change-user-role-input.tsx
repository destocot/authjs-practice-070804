"use client";

import { changeUserRoleAction } from "@/actions/change-user-role-action";
import { users } from "@/drizzle/schema";
import { useTransition } from "react";

type VerifyEmailFormProps = {
  email: (typeof users.$inferSelect)["email"];
  currentRole: (typeof users.$inferSelect)["role"];
  isAdmin: boolean;
};

export const ChangeUserRoleInput = ({
  email,
  currentRole,
  isAdmin,
}: VerifyEmailFormProps) => {
  const [isPending, startTransition] = useTransition();

  const onChange = async (
    email: string,
    evt: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newRole = evt.target.value as (typeof users.$inferSelect)["role"];

    if (newRole === currentRole) return;

    startTransition(() => {
      changeUserRoleAction(email, newRole);
    });
  };

  return (
    <select
      disabled={isPending || isAdmin}
      defaultValue={currentRole}
      onChange={onChange.bind(null, email)}
      className="w-full rounded border border-gray-200 bg-white px-2 py-1 leading-tight focus:border-gray-500 focus:outline-none disabled:opacity-50"
    >
      <option value="user">USER</option>
      <option value="admin">ADMIN</option>
    </select>
  );
};

{
  /* <input
  type="checkbox"
  checked={!!emailVerified}
  className="scale-125 cursor-pointer"
  readOnly
  onClick={onClick.bind(null, email, !!emailVerified)}
/> */
}
