"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const SignoutButton = () => {
  const router = useRouter();

  const onClick = async () => {
    await signOut({ redirect: false });
    router.replace("/");
  };

  return (
    <Button variant="destructive" onClick={onClick}>
      Sign Out
    </Button>
  );
};
