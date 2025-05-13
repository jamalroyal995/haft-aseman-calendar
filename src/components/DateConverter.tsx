
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import jalaliMoment from 'jalali-moment';

export const DateConverter: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Format date in different calendars
  const jalaliDate = jalaliMoment(selectedDate).format('jYYYY/jMM/jDD');
  const gregorianDate = jalaliMoment(selectedDate).format('YYYY/MM/DD');
  const hijriDate = jalaliMoment(selectedDate).format('iYYYY/iMM/iDD');
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">تبدیل تاریخ</h3>
      
      <div className="border rounded-md p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          className="mx-auto"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span>هجری شمسی:</span>
          <span className="font-bold">{jalaliDate}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span>میلادی:</span>
          <span className="font-bold ltr">{gregorianDate}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span>هجری قمری:</span>
          <span className="font-bold">{hijriDate}</span>
        </div>
      </div>
    </div>
  );
};
