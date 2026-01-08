export type TemplateHeaderComponent =
  | {
      type: "HEADER";
      format: "IMAGE" | "VIDEO" | "DOCUMENT";
      example?: {
        header_handle: string[];
      };
    }
  | {
      type: "HEADER";
      format: "TEXT";
      text: string;
      example?: {
        header_text: string[];
      };
    }
  | {
      type: "HEADER";
      format: "LOCATION";
    };

export type BodyComponent = {
  type: "BODY";
  text: string;
  example?: {
    header_text_named_params: { param_name: string; example: string }[];
  };
};

export type FooterComponent = {
  type: "FOOTER";
  text: string;
};

export type ButtonComponent = {
  type: "BUTTONS";
  buttons: Array<
    | {
        type: "QUICK_REPLY";
        text: string;
      }
    | {
        type: "PHONE_NUMBER";
        text: string;
        phone_number: string;
      }
    | { type: "URL"; text: string; url: string; example?: string[] }
    | { type: "COPY_CODE"; example: string }
    | {
        type: "FLOW";
        text: string;
        flow_id: string;
        flow_action: "navigate" | "data_exchange";
        navigate_screen?: string;
      }
  >;
};
type Component = TemplateHeaderComponent | FooterComponent | ButtonComponent;

export interface ICreateTemplate {
  name: string;
  category: "AUTHENTICATION" | "MARKETING" | "UTILITY";
  language: string;
  components: Array<Component>;
}

export interface IGetListTemplates {
  limit?: number;
}

export interface ListTemplatesResponse {
  data: TemplateData[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
  };
}

export interface TemplateData {
  name: string;
  previous_category: "AUTHENTICATION" | "MARKETING" | "UTILITY";
  parameter_format: "POSITIONAL" | "NAMED";
  components: Array<Component>;
  language: string;
  status:
    | "APPROVED"
    | "IN_APPEAL"
    | "PENDING"
    | "REJECTED"
    | "PENDING_DELETION"
    | "DELETED"
    | "DISABLED"
    | "PAUSED"
    | "LIMIT_EXCEEDED";
  category: "AUTHENTICATION" | "MARKETING" | "UTILITY";
  correct_category: "AUTHENTICATION" | "MARKETING" | "UTILITY";
  id: string;
}
