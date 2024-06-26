import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Textarea, type TextareaProps } from '@var-meta/ui';

import { EnhancedView } from '@/components/View';

const variants: TextareaProps['variant'][] = ['default', 'destructive'];
const sizes: TextareaProps['size'][] = ['sm', 'md'];

const meta: Meta = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
    },
    label: {
      control: { type: 'text' },
    },
    helperText: {
      control: { type: 'text' },
    },
    size: {
      options: sizes,
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: {
    placeholder: 'Placeholder',
    helperText: 'This is a hint text to help user.',
    label: 'Label',
    fullWidth: true,
  },
  parameters: {
    docs: {
      page: null,
    },
    controls: { expanded: true },
  },
};

export default meta;

const DefaultTemplate: StoryFn<TextareaProps> = ({ ...args }) => {
  return (
    <EnhancedView prop="Default">
      <Textarea {...args} />
    </EnhancedView>
  );
};

export const Default: StoryFn<typeof Textarea> = DefaultTemplate.bind({});
