export default class HttpClient {
  constructor(baseURL, authErrorEventBus) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
      credentials: 'include',
    });
    try {
      const data = await res.json();
      if (res.status > 299 || res.status < 200) {
        const message =
          data && data.message ? data.message : `Something went wrong!`;
        const error = new Error(message);
        if (res.status === 401) {
          this.authErrorEventBus.notify(error);
        }
        throw error;
      }
      return data;
    } catch (e) {
      console.error(e);
    }
  }
}
