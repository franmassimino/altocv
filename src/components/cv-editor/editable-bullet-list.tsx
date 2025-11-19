'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, Plus } from 'lucide-react';
import EditableTextField from './editable-text-field';
import { cn } from '@/lib/utils';

interface EditableBulletListProps {
  items: string[];
  onUpdate: (items: string[]) => void;
}

interface SortableBulletItemProps {
  id: string;
  value: string;
  onSave: (value: string) => void;
  onDelete: () => void;
}

function SortableBulletItem({ id, value, onSave, onDelete }: SortableBulletItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group flex items-start gap-2 rounded py-1 transition-opacity',
        isDragging && 'opacity-50'
      )}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="mt-1 cursor-grab active:cursor-grabbing focus:outline-none"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4 text-gray-400 hover:text-gray-600" />
      </button>

      {/* Editable bullet content */}
      <div className="flex-1">
        <EditableTextField
          value={value}
          onSave={onSave}
          placeholder="Enter bullet point..."
          className="text-sm"
        />
      </div>

      {/* Delete button - visible on hover */}
      <button
        onClick={onDelete}
        className="mt-1 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
        aria-label="Delete bullet point"
      >
        <X className="h-4 w-4 text-red-500 hover:text-red-700" />
      </button>
    </div>
  );
}

export default function EditableBulletList({ items, onUpdate }: EditableBulletListProps) {
  const [itemsWithIds, setItemsWithIds] = useState(() =>
    items.map((item, index) => ({ id: `bullet-${index}-${Date.now()}`, value: item }))
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItemsWithIds((current) => {
        const oldIndex = current.findIndex((item) => item.id === active.id);
        const newIndex = current.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(current, oldIndex, newIndex);

        // Update parent with new order
        onUpdate(newItems.map((item) => item.value));

        return newItems;
      });
    }
  };

  const handleItemSave = (id: string, newValue: string) => {
    setItemsWithIds((current) => {
      const newItems = current.map((item) =>
        item.id === id ? { ...item, value: newValue } : item
      );

      onUpdate(newItems.map((item) => item.value));

      return newItems;
    });
  };

  const handleDelete = (id: string) => {
    setItemsWithIds((current) => {
      const newItems = current.filter((item) => item.id !== id);
      onUpdate(newItems.map((item) => item.value));
      return newItems;
    });
  };

  const handleAdd = () => {
    const newItem = {
      id: `bullet-${itemsWithIds.length}-${Date.now()}`,
      value: '',
    };

    setItemsWithIds((current) => {
      const newItems = [...current, newItem];
      onUpdate(newItems.map((item) => item.value));
      return newItems;
    });
  };

  return (
    <div className="space-y-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={itemsWithIds.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {itemsWithIds.map((item) => (
            <SortableBulletItem
              key={item.id}
              id={item.id}
              value={item.value}
              onSave={(newValue) => handleItemSave(item.id, newValue)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </SortableContext>
      </DndContext>

      {/* Add button */}
      <button
        onClick={handleAdd}
        className="flex items-center gap-2 rounded px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Plus className="h-4 w-4" />
        Add Bullet Point
      </button>
    </div>
  );
}
