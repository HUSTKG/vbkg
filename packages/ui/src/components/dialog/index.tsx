import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export type DialogProps = {
  /** The title of the dialog */
  title: string;
  /** Optional description text for the dialog */
  description?: string;
  /** Children components to render in the dialog body */
  children: React.ReactNode;
  /** Text for the trigger button. If not provided, a custom trigger must be supplied */
  triggerText?: string;
  /** Custom trigger element (use this for custom button styling) */
  customTrigger?: React.ReactNode;
  /** Whether the dialog is open (for controlled usage) */
  open?: boolean;
  /** Function to set the open state (for controlled usage) */
  setOpen?: (open: boolean) => void;
  /** Show footer with action buttons */
  showFooter?: boolean;
  /** Text for the primary action button */
  primaryActionText?: string;
  /** Handler for the primary action button */
  onPrimaryAction?: () => void;
  /** Disable the primary action button */
  primaryActionDisabled?: boolean;
  /** Text for the cancel button */
  cancelText?: string;
  /** Handler for when the dialog is closed */
  onClose?: () => void;
  /** Additional class name for dialog content */
  contentClassName?: string;
  /** Width class for the dialog (Tailwind width class) */
  width?: string;
};

const DialogComponent: React.FC<DialogProps> = ({
  title,
  description,
  children,
  triggerText,
  customTrigger,
  open,
  setOpen,
  showFooter = true,
  primaryActionText = 'Save',
  onPrimaryAction,
  primaryActionDisabled = false,
  cancelText = 'Cancel',
  onClose,
  contentClassName = '',
  width = 'sm:max-w-md',
}) => {
  // For uncontrolled usage
  const [internalOpen, setInternalOpen] = React.useState(false);
  
  // Determine if using controlled or uncontrolled mode
  const isControlled = open !== undefined && setOpen !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled ? setOpen : setInternalOpen;
  
  // Handle close
  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };
  
  // Handle primary action
  const handlePrimaryAction = () => {
    if (onPrimaryAction) {
      onPrimaryAction();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {customTrigger ? (
        <DialogTrigger asChild>
          {customTrigger}
        </DialogTrigger>
      ) : triggerText ? (
        <DialogTrigger asChild>
          <Button variant="default">{triggerText}</Button>
        </DialogTrigger>
      ) : null}
      
      <DialogContent 
        className={`${width} ${contentClassName} [&>button]:hidden`}
        onEscapeKeyDown={handleClose}
        onInteractOutside={handleClose}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{title}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        
        <div className="py-4">
          {children}
        </div>
        
        {showFooter && (
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleClose}
            >
              {cancelText}
            </Button>
            <Button
              variant="default"
              onClick={handlePrimaryAction}
              disabled={primaryActionDisabled}
            >
              {primaryActionText}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
