export default class TweetService {
  constructor(http, tokenStorage, socket) {
    this.http = http;
    this.tokenStorage = tokenStorage;
    this.socket = socket;
  }
  async getTweets(username) {
    const query = username ? `?username=${username}` : '';
    return await this.http.fetch(`/tweets${query}`, {
      method: 'GET',
      headers: this.tokenStorage.getToken(),
    });
  }

  async postTweet(text) {
    return await this.http.fetch(`/tweets`, {
      method: 'POST',
      headers: this.tokenStorage.getToken(),
      body: JSON.stringify({
        text,
        username: 'seo',
        name: 'Seo',
      }),
    });
  }

  async deleteTweet(tweetId) {
    return await this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: this.tokenStorage.getToken(),
    });
  }

  async updateTweet(tweetId, text) {
    return await this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      headers: this.tokenStorage.getToken(),
      body: JSON.stringify({
        text,
      }),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  onSync(callback) {
    return this.socket.onSync('tweets', callback);
  }
}
