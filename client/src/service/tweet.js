export default class TweetService {
  tweets = [
    {
      id: 1,
      text: '드림코딩에서 강의 들으면 너무 좋으다',
      createdAt: '2021-05-09T04:20:57.000Z',
      name: 'Bob',
      username: 'bob',
      url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
  ];

  async getTweets(username) {
    return fetch('http://localhost:8080/tweets', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((res) => {
        return username
          ? res.filter((tweet) => tweet.username === username)
          : res;
      });
    // return username
    //   ? this.tweets.filter((tweet) => tweet.username === username)
    //   : this.tweets;
  }

  async postTweet(text) {
    const tweet = {
      id: Date.now(),
      createdAt: new Date(),
      name: 'Ellie',
      username: 'ellie',
      text,
    };
    return fetch('http://localhost:8080/tweets', {
      method: 'POST',
      body: JSON.stringify(tweet),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => console.log(`post response: ${response}`))
      .catch((error) => console.error(error));
    // this.tweets.push(tweet);
    // return tweet;
  }

  async deleteTweet(tweetId) {
    this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
  }

  async updateTweet(tweetId, text) {
    const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
    if (!tweet) {
      throw new Error('tweet not found!');
    }
    tweet.text = text;
    return tweet;
  }
}
