let tweets = [
  {
    id: '1',
    text: '서버 메모리상의 tweet',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: '2',
    text: '서버 메모리상의 tweet2222',
    createdAt: Date.now().toString(),
    name: 'Ellie',
    username: 'ellie',
  },
];

export const getAllTweets = async() => {
  return tweets;
}

export const getAllTweetsByUsername = async(username) => {
  return tweets.filter(tweet => tweet.username === username);
}
export const getTweetById = async(tweetId) => {
  return tweets.find(tweet => tweet.id === tweetId);
}
export const createTweet = async(text, name, username) => {
  const tweet = {
    id: Date.now().toString(),
    text,
    name,
    username,
    createdAt: new Date(), //이건 무슨차이지?
    // url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  };
  // 임시로 쓰는 안좋은 방식. DB 사용하면 해결
  return tweets = tweets = [tweet, ...tweets];
}
export const updateTweet = async(id, text) => {
  const tweet = getTweetById(id);
  if(tweet) tweet.text = text;
  return tweet;
}
export const deleteTweet = (id, text) => {
  tweets = tweets.filter((t) => t.id !== id);
}