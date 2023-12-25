import { BarChart01Icon } from '@hashgraph/icons';
import { cn, Navigation, NavigationDropdown, NavigationItem } from '@hashgraph/ui';
import { type NavigationItemProps } from '@hashgraph/ui';
import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { EnhancedView } from '@/components/View';

const orientation = ['vertical', 'horizontal'];
const variant: NavigationItemProps['variant'][] = ['default', 'dark', 'brand'];

const meta: Meta = {
  title: 'Components/Navigation',
  component: Navigation,
  argTypes: {
    orientation: {
      options: orientation,
      control: {
        type: 'radio',
      },
    },
    variant: {
      options: variant,
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    variant: 'default',
    orientation: 'horizontal',
  },
};

export default meta;

const links = [
  { label: 'Dashboard', active: true },
  { label: 'Project', active: false },
  { label: 'Tasks', active: false },
  { label: 'Reporting', active: false },
  { label: 'User', active: false },
];

const DefaultTemplate: StoryFn<NavigationItemProps & { orientation: any }> = ({ orientation, variant, ...args }) => {
  return (
    <EnhancedView prop="Default">
      <nav
        style={{
          padding: '32px',
          width: '100%',
        }}
        className={cn(' flex items-center', {
          'bg-gray-950': variant === 'dark',
          'bg-brand-700': variant === 'brand',
          'bg-base-white': variant === 'default',
        })}
      >
        <Navigation orientation={orientation}>
          <NavigationItem {...args} label="Home" />
          {orientation === 'vertical' && (
            <NavigationDropdown icon={<BarChart01Icon className="w-6 h-6" />} label="Dropdown">
              <NavigationItem {...args} variant={variant} label="Dropdown item 1" />
              <NavigationItem {...args} variant={variant} label="Dropdown item 2" />
            </NavigationDropdown>
          )}
          {links.map((x) => (
            <NavigationItem {...args} variant={variant} active={x.active} key={x.label} label={x.label} />
          ))}
        </Navigation>
      </nav>
    </EnhancedView>
  );
};

export const Default: StoryFn<typeof Navigation> = DefaultTemplate.bind({});
