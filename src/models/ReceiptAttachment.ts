import { IReceiptAttachment } from "../@types/IReceiptAttachment";

export class ReceiptAttachment implements IReceiptAttachment {
  id: string;

  fileName: string;

  originalName: string;

  filePath: string;

  constructor(attachment?: IReceiptAttachment) {
    if (attachment) {
      this.id = attachment.id;
      this.fileName = attachment.fileName;
      this.originalName = attachment.originalName;
      this.filePath = attachment.filePath
    } else {
      this.id = '';
      this.fileName = '';
      this.originalName = '';
      this.filePath = '';
    }
  }
}