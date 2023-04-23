import { HttpClient } from "./HttpClient";
import { APIResponse } from "@lib/types";
import { SignupFormValues } from "@components";

class AuthClientClass extends HttpClient {
  constructor() {
    super({
      baseURL: "/api/auth/",
      headers: { ContentType: "application/json" },
    });
  }
  public signup = (payload: SignupFormValues) => {
    return this.instance.post<APIResponse>(`/signup`, payload);
  };
}

export const AuthClient = new AuthClientClass();
