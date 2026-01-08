import axios from "axios";
import { baseUrl } from "./lib/constants.js";
import { createError } from "./lib/error-utils.js";
import { Credentials } from "./types.js";
import { Flows, OnBoarding, Messages, Templates } from "./functions/index.js";
import { Media } from "./functions/media/media.js";
import { Catalog } from "./functions/catalog/index.js";

export class WABA {
  public messages: Messages;
  public onBoarding: OnBoarding;
  public flows: Flows;
  public templates: Templates;
  public media: Media;
  public catalog: Catalog;
  constructor(private credentials: Credentials) {
    this.credentials = credentials;
    this.messages = new Messages({
      numberId: this.credentials.numberId,
      token: this.credentials.token,
    });
    this.onBoarding = new OnBoarding({
      numberId: this.credentials.numberId,
      wabaId: this.credentials.wabaId,
      token: this.credentials.token,
    });
    this.flows = new Flows({
      wabaId: this.credentials.wabaId,
      token: this.credentials.token,
    });
    this.templates = new Templates({
      wabaId: this.credentials.wabaId,
      token: this.credentials.token,
    });
    this.media = new Media({
      numberId: this.credentials.numberId,
      token: this.credentials.token,
    });
    this.catalog = new Catalog({
      businessId: this.credentials.businessId,
      token: this.credentials.token,
    });
  }
}

export async function getLongLivedTokenCode({
  code,
  client_id,
  client_secret,
}: {
  code: string;
  client_id: string;
  client_secret: string;
}) {
  try {
    const response = await axios.get(`${baseUrl}/oauth/access_token`, {
      params: {
        code,
        client_id,
        client_secret,
      },
    });
    return response;
  } catch (error: unknown) {
    throw createError(error);
  }
}

export * from "./types.js";
