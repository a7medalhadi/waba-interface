import { baseUrl } from "../../lib/constants.js";
import { Credentials } from "../../types.js";
import {
  ICreateTemplate,
  IGetListTemplates,
  ListTemplatesResponse,
  TemplateData,
} from "./template.js";
import axios from "axios";
import { createError } from "../../lib/error-utils.js";

export class Templates {
  private apiUrl: string;
  private readonly credentials: Required<Pick<Credentials, "wabaId" | "token">>;

  constructor(credentials: Partial<Credentials>) {
    if (!credentials.wabaId || !credentials.token) {
      throw new Error("Both wabaId and token are required in credentials.");
    }
    this.credentials = {
      wabaId: credentials.wabaId,
      token: credentials.token,
    };
    this.apiUrl = `${baseUrl}/${credentials.wabaId}/message_templates`;
  }

  private getHeaders() {
    return { Authorization: `Bearer ${this.credentials.token}` };
  }

  async createTemplate(data: ICreateTemplate): Promise<any> {
    if (!data) {
      throw new Error("Template data is required");
    }

    try {
      const response = await axios.post(this.apiUrl, data, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: unknown) {
      throw createError(error);
    }
  }

  async getTemplates({
    limit = 10,
  }: IGetListTemplates): Promise<ListTemplatesResponse> {
    if (limit <= 0) {
      throw new Error("Limit must be a positive number");
    }

    try {
      const response = await axios.get(`${this.apiUrl}?limit=${limit}`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: unknown) {
      throw createError(error);
    }
  }

  async getTemplate(templateId: string): Promise<TemplateData> {
    try {
      const response = await axios.get(
        `${baseUrl}/${templateId}?access_token=${this.credentials.token}`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error: unknown) {
      throw createError(error);
    }
  }
}
