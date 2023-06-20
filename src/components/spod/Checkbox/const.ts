export const INPUT_SIZE: Record<string, string> = {
  small: 'h-5 w-5',
  default: 'h-5 w-5',
  large: 'h-5 w-5',
};

export const LABEL_SIZE: Record<string, string> = {
  small: 'text-neutral-primary',
  default: 'text-neutral-primary',
  large: 'text-neutral-primary',
};

export const VARIANT: Record<string, string> = {
  primary:
    'accent-primary checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary',
  secondary:
    'accent-secondary checked:border-secondary checked:bg-secondary indeterminate:border-secondary indeterminate:bg-secondary',
  danger:
    'accent-danger checked:border-danger checked:bg-danger indeterminate:border-danger indeterminate:bg-danger',
  error:
    'accent-error checked:border-error checked:bg-error indeterminate:border-error indeterminate:bg-error',
  warning:
    'accent-warning checked:border-warning checked:bg-warning indeterminate:border-warning indeterminate:bg-warning',
  success:
    'accent-success checked:border-success checked:bg-success indeterminate:border-success indeterminate:bg-success',
};
