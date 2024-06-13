import * as React from 'react';

import { cn } from '../../utils/cn';
import { ButtonClose, type ButtonCloseProps } from '../button';
import * as DialogPrimitive from '../dialog';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogCloseTrigger = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

interface DialogOverlayProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {}

const DialogOverlay = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, DialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-overlay/70 fixed inset-0 z-40 backdrop-blur-sm',
        className
      )}
      {...props}
    />
  )
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogPrimitive.DialogContentProps
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        'border-border bg-background fixed left-[50%] top-[50%] z-50 grid max-h-screen w-full max-w-[400px] translate-x-[-50%] translate-y-[-50%] gap-4 overflow-auto rounded-lg border py-3 shadow-xl duration-200 md:w-full',
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

interface DialogHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  onClose?: () => void;
  className?: string;
  hideCloseButton?: boolean;
  buttonCloseProps?: ButtonCloseProps;
}

const DialogHeader = React.forwardRef<React.ElementRef<'div'>, DialogHeaderProps>(
  ({ className, children, onClose, hideCloseButton, buttonCloseProps, ...props }, ref) => (
    <div ref={ref} className={cn('relative px-4 pt-3 md:px-6 md:pt-6', className)} {...props}>
      {children}
      {hideCloseButton ? null : (
        <DialogPrimitive.DialogClose className="absolute right-4 top-4" asChild onClick={onClose}>
          <ButtonClose size="lg" {...buttonCloseProps} />
        </DialogPrimitive.DialogClose>
      )}
    </div>
  )
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = React.forwardRef<React.ElementRef<'div'>, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col-reverse gap-3 p-4 sm:flex-row sm:justify-end md:p-6', className)}
      {...props}
    />
  )
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-tight tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-foreground-secondary text-sm 2xl:text-base', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

export type { DialogHeaderProps };
