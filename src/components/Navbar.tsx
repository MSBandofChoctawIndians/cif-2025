"use client";

import { useState, useEffect } from "react";
import { MapPinned, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

const navItems = [
  { title: "Events", href: "/events" },
  { title: "Culture", href: "/culture" },
  { title: "Family Fun", href: "/family" },
  { title: "Stickball", href: "/stickball" },
  { title: "Pageant", href: "/pageant" },
  { title: "Competitions", href: "/competitions" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black bg-gradient-to-r from-stone-900 via-stone-700 to-stone-950 text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-4 text-xl font-bold">
            <img src="/navlogo.webp" alt="Logo" className="h-12 w-12" />
            <span className="hidden lg:flex">Choctaw Indian Fair</span>
          </a>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <img
                    src="/navlogo.webp"
                    alt="Logo"
                    className="mb-2 h-12 w-12"
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="mx-4 mt-6 flex flex-col gap-4">
                {navItems.map((item: NavItem) => {
                  const isActive = pathname === item.href;
                  return item.disabled ? (
                    <span
                      key={item.href}
                      className="pointer-events-none text-lg font-medium text-white/50 opacity-50"
                    >
                      {item.title}
                    </span>
                  ) : (
                    <a
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`text-lg font-medium transition-colors ${
                        isActive
                          ? "text-yellow-300"
                          : "hover:text-muted text-white"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </a>
                  );
                })}
                <div className="mt-4 flex flex-col gap-2">
                  {/* <Button variant="disabled" onClick={() => setOpen(false)}>
                    Fair Map
                  </Button> */}
                  <a
                    href="https://www.etix.com/ticket/p/65113985/75th-choctaw-indian-fair-pearl-river-choctaw-indian-fair"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                      Buy Tickets
                    </Button>
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item: NavItem) => {
                const isActive = pathname === item.href;
                return (
                  <NavigationMenuItem key={item.href}>
                    {item.disabled ? (
                      <Button variant="disabled">{item.title}</Button>
                    ) : (
                      <a
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <Button
                          variant={isActive ? "gray" : "ghost"}
                          className="cursor-pointer"
                        >
                          {item.title}
                        </Button>
                      </a>
                    )}
                  </NavigationMenuItem>
                );
              })}
              <NavigationMenuItem>
                <a href="/map">
                  <Button variant="ghost">
                    <MapPinned className="h-12 w-12" />
                  </Button>
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-2">
            <a
              href="https://www.etix.com/ticket/p/65113985/75th-choctaw-indian-fair-pearl-river-choctaw-indian-fair"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" className="cursor-pointer">
                Buy Tickets
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
