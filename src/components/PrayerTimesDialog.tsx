
import React, { useEffect, useState } from 'react';
import { getPrayerTimesForLocation } from '@/lib/prayerTimes';
import { formatJalaliDate } from '@/lib/jalali';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PrayerTimesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
}

// Prayer times icons
const PrayerIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PrayerTimesDialog: React.FC<PrayerTimesDialogProps> = ({
  isOpen,
  onClose,
  date,
}) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<{
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  } | null>(null);
  
  const [locationError, setLocationError] = useState<string | null>(null);
  
  // Default to Tehran if geolocation fails
  const defaultLocation = { lat: 35.6892, lng: 51.3890 };
  
  useEffect(() => {
    if (isOpen) {
      // Try to get user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setLocationError(null);
          
          const times = getPrayerTimesForLocation(latitude, longitude, date);
          setPrayerTimes(times);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationError('دسترسی به موقعیت مکانی امکان پذیر نیست. از موقعیت پیش فرض (تهران) استفاده می‌شود.');
          
          // Use default location (Tehran)
          setLocation(defaultLocation);
          const times = getPrayerTimesForLocation(defaultLocation.lat, defaultLocation.lng, date);
          setPrayerTimes(times);
        }
      );
    }
  }, [isOpen, date]);
  
  const prayerTimesList = [
    { name: 'اذان صبح', time: prayerTimes?.fajr },
    { name: 'طلوع آفتاب', time: prayerTimes?.sunrise },
    { name: 'اذان ظهر', time: prayerTimes?.dhuhr },
    { name: 'اذان عصر', time: prayerTimes?.asr },
    { name: 'اذان مغرب', time: prayerTimes?.maghrib },
    { name: 'اذان عشا', time: prayerTimes?.isha },
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            اوقات شرعی
          </DialogTitle>
          <DialogDescription className="text-center">
            {formatJalaliDate(date)}
          </DialogDescription>
        </DialogHeader>
        
        {locationError && (
          <div className="mb-4 p-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-md text-sm">
            {locationError}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          {prayerTimesList.map((prayer, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <PrayerIcon />
                <span className="font-medium">{prayer.name}</span>
              </div>
              <span className="text-lg ltr font-semibold text-primary">
                {prayer.time || '--:--'}
              </span>
            </div>
          ))}
        </div>
        
        <div className="text-center text-sm text-muted-foreground mt-2">
          {location
            ? `موقعیت: عرض جغرافیایی ${location.lat.toFixed(4)}, طول جغرافیایی ${location.lng.toFixed(4)}`
            : 'در حال دریافت موقعیت مکانی...'
          }
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrayerTimesDialog;
