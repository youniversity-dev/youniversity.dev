"use client";

import * as React from "react";
import { 
  IconBook2,
  IconLibrary,
  IconSettings,
  IconUser,
  IconLogout,
  IconPalette,
  IconBell,
  IconChevronDown
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface TextbookHeaderProps {
  currentTextbookTitle?: string;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  onGalleryOpen?: () => void;
  onProfileClick?: () => void;
  onPreferencesClick?: () => void;
  onLogout?: () => void;
}

export function TextbookHeader({
  currentTextbookTitle = "Select a Textbook",
  userName = "Student",
  userEmail = "student@example.com",
  userAvatar,
  onGalleryOpen,
  onProfileClick,
  onPreferencesClick,
  onLogout,
}: TextbookHeaderProps) {
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3"
          onClick={onGalleryOpen}
        >
          <IconLibrary className="h-4 w-4" />
          <span className="font-medium">Library</span>
          <IconChevronDown className="h-4 w-4 opacity-50" />
        </Button>

        <div className="hidden items-center gap-2 px-2 sm:flex">
          <IconBook2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Current:</span>
          <span className="font-medium">{currentTextbookTitle}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <IconBell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center">
            <Badge variant="destructive" className="h-4 w-4 rounded-full p-0 text-[10px]">
              3
            </Badge>
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start text-sm lg:flex">
                <span className="font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground">{userEmail}</span>
              </div>
              <IconChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onProfileClick}>
              <IconUser className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onPreferencesClick}>
              <IconSettings className="mr-2 h-4 w-4" />
              <span>Settings & Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPalette className="mr-2 h-4 w-4" />
              <span>Theme</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-destructive">
              <IconLogout className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}