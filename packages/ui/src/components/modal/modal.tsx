import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';

import { type ElementProps } from '../../types';
import { cn } from '../../utils/cn';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTrigger,
  type DialogHeaderProps,
} from './dialog.styles';

export interface ModalHeaderProps extends DialogHeaderProps {
  align?: 'left' | 'center' | 'baseline';
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export const ModalTrigger = DialogTrigger;
export const ModalClose = DialogClose;

export const ModalHeader = forwardRef<ElementRef<'div'>, ModalHeaderProps>((props, ref) => {
  const { title, children, icon, description, align = 'left', ...etc } = props;

  return (
    <DialogHeader ref={ref} {...etc}>
      <div
        className={cn('flex flex-col gap-4', {
          'justify-start': align === 'left',
          'justify-center items-center': align === 'center',
          'justify-center flex-row': align === 'baseline',
        })}
      >
        {icon ? <div>{icon}</div> : null}
        <div
          className={cn('flex flex-col gap-1', {
            'justify-center items-center text-center': align === 'center',
          })}
        >
          <div className="text-foreground text-lg font-semibold">{title}</div>
          <div className="text-sm text-gray-600">{description}</div>
        </div>
      </div>
      {children}
    </DialogHeader>
  );
});

export interface ModalActionProps extends React.HTMLAttributes<HTMLDivElement> {
  separator?: boolean;
}

export const ModalAction = forwardRef<ElementRef<'div'>, ModalActionProps>(({ className, ...props }, ref) => (
  <DialogFooter className={className} {...props} ref={ref} />
));

export interface ModalBodyProps extends ElementProps<'div'> {}

export const ModalBody = forwardRef<ElementRef<'div'>, ModalBodyProps>(({ className, ...props }, ref) => (
  <div className={cn('px-4 md:px-6 ', className)} {...props} ref={ref} />
));

export interface ModalProps extends ComponentPropsWithoutRef<typeof Dialog> {
  trigger?: React.ReactNode;
  className?: string;
  fitContent?: boolean;
  fullScreen?: boolean;
  modalContentProps?: ElementProps<typeof DialogContent, 'className'>;
}

export const Modal = forwardRef<ElementRef<typeof DialogContent>, ModalProps>((props, ref) => {
  const { children, className, fitContent, fullScreen, modalContentProps, trigger, ...etc } = props;

  return (
    <Dialog {...etc}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogPortal>
        <DialogContent
          ref={ref}
          className={cn(
            'min-h-[200px] p-0 shadow-lg',
            { 'max-w-fit w-fit': fitContent, 'max-w-full min-h-screen rounded-none': fullScreen },
            className
          )}
          {...modalContentProps}
        >
          {children}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
});

Modal.displayName = 'Modal';
