"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface IDatePicker {
  date: Date | undefined;
  setDate: (date: Date) => void;
  className?: string;
  id?: string;
  required?: boolean;
}

export function DatePicker({
  date,
  setDate,
  id,
  className,
  required,
}: IDatePicker) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          required={required}
          id={id}
          mode="single"
          selected={date}
          onSelect={(val) => setDate(val!)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
