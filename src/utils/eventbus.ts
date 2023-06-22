/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import mitt, { Emitter } from 'mitt';

const emitter: Emitter = mitt();

export default {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  $on: (...args: any) => emitter.on(...args),
  $once: (...args: any) => emitter.once(...args),
  $off: (...args: any) => emitter.off(...args),
  $emit: (...args: any) => emitter.emit(...args),
};
