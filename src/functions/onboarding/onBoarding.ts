import { baseUrl } from "../../lib/constants.js";
import { Credentials } from "../../types.js";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { createError } from "../../lib/error-utils.js";
import {
  BusinessInformation,
  IConnectWebhook,
  IGetBusinessInformation,
  IVerifyPhoneNumber,
  WabaAccountInformation,
  PhoneNumberInformation,
  IGetWabaAccountInformation,
  IGetPhoneNumberInformation,
} from "./onBoard.js";

export class OnBoarding {
  private apiUrl: string;
  private axiosInstance: AxiosInstance;
  private readonly credentials: Required<Pick<Credentials, 'numberId' | 'token' | 'wabaId'>>;

  constructor(credentials: Partial<Credentials>) {
    if (!credentials.numberId || !credentials.token || !credentials.wabaId) {
      throw new Error("numberId, token, and wabaId are required.");
    }
    this.credentials = {
      numberId: credentials.numberId,
      token: credentials.token,
      wabaId: credentials.wabaId
    };
    this.apiUrl = `${baseUrl}/${this.credentials.numberId}`;
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        Authorization: `Bearer ${this.credentials.token}`,
        "Content-Type": "application/json",
      },
    });
  }

  async verifyPhoneNumber(
    data: IVerifyPhoneNumber
  ): Promise<AxiosResponse<any>> {
    if (!data) {
      throw new Error("Verification data is required");
    }

    try {
      return await this.axiosInstance.post<any>(
        `https://graph.facebook.com/v22.0/${this.credentials.numberId}/register`,
        {
          messaging_product: "whatsapp",
          ...data,
        }
      );
    } catch (error: unknown) {
      throw createError(error);
    }
  }

  async connectWebhook({
    override_callback_uri,
    verify_token,
  }: IConnectWebhook): Promise<AxiosResponse<any>> {
    try {
      return await axios.post<any>(
        `https://graph.facebook.com/v22.0/${this.credentials.wabaId}/subscribed_apps`,
        {
          messaging_product: "whatsapp",
          override_callback_uri,
          verify_token,
        }
      );
    } catch (error: unknown) {
      throw createError(error);
    }
  }

  async getBusinessInformation(
    payload: IGetBusinessInformation
  ): Promise<BusinessInformation> {
    try {
      const { data } = await this.axiosInstance.get<BusinessInformation>(
        `${baseUrl}/${payload.id}`
      );
      return data;
    } catch (error: unknown) {
      throw createError(error);
    }
  }

  async getWabaAccountInformation(
    payload: IGetWabaAccountInformation
  ): Promise<WabaAccountInformation> {
    try {
      const { data } = await this.axiosInstance.get<WabaAccountInformation>(
        `${baseUrl}/${payload.id}`
      );
      return data;
    } catch (error: unknown) {
      throw createError(error);
    }
  }

  async getPhoneNumberInformation(
    payload: IGetPhoneNumberInformation
  ): Promise<PhoneNumberInformation> {
    try {
      const { data } = await this.axiosInstance.get<PhoneNumberInformation>(
        `${baseUrl}/${payload.id}`
      );
      return data;
    } catch (error: unknown) {
      throw createError(error);
    }
  }
}
