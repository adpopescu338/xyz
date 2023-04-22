import { HttpClient } from "./HttpClient";
import { APIResponse } from "@lib/types";

export type CaptureErrorPayload = {
  error: {
    type: string;
    line_number: number;
    file_name: string;
    message: string;
    stack?: string;
    info?: string;
  };
  url: string;
  title: string;
  lastEvent?: string;
  lastElement?: string;
};

export class CommonClientClass extends HttpClient {
  constructor() {
    super({
      baseURL: "/api/common/",
      headers: { ContentType: "application/json" },
    });
  }

  public sendCapturedError = (payload: CaptureErrorPayload) => {
    return this.instance
      .post<APIResponse>(`/capture-error`, payload)
      .catch((e) => {
        console.error("Unable to send captured error to server", e);
      });
  };
}

export const CommonClient = new CommonClientClass();
