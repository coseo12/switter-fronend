export default class AuthService {
  constructor(http) {
    this.http = http;
  }

  async signup(username, password, name, email, url) {
    const data = await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url,
      }),
    });
    return data;
  }

  async login(username, password) {
    const data = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });
    return data;
  }

  async me() {
    return await this.http.fetch('/auth/me', {
      method: 'GET',
    });
  }

  async logout() {
    return await this.http.fetch('/auth/logout', {
      method: 'GET',
    });
  }

  async csrfToken() {
    const res = await this.http.fetch('/auth/csrf-token', {
      method: 'GET',
    });

    return res.csrfToken;
  }
}
