
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';

// Prayer times calculation utility
export const getPrayerTimes = (latitude: number, longitude: number, date: Date): {
  fajr: Date;
  sunrise: Date; 
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
} => {
  const coordinates = new Coordinates(latitude, longitude);
  const params = CalculationMethod.Tehran();
  const prayerTimes = new PrayerTimes(coordinates, date, params);

  return {
    fajr: prayerTimes.fajr,
    sunrise: prayerTimes.sunrise,
    dhuhr: prayerTimes.dhuhr,
    asr: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isha: prayerTimes.isha
  };
};

export const formatPrayerTime = (date: Date): string => {
  return date.toLocaleTimeString('fa-IR', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
};

export const getPrayerTimesForLocation = (latitude: number, longitude: number, date: Date) => {
  const prayerTimes = getPrayerTimes(latitude, longitude, date);
  
  return {
    fajr: formatPrayerTime(prayerTimes.fajr),
    sunrise: formatPrayerTime(prayerTimes.sunrise),
    dhuhr: formatPrayerTime(prayerTimes.dhuhr),
    asr: formatPrayerTime(prayerTimes.asr),
    maghrib: formatPrayerTime(prayerTimes.maghrib),
    isha: formatPrayerTime(prayerTimes.isha)
  };
};
