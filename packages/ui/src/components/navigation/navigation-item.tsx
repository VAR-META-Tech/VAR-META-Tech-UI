import { Primitive } from '@radix-ui/react-primitive';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { type ElementRef, forwardRef, type ReactNode } from 'react';

import { type ElementProps } from '../../types';
import { cn } from '../../utils/cn';

export const navigationItemVariants = cva(
  'flex justify-between items-center gap-2 rounded-sm text-md font-semibold py-2 px-3 h-10 transition-colors cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-800 focus:shadow-gray-base',
        brand: 'bg-brand-700 text-brand-100 hover:bg-brand-600 hover:text-white focus:shadow-brand-base',
        dark: 'bg-gray-950 text-gray-100 hover:text-white hover:bg-gray-800 focus:shadow-gray-base',
      },
      active: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
    compoundVariants: [
      {
        variant: 'default',
        active: true,
        className: 'text-gray-800 bg-gray-50',
      },
      {
        variant: 'dark',
        active: true,
        className: 'text-white bg-gray-800',
      },
      {
        variant: 'brand',
        active: true,
        className: 'bg-brand-600 text-white',
      },
    ],
  }
);
export interface NavigationItemProps extends ElementProps<'li'>, VariantProps<typeof navigationItemVariants> {
  asChild?: boolean;
  label?: ReactNode;
  icon?: ReactNode;
}

const NavigationItem = forwardRef<ElementRef<'li'>, NavigationItemProps>(
  ({ className, label, icon, children, variant, active, asChild, ...props }, ref) => {
    return (
      <Primitive.li
        asChild={asChild}
        className={cn(navigationItemVariants({ variant, active, className }))}
        ref={ref}
        {...props}
      >
        <div className="flex items-center flex-1 gap-3">
          {icon}
          {label}
        </div>
        {children}
      </Primitive.li>
    );
  }
);

NavigationItem.displayName = 'NavigationItem';

export { NavigationItem };
