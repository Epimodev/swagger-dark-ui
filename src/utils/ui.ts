const MOBILE_TRESHOLD = 500;
const TABLET_TRESHOLD = 900;

function getAppWidth(): number {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

export function isMobileDevice(): boolean {
  const appWidth = getAppWidth();

  return appWidth <= MOBILE_TRESHOLD;
}

export function isTabletDevice(): boolean {
  const appWidth = getAppWidth();

  return appWidth <= TABLET_TRESHOLD;
}
