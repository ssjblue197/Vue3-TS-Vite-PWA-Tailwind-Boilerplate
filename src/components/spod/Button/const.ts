export const SIZE: Record<string, string> = {
  default: 'py-3 px-4 text-base',
  small: 'py-2 px-4 text-base',
  large: 'py-4 px-4 text-base',
};

export const VARIANT: Record<string, string> = {
  primary:
    'border-primary bg-primary hover:bg-accent-hover hover:border-accent-hover focus:bg-accent-focus active:bg-primary-200 focus:border-accent-focus',
  secondary:
    'border-accent-secondary bg-accent-secondary !text-neutral-secondary hover:!text-white hover:bg-primary hover:border-primary focus:!text-white  active:bg- focus:bg-accent-focus active:bg-secondary-200 focus:border-accent-focus',
  danger: 'border-danger bg-danger active:bg-danger-200 focus:bg-danger hover:opacity-80',
  error: 'border-error bg-error active:bg-error-200 focus:bg-error',
  warning: 'border-warning bg-warning active:bg-warning-200 focus:bg-warning',
  success: 'border-success bg-success active:bg-success-200 focus:bg-success',
  'primary-outline':
    'text-primary bg-white border-primary hover:bg-primary-100 focus:text-primary active:bg-primary-200',
  'secondary-outline':
    'text-neutral-200 bg-white border-neutral-40 hover:bg-secondary-100 focus:text-secondary active:bg-secondary-200 ',
  'danger-outline':
    'text-danger bg-white border-danger hover:bg-danger-100 focus:text-danger active:bg-danger-200',
  'error-outline': 'text-error bg-white border-error hover:bg-error-100 focus:text-error active:bg-error-200',
  'warning-outline':
    'text-warning bg-white border-warning hover:bg-warning-100 focus:text-warning active:bg-warning-200',
  'success-outline':
    'text-success bg-white border-success hover:bg-success-100 focus:text-success active:bg-success-200',
};
