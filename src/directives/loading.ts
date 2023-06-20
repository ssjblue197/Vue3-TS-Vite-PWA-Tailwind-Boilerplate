import type { ObjectDirective, DirectiveBinding, Directive } from 'vue';

interface HTMLElementWithLoader extends HTMLElement {
  loader?: HTMLDivElement;
}

const loading: ObjectDirective<HTMLElementWithLoader> = {
  mounted(el: HTMLElementWithLoader, binding: DirectiveBinding<boolean>) {
    el.style.position = 'relative';
    el.loader = document.createElement('div');
    el.loader.className = 'loading';
    el.loader.innerHTML = `
        <div class="w-full h-full flex items-center justify-center z-50">
            <div
                class="w-8 h-8 rounded-full animate-spin border border-solid border-primary border-t-transparent"
            ></div>
        </div>
    `;
    el.loader.style.display = binding.value ? 'block' : 'none';
    el.loader.style.position = 'absolute';
    el.loader.style.top = '50%';
    el.loader.style.left = '50%';
    el.loader.style.transform = 'translate(-50%, -50%)';
    el.loader.style.width = 'calc(100% + 2px)';
    el.loader.style.height = 'calc(100% + 2px)';
    el.loader.style.backgroundColor = '#fff';
    el.loader.style.opacity = '0.9';
    el.loader.style.zIndex = '50';

    el.appendChild(el.loader);
  },

  updated(el: HTMLElementWithLoader, binding: DirectiveBinding<boolean>) {
    if (el.loader) {
      el.loader.style.display = binding.value ? 'block' : 'none';
    }
  },

  beforeUnmount(el: HTMLElementWithLoader) {
    if (el.loader && el.contains(el.loader)) {
      el.removeChild(el.loader);
      delete el.loader;
    }
  },
};

export default loading as Directive;
