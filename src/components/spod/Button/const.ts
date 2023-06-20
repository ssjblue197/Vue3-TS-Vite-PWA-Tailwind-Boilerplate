export const SIZE: Record<string, string> = {
  default: 'py-2 px-4 text-base',
  small: 'py-2 px-4 text-base',
  large: 'py-2 px-4 text-base',
};

export const VARIANT: Record<string, string> = {
  primary:
    'border-primary bg-primary hover:bg-accent-hover hover:border-accent-hover focus:bg-accent-focus focus:border-accent-focus',
  secondary:
    'border-accent-secondary bg-accent-secondary !text-neutral-secondary hover:!text-white hover:bg-primary hover:border-primary focus:!text-white  focus:bg-accent-focus focus:border-accent-focus',
  danger: 'border-danger bg-danger focus:bg-danger hover:opacity-80',
  error: 'border-error bg-error focus:bg-error',
  warning: 'border-warning bg-warning focus:bg-warning',
  success: 'border-success bg-success focus:bg-success',
  'primary-outline':
    'text-primary border-primary hover:bg-primary focus:text-primary',
  'secondary-outline':
    'text-secondary border-secondary hover:bg-secondary focus:text-secondary ',
  'danger-outline':
    'text-danger border-danger hover:bg-danger focus:text-danger',
  'error-outline': 'text-error border-error hover:bg-error focus:text-error',
  'warning-outline':
    'text-warning border-warning hover:bg-warning focus:text-warning',
  'success-outline':
    'text-success border-success hover:bg-success focus:text-success',
};
