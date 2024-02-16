import type { Meta, StoryFn } from '@storybook/react';
import { Input, type InputProps } from '@var-ui/core';
import { HelpCircleIcon, Mail01Icon } from '@var-ui/icons';
import React from 'react';

import { EnhancedView } from '@/components/View';

const variants: InputProps['variant'][] = ['default', 'destructive'];
const sizes: InputProps['size'][] = ['sm', 'md'];

const meta: Meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    prefix: {
      control: { type: 'boolean' },
    },
    suffix: {
      control: { type: 'boolean' },
    },
    variant: {
      options: variants,
      control: { type: 'select' },
    },
    size: {
      options: sizes,
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    docs: {
      page: null,
    },
    controls: { expanded: true },
  },
};

export default meta;

const DefaultTemplate: StoryFn<InputProps> = ({ prefix, suffix, ...args }) => {
  return (
    <EnhancedView prop="Default">
      <Input
        {...args}
        prefix={prefix ? <Mail01Icon /> : undefined}
        suffix={suffix ? <HelpCircleIcon /> : undefined}
        placeholder="Placeholder"
      />
    </EnhancedView>
  );
};

export const Default: StoryFn<typeof Input> = DefaultTemplate.bind({});
