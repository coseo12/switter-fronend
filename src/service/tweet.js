export default class TweetService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async getTweets(username) {
    const query = username ? `?username=${username}` : '';
    const res = await fetch(`${this.baseURL}/tweets${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (res.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  async postTweet(text) {
    const res = await fetch(`${this.baseURL}/tweets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        username: 'seo',
        name: 'Seo',
      }),
    });
    const data = await res.json();
    if (res.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  }

  async deleteTweet(tweetId) {
    const res = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status !== 204) {
      throw new Error();
    }
  }

  async updateTweet(tweetId, text) {
    const res = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
      }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
}
