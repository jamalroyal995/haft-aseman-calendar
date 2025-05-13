
import jalaliMoment from 'jalali-moment';

export interface CalendarEvent {
  title: string;
  description?: string;
  date: {
    month: number; // 1-12
    day: number;   // 1-31
  };
  type: 'holiday' | 'occasion';
  isHoliday: boolean;
}

// Iranian official holidays and occasions
export const persianEvents: CalendarEvent[] = [
  { title: 'عید نوروز', date: { month: 1, day: 1 }, type: 'holiday', isHoliday: true },
  { title: 'عید نوروز', date: { month: 1, day: 2 }, type: 'holiday', isHoliday: true },
  { title: 'عید نوروز', date: { month: 1, day: 3 }, type: 'holiday', isHoliday: true },
  { title: 'عید نوروز', date: { month: 1, day: 4 }, type: 'holiday', isHoliday: true },
  { title: 'روز جمهوری اسلامی', date: { month: 1, day: 12 }, type: 'holiday', isHoliday: true },
  { title: 'روز طبیعت', date: { month: 1, day: 13 }, type: 'holiday', isHoliday: true },
  { title: 'رحلت امام خمینی', date: { month: 3, day: 14 }, type: 'holiday', isHoliday: true },
  { title: 'قیام 15 خرداد', date: { month: 3, day: 15 }, type: 'holiday', isHoliday: true },
  { title: 'پیروزی انقلاب اسلامی', date: { month: 11, day: 22 }, type: 'holiday', isHoliday: true },
  { title: 'ملی شدن صنعت نفت', date: { month: 12, day: 29 }, type: 'holiday', isHoliday: true },
  
  // Additional occasions (not holidays)
  { title: 'روز پدر', date: { month: 3, day: 13 }, type: 'occasion', isHoliday: false },
  { title: 'روز مادر', date: { month: 2, day: 20 }, type: 'occasion', isHoliday: false },
  { title: 'شب یلدا', date: { month: 10, day: 30 }, type: 'occasion', isHoliday: false },
  { title: 'روز دانشجو', date: { month: 9, day: 16 }, type: 'occasion', isHoliday: false },
  { title: 'روز معلم', date: { month: 2, day: 12 }, type: 'occasion', isHoliday: false },
];

// Function to get events for a specific Jalali date
export const getEventsForDate = (date: Date): CalendarEvent[] => {
  const jalaliDate = jalaliMoment(date);
  const month = jalaliDate.jMonth() + 1; // jalali-moment months are 0-indexed
  const day = jalaliDate.jDate();
  
  return persianEvents.filter(
    event => event.date.month === month && event.date.day === day
  );
};

// Function to check if a date has events
export const hasEvents = (date: Date): boolean => {
  return getEventsForDate(date).length > 0;
};

// Function to check if a date is a holiday
export const isEventHoliday = (date: Date): boolean => {
  const events = getEventsForDate(date);
  return events.some(event => event.isHoliday);
};
