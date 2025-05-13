
import React from 'react';
import { ChevronRight, ChevronLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import jalaliMoment from 'jalali-moment';

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onShowPrayerTimes: () => void;
}

const persianMonths = [
  'فروردین', 'اردیبهشت', 'خرداد',
  'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر',
  'دی', 'بهمن', 'اسفند'
];

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  onShowPrayerTimes
}) => {
  // Create a jalali date for the first day of the current jalali month
  const jalaliDate = jalaliMoment().jYear(year).jMonth(month - 1).jDate(1);
  
  // Get corresponding Gregorian and Hijri dates
  const gregorianDate = jalaliDate.format('MMMM YYYY');
  const hijriDate = jalaliDate.format('iMMMM iYYYY');
  
  return (
    <div className="mb-6 space-y-2">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onPrevMonth}>
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">ماه قبل</span>
        </Button>
        
        <div className="text-center">
          <h2 className="text-xl font-bold">
            {persianMonths[month - 1]} {year}
          </h2>
          <div className="text-xs text-muted-foreground mt-1 space-y-1">
            <div>{gregorianDate}</div>
            <div>{hijriDate}</div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={onShowPrayerTimes}>
            <Clock className="h-5 w-5" />
            <span className="sr-only">اوقات شرعی</span>
          </Button>
          
          <Button variant="ghost" size="icon" onClick={onNextMonth}>
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">ماه بعد</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
