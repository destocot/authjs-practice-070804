"use client";

import { signoutUser } from "@/actions/signout-action";
import { Button } from "@/components/ui/button";

export const SignoutButton = () => {
  const onClick = async () => {
    await signoutUser();
    window.location.href = "/";
  };

  return (
    <>
      <Button variant="destructive" onClick={onClick}>
        Sign Out
      </Button>
    </>
  );
};
