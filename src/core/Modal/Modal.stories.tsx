import { useState } from 'react';
import Modal from '@/core/Modal';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'core/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Modal>;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    return (() => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <button onClick={() => setOpen((open) => !open)}>CLICK</button>
          <Modal open={open} onClose={() => setOpen(false)} />
        </>
      );
    })();
  },
};

export default meta;
