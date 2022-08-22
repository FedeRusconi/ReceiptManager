import { ITag } from "./ITag";

export interface IReceiptFilters {
  title?: string, 
  dateFrom?: string, 
  dateTo?: string, 
  amount?: number[], 
  tags?: ITag[]
}