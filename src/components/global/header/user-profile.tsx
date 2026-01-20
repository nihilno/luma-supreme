"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sessionButtons } from "@/lib/constants/navigations";
import { cn } from "@/lib/utils";
import { IconUserPentagon } from "@tabler/icons-react";
import Link from "next/link";

function UserProfile({ dropdown = false, name, email }: UserProfileProps) {
  return dropdown ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <IconUserPentagon className="size-5" /> Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" sideOffset={16}>
        <DropdownMenuLabel>{name ? name : "My Account"}</DropdownMenuLabel>
        <p className="px-2 pb-1.5 text-xs">{email ? email : ""}</p>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {sessionButtons.map(({ label, href, icon: Icon }) => (
            <DropdownMenuItem
              key={label}
              asChild
              className="cursor-pointer py-3"
            >
              <Link href={href}>
                <Icon className="size-5" /> <span>{label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className={cn(!dropdown && "flex w-full flex-col gap-2.5")}>
      {sessionButtons.map(({ label, href, icon: Icon }) => (
        <Button key={label} asChild>
          <Link href={href}>
            <Icon className="size-5" />
            {!dropdown && <span>{label}</span>}
          </Link>
        </Button>
      ))}
    </div>
  );
}

export default UserProfile;
