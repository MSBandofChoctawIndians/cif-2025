"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function SponsorFooter() {
  // Sample sponsor logos - replace with your actual sponsors
  const sponsors = [
    { id: 1, name: "Acme Inc", logo: "https://placehold.co/280x280" },
    { id: 2, name: "TechCorp", logo: "https://placehold.co/280x280" },
    {
      id: 3,
      name: "Innovate LLC",
      logo: "https://placehold.co/280x280",
    },
    {
      id: 4,
      name: "Future Systems",
      logo: "https://placehold.co/280x280",
    },
    {
      id: 5,
      name: "Global Solutions",
      logo: "https://placehold.co/280x280",
    },
    {
      id: 6,
      name: "NextGen Tech",
      logo: "https://placehold.co/280x280",
    },
  ];

  return (
    <footer className="via-fair-red w-full bg-gradient-to-br from-red-700 to-red-800 py-12">
      <div className="mb-12 mt-[-48px] h-48 bg-[url(/bead-pattern.svg)] bg-center bg-repeat-x opacity-30" />
      <div className="container mx-auto px-4 md:px-6">
        {/* <div className="mb-8 text-center"> */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Thank You to Our 2025 Sponsors
          </h2>
        </div>

        {/* <Carousel
          plugins={[Autoplay({ delay: 4000 })]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto w-full"
        >
          <CarouselContent>
            {sponsors.map((sponsor) => (
              <CarouselItem
                key={sponsor.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
              >
                <div className="p-1">
                  <Card className="border-2 border-white/50 bg-black/60 shadow-sm">
                    <CardContent className="flex h-[280px] items-center justify-center p-6">
                      <img
                        src={sponsor.logo || "/placeholder.svg"}
                        alt={`${sponsor.name} logo`}
                        width={280}
                        height={280}
                        className="object-contain"
                      />
                    </CardContent>
                    <CardFooter className="border-t p-4 py-0">
                      <h3 className="w-full text-center text-sm font-medium text-white md:text-base lg:text-lg">
                        Platinum Sponsor
                      </h3>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex justify-center">
            <CarouselPrevious className="relative mr-2" />
            <CarouselNext className="relative ml-2" />
          </div>
        </Carousel> */}
      </div>
    </footer>
  );
}
