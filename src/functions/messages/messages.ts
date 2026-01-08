import { baseUrl } from "../../lib/constants.js";
import { Credentials, IMessageDelivery } from "../../types.js";
import { createError, validateRequiredString } from "../../lib/error-utils.js";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  ICatalogMessage,
  IContactMessage,
  IListMessage,
  ILocationMessage,
  IMediaMessage,
  IMultiProductMessage,
  IReactionMessage,
  IReplyButtonMessage,
  ISingleProductMessage,
  ITemplateMessage,
  ITextMessage,
  IFlowsMessage,
  IMarkAsRead,
  ILocationRequestMessage,
} from "./message.js";

export class Messages {
  private apiUrl: string;
  private readonly credentials: Required<Pick<Credentials, 'numberId' | 'token'>>;

  constructor(credentials: Partial<Credentials>) {
    if (!credentials.numberId || !credentials.token) {
      throw new Error("Both numberId and token are required.");
    }
    this.credentials = {
      numberId: credentials.numberId,
      token: credentials.token
    };
    this.apiUrl = `${baseUrl}/${this.credentials.numberId}`;
  }

  private async sendMessageWithType<T>(
    to: string,
    type: string,
    content: T
  ): Promise<IMessageDelivery> {
    validateRequiredString(to, "Recipient phone number");
    validateRequiredString(type, "Message type");

    const data = {
      messaging_product: "whatsapp",
      to,
      type,
      ...content,
    };
    
    try {
      const response = await axios.post<IMessageDelivery>(
        `${this.apiUrl}/messages`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this.credentials.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      throw createError(error);
    }
  }

  async sendTextMessage({ to, text }: ITextMessage): Promise<IMessageDelivery> {
    return this.sendMessageWithType(to, "text", { text });
  }

  async sendMediaMessage({
    to,
    media,
  }: IMediaMessage): Promise<IMessageDelivery> {
    const { type, ...rest } = media;
    return this.sendMessageWithType(to, type, rest);
  }

  async sendLocationMessage({
    to,
    location,
  }: ILocationMessage): Promise<IMessageDelivery> {
    return this.sendMessageWithType(to, "location", { location });
  }

  async sendContactMessage({
    to,
    contacts,
  }: IContactMessage): Promise<IMessageDelivery> {
    return this.sendMessageWithType(to, "contacts", { contacts });
  }

  async sendReactionMessage({
    to,
    reaction,
  }: IReactionMessage): Promise<IMessageDelivery> {
    return this.sendMessageWithType(to, "reaction", { reaction });
  }

  async sendTemplateMessage({
    to,
    template,
  }: ITemplateMessage): Promise<IMessageDelivery> {
    return this.sendMessageWithType(to, "template", { template });
  }

  async sendReplyButtonMessage({
    to,
    interactive,
  }: IReplyButtonMessage): Promise<IMessageDelivery> {
    return this.sendMessageWithType(to, "interactive", { interactive });
  }

  async sendSingleProductMessage({
    to,
    interactive,
  }: ISingleProductMessage): Promise<IMessageDelivery> {
    return this.sendMessageWithType(to, "interactive", { interactive });
  }

  async sendMultiProductMessage({
    to,
    interactive,
  }: IMultiProductMessage): Promise<IMessageDelivery> {
    return this.sendMessageWithType(to, "interactive", { interactive });
  }

  async sendCatalogMessage({
    to,
    interactive,
  }: ICatalogMessage): Promise<IMessageDelivery> {
    return this.sendMessageWithType(to, "interactive", { interactive });
  }

  async sendListMessage({
    to,
    interactive,
  }: IListMessage): Promise<IMessageDelivery> {
    return this.sendMessageWithType(to, "interactive", { interactive });
  }

  async sendFlowMessage({
    to,
    interactive,
  }: IFlowsMessage): Promise<IMessageDelivery> {
    return this.sendMessageWithType(to, "interactive", { interactive });
  }
  async sendLocationRequestMessage({
    to,
    interactive,
  }: ILocationRequestMessage): Promise<IMessageDelivery> {
    return this.sendMessageWithType(to, "interactive", { interactive });
  }
  async markAsRead({ message_id }: IMarkAsRead) {
    validateRequiredString(message_id, "Message ID");

    const data = {
      messaging_product: "whatsapp",
      status: "read",
      message_id,
      typing_indicator: {
       "type": "text"
      }
    };
    
    try {
      const response = await axios.post(`${this.apiUrl}/messages`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.credentials.token}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      throw createError(error);
    }
  }
}
