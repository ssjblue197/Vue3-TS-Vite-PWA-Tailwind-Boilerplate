/* eslint-disable @typescript-eslint/no-explicit-any */

export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => Promise<Params> {
  let timer: NodeJS.Timeout | undefined;
  return (...args: Params) => {
    if (timer) {
      clearTimeout(timer);
    }
    return new Promise(() => {
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    });
  };
}
