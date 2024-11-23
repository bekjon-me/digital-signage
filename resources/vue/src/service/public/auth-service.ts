import type { CreateUserPayload, LoginUserPayload } from "@/models/user";
import type { AbortablePromise } from "simple-abortable-promise";
import { LOGIN, REGISTER } from "@/service/public/endpoints";
import httpClient from "@/service/public/http-client";

class AuthService {
  registerUrl: string;
  loginUrl: string;

  constructor() {
    this.registerUrl = REGISTER.endsWith("/") ? REGISTER : `${REGISTER}/`;
    this.loginUrl = LOGIN.endsWith("/") ? LOGIN : `${LOGIN}/`;
  }

  register(payload: CreateUserPayload): AbortablePromise<any> {
    return httpClient.post(this.registerUrl, payload);
  }

  login(payload: LoginUserPayload): AbortablePromise<any> {
    return httpClient.post(this.loginUrl, payload);
  }
}

export default new AuthService();
