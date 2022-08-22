import { defineStore } from 'pinia';
import { IUser } from '../@types/IUser';
import { User } from '../models/User';

type IUserState = {
  sessionUser?: IUser
}

export const useUserStore = defineStore('user', {
  state: (): IUserState => ({
    sessionUser: undefined,
  }),
  getters: {
    currentUser(state) {
      return new User(state.sessionUser);
    }
  },
  actions: {
    setCurrentUser(user: IUser) {
      this.sessionUser = user;
    },
    resetCurrentUser() {
      this.sessionUser = undefined;
    }
  },
});
