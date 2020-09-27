import config from "../config";

/**
 * This class will be used as a facade to the API fetching implementation.
 * It uses fetch by default, but this could be easily replaced by somethign like axios.
 */
class Api {
  private urlRoot: string;
  private defaultOptions: {};

  constructor() {
    this.urlRoot = `${config.apiRoot}`;
    this.defaultOptions = {
      redirect: "follow",
    };
  }

  async get(path: string = "", params: {} = {}, options?: RequestInit) {
    let url = `${this.urlRoot}${path}`;
    // serialize params to a query string
    if (Object.keys(params).length > 0) {
      const urlParams = new URLSearchParams(params);
      url = `${url}?${urlParams.toString()}`;
    }

    try {
      // this could be easily replaced by something like axios
      const response = await fetch(url, {
        ...this.defaultOptions,
        ...options,
      });
      if (!response.ok) {
        throw new Error("Bad request");
      }
      return response.json();
    } catch (e) {
      throw new Error(e);
    }
  }
}

const api = new Api();
export default api;
