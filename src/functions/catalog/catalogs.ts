import { baseUrl } from "../../lib/constants.js";
import { Credentials } from "../../types.js";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ICreateCatalog } from "./catalog.js";
import { createError } from "../../lib/error-utils.js";

export class Catalog {
  private apiUrl: string;
  private axiosInstance: AxiosInstance;
  private readonly credentials: Required<Pick<Credentials, 'businessId' | 'token'>>;

  constructor(credentials: Partial<Credentials>) {
    if (!credentials.businessId || !credentials.token) {
      throw new Error("Both businessId and token are required.");
    }
    this.credentials = {
      businessId: credentials.businessId,
      token: credentials.token
    };
    this.apiUrl = `${baseUrl}/${this.credentials.businessId}`;
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        Authorization: `Bearer ${this.credentials.token}`,
        "Content-Type": "application/json",
      },
    });
  }

  async createCatalog(data: ICreateCatalog): Promise<AxiosResponse<any>> {
    if (!data) {
      throw new Error("Catalog data is required");
    }

    try {
      const response = await this.axiosInstance.post("/owned_product_catalogs", data);
      return response.data;
    } catch (error: unknown) {
      throw createError(error);
    }
  }
}
