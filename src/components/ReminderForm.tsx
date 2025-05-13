
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatJalaliDate } from '@/lib/jalali';

interface ReminderFormProps {
  date: Date;
  onAddReminder: (reminder: { title: string; description: string; date: Date }) => void;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ date, onAddReminder }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddReminder({
      title,
      description,
      date,
    });
    
    setTitle('');
    setDescription('');
  };
  
  return (
    <div className="mt-4 p-4 bg-card rounded-lg border">
      <h3 className="text-lg font-semibold mb-2">یادآور جدید</h3>
      <p className="text-sm text-muted-foreground mb-4">
        برای تاریخ {formatJalaliDate(date)}
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="عنوان یادآور"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
            required
          />
        </div>
        
        <div>
          <Textarea
            placeholder="توضیحات (اختیاری)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full"
            rows={3}
          />
        </div>
        
        <Button type="submit" className="w-full">
          افزودن یادآور
        </Button>
      </form>
    </div>
  );
};

export default ReminderForm;
