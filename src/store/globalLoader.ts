import { defineStore } from 'pinia';

type ILoaderState = {
  show: boolean,
  message?: string
}

export const useLoaderStore = defineStore('globalLoader', {
  state: (): ILoaderState => ({
    show: false,
    message: undefined
  }),
  getters: {
    isOpen(state) {
      return state.show;
    },
    getText(state) {
      return state.message;
    }
  },
  actions: {
    open(message?: string) {
      this.message = message;
      this.show = true;
    },
    close() {
      this.show = false;
    },
  },
});
