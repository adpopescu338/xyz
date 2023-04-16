import { HttpClient } from "./HttpClient";
import { APIResponse } from "@lib/types";
import { AxiosRequestConfig } from "axios";

export class AdminClient extends HttpClient {
  constructor() {
    super({
      baseURL: "/api/admin/",
      headers: { ContentType: "application/json" },
    });
  }

  public updateText = (text: string) => {
    return this.instance.post<APIResponse>(`/update-text`, { text });
  };
}

export const AdminClientInstance = new AdminClient();
