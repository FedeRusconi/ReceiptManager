import { IReceiptAttachment } from "./IReceiptAttachment";
import { ITag } from "./ITag";

export interface IReceipt {
  _id: string;
  title: string;
  description: string;
  date: Date;
  amount: number;
  attachment: IReceiptAttachment | null;
  tags: ITag[];
  userId: string;
}
