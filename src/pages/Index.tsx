
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import CalendarHeader from '@/components/CalendarHeader';
import CalendarGrid from '@/components/CalendarGrid';
import ReminderForm from '@/components/ReminderForm';
import ReminderList from '@/components/ReminderList';
import PrayerTimesDialog from '@/components/PrayerTimesDialog';
import { getJalaliMonth, getJalaliYear, getMonthDays } from '@/lib/jalali';
import { v4 as uuidv4 } from 'uuid';

interface Reminder {
  id: string;
  date: Date;
  title: string;
  description?: string;
}

const loadReminders = (): Reminder[] => {
  const saved = localStorage.getItem('reminders');
  if (!saved) return [];
  
  try {
    // Parse saved reminders and convert date strings back to Date objects
    return JSON.parse(saved).map((reminder: any) => ({
      ...reminder,
      date: new Date(reminder.date)
    }));
  } catch (error) {
    console.error('Failed to load reminders:', error);
    return [];
  }
};

const saveReminders = (reminders: Reminder[]) => {
  localStorage.setItem('reminders', JSON.stringify(reminders));
};

const Index = () => {
  const { toast } = useToast();
  const today = new Date();
  
  // Calendar state
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [currentYear, setCurrentYear] = useState(getJalaliYear(today));
  const [currentMonth, setCurrentMonth] = useState(getJalaliMonth(today));
  const [days, setDays] = useState<Date[]>([]);
  
  // Reminders state
  const [reminders, setReminders] = useState<Reminder[]>(loadReminders());
  
  // Prayer times dialog state
  const [showPrayerTimes, setShowPrayerTimes] = useState(false);
  
  // Load days for current month
  useEffect(() => {
    setDays(getMonthDays(currentYear, currentMonth));
  }, [currentYear, currentMonth]);
  
  // Save reminders to localStorage when they change
  useEffect(() => {
    saveReminders(reminders);
  }, [reminders]);
  
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const handleAddReminder = (reminder: { title: string; description: string; date: Date }) => {
    const newReminder = {
      ...reminder,
      id: uuidv4(),
    };
    
    setReminders([...reminders, newReminder]);
    
    toast({
      title: "یادآور اضافه شد",
      description: `یادآور "${reminder.title}" با موفقیت اضافه شد.`,
    });
  };
  
  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    
    toast({
      title: "یادآور حذف شد",
      description: "یادآور با موفقیت حذف شد.",
    });
  };
  
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">تقویم شمسی</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CalendarHeader
            year={currentYear}
            month={currentMonth}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onShowPrayerTimes={() => setShowPrayerTimes(true)}
          />
          
          <CalendarGrid
            year={currentYear}
            month={currentMonth}
            days={days}
            reminders={reminders}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          
          <ReminderList
            reminders={reminders}
            selectedDate={selectedDate}
            onDeleteReminder={handleDeleteReminder}
          />
        </div>
        
        <div>
          <ReminderForm
            date={selectedDate}
            onAddReminder={handleAddReminder}
          />
        </div>
      </div>
      
      <PrayerTimesDialog
        isOpen={showPrayerTimes}
        onClose={() => setShowPrayerTimes(false)}
        date={selectedDate}
      />
    </div>
  );
};

export default Index;
