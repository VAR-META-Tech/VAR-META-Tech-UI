import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { tv, type VariantProps } from 'tailwind-variants';

import { useDOMRef } from '../../hooks';
import { cn } from '../../utils/cn';
import { radiusVariant } from '../../utils/variant-common';
import { Indicator, type IndicatorProps } from './indicator';

const avatarVariants = tv({
  base: 'bg-background-tertiary relative z-[1] flex shrink-0 overflow-hidden',
  variants: {
    size: {
      xs: 'h-6 w-6',
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-14 w-14',
      '2xl': 'h-16 w-16',
      '3xl': 'w-18 h-18 shadow-md',
      '4xl': 'h-24 w-24 shadow-lg',
      '5xl': 'h-40 w-40 shadow-lg',
    },
    radius: radiusVariant,
  },
  defaultVariants: {
    size: 'xs',
    radius: 'xs',
  },
});

const radiusVariants = tv({
  base: '',
  variants: {
    radius: radiusVariant,
  },
  defaultVariants: {
    radius: 'xs',
  },
});

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>,
    VariantProps<typeof avatarVariants> {
  indicator?: IndicatorProps['type'] | 'none';
  rootClassName?: string;
  outlined?: boolean;
  imgRef?: React.Ref<HTMLImageElement>;
}

const Avatar = React.forwardRef<React.ElementRef<'div'>, AvatarProps>(
  (
    {
      className,
      outlined,
      style,
      children,
      rootClassName,
      indicator = 'none',
      size = 'md',
      imgRef: imgRefProp,
      radius,
      ...props
    },
    ref
  ) => {
    const imgRef = useDOMRef(imgRefProp);

    const mappingSize = React.useMemo(() => {
      if (size === '3xl') return '2xl';
      if (size === '4xl') return '3xl';
      if (size === '5xl') return '4xl';
      return size;
    }, [size]);

    return (
      <div
        ref={ref}
        className={cn('group relative inline-flex shrink-0 rounded-full align-middle', className)}
        style={style}
      >
        <AvatarPrimitive.Root className={avatarVariants({ size, radius, className: rootClassName })}>
          <AvatarPrimitive.Image ref={imgRef} className={cn('aspect-square h-full w-full object-cover')} {...props} />
          <AvatarPrimitive.Fallback className={cn('flex h-full w-full items-center justify-center rounded-full')}>
            {children}
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>

        <div
          className={radiusVariants({
            radius,
            className:
              'inset-center pointer-events-none z-[1] h-[calc(100%_+_1px)] w-[calc(100%_+_1px)] border border-gray-300/10',
          })}
        />

        {outlined ? (
          <div
            className={radiusVariants({
              radius,
              className:
                'inset-center border-background pointer-events-none z-[1] h-[calc(100%_+_3px)] w-[calc(100%_+_3px)] border-2',
            })}
          />
        ) : null}
        <div
          className={radiusVariants({
            radius,
            className: cn(
              'inset-center pointer-events-none z-[1] h-[calc(100%_+_5px)] w-[calc(100%_+_5px)] opacity-[14%]',
              'group-focus-within:border-muted group-focus-within:border-4',
              'group-focus:border-muted group-focus:border-4',
              'group-focus-visible:border-muted group-focus-visible:border-4'
            ),
          })}
        />
        {indicator !== 'none' && !!indicator ? (
          <Indicator
            className="absolute bottom-[14%] right-[14%] z-[2] translate-x-1/2 translate-y-1/2 scale-100"
            type={indicator}
            size={mappingSize}
          />
        ) : null}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
