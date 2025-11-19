'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditableTextFieldProps {
  value: string;
  onSave: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
  label?: string;
  validation?: 'email' | 'url' | 'none';
  required?: boolean;
}

export default function EditableTextField({
  value,
  onSave,
  placeholder = 'Click to edit...',
  multiline = false,
  className = '',
  label,
  validation = 'none',
  required = false,
}: EditableTextFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update internal value when prop changes
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  // Auto-focus when entering edit mode
  useEffect(() => {
    if (isEditing) {
      if (multiline) {
        textareaRef.current?.focus();
        textareaRef.current?.select();
      } else {
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }
  }, [isEditing, multiline]);

  // Validation function
  const validate = (val: string): string | null => {
    // Check required
    if (required && !val.trim()) {
      return 'This field is required';
    }

    // Skip validation if empty and not required
    if (!val.trim()) {
      return null;
    }

    // Email validation
    if (validation === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        return 'Please enter a valid email address';
      }
    }

    // URL validation
    if (validation === 'url') {
      try {
        new URL(val);
        if (!val.startsWith('http://') && !val.startsWith('https://')) {
          return 'URL must start with http:// or https://';
        }
      } catch {
        return 'Please enter a valid URL';
      }
    }

    return null;
  };

  const handleSave = async () => {
    // Validate
    const validationError = validate(currentValue);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (currentValue === value) {
      setIsEditing(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await onSave(currentValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving:', error);
      setError('Failed to save. Please try again.');
      // Revert to original value on error
      setCurrentValue(value);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditing(false);
    setError(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleBlur = () => {
    if (!isLoading) {
      handleSave();
    }
  };

  if (!isEditing) {
    return (
      <div
        role="button"
        aria-label={label ? `Edit ${label}` : 'Edit field'}
        tabIndex={0}
        onClick={() => setIsEditing(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsEditing(true);
          }
        }}
        className={cn(
          'group relative cursor-pointer rounded px-2 py-1 transition-all duration-200',
          'hover:border-dashed hover:border-2 hover:border-blue-400',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          multiline ? 'min-h-[60px]' : '',
          className
        )}
      >
        {value || (
          <span className="text-gray-400 italic">{placeholder}</span>
        )}
        <Pencil
          className="absolute right-2 top-2 h-3 w-3 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>
    );
  }

  if (multiline) {
    return (
      <div className="w-full">
        <textarea
          ref={textareaRef}
          value={currentValue}
          onChange={(e) => {
            setCurrentValue(e.target.value);
            setError(null); // Clear error on change
          }}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={isLoading}
          className={cn(
            'w-full rounded border-2 px-2 py-1 transition-all',
            'focus:outline-none focus:ring-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'min-h-[60px] resize-y',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-blue-500 focus:ring-blue-500',
            className
          )}
          rows={3}
        />
        {error && (
          <p className="text-xs text-red-600 mt-1">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="text"
        value={currentValue}
        onChange={(e) => {
          setCurrentValue(e.target.value);
          setError(null); // Clear error on change
        }}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={isLoading}
        className={cn(
          'w-full rounded border-2 px-2 py-1 transition-all',
          'focus:outline-none focus:ring-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-blue-500 focus:ring-blue-500',
          className
        )}
      />
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}
