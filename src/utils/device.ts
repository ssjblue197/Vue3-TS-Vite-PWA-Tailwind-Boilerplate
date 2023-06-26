import _isMobile from 'is-mobile';

export const isPhone = _isMobile();
export const isMobile = _isMobile({ tablet: true });
export const isTablet = isMobile && !isPhone;
export const isLandscape = window.innerWidth > window.innerHeight;
export const isPortrait = !isLandscape;

export const checkAppInstalled = () => {
  if ('matchMedia' in window) {
    // Check if the display-mode media feature is supported
    if (window.matchMedia('(display-mode: standalone)').matches) {
      // The PWA is installed and running in standalone mode
      console.log('PWA is installed');
      return true;
    }
  }
  return false;
};