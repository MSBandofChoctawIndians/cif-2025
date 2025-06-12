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
  const platSponsors = [
    {
      name: "Pearl River Resort",
      logo: "/sponsors/platinum/pearlriver.png",
      link: "https://www.pearlriverresort.com/",
    },
    {
      name: "First American Bank (FABI)",
      logo: "/sponsors/platinum/fabi_white.png",
      link: "https://www.fabicash.com/",
    },
    {
      name: "The Yates Companies",
      logo: "/sponsors/platinum/yates.png",
      link: "https://www.wgyates.com/",
    },
    {
      name: "Pryor Morrow",
      logo: "/sponsors/platinum/pryormorrow.png",
      link: "https://pryormorrow.com/",
    },
    {
      name: "Willis Engineering",
      logo: "/sponsors/platinum/willisengineering.png",
      link: "http://www.willisengineering.net/",
    },
    {
      name: "Walt Schrimpf (SIS-UNUM)",
      logo: "/sponsors/platinum/sis.png",
      link: "https://www.unum.com/",
    },
    {
      name: "Choctaw Health Center",
      logo: "/sponsors/platinum/chc.png",
      link: "https://www.choctawhealthcenter.org/",
    },
    {
      name: "Trustmark",
      logo: "/sponsors/platinum/trustmark.png",
      link: "https://www.trustmark.com/",
    },
  ];

  return (
    <footer className="via-fair-red w-full bg-gradient-to-br from-red-700 to-red-800 py-12">
      <div className="mb-12 mt-[-48px] h-48 bg-[url(/bead-pattern.svg)] bg-center bg-repeat-x opacity-30" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Thank You to Our 2025 Sponsors
          </h2>
        </div>

        <Carousel
          plugins={[Autoplay({ delay: 4000 })]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto w-full"
        >
          <CarouselContent>
            {platSponsors.map((sponsor) => (
              <CarouselItem
                key={sponsor.name}
                className="pl-4 md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
              >
                <div className="p-1">
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                  </a>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex justify-center">
            <CarouselPrevious className="relative mr-2" />
            <CarouselNext className="relative ml-2" />
          </div>
        </Carousel>
      </div>
    </footer>
  );
}
