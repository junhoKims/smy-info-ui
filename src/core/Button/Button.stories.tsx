import { MemoryRouter } from 'react-router-dom';
import Button from '@/core/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'core/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const TypeButton: Story = {
  args: {
    as: 'button',
    children: 'BUTTON',
  },
};

export const TypeAnchor: Story = {
  args: {
    as: 'a',
    href: '/',
    children: 'BUTTON',
  },
};

export default meta;
