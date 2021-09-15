const users = [
  {
    id: '1',
    username: 'bob',
    password: 'abcd1234',
    name: 'Bob',
    email: 'bob@naver.com',
  }
]

export const findByUsername = async(username) => {
  return users.find(user => user.username === username);
}
export const createUser = async(userId) => {
  const created = users.push({...userId, id: Date.now().toString()})
  users.push(created);
  return created.id;
}
