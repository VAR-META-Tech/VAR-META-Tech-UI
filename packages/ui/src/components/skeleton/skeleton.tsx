import { forwardRef } from 'react';

import { cn } from '../../utils/cn';

export interface SkeletonProps extends React.ComponentPropsWithoutRef<'div'> {}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({ className, ...props }, ref) => {
  return <div className={cn('bg-background-disabled animate-pulse rounded-sm', className)} ref={ref} {...props} />;
});

export { Skeleton };
