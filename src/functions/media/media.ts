import { baseUrl } from "../../lib/constants.js";
import { Credentials } from "../../types.js";
import { createError, validateRequiredString } from "../../lib/error-utils.js";
import axios, { AxiosError } from "axios";
import { MediaDownload } from "./media-t.js";

export class Media {
  private readonly credentials: Required<Pick<Credentials, 'numberId' | 'token'>>;
  
  constructor(credentials: Partial<Credentials>) {
    if (!credentials.numberId || !credentials.token) {
      throw new Error("Both numberId and token are required.");
    }
    this.credentials = {
      numberId: credentials.numberId,
      token: credentials.token
    };
  }

  async getMediaLink(mediaId: string): Promise<MediaDownload> {
    validateRequiredString(mediaId, "Media ID");

    const endpoint = `${baseUrl}/${mediaId}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.credentials.token}`,
    };
    
    try {
      const res = await axios.get(endpoint, { headers });
      return res.data;
    } catch (error: unknown) {
      throw createError(error);
    }
  }

  async downloadMedia(
    url: string
  ): Promise<{ buffer: Buffer; contentType: string }> {
    validateRequiredString(url, "Media URL");

    try {
      const response = await axios.get(url, {
        responseType: "arraybuffer",
        headers: { Authorization: `Bearer ${this.credentials.token}` },
      });
      const buffer = Buffer.from(response.data, "binary");
      const contentType =
        response.headers["content-type"] || "application/octet-stream";
      return { buffer, contentType };
    } catch (error: unknown) {
      throw createError(error);
    }
  }
}
