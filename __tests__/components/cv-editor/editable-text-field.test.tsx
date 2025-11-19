import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditableTextField from '@/components/cv-editor/editable-text-field';

describe('EditableTextField', () => {
  it('renders value in view mode', () => {
    render(
      <EditableTextField
        value="Test Value"
        onSave={vi.fn()}
        label="test field"
      />
    );

    expect(screen.getByText('Test Value')).toBeInTheDocument();
  });

  it('shows placeholder when value is empty', () => {
    render(
      <EditableTextField
        value=""
        onSave={vi.fn()}
        placeholder="Click to edit"
        label="test field"
      />
    );

    expect(screen.getByText('Click to edit')).toBeInTheDocument();
  });

  it('enters edit mode on click', async () => {
    const user = userEvent.setup();
    render(
      <EditableTextField
        value="Test Value"
        onSave={vi.fn()}
        label="test field"
      />
    );

    const viewElement = screen.getByRole('button', { name: /edit test field/i });
    await user.click(viewElement);

    const input = screen.getByDisplayValue('Test Value');
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it('saves on Enter key press', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();

    render(
      <EditableTextField
        value="Initial"
        onSave={onSave}
        label="test field"
      />
    );

    await user.click(screen.getByRole('button'));
    const input = screen.getByDisplayValue('Initial');

    await user.clear(input);
    await user.type(input, 'Updated Value');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith('Updated Value');
    });
  });

  it('cancels editing on Escape key', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();

    render(
      <EditableTextField
        value="Initial"
        onSave={onSave}
        label="test field"
      />
    );

    await user.click(screen.getByRole('button'));
    const input = screen.getByDisplayValue('Initial');

    await user.clear(input);
    await user.type(input, 'Changed');
    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(onSave).not.toHaveBeenCalled();
      expect(screen.getByText('Initial')).toBeInTheDocument();
    });
  });

  it('saves on blur', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();

    render(
      <div>
        <EditableTextField
          value="Initial"
          onSave={onSave}
          label="test field"
        />
        <button>Outside</button>
      </div>
    );

    await user.click(screen.getByRole('button', { name: /edit test field/i }));
    const input = screen.getByDisplayValue('Initial');

    await user.clear(input);
    await user.type(input, 'Updated');

    await user.click(screen.getByRole('button', { name: 'Outside' }));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith('Updated');
    });
  });

  it('uses textarea for multiline mode', async () => {
    const user = userEvent.setup();

    render(
      <EditableTextField
        value="Multi\nLine"
        onSave={vi.fn()}
        multiline={true}
        label="test field"
      />
    );

    await user.click(screen.getByRole('button'));
    const textarea = document.querySelector('textarea');

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('Multi\nLine');
  });

  it('validates email format', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();

    render(
      <EditableTextField
        value=""
        onSave={onSave}
        validation="email"
        label="email"
      />
    );

    await user.click(screen.getByRole('button'));
    const input = screen.getByRole('textbox');

    await user.type(input, 'invalid-email');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      expect(onSave).not.toHaveBeenCalled();
    });
  });

  it('validates URL format', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();

    render(
      <EditableTextField
        value=""
        onSave={onSave}
        validation="url"
        label="website"
      />
    );

    await user.click(screen.getByRole('button'));
    const input = screen.getByRole('textbox');

    await user.type(input, 'not-a-url');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid URL')).toBeInTheDocument();
      expect(onSave).not.toHaveBeenCalled();
    });
  });

  it('enforces required fields', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();

    render(
      <EditableTextField
        value="Initial"
        onSave={onSave}
        required={true}
        label="required field"
      />
    );

    await user.click(screen.getByRole('button'));
    const input = screen.getByDisplayValue('Initial');

    await user.clear(input);
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(onSave).not.toHaveBeenCalled();
    });
  });
});
