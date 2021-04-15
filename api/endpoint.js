export const endpoint = {
  GET_TOKEN: `${process.env.api_url}/auth/jwt/create`,
  REFRESH_TOKEN: `${process.env.api_url}/auth/jwt/refresh`,
  REGISTER: `${process.env.api_url}/auth/users/`,
  ME: `${process.env.api_url}/account/me`,

  POSTS: `${process.env.api_url}/posts/get`,
  CREATE_POST: `${process.env.api_url}/posts/create`,
}