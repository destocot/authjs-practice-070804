"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const SignoutButton = () => {
  const onClick = async () => {
    try {
      await signOut({ redirect: false });
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button variant="destructive" size="sm" onClick={onClick}>
      Sign Out
    </Button>
  );
};
