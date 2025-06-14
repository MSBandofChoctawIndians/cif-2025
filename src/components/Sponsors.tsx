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
import platSponsors from "@/data/sponsors/platSponsors";
import goldSponsors from "@/data/sponsors/goldSponsors";
import silverSponsors from "@/data/sponsors/silverSponsors";
import bronzeSponsors from "@/data/sponsors/bronzeSponsors";

export default function SponsorFooter() {
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
                    <Card className="border-2 border-neutral-400 bg-gradient-to-br from-neutral-400 via-white to-neutral-500 shadow-sm">
                      <CardContent className="flex h-[280px] items-center justify-center p-6">
                        <img
                          src={
                            `/sponsors/platinum/${sponsor.logo}.png` ||
                            "/placeholder.svg"
                          }
                          alt={`${sponsor.name} logo`}
                          width={280}
                          height={280}
                          className="object-contain"
                        />
                      </CardContent>
                      <CardFooter>
                        <h3 className="w-full pt-4 text-center text-sm font-medium md:text-base lg:text-lg">
                          Platinum Sponsor
                        </h3>
                      </CardFooter>
                    </Card>
                  </a>
                </div>
              </CarouselItem>
            ))}
            {goldSponsors.map((sponsor) => (
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
                    <Card className="border-2 border-neutral-400 bg-gradient-to-br from-yellow-500 via-yellow-200 to-yellow-600 shadow-sm">
                      <CardContent className="flex h-[280px] items-center justify-center p-6">
                        <img
                          src={
                            `/sponsors/gold/${sponsor.logo}.png` ||
                            "/placeholder.svg"
                          }
                          alt={`${sponsor.name} logo`}
                          width={280}
                          height={280}
                          className="object-contain"
                        />
                      </CardContent>
                      <CardFooter>
                        <h3 className="w-full pt-4 text-center text-sm font-medium md:text-base lg:text-lg">
                          Gold Sponsor
                        </h3>
                      </CardFooter>
                    </Card>
                  </a>
                </div>
              </CarouselItem>
            ))}
            {silverSponsors.map((sponsor) => (
              <CarouselItem
                key={sponsor.name}
                className="pl-4 md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
              >
                <div className="p-1">
                  {sponsor.link ? (
                    <a
                      href={sponsor.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Card className="border-2 border-neutral-400 bg-gradient-to-br from-slate-400 via-slate-100 to-slate-500 shadow-sm">
                        <CardContent className="flex h-[280px] items-center justify-center p-6">
                          <img
                            src={
                              `/sponsors/silver/${sponsor.logo}.png` ||
                              "/placeholder.svg"
                            }
                            alt={`${sponsor.name} logo`}
                            width={280}
                            height={280}
                            className="object-contain"
                          />
                        </CardContent>
                        <CardFooter>
                          <h3 className="w-full pt-4 text-center text-sm font-medium md:text-base lg:text-lg">
                            Silver Sponsor
                          </h3>
                        </CardFooter>
                      </Card>
                    </a>
                  ) : (
                    <Card className="border-2 border-neutral-400 bg-gradient-to-br from-slate-400 via-slate-100 to-slate-500 shadow-sm">
                      <CardContent className="flex h-[280px] items-center justify-center p-6">
                        <img
                          src={
                            `/sponsors/silver/${sponsor.logo}.png` ||
                            "/placeholder.svg"
                          }
                          alt={`${sponsor.name} logo`}
                          width={280}
                          height={280}
                          className="object-contain"
                        />
                      </CardContent>
                      <CardFooter>
                        <h3 className="w-full pt-4 text-center text-sm font-medium md:text-base lg:text-lg">
                          Silver Sponsor
                        </h3>
                      </CardFooter>
                    </Card>
                  )}
                </div>
              </CarouselItem>
            ))}
            {/* {Array.from(
              { length: Math.ceil(bronzeSponsors.length / 2) },
              (_, i) => {
                const first = bronzeSponsors[i * 2];
                const second = bronzeSponsors[i * 2 + 1];
                return (
                  <CarouselItem
                    key={`bronze-pair-${i}`}
                    className="pl-4 md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
                  >
                    <div className="grid grid-rows-2 gap-4 p-1">
                      {[first, second].map((sponsor, idx) =>
                        sponsor ? (
                          <a
                            key={sponsor.name}
                            href={sponsor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Card className="border-2 border-neutral-400 bg-gradient-to-br from-amber-600 via-amber-300 to-amber-700 shadow-sm">
                              <CardContent className="flex h-[72px] items-center justify-center p-6">
                                <h1 className="text-2xl font-bold">
                                  {sponsor.name}
                                </h1>
                              </CardContent>
                              <CardFooter>
                                <h3 className="w-full pt-4 text-center text-sm font-medium md:text-base lg:text-lg">
                                  Bronze Sponsor
                                </h3>
                              </CardFooter>
                            </Card>
                          </a>
                        ) : (
                          <div key={`empty-${idx}`} className="invisible">
                            <Card className="border-2 border-neutral-400 bg-gradient-to-br from-amber-600 via-amber-300 to-amber-700 shadow-sm">
                              <CardContent className="flex h-[72px] items-center justify-center p-6">
                                <h1>&nbsp;</h1>
                              </CardContent>
                              <CardFooter>
                                <h3 className="w-full pt-4 text-center text-sm font-medium md:text-base lg:text-lg">
                                  Bronze Sponsor
                                </h3>
                              </CardFooter>
                            </Card>
                          </div>
                        ),
                      )}
                    </div>
                  </CarouselItem>
                );
              },
            )} */}
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
