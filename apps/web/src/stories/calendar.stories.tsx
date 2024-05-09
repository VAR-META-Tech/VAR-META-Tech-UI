import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Calendar, type CalendarProps } from '@var-ui/core';

import { EnhancedView } from '@/components/View';

const mode = ['single', 'multiple', 'range'];

const meta: Meta = {
  title: 'Components/DatePicker/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      options: mode,
      control: { type: 'select' },
    },
  },
  args: {},
};

export default meta;

const DefaultTemplate: StoryFn<CalendarProps> = ({ mode = 'single', ...args }) => {
  const [selected, setSelect] = useState<any>();

  return (
    <EnhancedView prop="Default">
      <Calendar selected={selected} onSelect={setSelect as any} mode={mode} {...args} />
    </EnhancedView>
  );
};

export const Default: StoryFn<typeof Calendar> = DefaultTemplate.bind({});
