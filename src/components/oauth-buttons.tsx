"use client";

import {
  SiGoogle,
  SiGoogleHex,
  SiGithub,
  SiGithubHex,
} from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { oauthSigninUser } from "@/actions/oauth-signin-action";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type OAuthButtonsProps = { page: "signup" | "signin" };

export const OAuthButtons = ({ page }: OAuthButtonsProps) => {
  const [errMssg, setErrMssg] = useState("");

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (!error) return;

    if (error === "OAuthAccountNotLinked") {
      setErrMssg("This account is already in use. Please sign in.");
    } else {
      setErrMssg("An error occurred. Please try again.");
    }
  }, [error]);

  const text = page === "signup" ? "Sign up" : "Sign in";

  const onClick = async (provider: "google" | "github") => {
    setErrMssg("");

    try {
      await oauthSigninUser(provider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-[400px]">
      <Button
        variant="secondary"
        className="w-full"
        onClick={onClick.bind(null, "google")}
      >
        <SiGoogle color={SiGoogleHex} className="mr-2" />
        {text} with Google
      </Button>

      <Button
        variant="secondary"
        className="mt-2 w-full"
        onClick={onClick.bind(null, "github")}
      >
        <SiGithub color={SiGithubHex} className="mr-2" />
        {text} with Github
      </Button>

      {errMssg && (
        <p className="mt-2 text-sm font-medium text-destructive">{errMssg}</p>
      )}
    </div>
  );
};

export const OAuthButtonsSkeleton = () => {
  return (
    <div className="max-w-[400px]">
      <Button variant="secondary" className="w-full" disabled>
        <SiGoogle color={SiGoogleHex} className="mr-2" />
        Sign up with Google
      </Button>

      <Button variant="secondary" className="mt-2 w-full" disabled>
        <SiGithub color={SiGithubHex} className="mr-2" />
        Sign up with Github
      </Button>
    </div>
  );
};
