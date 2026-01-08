interface BaseMessage {
  to: string;
  context?: {
    message_id: string;
  };
}

export interface ITextMessage extends BaseMessage {
  text: { body: string; preview_url?: boolean };
}

type MediaComponent = {
  mediaId?: string;
  link?: string;
  caption?: string;
  filename?: string;
};

export interface IMediaMessage extends BaseMessage {
  media: {
    type: "image" | "video" | "audio" | "document" | "sticker";
    image?: MediaComponent;
    video?: MediaComponent;
    audio?: MediaComponent;
    document?: MediaComponent;
    sticker?: MediaComponent;
  };
}

export interface ILocationMessage extends BaseMessage {
  location: {
    latitude: number;
    longitude: number;
    address: string;
    name: string;
  };
}

export type Contact = {
  addresses?: Array<{
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    country_code?: string;
    type?: string;
  }>;
  birthday?: string;
  emails?: Array<{
    email: string;
    type?: string;
  }>;
  name: {
    formatted_name: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    suffix?: string;
    prefix?: string;
  };
  org?: {
    company?: string;
    department?: string;
    title?: string;
  };
  phones?: Array<{
    phone: string;
    type?: string;
    wa_id?: string;
  }>;
  urls?: Array<{
    url: string;
    type?: string;
  }>;
};
export interface IContactMessage extends BaseMessage {
  contacts: Contact[];
}

export interface IReactionMessage extends BaseMessage {
  reaction: {
    message_id: string;
    emoji: string;
  };
}

export type LanguageObject = {
  policy: "deterministic";
  code: string;
};

export type ButtonParameterObject =
  | { type: "payload"; payload: string }
  | { type: "text"; text: string }
  | { type: "coupon_code"; coupon_code: string };

export type ParameterObject =
  | { type: "text"; text: string }
  | {
      type: "currency";
      currency: { fallback_value: string; code: string; amount_1000: number };
    }
  | { type: "date_time"; date_time: { fallback_value: string } }
  | { type: "document"; document: MediaComponent }
  | { type: "image"; image: MediaComponent }
  | { type: "video"; video: MediaComponent }
  | { type: "audio"; audio: MediaComponent };

export type ComponentsObject =
  | {
      type: "header" | "body" | "footer";
      parameters?: ParameterObject[];
    }
  | {
      type: "button";
      sub_type: "quick_reply" | "url" | "copy_code";
      index: number;
      parameters?: ButtonParameterObject[];
    };

export interface ITemplateMessage extends BaseMessage {
  template: {
    name: string;
    language: LanguageObject;
    components?: ComponentsObject[];
  };
}

export type HeaderComponent =
  | {
      type: "text";
      text: string;
      sub_text?: string;
    }
  | {
      type: "image";
      image: MediaComponent;
    }
  | {
      type: "video";
      video: MediaComponent;
    }
  | {
      type: "document";
      document: MediaComponent;
    };
export type TextComponent = {
  text: string;
};
export interface IReplyButtonMessage extends BaseMessage {
  interactive: {
    type: "button";
    header?: HeaderComponent;
    body: TextComponent;
    footer?: TextComponent;
    action: {
      buttons: Array<{
        type: "reply";
        reply: {
          id: string;
          title: string;
        };
      }>;
    };
  };
}

export interface ISingleProductMessage extends BaseMessage {
  interactive: {
    type: "single_product";
    header: HeaderComponent;
    body?: TextComponent;
    footer?: TextComponent;
    action: {
      catalog_id: string;
      product_retailer_id: string;
    };
  };
}

export type MultiProductSection = {
  title: string;
  product_items: Array<{ product_retailer_id: string }>;
};
export interface IMultiProductMessage extends BaseMessage {
  interactive: {
    type: "product_list";
    header?: HeaderComponent;
    body: TextComponent;
    footer?: TextComponent;
    action: {
      catalog_id: string;
      sections: MultiProductSection[];
    };
  };
}

export interface ICatalogMessage extends BaseMessage {
  interactive: {
    type: "catalog_message";
    header?: HeaderComponent;
    body: TextComponent;
    footer?: TextComponent;
    action: {
      name: "catalog_message";
      parameters?: {
        thumbnail_product_retailer_id: string;
      };
    };
  };
}

export type ListSection = {
  title: string;
  rows: Array<{
    id: string;
    title: string;
    description: string;
  }>;
};

export interface IListMessage extends BaseMessage {
  interactive: {
    type: "list";
    header?: HeaderComponent;
    body: TextComponent;
    footer?: TextComponent;
    action: {
      button: string;
      sections: ListSection[];
    };
  };
}

export interface IFlowsMessage extends BaseMessage {
  interactive: {
    type: "flow";
    header?: HeaderComponent;
    body: TextComponent;
    footer?: TextComponent;
    action: {
      name: "flow";
      parameters: {
        flow_id: string;
        flow_message_version: "3";
        flow_cta: string;
        flow_token?: string;
        mode?: "draft" | "published";
        flow_action: "navigate" | "data_exchange";
        flow_action_payload?: {
          screen?: string;
          data?: object;
        };
      };
    };
  };
}

export interface ILocationRequestMessage extends BaseMessage {
  interactive: {
    type: "location_request_message";
    body: TextComponent;
    action: {
      name: "send_location";
    };
  };
}

export interface IMarkAsRead {
  message_id: string;
}
