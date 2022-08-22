import { defineStore } from 'pinia';
import { ITag } from '../@types/ITag';

type ITagState = {
  tags: ITag[]
}

export const useTagStore = defineStore('tag', {
  state: (): ITagState => ({
    tags: [],
  }),
  getters: {
    allTags(state) {
      return state.tags;
    }
  },
  actions: {
    setTags(tags: ITag[]) {
      this.tags = tags;
    }
  },
});
