import { HttpClient } from "./HttpClient";
import { APIResponse } from "@lib/types";
import { ErrorPayload } from "@lib";

export class CommonClient extends HttpClient {
  constructor() {
    super({
      baseURL: "/api/common/",
      headers: { ContentType: "application/json" },
    });
  }

  public captureError = (payload: ErrorPayload) => {
    return this.instance.post<APIResponse>(`/capture-error`, payload);
  };
}

export const CommonClientInstance = new CommonClient();
