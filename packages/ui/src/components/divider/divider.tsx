import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '../../utils/cn';

const dividerVariants = tv({
  base: [
    'flex shrink-0 justify-center whitespace-nowrap text-center',
    'before:border-border-secondary after:border-border-secondary',
    'before:self-center before:content-[""] after:self-center after:content-[""]',
  ],
  variants: {
    orientation: {
      horizontal: 'w-full before:border-t after:border-t',
      vertical: 'h-full flex-col self-stretch before:h-full before:border-l after:h-full after:border-l',
    },
    align: {
      left: '',
      right: '',
      center: 'justify-center text-center',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    align: 'center',
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      align: 'left',
      className: 'before:w-[10%] after:w-[90%]',
    },
    {
      orientation: 'horizontal',
      align: 'right',
      className: 'before:w-[90%] after:w-[10%]',
    },
    {
      orientation: 'horizontal',
      align: 'center',
      className: 'before:w-full after:w-full',
    },
  ],
});

const dividerWithoutChildVariants = tv({
  base: 'border-border-secondary',
  variants: {
    orientation: {
      horizontal: 'w-full border-t',
      vertical: 'h-full border-l',
    },
  },
});

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dividerVariants> {}

const Divider = React.forwardRef<React.ElementRef<'div'>, DividerProps>(
  ({ className, align = 'center', orientation = 'horizontal', children, ...props }, ref) => {
    if (!children)
      return <hr className={dividerWithoutChildVariants({ orientation, className })} ref={ref as any} {...props} />;
    return (
      <div className={dividerVariants({ align, orientation, className })} ref={ref} {...props}>
        <span className={cn('inline-block', orientation === 'horizontal' ? 'px-2' : 'py-2')}>{children}</span>
      </div>
    );
  }
);
Divider.displayName = 'Divider';

export { Divider };
