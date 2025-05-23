
import React from 'react';
import { 
  getJalaliDay, 
  getJalaliMonth, 
  getJalaliYear, 
  getMonthStartDayOfWeek,
  isSameJalaliDay,
  isHoliday
} from '@/lib/jalali';
import { cn } from '@/lib/utils';
import { hasEvents, getEventsForDate } from '@/lib/events';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Reminder {
  id: string;
  date: Date;
  title: string;
  description?: string;
}

interface CalendarGridProps {
  year: number;
  month: number;
  days: Date[];
  reminders: Reminder[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  year,
  month,
  days,
  reminders,
  selectedDate,
  onSelectDate,
}) => {
  const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  const startDayOfWeek = getMonthStartDayOfWeek(year, month);
  
  // Adjust startDayOfWeek for our grid (0 = Saturday)
  const adjustedStartDay = startDayOfWeek;

  // Create an array for the calendar grid with empty cells for days from previous month
  const calendarDays = Array(adjustedStartDay).fill(null).concat(days);

  const hasReminder = (date: Date): boolean => {
    return reminders.some(reminder => 
      isSameJalaliDay(reminder.date, date)
    );
  };

  const isToday = (date: Date): boolean => {
    return isSameJalaliDay(date, new Date());
  };
  
  const dayHasEvents = (date: Date): boolean => {
    return hasEvents(date);
  };

  return (
    <div className="bg-card rounded-lg shadow-md">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center py-2 border-b">
        {weekDays.map((day, index) => (
          <div 
            key={index} 
            className={cn(
              "text-sm font-medium",
              // Friday (last day of week) is always a holiday
              index === 6 ? "text-red-600" : "text-gray-500"
            )}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1 p-2">
        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-12 md:h-16" />;
          }
          
          const dayOfMonth = getJalaliDay(day);
          const isSelected = selectedDate && isSameJalaliDay(day, selectedDate);
          const dayHasReminder = hasReminder(day);
          const dayIsToday = isToday(day);
          const dayIsHoliday = isHoliday(day);
          const events = getEventsForDate(day);
          const hasEvent = events.length > 0;
          
          return (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "h-12 md:h-16 flex flex-col items-center justify-start p-1 rounded-md transition-colors hover:bg-accent/20 cursor-pointer relative",
                      isSelected && "bg-primary text-primary-foreground hover:bg-primary/90",
                      !isSelected && dayIsToday && "bg-accent/30"
                    )}
                    onClick={() => onSelectDate(day)}
                  >
                    <span className={cn(
                      "w-7 h-7 flex items-center justify-center rounded-full text-sm",
                      isSelected ? "font-bold" : dayIsToday ? "font-bold" : "",
                      // Apply red color to holiday dates if not selected
                      !isSelected && (dayIsHoliday || events.some(e => e.isHoliday)) ? "text-red-600" : ""
                    )}>
                      {dayOfMonth}
                    </span>
                    
                    <div className="flex flex-wrap justify-center gap-1 mt-1">
                      {hasEvent && (
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          isSelected ? "bg-primary-foreground" : "bg-secondary"
                        )} />
                      )}
                      
                      {dayHasReminder && (
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          isSelected ? "bg-primary-foreground" : "bg-primary"
                        )} />
                      )}
                    </div>
                    
                    {hasEvent && (
                      <div className="absolute bottom-1 w-full px-1 text-center">
                        <span className="text-[0.65rem] truncate block">
                          {events[0].title}
                        </span>
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                {hasEvent && (
                  <TooltipContent>
                    <div className="p-2 space-y-1">
                      {events.map((event, i) => (
                        <div key={i} className={cn(
                          "text-xs",
                          event.isHoliday && "text-red-600 font-bold"
                        )}>
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
