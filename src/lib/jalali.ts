
import jMoment from 'jalali-moment';

export const toJalali = (date: Date): string => {
  return jMoment(date).format('jYYYY/jMM/jDD');
};

export const toGregorian = (jalaliDate: string): Date => {
  return jMoment(jalaliDate, 'jYYYY/jMM/jDD').toDate();
};

export const getJalaliMonth = (date: Date): number => {
  return parseInt(jMoment(date).format('jMM'));
};

export const getJalaliYear = (date: Date): number => {
  return parseInt(jMoment(date).format('jYYYY'));
};

export const getJalaliDay = (date: Date): number => {
  return parseInt(jMoment(date).format('jDD'));
};

export const getMonthDays = (year: number, month: number): Date[] => {
  const startOfMonth = jMoment(`${year}/${month}/1`, 'jYYYY/jMM/jDD');
  const endOfMonth = startOfMonth.clone().endOf('jMonth');
  const daysInMonth = endOfMonth.jDate();
  
  const days: Date[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(
      jMoment(`${year}/${month}/${i}`, 'jYYYY/jMM/jDD').toDate()
    );
  }
  
  return days;
};

export const getMonthStartDayOfWeek = (year: number, month: number): number => {
  const startOfMonth = jMoment(`${year}/${month}/1`, 'jYYYY/jMM/jDD');
  // Get day of week (0 = Saturday in jalali-moment)
  return startOfMonth.day();
};

export const getMonthName = (month: number): string => {
  const monthNames = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 
    'مرداد', 'شهریور', 'مهر', 'آبان', 
    'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  return monthNames[month - 1];
};

export const getDayName = (date: Date): string => {
  const dayNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
  // jalali-moment day: 0 = Saturday, 6 = Friday
  return dayNames[jMoment(date).day()];
};

export const formatJalaliDate = (date: Date): string => {
  return `${getDayName(date)} ${getJalaliDay(date)} ${getMonthName(getJalaliMonth(date))} ${getJalaliYear(date)}`;
};

export const isSameJalaliDay = (date1: Date, date2: Date): boolean => {
  return (
    getJalaliYear(date1) === getJalaliYear(date2) &&
    getJalaliMonth(date1) === getJalaliMonth(date2) &&
    getJalaliDay(date1) === getJalaliDay(date2)
  );
};

// Check if a date is a holiday (Fridays or specific national holidays)
export const isHoliday = (date: Date): boolean => {
  // In Iranian calendar, Friday is the weekend holiday
  const dayOfWeek = jMoment(date).day();
  if (dayOfWeek === 6) { // Friday is day 6 in jalali-moment
    return true;
  }
  
  // Official holidays in the Iranian calendar
  const month = getJalaliMonth(date);
  const day = getJalaliDay(date);
  
  // This is a simplified list of some Iranian holidays
  // You may want to expand this with a more complete list
  const officialHolidays = [
    // Norouz holidays (1/1 to 1/4)
    { month: 1, day: 1 },  // New Year
    { month: 1, day: 2 },
    { month: 1, day: 3 },
    { month: 1, day: 4 },
    { month: 1, day: 12 }, // Islamic Republic Day
    { month: 1, day: 13 }, // Nature Day
    { month: 3, day: 14 }, // Passing of Imam Khomeini
    { month: 3, day: 15 }, // Khordad uprising
    { month: 11, day: 22 }, // Victory of the Islamic Revolution
    { month: 12, day: 29 }, // Oil Industry Nationalization
  ];
  
  return officialHolidays.some(holiday => 
    holiday.month === month && holiday.day === day
  );
};
