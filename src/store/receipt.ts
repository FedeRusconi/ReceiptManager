import { defineStore } from 'pinia';
import { IReceipt } from '../@types/IReceipt';
import { Receipt } from '../models/Receipt';

type IReceiptState = {
  receipts: IReceipt[],
  receipt: IReceipt | null,
}

export const useReceiptStore = defineStore('receipt', {
  state: (): IReceiptState => ({
    receipts: [],
    receipt: null,
  }),
  getters: {
    allReceipts(state) {
      return state.receipts.map(receipt => new Receipt(receipt));
    },
    selectedReceipt(state) {
      return new Receipt(state.receipt);
    }
  },
  actions: {
    setReceipts(receipts: IReceipt[]) {
      this.receipts = receipts;
    },
    addReceipt(receipt: IReceipt) {
      this.receipts.unshift(receipt);
    },
    selectReceipt(receipt: IReceipt) {
      this.receipt = receipt;
    },
    removeReceipt(receiptId: string) {
      const index = this.receipts.findIndex(r => r._id === receiptId);
      if(index > -1) this.receipts.splice(index);
    }
  },
});
