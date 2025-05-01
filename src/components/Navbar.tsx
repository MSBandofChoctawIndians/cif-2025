"use client";

import { useState } from "react";
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

const navItems = [
  { title: "Events", href: "/astro-app/events" },
  { title: "Culture", href: "/astro-app/culture" },
  { title: "Family Fun", href: "/astro-app/family" },
  { title: "Stickball", href: "/astro-app/stickball" },
  { title: "Pageant", href: "/astro-app/pageant" },
  { title: "Competitions", href: "/astro-app/competitions" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black bg-gradient-to-r from-stone-900 via-stone-700 to-stone-950 text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <a
            href="/astro-app/"
            className="flex items-center gap-4 text-xl font-bold"
          >
            <img
              src="/astro-app/navlogo.webp"
              alt="Logo"
              className="h-12 w-12"
            />
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
                    src="/astro-app/navlogo.webp"
                    alt="Logo"
                    className="mb-2 h-12 w-12"
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="mx-4 mt-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    // className="hover:text-muted text-lg font-medium text-white transition-colors"
                    className="pointer-events-none text-lg font-medium text-white/50 opacity-50 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </a>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <Button variant="disabled" onClick={() => setOpen(false)}>
                    Fair Map
                  </Button>
                  <Button variant="disabled" onClick={() => setOpen(false)}>
                    Buy Tickets
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  {/* <a href={item.href}>
                    <Button variant={"ghost"}>{item.title}</Button>
                  </a> */}
                  <Button variant="disabled">{item.title}</Button>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                {/* <a href="/fair-map">
                  <Button variant="ghost">
                    <MapPinned className="h-12 w-12" />
                  </Button>
                </a> */}
                <Button variant="disabled">
                  <MapPinned className="h-12 w-12" />
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-2">
            <Button variant="disabled">Buy Tickets</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
