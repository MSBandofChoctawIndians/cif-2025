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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

// Each slide can be an image (src) or custom content, with an optional link
export interface AnnouncementSlide {
  src?: string;
  alt?: string;
  content?: React.ReactNode;
  url?: string;
}

export default function AnnouncementDialog({
  slides,
}: {
  slides: AnnouncementSlide[];
}) {
  // control dialog visibility
  const [isOpen, setIsOpen] = useState(false);
  // track if already shown in this session
  const shownKey = "announcementShown";

  const handleClose = () => setIsOpen(false);

  // on mount, decide when to show announcement
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

  // Embla carousel state
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // track carousel slide changes
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full gap-0 rounded-lg border-0 bg-neutral-800 p-0">
        <DialogHeader className="flex items-center justify-between px-6 py-2">
          <h2 className="text-lg font-semibold text-white">Announcements</h2>
        </DialogHeader>
        {/* Carousel of slides */}
        <Carousel setApi={setEmblaApi} className="w-full h-full relative">
          <CarouselPrevious />
          <CarouselContent>
            {slides.map((slide, idx) => (
              <CarouselItem
                key={idx}
                className="flex items-center justify-center"
              >
                {slide.src ? (
                  <img
                    src={slide.src}
                    alt={slide.alt ?? ""}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="p-8 text-white text-center">
                    {slide.content}
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
        <DialogFooter className="flex justify-end p-4">
          {/* Button to open current slide's link or image */}
          <Button
            variant="secondary"
            onClick={() => {
              const slide = slides[selectedIndex];
              const target = slide.url ?? slide.src;
              if (target) window.open(target, "_blank");
            }}
          >
            <span>View</span>
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
