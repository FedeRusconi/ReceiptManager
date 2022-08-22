import { defineStore } from 'pinia';
import { IAlert } from '../@types/IAlert';

type IAlertState = {
  alerts : IAlert[]
}

export const useAlertStore = defineStore('alert', {
  state: (): IAlertState => ({
    alerts: []
  }),
  getters: {
    // isOpen(state) {
    //   return state.show;
    // },
    allAlerts(state) {
      return state.alerts
    }
  },
  actions: {
    open(alert: IAlert) {
      this.alerts.push(alert);
    },
    close(id: number) {
      const index = this.alerts.findIndex(a => a.id === id);
      if (index > -1) this.alerts.splice(index, 1);
    },
  },
});
