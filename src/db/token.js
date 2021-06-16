const TOKEN = 'token';

export default class TokenStorage {
  saveToken(token) {
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    const token = localStorage.getItem(TOKEN);
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  clearToken() {
    localStorage.clear(TOKEN);
  }
}
