
import React from 'react';
import { Button } from "@/components/ui/button";
import { getMonthName } from '@/lib/jalali';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onShowPrayerTimes: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  onShowPrayerTimes,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-primary">
          {getMonthName(month)} {year}
        </h2>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onShowPrayerTimes}
          className="rounded-full"
          aria-label="اوقات شرعی"
        >
          <Clock className="h-4 w-4" />
        </Button>
        
        <div className="flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevMonth}
            className="rounded-full"
            aria-label="ماه قبل"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNextMonth}
            className="rounded-full"
            aria-label="ماه بعد"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
