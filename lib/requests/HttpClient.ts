import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import applyCaseMiddleware, {
  ApplyCaseMiddlewareOptions,
} from "axios-case-converter";
import { ErrorResponse } from "./error-response";
import { set } from "lodash";

interface Options {
  applyCaseMiddlewareOptions?: ApplyCaseMiddlewareOptions;
}

const DEFAULT_OPTIONS = {
  // add other default options here
};

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  private bearer?: string | null;

  protected constructor(
    axiosOptions: AxiosRequestConfig,
    options: Options = {}
  ) {
    // if (isOnServer) {
    //   axiosOptions.baseURL = env.NEXT_PUBLIC_URL + axiosOptions.baseURL
    // }

    if (options.applyCaseMiddlewareOptions) {
      this.instance = applyCaseMiddleware(
        axios.create({ ...DEFAULT_OPTIONS, ...axiosOptions }),
        options.applyCaseMiddlewareOptions as ApplyCaseMiddlewareOptions
      );
    } else {
      this.instance = axios.create({ ...DEFAULT_OPTIONS, ...axiosOptions });
    }

    this.initializeResponseInterceptor();
  }

  private initializeResponseInterceptor = () => {
    // @ts-expect-error
    this.instance.interceptors.request.use(this.handleRequest);
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  };

  public setBearerToken = (token: string) => {
    this.bearer = token;
  };

  private handleRequest = (config: AxiosRequestConfig) => {
    if (this.bearer) {
      set(config, "headers.Authorization", `Bearer ${this.bearer}`);
    }

    return config;
  };

  private handleResponse = ({ data }: AxiosResponse) => data;

  private handleError = (error: ErrorResponse) => {
    if (error.statusCode === 401) {
      this.bearer = null;
    }

    return Promise.reject(error);
  };
}
