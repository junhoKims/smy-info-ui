import Button from '@/core/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'core/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const BigSize: Story = {
  args: {
    size: 'large',
    children: 'Button',
  },
};

export default meta;
