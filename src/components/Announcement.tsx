"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function AnnouncementDialog() {
  // control dialog visibility
  const [isOpen, setIsOpen] = useState(false);
  // track if already shown in this session
  const shownKey = "announcementShown";

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    // only run in browser
    if (typeof window === "undefined") return;
    // read navigation entries
    const entries = performance.getEntriesByType("navigation");
    const navType =
      entries.length > 0
        ? (entries[0] as PerformanceNavigationTiming).type
        : "navigate";
    const seen = sessionStorage.getItem(shownKey);
    // show on page reload or initial first navigation
    if (navType === "reload" || (navType === "navigate" && !seen)) {
      setIsOpen(true);
      sessionStorage.setItem(shownKey, "true");
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full gap-0 rounded-lg border-0 bg-neutral-800 p-0">
        <DialogHeader className="flex items-center justify-between px-6 py-2">
          <h2 className="text-lg font-semibold text-white">Announcements</h2>
        </DialogHeader>
        {/* Image or content */}
        <a href="/announcement.webp" target="_blank" rel="noopener noreferrer">
          <img
            src="/announcement.webp"
            alt="Announcement"
            className="contain h-full w-full"
          />
        </a>
        <DialogFooter className="flex justify-end p-4">
          {/* Button to open full announcement */}
          <Button
            variant="secondary"
            onClick={() => window.open("/announcement.webp", "_blank")}
          >
            <span>View Full Announcement</span>
          </Button>
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
