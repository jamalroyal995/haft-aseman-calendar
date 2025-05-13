
import React, { useState } from 'react';
import { Menu, Settings, Info, Calendar, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useTheme } from '@/hooks/use-theme';
import { DateConverter } from '@/components/DateConverter';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">تقویم شمسی</h1>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">منو</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="text-right">منو</SheetTitle>
              </SheetHeader>
              
              <Tabs defaultValue="settings" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="settings">تنظیمات</TabsTrigger>
                  <TabsTrigger value="converter">تبدیل تاریخ</TabsTrigger>
                  <TabsTrigger value="about">درباره ما</TabsTrigger>
                </TabsList>
                
                <TabsContent value="settings" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>حالت تاریک</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      >
                        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>فونت</span>
                      <select
                        className="p-2 rounded-md border border-border bg-background"
                        onChange={(e) => document.body.style.fontFamily = e.target.value}
                      >
                        <option value="'Vazirmatn', 'Tahoma', sans-serif">وزیرمتن</option>
                        <option value="'Samim', 'Tahoma', sans-serif">صمیم</option>
                        <option value="'Sahel', 'Tahoma', sans-serif">ساحل</option>
                      </select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="converter" className="mt-4">
                  <DateConverter />
                </TabsContent>
                
                <TabsContent value="about" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">درباره ما</h3>
                    <p>
                      تقویم شمسی یک اپلیکیشن تقویم پیشرفته است که به شما امکان مدیریت 
                      یادآورها و مشاهده اوقات شرعی را می‌دهد. این اپلیکیشن از تقویم هجری 
                      شمسی، هجری قمری و میلادی پشتیبانی می‌کند.
                    </p>
                    <p>نسخه: ۱.۰.۰</p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <SheetFooter className="mt-6 flex justify-center">
                <p className="text-xs text-muted-foreground">
                  © ۱۴۰۲ - تمامی حقوق محفوظ است
                </p>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      
      <main className="container mx-auto max-w-4xl px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
