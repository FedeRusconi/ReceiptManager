import { ITag } from "../@types/ITag";
import { HttpService } from "../services/HttpService";
import { useTagStore } from "../store/tag";

export class Tag implements ITag {

  _id?: string;

  name: string;

  constructor(tag?: ITag | null) {
    if(tag) {
      this._id = tag._id;
      this.name = tag.name;
    } else {
      this._id = undefined;
      this.name = '';
    }
  }

  /**
   * Get all tags
   */
  public static async getAll(): Promise<ITag[]> {
    const store = useTagStore();
    return HttpService.instance().get('tags')
      .then(response => {
        store.setTags(response.data as ITag[]);
        return response.data as ITag[];
      });
  }
}