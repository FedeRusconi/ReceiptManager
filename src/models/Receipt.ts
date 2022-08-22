import { format } from "date-fns";
import { IHttpClient } from "../@types/IHttpClient";
import { IHttpResponse } from "../@types/IHttpResponse";
import { IReceipt } from "../@types/IReceipt";
import { IReceiptAttachment } from "../@types/IReceiptAttachment";
import { IReceiptFilters } from "../@types/IReceiptFilters";
import { ITag } from "../@types/ITag";
import { HttpService } from "../services/HttpService";
import { useReceiptStore } from "../store/receipt";

export class Receipt implements IReceipt, IHttpClient {
  http = HttpService.instance();

  store = useReceiptStore();

  _id: string;

  title: string;

  description: string;

  date: Date;

  amount: number;

  tags: ITag[];

  attachment: IReceiptAttachment | null;

  userId: string;

  constructor(receipt?: IReceipt | null) {
    if (receipt) {
      this._id = receipt._id;
      this.title = receipt.title;
      this.description = receipt.description;
      this.date = new Date(receipt.date);
      this.amount = +receipt.amount;
      this.tags = receipt.tags || [];
      this.attachment = receipt.attachment;
      this.userId = receipt.userId;
    } else {
      this._id = '';
      this.title = '';
      this.description = '';
      this.date = new Date();
      this.amount = 0;
      this.tags = [];
      this.attachment = null;
      this.userId = '';
    }
  }

  /**
   * Get all receipts
   */
  public static async getAll(): Promise<IReceipt[]> {
    const store = useReceiptStore();
    return HttpService.instance().get('receipts')
      .then(response => {
        store.setReceipts(response.data as IReceipt[]);
        return response.data as IReceipt[];
      });
  }

  /**
   * Get receipts that match filters
   * @param filters 
   * @returns 
   */
  public static async getWithFilters(filters: IReceiptFilters) {
    const store = useReceiptStore();
    return HttpService.instance().post('receipts/withFilters', filters)
      .then(response => {
        store.setReceipts(response.data as IReceipt[]);
        return response.data as IReceipt[];
      });

  }

  /**
   * Get single receipt
   * @param receiptId The ID of the selected receipt
   */
  public static async get(receiptId: string): Promise<IReceipt> {
    const store = useReceiptStore();
    return HttpService.instance().get(`receipts/${receiptId}`)
      .then(response => {
        store.selectReceipt(response.data as IReceipt);
        return response.data as IReceipt;
      });
  }

  /**
   * Create a new receipt instance
   * @param tags An array of tags to add
   * @param fileUploaded The file to attach to a receipt - Optional
   */
  public async create(tags: ITag[], fileUploaded?: File): Promise<IHttpResponse> {
    const data = new FormData();
    data.append('title', this.title);
    data.append('description', this.description);
    data.append('date', this.date.toString());
    data.append('amount', this.amount.toString());
    data.append('tags', JSON.stringify(tags))
    if(fileUploaded) {
      data.append('attachment', fileUploaded);
    }
    // Pass custom header for form data
    return this.http.post('receipts', data, {headers: {"Content-Type": "multipart/form-data"}})
      .then((response) => {
        const newReceipt = response.data.payload as IReceipt;
        this._id = newReceipt._id;
        this.tags = newReceipt.tags;
        this.attachment = newReceipt.attachment;
        this.store.addReceipt(this);
        return response.data as IHttpResponse;
      });
  }

  /**
   * Add new tags to selected receipt
   * @param tags An array of tags to add
   */
  public async addTags(tags: ITag[]): Promise<IHttpResponse> {
    // Pass custom header for form data
    return this.http.post(`receipts/${this._id}/tags`, { tags })
      .then((response) => {
        const newReceipt = response.data.payload as IReceipt;
        this.tags = newReceipt.tags;
        this.store.selectReceipt(this);
        return response.data as IHttpResponse;
      });
  }

  /**
   * Update a receipt instance
   */
  public async update(): Promise<IHttpResponse> {
    const {title, date, amount, description} = this;
    return this.http.put(`receipts/${this._id}`, {title, date, amount, description})
      .then((response) => {
        this.store.selectReceipt(this);
        return response.data as IHttpResponse;
      });
  }

  /**
   * Update a receipt image
   * @param fileUploaded The file to attach to the receipt
   */
  public async updateImage(fileUploaded: File): Promise<IHttpResponse> {
    const data = new FormData();
    data.append('attachment', fileUploaded);
    // Pass custom header for form data
    return this.http.patch(`receipts/${this._id}`, data, {headers: {"Content-Type": "multipart/form-data"}})
      .then((response) => {
        this.store.selectReceipt(response.data.payload as IReceipt);
        return response.data as IHttpResponse;
      });
  }

  /**
   * Delete a receipt instance
   */
  public async delete(): Promise<IHttpResponse> {
    return this.http.delete(`receipts/${this._id}`)
      .then((response) => {
        this.store.removeReceipt(this._id);
        return response.data as IHttpResponse;
      });
  }

  /**
   * Delete a receipt tag
   * @param tagId The ID of the selected tag to delete
   */
  public async deleteTag(tagId: string): Promise<IHttpResponse> {
    return this.http.delete(`receipts/${this._id}/tags/${tagId}`)
      .then((response) => {
        this.store.selectReceipt(response.data.payload as IReceipt);
        return response.data as IHttpResponse;
      });
  }

  /**
   * Get string version of receipt date
   */
  public get dateString(): string {
    return format(this.date, 'yyy-MM-dd');
  }

  /**
   * Get beautified string version of receipt date
   */
   public get dateBeautified(): string {
    return format(this.date, 'EEE, do MMMM yyy');
  }


  /**
   * Set receipt's date from string value
   */
  public set dateString(value: string) {
    this.date = new Date(value);
  }
}
