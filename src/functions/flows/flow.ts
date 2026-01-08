export interface ICreateFlow {
  name: string;
  categories: (
    | "SIGN_UP"
    | "SIGN_IN"
    | "APPOINTMENT_BOOKING"
    | "LEAD_GENERATION"
    | "CONTACT_US"
    | "CUSTOMER_SUPPORT"
    | "SURVEY"
    | "OTHER"
  )[];
  clone_flow_id?: string;
  endpoint_uri?: string;
}

export interface IGetFlow {
  flowId: string;
}

export interface IUpdateFlow {
  flowId: string;
  data: {
    file: File;
    name: "flow.json";
    asset_type: "FLOW_JSON";
  };
}

export interface IUpdateFlowMetaData {
  flowId: string;
  data: {
    name?: string;
    categories?: (
      | "SIGN_UP"
      | "SIGN_IN"
      | "APPOINTMENT_BOOKING"
      | "LEAD_GENERATION"
      | "CONTACT_US"
      | "CUSTOMER_SUPPORT"
      | "SURVEY"
      | "OTHER"
    )[];
    endpoint_uri?: string;
  };
}
