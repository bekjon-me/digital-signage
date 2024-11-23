import type { AxiosInstance } from "axios";
import { i18n } from "@/i18n";
import axios from "axios";
import { AbortablePromise } from "simple-abortable-promise";

const baseURL = import.meta.env.VITE_API_BASE_URL;

class HttpClient {
  client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    this.client.interceptors.request.use(
      (config) => {
        config.headers["Accept-Language"] = i18n.global.locale.value;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  post(url: string, data?: any, config?: any): AbortablePromise<any> {
    return new AbortablePromise<any>((resolve, reject, abortSignal) => {
      this.client.post(url, data, { signal: abortSignal, ...config })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  get(url: string, params?: any, data?: any, headers?: any, config?: any): AbortablePromise<any> {
    return new AbortablePromise<any>((resolve, reject, abortSignal) => {
      this.client.get(url, { params, signal: abortSignal, headers, data, ...config })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  patch(url: string, data?: any): AbortablePromise<any> {
    return new AbortablePromise<any>((resolve, reject, abortSignal) => {
      this.client.patch(url, data, { signal: abortSignal })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  }

  put(url: string, data?: any, params?: any): AbortablePromise<any> {
    return new AbortablePromise<any>((resolve, reject, abortSignal) => {
      this.client.put(url, data, { params, signal: abortSignal })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  }

  head(url: string, params?: any): AbortablePromise<any> {
    return new AbortablePromise<any>((resolve, reject, abortSignal) => {
      this.client.head(url, { params, signal: abortSignal })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  delete(url: string, config?: any): AbortablePromise<any> {
    return new AbortablePromise<any>((resolve, reject, abortSignal) => {
      this.client.delete(url, { ...config, signal: abortSignal })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  }
}

export default new HttpClient();
