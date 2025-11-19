import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditableDatePicker from '@/components/cv-editor/editable-date-picker';

describe('EditableDatePicker', () => {
  it('renders formatted date', () => {
    render(
      <EditableDatePicker
        value="2023-06-15"
        onSave={vi.fn()}
        label="start date"
      />
    );

    expect(screen.getByRole('button', { name: /edit start date/i })).toHaveTextContent('Jun 2023');
  });

  it('shows "Not set" for null value', () => {
    render(
      <EditableDatePicker
        value={null}
        onSave={vi.fn()}
        label="date"
      />
    );

    expect(screen.getByText('Not set')).toBeInTheDocument();
  });

  it('shows "Present" for current value', () => {
    render(
      <EditableDatePicker
        value="current"
        onSave={vi.fn()}
        allowCurrent={true}
        label="end date"
      />
    );

    expect(screen.getByText('Present')).toBeInTheDocument();
  });

  it('opens calendar on click', async () => {
    const user = userEvent.setup();

    render(
      <EditableDatePicker
        value="2023-06-15"
        onSave={vi.fn()}
        label="date"
      />
    );

    await user.click(screen.getByRole('button', { name: /edit date/i }));

    // Calendar should be visible (check for role grid which calendar uses)
    const calendar = await screen.findByRole('grid');
    expect(calendar).toBeInTheDocument();
  });

  it('shows Present checkbox when allowCurrent is true', async () => {
    const user = userEvent.setup();

    render(
      <EditableDatePicker
        value="2023-06-15"
        onSave={vi.fn()}
        allowCurrent={true}
        label="date"
      />
    );

    await user.click(screen.getByRole('button'));

    expect(await screen.findByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText(/currently working here/i)).toBeInTheDocument();
  });

  it('calls onSave with "current" when Present is checked', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();

    render(
      <EditableDatePicker
        value="2023-06-15"
        onSave={onSave}
        allowCurrent={true}
        label="date"
      />
    );

    await user.click(screen.getByRole('button'));
    const checkbox = await screen.findByRole('checkbox');
    await user.click(checkbox);

    expect(onSave).toHaveBeenCalledWith('current');
  });
});
