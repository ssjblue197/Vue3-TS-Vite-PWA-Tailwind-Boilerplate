import type { App, Plugin } from 'vue';

const scrollToError = async () => {
  setTimeout(() => {
    const el = document.getElementsByClassName('is-error');
    if (!el || !el.length) {
      return;
    }
    const firstElement = el && (el[0] as HTMLElement);
    if (!firstElement) return;
    document.body.scrollTop = (firstElement.offsetTop - 120) | 0;
    firstElement.focus();
  }, 100);
};

export interface FormPlugin {
  scrollToError: () => void;
}

const form: FormPlugin = {
  scrollToError,
};

export default {
  install: (app: App) => {
    app.config.globalProperties.$form = form;
    app.provide('form', form);
  },
} as Plugin;
