import ILogin from "../../database/interfaces/ILogin"

const userMock = {
  "username": "User",
  "role": "user",
  "email": "user@user.com",
  "password": "$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO",
}

const userLoginMock: ILogin = {
  email: 'user@user.com',
  password: 'secret_user'
}

const userTokenMock = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZCI6InNlY3JldF91c2VyIiwiaWF0IjoxNjYxMjc4NzMyfQ.wB0kOlDmEH7JnFnkgVTE5Wg0-MQoA9W1iLKPvwwdZFs"


export { userLoginMock, userMock, userTokenMock}