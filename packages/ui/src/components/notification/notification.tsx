import { cn } from '@hashgraph/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { type ComponentPropsWithoutRef, type ReactNode, useMemo } from 'react';

import { type ReactNodeExcluded } from '../../types';
import { Avatar, type AvatarProps } from '../avatar';
import { Button, ButtonClose, type ButtonProps } from '../button';
import { AlertCircleIcon, CheckCircleIcon, FeaturedIcon } from '../icons';
import { Show } from '../utility';

export interface NotificationActionProps extends React.HTMLAttributes<HTMLDivElement> {
  confirmLabel?: string;
  cancelLabel?: string;
  actionBtnProps?: ButtonProps;
  cancelBtnProps?: ButtonProps;
  hideConfirm?: boolean;
  hideCancel?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const NotificationAction = React.forwardRef<HTMLDivElement, NotificationActionProps>((props, ref) => {
  const {
    className,
    confirmLabel = 'Confirm',
    cancelLabel = 'Dismiss',
    hideConfirm = false,
    hideCancel = false,
    onConfirm,
    onCancel,
    actionBtnProps,
    cancelBtnProps,
    children,
    ...etc
  } = props;
  return (
    <div ref={ref} className={cn('flex gap-3 items-start', className)} {...etc}>
      {!hideCancel ? (
        <Button onClick={onCancel} size="none" variant="link-gray" {...cancelBtnProps}>
          {cancelLabel}
        </Button>
      ) : null}
      {!hideConfirm ? (
        <Button onClick={onConfirm} size="none" variant="link" {...actionBtnProps}>
          {confirmLabel}
        </Button>
      ) : null}
      {children}
    </div>
  );
});

export interface NotificationContentProps extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  title?: ReactNode;
  description?: ReactNode;
}

const NotificationContent = React.forwardRef<HTMLDivElement, NotificationContentProps>(
  ({ className, title, description, ...props }, ref) => {
    return (
      <div className={cn('gap-1 flex flex-col', className)} ref={ref} {...props}>
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    );
  }
);

const notificationVariants = cva(
  'flex relative p-4 gap-4 overflow-hidden rounded-xl border border-gray-300 shadow-lg bg-base-white w-full md:w-[400px]',
  {
    variants: {
      variant: {
        none: '',
        icon: '',
        image: 'p-0',
        avatar: '',
      },
    },
    defaultVariants: {
      variant: 'icon',
    },
    compoundVariants: [],
  }
);

export interface NotificationProps extends NotificationContentProps, VariantProps<typeof notificationVariants> {
  hideCloseIcon?: boolean;
  onClose?: () => void;
  icon?: 'success' | 'warning' | 'error' | ReactNodeExcluded;
  src?: string;
  avatarProps?: AvatarProps;
  imgProps?: ComponentPropsWithoutRef<'img'>;
  actionProps?: NotificationActionProps;
  children?: ReactNode;
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>((props, ref) => {
  const {
    className,
    variant = 'icon',
    onClose,
    hideCloseIcon,
    imgProps,
    title,
    description,
    avatarProps,
    src,
    icon,
    actionProps,
    children,
    ...etc
  } = props;

  const renderIcon = useMemo(() => {
    if (variant === 'avatar') {
      return <Avatar size="md" indicator="online" src={src} {...avatarProps} />;
    }
    if (variant !== 'icon') return null;
    switch (icon) {
      case 'success':
        return (
          <FeaturedIcon className="md:-mt-2.5 -ml-2.5" variant="outline" color="success">
            <CheckCircleIcon />
          </FeaturedIcon>
        );
      case 'warning':
        return (
          <FeaturedIcon className="md:-mt-2.5 -ml-2.5" variant="outline" color="warning">
            <AlertCircleIcon />
          </FeaturedIcon>
        );

      case 'error':
        return (
          <FeaturedIcon className="md:-mt-2.5 -ml-2.5" variant="outline" color="error">
            <AlertCircleIcon />
          </FeaturedIcon>
        );

      default:
        return (
          <FeaturedIcon variant="modern" color="gray">
            {icon}
          </FeaturedIcon>
        );
    }
  }, [variant, icon, src, avatarProps]);

  return (
    <div ref={ref} className={cn({ 'md:pr-8': !hideCloseIcon }, notificationVariants({ variant, className }))} {...etc}>
      {!hideCloseIcon ? <ButtonClose onClick={onClose} size="sm" className="absolute right-2 top-2" /> : null}

      <Show when={variant === 'image'}>
        <div className="flex">
          <div className="min-w-[5rem] max-w-[5rem] md:flex hidden h-full relative flex-col bg-gray-50">
            <img src={src} {...imgProps} className={cn('absolute w-full h-full object-cover', imgProps?.className)} />
          </div>
          <div className="flex flex-col gap-3 p-4 pl-5">
            <NotificationContent title={title} description={description} />
            <div className="w-full min-h-[122px] max-h-[122px] relative md:hidden flex flex-col bg-gray-50">
              <img
                src={src}
                {...imgProps}
                className={cn('absolute w-full h-full rounded-sm object-cover', imgProps?.className)}
              />
            </div>
            {children}
            {actionProps !== undefined ? (
              <NotificationAction
                {...actionProps}
                onCancel={() => {
                  actionProps.onCancel?.();
                  onClose?.();
                }}
                onConfirm={() => {
                  actionProps.onConfirm?.();
                  onClose?.();
                }}
              />
            ) : null}
          </div>
        </div>
      </Show>

      <Show when={variant === 'icon' || variant === 'avatar'}>
        <div className="flex flex-col items-start justify-start gap-2 md:gap-4 md:flex-row">
          {renderIcon}
          <div className="flex flex-col gap-3">
            <NotificationContent title={title} description={description} />
            {children}
            {actionProps !== undefined ? (
              <NotificationAction
                {...actionProps}
                onCancel={() => {
                  actionProps.onCancel?.();
                  onClose?.();
                }}
                onConfirm={() => {
                  actionProps.onConfirm?.();
                  onClose?.();
                }}
              />
            ) : null}
          </div>
        </div>
      </Show>
    </div>
  );
});

export { Notification, NotificationAction, notificationVariants };