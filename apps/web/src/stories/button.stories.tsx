import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { CircleIcon, LogOut01Icon, SearchLgIcon } from '@var-meta/icons';
import { Button, type ButtonProps } from '@var-meta/ui';

import { EnhancedView, View, ViewGroup } from '@/components/View';

const variants: ButtonProps['variant'][] = ['solid', 'ghost', 'link', 'outline'];
const color: ButtonProps['color'][] = [
  'default',
  'primary',
  'secondary',
  'tertiary',
  'gray',
  'error',
  'success',
  'warning',
];
const sizes: ButtonProps['size'][] = ['sm', 'md', 'lg', 'xl', '2xl'];
const radius: ButtonProps['radius'][] = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];

const meta: Meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
    },
    color: {
      options: color,
      control: { type: 'select' },
    },
    size: {
      options: sizes,
      control: { type: 'select' },
    },
    radius: {
      options: radius,
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    dotLeading: {
      control: { type: 'boolean' },
    },
    iconOnly: {
      control: { type: 'boolean' },
    },
    freeHeight: {
      control: { type: 'boolean' },
    },
    fullWidth: {
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

const DefaultTemplate: StoryFn<ButtonProps> = (args) => {
  return (
    <EnhancedView prop="Default">
      <Button {...args}>{args.iconOnly ? <CircleIcon /> : 'Button CTA'}</Button>
    </EnhancedView>
  );
};

export const Default: StoryFn<typeof Button> = DefaultTemplate.bind({});

const VariantTemplate: StoryFn<ButtonProps> = (args) => {
  const items = variants.map((variant) => (
    <React.Fragment key={variant}>
      <View prop="variant" value={variant}>
        <Button {...args} key={variant} variant={variant} className="capitalize">
          {variant}
        </Button>
      </View>
    </React.Fragment>
  ));

  return <ViewGroup>{items}</ViewGroup>;
};

export const Variant: StoryFn<typeof Button> = VariantTemplate.bind({});

const StatesTemplate: StoryFn<ButtonProps> = (args) => {
  const disabledItems = (
    <>
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant} className="capitalize" disabled>
          {variant}
        </Button>
      ))}
    </>
  );

  const loadingItems = (
    <>
      {variants.map((variant) => (
        <Button key={variant} variant={variant} {...args} className="capitalize" loading></Button>
      ))}
    </>
  );

  return (
    <ViewGroup>
      <View prop="disabled" value={'true'} direction="row">
        {disabledItems}
      </View>
      <View prop="loading" value={'true'} direction="row">
        {loadingItems}
      </View>
    </ViewGroup>
  );
};

export const States: StoryFn<typeof Button> = StatesTemplate.bind({});

const IconsTemplate: StoryFn<ButtonProps> = (args) => {
  return (
    <View prop="iconOnly" justify="start" value="true">
      {variants.map((variant) =>
        sizes.map((size) => (
          <React.Fragment key={size + variant}>
            <Button {...args} iconOnly key={size} variant={variant} size={size} className="capitalize">
              <SearchLgIcon />
            </Button>
          </React.Fragment>
        ))
      )}
    </View>
  );
};

export const WithIcon: StoryFn<typeof Button> = IconsTemplate.bind({});

const FreeHeightTemplate: StoryFn<ButtonProps> = (args) => {
  return (
    <View prop="freeHeight" justify="start" value="true">
      {variants.map((variant) =>
        sizes.map((size) => (
          <React.Fragment key={size + variant}>
            <Button {...args} className="flex-col" freeHeight key={size} variant={variant} size={size}>
              <LogOut01Icon />
              Check In
            </Button>
          </React.Fragment>
        ))
      )}
    </View>
  );
};

export const WithFreeHeight: StoryFn<typeof Button> = FreeHeightTemplate.bind({});
