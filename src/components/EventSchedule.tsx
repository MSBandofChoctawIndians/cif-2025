"use client";

import { useEffect, useState, useRef } from "react";
import { format, parse, isAfter } from "date-fns";
import { CalendarDays, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useMobile } from "@/hooks/use-mobile";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { day01 } from "@/data/schedule/day01";
import { day02 } from "@/data/schedule/day02";
import { day03 } from "@/data/schedule/day03";
import { day04 } from "@/data/schedule/day04";
import { day05 } from "@/data/schedule/day05";
import { day06 } from "@/data/schedule/day06";
import { day07 } from "@/data/schedule/day07";
import { day08 } from "@/data/schedule/day08";
import { day09 } from "@/data/schedule/day09";
import { day10 } from "@/data/schedule/day10";

// Define event shape with optional category
interface Event {
  name: string;
  time: string;
  location: string;
  category?: string;
}

// Sample event data - replace with your actual data
const eventDates = [
  { id: "day01", label: "Day 1", date: "2025-07-01" },
  { id: "day02", label: "Day 2", date: "2025-07-02" },
  { id: "day03", label: "Day 3", date: "2025-07-03" },
  { id: "day04", label: "Day 4", date: "2025-07-05" },
  { id: "day05", label: "Day 5", date: "2025-07-07" },
  { id: "day06", label: "Day 6", date: "2025-07-08" },
  { id: "day07", label: "Day 7", date: "2025-07-09" },
  { id: "day08", label: "Day 8", date: "2025-07-10" },
  { id: "day09", label: "Day 9", date: "2025-07-11" },
  { id: "day10", label: "Day 10", date: "2025-07-12" },
];

// Define the fair end date
const fairEndDate = "2025-07-12";

// Add a mapping from day IDs to imported event arrays
const eventsByDay: Record<string, Event[]> = {
  day01,
  day02,
  day03,
  day04,
  day05,
  day06,
  day07,
  day08,
  day09,
  day10,
};

export default function EventSchedulePage() {
  const isMobile = useMobile();
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Add this useEffect to close the filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        isFilterOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    // Only add the listener when dropdown is open
    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  // Function to determine the default selected day
  const determineDefaultDay = () => {
    const today = new Date();
    const formattedToday = format(today, "yyyy-MM-dd");

    // Find today's event first
    const todayEvent = eventDates.find(
      (event) => event.date === formattedToday,
    );

    // If today is a fair day, show today
    if (todayEvent) {
      return todayEvent.id;
    }

    // Check if fair has concluded (today is after the last fair day)
    if (isAfter(today, parse(fairEndDate, "yyyy-MM-dd", new Date()))) {
      return "day01"; // Default to Day 1 after fair concludes
    }

    // If today is not a fair day but fair hasn't concluded, find the next available date
    const futureEvents = eventDates
      .filter((event) =>
        isAfter(parse(event.date, "yyyy-MM-dd", new Date()), today),
      )
      .sort(
        (a, b) =>
          parse(a.date, "yyyy-MM-dd", new Date()).getTime() -
          parse(b.date, "yyyy-MM-dd", new Date()).getTime(),
      );

    if (futureEvents.length > 0) {
      return futureEvents[0].id;
    }

    // If no future events, default to Day 1
    return "day01";
  };

  useEffect(() => {
    setSelectedDay(determineDefaultDay());
  }, []);

  const handleDayChange = (value: string): void => {
    setSelectedDay(value);
  };

  interface CategoryChangeHandler {
    (category: string): void;
  }

  const handleCategoryChange: CategoryChangeHandler = (
    category: string,
  ): void => {
    setSelectedCategories((prev: string[]): string[] => {
      if (prev.includes(category)) {
        return prev.filter((c: string) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Extract all unique categories
  const allCategories = [
    ...new Set(
      Object.values(eventsByDay).flatMap((events) =>
        events.flatMap((event) => (event.category ? [event.category] : [])),
      ),
    ),
  ];

  // Get the events for the selected day and filter by selected categories
  const currentEvents = selectedDay
    ? (eventsByDay[selectedDay as keyof typeof eventsByDay] || [])
        .filter(
          (event) =>
            selectedCategories.length === 0 ||
            (event.category !== undefined &&
              selectedCategories.includes(event.category)),
        )
        .sort((a, b) => {
          // assign custom ranks: regular=0, Gates Close=1, Midway Closes=2, Fair Officially Closes=3
          const rank = (evt: typeof a) =>
            evt.name === "Choctaw Indian Fair Officially Closes"
              ? 3
              : evt.name === "Midway Closes"
                ? 2
                : evt.name === "Gates Close"
                  ? 1
                  : 0;
          const rankA = rank(a);
          const rankB = rank(b);
          if (rankA !== rankB) return rankA - rankB;

          // same rank → sort by parsed time with multiple format support
          const parseTime = (timeStr: string) => {
            try {
              // Try different time formats
              const formats = ["h:mm A", "hh:mm A", "h:mm a", "hh:mm a"];
              for (const formatStr of formats) {
                try {
                  const parsed = parse(timeStr, formatStr, new Date());
                  if (!isNaN(parsed.getTime())) {
                    return parsed.getTime();
                  }
                } catch {
                  continue;
                }
              }
              // If all parsing fails, convert to 24-hour for comparison
              const [time, period] = timeStr.split(" ");
              const [hours, minutes] = time.split(":").map(Number);
              let hour24 = hours;
              if (period?.toUpperCase() === "PM" && hours !== 12) hour24 += 12;
              if (period?.toUpperCase() === "AM" && hours === 12) hour24 = 0;
              return hour24 * 60 + minutes; // Convert to minutes for comparison
            } catch (error) {
              console.error("Error parsing time:", timeStr, error);
              return 0;
            }
          };

          const timeA = parseTime(a.time);
          const timeB = parseTime(b.time);
          return timeA - timeB;
        })
    : [];

  // Get the date object for the selected day
  const selectedDateObj = selectedDay
    ? eventDates.find((d) => d.id === selectedDay)
    : null;

  // Format the date for display
  // const formattedDate = selectedDateObj
  //   ? format(
  //       parse(selectedDateObj.date, "yyyy-MM-dd", new Date()),
  //       "EEEE - MMMM d, yyyy",
  //     )
  //   : "";

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="my-6 text-center text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
        Event Schedule
      </h2>

      {isMobile ? (
        // Mobile view - dropdown selector
        <div className="mb-6">
          <Select value={selectedDay} onValueChange={handleDayChange}>
            <SelectTrigger className="w-full border-red-800 bg-black/70 text-white">
              <SelectValue placeholder="Select a day" />
            </SelectTrigger>
            <SelectContent className="border-red-800 bg-black/80 text-white backdrop-blur-md">
              {eventDates.map((day) => (
                <SelectItem
                  key={day.id}
                  value={day.id}
                  className="focus:bg-red-700/50 focus:text-white"
                >
                  {format(
                    parse(day.date, "yyyy-MM-dd", new Date()),
                    "EEEE - MMM dd, yyyy",
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        // Desktop view - tab selector
        <Tabs
          value={selectedDay}
          onValueChange={handleDayChange}
          className="mb-6"
        >
          <TabsList className="grid h-full w-full grid-cols-5 bg-black/70 p-1 lg:grid-cols-10">
            {eventDates.map((day) => (
              <TabsTrigger key={day.id} value={day.id} className="text-center">
                <div className="flex flex-col items-center">
                  <span className="text-xl font-medium text-white">
                    {format(parse(day.date, "yyyy-MM-dd", new Date()), "EEE")}
                  </span>
                  <span className="text-muted text-lg">
                    {format(parse(day.date, "yyyy-MM-dd", new Date()), "MMM")}
                  </span>
                  <span className="text-muted text-3xl">
                    {format(parse(day.date, "yyyy-MM-dd", new Date()), "d")}
                  </span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Display the selected date */}
      {/* {formattedDate && (
        <div className="mb-6 flex items-center justify-center">
          <CalendarDays className="mr-2 h-5 w-5 text-red-300" />
          <h2 className="text-xl font-semibold text-white">{formattedDate}</h2>
        </div>
      )} */}

      {/* Category filters */}
      <div className="mb-6 rounded-lg bg-black/70 p-4 backdrop-blur-sm">
        <h3 className="mb-3 text-sm font-medium text-gray-300">
          Filter by category:
        </h3>

        {isMobile ? (
          // Mobile view - multi-select dropdown
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex w-full items-center justify-between rounded-md border border-red-800 bg-black/60 p-3 text-left text-white"
            >
              <span>
                {selectedCategories.length === 0
                  ? "All Categories"
                  : `${selectedCategories.length} selected`}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform ${isFilterOpen ? "rotate-180 transform" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isFilterOpen && (
              <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-red-800 bg-black/80 shadow-lg">
                <div className="p-2">
                  {allCategories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center rounded p-2 hover:bg-red-900/30"
                    >
                      <Checkbox
                        id={`mobile-category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([
                              ...selectedCategories,
                              category,
                            ]);
                          } else {
                            setSelectedCategories(
                              selectedCategories.filter((c) => c !== category),
                            );
                          }
                        }}
                        className={cn(
                          "border-opacity-60",
                          category === "culture" &&
                            "border-blue-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600",
                          category === "family fun" &&
                            "border-green-300 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600",
                          category === "pageant" &&
                            "border-purple-300 data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-600",
                          category === "competition" &&
                            "border-red-300 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600",
                          category === "stickball" &&
                            "border-gray-300 data-[state=checked]:border-gray-600 data-[state=checked]:bg-gray-600",
                        )}
                      />
                      <Label
                        htmlFor={`mobile-category-${category}`}
                        className={cn(
                          "ml-2 cursor-pointer text-sm capitalize",
                          category === "culture" && "text-blue-300",
                          category === "family fun" && "text-green-300",
                          category === "pageant" && "text-purple-300",
                          category === "competition" && "text-red-300",
                          category === "stickball" && "text-gray-300",
                        )}
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="border-t border-red-800/50 p-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategories([]);
                      setIsFilterOpen(false);
                    }}
                    className="w-full rounded p-2 text-center text-sm text-red-300 hover:bg-red-900/30"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Desktop view - checkbox row
          <div className="flex flex-wrap gap-3">
            {allCategories.map((category) => (
              <div key={category} className="flex items-center">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                  className={cn(
                    "border-opacity-60",
                    category === "culture" &&
                      "border-blue-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600",
                    category === "family fun" &&
                      "border-green-300 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600",
                    category === "pageant" &&
                      "border-purple-300 data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-600",
                    category === "competition" &&
                      "border-red-300 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600",
                    category === "stickball" &&
                      "border-gray-300 data-[state=checked]:border-gray-600 data-[state=checked]:bg-gray-600",
                  )}
                />
                <Label
                  htmlFor={`category-${category}`}
                  className={cn(
                    "ml-2 text-sm capitalize",
                    category === "culture" && "text-blue-300",
                    category === "family fun" && "text-green-300",
                    category === "pageant" && "text-purple-300",
                    category === "competition" && "text-red-300",
                    category === "stickball" && "text-gray-300",
                  )}
                >
                  {category}
                </Label>
              </div>
            ))}
            {selectedCategories.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedCategories([])}
                className="ml-2 text-xs text-red-300 underline hover:text-red-200"
              >
                Clear All
              </button>
            )}
          </div>
        )}
      </div>

      {/* Events table */}
      <Card className="border-red-800 bg-black/70 text-white">
        <CardHeader>
          <CardTitle className="text-gray-200">Events</CardTitle>
        </CardHeader>
        <CardContent>
          {currentEvents.length > 0 ? (
            <div className="grid gap-4">
              {currentEvents.map((event) => (
                <div
                  key={event.name + event.time}
                  className="flex flex-col justify-between rounded-lg border border-amber-200 bg-black/40 p-4 transition-colors sm:flex-row"
                >
                  <div className="mb-2 flex flex-col sm:mb-0">
                    <div className="font-medium">{event.name}</div>
                    <div className="text-sm text-gray-300">
                      {event.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {event.category && (
                      <Badge
                        variant="outline"
                        className={cn(
                          "capitalize",
                          event.category === "culture" &&
                            "border-blue-200 bg-blue-50 text-blue-700",
                          event.category === "family fun" &&
                            "border-green-200 bg-green-50 text-green-700",
                          event.category === "pageant" &&
                            "border-purple-200 bg-purple-50 text-purple-700",
                          event.category === "competition" &&
                            "border-red-200 bg-red-50 text-red-700",
                          event.category === "stickball" &&
                            "border-gray-200 bg-gray-50 text-gray-700",
                        )}
                      >
                        {event.category}
                      </Badge>
                    )}

                    <div className="flex items-center text-sm">
                      <Clock className="mr-1 h-4 w-4 text-gray-300" />
                      {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-white">
              No events scheduled for this day.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
