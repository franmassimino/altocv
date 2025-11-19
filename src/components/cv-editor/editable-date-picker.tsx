'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

interface EditableDatePickerProps {
  value: string | null;
  onSave: (date: string | null) => void;
  allowCurrent?: boolean;
  label?: string;
  className?: string;
}

export default function EditableDatePicker({
  value,
  onSave,
  allowCurrent = false,
  label,
  className = '',
}: EditableDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCurrent, setIsCurrent] = useState(value === 'current' || value === 'present');

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const isoDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
      onSave(isoDate);
      setIsOpen(false);
      setIsCurrent(false);
    }
  };

  const handleCurrentToggle = (checked: boolean) => {
    setIsCurrent(checked);
    if (checked) {
      onSave('current');
      setIsOpen(false);
    } else {
      onSave(null);
    }
  };

  const formatDisplayDate = (dateValue: string | null): string => {
    if (!dateValue) return 'Not set';
    if (dateValue === 'current' || dateValue === 'present') return 'Present';

    try {
      const date = parseISO(dateValue);
      return format(date, 'MMM yyyy'); // e.g., "Jan 2020"
    } catch (error) {
      console.error('Invalid date format:', dateValue, error);
      return 'Invalid date';
    }
  };

  const parseDate = (dateValue: string | null): Date | undefined => {
    if (!dateValue || dateValue === 'current' || dateValue === 'present') {
      return undefined;
    }

    try {
      return parseISO(dateValue);
    } catch (error) {
      console.error('Error parsing date:', dateValue, error);
      return undefined;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="button"
          aria-label={label ? `Edit ${label}` : 'Edit date'}
          className={cn(
            'justify-start text-left font-normal transition-all duration-200',
            'hover:border-dashed hover:border-2 hover:border-blue-400',
            !value && 'text-gray-400',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDisplayDate(value)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <Calendar
            mode="single"
            selected={parseDate(value)}
            onSelect={handleDateSelect}
            disabled={(date) => {
              // Prevent future dates for end dates unless current job
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date > today;
            }}
            initialFocus
          />
          {allowCurrent && (
            <div className="flex items-center space-x-2 border-t pt-3 mt-2">
              <Checkbox
                id="current-checkbox"
                checked={isCurrent}
                onCheckedChange={handleCurrentToggle}
              />
              <label
                htmlFor="current-checkbox"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Currently working here (Present)
              </label>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
