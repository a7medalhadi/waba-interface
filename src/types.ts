export * from './functions/index.js';
export type Credentials = {
  token: string;
  numberId: string;
  wabaId: string;
  businessId?: string;
};

export interface IMessageDelivery {
  messaging_product: string;
  contacts: { input: string; wa_id: string }[];
  messages: {
    id: string;
  }[];
}