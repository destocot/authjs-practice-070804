import Link from "next/link";
import { NavbarLinks } from "./navbar-links";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="h-14 border-b">
      <div className="container flex h-full items-center justify-between">
        <h3 className="text-xl font-semibold tracking-tight">
          <Link href="/">Auth.js V5 Tutorial</Link>
        </h3>

        <ul id="navbar-links" className="flex items-center gap-x-4">
          <li>
            <Button size="icon" className="size-9" asChild>
              <Link href="/">
                <HomeIcon />
              </Link>
            </Button>
          </li>
          <NavbarLinks />
        </ul>
      </div>
    </nav>
  );
};
