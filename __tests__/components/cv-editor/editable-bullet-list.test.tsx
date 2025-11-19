import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditableBulletList from '@/components/cv-editor/editable-bullet-list';

describe('EditableBulletList', () => {
  it('renders list of bullets', () => {
    render(
      <EditableBulletList
        items={['Bullet 1', 'Bullet 2', 'Bullet 3']}
        onUpdate={vi.fn()}
      />
    );

    expect(screen.getByText('Bullet 1')).toBeInTheDocument();
    expect(screen.getByText('Bullet 2')).toBeInTheDocument();
    expect(screen.getByText('Bullet 3')).toBeInTheDocument();
  });

  it('shows Add Bullet button', () => {
    render(
      <EditableBulletList
        items={['Bullet 1']}
        onUpdate={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /add bullet/i })).toBeInTheDocument();
  });

  it('adds new bullet when Add Bullet is clicked', async () => {
    const onUpdate = vi.fn();
    const user = userEvent.setup();

    render(
      <EditableBulletList
        items={['Existing']}
        onUpdate={onUpdate}
      />
    );

    const addButton = screen.getByRole('button', { name: /add bullet/i });
    await user.click(addButton);

    expect(onUpdate).toHaveBeenCalledWith(['Existing', '']);
  });

  it('shows delete button for each bullet', () => {
    render(
      <EditableBulletList
        items={['Bullet 1', 'Bullet 2']}
        onUpdate={vi.fn()}
      />
    );

    const deleteButtons = screen.getAllByLabelText(/delete bullet/i);
    expect(deleteButtons).toHaveLength(2);
  });

  it('deletes bullet when delete button is clicked', async () => {
    const onUpdate = vi.fn();
    const user = userEvent.setup();

    render(
      <EditableBulletList
        items={['Keep', 'Delete']}
        onUpdate={onUpdate}
      />
    );

    const deleteButtons = screen.getAllByLabelText(/delete bullet/i);
    await user.click(deleteButtons[1]); // Delete second item

    expect(onUpdate).toHaveBeenCalledWith(['Keep']);
  });

  it('renders empty list with Add button', () => {
    render(
      <EditableBulletList
        items={[]}
        onUpdate={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /add bullet/i })).toBeInTheDocument();
  });

  it('shows drag handles for reordering', () => {
    render(
      <EditableBulletList
        items={['Item 1', 'Item 2']}
        onUpdate={vi.fn()}
      />
    );

    const dragHandles = screen.getAllByLabelText(/drag to reorder/i);
    expect(dragHandles).toHaveLength(2);
  });
});
