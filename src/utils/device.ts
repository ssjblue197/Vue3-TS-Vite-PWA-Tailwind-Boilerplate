import _isMobile from 'is-mobile';

export const isPhone = _isMobile();
export const isMobile = _isMobile({ tablet: true });
export const isTablet = isMobile && !isPhone;
export const isLandscape = window.innerWidth > window.innerHeight;
export const isPortrait = !isLandscape;
