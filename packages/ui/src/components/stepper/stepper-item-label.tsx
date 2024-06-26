import { tv } from 'tailwind-variants';

import { cn } from '../../utils/cn';
import { useStepperContext } from './stepper-context';

export interface StepperItemLabelProps {
  label: string | React.ReactNode;
  description?: string | React.ReactNode;
  optional?: boolean;
  optionalLabel?: string | React.ReactNode;
  labelClassName?: string;
  descriptionClassName?: string;
}

const labelVariants = tv({
  base: 'text-foreground font-semibold',
  variants: {
    active: {
      true: 'text-button',
      false: 'text-foreground',
    },
    size: {
      none: 'text-sm',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-md',
    },
  },
  defaultVariants: {
    size: 'none',
    active: false,
  },
});

const descriptionVariants = tv({
  base: 'text-foreground-secondary',
  variants: {
    active: {
      true: 'text-button',
      false: 'text-foreground-secondary',
    },
    size: {
      none: 'text-sm',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-md',
    },
  },
  defaultVariants: {
    size: 'none',
    active: false,
  },
});

const optionalLabelVariants = tv({
  base: 'text-foreground-secondary',
  variants: {
    size: {
      none: 'text-xs',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'none',
  },
});

const StepperItemLabel = ({
  isCurrentStep,
  label,
  description,
  optional,
  optionalLabel,
  labelClassName,
  descriptionClassName,
}: StepperItemLabelProps & {
  isCurrentStep?: boolean;
}) => {
  const { centeredLabel, size } = useStepperContext();

  const shouldRender = !!label || !!description;

  const renderOptionalLabel = !!optional && !!optionalLabel;

  return shouldRender ? (
    <div
      aria-current={isCurrentStep ? 'step' : undefined}
      className={cn(
        'flex w-max flex-col justify-center',
        centeredLabel ? 'items-center text-center' : 'items-start text-left'
      )}
    >
      {!!label && (
        <p className={cn(labelVariants({ size, active: isCurrentStep }), labelClassName)}>
          {label}
          {renderOptionalLabel && <span className={cn(optionalLabelVariants({ size }))}>({optionalLabel})</span>}
        </p>
      )}
      {!!description && (
        <p className={cn(descriptionVariants({ size, active: isCurrentStep }), descriptionClassName)}>{description}</p>
      )}
    </div>
  ) : null;
};

StepperItemLabel.displayName = 'StepperItemLabel';
export { StepperItemLabel };
