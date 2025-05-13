
import React from 'react';
import { Button } from "@/components/ui/button";
import { formatJalaliDate } from '@/lib/jalali';
import { Trash2 } from 'lucide-react';

interface Reminder {
  id: string;
  date: Date;
  title: string;
  description?: string;
}

interface ReminderListProps {
  reminders: Reminder[];
  selectedDate: Date;
  onDeleteReminder: (id: string) => void;
}

const ReminderList: React.FC<ReminderListProps> = ({
  reminders,
  selectedDate,
  onDeleteReminder,
}) => {
  // Filter reminders for the selected date
  const filteredReminders = reminders.filter(
    reminder => {
      const reminderDate = new Date(reminder.date);
      const selectedDateTime = new Date(selectedDate);
      return (
        reminderDate.getDate() === selectedDateTime.getDate() &&
        reminderDate.getMonth() === selectedDateTime.getMonth() &&
        reminderDate.getFullYear() === selectedDateTime.getFullYear()
      );
    }
  );
  
  if (filteredReminders.length === 0) {
    return (
      <div className="mt-4 p-4 bg-muted/30 rounded-lg text-center">
        <p className="text-muted-foreground">
          یادآوری برای {formatJalaliDate(selectedDate)} وجود ندارد
        </p>
      </div>
    );
  }
  
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">یادآورهای {formatJalaliDate(selectedDate)}</h3>
      <div className="space-y-2">
        {filteredReminders.map((reminder) => (
          <div 
            key={reminder.id} 
            className="p-3 bg-card rounded-lg border flex justify-between items-start"
          >
            <div>
              <h4 className="font-medium">{reminder.title}</h4>
              {reminder.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {reminder.description}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteReminder(reminder.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReminderList;
