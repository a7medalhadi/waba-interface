import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "../../lib/constants.js";
import { Credentials } from "../../types.js";
import { createError } from "../../lib/error-utils.js";
import {
  ICreateFlow,
  IGetFlow,
  IUpdateFlow,
  IUpdateFlowMetaData,
} from "./flow.js";

export class Flows {
  private apiUrl: string;
  private readonly credentials: Required<Pick<Credentials, 'wabaId' | 'token'>>;

  constructor(credentials: Partial<Credentials>) {
    if (!credentials.wabaId || !credentials.token) {
      throw new Error("Both wabaId and token are required.");
    }
    this.credentials = {
      wabaId: credentials.wabaId,
      token: credentials.token
    };
    this.apiUrl = baseUrl;
  }

  /**
   * Helper method to send an HTTP request
   */
  private async sendRequest<T>(
    method: "GET" | "POST" | "DELETE",
    endpoint: string,
    options: {
      params?: Record<string, string | number>;
      data?: unknown | FormData;
      headers?: Record<string, string>;
    } = {}
  ): Promise<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    const { params, data, headers } = options;

    const config: AxiosRequestConfig = {
      method,
      url,
      params,
      headers: {
        Authorization: `Bearer ${this.credentials.token}`,
        ...(data instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...headers,
      },
      ...(method === "POST" && { data }),
    };

    try {
      const response = await axios(config);
      return response.data as T;
    } catch (error: unknown) {
      throw createError(error);
    }
  }

  /**
   * Creates a new flow
   */
  async createFlow(data: ICreateFlow): Promise<any> {
    if (!data) {
      throw new Error("Flow data is required");
    }
    const formData = this.createFormData(data);
    const endpoint = `${this.credentials.wabaId}/flows`;
    return this.sendRequest("POST", endpoint, { data: formData });
  }

  /**
   * Retrieves a single flow's details
   */
  async getFlow({ flowId }: IGetFlow): Promise<any> {
    if (!flowId?.trim()) {
      throw new Error("Flow ID is required");
    }
    const endpoint = `${flowId}`;
    return this.sendRequest("GET", endpoint, {
      params: {
        fields:
          "id,name,categories,preview,status,validation_errors,json_version,data_api_version,data_channel_uri,health_status,whatsapp_business_account,application",
      },
    });
  }

  /**
   * Lists all flows for the account
   */
  async listFlows(): Promise<any> {
    const endpoint = `${this.credentials.wabaId}/flows`;
    return this.sendRequest("GET", endpoint);
  }

  /**
   * Updates a flow's assets
   */
  async updateFlow({ flowId, data }: IUpdateFlow): Promise<any> {
    const formData = this.createFormData(data);
    const endpoint = `${flowId}/assets`;
    return this.sendRequest("POST", endpoint, { data: formData });
  }

  /**
   * Publishes a flow
   */
  async publishFlow({ flowId }: IGetFlow): Promise<any> {
    const endpoint = `${flowId}/publish`;
    return this.sendRequest("POST", endpoint);
  }

  /**
   * Updates metadata for a flow
   */
  async updateFlowMetaData({
    flowId,
    data,
  }: IUpdateFlowMetaData): Promise<any> {
    const formData = this.createFormData(data);
    return this.sendRequest("POST", flowId, { data: formData });
  }

  /**
   * Lists flow assets
   */
  async listFlowAssets({ flowId }: IGetFlow): Promise<any> {
    const endpoint = `${flowId}/assets`;
    return this.sendRequest("GET", endpoint);
  }

  /**
   * Deprecates a flow
   */
  async deprecateFlow({ flowId }: IGetFlow): Promise<any> {
    const endpoint = `${flowId}/deprecate`;
    return this.sendRequest("POST", endpoint);
  }

  /**
   * Deletes a flow
   */
  async deleteFlow({ flowId }: IGetFlow): Promise<any> {
    return this.sendRequest("DELETE", flowId);
  }

  /**
   * Helper method to create FormData from an object
   */
  private createFormData(data: Record<string, any>): FormData {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string | Blob);
      }
    });
    return formData;
  }
}
