const secret = 'fSTWh2471^%Vw9dmUyYR$BXL*VJhq&N&';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const bcryptSaltRounds = 10;
const jwtSecretKey = '';
const jwtExpiresInDays = '2d';
export async function signup(req, res, next) {
  const {username, password, name, email, url} = req.body;
  // 아이디 중복여부체크
  const found = await userRepository.findByUsername(username);
  if(found) return res.status(409).json({message: `${username} already exists`})
  
  const hashed = bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url
  }) // return값: user의 고유 id  (현재는 Date.now().~)
  
  const token = createJwtToken(userId)
  return res.status(201).json({username, token});
}

export async function login(req, res, next) {
  const {username, password} = req.body;
  const user = await userRepository.findByUsername(username);
  if(!user) return res.status(401).send("id or password wrong!");
  const isValidPassword = await bcrypt.compare(password, user.password);
  if(!isValidPassword) return res.status(401).send("id or password wrong!");
  const token = createJwtToken(user.id);
  return res.status(200).json({username, token});
}


const createJwtToken = (userId) => {
  return jwt.sign(userId,
  jwtSecretKey, { expiresIn: jwtExpiresInDays}
  )
}