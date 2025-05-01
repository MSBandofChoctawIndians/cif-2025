"use client";

import { useEffect, useState } from "react";
import { format, parse, isAfter } from "date-fns";
import { CalendarDays, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

// Sample event data - replace with your actual data
const eventDates = [
  { id: "day01", label: "Day 1", date: "2025-04-28" },
  { id: "day02", label: "Day 2", date: "2025-04-29" },
  { id: "day03", label: "Day 3", date: "2025-04-30" },
  { id: "day04", label: "Day 4", date: "2025-05-01" },
  { id: "day05", label: "Day 5", date: "2025-05-02" },
  { id: "day06", label: "Day 6", date: "2025-05-05" }, // Skip weekend
  { id: "day07", label: "Day 7", date: "2025-05-06" },
  { id: "day08", label: "Day 8", date: "2025-05-07" },
  { id: "day09", label: "Day 9", date: "2025-05-08" },
  { id: "day10", label: "Day 10", date: "2025-05-09" },
];

// Define the fair end date
const fairEndDate = "2025-05-10";

// Add a mapping from day IDs to imported event arrays
const eventsByDay = {
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

  // Function to determine the default selected day
  const determineDefaultDay = () => {
    const today = new Date();
    const formattedToday = format(today, "yyyy-MM-dd");

    // Check if fair has concluded
    if (isAfter(today, parse(fairEndDate, "yyyy-MM-dd", new Date()))) {
      return "day01"; // Default to Day 1 after fair concludes
    }

    // Find today or next available date
    const todayEvent = eventDates.find(
      (event) => event.date === formattedToday,
    );

    if (todayEvent) {
      return todayEvent.id;
    }

    // If today is not available, find the next available date
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
        events.map((event) => event.category),
      ),
    ),
  ];

  // Get the events for the selected day and filter by selected categories
  const currentEvents = selectedDay
    ? (eventsByDay[selectedDay as keyof typeof eventsByDay] || []).filter(
        (event) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(event.category),
      )
    : [];

  // Get the date object for the selected day
  const selectedDateObj = selectedDay
    ? eventDates.find((d) => d.id === selectedDay)
    : null;

  // Format the date for display
  const formattedDate = selectedDateObj
    ? format(
        parse(selectedDateObj.date, "yyyy-MM-dd", new Date()),
        "EEEE, MMMM d, yyyy",
      )
    : "";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold text-white">
        Event Schedule
      </h1>

      {isMobile ? (
        // Mobile view - dropdown selector
        <div className="mb-6">
          <Select value={selectedDay} onValueChange={handleDayChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a day" />
            </SelectTrigger>
            <SelectContent>
              {eventDates.map((day) => (
                <SelectItem key={day.id} value={day.id}>
                  {day.label} -{" "}
                  {format(parse(day.date, "yyyy-MM-dd", new Date()), "MMM d")}
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
          className="mb-18"
        >
          <TabsList className="grid w-full grid-cols-10">
            {eventDates.map((day) => (
              <TabsTrigger key={day.id} value={day.id} className="text-center">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-medium">
                    {format(parse(day.date, "yyyy-MM-dd", new Date()), "EEE")}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {format(parse(day.date, "yyyy-MM-dd", new Date()), "MMM")}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {format(parse(day.date, "yyyy-MM-dd", new Date()), "d")}
                  </span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Display the selected date */}
      {formattedDate && (
        <div className="my-8 flex items-center justify-center">
          <CalendarDays className="text-muted mr-2 h-5 w-5" />
          <h2 className="text-xl font-semibold text-white">{formattedDate}</h2>
        </div>
      )}

      {/* Events table */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          {/* Category filters */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium">Filter by category:</h3>
            <div className="flex flex-wrap gap-3">
              {allCategories.map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                    className={cn(
                      category === "networking" &&
                        "border-blue-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600",
                      category === "workshop" &&
                        "border-green-300 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600",
                      category === "talk" &&
                        "border-purple-300 data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-600",
                      category === "panel" &&
                        "border-amber-300 data-[state=checked]:border-amber-600 data-[state=checked]:bg-amber-600",
                      category === "ceremony" &&
                        "border-red-300 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600",
                      category === "competition" &&
                        "border-orange-300 data-[state=checked]:border-orange-600 data-[state=checked]:bg-orange-600",
                      category === "showcase" &&
                        "border-indigo-300 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-600",
                      category === "demo" &&
                        "border-pink-300 data-[state=checked]:border-pink-600 data-[state=checked]:bg-pink-600",
                      category === "social" &&
                        "border-teal-300 data-[state=checked]:border-teal-600 data-[state=checked]:bg-teal-600",
                      category === "wellness" &&
                        "border-emerald-300 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600",
                      category === "break" &&
                        "border-gray-300 data-[state=checked]:border-gray-600 data-[state=checked]:bg-gray-600",
                    )}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className={cn(
                      "ml-2 text-sm capitalize",
                      category === "networking" && "text-blue-700",
                      category === "workshop" && "text-green-700",
                      category === "talk" && "text-purple-700",
                      category === "panel" && "text-amber-700",
                      category === "ceremony" && "text-red-700",
                      category === "competition" && "text-orange-700",
                      category === "showcase" && "text-indigo-700",
                      category === "demo" && "text-pink-700",
                      category === "social" && "text-teal-700",
                      category === "wellness" && "text-emerald-700",
                      category === "break" && "text-gray-700",
                    )}
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {currentEvents.length > 0 ? (
            <div className="grid gap-4">
              {currentEvents.map((event) => (
                <div
                  key={event.id}
                  className="hover:bg-muted/50 flex flex-col justify-between rounded-lg border p-4 transition-colors sm:flex-row"
                >
                  <div className="mb-2 flex flex-col sm:mb-0">
                    <div className="font-medium">{event.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {event.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize",
                        event.category === "networking" &&
                          "border-blue-200 bg-blue-50 text-blue-700",
                        event.category === "workshop" &&
                          "border-green-200 bg-green-50 text-green-700",
                        event.category === "talk" &&
                          "border-purple-200 bg-purple-50 text-purple-700",
                        event.category === "panel" &&
                          "border-amber-200 bg-amber-50 text-amber-700",
                        event.category === "ceremony" &&
                          "border-red-200 bg-red-50 text-red-700",
                        event.category === "competition" &&
                          "border-orange-200 bg-orange-50 text-orange-700",
                        event.category === "showcase" &&
                          "border-indigo-200 bg-indigo-50 text-indigo-700",
                      )}
                    >
                      {event.category}
                    </Badge>
                    <div className="flex items-center text-sm">
                      <Clock className="text-muted-foreground mr-1 h-4 w-4" />
                      {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground py-8 text-center">
              No events scheduled for this day.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
