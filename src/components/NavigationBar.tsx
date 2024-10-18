"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
import LanguageSwitcher from "./LangueSwitcher";

export function NavigationMenuDemo() {
  const { theme } = useTheme();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <div className="p-4 flex items-center gap-2">
            <span className="mr-4 align-middle">
              Current Theme: <CodeText>{theme}</CodeText>
            </span>
            <ModeToggle />
          </div>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <LanguageSwitcher />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const CodeText = (props: React.ComponentProps<"span">) => {
  return (
    <span
      {...props}
      className={cn(
        props.className,
        "bg-muted text-muted-foreground rounded font-mono text-sm p-1"
      )}
    />
  );
};
