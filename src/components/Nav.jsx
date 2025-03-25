"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { MapPinned, Menu, Ticket, X } from "lucide-react";

const navigation = [
  { name: "Events", href: "#" },
  { name: "Culture", href: "#" },
  { name: "Family Fun", href: "#" },
  { name: "Stickball", href: "#" },
  { name: "Pageant", href: "#" },
  { name: "Competitions", href: "#" },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[rgb(33,37,41)] sticky top-0 z-1">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src="/navlogo.webp" width="192" height="48" className="h-12 w-auto" />
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
              className="disabled text-sm/6 font-semibold text-gray-400 font-raleway"
            >
              {item.name}
            </a>
            ))}
            <a href="#" class="text-gray-400">
              <MapPinned aria-hidden="true" className="mr-2 h-7 w-7 inline-block" />
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            type="button"
            className="rounded-md bg-[var(--fair-gold)] px-3.5 py-2.5 text-sm font-semibold font-raleway shadow-sm hover:bg-[var(--fair-gold)]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fair-gold)]"
          >
            <Ticket
              aria-hidden="true"
              className="mr-2 h-5 w-5 inline-block mb-0.5"
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
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[rgb(33,37,41)] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src="/navlogo.webp" width="128" height="32" className="h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-400 hover:bg-gray-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <button
                  type="button"
                  className="rounded-md bg-[var(--fair-gold)] px-3.5 py-2.5 text-sm font-semibold font-raleway shadow-sm hover:bg-[var(--fair-gold)]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fair-gold)]"
                >
                  <Ticket
                    aria-hidden="true"
                    className="mr-2 h-5 w-5 inline-block mb-0.5"
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
