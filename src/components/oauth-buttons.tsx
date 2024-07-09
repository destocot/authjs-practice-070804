"use client";

import {
  SiGoogle,
  SiGoogleHex,
  SiGithub,
  SiGithubHex,
} from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { oauthSigninUser } from "@/actions/oauth-signin-action";

type OAuthButtonsProps = { page: "signup" | "signin" };

export const OAuthButtons = ({ page }: OAuthButtonsProps) => {
  const text = page === "signup" ? "Sign up" : "Sign in";

  const onClick = async (provider: "google" | "github") => {
    await oauthSigninUser(provider);
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
    </div>
  );
};
