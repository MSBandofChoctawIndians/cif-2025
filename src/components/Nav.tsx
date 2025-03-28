"use client";

import { useState, useMemo } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { MapPinned, Menu, Ticket, X } from "lucide-react";

const navigation = [
  { name: "Events", href: "/events" },
  { name: "Culture", href: "/culture" },
  { name: "Family Fun", href: "/family" },
  { name: "Stickball", href: "/stickball" },
  { name: "Pageant", href: "/pageant" },
  { name: "Competitions", href: "/competitions" },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = useMemo(() => window.location.pathname, []);

  return (
    <header className="sticky top-0 z-1 bg-[rgb(33,37,41)]">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Choctaw Indian Fair</span>
            <img
              alt="Choctaw Indian Fair Logo"
              src="/navlogo.webp"
              width="192"
              height="48"
              className="h-12 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
          >
            <span className="sr-only">Open main menu</span>
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`font-roboto text-sm/6 font-semibold ${currentPath === item.href ? "text-white" : "text-gray-300"}`}
            >
              {item.name}
            </a>
          ))}
          <a href="/map" className="text-gray-300">
            <MapPinned
              aria-hidden="true"
              className="mr-2 inline-block h-7 w-7"
            />
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            type="button"
            className="font-roboto rounded-md bg-[var(--fair-gold)] px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-[var(--fair-gold)]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fair-gold)]"
          >
            <Ticket
              aria-hidden="true"
              className="mr-2 mb-0.5 inline-block h-5 w-5"
            />
            Tickets
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-0 bg-black/50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[rgb(33,37,41)] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Choctaw Indian Fair</span>
              <img
                alt="Choctaw Indian Fair Logo"
                src="/navlogo.webp"
                width="192"
                height="48"
                className="h-12 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 mr-1 rounded-md p-2.5 text-gray-300"
            >
              <span className="sr-only">Close menu</span>
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-[var(--fair-gold)]/50">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="font-roboto -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-200 hover:bg-[var(--fair-gold)]/30"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-y-4 py-6">
                <button
                  type="button"
                  className="font-roboto rounded-md bg-[var(--fair-gold)] px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-[var(--fair-gold)]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fair-gold)]"
                >
                  <MapPinned
                    aria-hidden="true"
                    className="mr-2 inline-block h-5 w-5"
                  />
                  Map
                </button>
                <button
                  type="button"
                  className="font-roboto rounded-md bg-[var(--fair-gold)] px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-[var(--fair-gold)]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fair-gold)]"
                >
                  <Ticket
                    aria-hidden="true"
                    className="mr-2 mb-0.5 inline-block h-5 w-5"
                  />
                  Tickets
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
