"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  AudioLines,
  Youtube,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
      <DialogContent className="bg-radial w-auto max-w-[90vh] gap-0 rounded-lg border-0 from-stone-700 to-stone-950 p-0">
        <DialogHeader className="flex items-center justify-between px-6 py-2">
          <h2 className="text-lg font-semibold text-white">Announcements</h2>
        </DialogHeader>
        {/* Carousel of slides */}
        <Carousel setApi={setEmblaApi} className="relative h-full w-auto">
          <CarouselContent>
            {slides.map((slide, idx) => (
              <CarouselItem
                key={idx}
                className="flex w-full items-center justify-center"
              >
                {slide.src ? (
                  <img
                    src={slide.src}
                    alt={slide.alt ?? ""}
                    className="mx-auto max-h-[90vh] w-auto"
                  />
                ) : typeof slide.content === "string" ? (
                  <div
                    className="p-8 text-center text-white"
                    dangerouslySetInnerHTML={{ __html: slide.content }}
                  />
                ) : (
                  <div className="p-8 text-center text-white">
                    {slide.content}
                  </div>
                )}
              </CarouselItem>
            ))}
            <CarouselItem className="flex items-center justify-center">
              <div className="p-8 text-center text-white">
                <h3 className="mb-4 text-2xl font-semibold">Stay Connected</h3>
                <ul className="flex flex-col justify-center space-x-6 text-lg">
                  <li className="mx-auto mb-4">
                    <a
                      href="https://www.facebook.com/ChoctawIndianFair"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="lg"
                        className="min-w-48 bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <Facebook />
                        Facebook
                      </Button>
                    </a>
                  </li>
                  <li className="mx-auto mb-4">
                    <a
                      href="https://www.instagram.com/choctawindianfair/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="lg"
                        className="min-w-48 bg-pink-500 text-white hover:bg-pink-600"
                      >
                        <Instagram />
                        Instagram
                      </Button>
                    </a>
                  </li>
                  <li className="mx-auto mb-4">
                    <a
                      href="https://www.youtube.com/@ChoctawIndianFair"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="lg"
                        className="min-w-48 bg-red-500 text-white hover:bg-red-600"
                      >
                        <Youtube />
                        YouTube
                      </Button>
                    </a>
                  </li>
                  <li className="mx-auto mb-4">
                    <a
                      href="https://open.spotify.com/playlist/7fG95SQpyTf729cMKOvW7x?si=8c5bd6ccb3b54d4f"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="lg"
                        className="min-w-48 bg-green-500 text-black hover:bg-green-600"
                      >
                        <AudioLines />
                        Spotify
                      </Button>
                    </a>
                  </li>
                </ul>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <DialogFooter className="flex items-center p-4">
          {/* Navigation buttons on left */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="cursor-pointer"
              disabled={!emblaApi?.canScrollPrev?.()}
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="secondary"
              className="cursor-pointer"
              disabled={!emblaApi?.canScrollNext?.()}
              onClick={() => emblaApi?.scrollNext()}
            >
              <ArrowRight />
            </Button>
          </div>
          {/* Spacer pushes action buttons to right */}
          <div className="flex-1" />
          {/* Action buttons on right */}
          <div className="flex items-center gap-2">
            {slides[selectedIndex]?.url && (
              <Button
                variant="secondary"
                className="cursor-pointer"
                onClick={() => {
                  const slide = slides[selectedIndex];
                  const target = slide.url ?? slide.src;
                  if (target) window.open(target, "_blank");
                }}
              >
                <span>View</span>
              </Button>
            )}
            <Button
              variant="outline"
              className="cursor-pointer bg-transparent"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
